import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import JsonLd from "@/components/JsonLd";
import ProvincieChips from "@/components/ProvincieChips";
import Reviews from "@/components/Reviews";
import { Icon, type IconName } from "@/components/Icon";
import {
  Aanvraagsectie,
  Bewijsrij,
  Dienstenlijst,
  Faqsectie,
  Hero,
  HeroKnoppen,
  Kop,
  Prijsklassen,
  Vlak,
  Werkwijze,
} from "@/components/sections";
import { BELOFTE, PRIJZEN_KORT, VANAF_PRIJS, type FaqItem } from "@/lib/content";

/**
 * "Utrecht" is zowel een stad als een provincie, en /tv-ophangen/utrecht en
 * /werkgebied/utrecht-provincie hadden daardoor letterlijk dezelfde titel én
 * dezelfde H1. Google kiest er dan één en laat de andere vallen — uitgerekend
 * op de zoekopdracht met het meeste volume in dit werkgebied. De provincie
 * schrijft het er nu bij; de stadpagina houdt de kale plaatsnaam.
 */
const provincieLabel = (naam: string) =>
  naam === "Utrecht" ? "de provincie Utrecht" : naam;
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
      title: `Tv monteur in ${provincieLabel(provincie.naam)} — vanaf €99`,
      description: `Tv monteur in ${provincieLabel(provincie.naam)}? Ophangen, aansluiten en tv hulp aan huis. Vaste prijs, incl. voorrijkosten en btw.`,
      path: `/werkgebied/${provincie.slug}`,
    }),
    other: { "geo.region": `NL-${provincie.iso}` },
  };
}

