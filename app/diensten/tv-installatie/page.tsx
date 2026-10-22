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
import {
  PRIJZEN_KORT,
  VANAF_PRIJS,
  reviewsPerDienst,
  type FaqItem,
} from "@/lib/content";
import { faqJsonLd, pageMeta, serviceJsonLd } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Tv laten installeren aan huis — vaste prijs €70",
  description:
    "Nieuwe tv gekocht? Wij maken hem gebruiksklaar aan huis: aansluiten, zenders, wifi en apps instellen en uitleg. Vaste prijs €70. Ophangen kan als optie.",
  path: "/diensten/tv-installatie",
});

/**
 * Het vaste bedrag van deze dienst, gelijk aan de regel "Complete tv
 * installatie zonder ophangen" in `tarieven`. Eén plek op de pagina, zodat
 * kop, prijsblok en offerteblok niet uit elkaar kunnen lopen.
 */
const PRIJS = "€70";

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
  "Vrijblijvend: u zit aan niets vast tot u ja zegt",
  "Geen aanbetaling — u betaalt pas na afloop",
  "Ook 's avonds en in het weekend, zonder toeslag",
];

const stappen = [
  {
    title: "Offerte aanvragen",
    text: "Vul het formulier in met uw gegevens en wat er moet gebeuren. Wij nemen binnen enkele uren contact met u op om een geschikt moment af te spreken.",
  },
  {
    title: "Tv plaatsen of ophangen",
    text: "Onze monteur komt bij u thuis en plaatst uw tv op het meubel of hangt hem aan de muur.",
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
    icon: <Icon name="speaker" className="size-6" />,
    h3: "Soundbar en audio",
    text: "Heeft u een soundbar of surround-systeem? Wij sluiten deze aan, bijvoorbeeld via HDMI ARC of eARC, en controleren of het geluid goed werkt.",
  },
  {
    icon: <Icon name="chat" className="size-6" />,
    h3: "Apple TV, Chromecast en mediaspelers",
    text: "Heeft u een Apple TV, Chromecast, Fire TV of andere mediaspeler? Wij sluiten deze aan, verbinden hem met internet en helpen met de gewenste apps.",
  },
  {
    icon: <Icon name="sliders" className="size-6" />,
    h3: "PlayStation, Xbox en Nintendo Switch",
    text: "Ook uw spelcomputer kunnen we aansluiten. Waar mogelijk controleren we instellingen zoals HDR en de geschikte beeldmodus voor gaming.",
  },
  {
    icon: <Icon name="tv" className="size-6" />,
    h3: "Tv-ontvanger en decoder",
    text: "We sluiten uw tv-ontvanger of decoder aan, zoeken de zenders en controleren of alles correct werkt.",
  },
];

