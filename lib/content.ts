export type Dienst = {
  slug: string;
  naam: string;
  kort: string;
  /** Optionele URL-override; standaard /diensten/<slug>. */
  href?: string;
};

/** Definitieve URL van een dienst (respecteert een eventuele href-override). */
export function dienstHref(d: Dienst) {
  return d.href ?? `/diensten/${d.slug}`;
}

export const diensten: Dienst[] = [
  {
    slug: "tv-ophangen",
    naam: "Tv ophangen",
    kort: "Tv laten ophangen door onze ophangservice: vast, kantelbaar of draaibaar, veilig op elke muur en altijd waterpas.",
    href: "/tv-ophangen",
  },
  {
    slug: "tv-installatie",
    naam: "Tv installatie",
    kort: "Uw tv laten installeren aan huis: plaatsen of ophangen, alles aansluiten en direct klaar voor gebruik.",
  },
  {
    slug: "soundbar-installatie",
    naam: "Soundbar installeren",
    kort: "Soundbar, surround of complete home-cinema — aangesloten en perfect afgesteld.",
  },
  {
    slug: "tv-instellen",
    naam: "Tv instellen & hulp",
    kort: "Zenders, wifi, apps en streaming: tv hulp aan huis, in begrijpelijke taal.",
  },
];

export const priceCards = [
  {
    name: "Compact",
    size: "Voor tv's tot 43 inch",
    price: "€99",
    features: [
      "Montage op elke muur",
      "Waterpas gemonteerd én getest",
      "Aansluiten en instellen",
      "Incl. voorrijkosten en btw",
    ],
    featured: false,
  },
  {
    name: "Standaard",
    size: "Voor tv's van 44 t/m 65 inch",
    price: "€119",
    features: [
      "Montage op elke muur",
      "Waterpas gemonteerd én getest",
      "Aansluiten en instellen",
      "Kabelcheck en persoonlijk advies",
      "Incl. voorrijkosten en btw",
    ],
    featured: true,
  },
  {
    name: "Groot",
    size: "Voor tv's vanaf 65 inch",
    price: "€149",
    features: [
      "Montage op elke muur",
      "Met twee monteurs indien nodig",
      "Aansluiten en instellen",
      "Incl. voorrijkosten en btw",
    ],
    featured: false,
  },
];

export const addons = [
  { naam: "Complete tv installatie zonder ophangen: tv op meubel aansluiten en gebruiksklaar maken", prijs: "€70" },
  { naam: "Kabels wegwerken in kabelgoot (gespoten in muurkleur)", prijs: "vanaf €39" },
  { naam: "Kabels volledig in de muur wegwerken", prijs: "op maat" },
  { naam: "Soundbar installeren en afstellen", prijs: "€49" },
  { naam: "Surround- of home-cinema-set aansluiten", prijs: "vanaf €79" },
  { naam: "Tv-beugel nodig? Wij regelen er op aanvraag een", prijs: "op aanvraag" },
  { naam: "Tv hulp aan huis — instellen, zenders, wifi en apps", prijs: "€60" },
];

export const stats = [
  { value: "12.000+", label: "tv's vakkundig opgehangen" },
  { value: "4,9 / 5", label: "gemiddelde klantbeoordeling" },
  { value: "7 dagen", label: "per week bereikbaar" },
  { value: "±60 min", label: "gemiddelde montagetijd" },
];

/**
 * Kernvoordelen (USP's) — één bron van waarheid, sitebreed consistent.
 * Gebruikt op de diensten-, tv-ophangen- en stad-pagina's.
 */
export const usps = [
  "Vaste prijzen, inclusief voorrijkosten en btw",
  "Vaak binnen 24 uur een afspraak",
  "Volledig verzekerde monteurs",
  "Ook 's avonds en in het weekend, zonder toeslag",
];

export const reviews = [
  {
    quote:
      "Binnen een uur hing onze 65-inch strak boven het dressoir. Geen kabel te zien. Echt vakwerk.",
    name: "Sandra V.",
  },
  {
    quote:
      "Zaterdagochtend gebeld, maandagavond gemonteerd. De monteur dacht mee over de perfecte kijkhoogte.",
    name: "Mark de Jong",
  },
  {
    quote:
      "Ook de soundbar en alle apps werden direct geregeld. Vriendelijk, netjes en precies op tijd.",
    name: "Familie Bakker",
  },
  {
    quote:
      "Vaste prijs vooraf afgesproken, geen verrassingen achteraf. Precies wat u wilt.",
    name: "Kevin R.",
  },
  {
    quote:
      "De kabels zijn volledig in de muur weggewerkt. Je ziet er echt helemaal niets meer van.",
    name: "Petra M.",
  },
  {
    quote:
      "Onze tv hangt kaarsrecht op een lastige gipswand. Ze wisten precies wat ze deden.",
    name: "Youssef B.",
  },
  {
    quote:
      "Netjes gewerkt, alles opgeruimd achtergelaten en geduldig alles uitgelegd. Top service.",
    name: "Familie Willemsen",
  },
  {
    quote:
      "Snel een afspraak, duidelijke communicatie en een keurige montage. Echt een aanrader.",
    name: "Anouk T.",
  },
  {
    quote:
      "Onze grote tv met twee monteurs veilig opgehangen. Voelt echt solide aan de muur.",
    name: "Dennis K.",
  },
];

export type FaqItem = { q: string; a: string };

export const faqAlgemeen: FaqItem[] = [
  {
    q: "Heb ik zelf een beugel nodig?",
    a: "Wij verkopen zelf geen beugels, maar we kunnen er op aanvraag een voor u regelen. Geef bij het maken van de afspraak door welke tv u heeft, dan zorgen we dat de juiste beugel klaarligt. Heeft u er al een? Dan monteren we die natuurlijk gewoon.",
  },
  {
    q: "Kan een tv op elke muur worden opgehangen?",
    a: "Vrijwel altijd. Steen, beton en hout zijn nooit een probleem. Bij gipsplaat of holle wanden gebruiken we speciale bevestigingen en controleren we vooraf het draagvermogen, zodat uw tv gegarandeerd veilig hangt.",
  },
  {
    q: "Hoe lang duurt de montage?",
    a: "Een standaard montage duurt gemiddeld 45 tot 60 minuten. Werken we ook de kabels volledig weg, reken dan op ongeveer 90 minuten. De monteur laat alles netjes en schoon achter.",
  },
  {
    q: "Werken jullie ook 's avonds en in het weekend?",
    a: "Ja. We plannen afspraken doordeweeks tot 21:00 uur en in het weekend (zaterdag en zondag) van 09:00 tot 17:00 uur — zonder avond- of weekendtoeslag. U kiest het moment dat ú uitkomt.",
  },
  {
    q: "Wat kost het wegwerken van kabels?",
    a: "Kabels wegwerken in een kabelgoot, gespoten in de kleur van uw muur, kan al vanaf €39. Wilt u de kabels volledig in de muur weggewerkt hebben? Dan maken we vooraf een vaste prijsafspraak op maat.",
  },
  {
    q: "Zijn jullie monteurs verzekerd?",
    a: "Ja. Al onze monteurs zijn volledig verzekerd en werken zorgvuldig, zodat u bij ons altijd zorgeloos bent.",
  },
];
