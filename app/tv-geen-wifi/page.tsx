import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import JsonLd from "@/components/JsonLd";
import RelatedLinks from "@/components/RelatedLinks";
import Reviews from "@/components/Reviews";
import { Icon } from "@/components/Icon";
import {
  Aanvraagsectie,
  Faqsectie,
  Hero,
  HeroKnoppen,
  Kop,
  Vinkjes,
  Vlak,
} from "@/components/sections";
import { BELOFTE, TV_HULP_PRIJS, type FaqItem } from "@/lib/content";
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
  BELOFTE.avondWeekend,
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

const aanvraagBelofte = [
  BELOFTE.vrijblijvend,
  `Vaste prijs van ${TV_HULP_PRIJS}, inclusief voorrijkosten en btw`,
  BELOFTE.geenAanbetaling,
  BELOFTE.snel,
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

      <Hero
        kruimels={
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Diensten", href: "/diensten" },
              { name: "Tv geen verbinding", href: "/tv-geen-wifi" },
            ]}
          />
        }
        bovenkop="Tv hulp aan huis"
        titel="Tv maakt geen verbinding met wifi of internet"
        inleiding="Uw tv vindt het netwerk niet, verliest de verbinding of meldt dat hij verbonden is terwijl geen enkele app werkt. Dat ligt zelden aan de televisie: meestal aan bereik, aan de frequentieband of aan een instelling in de router. Onze monteur krijgt hem weer online."
        beeld="/images/tv-geen-wifi.webp"
        beeldAlt="Monteur controleert de netwerkverbinding van een smart-tv terwijl de router op het dressoir staat"
      >
        <HeroKnoppen tweedeHref="#oorzaken" tweedeLabel="Bekijk de oorzaken" />
        <Vinkjes donker
          items={belofte}
          className="mt-8 border-t border-white/15 pt-6"
        />
      </Hero>

      <Vlak toon="wit" id="oorzaken" labelledBy="oorzaken-kop">
        <Kop
          id="oorzaken-kop"
          bovenkop="De oorzaak"
        titel="Vijf redenen waarom uw tv niet op het netwerk komt"
        tekst="Op volgorde van hoe vaak onze monteurs ze aantreffen. Bij vrijwel alle vijf is er niets mis met het toestel."
        />
        {/* Een genummerde lijst en geen kaartenraster: de volgorde ís de
            inhoud — dit is wat de monteur van vaak naar zelden aantreft. */}
        <ol className="mt-12 max-w-4xl border-t border-ink-200">
          {oorzaken.map((oorzaak, i) => (
            <li
              key={oorzaak.kop}
              className="komt-op flex gap-5 border-b border-ink-200 py-6"
            >
              <span
                aria-hidden="true"
                className="cijfers shrink-0 font-display text-h3 font-semibold leading-none text-ink-500"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-h4">{oorzaak.kop}</h3>
                <p className="mt-2 text-ink-600">{oorzaak.tekst}</p>
              </div>
            </li>
          ))}
        </ol>
      </Vlak>

      <Vlak toon="oppervlak" labelledBy="zelf-kop">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div>
            <Kop
              id="zelf-kop"
              bovenkop="Eerst zelf proberen"
              titel="Vijf dingen die u bij geen verbinding zelf kunt proberen"
              tekst="Begin hier — in de meeste huizen zit het in het bereik of in één instelling. Werkt het daarna, dan hoeft u ons niet te bellen."
            />
            <Vinkjes items={zelfProberen} className="mt-8" />
          </div>
          <div className="paneel border-t-4 border-t-amber-400 p-7 md:p-8">
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
              <Link href="/diensten/tv-installatie" className="verwijzing">
                Dat doen we in dezelfde afspraak
              </Link>
              .
            </p>
            <Link href="#afspraak" className="knop-vol mt-7 w-full">
              Afspraak maken
              <Icon name="arrow-right" className="size-5" />
            </Link>
          </div>
        </div>
      </Vlak>

      <Reviews toon="wit" />

      <Faqsectie
        titel="Vragen over een tv zonder verbinding"
        items={faqItems}
        toon="oppervlak"
      >
        <RelatedLinks
          items={[
            ["/diensten/tv-instellen", "Tv hulp aan huis"],
            ["/tv-geen-geluid", "Geen geluid op de tv"],
            ["/diensten/tv-installatie", "Complete tv installatie"],
            ["/kennisbank", "Kennisbank"],
          ]}
        />
      </Faqsectie>

      <Aanvraagsectie
        toon="wit"
        titel="Vertel wat uw tv doet"
        tekst="Zet erbij welk merk tv u heeft en of hij het netwerk helemaal niet ziet of wél verbindt zonder internet. Dan komt de monteur voorbereid en weet u het bedrag vooraf."
        beloftes={aanvraagBelofte}
      >
        <ContactForm
          variant="geen-wifi"
          berichtLabel="Wat doet uw tv?"
          berichtPlaceholder="Bijvoorbeeld: LG tv vindt ons wifi-netwerk niet meer sinds we een nieuwe router hebben."
        />
      </Aanvraagsectie>
    </>
  );
}
