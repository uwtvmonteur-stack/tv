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

/**
 * De drie montagetarieven per tv-formaat — op verzoek van de eigenaar terug
 * (22-10-2026). Tussentijds stond hier één vanafprijs van €89 met een offerte
 * erachter; dat is teruggedraaid naar de prijzen zoals ze waren.
 *
 * Dit is de enige bron voor die bedragen. De prijspagina, de homepage, de
 * dienstpagina, de 32 stadpagina's en de vier provinciepagina's lezen
 * allemaal hiervandaan, en `VANAF_PRIJS` hieronder wordt afgeleid van de
 * laagste klasse in plaats van los ingetikt — zodat een prijswijziging nooit
 * half doorkomt.
 *
 * `populair` zet de middelste klasse visueel voorop: dat is het formaat
 * waar de meeste aanvragen in vallen.
 */
export type Prijsklasse = {
  naam: string;
  maat: string;
  prijs: string;
  inbegrepen: string[];
  populair: boolean;
};

export const prijsklassen: Prijsklasse[] = [
  {
    naam: "Compact",
    maat: "Voor tv's tot 43 inch",
    prijs: "€99",
    inbegrepen: [
      "Montage op elke muur",
      "Waterpas gemonteerd én getest",
      "Aansluiten en instellen",
      "Incl. voorrijkosten en btw",
    ],
    populair: false,
  },
  {
    naam: "Standaard",
    maat: "Voor tv's van 44 t/m 64 inch",
    prijs: "€129",
    inbegrepen: [
      "Montage op elke muur",
      "Waterpas gemonteerd én getest",
      "Aansluiten en instellen",
      "Kabelcheck en persoonlijk advies",
      "Incl. voorrijkosten en btw",
    ],
    populair: true,
  },
  {
    naam: "Groot",
    maat: "Voor tv's vanaf 65 inch",
    prijs: "€159",
    inbegrepen: [
      "Montage op elke muur",
      "Met twee monteurs indien nodig",
      "Aansluiten en instellen",
      "Incl. voorrijkosten en btw",
    ],
    populair: false,
  },
];

/**
 * Het laagste montagetarief, voor koppen, metadata en schema.org. Afgeleid en
 * niet ingetikt: één plek wijzigen moet genoeg zijn.
 */
export const VANAF_PRIJS = prijsklassen[0].prijs;

/**
 * "€99, €129 of €159" — de drie tarieven in lopende tekst, voor koppen en
 * inleidingen. Afgeleid, zodat een bedrag dat hierboven wijzigt niet ergens
 * in een zin blijft staan.
 */
export const PRIJZEN_KORT = prijsklassen
  .map((klasse) => klasse.prijs)
  .reduce((zin, prijs, i, alle) =>
    i === 0 ? prijs : i === alle.length - 1 ? `${zin} of ${prijs}` : `${zin}, ${prijs}`,
  );

export type Tarief = {
  naam: string;
  /**
   * "€129", "vanaf €39" of "op offerte" — altijd tekst. lib/seo.ts leest het
   * woord "vanaf" en maakt er dan een `minPrice` van in plaats van een harde
   * `price`, dus de notatie bepaalt wat er in het zoekresultaat komt.
   */
  prijs: string;
  toelichting: string;
};

/**
 * Wat wij doen en wat het ongeveer kost. Bewust allemaal vanafprijzen: het
 * exacte bedrag staat in de offerte, en een bedrag dat op de site anders is
 * dan in de offerte kost precies het vertrouwen dat die offerte moet
 * opbouwen.
 */
