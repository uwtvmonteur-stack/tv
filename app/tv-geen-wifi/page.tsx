import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
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
import { TV_HULP_PRIJS, type FaqItem } from "@/lib/content";
import { faqJsonLd, pageMeta, serviceJsonLd } from "@/lib/seo";

/**
 * Tv maakt geen verbinding met wifi of internet.
 *
 * Tweede pagina die uit het zoektermenrapport komt. Over 90 dagen ongeveer
 * 38 vertoningen, verdeeld over twee woordenschatten die precies even zwaar
 * wegen: "wifi" ("tv verbind niet met wifi", "tv maakt geen verbinding met
 * wifi") en "internet" ("tv geen internet", "wel tv geen internet"). De kop
 * en de inleiding dragen daarom beide woorden; de URL draagt het meest
 * onderscheidende.
 *
 * Net als bij het geluid is dit geen reparatie. Een tv die niet op het
 * netwerk komt, is vrijwel altijd een kwestie van bereik, een verkeerde
 * frequentieband of een instelling in de router — werk dat wij doen.
 */
export const metadata = pageMeta({
  title: "Tv geen wifi of internet? Monteur aan huis",
  description:
    "Tv geen wifi of geen internet? Vaak ligt het aan bereik, de 5 GHz-band of een netwerkinstelling. Onze monteur lost het thuis op. Vaste prijs €60.",
  path: "/tv-geen-wifi",
});

const belofte = [
  "Wij krijgen uw tv weer op het netwerk — bekabeld of draadloos",
  `Vaste prijs van ${TV_HULP_PRIJS}, inclusief voorrijkosten en btw`,
  "Ook uw apps, streamingdiensten en updates werkend achtergelaten",
  "Ook 's avonds en in het weekend, zonder toeslag",
];

/**
 * De oorzaken, op volgorde van hoe vaak de monteur ze aantreft. Expres
 * concreet: wie hierop zoekt heeft meestal al een keer de router herstart en
 * wil weten wat er dan nog over is.
 */
const oorzaken: { kop: string; tekst: string }[] = [
  {
    kop: "De tv staat te ver van de router",
    tekst:
      "Een televisie heeft een vaste plek en meestal een kleine antenne, vaak achter een meubel of in een nis. Waar uw telefoon nog twee streepjes haalt, haakt de tv al af. Een stap in signaalsterkte lost dit meestal op.",
  },
  {
    kop: "De tv ziet de 5 GHz-band niet",
    tekst:
      "Veel oudere televisies werken alleen op 2,4 GHz. Staat uw netwerk op 5 GHz of op één samengevoegde netwerknaam, dan staat uw netwerk niet eens in de lijst op de tv.",
  },
  {
    kop: "Het netwerk is er wel, maar er komt geen internet doorheen",
    tekst:
      "De tv meldt dat hij verbonden is en toch werkt geen enkele app. Dan gaat het om de DNS-instelling, een vol IP-bereik of een beveiligingsinstelling in de router die het toestel blokkeert.",
  },
  {
    kop: "Het wachtwoord of de netwerknaam is gewijzigd",
    tekst:
      "Na een nieuwe router of een wijziging bij de provider houdt de tv het oude netwerk vast. Opnieuw verbinden lukt dan alleen door het oude netwerk eerst van het toestel te verwijderen.",
  },
  {
    kop: "De software van de tv is verouderd",
    tekst:
      "Apps en streamingdiensten eisen een minimumversie. Loopt de tv te ver achter, dan verbreekt hij de verbinding of starten de apps niet. Bijwerken lukt dan alleen via een bekabelde verbinding of een USB-stick.",
  },
];

/** Wat u zelf kunt proberen voordat u ons belt. */
const zelfProberen = [
  "Herstart de router en de tv allebei, en wacht twee minuten",
  "Kijk of uw telefoon op dezelfde plek als de tv wél verbinding houdt",
  "Zoek in het tv-menu naar het netwerk met 2,4 GHz in de naam",
  "Vergeet het netwerk op de tv en verbind opnieuw met het wachtwoord",
  "Probeer een netwerkkabel van de router naar de tv, als die er ligt",
];

