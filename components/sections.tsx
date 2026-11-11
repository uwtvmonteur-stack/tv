import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import HeroVideo from "./HeroVideo";
import { DienstIcon, Icon, type IconName } from "./Icon";
import {
  PRIJS_NOOT,
  PRIJZEN_KORT,
  diensten,
  dienstHref,
  prijsExtras,
  prijsklassen,
} from "@/lib/content";

/* =========================================================================
   Sectiebibliotheek
   =========================================================================
   Elke pagina van deze site is opgebouwd uit de blokken hieronder. Dat is
   geen gemak maar een eis: in de vorige opzet bepaalde elke pagina zelf zijn
   marges, kaartranden en koptypografie, met als uitkomst elf verschillende
   kaarten en negen hoekmaten voor wat in feite één ding is. Een bezoeker kan
   dat niet benoemen, maar hij ziet wel dat het niet door één hand is gemaakt.

   De regel: een pagina levert inhoud, een blok bepaalt vorm. Staat er in een
   pagina een `rounded-`, `shadow-` of `px-`-klasse, dan hoort die hier.
   ========================================================================= */

/* ---- Casco ------------------------------------------------------------- */

export function Section({
  children,
  id,
  tone = "white",
  labelledBy,
  className = "",
}: {
  children: ReactNode;
  id?: string;
  /** `surface` is het lichtgrijze vlak dat afwisseling geeft; `dark` is bijna-zwart. */
  tone?: "white" | "surface" | "dark";
  labelledBy?: string;
  className?: string;
}) {
  const tonen = {
    white: "",
    surface: "bg-surface",
    dark: "bg-ink-950 text-ink-100",
  };
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`section ${tonen[tone]} ${className}`}
    >
      <div className="container-x">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  center = false,
  dark = false,
  id,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  center?: boolean;
  dark?: boolean;
  id?: string;
}) {
  return (
    <div
      className={`rise ${center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}
    >
      {eyebrow && <p className={dark ? "eyebrow-dark" : "eyebrow"}>{eyebrow}</p>}
      <h2 id={id} className={`h-section mt-4 ${dark ? "text-white" : ""}`}>
        {title}
      </h2>
      {lead && <p className={`lead mt-4 ${dark ? "text-ink-300" : ""}`}>{lead}</p>}
    </div>
  );
}

/* ---- Hero -------------------------------------------------------------- */

/**
 * De hero van elke pagina.
 *
 * Herontworpen: niet langer tekst naast een kaartje, maar beeld over de volle
 * breedte met de tekst erop. Twee redenen, en de tweede is de belangrijkste.
 *
 * Esthetisch: een foto in een afgerond kadertje naast een kolom tekst is de
 * opzet van elke zakelijke website; beeld dat doorloopt tot de rand en tekst
 * die erop ligt, is wat een merk groot maakt.
 *
 * Praktisch: die naast-elkaar-opzet bestond op een telefoon helemaal niet.
 * Daar viel hij terug op tekst bóven beeld, waardoor de foto pas ná de lead
 * kwam en vaak helemaal buiten het eerste scherm viel. 85% van het betaalde
 * verkeer op deze site is mobiel. Nu draagt het beeld de hero op élk scherm.
 *
 * De leesbaarheid komt van `hero-scrim`: een verloop dat onderin dichtloopt
 * waar de tekst staat en bovenin open blijft waar het beeld mag ademen.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
  image,
  imageAlt,
  video,
  videoStaand,
  breadcrumbs,
  preload = true,
  groot = false,
  prijsregel,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  image?: string;
  imageAlt?: string;
  /**
   * Alleen de homepage. Een stille, doorlopende video achter de scrim; de
   * posterafbeelding blijft staan als de video niet mag of niet laadt.
   */
  video?: string;
  /** De staande uitsnede voor telefoons; zie HeroVideo. */
  videoStaand?: string;
  breadcrumbs?: ReactNode;
  /**
   * Zet de preload-hint op de heroafbeelding. Heette tot Next 16 `priority`;
   * die prop is daar vervangen door `preload` en doet sindsdien niets meer.
   */
  preload?: boolean;
  /**
   * Alleen de homepage. Zonder dit onderscheid opent elke pagina even zwaar
   * en zegt de typografie dus niets over waar je bent.
   */
  groot?: boolean;
  /**
   * Tarieven direct in de hero, als glazen chips.
   *
   * Uit de Ads-cijfers over 90 dagen: "tv laten ophangen kosten" gaf 16
   * klikken en nul conversies, "tv bevestigen aan muur" 25 klikken en nul
   * conversies. Beide landden op een pagina waar het eerste bedrag pas na
   * zes tot acht schermen stond, terwijl de meta-title "vanaf €99" belooft.
   */
  prijsregel?: { label: string; prijs: string }[];
}) {
  const heeftBeeld = Boolean(video ?? image);

  return (
    <section className="relative isolate overflow-hidden bg-ink-950 text-white">
      {/* Laag 1 — het beeld. De <Image> staat hier en niet in HeroVideo:
          alleen vanuit een servercomponent plaatst Next de preload-hint in
          de head, en dat is precies het element dat de LCP bepaalt. */}
      {image ? (
        <>
          <Image
            src={image}
            alt={imageAlt ?? ""}
            fill
            preload={preload}
            sizes="100vw"
            // `brightness-50` op foto-heroes, niet op de videohero. Gemeten op
            // de acht heroafbeeldingen: zes haalden met witte tekst erop zelfs
            // de 3:1 voor grote koppen niet, met 1,4:1 als dieptepunt op de
            // foto die op 37 pagina's staat. Een zwaardere scrim lost dat niet
            // op — daarvoor zou hij 82% moeten dekken en dan zie je de foto
            // niet meer. De foto temperen wel: de lichtste plek zakt van 0,965
            // naar 0,207 luminantie, en daarmee haalt de tekst 4,9:1 bovenin.
            // De videoposter is al donker genoeg (4,6:1) en blijft ongemoeid.
            className={`object-cover ${video ? "" : "brightness-50"}`}
          />
          {video && <HeroVideo src={video} srcStaand={videoStaand} />}
        </>
      ) : (
        <div className="mesh-dark absolute inset-0" aria-hidden="true" />
      )}

      {/* Laag 2 — leesbaarheid. Zonder beeld is er niets om te dempen, dan
          zou de scrim de mesh alleen maar grijs maken. */}
      {heeftBeeld && (
        <div className="hero-scrim absolute inset-0" aria-hidden="true" />
      )}
      <div className="bg-grid absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="grain absolute inset-0" aria-hidden="true" />

      {/* Laag 3 — de inhoud. `min-h` alleen bij video: daar moet het beeld
          ruimte krijgen om te bewegen. `svh` en niet `vh`, anders springt de
          hero op een telefoon zodra de adresbalk wegschuift. */}
      <div
        className={`container-x relative flex flex-col justify-end py-16 sm:py-20 lg:py-28 ${
          video
            ? "min-h-[78svh] lg:min-h-[86svh]"
            : image
              ? "min-h-[52svh] lg:min-h-[58svh]"
              : ""
        }`}
      >
        {breadcrumbs}
        {eyebrow && (
          <p className={`num text-accent-200 ${breadcrumbs ? "mt-6" : ""}`}>
            {eyebrow}
          </p>
        )}
        <h1
          className={`mt-5 max-w-4xl font-display text-white ${
            groot ? "text-display" : "text-hero"
          }`}
        >
          {title}
        </h1>
        {prijsregel && prijsregel.length > 0 && (
          <>
            <dl className="mt-8 flex flex-wrap gap-2.5">
              {prijsregel.map((rij) => (
                <div key={rij.label} className="glas rounded-2xl px-4 py-2.5">
                  <dt className="text-2xs font-semibold uppercase tracking-widest text-accent-200">
                    {rij.label}
                  </dt>
                  <dd className="tabular text-lg font-bold text-white">
                    {rij.prijs}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-sm text-ink-200">{PRIJS_NOOT}</p>
          </>
        )}
        {lead && <p className="mt-6 max-w-2xl text-lead text-ink-200">{lead}</p>}
        {children}
      </div>
    </section>
  );
}

/**
 * De vaste actieknoppen onder een hero.
 *
 * Eén gekleurde knop en niets ernaast dat ermee concurreert. Het
 * telefoonnummer staat bewust nergens als knop — alleen in de voettekst —
 * zodat de offerteaanvraag de enige handeling op het scherm is.
 */
export function HeroActions({
  href = "#offerte",
  label = "Afspraak aanvragen",
  tweedeHref = "/prijzen",
  tweedeLabel = "Bekijk de prijzen",
}: {
  href?: string;
  label?: string;
  tweedeHref?: string;
  tweedeLabel?: string;
}) {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <Link href={href} className="btn-primary btn-lg">
        {label}
        <Icon name="arrow-right" className="size-5" />
      </Link>
      <Link href={tweedeHref} className="btn-on-dark btn-lg">
        {tweedeLabel}
      </Link>
    </div>
  );
}

/* ---- Vertrouwen -------------------------------------------------------- */

export const USPS: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "euro",
    title: "Vaste prijs per tv-formaat",
    text: `${PRIJZEN_KORT}, inclusief voorrijkosten en btw. U weet het bedrag voordat wij komen.`,
  },
  {
    icon: "level",
    title: "Waterpas en belast getest",
    text: "Wij hangen uw tv recht en hangen er daarna zelf aan, zodat u weet dat hij houdt.",
  },
  {
    icon: "shield",
    title: "Eigen verzekerde monteurs",
    text: "In loondienst en opgeleid door ons. Geen wisselende onderaannemers aan uw muur.",
  },
  {
    icon: "clock",
    title: "Ook 's avonds en in het weekend",
    text: "Zonder toeslag, zeven dagen per week bereikbaar.",
  },
];

/**
 * De bewijsbalk voor pagina's die níet over één dienst gaan.
 *
 * De standaardset hierboven is montagetaal: "vaste prijs per tv-formaat" en
 * "waterpas en belast getest" zeggen niets tegen iemand die geen geluid op
 * zijn tv heeft. Op /tv-ophangen en de stadpagina's klopt die set juist wel,
 * dus hij blijft daar staan.
 */
export const USPS_BREED: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "euro",
    title: "Vaste prijs per klus",
    text: "U weet het bedrag voordat wij langskomen, inclusief voorrijkosten en btw.",
  },
  {
    icon: "tool",
    title: "Eén monteur voor alles",
    text: "Ophangen, aansluiten, instellen en storingen verhelpen — in één bezoek.",
  },
  {
    icon: "shield",
    title: "Eigen verzekerde monteurs",
    text: "In loondienst en opgeleid door ons. Geen wisselende onderaannemers in huis.",
  },
  {
    icon: "clock",
    title: "Ook 's avonds en in het weekend",
    text: "Zonder toeslag, zeven dagen per week bereikbaar.",
  },
];

export function TrustBar({
  dark = false,
  items = USPS,
}: {
  dark?: boolean;
  /** Eigen set, bijvoorbeeld `USPS_BREED` op een pagina met meer diensten. */
  items?: { icon: IconName; title: string; text: string }[];
}) {
  return (
    // Geen vier kaartjes meer maar vier kolommen onder een haarlijn. Een
    // kaartje zegt "dit is een los blokje"; een kolom onder een lijn zegt
    // "dit hoort bij elkaar". Het scheelt bovendien vier randen, vier
    // schaduwen en vier achtergronden op een scherm waar het om de tekst gaat.
    <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((u) => (
        <li
          key={u.title}
          className={`rise-in border-t pt-5 ${
            dark ? "border-white/20" : "border-ink-300"
          }`}
        >
          <span
            className={`inline-grid size-10 place-items-center rounded-xl ${
              dark ? "bg-white/10 text-accent-300" : "bg-ink-950 text-accent-300"
            }`}
          >
            <Icon name={u.icon} className="size-5" />
          </span>
          <span
            className={`mt-4 block font-display text-h3 ${
              dark ? "text-white" : "text-ink-950"
            }`}
          >
            {u.title}
          </span>
          <span
            className={`mt-2 block text-sm ${dark ? "text-ink-300" : "text-ink-600"}`}
          >
            {u.text}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ---- Vertrouwensrij ----------------------------------------------------
   Dit was een lopende band. Die is vervangen door een rij die omslaat, en
   dat loste drie dingen tegelijk op:

   1. WCAG 2.2.2 (niveau A): bewegende inhoud die vanzelf start en langer dan
      vijf seconden duurt, moet te pauzeren zijn. De band liep oneindig en had
      geen knop. Een rij die stilstaat heeft die knop niet nodig.
   2. Bij `prefers-reduced-motion` stond de band stil op de plek waar hij
      toevallig was. Van de zes uitspraken bleven er op een telefoon vijf
      buiten beeld, afgeknipt door `overflow: hidden` en niet scrollbaar.
   3. De inhoud stond twee keer in de DOM om de naad onzichtbaar te maken.
      Dat is nu niet meer nodig.

   Lopende tekst is op een telefoon bovendien slecht te lezen: de band liep
   met ongeveer 60 pixels per seconde.                                     */

export function Vertrouwensrij({ items }: { items: readonly string[] }) {
  return (
    <div className="border-y border-white/10 bg-ink-950">
      <div className="container-x">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 py-5">
          {items.map((tekst) => (
            <li
              key={tekst}
              className="flex items-center gap-2.5 font-display text-sm font-bold uppercase tracking-[0.14em] text-ink-200"
            >
              <Icon
                name="check"
                className="size-4 shrink-0 text-accent-300"
                strokeWidth={2.5}
              />
              {tekst}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function CheckList({
  items,
  className = "",
  dark = false,
}: {
  items: readonly string[];
  className?: string;
  dark?: boolean;
}) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((it) => (
        <li key={it} className="flex gap-3">
          <span
            className={`mt-1 grid size-6 shrink-0 place-items-center rounded-full ${
              dark ? "bg-accent-400/20 text-accent-300" : "bg-accent-100 text-accent-700"
            }`}
          >
            <Icon name="check" className="size-4" strokeWidth={2.5} />
          </span>
          <span className={dark ? "text-ink-200" : ""}>{it}</span>
        </li>
      ))}
    </ul>
  );
}

/* ---- Werkwijze --------------------------------------------------------- */

export function HowItWorks() {
  const stappen: { icon: IconName; title: string; text: string }[] = [
    {
      icon: "chat",
      title: "U vraagt een afspraak aan",
      text: "Uw naam, uw telefoonnummer, uw postcode en wat er moet gebeuren. Geen formaatkeuzes en geen vinkjes waar u over moet nadenken — en uw straat en huisnummer vragen wij pas als u akkoord gaat.",
    },
    {
      icon: "euro",
      title: "Wij bevestigen het tarief en het moment",
      text: "Binnen enkele uren bellen wij u, vaak met een afspraak al binnen 24 uur. U beslist daarna pas.",
    },
    {
      icon: "level",
      // Niet "hangt hem op": dit blok staat ook op de homepage, en die gaat
      // sinds de omzetting naar "tv monteur aan huis" over vier diensten.
      // Een soundbar of een wifi-probleem wordt niet opgehangen.
      title: "De monteur doet het werk",
      text: "Waterpas, kabels weggewerkt, alles aangesloten en getest. Wij ruimen op en nemen het verpakkingsmateriaal mee.",
    },
  ];
  return (
    // Containerquery: in een smalle kolom onder elkaar, naast elkaar zodra er
    // echt ruimte is. Een mediaquery zou hier naar het venster kijken en niet
    // naar de kolom waarin het blok staat.
    <div className="@container">
      <ol className="grid gap-10 @3xl:grid-cols-3 @3xl:gap-8">
        {stappen.map((s, i) => (
          <li key={s.title} className="rise-in">
            {/* Het cijfer is groot en grijs, niet amber: amber is in dit
                systeem uitsluitend de actiekleur, en drie amberkleurige
                cijfers op een pagina maken de offerteknop onvindbaar. De
                volgorde zit al in de ol, dus het cijfer is decoratie. */}
            <div className="flex items-center gap-5">
              <span
                aria-hidden="true"
                className="tabular font-display text-stat font-bold leading-none text-ink-200"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="h-px flex-1 bg-ink-200" />
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-ink-950 text-accent-300">
                <Icon name={s.icon} className="size-5" />
              </span>
            </div>
            <h3 className="mt-6 text-h3">{s.title}</h3>
            <p className="mt-2 text-ink-600">{s.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ---- Diensten ---------------------------------------------------------- */

/** De bestandsnamen volgen de slug niet overal, dus staat de koppeling hier. */
const dienstAfbeelding: Record<string, string> = {
  "tv-ophangen": "/images/dienst-tv-ophangen.jpg",
  "tv-installatie": "/images/dienst-tv-installatie.jpg",
  "soundbar-installatie": "/images/dienst-soundbar.jpg",
  "tv-instellen": "/images/dienst-tv-instellen.jpg",
  "kabels-wegwerken": "/images/dienst-kabels-wegwerken.jpg",
};

export function ServiceCards({
  slugs,
  headingLevel = 3,
}: {
  slugs?: string[];
  headingLevel?: 2 | 3;
}) {
  const lijst = slugs ? diensten.filter((d) => slugs.includes(d.slug)) : diensten;
  const H = headingLevel === 2 ? "h2" : "h3";
  // Bento in plaats van vier even grote kaarten: de eerste dienst krijgt het
  // dubbele oppervlak. Vier identieke vakjes laten de bezoeker kiezen zonder
  // enige hint; een groot vlak zegt waar wij voor bekendstaan en laat de rest
  // gewoon bereikbaar. Alleen bij precies vier diensten, want bij een andere
  // telling valt het raster uit elkaar.
  const bento = lijst.length === 4;
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {lijst.map((d, i) => {
        const groot = bento && i === 0;
        const breed = bento && i === 3;
        return (
          <li
            key={d.slug}
            className={
              groot ? "sm:col-span-2 lg:row-span-2" : breed ? "lg:col-span-2" : ""
            }
          >
            <Link
              href={dienstHref(d)}
              className="rise-in card card-hover group relative flex h-full flex-col overflow-hidden"
            >
              <div
                className={`relative overflow-hidden bg-ink-100 ${
                  groot ? "aspect-[4/3] lg:flex-1" : "aspect-[3/2]"
                }`}
              >
                {dienstAfbeelding[d.slug] && (
                  <Image
                    src={dienstAfbeelding[d.slug]}
                    alt=""
                    fill
                    // De brede kaart (i === 3) beslaat op lg twee kolommen en
                    // rendert dus op 50vw, niet op 25vw. Met de oude waarde
                    // haalde de browser daar een afbeelding van halve breedte
                    // op en rekte die uit.
                    sizes={
                      groot || breed
                        ? "(min-width: 1024px) 50vw, 100vw"
                        : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    }
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                )}
                {/* Verloop onderlangs het beeld, zodat de foto in de tekst
                    overloopt in plaats van er met een harde rand op te stoten. */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent"
                />
                <span className="absolute left-4 top-4 grid size-11 place-items-center rounded-xl bg-ink-950 text-accent-300 shadow-sm">
                  <DienstIcon slug={d.slug} />
                </span>
              </div>
              <div className={`flex flex-col ${groot ? "p-6 sm:p-7" : "p-5"}`}>
                <H className={groot ? "text-h2" : "text-h3"}>{d.naam}</H>
                <p className={`mt-2 text-ink-600 ${groot ? "max-w-prose" : "text-sm"}`}>
                  {d.kort}
                </p>
                {/* Niet "Meer informatie": dat is op vier kaarten vier keer
                    dezelfde ankertekst, voor een bezoeker en voor Google. */}
                <span className="mt-4 flex items-center gap-1.5 font-semibold text-accent-700">
                  Bekijk {d.naam.toLowerCase()}
                  <Icon
                    name="arrow-right"
                    className="size-4 transition group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/* ---- Prijs ------------------------------------------------------------- */

/**
 * De vanafprijs, met daarnaast waar het uiteindelijke bedrag van afhangt.
 *
 * Een bezoeker die geen vast bedrag ziet, wil precies één ding weten: waar
 * hangt het dan van af? Krijgt hij daar geen antwoord op, dan leest
 * "offerte" als "ze willen niet zeggen wat het kost" — en dat is duurder dan
 * welk tarief ook.
 */
/**
 * De drie montagetarieven per tv-formaat, met daaronder wat er bij kan komen.
 *
 * Staat op de homepage, /prijzen, /tv-ophangen, de 32 stadpagina's en de vier
 * provinciepagina's — dus op elke pagina waar iemand de koopvraag stelt. Eén
 * blok en niet vijf varianten: een bedrag dat per pagina anders staat, kost
 * precies het vertrouwen dat een vaste prijs moet opbouwen.
 *
 * De middelste klasse krijgt het donkere vlak. Dat is het formaat waar de
 * meeste aanvragen in vallen, en een rij van drie identieke kaarten dwingt de
 * bezoeker zelf te kiezen waar hij hoort.
 */
export function Prijsklassen({ href = "#offerte" }: { href?: string }) {
  return (
    <div>
      <ul className="grid gap-5 lg:grid-cols-3">
        {prijsklassen.map((klasse) => (
          <li key={klasse.naam}>
            <div
              className={`rise-in relative flex h-full flex-col overflow-hidden rounded-3xl p-8 ${
                klasse.populair
                  ? "bg-ink-950 text-white shadow-lift"
                  : "card"
              }`}
            >
              {klasse.populair && (
                <>
                  <div className="bg-grid absolute inset-0" aria-hidden="true" />
                  <div
                    className="absolute -right-16 -top-16 size-64 rounded-full bg-accent-500/25 blur-3xl"
                    aria-hidden="true"
                  />
                </>
              )}
              <div className="relative flex h-full flex-col">
                <div className="flex items-start justify-between gap-3">
                  <p className={klasse.populair ? "eyebrow-dark" : "eyebrow"}>
                    {klasse.naam}
                  </p>
                  {/* `whitespace-nowrap` op de badge: zonder dat valt "Meest
                      gekozen" op een 360px-telefoon over twee regels naast de
                      klassenaam. */}
                  {klasse.populair && (
                    <span className="whitespace-nowrap rounded-full bg-accent-400 px-3 py-1 text-2xs font-bold uppercase tracking-wide text-ink-950">
                      Meest gekozen
                    </span>
                  )}
                </div>

                <p
                  className={`mt-2 text-sm ${klasse.populair ? "text-ink-300" : "text-ink-600"}`}
                >
                  {klasse.maat}
                </p>

                <p className="mt-5 font-display text-stat font-bold tabular">
                  {klasse.prijs}
                </p>

                {/* `mb-8` hier en `mt-auto` op de knop: de middelste klasse
                    heeft een regel meer dan de andere twee, en zonder dit
                    staan de drie knoppen niet op één lijn. */}
                <ul className="mb-8 mt-6 flex flex-col gap-3">
                  {klasse.inbegrepen.map((punt) => (
                    <li key={punt} className="flex items-start gap-2.5">
                      <Icon
                        name="check"
                        className={`mt-0.5 size-5 shrink-0 ${klasse.populair ? "text-accent-300" : "text-accent-700"}`}
                      />
                      <span
                        className={
                          klasse.populair ? "text-ink-200" : "text-ink-700"
                        }
                      >
                        {punt}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={href}
                  className={`${klasse.populair ? "btn-primary" : "btn-ghost"} mt-auto w-full`}
                >
                  {/* Drie knoppen met dezelfde tekst naar hetzelfde doel zijn
                      voor een schermlezer niet uit elkaar te houden. De
                      toevoeging staat er alleen voor hem. */}
                  <span>
                    Afspraak aanvragen
                    <span className="sr-only">
                      {" "}
                      — {klasse.naam}, {klasse.maat.toLowerCase()}
                    </span>
                  </span>
                  <Icon name="arrow-right" className="size-4" />
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-12">
        <h3 className="text-h3">Wat er bij kan komen</h3>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2">
          {prijsExtras.map((f) => (
            <li key={f.kop} className="rise-in card h-full p-5">
              <h4 className="font-display font-bold text-ink-950">{f.kop}</h4>
              <p className="mt-1.5 text-sm text-ink-600">{f.tekst}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---- Afsluitende oproep ------------------------------------------------ */

export function CtaBand({
  title = "Vraag een afspraak aan",
  text = "Vertel kort wat er moet gebeuren en waar u woont. Wij bellen u binnen enkele uren om het tarief te bevestigen — u zit nergens aan vast.",
  href = "/contact",
  tone = "surface",
}: {
  title?: string;
  text?: string;
  href?: string;
  tone?: "surface" | "white";
}) {
  return (
    <section
      className={`section ${tone === "white" ? "bg-white" : "bg-surface"}`}
      aria-labelledby="cta-kop"
    >
      <div className="container-x">
        <div className="relative overflow-hidden rounded-3xl bg-ink-950 px-6 py-12 text-white sm:px-12 lg:px-16 lg:py-16">
          <div className="bg-grid absolute inset-0" aria-hidden="true" />
          <div
            className="absolute -right-24 -top-24 size-80 rounded-full bg-accent-500/25 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <h2 id="cta-kop" className="h-section text-white">
                {title}
              </h2>
              <p className="mt-3 max-w-xl text-lead text-ink-200">{text}</p>
              <p className="mt-4 flex items-center gap-2 text-ink-300">
                <Icon name="clock" className="size-5 text-accent-300" />
                Ook &apos;s avonds en in het weekend, zonder toeslag
              </p>
            </div>
            <Link href={href} className="btn-primary btn-lg w-full">
              Afspraak aanvragen
              <Icon name="arrow-right" className="size-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- Cijfers ----------------------------------------------------------- */

export function StatRow({
  items,
  dark = false,
}: {
  items: readonly { value: string; label: string }[];
  dark?: boolean;
}) {
  return (
    <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((s) => (
        <div key={s.label}>
          <dt className="sr-only">{s.label}</dt>
          <dd>
            <span
              className={`block font-display text-stat font-bold tabular ${dark ? "text-white" : "text-ink-950"}`}
            >
              {s.value}
            </span>
            {/* De `dt` hierboven draagt dit label al voor een schermlezer.
                Zonder `aria-hidden` wordt elk cijfer twee keer voorgelezen:
                "tv's vakkundig opgehangen, 12.000+ tv's vakkundig
                opgehangen". */}
            <span
              aria-hidden="true"
              className={`mt-2 block text-sm ${dark ? "text-ink-300" : "text-ink-600"}`}
            >
              {s.label}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
