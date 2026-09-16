export const SITE = {
  name: "Uw TV Monteur",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.uwtvmonteur.nl",
  phone: "+31850601234",
  phoneDisplay: "085 060 1234",
  email: "info@uwtvmonteur.nl",
  // TODO vóór livegang: echt WhatsApp-mobielnummer invullen als "https://wa.me/31…".
  // Leeg = de WhatsApp-links worden automatisch niet getoond (liever niets dan een fout nummer).
  whatsapp: "",
  // TODO vóór livegang: echt KvK-nummer invullen. Leeg = wordt niet getoond
  // (liever niets dan een onjuist nummer). Een KvK-nummer op de site is in
  // Nederland verplicht voor bedrijven én een belangrijk vertrouwenssignaal.
  kvk: "",
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
    "Wij bellen u terug om een datum en tijd te kiezen — meestal nog dezelfde dag, uiterlijk de volgende werkdag.",
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
