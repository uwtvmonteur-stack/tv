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
  title: "Soundbar laten installeren aan huis — €49",
  description:
    "Soundbar laten installeren? Wij monteren, sluiten aan en stellen het geluid af op uw kamer — ook surround en home-cinema. Vanaf €49.",
  path: "/diensten/soundbar-installatie",
});

/**
 * De twee vaste bedragen van deze dienst, gelijk aan de regels "Soundbar
 * aansluiten en afstellen" en "Surround- of home-cinema-set aansluiten" in
 * `tarieven`. Eén plek op de pagina, zodat kop, prijsblok en offerteblok niet
 * uit elkaar kunnen lopen.
 */
const PRIJS = "€49";
const SURROUND = "€79";

const audioItems = [
  "Soundbar of speakerset vakkundig monteren",
  "Draadloze subwoofer en achterspeakers koppelen",
  "Verbinden via HDMI ARC of eARC",
  "Surround- en home-cinema-sets volledig aansluiten",
  "Geluid testen en fijn afstellen",
  "Eén afstandsbediening voor tv én audio",
];

/** Wat het vaste bedrag voor een losse soundbar dekt — staat naast het bedrag. */
const prijsDekking = [
  "Soundbar gemonteerd en uitgelijnd onder uw tv",
  "Aangesloten via HDMI ARC of eARC",
  "Kabels netjes weggewerkt",
  "Geluid afgesteld op uw kamer, voorrijkosten en btw inbegrepen",
];

/** Wat de aanvraag zelf wel en niet van u vraagt — niet wat er in de prijs zit. */
const aanvraagBelofte = [
  `Soundbar aansluiten en afstellen: vaste prijs ${PRIJS}`,
  `Surround- of home-cinema-set: vanaf ${SURROUND}`,
  "Vrijblijvend: u zit aan niets vast tot u ja zegt",
  "Ook 's avonds en in het weekend, zonder toeslag",
];

const stappen = [
  {
    title: "Offerte aanvragen",
    text: "Geef door welke soundbar of set u heeft en waar u woont, dan komt de monteur voorbereid en weet u het bedrag vooraf.",
  },
  {
    title: "Monteur komt langs",
    text: "Met het juiste montage- en aansluitmateriaal voor uw soundbar, subwoofer of surround-set.",
  },
  {
    title: "Monteren & aansluiten",
    text: "We monteren de soundbar, koppelen de speakers en sluiten aan via HDMI ARC of eARC.",
  },
  {
    title: "Afstellen & testen",
    text: "We stellen het geluid af op uw kamer en testen met beeld en muziek, zodat alles direct perfect klinkt.",
  },
];

const keuze: IconCard[] = [
  {
    icon: <Icon name="speaker" className="size-6" />,
    h3: "Losse soundbar",
    text: "De eenvoudigste upgrade: één balk onder de tv voor voller, helderder geluid. Ideaal als u vooral series en films kijkt en het strak wilt houden.",
  },
  {
    icon: <Icon name="sliders" className="size-6" />,
    h3: "Soundbar met surround",
    text: "Een soundbar met draadloze subwoofer en achterspeakers voor echt ruimtelijk geluid. Wij plaatsen en koppelen alles en stellen het surround-beeld af op uw kamer.",
  },
  {
    icon: <Icon name="tv" className="size-6" />,
    h3: "Complete home-cinema",
    text: "Een volledige set met versterker en meerdere speakers voor bioscoopgeluid thuis. We verzorgen de bekabeling, de aansluiting en de fijnafstemming — op maat.",
  },
];

