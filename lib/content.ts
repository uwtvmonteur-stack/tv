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
    price: "€129",
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
    price: "€179",
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

export type Review = { quote: string; name: string };

/**
 * LET OP — deze reviews zijn nog PLACEHOLDERS, net als `stats` en
 * `SITE.reviews`. Vervang ze door echte beoordelingen voordat er structureel
 * mee geadverteerd wordt: verzonnen klantervaringen zijn in strijd met het
 * Google Ads-beleid rond misleiding.
 *
 * `reviews` is de gemengde set voor algemene pagina's (home, prijzen, over ons,
 * werkgebied, steden). Per dienst staat er een eigen set in `reviewsPerDienst`,
 * zodat een bezoeker op de soundbarpagina ook over soundbars leest.
 */
export const reviews: Review[] = [
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

/**
 * Reviews per dienst — de sleutels zijn de slugs uit `diensten`. Ook nog
 * PLACEHOLDERS; zie de waarschuwing hierboven.
 */
export const reviewsPerDienst: Record<string, Review[]> = {
  "tv-ophangen": [
    {
      quote:
        "Binnen een uur hing onze 65-inch strak boven het dressoir. Geen kabel te zien. Echt vakwerk.",
      name: "Sandra V.",
    },
    {
      quote:
        "Onze tv hangt kaarsrecht op een lastige gipswand. Ze wisten precies wat ze deden.",
      name: "Youssef B.",
    },
    {
      quote:
        "De monteur dacht mee over de kijkhoogte. Daar had ik zelf niet bij stilgestaan.",
      name: "Mark de Jong",
    },
    {
      quote:
        "Vaste prijs vooraf afgesproken en dat was ook precies wat ik betaalde.",
      name: "Kevin R.",
    },
    {
      quote:
        "Onze grote tv met twee monteurs opgehangen. Voelt echt solide aan de muur.",
      name: "Dennis K.",
    },
    {
      quote:
        "Boorafval meegenomen en alles opgeruimd achtergelaten. Keurig gewerkt.",
      name: "Anouk T.",
    },
  ],
  "tv-installatie": [
    {
      quote:
        "Nieuwe tv 's ochtends bezorgd, 's avonds keken we al. Alles stond ingesteld.",
      name: "Ilse den Boer",
    },
    {
      quote:
        "De zenders zijn gesorteerd zoals wij ze gewend waren. Scheelde ons veel zoeken.",
      name: "Familie Bakker",
    },
    {
      quote:
        "Decoder, soundbar en de spelcomputer in één keer aangesloten. Werkt allemaal.",
      name: "Rachid E.",
    },
    {
      quote:
        "Mijn moeder kreeg rustig uitleg tot ze het zelf kon. Daar ging het haar om.",
      name: "Marieke S.",
    },
    {
      quote:
        "Ook de streaming-apps ingesteld en ingelogd. Ik hoefde zelf niets uit te zoeken.",
      name: "Tim V.",
    },
    {
      quote:
        "Het verpakkingsafval namen ze mee. Geen berg karton in de gang achtergelaten.",
      name: "Joost W.",
    },
  ],
  "soundbar-installatie": [
    {
      quote:
        "Eindelijk geluid zoals het hoort. De subwoofer staat nu op de juiste plek.",
      name: "Bram L.",
    },
    {
      quote:
        "Onze Atmos-set met achterspeakers aangesloten en afgestemd op de kamer.",
      name: "Familie Kroon",
    },
    {
      quote:
        "Alles werkt nu met één afstandsbediening. Dat kreeg ik zelf niet voor elkaar.",
      name: "Hanneke D.",
    },
    {
      quote:
        "De kabels zitten in een goot in muurkleur. Je ziet er echt niets meer van.",
      name: "Petra M.",
    },
    {
      quote:
        "Bleek dat het via eARC moest. Ik had hem al die tijd verkeerd aangesloten.",
      name: "Ruben J.",
    },
    {
      quote:
        "Binnen drie kwartier klaar en hij liet meteen horen wat het verschil was.",
      name: "Sanne B.",
    },
  ],
  "tv-instellen": [
    {
      quote:
        "Na een storing waren al onze zenders weg. Binnen een half uur weer op orde.",
      name: "Greet H.",
    },
    {
      quote:
        "Netflix deed het niet meer. Opgelost én uitgelegd waarom het misging.",
      name: "Ferry O.",
    },
    {
      quote:
        "Geen wifi meer op de tv na het wisselen van provider. Nu weer verbinding.",
      name: "Familie Smit",
    },
    {
      quote:
        "Geduldig uitgelegd, zonder moeilijke woorden. Voor mijn vader ideaal.",
      name: "Linda K.",
    },
    {
      quote:
        "Eén universele afstandsbediening geprogrammeerd voor alles. Heerlijk rustig.",
      name: "Wim de Vries",
    },
    {
      quote:
        "Eerlijk verteld dat het scherm zelf kapot was en waar ik terechtkon.",
      name: "Nadia A.",
    },
  ],
};

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
