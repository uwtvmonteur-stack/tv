import Image from "next/image";
import type { StaticImageData } from "next/image";
import type { ReactNode } from "react";
import ContactForm from "./ContactForm";
import CheckList from "./CheckList";
import Faq from "./Faq";
import JsonLd from "./JsonLd";
import Reveal from "./Reveal";
import Reviews from "./Reviews";
import { Stars } from "./ui";
import { IconArrowUpRight, IconCheck, IconClock, IconShield } from "./icons";
import type { FaqItem, Review } from "@/lib/content";
import { faqJsonLd, serviceJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";

export type PrijsKaart = {
  label: string;
  prijs: string;
  sub: string;
  featured?: boolean;
};

export type PlanLandingProps = {
  /** Klein labeltje boven de kop; noem hier de dienst en het werkgebied. */
  eyebrow: string;
  /** Eerste regel van de H1 — bevat het zoekwoord. */
  titel: string;
  /** Tweede regel van de H1, in accentkleur. */
  titelAccent: string;
  intro: ReactNode;
  zekerheden: string[];
  /** Kop en tekst boven het formulier. */
  formulierTitel: string;
  formulierIntro: string;
  submitLabel: string;
  /** Label en voorbeeldtekst van het berichtveld — per dienst anders. */
  berichtLabel: string;
  berichtPlaceholder: string;
  /** Komt als parameter mee in het GA4-event, zodat varianten meetbaar zijn. */
  variant: string;
  stappenTitel: string;
  stappen: string[];
  inbegrepenTitel: string;
  inbegrepenIntro: string;
  inbegrepen: string[];
  prijsTitel: string;
  prijsIntro: string;
  prijzen: PrijsKaart[];
  prijsNoot: ReactNode;
  reviewsTitel: string;
  /** Beoordelingen over déze dienst; kies de set uit `reviewsPerDienst`. */
  reviewsItems: Review[];
  faqTitel: string;
  faqItems: FaqItem[];
  image: StaticImageData;
  imageAlt: string;
  /** Voor de JSON-LD: naam, omschrijving en het pad van de ORIGINELE pagina. */
  service: { naam: string; omschrijving: string; pad: string };
};

/**
 * Sjabloon voor de boekingsgerichte testpagina's naast de gewone dienstpagina's.
 *
 * Opzet — bewust in deze volgorde:
 * 1. het formulier staat direct in beeld, naast de kop;
 * 2. één actie per scherm (geen telefoonnummer dat de knop beconcurreert);
 * 3. de prijs komt pas ná de waarde, als geruststelling in plaats van drempel;
 * 4. daarna reviews (bewijs) en pas dan de resterende vragen.
 *
 * Elke pagina die dit gebruikt zet een canonical naar de originele dienstpagina
 * en `robots: noindex`, en staat niet in de sitemap — anders ziet Google twee
 * pagina's over hetzelfde onderwerp.
 */
export default function PlanLanding({
  eyebrow,
  titel,
  titelAccent,
  intro,
  zekerheden,
  formulierTitel,
  formulierIntro,
  submitLabel,
  berichtLabel,
  berichtPlaceholder,
  variant,
  stappenTitel,
  stappen,
  inbegrepenTitel,
  inbegrepenIntro,
  inbegrepen,
  prijsTitel,
  prijsIntro,
  prijzen,
  prijsNoot,
  reviewsTitel,
  reviewsItems,
  faqTitel,
  faqItems,
  image,
  imageAlt,
  service,
}: PlanLandingProps) {
  return (
    <main>
      <JsonLd
        data={serviceJsonLd({
          name: service.naam,
          description: service.omschrijving,
          path: service.pad,
          offers: prijzen.map((p) => ({
            name: p.label,
            price: p.prijs.replace(/[^\d]/g, ""),
          })),
        })}
      />
      <JsonLd data={faqJsonLd(faqItems)} />

      <section className="relative overflow-hidden bg-ink text-cream">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 px-4 pt-28 pb-14 md:px-8 md:pt-36 md:pb-20 lg:grid-cols-2 lg:items-start lg:gap-14">
          <Reveal immediate>
            <div>
              <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-[0.12em] text-amber-300 uppercase ring-1 ring-white/15">
                {eyebrow}
              </span>
              <h1 className="mt-6 font-display text-4xl leading-[1.05] font-bold tracking-tight md:text-5xl lg:text-6xl">
                {titel}
                <span className="mt-2 block text-amber-400">{titelAccent}</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
                {intro}
              </p>

              <ul className="mt-8 flex flex-col gap-3">
                {zekerheden.map((z) => (
                  <li key={z} className="flex items-start gap-3 text-[15px] font-medium">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-300">
                      <IconCheck className="h-3.5 w-3.5" />
                    </span>
                    {z}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/80">
                <a
                  href="#reviews"
                  className="flex items-center gap-2 transition-colors duration-300 ease-fluid hover:text-white"
                >
                  <Stars />
                  <strong className="font-semibold text-white">
                    {SITE.reviews.score} / 5
                  </strong>
                  <span className="underline decoration-white/40 underline-offset-4">
                    {SITE.reviews.count} reviews
                  </span>
                </a>
                <span className="flex items-center gap-2">
                  <IconShield className="h-4 w-4 text-amber-400" />
                  Volledig verzekerd
                </span>
                <span className="flex items-center gap-2">
                  <IconClock className="h-4 w-4 text-amber-400" />7 dagen per week
                </span>
              </div>

              {/* Op mobiel staat het formulier ónder deze kolom; deze knop
                  brengt de bezoeker er in één tik naartoe. Op groot scherm
                  staat het formulier al naast de tekst. */}
              <a
                href="#afspraak"
                className="mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-amber-600 py-4 text-base font-semibold text-white transition-transform duration-300 ease-fluid active:scale-[0.98] lg:hidden"
              >
                Plan uw afspraak
                <IconArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          <Reveal immediate>
            <div
              id="afspraak"
              className="rounded-[2rem] bg-white/10 p-1.5 ring-1 ring-white/15"
            >
              <div className="rounded-[calc(2rem-0.375rem)] bg-cream p-6 text-ink md:p-8">
                <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                  {formulierTitel}
                </h2>
                <p className="mt-2 mb-6 text-[15px] leading-relaxed text-ink-soft">
                  {formulierIntro}
                </p>
                <ContactForm
                  planner
                  variant={variant}
                  submitLabel={submitLabel}
                  berichtLabel={berichtLabel}
                  berichtPlaceholder={berichtPlaceholder}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-8 md:py-20">
        <Reveal>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            {stappenTitel}
          </h2>
        </Reveal>
        <ol className="mt-8 grid gap-3 md:grid-cols-3 md:gap-4">
          {stappen.map((stap, i) => (
            <li key={stap}>
              <Reveal delay={i * 60}>
                <div className="flex items-center gap-4 rounded-2xl bg-ink/[0.04] px-5 py-4 ring-1 ring-ink/5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-600 font-display text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="font-display text-[17px] font-bold tracking-tight">
                    {stap}
                  </span>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal>
          <h2 className="mt-20 font-display text-3xl font-bold tracking-tight md:text-4xl">
            {inbegrepenTitel}
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
            {inbegrepenIntro}
          </p>
        </Reveal>
        <Reveal delay={80}>
          <CheckList items={inbegrepen} className="mt-8 grid gap-3 sm:grid-cols-2" medium />
        </Reveal>

        <Reveal>
          <h2 className="mt-20 font-display text-3xl font-bold tracking-tight md:text-4xl">
            {prijsTitel}
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">{prijsIntro}</p>
        </Reveal>
        <ul
          className={`mt-8 grid gap-4 ${
            prijzen.length > 1 ? "md:grid-cols-3" : "max-w-sm"
          }`}
        >
          {prijzen.map((kaart, i) => (
            <li key={kaart.label} className="h-full">
              <Reveal delay={i * 60} className="h-full">
                <div
                  className={`flex h-full flex-col rounded-[1.75rem] p-7 ${
                    kaart.featured
                      ? "bg-ink text-cream shadow-[0_40px_80px_-40px_rgba(25,21,18,0.5)]"
                      : "bg-white ring-1 ring-ink/5"
                  }`}
                >
                  <span
                    className={`text-sm ${kaart.featured ? "text-white/70" : "text-ink-soft"}`}
                  >
                    {kaart.label}
                  </span>
                  <span className="mt-2 font-display text-4xl font-bold tracking-tight">
                    {kaart.prijs}
                  </span>
                  <span
                    className={`mt-1 text-sm ${
                      kaart.featured ? "text-white/70" : "text-ink-soft"
                    }`}
                  >
                    {kaart.sub}
                  </span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
        <Reveal>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ink-soft">
            {prijsNoot}
          </p>
        </Reveal>
      </section>

      {/* Anker voor de sterren in de hero. De afstand tot de menubalk regelt
          `scroll-padding-top` op html (app/globals.css). */}
      <div id="reviews">
        <Reviews title={reviewsTitel} items={reviewsItems} />
      </div>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-8 md:py-20">
        <Reveal>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            {faqTitel}
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-8 max-w-3xl">
            <Faq items={faqItems} />
          </div>
        </Reveal>
      </section>
    </main>
  );
}
