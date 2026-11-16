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
import { BELOFTE, type FaqItem } from "@/lib/content";
import { faqJsonLd, pageMeta, serviceJsonLd } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Soundbar laten installeren aan huis — €49",
  description:
    "Soundbar laten installeren? Wij monteren, sluiten aan en stellen het geluid af op uw kamer. Vaste prijs €49; een surroundset vanaf €79.",
  path: "/diensten/soundbar-installatie",
});

/**
 * De twee bedragen van deze dienst, gelijk aan de regels "Soundbar aansluiten
 * en afstellen" (€49 vast) en "Surround-set aansluiten" (vanaf €79) in
 * `tarieven`. Eén plek op de pagina, zodat kop, prijsblok en afspraakblok niet
 * uit elkaar kunnen lopen.
 *
 * `SURROUND` is een vanafprijs en hoort dus overal met "vanaf" ervoor — de
 * derde variant, home-cinema met losse versterker, staat in `tarieven` als
 * "na meting" en heeft hier geen bedrag. De meta-description beloofde
 * surround en home-cinema "vanaf €49"; dat was het bedrag van de soundbar.
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
  "Kabels gebundeld en uit het zicht gelegd",
  "Geluid afgesteld op uw kamer, voorrijkosten en btw inbegrepen",
];

/** Wat de aanvraag zelf wel en niet van u vraagt — niet wat er in de prijs zit. */
const aanvraagBelofte = [
  `Soundbar aansluiten en afstellen: vaste prijs ${PRIJS}`,
  `Surroundset: vanaf ${SURROUND}; home-cinema krijgt een prijs na meting`,
  BELOFTE.vrijblijvend,
  BELOFTE.avondWeekend,
];

const stappen = [
  {
    title: "Afspraak maken",
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
    icon: <Icon name="speaker" />,
    h3: "Losse soundbar",
    text: "De eenvoudigste upgrade: één balk onder de tv voor voller, helderder geluid. Ideaal als u vooral series en films kijkt en het strak wilt houden.",
  },
  {
    icon: <Icon name="sliders" />,
    h3: "Soundbar met surround",
    text: "Een soundbar met draadloze subwoofer en achterspeakers voor echt ruimtelijk geluid. Wij plaatsen en koppelen alles en stellen het surround-beeld af op uw kamer.",
  },
  {
    icon: <Icon name="tv" />,
    h3: "Complete home-cinema",
    text: "Een volledige set met versterker en meerdere speakers voor bioscoopgeluid thuis. We verzorgen de bekabeling, de aansluiting en de fijnafstemming — op maat.",
  },
];

