import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import HeroVideo from "@/components/HeroVideo";
import JsonLd from "@/components/JsonLd";
import Prijstabel from "@/components/Prijstabel";
import Reviews from "@/components/Reviews";
import { Icon, Stars } from "@/components/Icon";
import {
  Aanvraagsectie,
  Band,
  BEWIJS_BREED,
  Bewijsrij,
  Dienstenlijst,
  Faqsectie,
  Hero,
  HeroKnoppen,
  Kop,
  Vinkjes,
  Vlak,
  Werkwijze,
} from "@/components/sections";
import { BELOFTE, faqAlgemeen, type FaqItem } from "@/lib/content";
import { provincies, stedenInProvincie } from "@/lib/steden";
import { faqJsonLd, pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";

const meta = pageMeta({
  title: "Tv monteur aan huis",
  description:
    "Tv monteur aan huis? Ophangen vanaf €99, aansluiten en instellen, of een storing verhelpen voor €60. Vaste prijs, incl. voorrijkosten en btw.",
  path: "/",
});

export const metadata: Metadata = {
  ...meta,
  title: {
    /**
     * De homepage staat op "tv monteur (aan huis)", /tv-ophangen op "tv
     * (laten) ophangen". Twee verschillende kopzoekwoorden, dus geen
     * kannibalisatie meer — eerder stonden beide titels op "tv ophangen" en
     * koos Google de homepage, waarna de dienstpagina nul vertoningen kreeg.
     *
     * Hier stond het commentaar dat "tv monteur" in het Nederlands vooral een
     * reparatieterm zou zijn. **Het eigen zoektermenrapport weerlegt dat.**
     * Over 90 dagen: "tv monteur aan huis" 140 vertoningen / 34 klikken /
     * 2,5 conversies, "tv monteur" 61 / 6 / 0,5, plus "tv installateur",
     * "tv montage service" en "tv installation service". Reparatiezoekers
     * lekten er drie vertoningen in. Het cluster is koopintentie en het
     * converteert — vandaar deze titel.
     */
    absolute: "Tv monteur aan huis voor ophangen, aansluiten en hulp",
  },
};

/**
 * Wat een tv monteur bij u thuis doet.
 *
 * Dit blok verving de lijst met herkenningspunten ("de tv staat nog in de
 * doos…"). Die ging alleen over ophangen, terwijl deze pagina op "tv monteur
 * aan huis" staat en vier diensten dekt — en het verhaal stond al sterker op
 * /tv-ophangen zelf. Wie "tv monteur" zoekt, zoekt een vakman en weet vaak
 * niet wat die precies komt doen; dat antwoord hoort boven in de pagina te
 * staan en niet verstopt in de FAQ.
 *
 * De volgorde is niet willekeurig: het ophangen staat er wel in, maar niet
 * als eerste én tweede punt. Dat maakte de lijst alsnog een ophanglijst,
 * terwijl de helft van de aanvragen over aansluiten, instellen en storingen
 * gaat.
 */
const watEenMonteurDoet = [
  "Een nieuwe tv uitpakken, plaatsen of ophangen en gebruiksklaar maken",
  "De juiste beugel bepalen en waterpas monteren, op het muurtype dat u heeft",
  "Soundbar, mediabox, spelcomputer en ontvanger aansluiten en testen",
  "Zenders, wifi, apps en beeld- en geluidsinstellingen goed zetten",
  "Storingen verhelpen: geen geluid, geen zenders of geen wifi-verbinding",
  "Kabels wegwerken, langs de muur of volledig uit het zicht",
];

/**
 * De veelgestelde vragen van de homepage: eerst de drie die bij het
 * kopzoekwoord van deze pagina horen, daarna de algemene set.
 *
 * "Wat doet een tv monteur precies?" is wat iemand intikt die het woord wel
 * kent maar niet weet wat hij ervoor terugkrijgt. "Repareren jullie ook
 * kapotte tv's?" houdt de verkeerde aanvraag tegen vóór het formulier in
 * plaats van erna — het zoektermenrapport laat zien dat er reparatiezoekers
 * op deze woorden binnenkomen, en een eerlijk nee is goedkoper dan een
 * aanvraag die toch afvalt.
 *
 * Alle drie staan zichtbaar in het FAQ-blok onderaan, want ze gaan ook het
 * FAQPage-schema in; een schema met vragen die de bezoeker niet ziet is een
 * reden voor afkeuring van het rich result.
 */
const faqHome: FaqItem[] = [
  {
    q: "Wat doet een tv monteur precies?",
    a: "Onze tv monteur komt bij u thuis en maakt het geheel af: hij bepaalt welke beugel bij uw tv en uw muurtype past, monteert die waterpas, hangt de tv op de kijkhoogte van uw bank, sluit uw soundbar en randapparatuur aan, werkt de kabels weg en stelt zenders, wifi en apps in. Daarna test hij alles, ruimt hij op en neemt hij het boorafval mee.",
  },
  {
    q: "Repareren jullie ook kapotte tv's?",
    a: "Nee. Een kapot scherm of defecte elektronica repareren wij niet; daarvoor moet u bij de fabrikant of een reparateur zijn. Gaat het om geen beeld, geen geluid, geen zenders of geen wifi-verbinding, dan is dat meestal een instelling, een kabel of een aansluiting — en dat verhelpen wij wél bij u thuis.",
  },
  {
    // Deze vraag mist op de site terwijl de helft van het zoekverkeer hem
    // stelt: "monteur tv aansluiten", "tv aansluiten", "hulp bij installeren
    // tv", "televisie monteur aan huis". Die mensen hebben hun tv al.
    q: "Mijn tv hangt er al — komen jullie ook voor alleen aansluiten of instellen?",
    a: "Ja. Een montage is niet nodig om ons te laten komen. Wij sluiten een bestaande tv aan op uw apparatuur, koppelen een soundbar, stemmen de zenders opnieuw af, zetten wifi en apps goed of verhelpen een storing in beeld, geluid of verbinding. Dat is tv hulp aan huis en kost €60, inclusief voorrijkosten en btw.",
  },
  ...faqAlgemeen,
];

/**
 * Wat de afspraakaanvraag wél en niet van iemand vraagt.
 *
 * De laatste regel ging over avond en weekend; dat staat op deze pagina al in
 * de bewijsrij en in de FAQ. Wie hier staat heeft die vraag dus gehad en
 * heeft er één over: wanneer kan het? Daarom staat daar nu de
 * beschikbaarheid, dezelfde als op de stadpagina's.
 */
const aanvraagBelofte = [
  BELOFTE.vrijblijvend,
  BELOFTE.inclusief,
  BELOFTE.geenAanbetaling,
  BELOFTE.verzekerd,
  BELOFTE.snel,
];

/**
 * De bewijsregel onder de heroknoppen.
 *
 * De hero is bijna-zwart, dus staat deze regel in lichte inkt.
 *
 * Het telefoonnummer staat hier bewust niet, ook niet als knop ernaast: één
 * actie per scherm. Deze regel is er om die ene actie te rechtvaardigen, niet
 * om er een tweede naast te zetten.
 */
function HeroBewijs() {
  return (
    <ul className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 text-ink-200">
      <li className="flex items-center gap-2">
        <Stars dark />
        <strong className="cijfers font-semibold text-white">
          {SITE.reviews.score} / 5
        </strong>
        {/* Een score zonder vindplaats is een bewering. Staat de link naar het
            bedrijfsprofiel in SITE.reviews, dan kan de bezoeker hem nalezen. */}
        {SITE.reviews.url ? (
          <a
            href={SITE.reviews.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-ink-500 underline-offset-4 hover:text-white"
          >
            {SITE.reviews.count} reviews
          </a>
        ) : (
          <span>{SITE.reviews.count} reviews</span>
        )}
      </li>
      <li className="flex items-center gap-2">
        <Icon name="shield" className="size-5 text-amber-300" />
        Volledig verzekerd
      </li>
      {/* Beschikbaarheid, en niet voor de tweede keer avond en weekend: die
          staat in de bewijsrij direct hieronder. "Wanneer kan het?" is de
          vraag die een bezoeker met een tv in de doos als eerste heeft, en op
          de 32 stadpagina's staat dit antwoord al in de hero. */}
      <li className="flex items-center gap-2">
        <Icon name="clock" className="size-5 text-amber-300" />
        Vaak binnen 24 uur een afspraak
      </li>
    </ul>
  );
}

export default function Page() {
  return (
    <>
      {/* Het FAQPage-schema volgt exact de vragen die zichtbaar op deze
          pagina staan. Een schema dat vragen meldt die de bezoeker niet ziet,
          is een afkeuringsgrond voor het rich result. */}
      <JsonLd data={faqJsonLd(faqHome)} />

      {/* Deze pagina is niet de ophangpagina. Wie "tv monteur" zoekt, zoekt
          lang niet altijd een montage: in het zoektermenrapport zitten naast
          "tv monteur aan huis" ook "monteur tv aansluiten", "tv installateur"
          en een hele reeks storingen (geen geluid, geen wifi, geen zenders).
          De kop en de inleiding noemen daarom de volle breedte en openen niet
          met het ophangen.

          Geen tarieven in deze hero. De drie montagebedragen stonden hier als
          pillen, maar ze horen bij één van de vier diensten: wie met "geen
          geluid" of "tv aansluiten" binnenkomt, leest in de eerste seconde een
          prijs voor iets anders dan waarvoor hij komt. Erger: €99 naast een
          kop over storingen verhelpen leest als de prijs van dát. De knop "Wat
          het kost" brengt hem naar de prijssectie, en /prijzen en
          /tv-ophangen openen nog wel met de bedragen — daar is de bezoeker er
          al aan toe. */}
      <Hero
        groot
        bovenkop="Tv monteur aan huis"
        titel="Tv monteur aan huis voor ophangen, aansluiten en problemen oplossen"
        inleiding={
          <>
            Eén monteur voor alles rond uw televisie: ophangen aan elke wand,
            een nieuwe tv aansluiten en instellen, een soundbar koppelen,
            kabels wegwerken en storingen verhelpen — van geen geluid tot geen
            wifi-verbinding.
          </>
        }
        // Mensen in beeld en niet het eindresultaat. De sfeerfilm van de
        // woonkamer bij schemering staat nu verderop op deze pagina, bij
        // "wat doet een tv monteur": op een bijna-zwarte hero werd die
        // donkere opname één grijs vlak, en hij liet bovendien niet zien wie
        // er straks bij iemand binnenkomt. Dat laatste is de vraag die deze
        // bezoeker heeft.
        beeld="/images/team-twee-monteurs.webp"
        beeldAlt="Twee monteurs van Uw TV Monteur tillen samen een grote televisie op de wandbeugel"
      >
        <HeroKnoppen tweedeHref="#prijs" tweedeLabel="Wat het kost" />
        <HeroBewijs />
      </Hero>

      {/* Direct onder de hero: de lopende band met korte uitspraken die
          elders op de site woordelijk worden waargemaakt. Hij sluit het
          donkere vlak van de hero af en markeert de overgang naar de inhoud. */}
      <Band />

      {/* De diensten staan direct onder de hero, op verzoek van de eigenaar
          — en het past bij wat deze pagina geworden is. De hero noemt vier
          diensten en geen bedragen meer, dus de eerste vraag van de bezoeker
          is "doet u ook wat ík nodig heb?". Deze rij kaarten is dat antwoord:
          hij kiest zijn klus en zit in één klik op de pagina die er precies
          over gaat. Het verhaal over wat een monteur doet staat er direct
          onder, voor wie dat eerst wil weten.

          Deze sectie is daarom wit en de sectie eronder grijs, en niet
          andersom: de pagina wisselt wit en grijs af, want dat is het enige
          wat twee secties van elkaar scheidt. */}
      <Vlak toon="wit" labelledBy="diensten">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Kop
            id="diensten"
            bovenkop="Onze diensten"
            // Niet nóg een keer "ophangen, aansluiten, instellen": die
            // opsomming staat al in de H1 en in de heroinleiding direct
            // hierboven. Deze kop gaat over kiezen, niet over opsommen.
            titel="Waarvoor u onze monteur kunt inschakelen"
            tekst="Eén monteur, één afspraak — of het nu om de tv, de soundbar, de kabels of de instellingen gaat."
          />
          <Link href="/diensten" className="knop-lijn shrink-0">
            Alle diensten
            <Icon name="arrow-right" className="size-4" />
          </Link>
        </div>
        <div className="mt-12">
          <Dienstenlijst />
        </div>
      </Vlak>

      <Vlak toon="oppervlak" labelledBy="wat-doet-een-monteur">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <Kop
              id="wat-doet-een-monteur"
              bovenkop="Wat doet een tv monteur?"
              titel="Een tv monteur doet meer dan vier gaten boren"
              tekst="Onze monteur komt bij u thuis en maakt het geheel af: van de beugel aan de muur tot de zenders op het scherm. U hoeft niets voor te bereiden en niets op te ruimen."
            />
            <Vinkjes items={watEenMonteurDoet} className="mt-8 text-lg" />
            {/* Dit hoort hier en niet alleen in de FAQ: "tv monteur" trekt
                ook zoekers met een kapot scherm. Wie dat hier leest, haakt af
                vóór het formulier in plaats van erna — dat scheelt een
                aanvraag die toch nee wordt. */}
            <p className="mt-7 text-ink-600">
              Wat wij niet doen: een kapot scherm of defecte elektronica
              repareren. Gaat het om een storing in beeld, geluid of verbinding,
              dan lossen we dat wél op —{" "}
              <Link href="/diensten/tv-instellen" className="verwijzing">
                bekijk onze tv hulp aan huis
              </Link>
              . Veelvoorkomend:{" "}
              <Link href="/tv-geen-geluid" className="verwijzing">
                geen geluid op de tv
              </Link>{" "}
              of{" "}
              <Link href="/tv-geen-wifi" className="verwijzing">
                geen wifi-verbinding
              </Link>
              .
            </p>
          </div>
          {/* De sfeerfilm van het eindresultaat: een woonkamer bij
              schemering, met de tv aan de muur. Hij stond eerder in de hero,
              waar hij op het bijna-zwarte vlak wegviel; hier, in een witte
              sectie en in een lijst, leest hij als een ingelijste foto die
              gaat bewegen. De posterafbeelding staat eronder en blijft staan
              als de film niet mag spelen. */}
          <div className="komt-op relative aspect-[16/10] overflow-hidden rounded-3xl bg-ink-100 shadow-card ring-1 ring-ink-100">
            <Image
              src="/images/hero-poster.webp"
              alt="Wandgemonteerde televisie in een woonkamer bij schemering"
              fill
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-cover"
            />
            <HeroVideo src="/video/hero.mp4" />
          </div>
        </div>
      </Vlak>

      <Vlak toon="wit" labelledBy="werkwijze">
        <Kop
          id="werkwijze"
          bovenkop="Zo werkt het"
          // "Tot waterpas" dekt alleen het ophangen; deze pagina draagt vier
          // diensten. Op /tv-ophangen mag die kop wél, daar gaat het er
          // letterlijk om.
        titel="Van aanvraag tot werkende tv in drie stappen"
        tekst="U vraagt aan, u krijgt het bedrag, wij doen het werk. Daartussen hoeft u niets uit te zoeken."
        />
        <div className="mt-14">
          <Werkwijze />
        </div>
      </Vlak>

      <Vlak toon="oppervlak" labelledBy="prijs-kop" id="prijs">
        <Kop
          id="prijs-kop"
          bovenkop="Wat het kost"
        titel="Wat kost een tv monteur aan huis?"
        tekst="Elke dienst heeft een vast bedrag, inclusief voorrijkosten en btw. Alleen het ophangen hangt af van het formaat van uw tv — uw muurtype verandert er niets aan."
        />
        <div className="mt-12">
          {/* De volledige prijslijst en niet de drie montagekolommen. Die
              gaan alleen over het ophangen, en dat is één van de vier
              diensten: wie hier komt voor een storing, een soundbar of een
              installatie moet zijn eigen bedrag kunnen vinden. De drie
              formaten staan volledig uitgesplitst op /tv-ophangen en
              /prijzen, waar de bezoeker die keuze al gemaakt heeft. */}
          <Prijstabel />
        </div>
        <p className="mt-8">
          <Link
            href="/prijzen"
            className="verwijzing inline-flex min-h-11 items-center"
          >
            Alle tarieven en wat er altijd bij zit
          </Link>
        </p>
      </Vlak>

      {/* Het donkere middenblok: wie u binnenlaat, en waarom dat veilig is.
          Het stond direct onder de hero, en daar liep het vast. De hero is
          bijna-zwart, de band eronder ook, en dit vlak ook — samen ruim 1600
          pixels zwart voordat er één lichte sectie kwam, terwijl de huisstijl
          van de andere eigen sites juist één donkere band in het mídden van
          de pagina heeft en de rest licht laat.

          Hier staat hij bovendien op een beter moment. De bezoeker heeft net
          het bedrag gezien; de vraag die dan opkomt is niet "wat kost het"
          maar "wie komt er straks bij mij binnen". */}
      <Vlak toon="donker" labelledBy="vertrouwen">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          <div>
            <Kop
              id="vertrouwen"
              donker
              bovenkop="Waarom wij"
              titel="U laat iemand uw huiskamer binnen"
              tekst="Daarom werken wij met eigen monteurs in loondienst, met een bedrag dat vooraf vaststaat en werk dat verzekerd is."
            />
            <div className="komt-op relative mt-9 aspect-[16/10] overflow-hidden rounded-3xl ring-1 ring-white/15">
              <Image
                src="/images/uitleg-aan-klant.webp"
                alt="Monteur van Uw TV Monteur legt een echtpaar de afstandsbediening uit bij hun pas opgehangen televisie"
                fill
                sizes="(min-width: 1024px) 520px, 100vw"
                className="object-cover"
              />
            </div>
            <p className="mt-4 text-sm text-ink-400">
              Uw TV Monteur staat ingeschreven bij de KvK onder nummer{" "}
              <span className="cijfers">{SITE.kvk}</span>.
            </p>
          </div>
          {/* `BEWIJS_BREED` en niet de standaardrij: die gaat over waterpas
              hangen en het tarief per tv-formaat, en dat zegt niets tegen
              iemand die hier komt voor een storing of een soundbar.

              En `Bewijsrij` en niet een eigen lus: hier stonden dertig regels
              die precies dit component natekenden — zelfde kaart, zelfde
              pictogramvlak, zelfde kopmaat. */}
          <Bewijsrij donker items={BEWIJS_BREED} kolommen={2} />
        </div>
      </Vlak>

      {/* Eigen sectie met eigen achtergrond; staat hier tussen de
          vertrouwensband en het werkgebied. */}
      <Reviews toon="wit" />

      <Vlak toon="oppervlak" labelledBy="werkgebied">
        <Kop
          id="werkgebied"
          bovenkop="Werkgebied"
        titel="Een tv monteur uit uw eigen regio"
        tekst="Wij rijden dagelijks in Zuid-Holland, Noord-Holland, Utrecht en Noord-Brabant. Kies uw provincie of uw plaats."
        />
        <div className="komt-op relative mt-12 aspect-[21/9] overflow-hidden rounded-3xl bg-ink-100 shadow-card ring-1 ring-ink-100 sm:aspect-[21/7]">
          <Image
            src="/images/aan-de-deur.webp"
            alt="Monteur van Uw TV Monteur wordt begroet aan de voordeur van een Nederlandse rijtjeswoning"
            fill
            sizes="(min-width: 1280px) 1216px, 100vw"
            className="object-cover object-center"
          />
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {provincies.map((provincie) => (
            <li
              key={provincie.slug}
              className="komt-op paneel flex flex-col p-5 sm:p-6"
            >
              {/* De provincienaam is geen link, de regel onderaan wel: twee
                  links naar dezelfde pagina in één kolom verdelen de waarde
                  van die link over twee ankerteksten. */}
              <h3 className="text-h3">{provincie.naam}</h3>
              <ul className="mt-2">
                {stedenInProvincie(provincie.slug)
                  .slice(0, 3)
                  .map((stad) => (
                    <li key={stad.slug}>
                      {/* Ankertekst volgt de titel van de doelpagina ("Tv
                          ophangen in <stad>") en niet "tv monteur <stad>": dat
                          laatste is in het Nederlands de reparatieterm. */}
                      <Link
                        href={`/tv-ophangen/${stad.slug}`}
                        className="inline-flex min-h-11 items-center text-sm text-ink-700 underline-offset-4 hover:text-amber-800 hover:underline"
                      >
                        Tv ophangen in {stad.naam}
                      </Link>
                    </li>
                  ))}
              </ul>
              <Link
                href={`/werkgebied/${provincie.slug}`}
                className="mt-auto flex min-h-11 items-center gap-1.5 pt-3 text-sm font-semibold text-amber-800 hover:text-amber-700"
              >
                Alle plaatsen in {provincie.naam}
                <Icon name="arrow-right" className="size-4" />
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <Link href="/werkgebied" className="knop-lijn">
            Het volledige werkgebied
            <Icon name="arrow-right" className="size-4" />
          </Link>
        </div>
      </Vlak>

      <Faqsectie
        titel="Goed om te weten voordat de monteur komt"
        items={faqHome}
      />

      {/* Het formulier staat op de pagina zelf en niet achter een knop naar
          /contact: dat was een paginawissel op het moment dat iemand besloten
          heeft, en dat is de stap waar verkeer het makkelijkst verdwijnt. */}
      <Aanvraagsectie
        titel="Vertel kort wat er moet gebeuren"
        tekst="Vier velden en u bent klaar: uw naam, uw telefoonnummer, uw postcode en wat er moet gebeuren. Wij bellen u binnen enkele uren om het tarief te bevestigen."
        beloftes={aanvraagBelofte}
      >
        <ContactForm
          variant="home"
          // Niet "uw tv en uw muur": dat vraagt om een montage terwijl deze
          // pagina ook de aanvragen voor aansluiten, instellen en storingen
          // moet opvangen. De voorbeeldtekst noemt daarom allebei de
          // soorten klus, zodat de bezoeker ziet dat zijn vraag hier hoort.
          berichtLabel="Wat moet er gebeuren?"
          berichtPlaceholder="Bijvoorbeeld: 55 inch Samsung ophangen op een gipswand. Of: sinds gisteren geen geluid meer op mijn tv."
        />
      </Aanvraagsectie>
    </>
  );
}
