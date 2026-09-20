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
import { provincieBySlug, stadBySlug, steden } from "@/lib/steden";
import { lokaalTekst } from "@/lib/stedenLokaal";
import { faqJsonLd, pageMeta, serviceJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";
import heroFoto from "@/public/images/monteur-aan-het-werk.jpg";

export const dynamicParams = false;

export function generateStaticParams() {
  return steden.map((stad) => ({ stad: stad.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ stad: string }>;
}): Promise<Metadata> {
  const { stad: slug } = await params;
  const stad = stadBySlug(slug);
  if (!stad) return {};
  const provincie = provincieBySlug(stad.provincie);
  return {
    ...pageMeta({
      title: `Tv Monteur ${stad.naam} — Vanaf €99`,
      description: `Tv monteur nodig in ${stad.naam}? Tv ophangen vanaf €99, inclusief voorrijkosten. Vaak binnen 24 uur bij u thuis, 7 dagen per week.`,
      path: `/tv-monteur/${stad.slug}`,
    }),
    other: {
      "geo.region": `NL-${provincie?.iso ?? ""}`,
      "geo.placename": stad.naam,
      "geo.position": `${stad.lat};${stad.lng}`,
      ICBM: `${stad.lat}, ${stad.lng}`,
    },
  };
}

const waarom = (naam: string) => [
  `Vaak binnen 24 uur een monteur in ${naam}`,
  ...usps.filter((u) => !u.startsWith("Vaak binnen 24 uur")),
];

export default async function StadPage({
  params,
}: {
  params: Promise<{ stad: string }>;
}) {
  const { stad: slug } = await params;
  const stad = stadBySlug(slug);
  if (!stad) notFound();

  const provincie = provincieBySlug(stad.provincie);
  if (!provincie) notFound();

  const stadIndex = steden.findIndex((s) => s.slug === stad.slug);
  const nabijeSteden = stad.nabij
    .map((nabijSlug) => stadBySlug(nabijSlug))
    .filter((s) => s !== undefined);

  // Varieer de vraagformulering per stad (op volgnummer), zodat de FAQ's niet
  // op alle 32 stadpagina's woordelijk identiek zijn (dunne-content-preventie).
  const qv = stadIndex % 3;
  const faqItems: FaqItem[] = [
    {
      q: [
        `Hoe snel kan een tv monteur in ${stad.naam} langskomen?`,
        `Wanneer kan er een tv monteur in ${stad.naam} langskomen?`,
        `Hoe snel bent u in ${stad.naam} aan de beurt?`,
      ][qv],
      a: `In ${stad.naam} kunnen we u vaak al binnen 24 uur helpen, uiterlijk binnen 48 uur — ook 's avonds en in het weekend, zonder toeslag. Bel ${SITE.phoneDisplay} voor de eerstvolgende beschikbaarheid.`,
    },
    {
      q: [
        `Wat kost een tv ophangen in ${stad.naam}?`,
        `Wat betaal ik voor tv ophangen in ${stad.naam}?`,
        `Hoeveel kost tv-montage in ${stad.naam}?`,
      ][qv],
      a: `Tv ophangen in ${stad.naam} start bij €99, altijd inclusief voorrijkosten en btw — de exacte prijs hangt af van het formaat (zie de tarieven hierboven). Kabels wegwerken kan vanaf €39 extra.`,
    },
    {
      q: [
        `In welke wijken van ${stad.naam} komen jullie?`,
        `Komen jullie in alle wijken van ${stad.naam}?`,
        `Werken jullie door heel ${stad.naam}?`,
      ][qv],
      a: `Ja, in alle wijken van ${stad.naam} — zie het overzicht hierboven. Daarnaast komen we in de omliggende plaatsen en de rest van ${provincie.naam}. Staat uw wijk er niet bij? Dan helpen we u vrijwel altijd alsnog.`,
    },
  ];

  return (
    <main>
      <JsonLd
        data={serviceJsonLd({
          name: `Tv monteur ${stad.naam}`,
          description: `Tv ophangen, kabels wegwerken en complete tv installatie aan huis in ${stad.naam} en omgeving.`,
          path: `/tv-monteur/${stad.slug}`,
          areaServed: {
            "@type": "City",
            name: stad.naam,
            containedInPlace: { "@type": "State", name: provincie.naam },
            geo: {
              "@type": "GeoCoordinates",
              latitude: stad.lat,
              longitude: stad.lng,
            },
          },
          offers: [
            { name: "Tv ophangen tot 43 inch", price: "99" },
            { name: "Tv ophangen 44 t/m 65 inch", price: "129" },
            { name: "Tv ophangen vanaf 65 inch", price: "179" },
          ],
        })}
      />
      <JsonLd data={faqJsonLd(faqItems)} />

      <ServiceHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Werkgebied", href: "/werkgebied" },
          { name: provincie.naam, href: `/werkgebied/${provincie.slug}` },
          { name: stad.naam, href: `/tv-monteur/${stad.slug}` },
        ]}
        eyebrow={`Tv monteur ${provincie.naam}`}
        title={`Tv monteur in ${stad.naam}`}
        intro={`Zoekt u een tv monteur in ${stad.naam}? Onze monteur komt bij u aan huis, hangt uw tv veilig en waterpas op, werkt de kabels weg en sluit al uw apparatuur aan — vakkundig en voor een vaste prijs.`}
        benefits={waarom(stad.naam)}
        image={heroFoto}
        imageAlt={`Tv monteur van Uw TV Monteur aan het werk in ${stad.naam}`}
      />

      <section className="mx-auto w-full max-w-6xl px-4 py-10 md:px-8">
        <Reveal>
          <div className="rounded-[2rem] bg-cream-deep/50 p-8 md:p-10">
            <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              Tv monteur in elke wijk van {stad.naam}
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
              Onze monteurs komen door heel {stad.naam} aan huis — van{" "}
              {stad.wijken[0]} en {stad.wijken[1]} tot{" "}
              {stad.wijken[stad.wijken.length - 1]}. Waar u ook woont en welk
              type muur u ook heeft, wij hangen uw tv veilig en waterpas op.
            </p>
            {lokaalTekst[stad.slug] && (
              <p className="mt-4 max-w-3xl leading-relaxed text-ink-soft">
                {lokaalTekst[stad.slug]}
              </p>
            )}
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {stad.wijken.map((wijk) => (
                <li
                  key={wijk}
                  className="rounded-full bg-white px-4 py-2 text-sm font-medium ring-1 ring-ink/5"
                >
                  {wijk}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <DienstenMiniGrid plaats={stad.naam} />

        <Reveal>
          <h2 className="mt-20 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Wat kost tv ophangen in {stad.naam}?
          </h2>
          <div className="mt-6 flex flex-wrap gap-2.5 text-sm font-medium">
            <span className="rounded-full bg-ink/[0.04] px-4 py-2 ring-1 ring-ink/5">
              Tot 43 inch — €99
            </span>
            <span className="rounded-full bg-ink text-cream px-4 py-2">
              44 t/m 65 inch — €129 · populair
            </span>
            <span className="rounded-full bg-ink/[0.04] px-4 py-2 ring-1 ring-ink/5">
              Vanaf 65 inch — €179
            </span>
          </div>
          <p className="mt-5 text-sm text-ink-soft">
            Inclusief voorrijkosten in {stad.naam} en btw. Bekijk alle{" "}
            <Link
              href="/prijzen"
              className="font-semibold text-ink underline decoration-amber-600/50 underline-offset-4"
            >
              prijzen en aanvullende diensten
            </Link>
            .
          </p>
        </Reveal>

        <Reveal>
          <h2 className="mt-20 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Veelgestelde vragen — {stad.naam}
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-8 max-w-3xl">
            <Faq items={faqItems} />
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-16 flex flex-wrap items-center gap-2.5 text-sm">
            <span className="font-semibold">
              Ook actief in de buurt van {stad.naam}:
            </span>
            {nabijeSteden.map((nabijStad) => (
              <Link
                key={nabijStad.slug}
                href={`/tv-monteur/${nabijStad.slug}`}
                className="rounded-full bg-ink/[0.04] px-4 py-2 font-medium ring-1 ring-ink/5 transition-colors duration-300 ease-fluid hover:bg-ink/10"
              >
                Tv monteur {nabijStad.naam}
              </Link>
            ))}
            <Link
              href={`/werkgebied/${provincie.slug}`}
              className="group flex items-center gap-2 rounded-full px-4 py-2 font-semibold"
            >
              Heel {provincie.naam}
              <IconArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 ease-spring group-hover:-translate-y-px group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </section>

      <Reviews />

      <CtaSection title={`Tv monteur nodig in ${stad.naam}?`} />
    </main>
  );
}