const situaties: IconCard[] = [
  {
    icon: <Icon name="speaker" />,
    h3: "Nieuwe soundbar gekocht",
    text: "Net een soundbar of set in huis? Wij monteren, sluiten aan en stellen af — u hoort meteen het verschil zonder zelf te hoeven uitzoeken welke kabel waar hoort.",
  },
  {
    icon: <Icon name="tv" />,
    h3: "Samen met tv ophangen",
    text: "De meest gekozen combinatie: eerst de tv, direct daarna de soundbar. Eén bezoek, geen extra voorrijkosten, en de kabels van beide netjes weggewerkt.",
  },
  {
    icon: <Icon name="cable" />,
    h3: "Bestaande set opnieuw aansluiten",
    text: "Verhuisd of alles in de war na een nieuwe tv? We sluiten uw bestaande soundbar of surround-set weer correct aan en stellen het geluid opnieuw af.",
  },
  {
    icon: <Icon name="chat" />,
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
            { name: "Surround-set aansluiten", price: "vanaf €79" },
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
              {
                name: "Soundbar installeren",
                href: "/diensten/soundbar-installatie",
              },
            ]}
          />
        }
        bovenkop={`Soundbar installeren · aan huis · vaste prijs ${PRIJS}`}
        titel="Soundbar en audio installeren"
        inleiding="Goed beeld verdient goed geluid. Wij sluiten uw soundbar, surround-set of complete home-cinema aan en stellen alles af op uw kamer — zodat elke film klinkt zoals de maker het bedoelde."
        beeld="/images/dienst-soundbar-installatie.webp"
        beeldAlt="Stel geniet 's avonds van film en geluid via een wandgemonteerde tv"
      >
        <HeroKnoppen tweedeHref="#prijs" tweedeLabel="Wat het kost" />
        <Vinkjes donker
          items={[
            "Soundbar strak gemonteerd en kabels weggewerkt",
            "Subwoofer en achterspeakers draadloos gekoppeld",
            "Aangesloten via HDMI ARC / eARC",
            "Perfect afgesteld voor uw ruimte",
          ]}
          className="mt-8 grid gap-3 border-t border-white/15 pt-6 sm:grid-cols-2"
        />
      </Hero>

      <Vlak toon="wit" labelledBy="audio">
        <Kop
          id="audio"
          bovenkop="Wat u krijgt"
        titel="Van soundbar tot home-cinema"
        tekst="Moderne tv's zijn flinterdun — en dat hoort u: de ingebouwde speakers halen het niet bij een echte soundbar of surround-set. Wij zorgen dat uw beeld eindelijk het geluid krijgt dat het verdient. Van een enkele soundbar tot een volledige home-cinema met subwoofer en achterspeakers: we monteren, sluiten aan en stellen alles zorgvuldig af op de akoestiek van uw kamer."
        />
        <Vinkjes
          items={audioItems}
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
        titel="Wat kost soundbar installeren?"
        tekst="Vaste prijzen, inclusief montage, aansluiten en afstellen — altijd inclusief voorrijkosten en btw."
        />

        {/* Eén vast bedrag, en daarom géén `Prijsklassen`: dat blok hoort bij
            het ophangen, met drie formaten. Hier is het bedrag zelf het
            argument, dus staat het in een paneel met dezelfde amberen streep
            als het afspraakformulier. */}
        <div className="mt-12 grid gap-8 lg:grid-cols-5 lg:gap-10">
          <div className="lg:col-span-2">
            <div className="paneel flex h-full flex-col justify-between border-t-4 border-t-amber-400 p-7">
              <div>
                <p className="bovenkop">Vaste prijs · losse soundbar</p>
                <p className="cijfers mt-4 font-display text-prijs font-semibold text-ink-950">
                  {PRIJS}
                </p>
                <p className="mt-4 text-ink-600">
                  Monteren, aansluiten en afstellen van uw soundbar,
                  inclusief voorrijkosten en btw. Geen vanafprijs: dit is het
                  bedrag.
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

            <h3 className="mt-12 text-h3">Grotere sets</h3>
            <dl className="mt-6 grid gap-x-10 gap-y-7 sm:grid-cols-2">
              <div className="border-t border-ink-200 pt-4">
                <dt className="bovenkop">Surround-set</dt>
                <dd>
                  <p className="mt-3 font-display text-h2 font-semibold text-ink-950">
                    <span className="text-lead font-normal text-ink-600">
                      vanaf{" "}
                    </span>
                    <span className="cijfers">{SURROUND}</span>
                  </p>
                  <p className="mt-2 text-sm text-ink-600">
                    Inclusief subwoofer en achterspeakers, gekoppeld en
                    afgesteld.
                  </p>
                </dd>
              </div>
              <div className="border-t border-ink-200 pt-4">
                <dt className="bovenkop">Home-cinema</dt>
                <dd>
                  <p className="mt-3 font-display text-h2 font-semibold text-ink-950">
                    Na meting
                  </p>
                  <p className="mt-2 text-sm text-ink-600">
                    Versterker, meerdere speakers en bekabeling: eerst kijken,
                    dan een bedrag.
                  </p>
                </dd>
              </div>
            </dl>
            <p className="mt-7 text-ink-600">
              Bekijk alle tarieven en opties op de{" "}
              <Link href="/prijzen" className="verwijzing">
                prijzenpagina
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

      <Vlak toon="oppervlak" labelledBy="keuze">
        <Kop
          id="keuze"
          bovenkop="Welke set past bij u?"
        titel="Soundbar, surround of home-cinema — wat past bij u?"
        tekst="Elke woonkamer en elk budget is anders. De monteur adviseert wat het beste bij uw situatie past."
        />
        <IconCardGrid items={keuze} columns={3} className="mt-12" />
      </Vlak>

      <Vlak toon="wit" labelledBy="aansluiten">
        <Kop
          id="aansluiten"
          bovenkop="Hoe wij het doen"
        titel="Hoe wij uw soundbar aansluiten en plaatsen"
        tekst="De aansluitmethode en de plek bepalen samen hoe goed uw geluid wordt. Beide kiezen wij ter plekke, met u erbij."
        />
        <div className="artikel mt-10 max-w-3xl">
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
          href="#afspraak"
          text="Vaste prijs vooraf, inclusief het netjes wegwerken van de kabels en het afregelen van het geluid. Wij bellen u binnen enkele uren om de afspraak in te plannen."
        />
      </Vlak>

      <Vlak toon="oppervlak" labelledBy="stappen">
        <Kop
          id="stappen"
          bovenkop="Zo werkt het"
        titel="Zo verloopt de soundbar-installatie"
        tekst="Van aanvraag tot het eerste nummer dat u hoort: vier stappen, één bezoek."
        />
        {/* `Werkwijze` uit de sectiebibliotheek beschrijft de drie stappen
            van het ophangen; een geluidsinstallatie heeft er vier en eindigt
            met afstellen en testen. Vandaar `Stappen` met de eigen lijst — en
            niet, zoals hiervoor, een eigen rij haarlijnen die er anders
            uitzag dan dezelfde drie stappen op de homepage. */}
        <div className="mt-12">
          <Stappen items={stappen} kolommen={4} />
        </div>
      </Vlak>

      <Vlak toon="wit" labelledBy="situaties">
        <Kop
          id="situaties"
          bovenkop="Uw situatie"
        titel="Soundbar installeren in elke situatie"
        tekst="Waarvoor u ons ook vraagt, onze monteurs zorgen voor het beste geluid in uw kamer."
        />
        <IconCardGrid items={situaties} columns={2} className="mt-12" />
      </Vlak>

      <Faqsectie
        titel="Veelgestelde vragen over soundbar-installatie"
        items={faqItems}
        toon="oppervlak"
      />

      <Vlak toon="wit" labelledBy="werkgebied">
        <Kop
          id="werkgebied"
          bovenkop="Werkgebied"
        titel="Soundbar installeren in ons werkgebied"
        tekst="Onze monteurs komen aan huis in Zuid-Holland, Noord-Holland, Utrecht en Noord-Brabant. Per provincie vindt u hieronder de plaatsen waar wij rijden."
        />
        {/* Ankertekst volgt de titel van de doelpagina ("Tv ophangen in
            <provincie>"); de href verandert niet. */}
        <ProvincieChips prefix="Tv ophangen in" withOverview />
        <RelatedLinks
          items={[
            ["/tv-ophangen", "Tv ophangen"],
            ["/diensten/tv-installatie", "Complete tv installatie"],
            ["/diensten/tv-instellen", "Tv hulp aan huis"],
            ["/prijzen", "Bekijk onze prijzen"],
          ]}
        />
      </Vlak>

      <Aanvraagsectie
        titel="Vraag een afspraak aan voor uw geluid"
        tekst={`Soundbar aansluiten en afstellen kost ${PRIJS}, een complete surroundset vanaf ${SURROUND}. Vast, inclusief voorrijkosten en btw. Wij bellen u binnen enkele uren om de afspraak in te plannen.`}
        beloftes={aanvraagBelofte}
      >
        {/* `variant` is het label waarop in GA4 wordt gemeten. Het blijft
            staan zoals het was, anders breekt de reeks van deze pagina. */}
        <ContactForm
          variant="soundbar"
          berichtLabel="Welke set heeft u?"
          berichtPlaceholder="Bijvoorbeeld: Sonos Beam met subwoofer, tv is een LG van 2023."
        />
      </Aanvraagsectie>
    </>
  );
}
