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
  PRIJZEN_KORT,
  TV_INSTALLATIE_PRIJS,
  VANAF_PRIJS,
  type FaqItem,
} from "@/lib/content";
import { faqJsonLd, pageMeta, serviceJsonLd } from "@/lib/seo";

/**
 * Het vaste bedrag van deze dienst. Komt uit `lib/content.ts`, waar de regel
 * "Tv plaatsen en aansluiten (zonder ophangen)" in `tarieven` hem ook
 * afleest.
 *
 * Het staat hier bóven de metadata, zodat de paginatitel en de
 * meta-description hetzelfde bedrag gebruiken als de kop, het prijsblok, het
 * afspraakblok en het schema. Tot 16-11-2026 stond €70 in vijf van die zes
 * plekken los ingetikt, en een prijswijziging kwam dus half door.
 */
const PRIJS = TV_INSTALLATIE_PRIJS;

export const metadata = pageMeta({
  title: `Tv laten installeren — vaste prijs ${PRIJS}`,
  description: `Nieuwe tv gekocht? Wij maken hem gebruiksklaar aan huis: aansluiten, zenders, wifi en apps instellen en uitleg. Vaste prijs ${PRIJS}. Ophangen kan als optie.`,
  path: "/diensten/tv-installatie",
});

const inbegrepen = [
  "Tv plaatsen en uitpakken",
  "Apparatuur aansluiten: soundbar, decoder, mediaspeler of spelcomputer",
  "Zenders zoeken en overzichtelijk sorteren",
  "Tv verbinden met wifi",
  "Streaming-apps installeren en inloggen",
  "Beeld en geluid zorgvuldig instellen",
  "Rustige uitleg aan huis, in gewone taal",
  "Netjes opleveren, verpakkingsafval nemen we mee",
];

/** Wat het vaste bedrag dekt — korter dan `inbegrepen`, want dit staat naast het bedrag. */
const prijsDekking = [
  "Alle apparatuur aangesloten en gecontroleerd",
  "Zenders, wifi, apps, beeld en geluid ingesteld",
  "Uitleg aan huis, zo lang als u die nodig heeft",
  "Voorrijkosten en btw inbegrepen",
];

/** Wat de aanvraag zelf wel en niet van u vraagt — niet wat er in de prijs zit. */
const aanvraagBelofte = [
  `Vaste prijs van ${PRIJS}, inclusief voorrijkosten en btw`,
  BELOFTE.vrijblijvend,
  BELOFTE.geenAanbetaling,
  BELOFTE.avondWeekend,
];

const stappen = [
  {
    title: "Afspraak maken",
    text: "Vul het formulier in met uw gegevens en wat er moet gebeuren. Wij nemen binnen enkele uren contact met u op om een geschikt moment af te spreken.",
  },
  {
    // Niet "plaatsen of ophangen". Deze pagina verkoopt de vaste prijs van
    // EUR 60, en ophangen is een aparte dienst vanaf EUR 99. Een stap die
    // zegt dat de monteur de tv aan de muur hangt, belooft iets wat niet in
    // dat bedrag zit — en dat is precies het soort tegenspraak waar een
    // klant aan de deur achter komt.
    title: "Tv plaatsen en klaarzetten",
    text: "Onze monteur komt bij u thuis en plaatst uw tv op het meubel. Aan de muur hangen is een aparte dienst vanaf €99; zet het in uw aanvraag, dan rekenen wij het vooraf voor u uit.",
  },
  {
    title: "Aansluiten & instellen",
    text: "We sluiten de benodigde apparatuur aan en stellen wifi, zenders, apps, beeld en geluid in.",
  },
  {
    title: "Controleren & uitleggen",
    text: "We testen de complete installatie, leggen rustig uit hoe alles werkt en laten uw tv gebruiksklaar achter.",
  },
];

const apparatuur: IconCard[] = [
  {
    icon: <Icon name="speaker" />,
    h3: "Soundbar en audio",
    text: "Heeft u een soundbar of surround-systeem? Wij sluiten deze aan, bijvoorbeeld via HDMI ARC of eARC, en controleren of het geluid goed werkt.",
  },
  {
    icon: <Icon name="chat" />,
    h3: "Apple TV, Chromecast en mediaspelers",
    text: "Heeft u een Apple TV, Chromecast, Fire TV of andere mediaspeler? Wij sluiten deze aan, verbinden hem met internet en helpen met de gewenste apps.",
  },
  {
    icon: <Icon name="sliders" />,
    h3: "PlayStation, Xbox en Nintendo Switch",
    text: "Ook uw spelcomputer kunnen we aansluiten. Waar mogelijk controleren we instellingen zoals HDR en de geschikte beeldmodus voor gaming.",
  },
  {
    icon: <Icon name="tv" />,
    h3: "Tv-ontvanger en decoder",
    text: "We sluiten uw tv-ontvanger of decoder aan, zoeken de zenders en controleren of alles correct werkt.",
  },
];

