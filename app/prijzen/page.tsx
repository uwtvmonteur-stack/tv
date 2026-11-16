import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import JsonLd from "@/components/JsonLd";
import Prijstabel from "@/components/Prijstabel";
import Reviews from "@/components/Reviews";
import { Icon } from "@/components/Icon";
import {
  Aanvraagsectie,
  Bewijsrij,
  Faqsectie,
  Hero,
  HeroKnoppen,
  Kop,
  Prijsklassen,
  Vinkjes,
  Vlak,
} from "@/components/sections";
import { BELOFTE, HERO_PRIJZEN, PRIJZEN_KORT, prijsGaranties, tarieven, type FaqItem } from "@/lib/content";
import { faqJsonLd, pageMeta, serviceJsonLd } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Wat kost tv ophangen? Alle tarieven 2026",
  description:
    "Tv ophangen kost €99, €129 of €159, afhankelijk van het formaat. Ook de tarieven voor kabels, soundbar, installatie en tv hulp aan huis (€60).",
  path: "/prijzen",
});

const inbegrepen = [
  "Advies over de beste plek, hoogte en beugelkeuze",
  "Opruimen van al het verpakkings- en boorafval",
  "Volledig verzekerde monteurs aan huis",
  BELOFTE.geenAanbetaling,
];

/** Wat de aanvraag zelf wel en niet van iemand vraagt — niet wat er in de prijs zit. */
const aanvraagBelofte = [
  BELOFTE.vrijblijvend,
  BELOFTE.inclusief,
  BELOFTE.avondWeekend,
];

