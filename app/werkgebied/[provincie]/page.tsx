import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import ProvincieChips from "@/components/ProvincieChips";
import Reviews from "@/components/Reviews";
import { Icon, type IconName } from "@/components/Icon";
import {
  CheckList,
  HeroActions,
  HowItWorks,
  PageHero,
  Prijsklassen,
  Section,
  SectionHeading,
  ServiceCards,
  TrustBar,
} from "@/components/sections";
import { PRIJZEN_KORT, VANAF_PRIJS, type FaqItem } from "@/lib/content";
import { provincies, provincieBySlug, stedenInProvincie } from "@/lib/steden";
import { faqJsonLd, pageMeta, serviceJsonLd } from "@/lib/seo";

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

/** Wat de aanvraag zelf wel en niet van iemand vraagt. */
const aanvraagBelofte = [
  "Vrijblijvend: u zit aan niets vast tot u ja zegt",
  "Het bedrag is inclusief voorrijkosten en btw",
  "Geen aanbetaling — u betaalt pas na afloop",
  "Ook 's avonds en in het weekend, zonder toeslag",
];

/**
 * De bewijsregel onder de heroknop. Dezelfde drie afspraken als op de
 * plaatspagina's, met de provincienaam erin — geen reistijd en geen claim
 * over een vestiging in de buurt, want dat zouden vier keer dezelfde
 * onbewijsbare regels zijn.
 */