const situaties: IconCard[] = [
  {
    icon: <Icon name="tv" />,
    h3: "Nieuwe tv gekocht",
    text: "Uw nieuwe televisie is binnen, maar u wilt hem niet zelf installeren? Wij pakken hem uit, plaatsen hem, sluiten alles aan en stellen hem volledig in. Na onze afspraak kunt u direct kijken.",
  },
  {
    icon: <Icon name="chat" />,
    h3: "Hulp omdat u niet technisch bent",
    text: "Geen probleem. Wij nemen de tijd om alles rustig uit te leggen. U hoeft geen technische kennis te hebben.",
  },
  {
    icon: <Icon name="sliders" />,
    h3: "Van oude naar nieuwe tv",
    text: "Een nieuwer of groter toestel in huis? Wij sluiten uw nieuwe tv aan, zetten uw zenders, apps en accounts weer klaar en ruimen de oude opstelling netjes op.",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "Kunnen jullie mijn tv ook ophangen?",
    a: "Ja. Het ophangen van uw tv aan de muur kan tijdens dezelfde afspraak: €99 tot 43 inch, €129 van 44 t/m 64 inch en €159 vanaf 65 inch, inclusief voorrijkosten en btw.",
  },
  {
    q: "Installeren jullie ook Netflix en andere apps?",
    a: "Ja. We kunnen streaming-apps installeren en instellen. Voor betaalde diensten gebruikt u uw eigen accountgegevens.",
  },
  {
    q: "Hoe lang duurt een tv installatie?",
    a: "Een standaardinstallatie duurt gemiddeld ongeveer 90 minuten. Een uitgebreidere installatie kan langer duren.",
  },
  {
    q: "Moet ik zelf een muurbeugel hebben?",
    a: "Dat hangt af van de montage. Heeft u nog geen geschikte muurbeugel? Neem dan vooraf contact met ons op.",
  },
  {
    q: "Werken jullie met alle tv-merken?",
    a: "We werken met de meeste bekende merken, waaronder Samsung, LG, Sony, Philips, TCL, Hisense en Panasonic.",
  },
];

