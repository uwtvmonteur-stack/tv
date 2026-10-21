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
  /**
   * Openingstijden op één plek. Stonden eerder los in het schema in
   * app/layout.tsx, in de koptekstbalk, in de voettekst en op de
   * contactpagina: vier plekken die uit elkaar kunnen lopen, terwijl een
   * bezoeker die net buiten die tijden belt je daar precies op afrekent.
   */
  openingstijden: {
    weekdagen: { van: "08:00", tot: "21:00" },
    weekend: { van: "09:00", tot: "17:00" },
    /** Voor de balk bovenaan: moet op één regel passen. */
    kort: "Ma–vr 08:00–21:00, za–zo 09:00–17:00",
    /** Voor de voettekst en de contactpagina, twee regels. */
    lang: [
      "Maandag t/m vrijdag 08:00–21:00",
      "Zaterdag en zondag 09:00–17:00",
    ],
  },
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
    "Wij sturen u binnen enkele uren een vrijblijvende offerte en nemen contact met u op.",
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
