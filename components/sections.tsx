import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { DienstIcon, Icon, type IconName } from "./Icon";
import { VANAF_PRIJS, diensten, dienstHref, prijsFactoren } from "@/lib/content";

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
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
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
 * De hero van elke binnenpagina, en de basis van de homepage-hero.
 *
 * Donker, met een rasterpatroon en één warme gloed. Dat is niet decoratie:
 * een foto van een woonkamer is altijd rommelig, en witte tekst op een
 * donkere laag is het enige wat daarop leesbaar blijft zonder de foto plat
 * te maken.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
  image,
  imageAlt,
  breadcrumbs,
  priority = true,
  groot = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  image?: string;
  imageAlt?: string;
  breadcrumbs?: ReactNode;
  priority?: boolean;
  /**
   * Alleen de homepage. Zonder dit onderscheid opent elke pagina even zwaar
   * en zegt de typografie dus niets over waar je bent; de grootste maat uit
   * het systeem (`text-hero`) bleef daardoor ongebruikt.
   */
  groot?: boolean;
}) {
  return (
    <section className="relative overflow-hidden bg-ink-950 text-white">
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -left-32 top-0 size-[32rem] rounded-full bg-accent-500/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        // Geen compensatie voor de koptekstbalk: die loopt mee in de stroom
        // (`sticky`), dus de hero begint er automatisch onder. Zette een
        // pagina hier zelf nog padding bovenop, dan ontstond er een gat.
        className={`container-x relative grid gap-10 py-14 sm:py-16 ${
          image ? "lg:grid-cols-[1.1fr_1fr] lg:items-center lg:py-20" : "lg:py-20"
        }`}
      >
        <div className="min-w-0">
          {breadcrumbs}
          {eyebrow && <p className="eyebrow-dark mt-6">{eyebrow}</p>}
          <h1
            className={`mt-4 font-display text-white ${groot ? "text-hero" : "text-h1"}`}
          >
            {title}
          </h1>
          {lead && <p className="mt-5 max-w-2xl text-lead text-ink-200">{lead}</p>}
          {children}
        </div>
        {image && (
          <div className="relative">
            <div className="relative aspect-[3/2] overflow-hidden rounded-3xl ring-1 ring-white/15">
              <Image
                src={image}
                alt={imageAlt ?? ""}
                fill
                priority={priority}
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        )}
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
  label = "Offerte aanvragen",
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
    title: `Vanaf ${VANAF_PRIJS}, offerte vooraf`,
    text: "U krijgt het bedrag vooraf zwart-op-wit, inclusief voorrijkosten en btw. Vrijblijvend.",
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

export function TrustBar({ dark = false }: { dark?: boolean }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {USPS.map((u) => (
        <li
          key={u.title}
          className={`flex items-start gap-3 rounded-2xl p-5 ${
            dark ? "bg-white/5 ring-1 ring-white/10" : "card"
          }`}
        >
          <span
            className={`grid size-11 shrink-0 place-items-center rounded-xl ${
              dark
                ? "bg-accent-400/15 text-accent-300"
                : "bg-accent-50 text-accent-700 ring-1 ring-accent-200"
            }`}
          >
            <Icon name={u.icon} className="size-6" />
          </span>
          <span>
            <span
              className={`block font-display font-bold ${dark ? "text-white" : "text-ink-950"}`}
            >
              {u.title}
            </span>
            <span
              className={`mt-1 block text-sm ${dark ? "text-ink-300" : "text-ink-600"}`}
            >
              {u.text}
            </span>
          </span>
        </li>
      ))}
    </ul>
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
      title: "U vraagt een offerte aan",
      text: "Drie dingen: uw gegevens, uw adres en wat er moet gebeuren. Geen formaatkeuzes of vinkjes waar u over moet nadenken.",
    },
    {
      icon: "euro",
      title: "U krijgt het bedrag, vrijblijvend",
      text: "Binnen enkele uren, met de prijs erbij en zonder voorwaarden eronder. U beslist daarna pas.",
    },
    {
      icon: "level",
      title: "De monteur hangt hem op",
      text: "Waterpas, kabels weggewerkt, alles aangesloten en getest. Wij ruimen op en nemen het verpakkingsmateriaal mee.",
    },
  ];
  return (
    // Containerquery: in een smalle kolom onder elkaar, naast elkaar zodra er
    // echt ruimte is. Een mediaquery zou hier naar het venster kijken en niet
    // naar de kolom waarin het blok staat.
    <div className="@container">
      <ol className="grid gap-6 @3xl:grid-cols-3">
        {stappen.map((s, i) => (
          <li key={s.title} className="card relative p-6 pt-7">
            <span className="absolute -top-4 left-6 grid size-9 place-items-center rounded-full bg-ink-950 font-display font-bold text-white">
              {i + 1}
            </span>
            <span className="grid size-12 place-items-center rounded-xl bg-accent-50 text-accent-700 ring-1 ring-accent-200">
              <Icon name={s.icon} className="size-6" />
            </span>
            <h3 className="mt-4 text-h3">{s.title}</h3>
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
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {lijst.map((d) => (
        <li key={d.slug}>
          <Link
            href={dienstHref(d)}
            className="card card-hover group flex h-full flex-col overflow-hidden"
          >
            <div className="relative aspect-[3/2] overflow-hidden bg-ink-100">
              {dienstAfbeelding[d.slug] && (
                <Image
                  src={dienstAfbeelding[d.slug]}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              )}
              <span className="absolute left-4 top-4 grid size-11 place-items-center rounded-xl bg-white/95 text-accent-700 shadow-sm">
                <DienstIcon slug={d.slug} />
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <H className="text-h3">{d.naam}</H>
              <p className="mt-2 text-sm text-ink-600">{d.kort}</p>
              <span className="mt-auto flex items-center gap-1.5 pt-4 font-semibold text-accent-700">
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

/* ---- Prijs ------------------------------------------------------------- */

/**
 * De vanafprijs, met daarnaast waar het uiteindelijke bedrag van afhangt.
 *
 * Een bezoeker die geen vast bedrag ziet, wil precies één ding weten: waar
 * hangt het dan van af? Krijgt hij daar geen antwoord op, dan leest
 * "offerte" als "ze willen niet zeggen wat het kost" — en dat is duurder dan
 * welk tarief ook.
 */
export function PrijsBlok({ href = "#offerte" }: { href?: string }) {
  return (
    <div className="grid gap-5 lg:grid-cols-5">
      <div className="lg:col-span-2">
        <div className="relative h-full overflow-hidden rounded-3xl bg-ink-950 p-8 text-white">
          <div className="bg-grid absolute inset-0" aria-hidden="true" />
          <div
            className="absolute -right-16 -top-16 size-64 rounded-full bg-accent-500/25 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative flex h-full flex-col justify-between">
            <div>
              <p className="eyebrow-dark">Tv ophangen</p>
              <p className="mt-5 flex items-baseline gap-2 font-display">
                <span className="text-lead text-ink-300">vanaf</span>
                <span className="text-stat font-bold tabular">{VANAF_PRIJS}</span>
              </p>
              <p className="mt-3 text-ink-300">
                Inclusief voorrijkosten en btw. Wat het bij u precies wordt,
                staat binnen enkele uren zwart-op-wit in uw offerte —
                vrijblijvend.
              </p>
            </div>
            <Link href={href} className="btn-primary btn-lg mt-8 w-full">
              Offerte aanvragen
              <Icon name="arrow-right" className="size-5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="lg:col-span-3">
        <h3 className="text-h3">Waar uw prijs van afhangt</h3>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2">
          {prijsFactoren.map((f) => (
            <li key={f.kop} className="card h-full p-5">
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
  title = "Vraag uw offerte aan",
  text = "Vertel kort wat er moet gebeuren en waar u woont. U krijgt binnen enkele uren het bedrag, vrijblijvend.",
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
              Offerte aanvragen
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
            <span
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