const situaties: IconCard[] = [
  {
    icon: <Icon name="tv" className="size-6" />,
    h3: "Nieuwe tv gekocht",
    text: "Uw nieuwe televisie is binnen, maar u wilt hem niet zelf installeren? Wij pakken hem uit, plaatsen hem, sluiten alles aan en stellen hem volledig in. Na onze afspraak kunt u direct kijken.",
  },
  {
    icon: <Icon name="chat" className="size-6" />,
    h3: "Hulp omdat u niet technisch bent",
    text: "Geen probleem. Wij nemen de tijd om alles rustig uit te leggen. U hoeft geen technische kennis te hebben.",
  },
  {
    icon: <Icon name="sliders" className="size-6" />,
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
          offers: [
            { name: "Tv installeren & gebruiksklaar maken", price: "70" },
            { name: "Soundbar installeren", price: "49" },
            { name: "Kabels wegwerken in kabelgoot", price: "39" },
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
              { name: "Tv installatie", href: "/diensten/tv-installatie" },
            ]}
          />
        }
        eyebrow={`Tv installatie · aan huis · vaste prijs ${PRIJS}`}
        title="Tv installatie aan huis"
        lead="Uw nieuwe tv volledig geïnstalleerd en direct gebruiksklaar. Wij sluiten uw tv en apparatuur aan, stellen zenders, wifi, apps, beeld en geluid voor u in en leggen rustig uit hoe alles werkt."
        image="/images/dienst-tv-installatie.jpg"
        imageAlt="Volledig geïnstalleerde tv aan de muur in een moderne woonkamer"
      >
        <HeroActions tweedeHref="#prijs" tweedeLabel="Wat het kost" />
        <CheckList
          dark
          items={[
            "Zenders, wifi en streaming-apps ingesteld",
            "Soundbar, decoder en andere apparatuur aangesloten",
            "Beeld en geluid zorgvuldig ingesteld",
            "Tv ophangen aan de muur mogelijk als extra optie",
          ]}
          className="mt-8 grid gap-3 sm:grid-cols-2"
        />
      </PageHero>

      <Section labelledBy="inbegrepen">
        <SectionHeading
          id="inbegrepen"
          eyebrow="Wat u krijgt"
          title="Wat is inbegrepen bij de tv installatie?"
          lead="Een nieuwe televisie aansluiten is meer dan de stekker erin doen: zenders instellen, wifi verbinden en alle apparaten goed laten samenwerken. Onze monteur komt bij u thuis, sluit uw tv en apparatuur aan, stelt alles zorgvuldig in en legt daarna rustig uit hoe u de tv en afstandsbediening gebruikt. Eén afspraak, en uw nieuwe tv is direct gebruiksklaar."
        />
        <p className="mt-8 max-w-2xl text-ink-600">
          Bij een standaard tv installatie regelen wij onder andere:
        </p>
        <CheckList
          items={inbegrepen}
          className="mt-6 grid max-w-4xl gap-3 sm:grid-cols-2"
        />
      </Section>

      {/* Bewijs komt ná de belofte en vóór de prijs: eerst vertellen wat we
          leveren, dan laten zien dat we het leveren, dan wat het kost. */}
      <Reviews
        title="Klanten over hun tv installatie"
        items={reviewsPerDienst["tv-installatie"]}
      />

      {/* Brengt zijn eigen witte sectie mee, vlak vóór de prijs. */}
      <Bezwaren />

      <Section id="prijs" tone="surface" labelledBy="prijs-kop">
        <SectionHeading
          id="prijs-kop"
          eyebrow="Wat het kost"
          title="Wat kost een tv installatie aan huis?"
          lead="Eén vast bedrag voor de complete installatie, inclusief voorrijkosten en btw. Wat we vooraf afspreken, is wat u betaalt — geen verrassingen achteraf."
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
                    Voor de complete installatie, inclusief voorrijkosten en
                    btw. Geen vanafprijs en geen uurtarief: dit is het bedrag.
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
            <h3 className="text-h3">Dit bedrag dekt de hele installatie</h3>
            <CheckList items={prijsDekking} className="mt-5" />
            <p className="mt-6 text-ink-600">
              Wilt u de tv ook aan de muur? Het ophangen is apart werk met een
              eigen tarief per formaat,{" "}
              <Link href="/tv-ophangen" className="link">
                {PRIJZEN_KORT}
              </Link>
              . Zet het in uw aanvraag, dan doen wij het in dezelfde afspraak.
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
          eyebrow="Welke dienst past bij u?"
          title="Tv laten installeren of alleen ophangen?"
          lead="Twee verschillende klussen, twee verschillende prijzen. Hieronder staat welke bij uw situatie hoort."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="card h-full p-7 md:p-8">
            <h3 className="text-h3">Alleen tv ophangen</h3>
            <p className="mt-3 text-ink-600">
              Wilt u vooral dat uw televisie veilig en waterpas aan de muur
              wordt gemonteerd? Bekijk dan onze{" "}
              <Link href="/tv-ophangen" className="link">
                tv ophangservice
              </Link>{" "}
              vanaf {VANAF_PRIJS}, met een vaste prijs per tv-formaat.
            </p>
          </div>
          <div className="card h-full p-7 md:p-8">
            <h3 className="text-h3">Complete tv installatie</h3>
            <p className="mt-3 text-ink-600">
              Wilt u dat uw tv wordt aangesloten, met wifi wordt verbonden,
              zenders en apps krijgt, met uw apparatuur samenwerkt en aan u
              wordt uitgelegd? Dan is de complete tv installatie aan huis de
              beste keuze — voor een vaste prijs van {PRIJS}.
            </p>
          </div>
        </div>
        <p className="mt-6 max-w-3xl text-ink-600">
          Twijfelt u welke service bij u past? Zet het kort in het{" "}
          <Link href="#offerte" className="link">
            aanvraagformulier
          </Link>{" "}
          — wij denken graag met u mee.
        </p>
      </Section>

      <Section tone="surface" labelledBy="apparatuur">
        <SectionHeading
          id="apparatuur"
          eyebrow="Alles in één bezoek"
          title="Ook uw andere apparatuur aansluiten"
          lead="Uw televisie staat meestal niet alleen. Daarom kunnen we ook de apparatuur rondom uw tv aansluiten en instellen."
        />
        <IconCardGrid items={apparatuur} columns={2} className="mt-12" />
      </Section>

      <Section labelledBy="stappen">
        <SectionHeading
          id="stappen"
          eyebrow="Zo werkt het"
          title="Zo werkt onze tv installatie"
          lead="Van aanvraag tot gebruiksklaar in vier stappen. U hoeft niets uit te zoeken."
        />
        {/* Genummerd, want de volgorde is het punt. `HowItWorks` uit de
            sectiebibliotheek beschrijft de drie stappen van het ophangen; een
            installatie heeft er vier en noemt het plaatsen apart. */}
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
          title="Tv installatie voor iedere situatie"
          lead="Of uw tv net is bezorgd of de oude wordt vervangen: wij maken hem gebruiksklaar."
        />
        <IconCardGrid items={situaties} columns={3} className="mt-12" />
        <InlineCta
          href="#offerte"
          text="Vaste prijs vooraf. Wij gaan pas weg als uw tv staat of hangt, alle apparatuur is aangesloten en de zenders en apps werken. U krijgt binnen enkele uren bericht."
        />
      </Section>

      <Section labelledBy="faq">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <SectionHeading
            id="faq"
            eyebrow="Veelgestelde vragen"
            title="Veelgestelde vragen over tv installatie"
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
          title="Tv installatie aan huis in uw regio"
          lead="Wij helpen klanten aan huis met tv installatie, montage en technische ondersteuning in Zuid-Holland, Noord-Holland, Utrecht en Noord-Brabant. Woont u in een andere plaats? Zet het in uw aanvraag — we bekijken graag of we u kunnen helpen."
        />
        {/* Ankertekst volgt de titel van de doelpagina ("Tv ophangen in
            <provincie>"); de href verandert niet. */}
        <ProvincieChips prefix="Tv ophangen in" withOverview />
        <RelatedLinks
          items={[
            ["/tv-ophangen", "Tv ophangen"],
            ["/diensten/soundbar-installatie", "Soundbar installeren"],
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
              title="Vraag uw offerte aan voor de installatie"
              lead={`Vaste prijs van ${PRIJS}, inclusief voorrijkosten en btw. Wilt u de tv ook opgehangen hebben? Zet het erbij, dan rekenen wij dat vooraf voor u uit. U krijgt binnen enkele uren bericht.`}
            />
            <CheckList items={aanvraagBelofte} className="mt-8" />
          </div>
          {/* `variant` is het label waarop in GA4 wordt gemeten. Het blijft
              staan zoals het was, anders breekt de reeks van deze pagina. */}
          <ContactForm
            variant="tv-installatie"
            berichtLabel="Wat moet er aangesloten worden?"
            berichtPlaceholder="Bijvoorbeeld: nieuwe Samsung, decoder van Ziggo en een soundbar."
          />
        </div>
      </Section>
    </>
  );
}
