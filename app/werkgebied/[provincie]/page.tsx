import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ServiceHero from "@/components/ServiceHero";
import CtaSection from "@/components/CtaSection";
import Reviews from "@/components/Reviews";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import DienstenMiniGrid from "@/components/DienstenMiniGrid";
import { IconArrowUpRight } from "@/components/icons";
import { usps, type FaqItem } from "@/lib/content";
import { provincies, provincieBySlug, stedenInProvincie } from "@/lib/steden";
import { faqJsonLd, pageMeta, serviceJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";
import heroFoto from "@/public/images/monteur-aan-het-werk.jpg";

export const dynamicParams = false;

export function generateStaticParams() {
  return provincies.map((provincie) => ({ provincie: provincie.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ provincie: string }>;
}): Promise<Metadata> {
  const { provincie: slug } = await params;
  const provincie = provincieBySlug(slug);
  if (!provincie) return {};
  return {
    ...pageMeta({
      title: `Tv Monteur in de Provincie ${provincie.naam} — Vanaf €109`,
      description: `Tv monteur nodig in de provincie ${provincie.naam}? Tv ophangen, installeren en instellen aan huis. Vaak binnen 24 uur, vaste prijzen incl. voorrijkosten.`,
      path: `/werkgebied/${provincie.slug}`,
    }),
    other: { "geo.region": `NL-${provincie.iso}` },
  };
}

export default async function ProvinciePage({
  params,
}: {
  params: Promise<{ provincie: string }>;
}) {
  const { provincie: slug } = await params;
  const provincie = provincieBySlug(slug);
  if (!provincie) notFound();

  const provincieSteden = stedenInProvincie(provincie.slug);
  const provincieIndex = provincies.findIndex((p) => p.slug === provincie.slug);

  // Varieer de vraagformulering per provincie (op volgnummer) tegen
  // gesjabloneerde, near-identieke FAQ's.
  const qv = provincieIndex % 3;
  const faqItems: FaqItem[] = [
    {
      q: [
        `Hoe snel kan een tv monteur in ${provincie.naam} langskomen?`,
        `Wanneer kan er een tv monteur in ${provincie.naam} langskomen?`,
        `Hoe snel bent u in ${provincie.naam} aan de beurt?`,
      ][qv],
      a: `${provincie.naam} behoort tot ons kerngebied: vaak kunnen we u al binnen 24 uur helpen, uiterlijk binnen 48 uur, ook 's avonds en in het weekend. Bel ${SITE.phoneDisplay} voor de eerstvolgende beschikbaarheid bij u in de buurt.`,
    },
    {
      q: [
        `Betaal ik voorrijkosten in ${provincie.naam}?`,
        `Zijn er voorrijkosten in ${provincie.naam}?`,
        `Betaal ik extra voor de rit naar ${provincie.naam}?`,
      ][qv],
      a: `Nee. In heel ${provincie.naam} zijn de voorrijkosten bij de vaste prijs inbegrepen: tv ophangen vanaf €109, inclusief btw. De prijs die we afspreken is de prijs die u betaalt.`,
    },
    {
      q: [
        `In welke plaatsen in ${provincie.naam} werken jullie?`,
        `Waar in ${provincie.naam} kunnen jullie langskomen?`,
        `Komen jullie overal in ${provincie.naam}?`,
      ][qv],
      a: `Onder andere in ${provincieSteden
        .slice(0, 5)
        .map((s) => s.naam)
        .join(", ")} en alle omliggende plaatsen. Staat uw woonplaats er niet bij? Ook dan helpen we u vrijwel altijd.`,
    },
  ];

  return (
    <main>
      <JsonLd
        data={serviceJsonLd({
          name: `Tv monteur ${provincie.naam}`,
          description: `Tv ophangen, kabels wegwerken en complete tv installatie aan huis in ${provincie.naam}.`,
          path: `/werkgebied/${provincie.slug}`,
          areaServed: { "@type": "State", name: provincie.naam },
        })}
      />
      <JsonLd data={faqJsonLd(faqItems)} />

      <ServiceHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Werkgebied", href: "/werkgebied" },
          { name: provincie.naam, href: `/werkgebied/${provincie.slug}` },
        ]}
        eyebrow={`Werkgebied ${provincie.naam}`}
        title={`Tv monteur in de provincie ${provincie.naam}`}
        intro={provincie.intro}
        benefits={usps}
        image={heroFoto}
        imageAlt={`Tv monteur van Uw TV Monteur aan het werk in ${provincie.naam}`}
      />

      <section className="mx-auto w-full max-w-6xl px-4 py-10 md:px-8">
        <Reveal>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            Kies uw stad
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
            Bekijk wat we voor u kunnen betekenen bij u in de buurt — inclusief
            lokale veelgestelde vragen en beschikbaarheid.
          </p>
        </Reveal>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {provincieSteden.map((stad, i) => (
            <li key={stad.slug} className="h-full">
              <Reveal delay={i * 60} className="h-full">
              <Link
                href={`/tv-monteur/${stad.slug}`}
                className="group flex h-full items-center justify-between gap-3 rounded-[1.5rem] bg-white p-5 ring-1 ring-ink/5 shadow-[0_20px_40px_-30px_rgba(25,21,18,0.2)] transition-transform duration-500 ease-fluid hover:-translate-y-1"
              >
                <span className="font-display font-bold tracking-tight">
                  {stad.naam}
                </span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink/5 transition-transform duration-500 ease-spring group-hover:-translate-y-px group-hover:translate-x-0.5">
                  <IconArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </Link>
              </Reveal>
            </li>
          ))}
        </ul>

        <DienstenMiniGrid plaats={provincie.naam} />

        <Reveal>
          <h2 className="mt-20 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Veelgestelde vragen — {provincie.naam}
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-8 max-w-3xl">
            <Faq items={faqItems} />
          </div>
        </Reveal>
      </section>

      <Reviews />

      <CtaSection title={`Tv monteur nodig in ${provincie.naam}?`} />
    </main>
  );
}
