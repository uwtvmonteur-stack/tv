import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import Prijstabel from "@/components/Prijstabel";
import Reviews from "@/components/Reviews";
import { Icon, Stars } from "@/components/Icon";
import {
  Vertrouwensrij,
  CheckList,
  HeroActions,
  HowItWorks,
  PageHero,
  Section,
  SectionHeading,
  ServiceCards,
  TrustBar,
  USPS_BREED,
} from "@/components/sections";
import { BAND_UITSPRAKEN, HERO_PRIJZEN, faqAlgemeen, type FaqItem } from "@/lib/content";
import { provincies, stedenInProvincie } from "@/lib/steden";
import { faqJsonLd, pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";

const meta = pageMeta({
  title: "Tv monteur aan huis",
  description:
    "Tv monteur aan huis? Ophangen vanaf €99, aansluiten en instellen, of een storing verhelpen vanaf €60. Vaste prijs, incl. voorrijkosten en btw.",
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
 * De veelgestelde vragen van de homepage: eerst de twee die bij het
 * kopzoekwoord van deze pagina horen, daarna de algemene set.
 *
 * "Wat doet een tv monteur precies?" is wat iemand intikt die het woord wel
 * kent maar niet weet wat hij ervoor terugkrijgt. "Repareren jullie ook
 * kapotte tv's?" houdt de verkeerde aanvraag tegen vóór het formulier in
 * plaats van erna — het zoektermenrapport laat zien dat er reparatiezoekers
 * op deze woorden binnenkomen, en een eerlijk nee is goedkoper dan een
 * aanvraag die toch afvalt.
 *
 * Beide staan zichtbaar in het FAQ-blok onderaan, want ze gaan ook het
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
 * Wat de offerteaanvraag wél en niet van iemand vraagt.
 *
 * De laatste regel ging over avond en weekend; dat staat op deze pagina al in
 * de bewijsbalk en in de FAQ. Wie hier staat heeft die vraag dus gehad en
 * heeft er één over: wanneer kan het? Daarom staat daar nu de
 * beschikbaarheid, dezelfde als op de stadpagina's.
 */
const offerteBelofte = [
  "Vrijblijvend: u zit aan niets vast tot u ja zegt",
  "Het bedrag is inclusief voorrijkosten en btw",
  "Geen aanbetaling — u betaalt pas na afloop",
  "Schade door ons werk is verzekerd — wij lossen het op",
  "Vaak al binnen 24 uur een afspraak mogelijk",
];

/**
 * De bewijsregel onder de heroknoppen.
 *
 * Het telefoonnummer staat hier bewust niet, ook niet als knop ernaast: één
 * actie per scherm. Deze regel is er om die ene actie te rechtvaardigen, niet
 * om er een tweede naast te zetten.
 */
function HeroBewijs() {
  return (
    <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-ink-200">
      <li className="flex items-center gap-2">
        <Stars />
        <strong className="tabular font-semibold text-white">
          {SITE.reviews.score} / 5
        </strong>
        {/* Een score zonder vindplaats is een bewering. Staat de link naar het
            bedrijfsprofiel in SITE.reviews, dan kan de bezoeker hem nalezen. */}
        {SITE.reviews.url ? (
          <a
            href={SITE.reviews.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-white/40 underline-offset-4 hover:text-white"
          >
            {SITE.reviews.count} reviews
          </a>
        ) : (
          <span>{SITE.reviews.count} reviews</span>
        )}
      </li>
      <li className="flex items-center gap-2">
        <Icon name="shield" className="size-5 text-accent-300" />
        Volledig verzekerd
      </li>
      {/* Beschikbaarheid, en niet voor de tweede keer avond en weekend: die
          staat in de bewijsbalk direct hieronder. "Wanneer kan het?" is de
          vraag die een bezoeker met een tv in de doos als eerste heeft, en op
          de 32 stadpagina's staat dit antwoord al in de hero. */}
      <li className="flex items-center gap-2">
        <Icon name="clock" className="size-5 text-accent-300" />
        Vaak binnen 24 uur een afspraak
      </li>
    </ul>
  );
}

export default function Page() {
  return (
    <>
      {/* Het FAQPage-schema volgt exact de vragen die zichtbaar op deze
          pagina staan. De vier bezwaren zijn eruit omdat dat blok van de
          homepage af is — een schema dat vragen meldt die de bezoeker niet
          ziet, is een afkeuringsgrond voor het rich result. */}
      <JsonLd data={faqJsonLd(faqHome)} />

      {/* Deze pagina is niet de ophangpagina. Wie "tv monteur" zoekt, zoekt
          lang niet altijd een montage: in het zoektermenrapport zitten naast
          "tv monteur aan huis" ook "monteur tv aansluiten", "tv installateur"
          en een hele reeks storingen (geen geluid, geen wifi, geen zenders).
          De kop en de inleiding noemen daarom de volle breedte en openen niet
          met het ophangen. Het montagetarief hoort hier niet in de inleiding:
          dat is één van de vier diensten en staat verderop bij de prijzen. */}
      <PageHero
        groot
        prijsregel={HERO_PRIJZEN}
        eyebrow="Tv monteur aan huis"
        title="Tv monteur aan huis voor ophangen, aansluiten en problemen oplossen"
        lead={
          <>
            Eén monteur voor alles rond uw televisie: ophangen aan elke wand,
            een nieuwe tv aansluiten en instellen, een soundbar koppelen,
            kabels wegwerken en storingen verhelpen — van geen geluid tot geen
            wifi-verbinding.
          </>
        }
        video="/video/hero.mp4"
        videoStaand="/video/hero-staand.mp4"
        image="/images/hero-poster.jpg"
        imageAlt="Wandgemonteerde tv in een moderne woonkamer bij schemering"
      >
        <HeroActions tweedeHref="#prijs" tweedeLabel="Wat het kost" />
        <HeroBewijs />
      </PageHero>

      {/* Direct onder de hero, nog op donker: de band loopt door waar de hero
          ophoudt, zodat de overgang naar de lichte inhoud één moment is in
          plaats van twee. */}
      <Vertrouwensrij items={BAND_UITSPRAKEN} />

      <Section tone="surface">
        {/* De brede set: de standaardbalk gaat over waterpas hangen en het
            tarief per tv-formaat, en dat zegt niets tegen iemand die hier
            komt voor een storing of een soundbar. */}
        <TrustBar items={USPS_BREED} />
      </Section>

      <Section labelledBy="wat-doet-een-monteur">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              id="wat-doet-een-monteur"
              eyebrow="Wat doet een tv monteur?"
              title="Een tv monteur doet meer dan vier gaten boren"
              lead="Onze monteur komt bij u thuis en maakt het geheel af: van de beugel aan de muur tot de zenders op het scherm. U hoeft niets voor te bereiden en niets op te ruimen."
            />
            <CheckList items={watEenMonteurDoet} className="mt-8 text-lg" />
            {/* Dit hoort hier en niet alleen in de FAQ: "tv monteur" trekt
                ook zoekers met een kapot scherm. Wie dat hier leest, haakt af
                vóór het formulier in plaats van erna — dat scheelt een
                aanvraag die toch nee wordt. */}
            <p className="mt-6 text-ink-600">
              Wat wij niet doen: een kapot scherm of defecte elektronica
              repareren. Gaat het om een storing in beeld, geluid of verbinding,
              dan lossen we dat wél op —{" "}
              <Link href="/diensten/tv-instellen" className="link">
                bekijk onze tv hulp aan huis
              </Link>
              . Veelvoorkomend:{" "}
              <Link href="/tv-geen-geluid" className="link">
                geen geluid op de tv
              </Link>{" "}
              of{" "}
              <Link href="/tv-geen-wifi" className="link">
                geen wifi-verbinding
              </Link>
              .
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lift">
            {/* Niet tv-beugel-detail.jpg: die foto toont een beugel die fysiek
                niet kan bestaan — de arm raakt alleen de rechterrand van het
                scherm, zonder VESA-bevestiging. Op de homepage van een
                tv-ophangbedrijf is dat precies het verkeerde beeld. */}
            <Image
              src="/images/monteur-aan-het-werk.jpg"
              alt="Monteur van Uw TV Monteur hangt een televisie waterpas aan de wand"
              fill
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      <Section tone="surface" labelledBy="diensten">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="diensten"
            eyebrow="Onze diensten"
            // Niet nóg een keer "ophangen, aansluiten, instellen": die
            // opsomming staat al in de H1, in de heroinleiding en in de
            // sectie hierboven. Deze kop gaat over kiezen, niet over
            // opsommen.
            title="Waarvoor u onze monteur kunt inschakelen"
            lead="Eén monteur, één afspraak — of het nu om de tv, de soundbar, de kabels of de instellingen gaat."
          />
          <Link href="/diensten" className="btn-ghost shrink-0">
            Alle diensten
            <Icon name="arrow-right" className="size-4" />
          </Link>
        </div>
        <div className="mt-12">
          <ServiceCards />
        </div>
      </Section>

      <Section labelledBy="werkwijze">
        <SectionHeading
          id="werkwijze"
          center
          eyebrow="Zo werkt het"
          // "Tot waterpas" dekt alleen het ophangen; deze pagina draagt vier
          // diensten. Op /tv-ophangen mag die kop wél, daar gaat het er
          // letterlijk om.
          title="Van aanvraag tot werkende tv in drie stappen"
          lead="U vraagt aan, u krijgt het bedrag, wij doen het werk. Daartussen hoeft u niets uit te zoeken."
        />
        <div className="mt-14">
          <HowItWorks />
        </div>
      </Section>

      <Section labelledBy="prijs">
        <SectionHeading
          id="prijs"
          eyebrow="Wat het kost"
          title="Wat kost een tv monteur aan huis?"
          lead="Elke dienst heeft een vast bedrag, inclusief voorrijkosten en btw. Alleen het ophangen hangt af van het formaat van uw tv — uw muurtype verandert er niets aan."
        />
        <div className="mt-12">
          {/* De volledige prijslijst en niet de drie montagekaarten. Die
              kaarten gaan alleen over het ophangen, en dat is één van de vier
              diensten: wie hier komt voor een storing, een soundbar of een
              installatie moet zijn eigen bedrag kunnen vinden. De drie
              formaten staan volledig uitgesplitst op /tv-ophangen en
              /prijzen, waar de bezoeker die keuze al gemaakt heeft. */}
          <Prijstabel />
        </div>
        <p className="mt-8">
          <Link href="/prijzen" className="link inline-flex min-h-11 items-center">
            Alle tarieven en wat er altijd bij zit
          </Link>
        </p>
      </Section>

      {/* Eigen sectie met eigen achtergrond; staat hier tussen de prijslijst
          (surface) en het werkgebied (wit). */}
      <Reviews />

      <Section labelledBy="werkgebied">
        <SectionHeading
          id="werkgebied"
          center
          eyebrow="Werkgebied"
          title="Een tv monteur uit uw eigen regio"
          lead="Wij rijden dagelijks in Zuid-Holland, Noord-Holland, Utrecht en Noord-Brabant. Kies uw provincie of uw plaats."
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {provincies.map((provincie) => (
            <li key={provincie.slug} className="card flex flex-col p-6">
              {/* De provincienaam is geen link, de regel onderaan wel: twee
                  links naar dezelfde pagina in één kaart verdelen de waarde van
                  die link over twee ankerteksten. */}
              <h3 className="text-h3">{provincie.naam}</h3>
              <ul className="mt-3">
                {stedenInProvincie(provincie.slug)
                  .slice(0, 3)
                  .map((stad) => (
                    <li key={stad.slug}>
                      {/* Ankertekst volgt de titel van de doelpagina ("Tv
                          ophangen in <stad>") en niet "tv monteur <stad>": dat
                          laatste is in het Nederlands de reparatieterm. */}
                      <Link
                        href={`/tv-ophangen/${stad.slug}`}
                        className="link inline-flex min-h-11 items-center"
                      >
                        Tv ophangen in {stad.naam}
                      </Link>
                    </li>
                  ))}
              </ul>
              <Link
                href={`/werkgebied/${provincie.slug}`}
                className="mt-auto flex min-h-11 items-center gap-1.5 pt-4 font-semibold text-accent-700 hover:text-accent-800"
              >
                Alle plaatsen in {provincie.naam}
                <Icon name="arrow-right" className="size-4" />
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex justify-center">
          <Link href="/werkgebied" className="btn-ghost">
            Het volledige werkgebied
            <Icon name="arrow-right" className="size-4" />
          </Link>
        </div>
      </Section>

      <Section tone="surface" labelledBy="faq">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <SectionHeading
            id="faq"
            eyebrow="Veelgestelde vragen"
            title="Goed om te weten voordat de monteur komt"
            lead={
              <>
                Staat uw vraag er niet bij? Zet hem in het{" "}
                <Link href="#offerte" className="link">
                  aanvraagformulier
                </Link>{" "}
                — dan belt de monteur u erover.
              </>
            }
          />
          <Faq items={faqHome} />
        </div>
      </Section>

      {/* Het formulier staat op de pagina zelf en niet achter een knop naar
          /contact: dat was een paginawissel op het moment dat iemand besloten
          heeft, en dat is de stap waar verkeer het makkelijkst verdwijnt. */}
      <Section id="offerte" labelledBy="offerte-kop">
        <div className="flex flex-col-reverse gap-10 lg:grid lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div>
            <SectionHeading
              id="offerte-kop"
              eyebrow="Afspraak aanvragen"
              title="Vertel kort wat er moet gebeuren"
              lead="Vier velden en u bent klaar: uw naam, uw telefoonnummer, uw postcode en wat er moet gebeuren. Wij bellen u binnen enkele uren om het tarief te bevestigen."
            />
            <CheckList items={offerteBelofte} className="mt-8" />
          </div>
          <ContactForm
            variant="home"
            // Niet "uw tv en uw muur": dat vraagt om een montage terwijl deze
            // pagina ook de aanvragen voor aansluiten, instellen en storingen
            // moet opvangen. De voorbeeldtekst noemt daarom allebei de
            // soorten klus, zodat de bezoeker ziet dat zijn vraag hier hoort.
            berichtLabel="Wat moet er gebeuren?"
            berichtPlaceholder="Bijvoorbeeld: 55 inch Samsung ophangen op een gipswand. Of: sinds gisteren geen geluid meer op mijn tv."
          />
        </div>
      </Section>
    </>
  );
}
