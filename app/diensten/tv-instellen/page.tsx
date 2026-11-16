import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import IconCardGrid, { type IconCard } from "@/components/IconCardGrid";
import InlineCta from "@/components/InlineCta";
import JsonLd from "@/components/JsonLd";
import PrijsGarantie from "@/components/PrijsGarantie";
import ProvincieChips from "@/components/ProvincieChips";
import RelatedLinks from "@/components/RelatedLinks";
import Reviews from "@/components/Reviews";
import { Icon } from "@/components/Icon";
import {
  Aanvraagsectie,
  Faqsectie,
  Hero,
  HeroKnoppen,
  Kop,
  Stappen,
  Vinkjes,
  Vlak,
} from "@/components/sections";
import {
  BELOFTE,
  TV_HULP_PRIJS,
  type FaqItem,
} from "@/lib/content";
import { faqJsonLd, pageMeta, serviceJsonLd } from "@/lib/seo";

/**
 * Deze pagina staat op "tv hulp aan huis" en niet meer op "tv instellen".
 *
 * Het eigen zoektermenrapport over 90 dagen wijst dat aan: "tv instellen"
 * leverde 25 vertoningen en één klik, terwijl "tv hulp aan huis" op elf
 * vertoningen drie klikken en een conversie gaf, en "televisie monteur aan
 * huis" 27 vertoningen met zeven klikken. "Instellen" is bovendien niet het
 * woord dat iemand met een probleem intikt — die tikt het probleem in.
 *
 * Die probleemwoorden waren het grootste gat in de site: ruim 70 vertoningen
 * op varianten van "geen geluid op tv" en bijna 40 op "tv maakt geen
 * verbinding met wifi", vrijwel zonder klikken omdat ze hier uitkwamen.
 * Daarvoor bestaan nu /tv-geen-geluid en /tv-geen-wifi. Deze pagina is het
 * overzicht dat ernaar doorverwijst; hij hoort dus níet op diezelfde woorden
 * te mikken, anders concurreren ze met elkaar.
 *
 * De URL blijft /diensten/tv-instellen: die staat in de sitemap, in Google en
 * in de advertenties, en een verhuizing kost meer dan hij oplevert.
 */
export const metadata = pageMeta({
  title: "Tv hulp aan huis — vaste prijs €60",
  description:
    "Tv hulp aan huis: zenders kwijt, een app die niet start of een afstandsbediening die niet werkt? Onze monteur lost het thuis op. Vaste prijs €60.",
  path: "/diensten/tv-instellen",
});

/**
 * Het vaste bedrag van deze dienst. Stond hier als losse constante; sinds de
 * probleempagina's hetzelfde tarief noemen, komt het uit `lib/content.ts`.
 */
const PRIJS = TV_HULP_PRIJS;

