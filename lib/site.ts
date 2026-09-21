export const SITE = {
  name: "Uw TV Monteur",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.uwtvmonteur.nl",
  phone: "+31642548451",
  phoneDisplay: "06 42 54 84 51",
  email: "info@uwtvmonteur.nl",
  // WhatsApp bewust uitgeschakeld (wens eigenaar). Leeg = de WhatsApp-knoppen
  // in sticky balk, contactpagina en footer worden niet getoond. Weer aanzetten:
  // "https://wa.me/31642548451".
  whatsapp: "",
  kvk: "93769865",
  btw: "NL005041113B60",
  /**
   * Beoordelingen — één bron voor de score die sitebreed wordt getoond.
   * Vul `url` met de link naar uw Google-bedrijfsprofiel (of Trustpilot/Klantenvertellen)
   * zodat bezoekers de score kunnen controleren; dan wordt de score overal een link.
   * LET OP: `score` en `count` zijn placeholders — vervang ze door echte cijfers.
   */
  reviews: {
    score: "4,9",
    count: "850+",
    url: "",
  },
  /**
   * Reactiebelofte na een aanvraag — sitebreed één formulering, zodat hero,
   * formulier en bevestiging elkaar niet tegenspreken. Pas aan naar wat u
   * daadwerkelijk waarmaakt.
   */
  reactie:
    "Wij nemen binnen enkele uren contact met u op om uw afspraak te bevestigen.",
} as const;

/**
 * Conversiemeting (optioneel). Zonder ID's wordt er géén script geladen.
 * - NEXT_PUBLIC_GA_ID: GA4-meet-ID, bijv. "G-XXXXXXXXXX"
 * - NEXT_PUBLIC_ADS_CONVERSION_FORM: Google Ads-conversielabel voor een formulieraanvraag, bijv. "AW-123456789/AbCdEfGhIj"
 * - NEXT_PUBLIC_ADS_CONVERSION_CALL: Google Ads-conversielabel voor een klik op het telefoonnummer
 */
export const TRACKING = {
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
  adsFormConversion: process.env.NEXT_PUBLIC_ADS_CONVERSION_FORM ?? "",
  adsCallConversion: process.env.NEXT_PUBLIC_ADS_CONVERSION_CALL ?? "",
} as const;
