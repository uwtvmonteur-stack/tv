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
      title: `Tv ophangen in ${provincie.naam} — vaste prijs vanaf €99`,
      description: `Tv laten ophangen in ${provincie.naam}? Vaste prijs vooraf, inclusief voorrijkosten en btw. Elke tv, elke wand, ook 's avonds en in het weekend zonder toeslag.`,
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
      a: `${provincie.naam} behoort tot ons kerngebied: vaak kunnen we u al binnen 24 uur helpen, uiterlijk binnen 48 uur, ook 's avonds en in het weekend. Vraag online een afspraak aan, dan laten we u binnen enkele uren de eerstvolgende beschikbaarheid bij u in de buurt weten.`,
    },
    {
      q: [
        `Betaal ik voorrijkosten in ${provincie.naam}?`,
        `Zijn er voorrijkosten in ${provincie.naam}?`,
        `Betaal ik extra voor de rit naar ${provincie.naam}?`,
      ][qv],
      a: `Nee. In heel ${provincie.naam} zijn de voorrijkosten bij de vaste prijs inbegrepen: tv ophangen vanaf €99, inclusief btw. De prijs die we afspreken is de prijs die u betaalt.`,
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
        eyebrow={`Tv ophangen in ${provincie.naam}`}
        title={`Tv laten ophangen in ${provincie.naam}`}
        intro={provincie.intro}
        benefits={usps}
        image={heroFoto}
        imageAlt={`Tv monteur van Uw TV Monteur aan het werk in ${provincie.naam}`}
        formulier={{
          titel: `Plan uw afspraak in ${provincie.naam}`,
          intro:
            `Kies het formaat van uw tv, dan staat uw prijs er direct bij \u2014 vast, inclusief voorrijkosten en btw. U krijgt binnen enkele uren bericht over de eerstvolgende mogelijkheid.`,
          submitLabel: "Afspraak aanvragen",
          variant: `provincie-${provincie.slug}`,
          montage: true,
          berichtLabel: "Uw tv en uw muur",
          berichtPlaceholder:
            "Bijvoorbeeld: 55 inch Samsung, en de wand is gipsplaat.",
        }}
      />

      <section className="mx-auto w-full max-w-content px-4 py-section md:px-8">
        <Reveal>
          <h2 className="font-display text-h2 font-semibold">
            Kies uw stad
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-fg-muted">
            Bekijk wat we voor u kunnen betekenen bij u in de buurt — inclusief
            lokale veelgestelde vragen en beschikbaarheid.
          </p>
        </Reveal>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {provincieSteden.map((stad, i) => (
            <li key={stad.slug} className="h-full">
              <Reveal delay={i * 60} className="h-full">
              <Link
                href={`/tv-ophangen/${stad.slug}`}
                className="group flex h-full items-center justify-between gap-3 rounded-md bg-white p-5 border border-hairline shadow-e2 transition-transform duration-500 ease-out hover:-translate-y-1"
              >
                <span className="font-display font-semibold tracking-tight">
                  {stad.naam}
                </span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sunk transition-transform duration-500 ease-out group-hover:-translate-y-px group-hover:translate-x-0.5">
                  <IconArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </Link>
              </Reveal>
            </li>
          ))}
        </ul>

        <DienstenMiniGrid plaats={provincie.naam} />

        <Reveal>
          <h2 className="mt-block font-display text-h2 font-semibold">
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

      <CtaSection
        title={`Tv laten ophangen in ${provincie.naam}?`}
        href="#afspraak"
      />
    </main>
  );
}