const hulpItems = [
  "Geen of verkeerde zenders? Opnieuw afstemmen en sorteren",
  "Geen geluid, of wel beeld en geen geluid? De uitgang en de kabels nalopen",
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
  BELOFTE.vrijblijvend,
  BELOFTE.geenAanbetaling,
  BELOFTE.avondWeekend,
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
    title: "Afspraak maken",
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
    icon: <Icon name="tv" />,
    h3: "Ineens geen beeld of geluid",
    text: "Verkeerde bron, een instelling die is omgesprongen of een verbinding die eruit ligt? Wij zoeken uit waar het aan ligt en zetten uw tv weer aan het werk.",
  },
  {
    icon: <Icon name="cable" />,
    h3: "Na een verhuizing of storing",
    text: "Beeld weg, geen zenders of internet? We sluiten alles opnieuw aan, stellen het in en controleren de verbindingen — meestal werkt alles weer voordat wij de deur uit zijn.",
  },
  {
    icon: <Icon name="sliders" />,
    h3: "Eén afstandsbediening voor alles",
    text: "We koppelen en programmeren een universele afstandsbediening, zodat u tv, soundbar en mediaspeler met één bediening aanstuurt.",
  },
  {
    icon: <Icon name="chat" />,
    h3: "Zenders kwijt of door elkaar",
    text: "Ineens andere zenders of alles door elkaar? We zoeken de zenders opnieuw, zetten uw favorieten weer op de juiste plek en leggen uit hoe u het zelf bijhoudt.",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "Repareren jullie ook kapotte tv's?",
    a:
      // Woordelijk dezelfde grens als in de FAQ op de homepage. Stond hier
      // in andere woorden, en een bezoeker die beide pagina's leest moet
      // niet gaan uitzoeken of er verschil tussen zit.
      "Nee. Een kapot scherm of defecte elektronica repareren wij niet; daarvoor moet u bij de fabrikant of een reparateur zijn. Wij helpen met alles rondom de instellingen, zenders, wifi, apps en verbindingen van uw tv.",
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
    a: "Vaak al binnen 24 uur. Vraag online een afspraak aan, dan laten we u binnen enkele uren weten wat de eerstvolgende mogelijkheid bij u in de buurt is.",
  },
  {
    q: "Kan de afspraak ook 's avonds of in het weekend?",
    a: "Ja. Doordeweeks komen we tot 21:00 uur langs en in het weekend tussen 09:00 en 17:00 uur, zonder toeslag. Vraag online een afspraak aan, dan laten we u de eerstvolgende beschikbaarheid weten.",
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

      <Hero
        kruimels={
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Diensten", href: "/diensten" },
              { name: "Tv hulp aan huis", href: "/diensten/tv-instellen" },
            ]}
          />
        }
        bovenkop={`Tv hulp aan huis · vaste prijs ${PRIJS}`}
        titel="Tv hulp aan huis: uw tv snel weer werkend"
        inleiding="Werkt uw tv niet meer zoals het hoort? Geen zenders, geen wifi of internet, een app die niet opstart of een afstandsbediening die niet reageert? Onze monteur komt bij u thuis, verhelpt het en legt rustig uit hoe u het zelf houdt — in gewone taal, zonder jargon."
        beeld="/images/dienst-tv-instellen.webp"
        beeldAlt="Ingestelde smart-tv met heldere beeldweergave in de woonkamer"
      >
        <HeroKnoppen />
        <Vinkjes donker
          items={[
            "Alles werkt weer na één bezoek",
            "Zenders, wifi en apps op orde",
            "Uitleg in gewone taal — ook prettig voor senioren",
            `Vaste prijs van ${PRIJS}, incl. voorrijkosten`,
          ]}
          className="mt-8 grid gap-3 border-t border-white/15 pt-6 sm:grid-cols-2"
        />
      </Hero>

      <Vlak toon="wit" labelledBy="hulp">
        <Kop
          id="hulp"
          bovenkop="Waarmee we helpen"
        titel="Waarmee we u helpen"
        tekst="Moderne tv's kunnen ontzettend veel, en juist daardoor gaat er weleens iets mis: zenders die verdwijnen, geen internet, een app die hapert of een instelling die per ongeluk is veranderd. Wij verhelpen dat soort problemen met de instellingen, software en verbindingen van uw tv — en leggen meteen uit hoe u het zelf houdt. Hardwarereparaties, zoals een kapot scherm, doen we niet."
        />
        <Vinkjes
          items={hulpItems}
          className="mt-10 grid max-w-4xl gap-3.5 sm:grid-cols-2"
        />
      </Vlak>

      {/* Bewijs komt ná de belofte en vóór de prijs: eerst vertellen wat we
          leveren, dan laten zien dat we het leveren, dan wat het kost. */}
      <Reviews toon="oppervlak" />

      <Vlak id="prijs" toon="wit" labelledBy="prijs-kop">
        <Kop
          id="prijs-kop"
          bovenkop="Wat het kost"
        titel="Wat kost tv hulp aan huis?"
        tekst="De meeste hulpvragen lost onze monteur op voor één vast bedrag, inclusief voorrijkosten en btw. Vooraf afgesproken, geen verrassingen achteraf."
        />

        {/* Eén vast bedrag, en daarom géén `Prijsklassen`: dat blok hoort bij
            het ophangen, met drie formaten. Hier is het bedrag zelf het
            argument, dus staat het in een paneel met dezelfde amberen streep
            als het afspraakformulier. */}
        <div className="mt-12 grid gap-8 lg:grid-cols-5 lg:gap-10">
          <div className="lg:col-span-2">
            <div className="paneel flex h-full flex-col justify-between border-t-4 border-t-amber-400 p-7">
              <div>
                <p className="bovenkop">Vaste prijs</p>
                <p className="cijfers mt-4 font-display text-prijs font-semibold text-ink-950">
                  {PRIJS}
                </p>
                <p className="mt-4 text-ink-600">
                  Voor het hele bezoek, inclusief voorrijkosten en btw. Geen
                  uurtarief dat oploopt terwijl wij het uitzoeken.
                </p>
              </div>
              <Link href="#afspraak" className="knop-vol knop-groot mt-8 w-full">
                Afspraak maken
                <Icon name="arrow-right" className="size-5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-h3">Wat er in dat bedrag zit</h3>
            <Vinkjes items={prijsDekking} className="mt-5" />
            <p className="mt-7 text-ink-600">
              Bekijk alle{" "}
              <Link href="/prijzen" className="verwijzing">
                prijzen
              </Link>{" "}
              of zet uw vraag meteen in het{" "}
              <Link href="#afspraak" className="verwijzing">
                afspraakformulier
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Geen eigen kop boven dit blok: de drie garanties zijn zelf h3's, en
            een kop ernaast zou op hetzelfde niveau staan als wat hij aankondigt. */}
        <p className="mt-16 max-w-3xl text-lead text-ink-600">
          Een vaste prijs is pas een argument als erbij staat waar hij tegen
          vast is. Dit zijn de drie dingen die uw bedrag niet veranderen.
        </p>
        <PrijsGarantie className="mt-8" />
      </Vlak>

      <Vlak toon="oppervlak" labelledBy="streaming">
        <Kop
          id="streaming"
          bovenkop="Streaming"
        titel="Hulp met streaming en apps"
        tekst="Doet Netflix, Viaplay of NPO Start het niet, of komt u niet meer ingelogd? We zetten uw streaming-apps weer goed en helpen u met inloggen. Uw wachtwoorden blijven van u — die vullen we alleen samen met u in."
        />
        <ul className="mt-10 flex flex-wrap gap-2.5">
          {streaming.map((dienst) => (
            <li key={dienst} className="pil">
              {dienst}
            </li>
          ))}
        </ul>
      </Vlak>

      <Vlak toon="wit" labelledBy="stappen">
        <Kop
          id="stappen"
          bovenkop="Zo werkt het"
        titel="Zo werkt tv hulp aan huis"
        tekst="Van aanvraag tot werkende tv in vier stappen, en de uitleg hoort erbij."
        />
        {/* `Werkwijze` uit de sectiebibliotheek beschrijft de stappen van het
            ophangen; hulp aan huis heeft er vier en eindigt met uitleggen in
            plaats van met opruimen. Vandaar `Stappen` met de eigen lijst, in
            dezelfde vorm als elders op de site. */}
        <div className="mt-12">
          <Stappen items={stappen} kolommen={4} />
        </div>
        <InlineCta
          href="#afspraak"
          text="Vaste prijs vooraf, en we leggen rustig uit hoe het werkt voordat we weggaan. Wij bellen u binnen enkele uren om de afspraak in te plannen."
        />
      </Vlak>

      <Vlak toon="oppervlak" labelledBy="senioren">
        <Kop
          id="senioren"
          bovenkop="Uitleg hoort erbij"
        titel="Geduldig en in gewone taal — ook voor senioren"
        tekst="Onze monteurs zijn er niet alleen om het óp te lossen, maar ook om het úít te leggen."
        />
        <div className="artikel mt-8 max-w-3xl">
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
      </Vlak>

      <Vlak toon="wit" labelledBy="situaties">
        <Kop
          id="situaties"
          bovenkop="Uw situatie"
        titel="Tv hulp in elke situatie"
        tekst="Waar u ook op vastloopt, onze monteur helpt u snel verder."
        />
        <IconCardGrid items={situaties} columns={2} className="mt-12" />
      </Vlak>

      <Faqsectie
        titel="Veelgestelde vragen over tv hulp"
        items={faqItems}
        toon="oppervlak"
      />

      <Vlak toon="wit" labelledBy="werkgebied">
        <Kop
          id="werkgebied"
          bovenkop="Werkgebied"
        titel="Tv hulp aan huis in ons werkgebied"
        tekst="Onze monteurs komen aan huis in Zuid-Holland, Noord-Holland, Utrecht en Noord-Brabant. Per provincie vindt u hieronder de plaatsen waar wij rijden."
        />
        {/* Ankertekst volgt de titel van de doelpagina ("Tv ophangen in
            <provincie>"); de href verandert niet. */}
        <ProvincieChips prefix="Tv ophangen in" withOverview />
        {/* De twee probleempagina's staan vooraan: dit overzicht trekt de
            zoeker binnen op "tv hulp aan huis", maar wie met een concreet
            probleem komt hoort op de pagina te landen die dát probleem
            behandelt. */}
        <RelatedLinks
          items={[
            ["/tv-geen-geluid", "Geen geluid op de tv"],
            ["/tv-geen-wifi", "Tv maakt geen verbinding met wifi"],
            ["/diensten/tv-installatie", "Complete tv installatie"],
            ["/diensten/soundbar-installatie", "Soundbar installeren"],
          ]}
        />
      </Vlak>

      <Aanvraagsectie
        titel="Vraag een afspraak aan voor tv-hulp"
        tekst={`Vaste prijs van ${PRIJS}, inclusief voorrijkosten en btw. Vertel kort wat er niet lukt, dan weet de monteur vooraf wat hij meeneemt. Wij bellen u binnen enkele uren om de afspraak in te plannen.`}
        beloftes={aanvraagBelofte}
      >
        {/* `variant` is het label waarop in GA4 wordt gemeten. Het blijft
            staan zoals het was, anders breekt de reeks van deze pagina. */}
        <ContactForm
          variant="tv-instellen"
          berichtLabel="Wat lukt er niet?"
          berichtPlaceholder="Bijvoorbeeld: na de storing zijn alle zenders weg en Netflix start niet meer."
        />
      </Aanvraagsectie>
    </>
  );
}