export const tarieven: Tarief[] = [
  {
    naam: "Tv ophangen",
    // `vanaf` en niet "€99 – €159": lib/seo.ts maakt van een vanafprijs een
    // `minPrice` en van een kaal bedrag een harde `price`. Een harde €99 in
    // een zoekresultaat terwijl een 75 inch €159 kost, is precies het soort
    // afwijking waar Google een rich result op afkeurt. De drie bedragen
    // staan in de toelichting en volledig uitgesplitst in `prijsklassen`.
    prijs: `vanaf ${VANAF_PRIJS}`,
    toelichting: `${prijsklassen
      .map((klasse) => `${klasse.prijs} ${klasse.maat.replace(/^Voor tv's /, "")}`)
      .join(", ")}. Elke wand, waterpas gemonteerd en belast getest.`,
  },
  {
    // Leest als de dienst en niet als een uitzondering op een andere dienst:
    // "complete installatie zonder ophangen" laat een bezoeker eerst uitzoeken
    // wat er dan níet bij zit. Het bedrag blijft ongewijzigd.
    naam: "Tv plaatsen en aansluiten (zonder ophangen)",
    prijs: "€70",
    toelichting:
      "Tv op een meubel plaatsen, alles aansluiten en gebruiksklaar maken.",
  },
  {
    naam: "Kabels wegwerken in een kabelgoot",
    prijs: "vanaf €39",
    toelichting: "Gespoten in de kleur van uw muur, in dezelfde rit.",
  },
  {
    naam: "Kabels volledig in de muur wegwerken",
    prijs: "op offerte",
    toelichting:
      "Hakken, dichtzetten en afwerken. Hangt af van uw wand en de afstand.",
  },
  {
    naam: "Soundbar aansluiten en afstellen",
    prijs: "€49",
    toelichting: "Via HDMI ARC of eARC, afgesteld op uw ruimte.",
  },
  {
    naam: "Surround- of home-cinema-set aansluiten",
    prijs: "vanaf €79",
    toelichting: "Inclusief subwoofer en achterspeakers.",
  },
  {
    naam: "Tv-beugel die bij uw tv en wand past",
    prijs: "op offerte",
    toelichting:
      "Heeft u er al een, dan monteren wij die — ook als u hem elders kocht.",
  },
  {
    naam: "Tv boven een open haard",
    prijs: "op offerte",
    toelichting:
      "Alleen na meting van de temperatuur en het draagvermogen ter plekke.",
  },
  {
    naam: "Tv hulp aan huis — instellen, zenders, wifi en apps",
    prijs: "€60",
    toelichting: "Opgelost én uitgelegd, in gewone taal.",
  },
];

/**
 * Wat er naast het montagetarief bij kan komen — en wat juist niet.
 *
 * Hoort onder de drie prijsklassen. Een vast bedrag per formaat roept direct
 * de vervolgvraag op: waar loopt het dan alsnog op? Dat hier noemen zijn geen
 * kleine lettertjes maar het tegenovergestelde — wie het pas bij de monteur
 * aan de deur hoort voelt zich overvallen, en dat is precies wat een vaste
 * prijs moet voorkomen. De laatste staat er bewust tussen: de wand is de
 * meestverwachte meerprijs en die rekenen wij niet.
 */
export const prijsExtras = [
  {
    kop: "De tv-beugel zelf",
    tekst:
      "Heeft u er al een, dan hangen wij die op — ook als u hem elders kocht. Zo niet, dan regelen wij er een die past en hoort u het bedrag vóór de afspraak.",
  },
  {
    kop: "Kabels wegwerken",
    tekst:
      "In een goot in uw eigen muurkleur vanaf €39 als we het in dezelfde rit meenemen. Volledig in de wand is maatwerk.",
  },
  {
    kop: "Een tv boven de haard",
    tekst:
      "Alleen na meting van de temperatuur en het draagvermogen ter plekke. Daarna hoort u het bedrag, en pas dan beslist u.",
  },
  {
    kop: "Uw wand kost niets extra",
    tekst:
      "Steen, beton, gipsplaat of een holle voorzetwand: de juiste bevestiging zit in het tarief, wat de monteur ook aantreft.",
  },
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
  "Vaste prijs per tv-formaat, vanaf €99 inclusief voorrijkosten en btw",
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
    a: "Kabels wegwerken in een kabelgoot, gespoten in de kleur van uw muur, kan al vanaf €39 als we het in dezelfde rit meenemen. Kabels volledig in de muur wegwerken is maatwerk; dat bedrag staat in uw offerte, zodat u het kent voordat er gehakt wordt.",
  },
  {
    q: "Zijn jullie monteurs verzekerd?",
    // "Zodat u altijd zorgeloos bent" stond hier eerst, en dat is precies het
    // woord waar iemand met een tv van duizend euro niets aan heeft. De vraag
    // onder de vraag is: wie draait ervoor op als mijn tv of mijn muur
    // beschadigd raakt? Dat antwoord staat er nu, en het is hetzelfde antwoord
    // als bij het vierde bezwaar hieronder.
    a: "Ja, volledig. Raakt er bij de montage iets beschadigd aan uw tv of uw muur, dan is dat verzekerd en lossen wij het op. U heeft daarvoor te maken met ons, niet met een onderaannemer die u niet kent.",
  },
];

/**
 * De vier dingen die een bezoeker tegenhouden, met het antwoord erbij. Niet
 * bedacht maar gevonden: op elk van deze vier punten heeft de concurrentie een
 * nee, een toeslag of een voorbehoud, en wij niet. Daarom staan ze op de twee
 * pagina's waar de beslissing valt, vlak voor de prijs — en niet pas onderaan
 * in de FAQ, waar niemand meer komt die al is afgehaakt.
 */
export const bezwaren = [
  {
    vraag: "Ik heb mijn tv niet bij u gekocht",
    antwoord:
      "Dat hoeft ook niet. Wij hangen elke tv op: elk merk, uit elke winkel, en ook een tv die u al jaren heeft. Bij de grote webwinkels kunt u montage alleen meebestellen bij een nieuwe tv.",
  },
  {
    vraag: "Mijn wand is van gipsplaat of hol",
    antwoord:
      "Dat kost bij ons niets extra. Wij controleren het draagvermogen en gebruiken de bevestiging die bij uw wand hoort. Het bedrag uit uw offerte blijft staan, ook als de wand anders blijkt dan u dacht.",
  },
  {
    vraag: "Bij mij kan het alleen 's avonds of in het weekend",
    antwoord:
      "Dan komen we 's avonds of in het weekend, zonder toeslag. Doordeweeks plannen we tot 21:00 uur, zaterdag en zondag van 09:00 tot 17:00 uur. Hetzelfde tarief als op een dinsdagmiddag.",
  },
  {
    vraag: "Wie is verantwoordelijk als er iets misgaat?",
    antwoord:
      "Wij, en niemand anders. U heeft te maken met het bedrijf dat de klus zelf uitvoert, niet met een platform dat hem doorgeeft aan een partij die u niet kent. Onze monteurs zijn verzekerd en wij zijn aanspreekbaar op het resultaat.",
  },
];

/**
 * Wat de prijs níet verandert. Staat op de prijspagina pal onder de tarieven,
 * omdat elke concurrent juist op deze drie punten een toeslag rekent: een
 * wand die anders blijkt, de avond en het weekend, en meerwerk dat ter plekke
 * wordt bedacht. Een vaste prijs is pas een argument als erbij staat waar hij
 * tegen vast is.
 */
export const prijsGaranties = [
  {
    icon: "shield",
    kop: "De prijs die u ziet is de prijs die u betaalt",
    tekst:
      "Gipsplaat, een holle wand of beton achter het stucwerk: wij gebruiken de bevestiging die erbij hoort en het tarief verandert daar niet van.",
  },
  {
    icon: "clock",
    kop: "Ook 's avonds en in het weekend",
    tekst:
      "Doordeweeks tot 21:00 uur, zaterdag en zondag van 09:00 tot 17:00. Geen avondtarief en geen weekendtoeslag.",
  },
  {
    icon: "check",
    kop: "Nooit meerwerk zonder uw ja",
    tekst:
      "Komen we iets tegen dat extra werk kost, dan hoort u eerst wat het kost. U betaalt pas na afloop, als het hangt en het werkt.",
  },
] as const;