const faqItems: FaqItem[] = [
  {
    q: "Komen er nog kosten bij?",
    a: "Nee — het tarief dat bij uw tv-formaat hoort is definitief. Alleen als u ter plekke extra werk laat uitvoeren (bijvoorbeeld alsnog de kabels laten wegwerken) komt dat er transparant bij, altijd eerst in overleg.",
  },
  {
    q: "Hoe kan ik betalen?",
    a: "Na afloop betaalt u eenvoudig per pin, Tikkie of betaalverzoek. Zakelijke klanten kunnen op factuur betalen.",
  },
  {
    q: "Ik heb een bijzondere situatie — wat kost dat?",
    a: "De drie montagetarieven gelden voor elk formaat, ook voor een 75 of 85 inch. Alleen bij een tv boven een open haard of kabels volledig in de muur komen we eerst meten voordat we een bedrag noemen. Daarna staat dat bedrag vast, ook als het werk tegenvalt.",
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
          // Afgeleid van dezelfde bron als de tabel op de pagina. Een hard
          // bedrag in een rich result dat afwijkt van wat de bezoeker op de
          // pagina ziet is een reden voor afkeuring — en terecht.
          offers: tarieven.map((tarief) => ({
            name: tarief.naam,
            price: tarief.prijs,
          })),
        })}
      />
      <JsonLd data={faqJsonLd(faqItems)} />

      <Hero
        prijzen={HERO_PRIJZEN}
        kruimels={
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Prijzen", href: "/prijzen" },
            ]}
          />
        }
        bovenkop="Tarieven 2026"
        titel="Wat kost een tv laten ophangen?"
        inleiding={`Tv ophangen kost ${PRIJZEN_KORT}, afhankelijk van het formaat van uw tv en altijd inclusief voorrijkosten en btw. Hieronder staat per dienst wat het kost en wat er altijd bij zit.`}
        beeld="/images/dienst-tv-installatie.webp"
        beeldAlt="Monteur stelt een opgehangen televisie in na de montage"
      >
        <HeroKnoppen />
      </Hero>

      {/* De prijspagina droeg alleen bedragen en kleine letters: geen
          reviewscore, geen verzekerde monteurs, geen enkele klantstem tussen
          het bedrag en het formulier. Een bedrag zonder bewijs leest als een
          bedrag van een onbekende. */}
      {/* `kopNiveau={2}`: deze sectie heeft geen eigen kop, dus zijn de vier
          kopjes in dit blok de eerste koppen na de h1 van de hero. */}
      <Vlak toon="wit">
        <Bewijsrij kopNiveau={2} />
      </Vlak>

      <Vlak toon="oppervlak" labelledBy="vanafprijs">
        <Kop
          id="vanafprijs"
          bovenkop="Wat het kost"
        titel={`Tv ophangen: ${PRIJZEN_KORT}`}
        tekst="Drie formaten, drie bedragen. Het tarief dat bij uw tv hoort is wat u betaalt — ongeacht het soort muur, en zonder avond- of weekendtoeslag."
        />
        <div className="mt-12">
          <Prijsklassen />
        </div>
      </Vlak>

      <Vlak toon="wit" id="tarieven" labelledBy="tarieven-kop">
        <Kop
          id="tarieven-kop"
          bovenkop="Alle tarieven"
        titel="Wat elke dienst kost"
        tekst="Het ophangen zelf staat hierboven, per tv-formaat. Dit zijn de losse diensten en wat er bij een montage bij kan komen — met de bedragen erbij."
        />
        <div className="mt-10">
          {/* De bedragen staan alleen in de tabel en nergens in de lopende
              tekst: anders staan er twee bronnen voor één prijs en gaan ze op
              het eerste tariefwijzigingsmoment uit elkaar lopen. */}
          <Prijstabel />
        </div>
        <p className="mt-7 max-w-3xl text-ink-600">
          Niet inbegrepen is de tv-beugel zelf. Heeft u er al een, dan monteren
          wij die — ook als u hem ergens anders kocht. Heeft u er geen, dan
          zoeken wij er een die bij uw tv en wand past en hoort u het bedrag vóór
          de afspraak, zodat u dan pas beslist.
        </p>

        <h3 className="mt-14 text-h3">Altijd inbegrepen</h3>
        <Vinkjes
          items={inbegrepen}
          className="mt-6 grid max-w-4xl gap-3.5 sm:grid-cols-2"
        />
      </Vlak>

      {/* Donker, omdat dit het antwoord is op de vraag die de tabel oproept:
          waar is die prijs tegen vast? Elke concurrent rekent juist op deze
          drie punten een toeslag. */}
      {/* Geen `korrel relative` meer op dit vlak: `toon="donker"` zet het
          raster zelf al als laag erbinnen, dus werd het hier twee keer over
          elkaar getekend — merkbaar sterker dan op de homepage. */}
      <Vlak toon="donker" labelledBy="garanties">
        <Kop
          donker
          id="garanties"
          bovenkop="Waar uw prijs tegen vast is"
        titel="Wat uw bedrag niet verandert"
        tekst="Een vaste prijs is pas een argument als erbij staat waar hij tegen vast is. Dit zijn de drie dingen die het bedrag uit uw aanvraag niet raken."
        />
        <ul className="mt-12 grid gap-x-10 gap-y-9 lg:grid-cols-3">
          {prijsGaranties.map((garantie) => (
            <li
              key={garantie.kop}
              className="komt-op border-t border-white/20 pt-5"
            >
              <Icon name={garantie.icon} className="size-6 text-amber-300" />
              <h3 className="mt-4 text-h4 text-white">{garantie.kop}</h3>
              <p className="mt-2 text-ink-300">{garantie.tekst}</p>
            </li>
          ))}
        </ul>
      </Vlak>

      <Faqsectie
        titel="Vragen over de prijs"
        items={faqItems}
        inleiding="Over wat er bij komt, hoe u betaalt en wat een bijzondere situatie kost."
      />

      <Reviews toon="oppervlak" />

      {/* Het formulier staat op deze pagina zelf. Deze pagina houdt bezoekers
          het langst vast van de hele site en leverde nul aanvragen op, simpelweg
          omdat er niets te versturen viel. */}
      <Aanvraagsectie
        toon="wit"
        titel="Weten wat het bij u wordt?"
        tekst="Vertel kort wat er moet gebeuren en waar u woont. Wij bellen u binnen enkele uren om het tarief te bevestigen."
        beloftes={aanvraagBelofte}
      >
        <ContactForm
          variant="prijzen"
          berichtLabel="Uw tv en uw muur"
          berichtPlaceholder="Bijvoorbeeld: 55 inch Samsung, bakstenen muur, ik heb nog geen beugel."
        />
      </Aanvraagsectie>
    </>
  );
}
