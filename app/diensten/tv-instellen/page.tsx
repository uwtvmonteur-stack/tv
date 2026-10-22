import Link from "next/link";
import Bezwaren from "@/components/Bezwaren";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import Faq from "@/components/Faq";
import IconCardGrid, { type IconCard } from "@/components/IconCardGrid";
import InlineCta from "@/components/InlineCta";
import JsonLd from "@/components/JsonLd";
import PrijsGarantie from "@/components/PrijsGarantie";
import ProvincieChips from "@/components/ProvincieChips";
import RelatedLinks from "@/components/RelatedLinks";
import Reviews from "@/components/Reviews";
import { Icon } from "@/components/Icon";
import {
  CheckList,
  HeroActions,
  PageHero,
  Section,
  SectionHeading,
} from "@/components/sections";
import { reviewsPerDienst, type FaqItem } from "@/lib/content";
import { faqJsonLd, pageMeta, serviceJsonLd } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Tv instellen en hulp aan huis — vaste prijs €60",
  description:
    "Werkt uw tv niet meer, geen zenders of geen wifi-verbinding? Onze monteur verhelpt het bij u thuis en legt het rustig uit. Vaste prijs van €60.",
  path: "/diensten/tv-instellen",
});

/**
 * Het vaste bedrag van deze dienst, gelijk aan de regel "Tv hulp aan huis" in
 * `tarieven`. Eén plek op de pagina, zodat kop, prijsblok en offerteblok niet
 * uit elkaar kunnen lopen.
 */
const PRIJS = "€60";

const hulpItems = [
  "Geen of verkeerde zenders? Opnieuw afstemmen en sorteren",
  "Geen wifi of internet? De verbinding herstellen",
  "Netflix, Viaplay of NPO die niet werkt? Opnieuw instellen en inloggen",
  "Afstandsbediening die niet reageert — of een universele instellen",
  "Slecht of verkeerd beeld en geluid? De juiste instellingen terugzetten",
  "Rustige uitleg, net zo lang tot u het zelf kunt",
];

/** Wat het vaste bedrag dekt — staat naast het bedrag, dus korter dan `hulpItems`. */
const prijsDekking = [
  "Het hele bezoek, hoeveel instellingen er ook langskomen",
  "Zenders, wifi, apps en afstandsbediening op orde",
  "Uitleg aan huis, op uw tempo en zo vaak als u wilt",
  "Voorrijkosten en btw inbegrepen",
];

/** Wat de aanvraag zelf wel en niet van u vraagt — niet wat er in de prijs zit. */
const aanvraagBelofte = [
  `Vaste prijs van ${PRIJS}, inclusief voorrijkosten en btw`,
  "Vrijblijvend: u zit aan niets vast tot u ja zegt",
  "Geen aanbetaling — u betaalt pas na afloop",
  "Ook 's avonds en in het weekend, zonder toeslag",
];

const streaming = [
  "Netflix",
  "Videoland",
  "Viaplay",
  "NPO Start",
  "Disney+",
  "Max",
  "Prime Video",
  "YouTube",
];

const stappen = [
  {
    title: "Offerte aanvragen",
    text: "Vertel kort wat er niet lukt en waar u woont, dan komt de monteur voorbereid en weet u het bedrag vooraf.",
  },
  {
    title: "Monteur komt langs",
    text: "Hij bekijkt uw tv en opstelling en luistert naar wat u wilt of wat er misgaat.",
  },
  {
    title: "Oplossen & instellen",
    text: "Zenders, wifi, apps en de afstandsbediening — alles wordt opgelost en netjes ingesteld.",
  },
  {
    title: "Rustige uitleg",
    text: "We leggen alles stap voor stap uit, in gewone taal en op uw tempo.",
  },
];

