import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import Prijstabel from "@/components/Prijstabel";
import { Icon } from "@/components/Icon";
import {
  CheckList,
  HeroActions,
  PageHero,
  Prijsklassen,
  Section,
  SectionHeading,
} from "@/components/sections";
import { PRIJZEN_KORT, prijsGaranties, tarieven, type FaqItem } from "@/lib/content";
import { faqJsonLd, pageMeta, serviceJsonLd } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Wat kost een tv laten ophangen? Prijzen 2026",
  description:
    "Tv ophangen kost €99, €129 of €159, afhankelijk van het formaat van uw tv — altijd inclusief voorrijkosten en btw. Ook de tarieven voor kabels wegwerken, soundbar aansluiten, tv installeren en tv hulp aan huis.",
  path: "/prijzen",
});

const inbegrepen = [
  "Advies over de beste plek, hoogte en beugelkeuze",
  "Opruimen van al het verpakkings- en boorafval",
  "Volledig verzekerde monteurs aan huis",
  "Geen aanbetaling — u betaalt pas na afloop",
];

/** Wat de aanvraag zelf wel en niet van iemand vraagt — niet wat er in de prijs zit. */
const aanvraagBelofte = [
  "Vrijblijvend: u zit aan niets vast tot u ja zegt",
  "Het bedrag is inclusief voorrijkosten en btw",
  "Ook 's avonds en in het weekend, zonder toeslag",
];

const faqItems: FaqItem[] = [
  {
    q: "Zijn er ooit extra kosten bovenop de offerte?",
    a: "Nee — het bedrag uit uw offerte is definitief. Alleen als u ter plekke extra werk laat uitvoeren (bijvoorbeeld alsnog de kabels laten wegwerken) komt dat er transparant bij, altijd eerst in overleg.",
  },
  {
    q: "Hoe kan ik betalen?",
    a: "Na afloop betaalt u eenvoudig per pin, Tikkie of betaalverzoek. Zakelijke klanten kunnen op factuur betalen.",
  },
  {
    q: "Ik heb een bijzondere situatie — wat kost dat?",
    a: "Elke klus krijgt een offerte op maat, dus ook een bijzondere situatie. Bij een tv boven een open haard, extra grote schermen of kabels volledig in de muur komen we eerst kijken of meten voordat we een bedrag noemen. Daarna staat dat bedrag vast, ook als het werk tegenvalt.",
  },
];

