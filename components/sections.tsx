import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import Faq from "./Faq";
import HeroVideo from "./HeroVideo";
import { DienstIcon, Icon, type IconName } from "./Icon";
import {
  BAND_UITSPRAKEN,
  PRIJS_NOOT,
  PRIJZEN_KORT,
  diensten,
  dienstHref,
  prijsExtras,
  prijsklassen,
  type FaqItem,
} from "@/lib/content";

/* =========================================================================
   Sectiebibliotheek
   =========================================================================
   Elke pagina is opgebouwd uit de blokken hieronder. Een pagina levert
   inhoud, een blok bepaalt vorm. Staat er in een pagina een `rounded-`,
   `shadow-` of `px-`-klasse, dan hoort die hier.

   De vorm volgt de huisstijl van de andere eigen sites: donkere hero met
   raster en gloed, foto in een afgeronde kaart ernaast, witte kaarten met
   haarlijnring op een koel grijs vlak, genummerde stappen, en één donkere
   vertrouwensband in het midden van de pagina.
   ========================================================================= */

/* ---- Casco ------------------------------------------------------------- */

export function Vlak({
  children,
  id,
  toon = "wit",
  labelledBy,
  className = "",
}: {
  children: ReactNode;
  id?: string;
  /**
   * `wit` en `oppervlak` wisselen elkaar af en vormen samen het ritme van de
   * pagina. `donker` is het bijna-zwarte vlak met raster en gloed —
   * spaarzaam, voor de vertrouwensband.
   *
   * Er stond hier ook `papier`, een tweede naam voor wit uit de vorige
   * generatie, en dat was de standaardwaarde. Een vlak zonder `toon` kreeg
   * dus een andere naam maar dezelfde kleur als het vlak ervoor, waarna de
   * scheiding tussen twee secties verdween zonder dat iets dat meldde. Nu is
   * er één naam per kleur en is `wit` de standaard.
   */
  toon?: "oppervlak" | "wit" | "donker";
  labelledBy?: string;
  className?: string;
}) {
  const donker = toon === "donker";
  const tonen = {
    oppervlak: "bg-surface",
    wit: "bg-white",
    donker: "op-donker relative isolate overflow-hidden bg-ink-950 text-ink-200",
  };

  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`vlak ${tonen[toon]} ${className}`}
    >
      {donker && (
        <>
          <div aria-hidden="true" className="raster absolute inset-0" />
          <div aria-hidden="true" className="gloed -right-32 -top-32 size-[30rem]" />
        </>
      )}
      <div className="kader relative">{children}</div>
    </section>
  );
}

/* ---- Sectiekop --------------------------------------------------------- */

export function Kop({
  bovenkop,
  titel,
  tekst,
  donker = false,
  midden = false,
  id,
  className = "",
}: {
  bovenkop?: string;
  titel: ReactNode;
  tekst?: ReactNode;
  donker?: boolean;
  /** Gecentreerd, voor secties die de volle breedte innemen. */
  midden?: boolean;
  id?: string;
  className?: string;
}) {
  return (
    <div
      className={`komt-op max-w-3xl ${midden ? "mx-auto text-center" : ""} ${className}`}
    >
      {bovenkop && (
        <p className={donker ? "bovenkop-donker" : "bovenkop"}>{bovenkop}</p>
      )}
      <h2
        id={id}
        className={`text-h2 ${bovenkop ? "mt-4" : ""} ${donker ? "text-white" : ""}`}
      >
        {titel}
      </h2>
      {tekst && (
        <p className={`mt-4 ${donker ? "inleiding-donker" : "inleiding"}`}>
          {tekst}
        </p>
      )}
    </div>
  );
}

/* ---- Hero -------------------------------------------------------------- */

/**
 * De opening van elke pagina: bijna-zwart vlak, tekst links, foto rechts.
 *
 * Dit is de hero van de andere eigen sites, en de reden dat die werkt is
 * niet de kleur maar de ordening. De tekst staat náást de foto en niet
 * eróver, dus de kop is wit op #0b0d11 (17:1) in plaats van wit op een
 * willekeurige foto — waar eerder 1,4:1 werd gemeten. De foto houdt
 * daardoor zijn eigen kleuren en hoeft niet half weggepoetst te worden.
 *
 * Op een telefoon staat de tekst boven en de foto eronder, zodat het eerste
 * wat iemand ziet de kop, het tarief en de knop zijn.
 */