const faqItems: FaqItem[] = [
  {
    q: "Waarom maakt mijn tv geen verbinding met wifi?",
    a: "De drie meest voorkomende oorzaken zijn bereik, band en instelling. De tv staat verder van de router dan uw telefoon en haalt het signaal niet meer; het netwerk draait op 5 GHz terwijl de tv alleen 2,4 GHz kan; of het wachtwoord of de netwerknaam is gewijzigd en de tv houdt het oude netwerk vast. In alle drie de gevallen is er niets kapot aan het toestel.",
  },
  {
    q: "Mijn tv zegt dat hij verbonden is, maar niets werkt. Hoe kan dat?",
    a: "Dan heeft de tv wel een netwerkverbinding maar geen werkend internet. Dat komt door een DNS-instelling, een IP-adres dat de router niet meer uitgeeft, of een beveiligingsinstelling die het toestel tegenhoudt. Onze monteur zet de netwerkinstellingen op de tv goed en controleert in de router of het toestel er wél door mag.",
  },
  {
    q: "Kunnen jullie ook een netwerkkabel trekken?",
    a: "Een kabel van de router naar de tv leggen en netjes wegwerken doen wij, in dezelfde afspraak. Moet er een leiding door een muur of vloer, dan bekijkt de monteur het ter plekke en hoort u het bedrag voordat er iets gebeurt. Een draadloze verbinding is meestal genoeg, ook voor streaming in 4K.",
  },
  {
    q: "Wat kost het om mijn tv weer online te krijgen?",
    a: `${TV_HULP_PRIJS}, inclusief voorrijkosten en btw. Daar zit het uitzoeken, het verhelpen en de uitleg bij, en ook het opnieuw inloggen op uw apps en streamingdiensten als dat nodig is. U betaalt pas na afloop.`,
  },
  {
    q: "Repareren jullie ook de wifi-module in de tv?",
    a: "Nee. Blijkt de netwerkmodule van het toestel defect, dan is dat een reparatie en die doen wij niet. De monteur zegt dat ter plekke en kan dan wel een bekabelde verbinding aanleggen of een losse mediaspeler aansluiten, zodat u toch kunt streamen.",
  },
];

const offerteBelofte = [
  "Vrijblijvend: u zit aan niets vast tot u ja zegt",
  `Vaste prijs van ${TV_HULP_PRIJS}, inclusief voorrijkosten en btw`,
  "Geen aanbetaling — u betaalt pas na afloop",
  "Vaak al binnen 24 uur een afspraak mogelijk",
];