/** Wat de aanvraag zelf wel en niet van iemand vraagt. */
const aanvraagBelofte = [
  BELOFTE.vrijblijvend,
  BELOFTE.inclusief,
  BELOFTE.geenAanbetaling,
  BELOFTE.avondWeekend,
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
    <ul className="mt-8 flex flex-col gap-2.5 border-t border-white/15 pt-6 text-ink-200">
      {feiten.map((feit) => (
        <li key={feit.tekst} className="flex items-center gap-2.5">
          <Icon name={feit.icon} className="size-5 shrink-0 text-amber-300" />
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
      a: `${provincie.naam} behoort tot ons kerngebied: vaak kunnen we u al binnen 24 uur helpen, ook 's avonds en in het weekend. Vraag online een afspraak aan, dan laten we u binnen enkele uren de eerstvolgende beschikbaarheid bij u in de buurt weten.`,
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

      <Hero
        kruimels={
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Werkgebied", href: "/werkgebied" },
              { name: provincie.naam, href: `/werkgebied/${provincie.slug}` },
            ]}
          />
        }
        bovenkop="Werkgebied"
        titel={`Tv monteur aan huis in ${provincieLabel(provincie.naam)}`}
        // `provincie.intro` beschrijft deze provincie en verschilt dus per
        // pagina; een generieke intro zou vier keer hetzelfde zijn.
        inleiding={provincie.intro}
        beeld="/images/aan-de-deur.webp"
        beeldAlt="Monteur van Uw TV Monteur wordt begroet aan de voordeur van een Nederlandse rijtjeswoning"
      >
        <HeroKnoppen tweedeHref="#prijs" tweedeLabel="Wat het kost" />
        <HeroFeiten gebied={provincie.naam} />
      </Hero>

      {/* `kopNiveau={2}`: deze sectie heeft geen eigen kop, dus zijn de vier
          kopjes in dit blok de eerste koppen na de h1 van de hero. */}
      <Vlak toon="wit">
        <Bewijsrij kopNiveau={2} />
      </Vlak>

      <Vlak toon="oppervlak" labelledBy="plaatsen">
        <Kop
          id="plaatsen"
          bovenkop={`Plaatsen in ${provincie.naam}`}
        titel="Kies uw plaats"
        tekst="Elke plaats heeft een eigen pagina: wat de bebouwing daar betekent voor plug en beugel, in welke wijken wij komen en wat het bij u kost."
        />
        {/* Ankertekst volgt de titel van de doelpagina ("Tv ophangen in
            <plaats>"). Hier stond alleen de plaatsnaam, en dan weet Google
            niet waarvoor die plaats staat. De href verandert nooit.

            Regels onder een haarlijn in plaats van een raster kaarten: dit is
            één lijst plaatsen, en als lijst is hij op een telefoon in één keer
            te overzien in plaats van in twaalf blokjes. */}
        <ul className="mt-12 grid border-t border-ink-200 sm:grid-cols-2 lg:grid-cols-3">
          {provincieSteden.map((stad) => (
            <li key={stad.slug} className="border-b border-ink-200">
              <Link
                href={`/tv-ophangen/${stad.slug}`}
                className="group flex min-h-14 items-center justify-between gap-3 py-2.5 pr-1 sm:pr-5"
              >
                <span className="font-display font-semibold text-ink-950 group-hover:text-amber-800">
                  Tv ophangen in {stad.naam}
                </span>
                <Icon
                  name="arrow-right"
                  className="size-5 shrink-0 text-ink-400 transition group-hover:translate-x-1 group-hover:text-amber-700"
                />
              </Link>
            </li>
          ))}
        </ul>
        <ProvincieChips prefix="Tv ophangen" withOverview />
      </Vlak>

      <Vlak toon="wit" labelledBy="werkwijze">
        <Kop
          id="werkwijze"
          bovenkop="Zo werkt het"
        titel="Van aanvraag tot werkende tv in drie stappen"
        tekst="U vraagt aan, u krijgt het bedrag, wij hangen hem op. Daartussen hoeft u niets uit te zoeken."
        />
        <div className="mt-14">
          <Werkwijze />
        </div>
      </Vlak>

      <Vlak toon="oppervlak" labelledBy="prijs-kop" id="prijs">
        <Kop
          id="prijs-kop"
          bovenkop="Wat het kost"
        titel={`Wat kost een tv monteur in ${provincieLabel(provincie.naam)}?`}
        tekst={`Overal in ${provincie.naam} hetzelfde: ${PRIJZEN_KORT}, afhankelijk van het formaat van uw tv en inclusief voorrijkosten en btw. Het soort muur verandert dat bedrag niet.`}
        />
        <div className="mt-12">
          <Prijsklassen />
        </div>
        <p className="mt-10">
          <Link
            href="/prijzen"
            className="verwijzing inline-flex min-h-11 items-center"
          >
            Alle tarieven en wat er altijd bij zit
          </Link>
        </p>
      </Vlak>

      {/* Brengt zijn eigen sectie met achtergrond mee. */}
      <Reviews toon="wit" />

      <Vlak toon="oppervlak" labelledBy="diensten">
        <Kop
          id="diensten"
          bovenkop={`Diensten in ${provincie.naam}`}
        titel="Ophangen, aansluiten, instellen — in één bezoek"
        tekst="Eén monteur, één afspraak. Of het nu om de tv, de soundbar of de kabels gaat."
        />
        <div className="mt-12">
          <Dienstenlijst />
        </div>
      </Vlak>

      <Faqsectie
        titel={`Vragen over tv ophangen in ${provincie.naam}`}
        items={faqItems}
      />

      <Aanvraagsectie
        titel={`Vraag een afspraak aan in ${provincie.naam}`}
        tekst="Vertel kort wat er moet gebeuren en waar u woont. Wij bellen u binnen enkele uren om het tarief te bevestigen — u zit nergens aan vast."
        beloftes={aanvraagBelofte}
      >
        {/* `variant` is het meetlabel in GA4, per provincie. Het formulier
            brengt zijn eigen paneel mee, dus staat er geen tweede
            omlijsting om. */}
        <ContactForm
          variant={`provincie-${provincie.slug}`}
          berichtLabel="Uw tv en uw muur"
          berichtPlaceholder="Bijvoorbeeld: 55 inch Samsung, en de wand is gipsplaat."
        />
      </Aanvraagsectie>
    </>
  );
}
