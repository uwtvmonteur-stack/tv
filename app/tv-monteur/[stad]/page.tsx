import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ServiceHero from "@/components/ServiceHero";
import CtaSection from "@/components/CtaSection";
import InlineCta from "@/components/InlineCta";
import Reviews from "@/components/Reviews";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import { IconArrowUpRight } from "@/components/icons";
import { DienstIcon } from "@/components/ui";
import {
  diensten,
  dienstHref,
  reviews,
  reviewsPerDienst,
  usps,
  type FaqItem,
  type Review,
} from "@/lib/content";
import { provincieBySlug, stadBySlug, steden } from "@/lib/steden";
import { lokaalTekst } from "@/lib/stedenLokaal";
import { faqJsonLd, pageMeta, serviceJsonLd } from "@/lib/seo";
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
      title: `Tv Monteur ${stad.naam} — Aan Huis`,
      description: `Tv monteur nodig in ${stad.naam}? Tv ophangen, installeren en instellen aan huis. Vaste prijs vooraf, vaak binnen 24 uur bij u thuis.`,
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

/**
 * Alle bestaande beoordelingen in één poel, ontdubbeld op quote. Elke stad
 * toont hier een ander venster uit — dezelfde beoordelingen, andere selectie.
 * Reden: het reviewsblok leverde 13 van de 25 woordelijk identieke zinnen
 * tussen twee stadpagina's op en was daarmee de grootste bron van duplicatie.
 * Er wordt geen beoordeling toegevoegd, herschreven of verwijderd.
 */
const reviewPoel: Review[] = [
  ...reviews,
  ...Object.values(reviewsPerDienst).flat(),
].filter(
  (review, i, lijst) =>
    lijst.findIndex((ander) => ander.quote === review.quote) === i,
);