export function Hero({
  bovenkop,
  titel,
  inleiding,
  children,
  beeld,
  beeldAlt,
  video,
  kruimels,
  preload = true,
  groot = false,
  prijzen,
  merk,
}: {
  bovenkop?: string;
  titel: ReactNode;
  inleiding?: ReactNode;
  children?: ReactNode;
  beeld?: string;
  beeldAlt?: string;
  /** Alleen de homepage. De posterafbeelding blijft eronder staan. */
  video?: string;
  kruimels?: ReactNode;
  /**
   * De preload-hint op het herobeeld. Heette tot Next 16 `priority`; die
   * prop is daar vervangen door `preload` en doet sindsdien niets meer.
   */
  preload?: boolean;
  /** Alleen de homepage: één maat groter, met het zwevende kaartje erbij. */
  groot?: boolean;
  /** Tarieven direct onder de kop, waar de koopvraag gesteld wordt. */
  prijzen?: { label: string; prijs: string }[];
  /**
   * De naamplaat op het beeld. Leeg laten op pagina's waar het beeld al
   * druk is; het is een accent, geen verplicht onderdeel.
   */
  merk?: string;
}) {
  const heeftBeeld = Boolean(beeld);

  return (
    <section className="op-donker relative isolate overflow-hidden bg-ink-950 text-ink-200">
      <div aria-hidden="true" className="raster absolute inset-0" />
      {/* Twee gloeden: één achter de kop en één laag rechts, zodat het vlak
          niet als een plat zwart blok leest. Twee radiale verlopen, nul bytes. */}
      <div aria-hidden="true" className="gloed -left-40 -top-44 size-[36rem]" />
      <div
        aria-hidden="true"
        className="gloed -right-24 bottom-0 size-[24rem] opacity-60"
      />

      <div
        className={`kader relative grid gap-10 ${
          groot
            ? "pb-12 pt-10 sm:pb-16 sm:pt-12 lg:pb-20 lg:pt-14"
            : "pb-10 pt-8 sm:pb-14 sm:pt-10 lg:pb-16 lg:pt-12"
        } ${heeftBeeld ? "lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14" : ""}`}
      >
        <div className="min-w-0">
          {kruimels}
          {bovenkop && (
            <p className={`bovenkop-donker ${kruimels ? "mt-6" : ""}`}>
              {/* Het knipperende puntje staat op alle vier de andere sites en
                  zegt hetzelfde als de tekst ernaast: er is nu iemand. */}
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-amber-300 opacity-60" />
                <span className="relative inline-flex size-2.5 rounded-full bg-amber-300" />
              </span>
              {bovenkop}
            </p>
          )}
          <h1 className={`${groot ? "text-display" : "text-h1"} mt-4 text-white`}>
            {titel}
          </h1>
          {inleiding && (
            <p className="inleiding-donker mt-4 max-w-xl">{inleiding}</p>
          )}

          {/* De knop staat bóven de prijstegels, en dat is geen smaakkwestie.
              Gemeten op 375x667 (de telefoonmaat waar dit project op rekent),
              met het prijsblok ervoor:

                /diensten/tv-installatie   knop eindigt op 569 px   4,8% conversie
                /diensten/tv-instellen     knop eindigt op 640 px   9,5%
                /                          knop eindigt op 617 px   4,7%
                /tv-ophangen               knop eindigt op 761 px   2,3%
                /prijzen                   knop eindigt op 772 px   2,0%
                /tv-ophangen/utrecht       knop eindigt op 742 px   -
                /tv-ophangen-gipswand      knop eindigt op 859 px   -

              Elke pagina waar de knop in het eerste scherm valt doet 4,7% of
              meer; elke pagina waar hij eronder valt doet 2,3% of minder. De
              drie tegels plus de notenregel zijn samen ongeveer 196 px, en dat
              is precies wat de knop eruit duwde.

              Het commentaar op /tv-ophangen zei al dat de knop vóór de vinkjes
              was gezet omdat hij "net buiten het eerste scherm viel". Die
              ingreep hielp niet, want het prijsblok dat diezelfde pagina
              meegeeft stond erboven.

              Dit raakt 35 pagina's: /tv-ophangen, /prijzen,
              /tv-ophangen-gipswand en de 32 stadpagina's. De prijzen zelf
              veranderen niet en staan nog in het eerste scherm of net eronder;
              alleen de volgorde is om. */}
          {children}

          {prijzen && (
            <>
              <dl className="mt-7 grid max-w-xl grid-cols-3 gap-2 sm:gap-3">
                {prijzen.map((p) => (
                  <div
                    key={p.label}
                    className="paneel-donker px-3 py-3 text-center sm:px-4 sm:py-4"
                  >
                    <dt className="text-2xs font-semibold uppercase tracking-[0.1em] text-ink-300 sm:text-xs">
                      {p.label}
                    </dt>
                    <dd className="cijfers mt-1.5 font-display text-xl font-extrabold text-white sm:text-2xl">
                      {p.prijs}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-sm text-ink-400">{PRIJS_NOOT}</p>
            </>
          )}
        </div>

        {heeftBeeld && (
          <div className="relative">
            <div
              className={`relative overflow-hidden rounded-3xl bg-ink-900 shadow-2xl ring-1 ring-white/15 ${
                video
                  ? "aspect-[4/3] md:aspect-[16/10] lg:aspect-[5/4]"
                  : "aspect-[4/3] lg:aspect-[5/4]"
              }`}
            >
              <Image
                src={beeld!}
                alt={beeldAlt ?? ""}
                fill
                preload={preload}
                fetchPriority={preload ? "high" : "auto"}
                sizes="(min-width: 1024px) 600px, 100vw"
                className="object-cover"
              />
              {video && <HeroVideo src={video} />}
              {/* Linksboven en niet linksonder: bij `groot` ligt daar het
                  zwevende kaartje, en die twee liepen over elkaar heen. */}
              {merk && (
                <p className="absolute left-4 top-4 rounded-xl bg-white/95 px-3.5 py-2 font-display text-sm font-extrabold text-ink-950 shadow-sm backdrop-blur-sm">
                  {merk}
                </p>
              )}
            </div>

            {/* Het zwevende kaartje. Op de andere sites staat hier de
                belbelofte; hier het antwoord op de vraag die iemand met een
                lege muur echt heeft: wat kost dit en wanneer weet ik dat. */}
            {groot && (
              <div className="relative mt-4 flex items-center gap-4 rounded-2xl bg-white p-4 text-ink-900 shadow-lift sm:absolute sm:-bottom-7 sm:right-6 sm:mt-0 sm:w-[21rem]">
                <span className="icoonvlak">
                  <Icon name="euro" className="size-6" />
                </span>
                <span>
                  <span className="block font-display font-extrabold text-ink-950">
                    U weet het bedrag vooraf
                  </span>
                  <span className="block text-sm text-ink-600">
                    Vaste prijs per tv-formaat, inclusief voorrijkosten en btw.
                  </span>
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export function HeroKnoppen({
  href = "#afspraak",
  label = "Afspraak maken",
  tweedeHref = "/prijzen",
  tweedeLabel = "Bekijk alle tarieven",
}: {
  href?: string;
  label?: string;
  tweedeHref?: string;
  tweedeLabel?: string;
}) {
  return (
    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
      <Link href={href} className="knop-vol knop-groot">
        {label}
        <Icon name="arrow-right" className="size-5" />
      </Link>
      <Link href={tweedeHref} className="knop-op-donker knop-groot">
        {tweedeLabel}
      </Link>
    </div>
  );
}

/* ---- Lopende band ------------------------------------------------------ */

/**
 * De band onder de hero: korte uitspraken die elders op de site woordelijk
 * worden waargemaakt. Hij sluit het donkere vlak van de hero af.
 *
 * Bewust stil, terwijl de andere eigen sites hier een lopende band hebben.
 * WCAG 2.2.2 (niveau A) vraagt een pauzeknop bij bewegende inhoud die
 * vanzelf begint, langer dan vijf seconden duurt en naast andere inhoud
 * staat — en `prefers-reduced-motion` geldt daar niet als zo'n knop. Een
 * pauzeknopje in een strook van 56 pixels is lelijker dan het probleem
 * groot is, en beweging vlak onder de hero concurreert bovendien met de
 * enige knop die daar staat. Stil ziet het er vrijwel hetzelfde uit.
 *
 * Op een telefoon kan de bezoeker de rij zelf opzij schuiven; dat is
 * door de gebruiker gestuurd en valt dus niet onder 2.2.2.
 */
export function Band() {
  return (
    <div className="border-y border-white/10 bg-ink-950">
      {/* Op een telefoon één rij die de bezoeker zelf opzij schuift — zes
          uitspraken onder elkaar maken de band daar 170 pixels hoog, pal
          onder de hero. Vanaf `sm` breekt hij gewoon af, gecentreerd: met
          `justify-between` stonden de twee overgebleven uitspraken op de
          tweede regel ver uit elkaar aan de randen. */}
      <ul className="kader flex items-center gap-x-8 gap-y-2 overflow-x-auto py-4 [scrollbar-width:none] sm:flex-wrap sm:justify-center sm:overflow-visible [&::-webkit-scrollbar]:hidden">
        {BAND_UITSPRAKEN.map((t) => (
          <li
            key={t}
            className="flex shrink-0 items-center gap-2.5 text-sm font-semibold text-ink-300"
          >
            <Icon name="check" strokeWidth={2.5} className="size-4 shrink-0 text-amber-300" />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---- Bewijs ------------------------------------------------------------ */

export const BEWIJS: { icon: IconName; titel: string; tekst: string }[] = [
  {
    icon: "euro",
    titel: "Vaste prijs per tv-formaat",
    tekst: `${PRIJZEN_KORT}, inclusief voorrijkosten en btw. U weet het bedrag voordat wij komen.`,
  },
  {
    icon: "level",
    titel: "Waterpas en belast getest",
    tekst:
      "Wij hangen uw tv recht en hangen er daarna zelf aan, zodat u weet dat hij houdt.",
  },
  {
    icon: "shield",
    titel: "Eigen verzekerde monteurs",
    tekst:
      "In loondienst en opgeleid door ons. Geen wisselende onderaannemers aan uw muur.",
  },
  {
    icon: "clock",
    titel: "Ook 's avonds en in het weekend",
    tekst: "Zonder toeslag, zeven dagen per week bereikbaar.",
  },
];

/**
 * Dezelfde rij, maar voor pagina's die niet over ophangen gaan.
 *
 * "Vaste prijs per tv-formaat" en "waterpas getest" zeggen niets tegen
 * iemand die geen geluid uit zijn tv krijgt.
 */
export const BEWIJS_BREED: { icon: IconName; titel: string; tekst: string }[] = [
  {
    icon: "euro",
    titel: "Vaste prijs per klus",
    tekst:
      "U weet het bedrag voordat wij langskomen, inclusief voorrijkosten en btw.",
  },
  {
    icon: "tool",
    titel: "Eén monteur voor alles",
    tekst:
      "Ophangen, aansluiten, instellen en storingen verhelpen — in één bezoek.",
  },
  {
    icon: "shield",
    titel: "Eigen verzekerde monteurs",
    tekst:
      "In loondienst en opgeleid door ons. Geen wisselende onderaannemers in huis.",
  },
  {
    icon: "clock",
    titel: "Ook 's avonds en in het weekend",
    tekst: "Zonder toeslag, zeven dagen per week bereikbaar.",
  },
];

/**
 * De bewijsrij als vier kaarten.
 *
 * `kopNiveau` is er niet voor de smaak maar voor de documentstructuur. Op de
 * vijf pagina's waar dit blok in een eigen sectie zonder `Kop` staat — de 32
 * stadpagina's, /tv-ophangen, /werkgebied, de vier provincies en /prijzen —
 * zijn deze vier koppen de eerste koppen ná de h1 van de hero. Met een h3
 * sloeg de structuur daar h2 over: gemeten op 39 gegenereerde pagina's.
 * Staat er wél een `Kop` boven (zoals op de homepage), dan blijft het h3.
 */
export function Bewijsrij({
  donker = false,
  items = BEWIJS,
  kopNiveau = 3,
  kolommen = 4,
}: {
  donker?: boolean;
  items?: { icon: IconName; titel: string; tekst: string }[];
  /** 2 als dit blok de eerste kop na de h1 draagt, 3 onder een `Kop`. */
  kopNiveau?: 2 | 3;
  /** 2 voor een kolom naast een beeld, 4 over de volle breedte. */
  kolommen?: 2 | 4;
}) {
  const H = kopNiveau === 2 ? "h2" : "h3";
  return (
    <ul
      className={`grid gap-4 sm:grid-cols-2 ${kolommen === 4 ? "lg:grid-cols-4" : ""}`}
    >
      {items.map((b) => (
        <li
          key={b.titel}
          className={`komt-op p-5 sm:p-6 ${donker ? "paneel-donker" : "paneel"}`}
        >
          <span className={donker ? "icoonvlak-donker" : "icoonvlak"}>
            <Icon name={b.icon} className="size-6" />
          </span>
          <H className={`mt-4 text-h3 ${donker ? "text-white" : ""}`}>
            {b.titel}
          </H>
          <p
            className={`mt-2 text-kaart ${donker ? "text-ink-300" : "text-ink-600"}`}
          >
            {b.tekst}
          </p>
        </li>
      ))}
    </ul>
  );
}

export function Vinkjes({
  items,
  className = "",
  donker = false,
}: {
  items: readonly string[];
  className?: string;
  donker?: boolean;
}) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((it) => (
        <li key={it} className="flex gap-3">
          <span
            className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full ${
              donker ? "bg-amber-400/20 text-amber-300" : "bg-amber-100 text-amber-700"
            }`}
          >
            <Icon name="check" strokeWidth={3} className="size-3.5" />
          </span>
          <span className={donker ? "text-ink-200" : ""}>{it}</span>
        </li>
      ))}
    </ul>
  );
}

/* ---- Werkwijze --------------------------------------------------------- */

/**
 * `title`/`text` en niet `titel`/`tekst`: de zeven stappenlijsten in de
 * paginabestanden gebruiken deze namen al, net als `IconCard`. De
 * componentnamen en de klassen zijn Nederlands, de sleutels van deze
 * gegevensvormen waren dat nooit — en ze hier omdopen zou zeven lijsten
 * wijzigen zonder dat er iets aan de pagina verandert.
 */
export type Stap = { title: string; text: string; icon?: IconName };

/**
 * Genummerde kaarten voor een werkwijze van drie tot zes stappen.
 *
 * Dit blok stond zeven keer gekopieerd in de paginabestanden — als een rij
 * cijfers onder een haarlijn (`border-t border-ink-300`), de vorm van de
 * vorige generatie. Daardoor had de site twee ontwerpen voor hetzelfde
 * begrip: kaarten met een zwarte schijf op de homepage en de stadpagina's,
 * haarlijnen op de zeven dienst- en situatiepagina's. Nu één vorm, één keer
 * opgeschreven.
 *
 * Het cijfer zit in een zwarte schijf die half over de bovenrand hangt —
 * hetzelfde patroon als op de andere eigen sites, en de reden dat de volgorde
 * in één blik te zien is.
 */
export function Stappen({
  items,
  kolommen = 3,
  kopNiveau = 3,
}: {
  items: readonly Stap[];
  kolommen?: 3 | 4;
  /** 4 als er een h3 boven dit blok staat in plaats van een sectiekop. */
  kopNiveau?: 3 | 4;
}) {
  const H = kopNiveau === 4 ? "h4" : "h3";
  return (
    // Containerquery en niet een mediaquery: dit blok staat soms in een
    // smalle kolom, en dan moet het naar die kolom kijken en niet naar het
    // venster.
    <div className="@container">
      <ol
        className={`grid gap-7 @2xl:grid-cols-2 @2xl:gap-6 ${
          kolommen === 4 ? "@5xl:grid-cols-4" : "@3xl:grid-cols-3"
        }`}
      >
        {items.map((stap, i) => (
          <li key={stap.title} className="komt-op paneel relative p-6 sm:p-7">
            <span
              aria-hidden="true"
              className="absolute -top-4 left-6 grid size-9 place-items-center rounded-full bg-ink-950 font-display text-sm font-extrabold text-white"
            >
              {i + 1}
            </span>
            {stap.icon && (
              <span className="icoonvlak mt-2">
                <Icon name={stap.icon} className="size-6" />
              </span>
            )}
            <H className={`text-h3 ${stap.icon ? "mt-4" : "mt-3"}`}>
              {stap.title}
            </H>
            <p className="mt-2 text-kaart text-ink-600">{stap.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** De drie stappen van een afspraak, in de vorm van `Stappen`. */
export function Werkwijze() {
  const stappen: Stap[] = [
    {
      icon: "chat",
      title: "U vraagt een afspraak aan",
      text: "Uw naam, uw telefoonnummer, uw adres en wat er moet gebeuren. Geen formaatkeuzes en geen vinkjes waar u over moet nadenken — en met uw adres erbij plannen wij de afspraak in één keer in.",
    },
    {
      icon: "euro",
      title: "Wij bevestigen het tarief en het moment",
      text: "Binnen enkele uren bellen wij u, vaak met een afspraak al binnen 24 uur. U beslist daarna pas.",
    },
    {
      icon: "level",
      // Niet "hangt hem op": dit blok staat ook op de homepage, en die gaat
      // over vier diensten. Een soundbar of een wifiprobleem wordt niet
      // opgehangen.
      title: "De monteur doet het werk",
      text: "Waterpas, kabels weggewerkt, alles aangesloten en getest. Wij ruimen op en nemen het verpakkingsmateriaal mee.",
    },
  ];
  return <Stappen items={stappen} />;
}

/* ---- Diensten ---------------------------------------------------------- */

/** De bestandsnamen volgen de slug, maar de koppeling staat expliciet hier. */
const dienstBeeld: Record<string, string> = {
  "tv-ophangen": "/images/dienst-tv-ophangen.webp",
  "tv-installatie": "/images/dienst-tv-installatie.webp",
  "soundbar-installatie": "/images/dienst-soundbar-installatie.webp",
  "tv-instellen": "/images/dienst-tv-instellen.webp",
};

/**
 * De diensten als fotokaarten.
 *
 * Een foto van een opgehangen tv zegt in één blik wat vier regels tekst
 * moeten uitleggen, en het is precies waar deze bezoeker naar zoekt: hoe
 * het eruit gaat zien. Op een telefoon staat de foto links in een strook
 * van 112px; vanaf `sm` erboven, over de volle breedte van de kaart.
 */
export function Dienstenlijst({
  slugs,
  kopNiveau = 3,
}: {
  slugs?: string[];
  kopNiveau?: 2 | 3;
}) {
  const lijst = slugs ? diensten.filter((d) => slugs.includes(d.slug)) : diensten;
  const H = kopNiveau === 2 ? "h2" : "h3";

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {lijst.map((d) => (
        <li key={d.slug} className="komt-op">
          <Link
            href={dienstHref(d)}
            className="paneel paneel-hover group flex h-full overflow-hidden sm:flex-col"
          >
            <div className="relative w-28 shrink-0 overflow-hidden bg-ink-100 sm:aspect-[3/2] sm:w-auto">
              {dienstBeeld[d.slug] && (
                <Image
                  src={dienstBeeld[d.slug]}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 112px"
                  className="object-cover transition duration-500 group-hover:scale-[1.04]"
                />
              )}
              <span className="absolute left-3 top-3 hidden size-10 place-items-center rounded-xl bg-white/95 text-amber-700 shadow-sm sm:grid">
                <DienstIcon slug={d.slug} className="size-5" />
              </span>
            </div>
            <div className="flex min-w-0 flex-1 items-center gap-2 p-4 sm:flex-col sm:items-stretch sm:p-5">
              <div className="min-w-0 flex-1 sm:flex-none">
                <H className="text-h3">{d.naam}</H>
                <p className="mt-1.5 text-kaart leading-snug text-ink-600">
                  {d.kort}
                </p>
              </div>
              <Icon
                name="arrow-right"
                className="size-5 shrink-0 text-amber-700 sm:hidden"
              />
              <span className="mt-auto hidden items-center gap-1.5 pt-4 text-sm font-bold text-amber-700 sm:flex">
                Meer informatie
                <Icon
                  name="arrow-right"
                  className="size-4 transition group-hover:translate-x-1"
                />
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/* ---- Prijzen ----------------------------------------------------------- */

/**
 * De drie montagetarieven als kaarten.
 *
 * Het middelste formaat krijgt een amberen ring en een label: dat is het
 * formaat waar de meeste aanvragen in vallen. Eén knop onder de drie en niet
 * drie knoppen naast elkaar — er valt hier niets te kiezen, de maat van de
 * tv bepaalt het tarief.
 */
export function Prijsklassen({ href = "#afspraak" }: { href?: string }) {
  return (
    <div>
      <ul className="grid gap-5 lg:grid-cols-3">
        {prijsklassen.map((klasse) => (
          <li
            key={klasse.naam}
            className={`komt-op relative flex flex-col p-6 sm:p-7 ${
              klasse.populair
                ? "rounded-2xl bg-white shadow-lift ring-2 ring-amber-400"
                : "paneel"
            }`}
          >
            {klasse.populair && (
              <span className="absolute -top-3 left-6 rounded-full bg-amber-400 px-3 py-1 text-2xs font-extrabold uppercase tracking-[0.1em] text-ink-950">
                Meest gekozen
              </span>
            )}
            <h3 className={`text-h3 ${klasse.populair ? "mt-2" : ""}`}>
              {klasse.naam}
            </h3>
            <p className="mt-1 text-sm text-ink-600">{klasse.maat}</p>

            <p className="cijfers mt-5 font-display text-prijs font-extrabold text-ink-950">
              {klasse.prijs}
            </p>

            <ul className="mt-6 flex flex-col gap-3 border-t border-ink-100 pt-6">
              {klasse.inbegrepen.map((punt) => (
                <li key={punt} className="flex items-start gap-2.5">
                  <Icon
                    name="check"
                    strokeWidth={3}
                    className="mt-1 size-4 shrink-0 text-amber-700"
                  />
                  <span className="text-kaart text-ink-700">{punt}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xl text-sm text-ink-600">{PRIJS_NOOT}</p>
        <Link href={href} className="knop-vol shrink-0">
          Afspraak maken
          <Icon name="arrow-right" className="size-5" />
        </Link>
      </div>

      <div className="mt-14">
        <h3 className="text-h3">Wat er bij kan komen</h3>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          {prijsExtras.map((f) => (
            <div key={f.kop} className="komt-op paneel-op">
              <dt className="font-display text-h4 font-extrabold text-ink-950">
                {f.kop}
              </dt>
              <dd className="mt-1.5 text-kaart text-ink-600">{f.tekst}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

/* ---- Aanvraagsectie ---------------------------------------------------- */

/**
 * De aanvraag: links de kop met de beloftes, rechts het formulier.
 *
 * Dit blok stond dertien keer in de paginabestanden, elke keer met dezelfde
 * tien regels casco eromheen — hetzelfde raster, dezelfde `id="afspraak"`,
 * dezelfde `labelledBy`, dezelfde bovenkop "Afspraak maken" en dezelfde
 * `<Vinkjes className="mt-8">`. Alleen de kop, de tekst, de beloftes en het
 * formulier verschilden, en dat zijn precies de vier dingen die nu nog in de
 * pagina staan.
 *
 * `flex flex-col-reverse` en niet `flex-col`: op een telefoon hoort het
 * formulier bóven de beloftes. Wie hier aankomt heeft besloten; de beloftes
 * zijn er voor wie nog twijfelt, en die scrolt verder.
 *
 * Het formulier komt als `children` binnen en niet als een reeks props. Elke
 * pagina geeft zijn eigen `variant` mee — dat is het meetlabel in GA4 — en
 * die hoort zichtbaar in de pagina te staan en niet doorgegeven te worden
 * via een omhulsel.
 */
/**
 * De FAQ-sectie: kop links, uitklapvragen rechts.
 *
 * Stond twaalf keer gekopieerd in de paginabestanden — dezelfde `Vlak`,
 * hetzelfde grid, dezelfde bovenkop en dezelfde verwijzing naar het
 * formulier. Alleen `toon` en `titel` verschilden, en twee pagina's zeiden de
 * slotregel in andere woorden. Die regel staat nu één keer: wie een vraag
 * stelt hoort te weten wat er dan gebeurt, en dat moet overal hetzelfde zijn.
 *
 * `children` is de staart binnen dezelfde sectie — op zes pagina's staat daar
 * een `RelatedLinks` onder de vragen.
 */
export function Faqsectie({
  titel,
  items,
  inleiding,
  toon = "wit",
  children,
}: {
  titel: ReactNode;
  items: FaqItem[];
  /**
   * Een eigen eerste zin, als de vragenlijst op die pagina een aanloop
   * nodig heeft. De verwijzing naar het formulier komt er altijd achter:
   * die hoort op elke pagina hetzelfde te zijn.
   */
  inleiding?: ReactNode;
  toon?: "oppervlak" | "wit";
  children?: ReactNode;
}) {
  return (
    <Vlak toon={toon} labelledBy="faq">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <Kop
          id="faq"
          bovenkop="Veelgestelde vragen"
          titel={titel}
          tekst={
            <>
              {inleiding && <>{inleiding} </>}
              Staat uw vraag er niet bij? Zet hem in het{" "}
              <Link href="#afspraak" className="verwijzing">
                afspraakformulier
              </Link>{" "}
              — dan belt de monteur u erover.
            </>
          }
        />
        <Faq items={items} />
      </div>
      {children}
    </Vlak>
  );
}

export function Aanvraagsectie({
  titel,
  tekst,
  beloftes,
  children,
  toon = "oppervlak",
}: {
  titel: ReactNode;
  tekst?: ReactNode;
  beloftes: readonly string[];
  children: ReactNode;
  toon?: "oppervlak" | "wit";
}) {
  return (
    <Vlak toon={toon} id="afspraak" labelledBy="afspraak-kop">
      <div className="flex flex-col-reverse gap-10 lg:grid lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div>
          <Kop
            id="afspraak-kop"
            bovenkop="Afspraak maken"
            titel={titel}
            tekst={tekst}
          />
          <Vinkjes items={beloftes} className="mt-8" />
        </div>
        {children}
      </div>
    </Vlak>
  );
}

/* ---- Afsluitende oproep (verwijderd) ----------------------------------
   Hier stond `Slotoproep`: een bijna-zwart kaartje met een kop en een knop
   naar /contact, als afsluiting van /diensten, /werkgebied, /kennisbank, de
   vijf kennisbankartikelen en /over-ons.

   Op 16-11-2026 is hij op alle negen vervangen door `Aanvraagsectie` met het
   formulier erin. De reden staat in de cijfers: die negen pagina's stuurden
   de bezoeker weg op het moment dat hij besloten had, en twee ervan kregen
   betaald verkeer zonder dat er een manier was om een afspraak te maken.
   Een knop naar een andere pagina is daar een stap te veel.

   Komt er ooit een pagina waar het formulier niet hoort - een blog, een
   nieuwsbericht - dan hoort hier weer zo'n blok: `Vlak toon` eromheen, een
   `op-donker` kaart met `raster` en `gloed`, en de knop als `knop-vol
   knop-groot`. Niet opnieuw met de hand; dan hoort het weer een component te
   zijn. ------------------------------------------------------------------ */

/* ---- Cijfers ----------------------------------------------------------- */

export function Cijferrij({
  items,
  donker = false,
}: {
  items: readonly { value: string; label: string }[];
  donker?: boolean;
}) {
  return (
    <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((s) => (
        <div
          key={s.label}
          className={`komt-op p-5 text-center sm:p-6 ${
            donker ? "paneel-donker" : "paneel"
          }`}
        >
          <dt className="sr-only">{s.label}</dt>
          <dd>
            <span
              className={`cijfers block font-display text-prijs font-extrabold ${
                donker ? "text-white" : "text-ink-950"
              }`}
            >
              {s.value}
            </span>
            {/* De `dt` hierboven draagt dit label al voor een schermlezer.
                Zonder `aria-hidden` wordt elk cijfer twee keer voorgelezen:
                "tv's vakkundig opgehangen, 12.000+ tv's vakkundig
                opgehangen". */}
            <span
              aria-hidden="true"
              className={`mt-2 block text-sm ${
                donker ? "text-ink-300" : "text-ink-600"
              }`}
            >
              {s.label}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
