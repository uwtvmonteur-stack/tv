import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import ProvincieChips from "@/components/ProvincieChips";
import RelatedLinks from "@/components/RelatedLinks";
import Reviews from "@/components/Reviews";
import { DienstIcon, Icon, type IconName } from "@/components/Icon";
import {
  CheckList,
  HeroActions,
  HowItWorks,
  PageHero,
  Prijsklassen,
  Section,
  SectionHeading,
  TrustBar,
} from "@/components/sections";
import {
  PRIJZEN_KORT,
  diensten,
  dienstHref,
  prijsklassen,
  reviews,
  reviewsPerDienst,
  type FaqItem,
  type Review,
} from "@/lib/content";
import { provincieBySlug, stadBySlug, steden } from "@/lib/steden";
import { lokaalTekst } from "@/lib/stedenLokaal";
import { stedenMontage } from "@/lib/stedenMontage";
import { faqJsonLd, pageMeta, serviceJsonLd } from "@/lib/seo";

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
      // "Tv Monteur {stad}" stond hier, en dat is in het Nederlands vooral
      // een reparatiezoekopdracht: wie dat intypt heeft een kapot scherm. De
      // commerciële zoekopdracht van iemand met een lege muur is "tv ophangen
      // {stad}" of "tv laten ophangen {stad}". Ook de hoofdletters zijn eruit:
      // Engelse Title Case leest in een Nederlandse zoekresultatenlijst als
      // machinaal gemaakt en kost doorklikken.
      title: `Tv ophangen in ${stad.naam} — vaste prijs vanaf €99`,
      description: `Tv laten ophangen in ${stad.naam}? Beugel monteren, tv waterpas ophangen, apparatuur aansluiten en kabels wegwerken. Vaste prijs per formaat: €99, €129 of €159, inclusief voorrijkosten en btw. Ook 's avonds en in het weekend zonder toeslag.`,
      path: `/tv-ophangen/${stad.slug}`,
    }),
    other: {
      "geo.region": `NL-${provincie?.iso ?? ""}`,
      "geo.placename": stad.naam,
      "geo.position": `${stad.lat};${stad.lng}`,
      ICBM: `${stad.lat}, ${stad.lng}`,
    },
  };
}