/** "Delft, Dordrecht en Den Haag" — leest als een zin, niet als een lijst. */
function opsomming(namen: string[]) {
  if (namen.length <= 1) return namen[0] ?? "";
  return `${namen.slice(0, -1).join(", ")} en ${namen[namen.length - 1]}`;
}

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
  // Drie wijken verspreid over de lijst in plaats van de eerste drie: zo noemt
  // het antwoord per stad andere namen dan het chipsoverzicht hierboven opent.
  const wijkSelectie = [0, 2, 4]
    .map((i) => stad.wijken[i % stad.wijken.length])
    .filter((wijk, i, lijst) => lijst.indexOf(wijk) === i);
  // Stap 5 per stad: buursteden, die bezoekers het vaakst naast elkaar zien,
  // krijgen zo een duidelijk andere selectie dan hun buren.
  const stadReviews = Array.from(
    { length: 6 },
    (_, i) => reviewPoel[(stadIndex * 5 + i) % reviewPoel.length],
  );
  const faqItems: FaqItem[] = [
    {
      q: [
        `Hoe snel kan een tv monteur in ${stad.naam} langskomen?`,
        `Wanneer kan er een tv monteur in ${stad.naam} langskomen?`,
        `Hoe snel bent u in ${stad.naam} aan de beurt?`,
      ][qv],
      a: `In ${stad.naam} kunnen we u vaak al binnen 24 uur helpen, uiterlijk binnen 48 uur — ook 's avonds en in het weekend, zonder toeslag. Onze monteurs rijden dagelijks tussen ${stad.naam} en ${opsomming(nabijeSteden.map((s) => s.naam))}, dus er is bijna altijd iemand in de buurt. Vraag online een afspraak aan, dan laten we u binnen enkele uren de eerstvolgende mogelijkheid weten.`,
    },
    {
      q: [
        `Wat kost een tv ophangen in ${stad.naam}?`,
        `Wat betaal ik voor tv ophangen in ${stad.naam}?`,
        `Hoeveel kost tv-montage in ${stad.naam}?`,
      ][qv],
      a: `Tv ophangen in ${stad.naam} start bij €99, altijd inclusief voorrijkosten en btw — de exacte prijs hangt af van het schermformaat (zie de tarieven hierboven). Voor ${stad.naam} rekenen we geen voorrijtoeslag, in welke wijk u ook woont. Kabels wegwerken kan vanaf €39 extra.`,
    },
    {
      q: [
        `In welke wijken van ${stad.naam} komen jullie?`,
        `Komen jullie in alle wijken van ${stad.naam}?`,
        `Werken jullie door heel ${stad.naam}?`,
      ][qv],
      a: `Ja. We komen onder meer in ${opsomming(wijkSelectie)}, en net zo goed in de rest van ${stad.naam}. Staat uw wijk er niet bij? Dan helpen we u vrijwel altijd alsnog, net als in de omliggende plaatsen en de rest van ${provincie.naam}.`,
    },
    {
      q: `Hangen jullie ook een tv op aan een gipswand in ${stad.naam}?`,
      a: `Ja, daar worden we juist vaak voor gebeld. Veel woningen hebben tegenwoordig een voorzetwand of gipsplaat in plaats van massief metselwerk, en daar houdt een gewone plug een tv niet. Onze monteur stelt in ${stad.naam} ter plekke het wandtype vast, zoekt de staanders op en rekent het draagvermogen na voordat er geboord wordt.`,
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
            { name: "Tv ophangen vanaf 65 inch", price: "159" },
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
        // Bewust `stad.blurb` als intro: die tekst gaat over de bouwstijlen en
        // woningtypes van déze stad en verschilt dus per pagina. De generieke
        // intro die hier stond was op alle 32 stadpagina's woordelijk gelijk,
        // waardoor Google ze als bijna-duplicaten uit de resultaten filterde.
        intro={stad.blurb}
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
            {/* Alleen de per-stad geschreven tekst. De inleidende zin die hier
                stond ("Onze monteurs komen door heel X aan huis — van A en B
                tot F") was een sjabloon dat op elke stadpagina hetzelfde las;
                de wijknamen eronder zeggen hetzelfde, maar dan concreet. */}
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

        {/* Geen DienstenMiniGrid meer op stadpagina's: die rendert vijf
            dienstbeschrijvingen die op alle 32 pagina's woordelijk gelijk zijn,
            en juist díe tekst gebruikte Google als samenvatting in plaats van
            de lokale alinea hierboven. De links blijven — die dragen de interne
            linkstructuur naar de dienstpagina's — maar zonder de dubbele tekst.
            De provinciepagina's gebruiken de grid nog wel. */}
        <Reveal>
          <h2 className="mt-20 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Onze diensten in {stad.naam}
          </h2>
          <ul className="mt-8 flex flex-wrap gap-2.5 text-sm">
            {diensten.map((dienst) => (
              <li key={dienst.slug}>
                <Link
                  href={dienstHref(dienst)}
                  className="flex items-center gap-2.5 rounded-full bg-ink/[0.04] px-4 py-2.5 font-medium ring-1 ring-ink/5 transition-colors duration-300 ease-fluid hover:bg-ink/10"
                >
                  <DienstIcon slug={dienst.slug} className="h-4 w-4" />
                  {dienst.naam} in {stad.naam}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

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
              Vanaf 65 inch — €159
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

        {/* Hoort ná het tariefblok: pas als iemand de prijs voor zijn formaat
            kent, kan hij "plan een afspraak" beantwoorden. Stond hier eerder
            vóór de prijzen. */}
        <InlineCta
          text={`Vaste prijs vooraf, ook aan gipswand of holle wand. Kies een dag die u schikt; u krijgt binnen enkele uren bericht over de eerstvolgende mogelijkheid in ${stad.naam}.`}
        />

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

      <Reviews
        title={`Wat klanten in ${provincie.naam} zeggen`}
        items={stadReviews}
      />

      <CtaSection title={`Tv monteur nodig in ${stad.naam}?`} />
    </main>
  );
}
