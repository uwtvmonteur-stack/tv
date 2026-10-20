import nodemailer from "nodemailer";
import { SITE } from "@/lib/site";

/**
 * Ontvangt het afspraakformulier en verstuurt het via SMTP.
 *
 * Environment Variables (op Vercel of in .env.local):
 * - SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS  (verplicht)
 * - SMTP_SECURE  "true" voor poort 465 (impliciete TLS); anders STARTTLS
 * - MAIL_TO      ontvanger van aanvragen (standaard SITE.email)
 * - MAIL_FROM    afzenderadres (standaard SMTP_USER)
 *
 * Zonder SMTP-config antwoordt de route met 503 `not_configured`; het
 * formulier valt dan terug op een e-mailconcept (mailto).
 */
export const runtime = "nodejs";

const clean = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: bots vullen dit verborgen veld in. Doe alsof het gelukt is, maar
  // zeg er met `verzonden: false` bij dat er niets is verstuurd. De browser
  // telt alleen een conversie bij `verzonden: true`, zodat deze nep-200 nooit
  // als aanvraag in Analytics of Ads belandt. (Het formulier vangt de honeypot
  // zelf al af vóór de POST; dit is de tweede linie voor directe API-aanroepen.)
  if (clean(body.ref_check_2, 200))
    return Response.json({ ok: true, verzonden: false });

  const naam = clean(body.naam, 120);
  const telefoon = clean(body.telefoon, 40);
  const email = clean(body.email, 160);
  const postcode = clean(body.postcode, 12);
  const huisnummer = clean(body.huisnummer, 12);
  const datum = clean(body.datum, 20);
  const dagdeel = clean(body.dagdeel, 40);
  const bericht = clean(body.bericht, 2000);
  // De keuzes uit het formulier, als leesbare tekst. `prijs` is het bedrag dat
  // de klant tijdens het invullen op het scherm zag; dat staat bewust in de
  // mail, zodat de toegezegde prijs later na te lezen is.
  const tvmaat = clean(body.tvmaat, 160);
  const beugel = clean(body.beugel, 120);
  const extras = clean(body.extras, 500);
  const prijs = clean(body.prijs, 40);

  // E-mail is optioneel: wij bellen terug, dus naam en telefoon zijn wat we
  // nodig hebben. Staat er wél een adres, dan moet het bruikbaar zijn — anders
  // komt de bevestiging nooit aan en merkt niemand dat.
  if (!naam || !telefoon || (email && !EMAIL_RE.test(email))) {
    return Response.json({ error: "validation" }, { status: 422 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE, MAIL_TO, MAIL_FROM } =
    process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error("[afspraak] SMTP niet geconfigureerd (SMTP_HOST/SMTP_USER/SMTP_PASS ontbreekt).");
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  const port = Number(SMTP_PORT ?? 587);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: SMTP_SECURE === "true" || port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const to = MAIL_TO || SITE.email;
  const from = MAIL_FROM || SMTP_USER;
  const adres = [postcode, huisnummer].filter(Boolean).join(" ");

  // Een regel die wegvalt als hij leeg is: de aanvraagmail moet in één blik te
  // lezen zijn, en een rij met een streepje erachter leest niemand.
  const optioneel = (label: string, waarde: string) =>
    (waarde ? [[label, waarde]] : []) as [string, string][];

  const regels: [string, string][] = [
    ["Naam", naam],
    ["Telefoon", telefoon],
    ["E-mail", email || "– (klant wordt gebeld)"],
    ["Postcode / huisnummer", adres || "–"],
    ...optioneel("Tv", tvmaat),
    ...optioneel("Beugel", beugel),
    ...optioneel("Extra's", extras),
    ...optioneel("Prijs op het scherm", prijs),
    ...optioneel("Voorkeursmoment", [datum, dagdeel].filter(Boolean).join(" · ")),
    ["Bericht", bericht || "–"],
  ];

  const text = regels.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<h2 style="font-family:sans-serif">Nieuwe afspraakaanvraag</h2>
<table style="font-family:sans-serif;font-size:15px;border-collapse:collapse">
${regels
  .map(
    ([k, v]) =>
      `<tr><td style="padding:6px 12px 6px 0;color:#666;vertical-align:top">${k}</td><td style="padding:6px 0">${escapeHtml(v).replace(/\n/g, "<br>")}</td></tr>`,
  )
  .join("\n")}
</table>
<p style="font-family:sans-serif;font-size:14px"><a href="tel:${escapeHtml(telefoon)}">Bel ${escapeHtml(naam)}</a></p>`;

  try {
    await transporter.sendMail({
      from: `"${SITE.name} website" <${from}>`,
      to,
      // Zonder e-mailadres is er niets om op te antwoorden; een leeg `replyTo`
      // laat sommige servers de mail juist weigeren.
      ...(email ? { replyTo: `"${naam.replace(/"/g, "")}" <${email}>` } : {}),
      subject: `Afspraakaanvraag — ${naam}${postcode ? ` (${postcode})` : ""}`,
      text,
      html,
    });
  } catch (err) {
    console.error("[afspraak] Versturen mislukt:", err);
    return Response.json({ error: "send_failed" }, { status: 502 });
  }

  // Geen e-mailadres opgegeven? Dan valt er geen bevestiging te versturen. Dat
  // is geen fout maar een keuze van de klant: de aanvraag is binnen en wij
  // bellen terug. Daarom `null` en niet `false`.
  if (!email) {
    return Response.json({ ok: true, verzonden: true, bevestiging: null });
  }

  // Korte bevestiging naar de klant. We wachten hier bewust op: op Vercel
  // wordt de functie direct na het antwoord bevroren, waardoor een
  // "fire-and-forget" e-mail nooit verstuurd wordt. Een fout in deze mail
  // mag de aanvraag zelf niet laten mislukken.
  let bevestiging = true;
  try {
    await transporter.sendMail({
      from: `"${SITE.name}" <${from}>`,
      to: email,
      replyTo: to,
      subject: `Uw afspraakaanvraag bij ${SITE.name}`,
      text: `Beste ${naam},

Bedankt voor uw aanvraag. ${SITE.reactie}

Uw gegevens:
${text}

Klopt er iets niet of wilt u nog iets doorgeven? U kunt gewoon op deze e-mail antwoorden.

Met vriendelijke groet,
${SITE.name}
${SITE.url}`,
      html: `<p style="font-family:sans-serif;font-size:15px">Beste ${escapeHtml(naam)},</p>
<p style="font-family:sans-serif;font-size:15px">Bedankt voor uw aanvraag. ${escapeHtml(SITE.reactie)}</p>
<p style="font-family:sans-serif;font-size:14px;color:#666">Uw gegevens:</p>
<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
${regels
  .map(
    ([k, v]) =>
      `<tr><td style="padding:4px 12px 4px 0;color:#666;vertical-align:top">${k}</td><td style="padding:4px 0">${escapeHtml(v).replace(/\n/g, "<br>")}</td></tr>`,
  )
  .join("\n")}
</table>
<p style="font-family:sans-serif;font-size:15px">Klopt er iets niet of wilt u nog iets doorgeven? U kunt gewoon op deze e-mail antwoorden.</p>
<p style="font-family:sans-serif;font-size:15px">Met vriendelijke groet,<br>${SITE.name}<br><a href="${SITE.url}">${SITE.url}</a></p>`,
    });
  } catch (err) {
    bevestiging = false;
    console.error("[afspraak] Klantbevestiging mislukt:", err);
  }

  return Response.json({ ok: true, verzonden: true, bevestiging });
}
