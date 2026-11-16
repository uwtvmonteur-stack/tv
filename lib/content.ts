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
    // De slug blijft "tv-instellen" omdat de URL in Google en in de
    // advertenties staat; de naam volgt wél de zoekterm die converteert.
    // "Tv hulp aan huis" gaf in 90 dagen drie klikken en een conversie op elf
    // vertoningen, "tv instellen" één klik op vijfentwintig.
    naam: "Tv hulp aan huis",
    kort: "Geen zenders, geen geluid of geen wifi? Wij verhelpen het en leggen rustig uit wat er mis was.",
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
      "Waterpas gemonteerd én getest",
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
 * Het vaste tarief voor tv hulp aan huis — storingen, instellingen, zenders,
 * geluid en verbinding. Stond als losse `const PRIJS = "€60"` in
 * /diensten/tv-instellen; sinds er ook pagina's voor "geen geluid" en "geen
 * verbinding" zijn, komt hetzelfde bedrag op drie plaatsen voor en hoort het
 * hier.
 */
export const TV_HULP_PRIJS = "€60";

/**
 * Het vaste tarief voor een complete tv installatie zonder ophangen: tv
 * plaatsen, alles aansluiten en gebruiksklaar maken.
 *
 * Op 16-11-2026 heeft de eigenaar dit van €70 naar €60 gebracht. Het stond
 * op zes plekken los ingetikt — hier in `tarieven`, als
 * `const PRIJS = "€70"` op /diensten/tv-installatie, in de paginatitel, in
 * de meta-description, als `"70"` in het Service-schema van die pagina en
 * twee keer in public/llms.txt. Nu leest alles in de code dit af.
 *
 * Een eigen constante en niet `TV_HULP_PRIJS`, al zijn de bedragen nu
 * gelijk: dit zijn twee verschillende diensten, en de ene moet kunnen
 * wijzigen zonder de andere mee te nemen.
 */
export const TV_INSTALLATIE_PRIJS = "€60";

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

/**
 * De zin die onder de prijspillen in de hero hoort. Stond als staart aan de
 * lead van de homepage, waar hij na de pillen dubbelop werd.
 */
export const PRIJS_NOOT =
  "Vaste prijs per klus, inclusief voorrijkosten en btw.";

/**
 * De lopende band onder de hero. Korte uitspraken die elders op de site al
 * woordelijk worden waargemaakt — er staat hier niets wat een pagina niet
 * ook uitlegt. Een band met beloften die nergens worden onderbouwd is
 * precies het soort versiering dat een site goedkoop maakt.
 */
export const BAND_UITSPRAKEN = [
  "Eigen monteurs in loondienst",
  "Vaste prijs per tv-formaat",
  "Avond en weekend zonder toeslag",
  "Waterpas en belast getest",
  "Schade door ons werk verzekerd",
  "Vaak al binnen 24 uur",
] as const;

/**
 * De drie tarieven als korte pillen voor de hero: formaat boven, bedrag
 * onder. Afgeleid van `prijsklassen`, dus er staat nooit een bedrag in een
 * hero dat de prijskaarten tegenspreekt.
 *
 * `maat` is hier te lang ("Voor tv's tot 43 inch"); in een pil naast twee
 * andere pillen moet het "tot 43 inch" zijn, anders breekt de rij op een
 * telefoon van 360px over drie regels.
 */
