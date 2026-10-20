import Link from "next/link";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import {
  IconChat,
  IconCheck,
  IconSliders,
  IconSpeaker,
  IconStar,
  IconTv,
} from "./icons";

/* =========================================================================
   Bouwstenen
   =========================================================================
   Elke bouwsteen bezit zijn eigen ruimte, hoeken en diepte. Pagina's geven
   alleen inhoud mee.

   Dat is de hele reden dat dit bestand bestaat. In de vorige opzet bepaalde
   elke pagina zelf zijn marges, randen en schaduwen, met als uitkomst elf
   verschillende kaartbehandelingen en negen hoekwaardes voor wat in feite
   één ding is: een blokje inhoud op papier. Een bezoeker kan dat niet
   benoemen, maar hij ziet wel dat het niet door één hand is gemaakt.
   ========================================================================= */

/* ---- Structuur -------------------------------------------------------- */

type Breedte = "prose" | "content" | "wide";

const breedtes: Record<Breedte, string> = {
  prose: "max-w-prose",
  content: "max-w-content",
  wide: "max-w-wide",
};

export function Container({
  children,
  breedte = "content",
  className = "",
}: {
  children: ReactNode;
  breedte?: Breedte;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full px-gutter ${breedtes[breedte]} ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * Eén verticaal ritme voor de hele site. Hiervoor stonden er elf verschillende
 * py-combinaties naast elkaar, waarvan de dienstpagina's — waar het
 * advertentiegeld landt — de krapste hadden.
 */
export function Section({
  children,
  id,
  breedte = "content",
  tone = "paper",
  className = "",
  as: As = "section",
}: {
  children: ReactNode;
  id?: string;
  breedte?: Breedte;
  tone?: "paper" | "sunk" | "inverse";
  className?: string;
  as?: ElementType;
}) {
  const tonen = {
    paper: "",
    sunk: "bg-sunk",
    inverse: "bg-inverse text-fg-inverse on-inverse",
  };
  return (
    <As
      id={id}
      className={`py-section ${tonen[tone]} ${id ? "scroll-mt-24" : ""} ${className}`}
    >
      <Container breedte={breedte}>{children}</Container>
    </As>
  );
}

/**
 * Koptekst van een blok: bovenregel, kop en optionele inleiding, met de
 * afstand naar de inhoud eronder al ingebakken (`--spacing-stack`).
 */
export function SectieKop({
  eyebrow,
  titel,
  intro,
  niveau = "h2",
  className = "",
}: {
  eyebrow?: ReactNode;
  titel: ReactNode;
  intro?: ReactNode;
  niveau?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const Kop = niveau;
  const maat = niveau === "h1" ? "text-h1" : "text-h2";
  return (
    <div className={`mb-stack max-w-2xl ${className}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Kop
        className={`font-display font-semibold text-balance ${maat} ${eyebrow ? "mt-4" : ""}`}
      >
        {titel}
      </Kop>
      {intro && (
        <p className="mt-4 text-lead text-fg-muted text-pretty">{intro}</p>
      )}
    </div>
  );
}

/** Leesbare regellengte voor lopende tekst. */
export function Prose({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`max-w-prose ${className}`}>{children}</div>;
}

/* ---- Labels ----------------------------------------------------------- */

/**
 * De bovenregel boven een kop. Was 10px met 0,2em spatiëring — onleesbaar
 * voor de vijftiger die deze dienst koopt. Nu 13px en zonder pil-rand, zodat
 * hij een label is en geen knop lijkt.
 */
export function Eyebrow({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-2xs font-semibold tracking-[0.12em] uppercase ${
        light ? "text-accent-ink" : "text-accent-fg"
      }`}
    >
      <span
        aria-hidden
        className={`h-px w-6 ${light ? "bg-accent-ink/60" : "bg-accent-fg/50"}`}
      />
      {children}
    </span>
  );
}

export function Chip({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "accent" | "inverse";
}) {
  const tonen = {
    default: "bg-raised border-hairline text-fg",
    accent: "bg-accent-tint border-accent/25 text-accent-fg",
    inverse: "bg-inverse-raised border-hairline-inverse text-fg-inverse",
  };
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-xs border px-3 py-1.5 text-xs font-medium ${tonen[tone]}`}
    >
      {children}
    </span>
  );
}

/* ---- Knoppen ---------------------------------------------------------- */

type KnopVariant = "primary" | "secondary" | "ghost" | "inverse";
type KnopMaat = "md" | "lg";

const knopVarianten: Record<KnopVariant, string> = {
  primary: "bg-accent text-white hover:bg-accent-hover shadow-e1",
  // `border-control` in plaats van een rand op 1,37:1: een omlijnde knop
  // waarvan je de omlijning niet ziet, is geen knop.
  secondary: "bg-raised text-fg border border-control hover:bg-sunk",
  ghost: "text-fg hover:bg-sunk",
  inverse: "bg-paper text-fg hover:bg-white",
};

const knopMaten: Record<KnopMaat, string> = {
  // Minimaal 44px respectievelijk 52px hoog — WCAG 2.5.8 en gewoon te raken
  // met een duim.
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-13 px-7 text-base",
};

type KnopProps = {
  children: ReactNode;
  variant?: KnopVariant;
  maat?: KnopMaat;
  href?: string;
  breed?: boolean;
  className?: string;
  /** Bewust zonder event-argument, zodat dezelfde knop een <a> of <button> kan zijn. */
  onClick?: () => void;
} & Omit<ComponentPropsWithoutRef<"button">, "ref" | "onClick">;

export function Button({
  children,
  variant = "primary",
  maat = "md",
  href,
  breed = false,
  className = "",
  onClick,
  ...rest
}: KnopProps) {
  const klassen = `inline-flex items-center justify-center gap-2 rounded-sm font-semibold transition-[background-color,box-shadow,transform] duration-200 ease-out active:translate-y-px ${knopVarianten[variant]} ${knopMaten[maat]} ${breed ? "w-full" : ""} ${className}`;

  if (href) {
    // `onClick` gaat bewust mee naar de link: het mobiele menu sluit zichzelf
    // bij een klik, en zonder dit zou die knop het menu open laten staan.
    return (
      <Link href={href} className={klassen} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <button className={klassen} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}

/* ---- Vlakken ---------------------------------------------------------- */

/**
 * Eén kaart voor de hele site: wit vlak, één haarlijn van 1px, lichte diepte.
 *
 * De vorige opzet had een dubbele lijst (`p-1.5 ring-1` met een tweede vlak
 * erin) die op tien plekken met de hand was nagebouwd. Die lijst zat op een
 * contrast van 1,2:1 en was dus onzichtbaar, waardoor kaarten alleen nog
 * door hun schaduw bestonden: vage wolken in plaats van afgebakende
 * objecten. Een zichtbare rand van één pixel leest als precisie, en precisie
 * is bij deze dienst het product.
 */
export function Card({
  children,
  tone = "raised",
  interactive = false,
  className = "",
  as: As = "div",
}: {
  children: ReactNode;
  tone?: "raised" | "paper" | "inverse" | "accent";
  interactive?: boolean;
  className?: string;
  as?: ElementType;
}) {
  const tonen = {
    raised: "bg-raised border-hairline shadow-e1",
    paper: "bg-paper border-hairline",
    inverse:
      "bg-inverse-raised border-hairline-inverse text-fg-inverse on-inverse",
    accent: "bg-accent-tint border-accent/25",
  };
  return (
    <As
      className={`rounded-md border ${tonen[tone]} ${
        interactive
          ? "transition-shadow duration-200 ease-out hover:shadow-e2"
          : ""
      } ${className}`}
    >
      {children}
    </As>
  );
}

/**
 * Tijdelijk: de oude naam wijst naar de nieuwe kaart, zodat pagina's die nog
 * niet zijn omgezet meteen het nieuwe uiterlijk krijgen in plaats van te
 * breken. Verdwijnt zodra alle pagina's `Card` gebruiken.
 */
export function BezelCard({
  children,
  className = "",
  innerClassName = "",
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <Card className={className}>
      <div className={innerClassName}>{children}</div>
    </Card>
  );
}

/* ---- Inhoudselementen ------------------------------------------------- */

export function Stat({
  waarde,
  label,
  light = false,
}: {
  waarde: ReactNode;
  label: ReactNode;
  light?: boolean;
}) {
  return (
    <div>
      <div className="font-display text-stat font-semibold tabular">
        {waarde}
      </div>
      <div
        className={`mt-2 text-sm ${light ? "text-fg-inverse-muted" : "text-fg-muted"}`}
      >
        {label}
      </div>
    </div>
  );
}

export function CheckItem({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <li className="flex items-start gap-3">
      <span
        aria-hidden
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-xs ${
          light
            ? "bg-accent-ink/20 text-accent-ink"
            : "bg-accent-tint text-accent-fg"
        }`}
      >
        <IconCheck className="h-3 w-3" />
      </span>
      <span className="text-sm">{children}</span>
    </li>
  );
}

/**
 * Sterren. Stonden op amber-500 (2,01:1 op papier) terwijl ze de beoordeling
 * dragen; nu op de accentkleur, en groter, zodat ze niet subpixel-fragiel zijn.
 */
export function Stars({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <span className="flex items-center gap-0.5 text-accent-fg">
      {[0, 1, 2, 3, 4].map((i) => (
        <IconStar key={i} className={className} />
      ))}
    </span>
  );
}

/**
 * Het pictogram bij een dienst. Was een amberkleurig vierkant van 48px op elke
 * kaart — na de foto het sterkste sjabloonsignaal van de site. Nu kleiner en
 * rustiger, zodat de kop het werk doet.
 */
export function IconChip({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-xs bg-accent-tint text-accent-fg">
      {children}
    </span>
  );
}

export function DienstIcon({
  slug,
  className = "h-6 w-6",
}: {
  slug: string;
  className?: string;
}) {
  switch (slug) {
    case "tv-ophangen":
      return <IconTv className={className} />;
    case "tv-installatie":
      return <IconSliders className={className} />;
    case "soundbar-installatie":
      return <IconSpeaker className={className} />;
    case "tv-instellen":
      return <IconChat className={className} />;
    default:
      return <IconTv className={className} />;
  }
}