function HeroFeiten({ gebied }: { gebied: string }) {
  const feiten: { icon: IconName; tekst: string }[] = [
    { icon: "clock", tekst: "Vaak binnen 24 uur een monteur in de buurt" },
    {
      icon: "euro",
      tekst: `Voorrijkosten in heel ${gebied} zitten in de prijs`,
    },
    {
      icon: "calendar",
      tekst: "Ook 's avonds en in het weekend, zonder toeslag",
    },
  ];
  return (
    <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-ink-200">
      {feiten.map((feit) => (
        <li key={feit.tekst} className="flex items-center gap-2">
          <Icon name={feit.icon} className="size-5 text-accent-300" />
          {feit.tekst}
        </li>
      ))}
    </ul>
  );
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
      a: `Nee. In heel ${provincie.naam} zijn de voorrijkosten bij het tarief inbegrepen: tv ophangen vanaf ${VANAF_PRIJS}, inclusief btw. De prijs die we afspreken is de prijs die u betaalt.`,
    },
    {
      q: [
        `In welke plaatsen in ${provincie.naam} werken wij?`,
        `Waar in ${provincie.naam} kunnen wij langskomen?`,
        `Komen jullie overal in ${provincie.naam}?`,
      ][qv],
      a: `Onder andere in ${provincieSteden
        .slice(0, 5)
        .map((s) => s.naam)
        .join(", ")} en alle omliggende plaatsen. Staat uw woonplaats er niet bij? Ook dan helpen we u vrijwel altijd.`,
    },
  ];

  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: `Tv monteur ${provincie.naam}`,
          description: `Tv ophangen, kabels wegwerken en complete tv installatie aan huis in ${provincie.naam}.`,
          path: `/werkgebied/${provincie.slug}`,
          areaServed: { "@type": "State", name: provincie.naam },
        })}
      />
      <JsonLd data={faqJsonLd(faqItems)} />

      <PageHero
        breadcrumbs={
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Werkgebied", href: "/werkgebied" },
              { name: provincie.naam, href: `/werkgebied/${provincie.slug}` },
            ]}
          />
        }
        eyebrow="Werkgebied"
        title={`Tv laten ophangen in ${provincie.naam}`}
        // `provincie.intro` beschrijft deze provincie en verschilt dus per
        // pagina; een generieke intro zou vier keer hetzelfde zijn.
        lead={provincie.intro}
        image="/images/monteur-aan-het-werk.jpg"
        imageAlt="Monteur van Uw TV Monteur hangt een televisie waterpas aan de wand"
      >
        <HeroActions />
        <HeroFeiten gebied={provincie.naam} />
      </PageHero>

      <Section tone="surface">
        <TrustBar />
      </Section>

      <Section labelledBy="plaatsen">
        <SectionHeading
          id="plaatsen"
          eyebrow={`Plaatsen in ${provincie.naam}`}
          title="Kies uw plaats"
          lead="Elke plaats heeft een eigen pagina: wat de bebouwing daar betekent voor plug en beugel, in welke wijken wij komen en wat het bij u kost."
        />
        {/* Ankertekst volgt de titel van de doelpagina ("Tv ophangen in
            <plaats>"). Hier stond alleen de plaatsnaam, en dan weet Google
            niet waarvoor die plaats staat. De href verandert nooit. */}
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {provincieSteden.map((stad) => (
            <li key={stad.slug}>
              <Link
                href={`/tv-ophangen/${stad.slug}`}
                className="card card-hover group flex h-full items-center justify-between gap-3 p-5"
              >
                <span className="font-display font-bold text-ink-950">
                  Tv ophangen in {stad.naam}
                </span>
                <Icon
                  name="arrow-right"
                  className="size-5 shrink-0 text-accent-700 transition group-hover:translate-x-1"
                />
              </Link>
            </li>
          ))}
        </ul>
        <ProvincieChips prefix="Tv ophangen" withOverview />
      </Section>

      <Section tone="surface" labelledBy="werkwijze">
        <SectionHeading
          id="werkwijze"
          center
          eyebrow="Zo werkt het"
          title="Van aanvraag tot waterpas in drie stappen"
          lead="U vraagt aan, u krijgt het bedrag, wij hangen hem op. Daartussen hoeft u niets uit te zoeken."
        />
        <div className="mt-14">
          <HowItWorks />
        </div>
      </Section>

      <Section labelledBy="prijs">
        <SectionHeading
          id="prijs"
          eyebrow="Wat het kost"
          title={`Wat kost tv ophangen in ${provincie.naam}?`}
          lead={`Overal in ${provincie.naam} hetzelfde: ${PRIJZEN_KORT}, afhankelijk van het formaat van uw tv en inclusief voorrijkosten en btw. Het soort muur verandert dat bedrag niet.`}
        />
        <div className="mt-12">
          <Prijsklassen />
        </div>
        <p className="mt-8">
          <Link href="/prijzen" className="link inline-flex min-h-11 items-center">
            Alle tarieven en wat er altijd bij zit
          </Link>
        </p>
      </Section>

      {/* Brengt zijn eigen surface-sectie mee; de secties ervoor en erna zijn
          daarom wit. */}
      <Reviews title={`Wat klanten in ${provincie.naam} zeggen`} />

      <Section labelledBy="diensten">
        <SectionHeading
          id="diensten"
          eyebrow={`Diensten in ${provincie.naam}`}
          title="Ophangen, aansluiten, instellen — in één bezoek"
          lead="Eén monteur, één afspraak. Of het nu om de tv, de soundbar of de kabels gaat."
        />
        <div className="mt-12">
          <ServiceCards />
        </div>
      </Section>

      <Section tone="surface" labelledBy="faq">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <SectionHeading
            id="faq"
            eyebrow="Veelgestelde vragen"
            title={`Vragen over tv ophangen in ${provincie.naam}`}
            lead={
              <>
                Staat uw vraag er niet bij? Zet hem in het{" "}
                <Link href="#offerte" className="link">
                  offerteformulier
                </Link>{" "}
                — u krijgt er antwoord op bij uw offerte.
              </>
            }
          />
          <Faq items={faqItems} />
        </div>
      </Section>

      <Section id="offerte" labelledBy="offerte-kop">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div>
            <SectionHeading
              id="offerte-kop"
              eyebrow="Offerte aanvragen"
              title={`Vraag uw offerte aan in ${provincie.naam}`}
              lead="Vertel kort wat er moet gebeuren en waar u woont. U krijgt binnen enkele uren het bedrag, vrijblijvend."
            />
            <CheckList items={aanvraagBelofte} className="mt-8" />
          </div>
          {/* `variant` is het meetlabel in GA4, per provincie. Het formulier
              brengt zijn eigen witte kaart mee, dus staat er geen `card` om. */}
          <ContactForm
            variant={`provincie-${provincie.slug}`}
            berichtLabel="Uw tv en uw muur"
            berichtPlaceholder="Bijvoorbeeld: 55 inch Samsung, en de wand is gipsplaat."
          />
        </div>
      </Section>
    </>
  );
}