export const HERO_PRIJZEN = prijsklassen.map((klasse) => ({
  label: klasse.maat.replace(/^Voor tv's\s*/, ""),
  prijs: klasse.prijs,
}));

/**
 * De regels naast het afspraakformulier — wat de bezoeker wél en niet van de
 * aanvraag mag verwachten.
 *
 * Eén bron, omdat dit lijstje op dertien paginabestanden stond: acht keer
 * onder de naam `offerteBelofte` en vijf keer onder `aanvraagBelofte`, met
 * zes regels die er woordelijk gelijk in stonden. Een pagina kiest hieruit en
 * zet er zijn eigen regel bij ("Een gipswand kost bij ons niets extra"); wat
 * voor de hele site geldt staat hier, zodat een wijziging niet in twaalf
 * bestanden half doorkomt.
 */
export const BELOFTE = {
  vrijblijvend: "Vrijblijvend: u zit aan niets vast tot u ja zegt",
  inclusief: "Het bedrag is inclusief voorrijkosten en btw",
  geenAanbetaling: "Geen aanbetaling — u betaalt pas na afloop",
  verzekerd: "Schade door ons werk is verzekerd — wij lossen het op",
  snel: "Vaak al binnen 24 uur een afspraak mogelijk",
  avondWeekend: "Ook 's avonds en in het weekend, zonder toeslag",
} as const;

export type Tarief = {
  naam: string;
  /**
   * "€129", "vanaf €39" of "na meting" — altijd tekst. lib/seo.ts leest het
   * woord "vanaf" en maakt er dan een `minPrice` van in plaats van een harde
   * `price`, dus de notatie bepaalt wat er in het zoekresultaat komt.
   */
  prijs: string;
  toelichting: string;
};

/**
 * Wat wij doen en wat het kost. Drie soorten bedrag, en het verschil is geen
 * slordigheid maar een belofte: een vast bedrag (€60 voor een installatie,
 * €49 voor een soundbar, €60 voor hulp aan huis) betaalt de klant exact zo,
 * een vanafprijs (vanaf €99, vanaf €39, vanaf €79) hangt af
 * van formaat of afstand, en "na meting" kan pas na controle ter plekke.
 *
 * Een dienst hoort dus overal op de site met dezelfde soort genoemd te
 * worden. "Vanaf €60" op de homepage terwijl drie andere pagina's "vaste
 * prijs €60" zeggen, is voor de bezoeker het verschil tussen een bedrag en
 * een voorschot — en precies het vertrouwen dat de offerte moet opbouwen.
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
    // wat er dan níet bij zit. Die naamswijziging liet het bedrag staan; op
    // 16-11-2026 is het bedrag zelf van €70 naar €60 gegaan.
    naam: "Tv plaatsen en aansluiten (zonder ophangen)",
    // `TV_INSTALLATIE_PRIJS` en niet "€60": hetzelfde bedrag staat op
    // /diensten/tv-installatie in de kop, het prijsblok, het afspraakblok, de
    // paginatitel, de meta-description en het schema.
    prijs: TV_INSTALLATIE_PRIJS,
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
    prijs: "na meting",
    toelichting:
      "Hakken, dichtzetten en afwerken. Hangt af van uw wand en de afstand.",
  },
  {
    naam: "Soundbar aansluiten en afstellen",
    prijs: "€49",
    toelichting: "Via HDMI ARC of eARC, afgesteld op uw ruimte.",
  },
  {
    naam: "Surround-set aansluiten",
    prijs: "vanaf €79",
    toelichting: "Inclusief subwoofer en achterspeakers.",
  },
  {
    // Stond samen met de surround-set op één regel "vanaf €79", terwijl de
    // soundbarpagina voor home-cinema "na meting" zegt. Twee prijzen voor
    // één woord; nu twee regels met elk hun eigen bedrag.
    naam: "Home-cinema met losse versterker en bekabeling",
    prijs: "na meting",
    toelichting: "Eerst kijken wat er ligt en wat er bij moet, dan een bedrag.",
  },
  {
    naam: "Tv-beugel die bij uw tv en wand past",
    prijs: "na meting",
    toelichting:
      "Alleen nodig als u er nog geen heeft. Het bedrag hangt af van uw tv en uw wand.",
  },
  {
    naam: "Tv boven een open haard",
    prijs: "na meting",
    toelichting:
      "Alleen na meting van de temperatuur en het draagvermogen ter plekke.",
  },
  {
    naam: "Tv hulp aan huis — instellen, zenders, wifi en apps",
    // `TV_HULP_PRIJS` en niet "€60": datzelfde bedrag staat ook op
    // /diensten/tv-instellen, /tv-geen-geluid en /tv-geen-wifi, en die drie
    // lezen het hierboven af. Een tweede keer intikken is precies hoe één
    // prijswijziging half doorkomt.
    prijs: TV_HULP_PRIJS,
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
  { value: "zeven dagen", label: "per week bereikbaar" },
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

/**
 * Hier stonden negen verzonnen beoordelingen (`reviews` en
 * `reviewsPerDienst`, met `type Review`), die op tien tot twaalf pagina's
 * werden getoond. Op 16-11-2026 heeft de eigenaar ze eruit laten halen;
 * alleen het cijfer uit `SITE.reviews` blijft staan. Verzonnen
 * klantervaringen zijn in strijd met het Google Ads-beleid rond misleiding,
 * en er loopt een Ads-account.
 *
 * Komen er echte beoordelingen, dan horen ze hier terug — en dan met per
 * beoordeling een eigen waardering, want negen keer vijf sterren kan geen
 * 4,9 gemiddeld opleveren. `SITE.reviews.score` en `.count` zijn nog steeds
 * geen gemeten cijfers; `.url` naar het Google-bedrijfsprofiel maakt ze na
 * te kijken.
 */

export type FaqItem = { q: string; a: string };

export const faqAlgemeen: FaqItem[] = [
  {
    q: "Heb ik zelf een beugel nodig?",
    a: "Heeft u al een beugel, dan monteren wij die — ook als u hem ergens anders kocht. Heeft u er geen, dan regelen wij er een die bij uw tv en uw wand past; u hoort het bedrag van de beugel vóór de afspraak, zodat u dan pas beslist.",
  },
  {
    q: "Kan een tv op elke muur worden opgehangen?",
    a: "Vrijwel altijd. Steen, beton en hout zijn zelden een probleem. Bij gipsplaat of holle wanden gebruiken we speciale bevestigingen en rekenen we vooraf het draagvermogen na. Kan het niet veilig, dan zeggen we dat vóórdat we boren.",
  },
  {
    q: "Hoe lang duurt de montage?",
    a:
      "Een standaard montage duurt gemiddeld 45 tot 60 minuten. Leggen we de kabels in een goot, reken dan op ongeveer 90 minuten in totaal. Kabels volledig in de muur wegwerken is een klus apart: dat kost anderhalf tot drie uur, afhankelijk van uw wand en de afstand. De monteur laat alles netjes en schoon achter.",
  },
  {
    q: "Werken jullie ook 's avonds en in het weekend?",
    a: "Ja. We plannen afspraken doordeweeks tot 21:00 uur en in het weekend (zaterdag en zondag) van 09:00 tot 17:00 uur — zonder avond- of weekendtoeslag. U kiest het moment dat ú uitkomt.",
  },
  {
    q: "Wat kost het wegwerken van kabels?",
    a: "Kabels wegwerken in een kabelgoot, gespoten in de kleur van uw muur, kan al vanaf €39 als we het in dezelfde rit meenemen. Kabels volledig in de muur wegwerken is maatwerk; dat bedrag hoort u vooraf, zodat u het kent voordat er gehakt wordt.",
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
    // Niet "Ook 's avonds en in het weekend": dat is woordelijk de kop van
    // `BEWIJS[3]`, en op /prijzen staan die twee blokken op dezelfde pagina.
    // Dezelfde kop twee keer onder elkaar leest als een fout, ook als de
    // tekst eronder verschilt.
    kop: "Geen avond- en geen weekendtarief",
    tekst:
      "Doordeweeks tot 21:00 uur, zaterdag en zondag van 09:00 tot 17:00. Hetzelfde bedrag als op een dinsdagmiddag.",
  },
  {
    icon: "check",
    kop: "Nooit meerwerk zonder uw ja",
    tekst:
      "Komen we iets tegen dat extra werk kost, dan hoort u eerst wat het kost. U betaalt pas na afloop, als het hangt en het werkt.",
  },
] as const;