const situaties: IconCard[] = [
  {
    icon: <Icon name="tv" className="size-6" />,
    h3: "Ineens geen beeld of geluid",
    text: "Verkeerde bron, een instelling die is omgesprongen of een verbinding die eruit ligt? Wij zoeken uit waar het aan ligt en zetten uw tv weer aan het werk.",
  },
  {
    icon: <Icon name="cable" className="size-6" />,
    h3: "Na een verhuizing of storing",
    text: "Beeld weg, geen zenders of internet? We sluiten alles opnieuw aan, stellen het in en controleren de verbindingen — meestal werkt alles weer voordat wij de deur uit zijn.",
  },
  {
    icon: <Icon name="sliders" className="size-6" />,
    h3: "Eén afstandsbediening voor alles",
    text: "We koppelen en programmeren een universele afstandsbediening, zodat u tv, soundbar en mediaspeler met één bediening aanstuurt.",
  },
  {
    icon: <Icon name="chat" className="size-6" />,
    h3: "Zenders kwijt of door elkaar",
    text: "Ineens andere zenders of alles door elkaar? We zoeken de zenders opnieuw, zetten uw favorieten weer op de juiste plek en leggen uit hoe u het zelf bijhoudt.",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "Repareren jullie ook kapotte tv's?",
    a: "Nee, wij doen geen hardwarereparaties. We helpen met alles rondom de instellingen, zenders, wifi, apps en verbindingen van uw tv. Is het toestel zelf defect (bijvoorbeeld een kapot scherm)? Dan verwijzen we u naar de fabrikant of een reparateur.",
  },
  {
    q: "Wat is het verschil met een tv installatie?",
    a: "Tv hulp is voor een tv die u al heeft en waarbij iets niet (meer) werkt — geen zenders, geen wifi of een app die het niet doet. Heeft u een nieuwe tv die volledig aangesloten en gebruiksklaar gemaakt moet worden? Kies dan onze complete tv installatie.",
  },
  {
    q: "Werken jullie met alle merken en smart-tv's?",
    a: "Ja. Samsung, LG, Sony, Philips en meer — en alle systemen zoals Tizen, webOS, Google TV en Roku. We vinden in elk menu snel de juiste instelling.",
  },
  {
    q: "Moet ik zelf mijn accounts of wachtwoorden klaar hebben?",
    a: "Handig is het als u de inloggegevens van uw streamingdiensten bij de hand houdt. Verder hoeft u niets voor te bereiden — we lopen alles ter plekke rustig met u door.",
  },
  {
    q: "Hoe snel kunnen jullie langskomen?",
    a: "Vaak al binnen 24 uur, uiterlijk binnen 48 uur. Vraag online een afspraak aan, dan laten we u binnen enkele uren weten wat de eerstvolgende mogelijkheid bij u in de buurt is.",
  },
  {
    q: "Kan de afspraak ook 's avonds of in het weekend?",
    a: "Ja, doordeweeks tot 21:00 uur en in het weekend, zonder toeslag. Vraag online een afspraak aan, dan laten we u de eerstvolgende beschikbaarheid weten.",
  },
];

