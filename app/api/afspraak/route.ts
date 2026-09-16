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

  // Honeypot: bots vullen dit verborgen veld in. Doe alsof het gelukt is.
  if (clean(body.website, 200)) return Response.json({ ok: true });

  const naam = clean(body.naam, 120);
  const telefoon = clean(body.telefoon, 40);
  const email = clean(body.email, 160);
  const postcode = clean(body.postcode, 12);
  const huisnummer = clean(body.huisnummer, 12);
  const bericht = clean(body.bericht, 2000);

  if (!naam || !telefoon || !email || !EMAIL_RE.test(email)) {
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

  const regels: [string, string][] = [
    ["Naam", naam],
    ["Telefoon", telefoon],
    ["E-mail", email],
    ["Postcode / huisnummer", adres || "–"],
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
      replyTo: `"${naam.replace(/"/g, "")}" <${email}>`,
      subject: `Afspraakaanvraag — ${naam}${postcode ? ` (${postcode})` : ""}`,
      text,
      html,
    });
  } catch (err) {
    console.error("[afspraak] Versturen mislukt:", err);
    return Response.json({ error: "send_failed" }, { status: 502 });
  }

  // Korte bevestiging naar de klant. Niet-blokkerend: een fout hier mag de
  // aanvraag zelf nooit laten mislukken.
  transporter
    .sendMail({
      from: `"${SITE.name}" <${from}>`,
      to: email,
      replyTo: to,
      subject: `Uw afspraakaanvraag bij ${SITE.name}`,
      text: `Beste ${naam},

Bedankt voor uw aanvraag. ${SITE.reactie}

Wilt u het liever direct regelen? Bel ${SITE.phoneDisplay}.

Met vriendelijke groet,
${SITE.name}
${SITE.url}`,
    })
    .catch((err: unknown) => console.error("[afspraak] Klantbevestiging mislukt:", err));

  return Response.json({ ok: true });
}