const situaties: IconCard[] = [
  {
    icon: <Icon name="speaker" className="size-6" />,
    h3: "Nieuwe soundbar gekocht",
    text: "Net een soundbar of set in huis? Wij monteren, sluiten aan en stellen af — u hoort meteen het verschil zonder zelf te hoeven uitzoeken welke kabel waar hoort.",
  },
  {
    icon: <Icon name="tv" className="size-6" />,
    h3: "Samen met tv ophangen",
    text: "De meest gekozen combinatie: eerst de tv, direct daarna de soundbar. Eén bezoek, geen extra voorrijkosten, en de kabels van beide netjes weggewerkt.",
  },
  {
    icon: <Icon name="cable" className="size-6" />,
    h3: "Bestaande set opnieuw aansluiten",
    text: "Verhuisd of alles in de war na een nieuwe tv? We sluiten uw bestaande soundbar of surround-set weer correct aan en stellen het geluid opnieuw af.",
  },
  {
    icon: <Icon name="chat" className="size-6" />,
    h3: "Advies over de beste set",
    text: "Nog geen soundbar? De monteur denkt mee over wat past bij uw kamer, tv en budget — eerlijk advies, zonder u iets aan te praten.",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "Werkt een soundbar met elke tv?",
    a: "Vrijwel altijd, ongeacht het merk of de leeftijd van uw televisie. Twijfelt u of uw tv geschikt is? Zet het merk en type in uw aanvraag, dan kijken we het voor u na.",
  },
  {
    q: "Stellen jullie ook Dolby Atmos in?",
    a: "Zeker. Bij sets met Dolby Atmos of ander surround-geluid koppelen we de subwoofer en achterspeakers en stellen we het geluid optimaal af op de indeling van uw kamer.",
  },
  {
    q: "Hoe lang duurt een soundbar-installatie?",
    a: "Een losse soundbar is er meestal binnen 30 tot 45 minuten. Voor een surround-set of complete home-cinema, inclusief het wegwerken van de kabels, trekken we ruimer de tijd uit.",
  },
  {
    q: "Kan de installatie ook 's avonds of in het weekend?",
    a: "Ja, doordeweeks tot 21:00 uur en in het weekend, zonder toeslag. Vraag online een afspraak aan, dan laten we u de eerstvolgende beschikbaarheid weten.",
  },
];