export default function TvInstellenPage() {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: "Tv hulp aan huis",
          description:
            "Tv hulp aan huis bij problemen met een bestaande tv: zenders, wifi, verbinding, apps en instellingen — opgelost en uitgelegd. Geen hardwarereparatie.",
          path: "/diensten/tv-instellen",
          offers: [{ name: "Tv hulp aan huis", price: "60" }],
        })}
      />
      <JsonLd data={faqJsonLd(faqItems)} />

      <PageHero
        breadcrumbs={
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Diensten", href: "/diensten" },
              { name: "Tv instellen & hulp", href: "/diensten/tv-instellen" },
            ]}
          />
        }
        eyebrow={`Tv hulp aan huis · vaste prijs ${PRIJS}`}
        title="Tv hulp aan huis: uw tv snel weer werkend"
        lead="Werkt uw tv niet meer zoals het hoort? Geen zenders, geen wifi of internet, een app die niet opstart of een afstandsbediening die niet reageert? Onze monteur komt bij u thuis, verhelpt het en legt rustig uit hoe u het zelf houdt — in gewone taal, zonder jargon."
        image="/images/dienst-tv-instellen.jpg"
        imageAlt="Ingestelde smart-tv met heldere beeldweergave in de woonkamer"
      >
        <HeroActions tweedeHref="#prijs" tweedeLabel="Wat het kost" />
        <CheckList
          dark
          items={[
            "Alles werkt weer na één bezoek",
            "Zenders, wifi en apps op orde",
            "Uitleg in gewone taal — ook prettig voor senioren",
            `Vaste prijs van ${PRIJS}, incl. voorrijkosten`,
          ]}
          className="mt-8 grid gap-3 sm:grid-cols-2"
        />
      </PageHero>

      <Section labelledBy="hulp">
        <SectionHeading
          id="hulp"
          eyebrow="Waarmee we helpen"
          title="Waarmee we u helpen"
          lead="Moderne tv's kunnen ontzettend veel, en juist daardoor gaat er weleens iets mis: zenders die verdwijnen, geen internet, een app die hapert of een instelling die per ongeluk is veranderd. Wij verhelpen dat soort problemen met de instellingen, software en verbindingen van uw tv — en leggen meteen uit hoe u het zelf houdt. Hardwarereparaties, zoals een kapot scherm, doen we niet."
        />
        <CheckList
          items={hulpItems}
          className="mt-10 grid max-w-4xl gap-3 sm:grid-cols-2"
        />
      </Section>

      {/* Bewijs komt ná de belofte en vóór de prijs: eerst vertellen wat we
          leveren, dan laten zien dat we het leveren, dan wat het kost. */}
      <Reviews
        title="Klanten over onze hulp aan huis"
        items={reviewsPerDienst["tv-instellen"]}
      />

      {/* Brengt zijn eigen witte sectie mee, vlak vóór de prijs. */}
      <Bezwaren />

      <Section id="prijs" tone="surface" labelledBy="prijs-kop">
        <SectionHeading
          id="prijs-kop"
          eyebrow="Wat het kost"
          title="Wat kost tv hulp aan huis?"
          lead="De meeste hulpvragen lost onze monteur op voor één vast bedrag, inclusief voorrijkosten en btw. Vooraf afgesproken, geen verrassingen achteraf."
        />

        {/* Een vast bedrag, en daarom géén `Prijsklassen`: dat blok hoort bij het
            ophangen, waar de prijs uit een offerte komt. Hier is het bedrag
            zelf het argument, dus staat het groot en alleen op de kaart. */}
        <div className="mt-12 grid gap-5 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="relative h-full overflow-hidden rounded-3xl bg-ink-950 p-8 text-white">
              <div className="bg-grid absolute inset-0" aria-hidden="true" />
              <div
                className="absolute -right-16 -top-16 size-64 rounded-full bg-accent-500/25 blur-3xl"
                aria-hidden="true"
              />
              <div className="relative flex h-full flex-col justify-between">
                <div>
                  <p className="eyebrow-dark">Vaste prijs</p>
                  <p className="mt-5 font-display text-stat font-bold tabular">
                    {PRIJS}
                  </p>
                  <p className="mt-3 text-ink-300">
                    Voor het hele bezoek, inclusief voorrijkosten en btw. Geen
                    uurtarief dat oploopt terwijl wij het uitzoeken.
                  </p>
                </div>
                <Link href="#offerte" className="btn-primary btn-lg mt-8 w-full">
                  Offerte aanvragen
                  <Icon name="arrow-right" className="size-5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-h3">Wat er in dat bedrag zit</h3>
            <CheckList items={prijsDekking} className="mt-5" />
            <p className="mt-6 text-ink-600">
              Bekijk alle{" "}
              <Link href="/prijzen" className="link">
                prijzen
              </Link>{" "}
              of zet uw vraag meteen in het{" "}
              <Link href="#offerte" className="link">
                aanvraagformulier
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Geen eigen kop boven dit blok: de drie garanties zijn zelf h3's, en
            een kop ernaast zou op hetzelfde niveau staan als wat hij aankondigt. */}
        <p className="lead mt-16 max-w-3xl">
          Een vaste prijs is pas een argument als erbij staat waar hij tegen
          vast is. Dit zijn de drie dingen die uw bedrag niet veranderen.
        </p>
        <PrijsGarantie className="mt-8" />
      </Section>

      <Section labelledBy="streaming">
        <SectionHeading
          id="streaming"
          eyebrow="Streaming"
          title="Hulp met streaming en apps"
          lead="Doet Netflix, Viaplay of NPO Start het niet, of komt u niet meer ingelogd? We zetten uw streaming-apps weer goed en helpen u met inloggen. Uw wachtwoorden blijven van u — die vullen we alleen samen met u in."
        />
        <ul className="mt-10 flex flex-wrap gap-2.5">
          {streaming.map((dienst) => (
            <li
              key={dienst}
              className="inline-flex min-h-11 items-center rounded-full bg-white px-4 text-sm font-semibold text-ink-800 ring-1 ring-ink-200"
            >
              {dienst}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface" labelledBy="stappen">
        <SectionHeading
          id="stappen"
          eyebrow="Zo werkt het"
          title="Zo werkt tv hulp aan huis"
          lead="Van aanvraag tot werkende tv in vier stappen, en de uitleg hoort erbij."
        />
        {/* Genummerd, want de volgorde is het punt. `HowItWorks` uit de
            sectiebibliotheek beschrijft de stappen van het ophangen; hulp aan
            huis eindigt met uitleggen en niet met opruimen. */}
        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stappen.map((stap, i) => (
            <li key={stap.title} className="card relative p-6 pt-8">
              <span className="absolute -top-4 left-6 grid size-9 place-items-center rounded-full bg-ink-950 font-display font-bold text-white">
                {i + 1}
              </span>
              <h3 className="text-h3">{stap.title}</h3>
              <p className="mt-2 text-ink-600">{stap.text}</p>
            </li>
          ))}
        </ol>
        <InlineCta
          href="#offerte"
          text="Vaste prijs vooraf, en we leggen rustig uit hoe het werkt voordat we weggaan. U krijgt binnen enkele uren bericht over de eerstvolgende mogelijkheid."
        />
      </Section>

      <Section labelledBy="senioren">
        <SectionHeading
          id="senioren"
          eyebrow="Uitleg hoort erbij"
          title="Geduldig en in gewone taal — ook voor senioren"
          lead="Onze monteurs zijn er niet alleen om het óp te lossen, maar ook om het úít te leggen."
        />
        <div className="prose-tv mt-8 max-w-3xl">
          <p>
            Veel van onze klanten zijn senioren die gewoon fijn tv willen kijken
            zonder gedoe. We nemen de tijd, herhalen de stappen zo vaak als
            nodig en laten desgewenst een handig stappenbriefje achter. Zo bent
            u ook na ons bezoek zelfredzaam.
          </p>
          <p>
            Geen ingewikkelde termen, geen haast. U bepaalt het tempo, en we
            gaan pas weg als u zich er zeker bij voelt.
          </p>
        </div>
      </Section>

      <Section tone="surface" labelledBy="situaties">
        <SectionHeading
          id="situaties"
          eyebrow="Uw situatie"
          title="Tv hulp in elke situatie"
          lead="Waar u ook op vastloopt, onze monteur helpt u snel verder."
        />
        <IconCardGrid items={situaties} columns={2} className="mt-12" />
      </Section>

      <Section labelledBy="faq">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <SectionHeading
            id="faq"
            eyebrow="Veelgestelde vragen"
            title="Veelgestelde vragen over tv hulp"
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

      <Section tone="surface" labelledBy="werkgebied">
        <SectionHeading
          id="werkgebied"
          eyebrow="Werkgebied"
          title="Tv hulp aan huis in ons werkgebied"
          lead="Onze monteurs komen aan huis in Zuid-Holland, Noord-Holland, Utrecht en Noord-Brabant. Per provincie vindt u hieronder de plaatsen waar wij rijden."
        />
        {/* Ankertekst volgt de titel van de doelpagina ("Tv ophangen in
            <provincie>"); de href verandert niet. */}
        <ProvincieChips prefix="Tv ophangen in" withOverview />
        <RelatedLinks
          items={[
            ["/diensten/tv-installatie", "Complete tv installatie"],
            ["/tv-ophangen", "Tv ophangen"],
            ["/diensten/soundbar-installatie", "Soundbar installeren"],
            ["/prijzen", "Alle prijzen"],
          ]}
        />
      </Section>

      <Section id="offerte" labelledBy="offerte-kop">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div>
            <SectionHeading
              id="offerte-kop"
              eyebrow="Offerte aanvragen"
              title="Vraag uw offerte aan voor tv-hulp"
              lead={`Vaste prijs van ${PRIJS}, inclusief voorrijkosten en btw. Vertel kort wat er niet lukt, dan weet de monteur vooraf wat hij meeneemt. U krijgt binnen enkele uren bericht.`}
            />
            <CheckList items={aanvraagBelofte} className="mt-8" />
          </div>
          {/* `variant` is het label waarop in GA4 wordt gemeten. Het blijft
              staan zoals het was, anders breekt de reeks van deze pagina. */}
          <ContactForm
            variant="tv-instellen"
            berichtLabel="Wat lukt er niet?"
            berichtPlaceholder="Bijvoorbeeld: na de storing zijn alle zenders weg en Netflix start niet meer."
          />
        </div>
      </Section>
    </>
  );
}