export default function TvInstallatiePage() {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: "Tv installatie service",
          description:
            "Tv installatie aan huis: uw tv gebruiksklaar maken — apparatuur aansluiten, zenders, wifi en apps instellen, met uitleg. Ophangen mogelijk als optie.",
          path: "/diensten/tv-installatie",
          // Alleen de dienst die deze pagina zichtbaar aanbiedt. De soundbar
          // (€49) en de kabelgoot stonden hier ook, terwijl geen van die twee
          // bedragen op deze pagina voorkomt — en de kabelgoot is een
          // vanafprijs, die hier als hard bedrag werd vastgelegd. Google
          // vergelijkt schema met de zichtbare pagina.
          offers: [
            { name: "Tv installeren & gebruiksklaar maken", price: PRIJS },
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
              { name: "Tv installatie", href: "/diensten/tv-installatie" },
            ]}
          />
        }
        bovenkop={`Tv installatie · aan huis · vaste prijs ${PRIJS}`}
        titel="Tv installatie aan huis"
        inleiding="Uw nieuwe tv volledig geïnstalleerd en direct gebruiksklaar. Wij sluiten uw tv en apparatuur aan, stellen zenders, wifi, apps, beeld en geluid voor u in en leggen rustig uit hoe alles werkt."
        beeld="/images/dienst-tv-installatie.webp"
        beeldAlt="Volledig geïnstalleerde tv aan de muur in een moderne woonkamer"
      >
        <HeroKnoppen />
        <Vinkjes donker
          items={[
            "Zenders, wifi en streaming-apps ingesteld",
            "Soundbar, decoder en andere apparatuur aangesloten",
            "Beeld en geluid zorgvuldig ingesteld",
            "Tv ophangen aan de muur mogelijk als extra optie",
          ]}
          className="mt-8 grid gap-3 border-t border-white/15 pt-6 sm:grid-cols-2"
        />
      </Hero>

      <Vlak toon="wit" labelledBy="inbegrepen">
        <Kop
          id="inbegrepen"
          bovenkop="Wat u krijgt"
        titel="Wat is inbegrepen bij de tv installatie?"
        tekst="Een nieuwe televisie aansluiten is meer dan de stekker erin doen: zenders instellen, wifi verbinden en alle apparaten goed laten samenwerken. Onze monteur komt bij u thuis, sluit uw tv en apparatuur aan, stelt alles zorgvuldig in en legt daarna rustig uit hoe u de tv en afstandsbediening gebruikt. Eén afspraak, en uw nieuwe tv is direct gebruiksklaar."
        />
        <p className="mt-9 max-w-2xl text-ink-600">
          Bij een standaard tv installatie regelen wij onder andere:
        </p>
        <Vinkjes
          items={inbegrepen}
          className="mt-6 grid max-w-4xl gap-3.5 sm:grid-cols-2"
        />
      </Vlak>

      {/* Bewijs komt ná de belofte en vóór de prijs: eerst vertellen wat we
          leveren, dan laten zien dat we het leveren, dan wat het kost. */}
      <Reviews toon="oppervlak" />

      <Vlak id="prijs" toon="wit" labelledBy="prijs-kop">
        <Kop
          id="prijs-kop"
          bovenkop="Wat het kost"
        titel="Wat kost een tv installatie aan huis?"
        tekst="Eén vast bedrag voor de complete installatie, inclusief voorrijkosten en btw. Wat we vooraf afspreken, is wat u betaalt — geen verrassingen achteraf."
        />

        {/* Eén vast bedrag, en daarom géén `Prijsklassen`: dat blok hoort bij
            het ophangen, met drie formaten. Hier is het bedrag zelf het
            argument, dus staat het groot en alleen in een paneel met dezelfde
            amberen streep als het afspraakformulier — de twee plekken op deze
            pagina waar iemand iets beslist. */}
        <div className="mt-12 grid gap-8 lg:grid-cols-5 lg:gap-10">
          <div className="lg:col-span-2">
            <div className="paneel flex h-full flex-col justify-between border-t-4 border-t-amber-400 p-7">
              <div>
                <p className="bovenkop">Vaste prijs</p>
                <p className="cijfers mt-4 font-display text-prijs font-semibold text-ink-950">
                  {PRIJS}
                </p>
                <p className="mt-4 text-ink-600">
                  Voor de complete installatie, inclusief voorrijkosten en
                  btw. Geen vanafprijs en geen uurtarief: dit is het bedrag.
                </p>
              </div>
              <Link href="#afspraak" className="knop-vol knop-groot mt-8 w-full">
                Afspraak maken
                <Icon name="arrow-right" className="size-5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-h3">Dit bedrag dekt de hele installatie</h3>
            <Vinkjes items={prijsDekking} className="mt-5" />
            <p className="mt-7 text-ink-600">
              Wilt u de tv ook aan de muur? Het ophangen is apart werk met een
              eigen tarief per formaat,{" "}
              <Link href="/tv-ophangen" className="verwijzing">
                {PRIJZEN_KORT}
              </Link>
              . Zet het in uw aanvraag, dan doen wij het in dezelfde afspraak.
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
          bovenkop="Welke dienst past bij u?"
        titel="Tv laten installeren of alleen ophangen?"
        tekst="Twee verschillende klussen, twee verschillende prijzen. Hieronder staat welke bij uw situatie hoort."
        />
        <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-10">
          {/* Twee `paneel`-kaarten en niet twee blokken onder een dikke
              lijn: elke andere keuze-uit-twee op deze site staat in kaarten,
              en dit vlak is grijs, dus een witte kaart leest hier als een
              kaart. */}
          <div className="paneel p-6 sm:p-7">
            <h3 className="text-h3">Alleen tv ophangen</h3>
            <p className="mt-3 text-ink-600">
              Wilt u vooral dat uw televisie veilig en waterpas aan de muur
              wordt gemonteerd? Bekijk dan onze{" "}
              <Link href="/tv-ophangen" className="verwijzing">
                tv ophangservice
              </Link>{" "}
              vanaf {VANAF_PRIJS}, met een vaste prijs per tv-formaat.
            </p>
          </div>
          <div className="paneel p-6 sm:p-7">
            <h3 className="text-h3">Complete tv installatie</h3>
            <p className="mt-3 text-ink-600">
              Wilt u dat uw tv wordt aangesloten, met wifi wordt verbonden,
              zenders en apps krijgt, met uw apparatuur samenwerkt en aan u
              wordt uitgelegd? Dan is de complete tv installatie aan huis de
              beste keuze — voor een vaste prijs van {PRIJS}.
            </p>
          </div>
        </div>
        <p className="mt-9 max-w-3xl text-ink-600">
          Twijfelt u welke service bij u past? Zet het kort in het{" "}
          <Link href="#afspraak" className="verwijzing">
            afspraakformulier
          </Link>{" "}
          — wij denken graag met u mee.
        </p>
      </Vlak>

      <Vlak toon="wit" labelledBy="apparatuur">
        <Kop
          id="apparatuur"
          bovenkop="Alles in één bezoek"
        titel="Ook uw andere apparatuur aansluiten"
        tekst="Uw televisie staat meestal niet alleen. Daarom kunnen we ook de apparatuur rondom uw tv aansluiten en instellen."
        />
        <IconCardGrid items={apparatuur} columns={2} className="mt-12" />
      </Vlak>

      <Vlak toon="oppervlak" labelledBy="stappen">
        <Kop
          id="stappen"
          bovenkop="Zo werkt het"
        titel="Zo werkt onze tv installatie"
        tekst="Van aanvraag tot gebruiksklaar in vier stappen. U hoeft niets uit te zoeken."
        />
        {/* `Werkwijze` uit de sectiebibliotheek beschrijft de drie stappen
            van het ophangen; een installatie heeft er vier en noemt het
            plaatsen apart. Vandaar `Stappen` met de eigen lijst, in dezelfde
            vorm als die drie stappen op de homepage. */}
        <div className="mt-12">
          <Stappen items={stappen} kolommen={4} />
        </div>
      </Vlak>

      <Vlak toon="wit" labelledBy="situaties">
        <Kop
          id="situaties"
          bovenkop="Uw situatie"
        titel="Tv installatie voor iedere situatie"
        tekst="Of uw tv net is bezorgd of de oude wordt vervangen: wij maken hem gebruiksklaar."
        />
        <IconCardGrid items={situaties} columns={3} className="mt-12" />
        <InlineCta
          href="#afspraak"
          text="Vaste prijs vooraf. Wij gaan pas weg als uw tv staat of hangt, alle apparatuur is aangesloten en de zenders en apps werken. Wij bellen u binnen enkele uren om de afspraak in te plannen."
        />
      </Vlak>

      <Faqsectie
        titel="Veelgestelde vragen over tv installatie"
        items={faqItems}
        toon="oppervlak"
      />

      <Vlak toon="wit" labelledBy="werkgebied">
        <Kop
          id="werkgebied"
          bovenkop="Werkgebied"
        titel="Tv installatie aan huis in uw regio"
        tekst="Wij helpen klanten aan huis met tv installatie, montage en technische ondersteuning in Zuid-Holland, Noord-Holland, Utrecht en Noord-Brabant. Woont u in een andere plaats? Zet het in uw aanvraag — we bekijken graag of we u kunnen helpen."
        />
        {/* Ankertekst volgt de titel van de doelpagina ("Tv ophangen in
            <provincie>"); de href verandert niet. */}
        <ProvincieChips prefix="Tv ophangen in" withOverview />
        <RelatedLinks
          items={[
            ["/tv-ophangen", "Tv ophangen"],
            ["/diensten/soundbar-installatie", "Soundbar installeren"],
            ["/diensten/tv-instellen", "Tv hulp aan huis"],
            ["/prijzen", "Bekijk onze prijzen"],
          ]}
        />
      </Vlak>

      <Aanvraagsectie
        titel="Vraag een afspraak aan voor de installatie"
        tekst={`Vaste prijs van ${PRIJS}, inclusief voorrijkosten en btw. Wilt u de tv ook opgehangen hebben? Zet het erbij, dan rekenen wij dat vooraf voor u uit. Wij bellen u binnen enkele uren om de afspraak in te plannen.`}
        beloftes={aanvraagBelofte}
      >
        {/* `variant` is het label waarop in GA4 wordt gemeten. Het blijft
            staan zoals het was, anders breekt de reeks van deze pagina. */}
        <ContactForm
          variant="tv-installatie"
          berichtLabel="Wat moet er aangesloten worden?"
          berichtPlaceholder="Bijvoorbeeld: nieuwe Samsung, decoder van Ziggo en een soundbar."
        />
      </Aanvraagsectie>
    </>
  );
}