export default function Page() {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: "Tv verbinden met wifi of internet",
          description:
            "Een televisie die geen verbinding maakt met wifi of internet weer online krijgen: netwerkinstellingen, frequentieband, routerinstellingen, apps en streamingdiensten. Aan huis, tegen een vaste prijs inclusief voorrijkosten en btw.",
          path: "/tv-geen-wifi",
          offers: [
            {
              name: "Tv hulp aan huis — geen wifi of internet",
              price: TV_HULP_PRIJS,
            },
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
              { name: "Tv geen verbinding", href: "/tv-geen-wifi" },
            ]}
          />
        }
        eyebrow="Tv hulp aan huis"
        title="Tv maakt geen verbinding met wifi of internet"
        lead="Uw tv vindt het netwerk niet, verliest de verbinding of meldt dat hij verbonden is terwijl geen enkele app werkt. Dat ligt zelden aan de televisie: meestal aan bereik, aan de frequentieband of aan een instelling in de router. Onze monteur krijgt hem weer online."
        image="/images/dienst-tv-instellen.jpg"
        imageAlt="Monteur stelt een smart tv in en controleert de netwerkverbinding"
      >
        <HeroActions tweedeHref="#oorzaken" tweedeLabel="Bekijk de oorzaken" />
        <CheckList items={belofte} className="mt-8" dark />
      </PageHero>

      <Section id="oorzaken" labelledBy="oorzaken-kop">
        <SectionHeading
          id="oorzaken-kop"
          eyebrow="De oorzaak"
          title="Vijf redenen waarom uw tv niet op het netwerk komt"
          lead="Op volgorde van hoe vaak onze monteurs ze aantreffen. Bij vrijwel alle vijf is er niets mis met het toestel."
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {oorzaken.map((oorzaak) => (
            <li key={oorzaak.kop} className="card h-full p-6">
              <h3 className="flex items-start gap-3 text-h3">
                <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl bg-accent-50 text-accent-700 ring-1 ring-accent-200">
                  <Icon name="info" className="size-5" />
                </span>
                {oorzaak.kop}
              </h3>
              <p className="mt-3 text-ink-600">{oorzaak.tekst}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface" labelledBy="zelf-kop">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading
              id="zelf-kop"
              eyebrow="Eerst zelf proberen"
              title="Vijf dingen die u zonder gereedschap kunt controleren"
              lead="Lukt het hiermee, dan hoeft u ons niet te bellen. Dat zeggen we liever eerlijk dan dat u voor niets een monteur over de vloer krijgt."
            />
            <CheckList items={zelfProberen} className="mt-8" />
          </div>
          <div className="card p-7 md:p-8">
            <h3 className="text-h3">Blijft hij offline?</h3>
            <p className="mt-3 text-ink-600">
              Dan komt onze monteur langs. Hij meet de signaalsterkte op de
              plek van de tv, zet de netwerkinstellingen goed, controleert de
              router en test uw apps en streamingdiensten voordat hij weggaat.
              U betaalt {TV_HULP_PRIJS} inclusief voorrijkosten en btw, en pas
              na afloop.
            </p>
            <p className="mt-4 text-ink-600">
              Wordt de tv ook opgehangen of aangesloten?{" "}
              <Link href="/diensten/tv-installatie" className="link">
                Dat doen we in dezelfde afspraak
              </Link>
              .
            </p>
            <Link href="#offerte" className="btn-primary mt-7 w-full">
              Afspraak aanvragen
              <Icon name="arrow-right" className="size-5" />
            </Link>
          </div>
        </div>
      </Section>

      <Reviews />

      <Section labelledBy="faq-kop">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <SectionHeading
            id="faq-kop"
            eyebrow="Veelgestelde vragen"
            title="Vragen over een tv zonder verbinding"
            lead={
              <>
                Staat uw vraag er niet bij? Zet hem in het{" "}
                <Link href="#offerte" className="link">
                  aanvraagformulier
                </Link>{" "}
                — u krijgt er antwoord op als wij u bellen.
              </>
            }
          />
          <Faq items={faqItems} />
        </div>
        <RelatedLinks
          items={[
            ["/diensten/tv-instellen", "Tv hulp aan huis"],
            ["/tv-geen-geluid", "Geen geluid op de tv"],
            ["/diensten/tv-installatie", "Complete tv installatie"],
            ["/kennisbank", "Kennisbank"],
          ]}
        />
      </Section>

      <Section id="offerte" tone="surface" labelledBy="offerte-kop">
        <div className="flex flex-col-reverse gap-10 lg:grid lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div>
            <SectionHeading
              id="offerte-kop"
              eyebrow="Afspraak aanvragen"
              title="Vertel wat uw tv doet"
              lead="Zet erbij welk merk tv u heeft en of hij het netwerk helemaal niet ziet of wél verbindt zonder internet. Dan komt de monteur voorbereid en weet u het bedrag vooraf."
            />
            <CheckList items={offerteBelofte} className="mt-8" />
          </div>
          <ContactForm
            variant="geen-wifi"
            berichtLabel="Wat doet uw tv?"
            berichtPlaceholder="Bijvoorbeeld: LG tv vindt ons wifi-netwerk niet meer sinds we een nieuwe router hebben."
          />
        </div>
      </Section>
    </>
  );
}
