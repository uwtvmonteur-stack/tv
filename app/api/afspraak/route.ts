import nodemailer from "nodemailer";
import { SITE } from "@/lib/site";

/**
 * Ontvangt de afspraakaanvraag en verstuurt die via SMTP.
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

/**
 * Eén adres, en niets wat een mailserver als een tweede ontvanger of als
 * koptekst kan lezen.
 *
 * De vorige vorm, `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`, liet komma's, puntkomma's,
 * punthaken en aanhalingstekens door. Getest: twee volledige adressen kwamen
 * er niet doorheen (er mag maar één `@` in), maar `a,b@c.nl` en
 * `klant@voorbeeld.nl,` wel, en nodemailer leest zo'n komma als een scheiding
 * tussen ontvangers. De staart `[a-z]{2,}` eist bovendien een echt
 * topniveaudomein, zodat `iemand@localhost` of `x@y.1` niet meer telt.
 */
const EMAIL_RE = /^[^\s@,;:<>"'()[\]]+@[^\s@,;:<>"'()[\]]+\.[a-zA-Z]{2,}$/;

/**
 * Ruwe snelheidsbegrenzing per IP.
 *
 * Dit is geen sluitende beveiliging en doet niet alsof: op Vercel draait elke
 * aanroep mogelijk in een andere instantie, en dit geheugen gaat bij elke
 * koude start verloren. Wat het wél tegenhoudt is het geval dat hier telt —
 * één bron die het formulier honderden keren achter elkaar afvuurt. Zonder
 * iets als dit is het dagquotum van de mailprovider op, en krijgt daarna
 * iedere echte klant een foutmelding.
 *
 * Elke aanvraag mét e-mailadres kost twee mails (de aanvraag en de
 * bevestiging), dus het quotum gaat twee keer zo snel op als je zou denken.
 * Wie dit hard wil dichtzetten, zet een regel in de Vercel-firewall op
 * POST /api/afspraak; dit blijft de goedkope tweede linie.
 */
const VENSTER_MS = 10 * 60 * 1000;
const MAX_PER_VENSTER = 5;
const recent = new Map<string, number[]>();

function teVaak(ip: string) {
  const nu = Date.now();
  const eerder = (recent.get(ip) ?? []).filter((t) => nu - t < VENSTER_MS);
  eerder.push(nu);
  recent.set(ip, eerder);

  // De map mag niet eindeloos groeien in een langlevende instantie.
  if (recent.size > 5000) {
    for (const [sleutel, tijden] of recent) {
      if (tijden.every((t) => nu - t >= VENSTER_MS)) recent.delete(sleutel);
    }
  }
  return eerder.length > MAX_PER_VENSTER;
}

export async function POST(request: Request) {
  // `x-forwarded-for` kan door de client worden meegestuurd en is dus niet te
  // vertrouwen als identiteit. Voor het doel hier — een enkele bron afremmen —
  // is het de beste die er is zonder extra dienst. Valt hij weg, dan belanden
  // alle aanvragen in één emmer; dat is streng maar niet kapot, want de limiet
  // ligt op vijf per tien minuten en een echt formulier haalt dat nooit.
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "onbekend";
  if (teVaak(ip)) {
    return Response.json({ error: "te_veel_aanvragen" }, { status: 429 });
  }

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
  const straat = clean(body.straat, 160);
  const huisnummer = clean(body.huisnummer, 20);
  const postcode = clean(body.postcode, 12);
  const plaats = clean(body.plaats, 80);
  const omschrijving = clean(body.omschrijving, 4000);

  // Naam, telefoon, postcode en de omschrijving zijn het minimum: daarmee kan
  // er een prijs gegeven worden. E-mail is optioneel, want wij bellen terug;
  // staat er wél een adres, dan moet het bruikbaar zijn — anders komt de
  // bevestiging nooit aan en merkt niemand dat.
  //
  // `straat`, `huisnummer` en `plaats` vraagt het formulier sinds 16-11-2026
  // wél, en verplicht (zie components/ContactForm.tsx). Hier blijven ze
  // bewust optioneel. Een bezoeker met een gecachte oude pagina stuurt ze niet
  // mee, en die aanvraag mag niet afketsen op een veld dat zijn pagina niet
  // had: een verloren aanvraag is duurder dan een adres dat de monteur
  // alsnog navraagt. De e-mail laat hieronder zien wat er wél is gestuurd.
  if (
    !naam ||
    !telefoon ||
    !postcode ||
    !omschrijving ||
    (email && !EMAIL_RE.test(email))
  ) {
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
    // Zonder deze drie wacht de functie op een stille SMTP-server tot Vercel
    // haar afbreekt. Dan krijgt de bezoeker een 504 terwijl de mail mogelijk
    // al vertrokken is, hij verstuurt opnieuw, en de monteur krijgt dezelfde
    // aanvraag twee keer. Tien seconden is ruim voor elke normale provider.
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
  });

  const to = MAIL_TO || SITE.email;
  const from = MAIL_FROM || SMTP_USER;
  // Eén adresregel, zoals je hem op een envelop zou schrijven: de monteur
  // moet er een route mee kunnen plannen zonder velden samen te rapen.
  const adres = [
    [straat, huisnummer].filter(Boolean).join(" "),
    [postcode, plaats].filter(Boolean).join(" "),
  ]
    .filter(Boolean)
    .join(", ");

  const regels: [string, string][] = [
    ["Naam", naam],
    ["Telefoon", telefoon],
    ["E-mail", email || "– (klant wordt gebeld)"],
    // Zonder straatnaam is dit geen adres maar een postcode, en dan hoort er
    // ook "Postcode" boven te staan: wie de aanvraag leest moet niet gaan
    // zoeken naar een adres dat nooit is gevraagd.
    [straat ? "Adres" : "Postcode", adres || "–"],
    ["Wat er moet gebeuren", omschrijving || "–"],
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
      // Woonplaats als die er is, anders de postcode: de mailbox moet twee
      // aanvragen van dezelfde naam uit elkaar kunnen houden.
      subject: `Afspraakaanvraag — ${naam} (${plaats || postcode})`,
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
      subject: `Uw afspraak bij ${SITE.name}`,
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