/** Wat de aanvraag zelf wel en niet van iemand vraagt. */
const offerteBelofte = [
  "Vrijblijvend: u zit aan niets vast tot u ja zegt",
  "Het bedrag is inclusief voorrijkosten en btw",
  "Geen aanbetaling — u betaalt pas na afloop",
  "Ook 's avonds en in het weekend, zonder toeslag",
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

/**
 * De bewijsregel onder de heroknop, met de plaatsnaam erin.
 *
 * Bewust alleen afspraken die wij in het hele werkgebied nakomen — geen
 * reistijd, geen "monteur om de hoek" en geen wijkclaim. Zulke regels zijn
 * niet te onderbouwen, en ze lezen op 32 pagina's als hetzelfde sjabloon met
 * een andere plaatsnaam erin. Het telefoonnummer staat hier niet: de
 * offerteaanvraag is de enige handeling op dit scherm.
 */
function HeroFeiten({ plaats }: { plaats: string }) {
  const feiten: { icon: IconName; tekst: string }[] = [
    { icon: "clock", tekst: `Vaak binnen 24 uur een monteur in ${plaats}` },
    {
      icon: "euro",
      tekst: `Voorrijkosten in ${plaats} zitten in de prijs`,
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

  // De twee teksten die alleen op déze stadpagina staan. Beide dekken alle 32
  // steden; de `&&` hieronder is er voor een stad die later wordt toegevoegd
  // voordat zijn tekst geschreven is.
  const buurtTekst = lokaalTekst[stad.slug];
  const wandTekst = stedenMontage[stad.slug];

  // Varieer de vraagformulering per stad (op volgnummer), zodat de FAQ's niet
  // op alle 32 stadpagina's woordelijk identiek zijn (dunne-content-preventie).
  const qv = stadIndex % 3;
  // Een tweede volgnummer, op 2 in plaats van 3: samen met `qv` levert dat
  // zes verschillende vraagcombinaties over de 32 steden in plaats van drie,
  // en krijgen twee buursteden met hetzelfde restgetal toch een andere FAQ.
  const qv2 = stadIndex % 2;
  // Drie wijken verspreid over de lijst in plaats van de eerste drie: zo noemt
  // het antwoord per stad andere namen dan de wijkenlijst hierboven opent.
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
      // De drie bedragen voluit en niet "zie hierboven": dit antwoord gaat
      // ook naar het FAQPage-schema, en daar staat geen pagina omheen.
      a: `${PRIJZEN_KORT}, afhankelijk van het formaat van uw tv — €99 tot 43 inch, €129 van 44 t/m 64 inch en €159 vanaf 65 inch, altijd inclusief voorrijkosten en btw. Voor ${stad.naam} rekenen we geen voorrijtoeslag, in welke wijk u ook woont, en het soort muur verandert het tarief niet. Kabels wegwerken kan vanaf €39 extra.`,
    },
    {
      q: [
        `In welke wijken van ${stad.naam} komen wij?`,
        `Komen jullie in alle wijken van ${stad.naam}?`,
        `Werken jullie door heel ${stad.naam}?`,
      ][qv],
      a: `Ja. We komen onder meer in ${opsomming(wijkSelectie)}, en net zo goed in de rest van ${stad.naam}. Staat uw wijk er niet bij? Dan helpen we u vrijwel altijd alsnog, net als in de omliggende plaatsen en de rest van ${provincie.naam}.`,
    },
    {
      q: [
        `Hangen jullie ook een tv op aan een gipswand in ${stad.naam}?`,
        `Kan een tv in ${stad.naam} ook aan een gipswand of voorzetwand?`,
      ][qv2],
      a: `Ja, daar worden we juist vaak voor gebeld. Veel woningen hebben tegenwoordig een voorzetwand of gipsplaat in plaats van massief metselwerk, en daar houdt een gewone plug een tv niet. Onze monteur stelt in ${stad.naam} ter plekke het wandtype vast, zoekt de staanders op en rekent het draagvermogen na voordat er geboord wordt.`,
    },
  ];

  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: `Tv monteur ${stad.naam}`,
          description: `Tv ophangen, kabels wegwerken en complete tv installatie aan huis in ${stad.naam} en omgeving.`,
          path: `/tv-ophangen/${stad.slug}`,
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
          // De drie tarieven per schermformaat, uit dezelfde bron als de
          // kaarten op de pagina. Harde `price`-bedragen mogen hier omdat ze
          // vaststaan: wat een bezoeker in een rich result ziet is wat er op
          // de pagina staat en wat hij betaalt.
          offers: prijsklassen.map((klasse) => ({
            name: `Tv ophangen, ${klasse.maat.replace(/^Voor tv's /, "")}`,
            price: klasse.prijs,
          })),
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
              { name: stad.naam, href: `/tv-ophangen/${stad.slug}` },
            ]}
          />
        }
        eyebrow={`Tv ophangen in ${provincie.naam}`}
        title={`Tv laten ophangen in ${stad.naam}`}
        // Bewust `stad.blurb` als intro: die tekst gaat over de bouwstijlen en
        // woningtypes van déze stad en verschilt dus per pagina. De generieke
        // intro die hier stond was op alle 32 stadpagina's woordelijk gelijk,
        // waardoor Google ze als bijna-duplicaten uit de resultaten filterde.
        lead={stad.blurb}
        image="/images/monteur-aan-het-werk.jpg"
        // Geen plaatsnaam in de alt-tekst: het is op alle 32 pagina's dezelfde
        // foto, en dan is "aan het werk in Helmond" eenendertig keer onwaar.
        imageAlt="Monteur van Uw TV Monteur hangt een televisie waterpas aan de wand"
      >
        <HeroActions />
        <HeroFeiten plaats={stad.naam} />
      </PageHero>

      <Section tone="surface">
        <TrustBar />
      </Section>

      <Section labelledBy="buurt">
        <SectionHeading
          id="buurt"
          eyebrow={`Werkgebied ${stad.naam}`}
          title={`In welke wijken van ${stad.naam} komen wij?`}
          lead={buurtTekst}
        />
        {/* De wijknamen komen uit `lib/steden.ts` en worden hier niet
            aangevuld: een verzonnen buurt is op een lokale pagina precies het
            detail waaraan een bezoeker ziet dat het een sjabloon is. */}
        <ul className="mt-8 flex flex-wrap gap-2.5">
          {stad.wijken.map((wijk) => (
            <li
              key={wijk}
              className="inline-flex items-center rounded-full bg-surface px-4 py-2 text-sm font-medium text-ink-700 ring-1 ring-ink-200"
            >
              {wijk}
            </li>
          ))}
        </ul>
      </Section>

      {/* De bouwperiodes die in deze stad overheersen, en wat die betekenen
          voor plug, beugel en haalbare plek. Dit is het enige onderwerp dat
          per stad werkelijk verschilt: de rest van de pagina is noodzakelijk
          sjabloon. Search Console liet zien dat 19 van de 32 stadpagina's wel
          waren gevonden maar nooit opgehaald, en het verschil tussen twee
          willekeurige stadpagina's was 31% letterlijk gelijke zinnen. Deze
          sectie verdubbelt het deel van de pagina dat alleen hier staat, en is
          tegelijk het antwoord dat een bezoeker echt zoekt. */}
      <Section tone="surface" labelledBy="wand">
        <SectionHeading
          id="wand"
          eyebrow="Uw wand"
          title={`Welke muur heeft u in ${stad.naam}?`}
        />
        <div className="mt-6 max-w-3xl space-y-4 text-lg text-ink-700">
          {wandTekst && <p>{wandTekst}</p>}
          <p>
            Weet u niet zeker wat voor wand u heeft? Dat hoeft ook niet — onze
            monteur bepaalt het ter plekke en neemt de pluggen voor elk
            wandtype mee. De prijs verandert er niet door.
          </p>
        </div>
      </Section>

      <Section labelledBy="werkwijze">
        <SectionHeading
          id="werkwijze"
          center
          eyebrow="Zo werkt het"
          title={`Van aanvraag tot waterpas in ${stad.naam}`}
          lead="U vraagt aan, u krijgt het bedrag, wij hangen hem op. Daartussen hoeft u niets uit te zoeken."
        />
        <div className="mt-14">
          <HowItWorks />
        </div>
      </Section>

      <Section tone="surface" labelledBy="prijs">
        <SectionHeading
          id="prijs"
          eyebrow="Wat het kost"
          title={`Wat kost tv ophangen in ${stad.naam}?`}
          lead={`${PRIJZEN_KORT}, afhankelijk van het formaat van uw tv — inclusief voorrijkosten in ${stad.naam} en btw. Het soort muur verandert dat bedrag niet, in welke wijk u ook woont.`}
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

      {/* Alleen de links naar de dienstpagina's, zonder hun beschrijvingen:
          die teksten zijn op alle 32 stadpagina's woordelijk gelijk, en juist
          díe tekst gebruikte Google als samenvatting in plaats van de lokale
          alinea's hierboven. De ankertekst is de naam van de doelpagina en
          niet "<dienst> in <stad>": die pagina's gaan over de dienst en niet
          over deze plaats. */}
      <Section labelledBy="diensten">
        <SectionHeading
          id="diensten"
          eyebrow={`Diensten in ${stad.naam}`}
          title="Ophangen, aansluiten, instellen — in één bezoek"
          lead="Eén monteur, één afspraak. Of het nu om de tv, de soundbar of de kabels gaat."
        />
        <ul className="mt-8 flex flex-wrap gap-3">
          {diensten.map((dienst) => (
            <li key={dienst.slug}>
              <Link
                href={dienstHref(dienst)}
                className="inline-flex min-h-11 items-center gap-2.5 rounded-full bg-white px-4 text-sm font-semibold text-ink-800 ring-1 ring-ink-200 transition duration-200 hover:bg-accent-50 hover:text-accent-800 hover:ring-accent-200"
              >
                <DienstIcon slug={dienst.slug} className="size-4" />
                {dienst.naam}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* Brengt zijn eigen surface-sectie mee; de secties ervoor en erna zijn
          daarom wit. */}
      <Reviews
        title={`Wat klanten in ${provincie.naam} zeggen`}
        items={stadReviews}
      />

      <Section labelledBy="faq">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <SectionHeading
            id="faq"
            eyebrow="Veelgestelde vragen"
            title={`Vragen over tv ophangen in ${stad.naam}`}
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
        {/* Elke stadpagina draagt een FAQ over gipswanden en noemt het
            wegwerken van kabels, zonder ooit naar die pagina's te linken. Dat
            zijn 32 contextuele links die bleven liggen, precies op de
            onderwerpen waar wij het antwoord op hebben. */}
        <RelatedLinks
          items={[
            ["/tv-ophangen", "Tv laten ophangen"],
            ["/tv-ophangen-gipswand", "Tv ophangen aan een gipswand"],
            ["/kabels-wegwerken", "Tv-kabels wegwerken"],
            ["/tv-boven-open-haard", "Tv ophangen boven een open haard"],
            ["/prijzen", "Alle tarieven"],
          ]}
        />
      </Section>

      <Section tone="surface" labelledBy="nabij">
        <SectionHeading
          id="nabij"
          eyebrow="In de buurt"
          title={`Ook actief rond ${stad.naam}`}
          lead={`Onze monteurs rijden dagelijks tussen ${stad.naam} en ${opsomming(
            nabijeSteden.map((s) => s.naam),
          )}. Woont u net over de gemeentegrens, dan komen wij er net zo goed.`}
        />
        {/* Ankertekst volgt de titel van de doelpagina ("Tv ophangen in
            <stad>") en niet "tv monteur <stad>": dat laatste is in het
            Nederlands de reparatieterm. De href verandert nooit. */}
        <ul className="mt-8 flex flex-wrap gap-3">
          {nabijeSteden.map((nabijStad) => (
            <li key={nabijStad.slug}>
              <Link
                href={`/tv-ophangen/${nabijStad.slug}`}
                className="inline-flex min-h-11 items-center rounded-full bg-white px-4 text-sm font-semibold text-ink-800 ring-1 ring-ink-200 transition duration-200 hover:bg-accent-50 hover:text-accent-800 hover:ring-accent-200"
              >
                Tv ophangen in {nabijStad.naam}
              </Link>
            </li>
          ))}
        </ul>
        {/* De provincie van deze stad zit hier zelf ook in. Eén rij met één
            ankertekst per provinciepagina is beter dan een losse "Heel
            <provincie>"-link ernaast: twee links naar dezelfde pagina in één
            sectie verdelen de waarde over twee ankerteksten. */}
        <ProvincieChips prefix="Tv ophangen" withOverview />
      </Section>

      {/* Het formulier staat op de pagina zelf en niet achter een knop naar
          /contact: dat was een paginawissel op het moment dat iemand besloten
          heeft, en dat is de stap waar verkeer het makkelijkst verdwijnt. */}
      <Section id="offerte" labelledBy="offerte-kop">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div>
            <SectionHeading
              id="offerte-kop"
              eyebrow="Offerte aanvragen"
              title={`Vraag uw offerte aan in ${stad.naam}`}
              lead={`Vertel kort wat er moet gebeuren en waar u woont. U krijgt binnen enkele uren het bedrag, vrijblijvend — ook in ${stad.naam}.`}
            />
            <CheckList items={offerteBelofte} className="mt-8" />
          </div>
          {/* `variant` is het meetlabel in GA4, per stad: zo blijft zichtbaar
              welke stadpagina's aanvragen opleveren. Het formulier brengt zijn
              eigen witte kaart mee, dus staat er geen `card` om. */}
          <ContactForm
            variant={`stad-${stad.slug}`}
            berichtLabel="Uw tv en uw muur"
            berichtPlaceholder="Bijvoorbeeld: 55 inch Samsung, en de wand is gipsplaat."
          />
        </div>
      </Section>
    </>
  );
}