export default function SoundbarPage() {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: "Soundbar installeren",
          description:
            "Soundbar, surround-set of home-cinema installeren en perfect afstellen aan huis.",
          path: "/diensten/soundbar-installatie",
          offers: [
            { name: "Soundbar installeren", price: "49" },
            { name: "Surround-set aansluiten", price: "79" },
          ],
        })}
      />
      <JsonLd data={faqJsonLd(faqItems)} />

      <PageHero
        breadcrumbs={
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Diensten", href: "/diensten" },
              {
                name: "Soundbar installeren",
                href: "/diensten/soundbar-installatie",
              },
            ]}
          />
        }
        eyebrow={`Soundbar installeren · aan huis · vaste prijs ${PRIJS}`}
        title="Soundbar en audio installeren"
        lead="Goed beeld verdient goed geluid. Wij sluiten uw soundbar, surround-set of complete home-cinema aan en stellen alles af op uw kamer — zodat elke film klinkt zoals de maker het bedoelde."
        image="/images/dienst-soundbar.jpg"
        imageAlt="Stel geniet 's avonds van film en geluid via een wandgemonteerde tv"
      >
        <HeroActions tweedeHref="#prijs" tweedeLabel="Wat het kost" />
        <CheckList
          dark
          items={[
            "Soundbar strak gemonteerd en kabels weggewerkt",
            "Subwoofer en achterspeakers draadloos gekoppeld",
            "Aangesloten via HDMI ARC / eARC",
            "Perfect afgesteld voor uw ruimte",
          ]}
          className="mt-8 grid gap-3 sm:grid-cols-2"
        />
      </PageHero>

      <Section labelledBy="audio">
        <SectionHeading
          id="audio"
          eyebrow="Wat u krijgt"
          title="Van soundbar tot home-cinema"
          lead="Moderne tv's zijn flinterdun — en dat hoort u: de ingebouwde speakers halen het niet bij een echte soundbar of surround-set. Wij zorgen dat uw beeld eindelijk het geluid krijgt dat het verdient. Van een enkele soundbar tot een volledige home-cinema met subwoofer en achterspeakers: we monteren, sluiten aan en stellen alles zorgvuldig af op de akoestiek van uw kamer."
        />
        <CheckList
          items={audioItems}
          className="mt-10 grid max-w-4xl gap-3 sm:grid-cols-2"
        />
      </Section>

      {/* Bewijs komt ná de belofte en vóór de prijs: eerst vertellen wat we
          leveren, dan laten zien dat we het leveren, dan wat het kost. */}
      <Reviews
        title="Klanten over hun geluidsinstallatie"
        items={reviewsPerDienst["soundbar-installatie"]}
      />

      {/* Brengt zijn eigen witte sectie mee, vlak vóór de prijs. */}
      <Bezwaren />

      <Section id="prijs" tone="surface" labelledBy="prijs-kop">
        <SectionHeading
          id="prijs-kop"
          eyebrow="Wat het kost"
          title="Wat kost soundbar installeren?"
          lead="Vaste prijzen, inclusief montage, aansluiten en afstellen — altijd inclusief voorrijkosten en btw."
        />

        {/* Een vast bedrag, en daarom géén `PrijsBlok`: dat blok hoort bij het
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
                  <p className="eyebrow-dark">Vaste prijs · losse soundbar</p>
                  <p className="mt-5 font-display text-stat font-bold tabular">
                    {PRIJS}
                  </p>
                  <p className="mt-3 text-ink-300">
                    Monteren, aansluiten en afstellen van uw soundbar,
                    inclusief voorrijkosten en btw. Geen vanafprijs: dit is het
                    bedrag.
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

            <h3 className="mt-10 text-h3">Grotere sets</h3>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              <li className="card h-full p-6">
                <p className="eyebrow">Surround-set</p>
                <p className="mt-4 font-display text-h2 font-bold text-ink-950">
                  <span className="text-lead font-normal text-ink-600">
                    vanaf{" "}
                  </span>
                  <span className="tabular">{SURROUND}</span>
                </p>
                <p className="mt-2 text-sm text-ink-600">
                  Inclusief subwoofer en achterspeakers, gekoppeld en afgesteld.
                </p>
              </li>
              <li className="card h-full p-6">
                <p className="eyebrow">Home-cinema</p>
                <p className="mt-4 font-display text-h2 font-bold text-ink-950">
                  Op offerte
                </p>
                <p className="mt-2 text-sm text-ink-600">
                  Versterker, meerdere speakers en bekabeling: eerst kijken, dan
                  een bedrag.
                </p>
              </li>
            </ul>
            <p className="mt-6 text-ink-600">
              Bekijk alle tarieven en opties op de{" "}
              <Link href="/prijzen" className="link">
                prijzenpagina
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

      <Section labelledBy="keuze">
        <SectionHeading
          id="keuze"
          eyebrow="Welke set past bij u?"
          title="Soundbar, surround of home-cinema — wat past bij u?"
          lead="Elke woonkamer en elk budget is anders. De monteur adviseert wat het beste bij uw situatie past."
        />
        <IconCardGrid items={keuze} columns={3} className="mt-12" />
      </Section>

      <Section tone="surface" labelledBy="aansluiten">
        <SectionHeading
          id="aansluiten"
          eyebrow="Hoe wij het doen"
          title="Hoe wij uw soundbar aansluiten en plaatsen"
          lead="De aansluitmethode en de plek bepalen samen hoe goed uw geluid wordt. Beide kiezen wij ter plekke, met u erbij."
        />
        <div className="prose-tv mt-10 max-w-3xl">
          <h3>Hoe sluiten we uw soundbar aan?</h3>
          <p>
            De aansluitmethode bepaalt hoe goed uw geluid wordt. Waar mogelijk
            gebruiken we <strong>HDMI ARC of eARC</strong>: dat geeft het volle,
            ongecomprimeerde geluid én zorgt dat u tv en soundbar met één
            afstandsbediening bedient. Heeft uw tv geen HDMI ARC, dan is een
            optische kabel een prima alternatief.
          </p>
          <p>
            We controleren de aansluitingen van uw tv, kiezen de beste
            verbinding en testen het resultaat met beeld en muziek. Daarna
            stellen we het geluid af op uw kamer — zodat stemmen helder blijven
            en de bas niet dreunt.
          </p>

          <h3>Soundbar plaatsen: onder de tv of aan de muur</h3>
          <p>
            Staat uw tv aan de muur, dan oogt een soundbar die netjes
            gecentreerd eronder hangt het strakst — perfect uitgelijnd en met de
            kabels mee weggewerkt. Staat de tv op een meubel, dan plaatsen we de
            soundbar ervoor of eronder, op de juiste hoogte voor het beste
            geluid. We denken mee over de mooiste én best klinkende plek.
          </p>

          <h3>Alle grote audiomerken</h3>
          <p>
            Onze monteurs installeren dagelijks soundbars en sets van Sonos,
            Samsung, LG, Bose, JBL, Philips, Denon en meer. Elk merk heeft zijn
            eigen app, aansluitopties en instellingen — en wij kennen ze. Zo
            haalt u het maximale uit de set die u al heeft of net heeft gekocht.
          </p>
        </div>
        <InlineCta
          href="#offerte"
          text="Vaste prijs vooraf, inclusief het netjes wegwerken van de kabels en het afregelen van het geluid. U krijgt binnen enkele uren bericht over de eerstvolgende mogelijkheid."
        />
      </Section>

      <Section labelledBy="stappen">
        <SectionHeading
          id="stappen"
          eyebrow="Zo werkt het"
          title="Zo verloopt de soundbar-installatie"
          lead="Van aanvraag tot het eerste nummer dat u hoort: vier stappen, één bezoek."
        />
        {/* Genummerd, want de volgorde is het punt. `HowItWorks` uit de
            sectiebibliotheek beschrijft de stappen van het ophangen; een
            geluidsinstallatie eindigt met afstellen en testen. */}
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
      </Section>

      <Section tone="surface" labelledBy="situaties">
        <SectionHeading
          id="situaties"
          eyebrow="Uw situatie"
          title="Soundbar installeren in elke situatie"
          lead="Waarvoor u ons ook vraagt, onze monteurs zorgen voor het beste geluid in uw kamer."
        />
        <IconCardGrid items={situaties} columns={2} className="mt-12" />
      </Section>

      <Section labelledBy="faq">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <SectionHeading
            id="faq"
            eyebrow="Veelgestelde vragen"
            title="Veelgestelde vragen over soundbar-installatie"
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
          title="Soundbar installeren in ons werkgebied"
          lead="Onze monteurs komen aan huis in Zuid-Holland, Noord-Holland, Utrecht en Noord-Brabant. Per provincie vindt u hieronder de plaatsen waar wij rijden."
        />
        {/* Ankertekst volgt de titel van de doelpagina ("Tv ophangen in
            <provincie>"); de href verandert niet. */}
        <ProvincieChips prefix="Tv ophangen in" withOverview />
        <RelatedLinks
          items={[
            ["/tv-ophangen", "Tv ophangen"],
            ["/diensten/tv-installatie", "Complete tv installatie"],
            ["/diensten/tv-instellen", "Tv instellen & hulp"],
            ["/prijzen", "Bekijk onze prijzen"],
          ]}
        />
      </Section>

      <Section id="offerte" labelledBy="offerte-kop">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div>
            <SectionHeading
              id="offerte-kop"
              eyebrow="Offerte aanvragen"
              title="Vraag uw offerte aan voor uw geluid"
              lead={`Soundbar aansluiten en afstellen kost ${PRIJS}, een complete surroundset vanaf ${SURROUND}. Vast, inclusief voorrijkosten en btw. U krijgt binnen enkele uren bericht.`}
            />
            <CheckList items={aanvraagBelofte} className="mt-8" />
          </div>
          {/* `variant` is het label waarop in GA4 wordt gemeten. Het blijft
              staan zoals het was, anders breekt de reeks van deze pagina. */}
          <ContactForm
            variant="soundbar"
            berichtLabel="Welke set heeft u?"
            berichtPlaceholder="Bijvoorbeeld: Sonos Beam met subwoofer, tv is een LG van 2023."
          />
        </div>
      </Section>
    </>
  );
}