export default function PrijzenPage() {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: "Tv montage en installatie",
          description:
            "Tv ophangen en installeren vanaf €99, inclusief voorrijkosten en btw. Een vaste prijs per tv-formaat.",
          path: "/prijzen",
          // Bewust alleen vanafbedragen, afgeleid van dezelfde bron als de
          // tabel op de pagina. Een hard bedrag in een rich result dat
          // afwijkt van de offerte is een reden voor afkeuring - en terecht.
          offers: tarieven.map((tarief) => ({
            name: tarief.naam,
            price: tarief.prijs,
          })),
        })}
      />
      <JsonLd data={faqJsonLd(faqItems)} />

      <PageHero
        breadcrumbs={
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Prijzen", href: "/prijzen" },
            ]}
          />
        }
        eyebrow="Tarieven 2026"
        title="Wat kost een tv laten ophangen?"
        lead={`Tv ophangen kost ${PRIJZEN_KORT}, afhankelijk van het formaat van uw tv en altijd inclusief voorrijkosten en btw. Hieronder staat per dienst wat het kost en wat er altijd bij zit.`}
      >
        <HeroActions tweedeHref="#tarieven" tweedeLabel="Alle tarieven" />
      </PageHero>

      <Section tone="surface" labelledBy="vanafprijs">
        <SectionHeading
          id="vanafprijs"
          eyebrow="Wat het kost"
          title={`Tv ophangen: ${PRIJZEN_KORT}`}
          lead="Drie formaten, drie bedragen. Het tarief dat bij uw tv hoort is wat u betaalt — ongeacht het soort muur, en zonder avond- of weekendtoeslag."
        />
        <div className="mt-12">
          <Prijsklassen />
        </div>
      </Section>

      <Section id="tarieven" labelledBy="tarieven-kop">
        <SectionHeading
          id="tarieven-kop"
          eyebrow="Alle tarieven"
          title="Wat elke dienst kost"
          lead="Het ophangen zelf staat hierboven, per tv-formaat. Dit zijn de losse diensten en wat er bij een montage bij kan komen — met de bedragen erbij."
        />
        <div className="mt-10">
          {/* De bedragen staan alleen in de tabel en nergens in de lopende
              tekst: anders staan er twee bronnen voor één prijs en gaan ze op
              het eerste tariefwijzigingsmoment uit elkaar lopen. */}
          <Prijstabel />
        </div>
        <p className="mt-6 max-w-3xl text-ink-600">
          Niet inbegrepen is de tv-beugel zelf. Heeft u er al een, dan monteren
          wij die — ook als u hem ergens anders kocht. Heeft u er geen, dan
          zoeken wij er een die bij uw tv en wand past en hoort u het bedrag vóór
          de afspraak, zodat u dan pas beslist.
        </p>

        <h3 className="mt-14 text-h3">Altijd inbegrepen</h3>
        <CheckList
          items={inbegrepen}
          className="mt-6 grid max-w-4xl gap-3 sm:grid-cols-2"
        />
      </Section>

      {/* Donker, omdat dit het antwoord is op de vraag die de tabel oproept:
          waar is die prijs tegen vast? Elke concurrent rekent juist op deze
          drie punten een toeslag. */}
      <Section tone="dark" labelledBy="garanties">
        <SectionHeading
          dark
          id="garanties"
          eyebrow="Waar uw prijs tegen vast is"
          title="Wat uw bedrag niet verandert"
          lead="Een vaste prijs is pas een argument als erbij staat waar hij tegen vast is. Dit zijn de drie dingen die het bedrag uit uw offerte niet raken."
        />
        <ul className="mt-12 grid gap-4 lg:grid-cols-3">
          {prijsGaranties.map((garantie) => (
            <li
              key={garantie.kop}
              className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10"
            >
              <span className="grid size-12 place-items-center rounded-xl bg-accent-400/15 text-accent-300">
                <Icon name={garantie.icon} className="size-6" />
              </span>
              <h3 className="mt-5 text-h3 text-white">{garantie.kop}</h3>
              <p className="mt-2 text-ink-300">{garantie.tekst}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="faq">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <SectionHeading
            id="faq"
            eyebrow="Veelgestelde vragen"
            title="Vragen over de prijs"
            lead="Over wat er bij komt, hoe u betaalt en wat een bijzondere situatie kost."
          />
          <Faq items={faqItems} />
        </div>
      </Section>

      {/* Het formulier staat op deze pagina zelf. Deze pagina houdt bezoekers
          het langst vast van de hele site en leverde nul aanvragen op, simpelweg
          omdat er niets te versturen viel. */}
      <Section id="offerte" tone="surface" labelledBy="offerte-kop">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div>
            <SectionHeading
              id="offerte-kop"
              eyebrow="Offerte aanvragen"
              title="Weten wat het bij u wordt?"
              lead="Vertel kort wat er moet gebeuren en waar u woont. U krijgt binnen enkele uren een vrijblijvende offerte met het bedrag erbij."
            />
            <CheckList items={aanvraagBelofte} className="mt-8" />
          </div>
          <ContactForm
            variant="prijzen"
            berichtLabel="Uw tv en uw muur"
            berichtPlaceholder="Bijvoorbeeld: 55 inch Samsung, bakstenen muur, ik heb nog geen beugel."
          />
        </div>
      </Section>
    </>
  );
}
