import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import Faq from "@/components/Faq";
import IconCardGrid, { type IconCard } from "@/components/IconCardGrid";
import JsonLd from "@/components/JsonLd";
import ProvincieChips from "@/components/ProvincieChips";
import RelatedLinks from "@/components/RelatedLinks";
import Reviews from "@/components/Reviews";
import { Icon } from "@/components/Icon";
import {
  CheckList,
  HeroActions,
  HowItWorks,
  PageHero,
  Prijsklassen,
  Section,
  SectionHeading,
  TrustBar,
} from "@/components/sections";
import {
  PRIJZEN_KORT,
  bezwaren,
  prijsklassen,
  reviewsPerDienst,
  type FaqItem,
} from "@/lib/content";
import { faqJsonLd, pageMeta, serviceJsonLd } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Tv laten ophangen — vaste prijs vanaf €99",
  description:
    "Tv laten ophangen door een ervaren monteur: beugel monteren, tv waterpas ophangen, apparatuur aansluiten en kabels wegwerken. Vaste prijs per formaat — €99, €129 of €159 incl. voorrijkosten en btw. Ook 's avonds en in het weekend.",
  path: "/tv-ophangen",
});

/**
 * De vier punten die boven de vouw horen te staan.
 *
 * Hier landt ruim de helft van het advertentiebudget. Een bezoeker komt met
 * één vraag — kan het bij mij, en wat kost het? — en beslist in de hero of hij
 * verder leest. Dit zijn precies de vier punten waarop de rest van de markt
 * een voorbehoud maakt.
 */
const heroPunten = [
  "Kaarsrecht opgehangen, op de hoogte die bij uw bank past",
  "Kabels netjes weggewerkt — u ziet er niets meer van",
  "Elke muur: steen, beton, gipswand of holle wand",
  "Vaste prijs vooraf — u betaalt pas als hij hangt en werkt",
];

const inbegrepen = [
  "Advies over de beste plek, hoogte en het juiste beugeltype",
  "Controle van het draagvermogen van uw muur",
  "De beugel waterpas en stevig monteren",
  "De tv ophangen en waterpas afstellen",
  "Aansluiten van de tv en uw randapparatuur",
  "Kabels netjes wegwerken langs of achter de tv",
  "Testen of alles werkt en korte uitleg",
  "Opruimen: het boorafval nemen we mee",
];

/**
 * Wat de monteur bij u thuis doet. De aanvraag zelf staat erboven al in
 * `HowItWorks`, dus begint deze lijst op het moment dat hij binnenkomt.
 */
const montagestappen = [
  {
    title: "Muur en tv beoordelen",
    text: "De monteur bekijkt het muurtype, het draagvermogen en het formaat en gewicht van uw televisie.",
  },
  {
    title: "Beugel bepalen",
    text: "Samen bepalen we welke beugel het beste past: vast, kantelbaar of draaibaar, passend bij uw tv en de ruimte.",
  },
  {
    title: "Beugel monteren",
    text: "De beugel wordt met de juiste pluggen en bevestiging waterpas en stevig aan de muur gezet.",
  },
  {
    title: "Ophangen en waterpas zetten",
    text: "De tv wordt opgehangen, exact waterpas gezet en op de ideale kijkhoogte afgesteld.",
  },
  {
    title: "Aansluiten en controleren",
    text: "We sluiten uw apparatuur aan, werken de kabels weg, testen alles en ruimen netjes op.",
  },
];

const muren = [
  {
    h3: "Tv ophangen aan een betonnen muur",
    text: "Beton is de sterkste ondergrond en draagt moeiteloos ook grote, zware televisies. We boren met een klopboor en gebruiken hoogwaardige betonpluggen. Belangrijk is een nauwkeurige boordiepte en het vermijden van leidingen; daar letten onze monteurs standaard op.",
  },
  {
    h3: "Tv ophangen aan een bakstenen muur",
    text: "Een gemetselde bakstenen muur is prima geschikt. We bevestigen bij voorkeur in de steen zelf, niet in de zachtere voegen, met pluggen die op het steentype zijn afgestemd. Zo hangt uw tv stabiel, ook bij een draaibare beugel.",
  },
  {
    h3: "Tv ophangen aan een gipswand",
    text: "Een gipsplaat- of gipsblokwand vraagt om de juiste aanpak. Waar mogelijk bevestigen we in het achterliggende houten of metalen frame; anders gebruiken we speciale hollewandpluggen. We controleren altijd vooraf of de wand het gewicht van uw tv veilig kan dragen.",
  },
  {
    h3: "Tv ophangen aan een holle wand",
    text: "Bij holle wanden (bijvoorbeeld voorzetwanden of systeemwanden) werken we met kantelpluggen of tuimelankers die achter de plaat verankeren. Voor zwaardere tv's zoeken we naar het draagframe voor extra zekerheid.",
  },
  {
    h3: "Tv ophangen aan een houten wand",
    text: "Houten wanden en betimmeringen bieden goede grip als er in de balken of het frame wordt geschroefd. We lokaliseren de dragende delen zodat de bevestiging stevig zit en de tv niet gaat doorzakken.",
  },
];

const beugels: IconCard[] = [
  {
    h3: "Vaste tv-beugel",
    text: "De tv hangt vlak en strak tegen de muur, met een minimale afstand tot de wand. Dit is de voordeligste en meest gekozen optie, ideaal als u recht voor de tv zit en geen kijkhoek hoeft te veranderen.",
  },
  {
    h3: "Kantelbare tv-beugel",
    text: "Met een kantelbare beugel kunt u de tv enkele graden naar beneden richten. Handig wanneer de tv wat hoger hangt, bijvoorbeeld boven een dressoir of open haard.",
  },
  {
    h3: "Draaibare tv-beugel",
    text: "Een draaibare (full-motion) beugel is volledig uittrekbaar en draaibaar. Zo heeft u ook vanuit de keuken of eettafel perfect beeld. Deze beugel bevestigen we extra stevig, omdat er meer krachten op de muur werken.",
  },
];

const beugelFactoren = [
  "VESA-maat: de afstand tussen de schroefgaten op de achterkant van de tv (bijvoorbeeld 200×200 of 400×400 mm).",
  "Gewicht: de beugel moet het gewicht van uw tv ruim aankunnen.",
  "Schermformaat: elke beugel heeft een minimale en maximale schermdiagonaal.",
  "Muurtype: het draagvermogen bepaalt de bevestiging en het maximale gewicht.",
];

const situaties: IconCard[] = [
  {
    icon: <Icon name="tv" className="size-6" />,
    h3: "Tv ophangen boven een dressoir",
    text: "Een populaire plek. We kiezen de juiste hoogte voor comfortabel kijken vanaf de bank, houden ruimte voor een soundbar en laten de kabels netjes achter het meubel verdwijnen.",
  },
  {
    icon: <Icon name="flame" className="size-6" />,
    h3: "Tv ophangen boven een open haard",
    text: "Kan een mooie oplossing zijn, mits het draagvermogen en de warmte-afgifte het toelaten. We beoordelen uw situatie altijd eerst ter plekke.",
  },
  {
    icon: <Icon name="cable" className="size-6" />,
    h3: "Tv ophangen en aansluiten",
    text: "Na het ophangen sluiten we alles in de juiste volgorde aan en houden we rekening met de ruimte voor een soundbar. Hulp met zenders en apps kan erbij.",
  },
];

/** Wat de aanvraag zelf wel en niet van iemand vraagt. */
const offerteBelofte = [
  "Vrijblijvend: u zit aan niets vast tot u ja zegt",
  "Het bedrag is inclusief voorrijkosten en btw",
  "Geen aanbetaling — u betaalt pas na afloop",
  "Ook 's avonds en in het weekend, zonder toeslag",
];

const faqItems: FaqItem[] = [
  {
    q: "Wat kost een tv ophangen?",
    a: "Dat hangt alleen van het formaat van uw tv af: €99 tot 43 inch, €129 van 44 t/m 64 inch en €159 vanaf 65 inch, altijd inclusief voorrijkosten en btw. Het soort muur maakt voor dat bedrag niets uit. Een beugel die u nog niet heeft, kabels die weggewerkt moeten worden of een plek boven de haard komen er apart bij — altijd vooraf afgesproken.",
  },
  {
    q: "Hoe snel kunnen jullie de tv ophangen?",
    a: "Vraag online een afspraak aan, dan laten we u binnen enkele uren weten wat de eerstvolgende mogelijkheid bij u in de buurt is. Vaak kan dat al binnen 24 uur.",
  },
  {
    q: "Kan de afspraak ook 's avonds of in het weekend?",
    a: "Ja. Doordeweeks komen we tot 21:00 uur langs en in het weekend tussen 09:00 en 17:00 uur, zonder toeslag. Geef bij uw aanvraag door welk dagdeel u schikt.",
  },
  {
    q: "Moet ik zelf een tv-beugel hebben?",
    a: "Heeft u er al een? Die monteren we gewoon. Heeft u er geen, dan regelen wij de juiste beugel voor uw tv — geef bij uw aanvraag het merk en het formaat door, dan krijgt u de prijs van de beugel er direct bij in uw offerte. U weet dus vóór de afspraak wat het totaal wordt.",
  },
  {
    q: "Kan een zware of grote tv aan de muur?",
    a: "In vrijwel alle gevallen wel. Bij grote of zware schermen kiezen we een zwaardere beugel, de juiste bevestiging voor uw muurtype en werken we indien nodig met twee monteurs. Zo hangt uw tv gegarandeerd veilig.",
  },
  {
    q: "Kunnen jullie de tv ook aansluiten?",
    a: "Ja. We sluiten uw randapparatuur aan — denk aan een soundbar, mediaspeler, spelcomputer of tv-ontvanger — en controleren of alles werkt voordat we vertrekken.",
  },
  {
    q: "Hoe lang duurt het ophangen van een tv?",
    a: "Een standaard montage duurt gemiddeld 45 tot 60 minuten. Werken we ook de kabels volledig weg, reken dan op ongeveer 90 minuten.",
  },
];

export default function TvOphangenPage() {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: "Tv ophangen",
          description:
            "Tv ophangen aan huis door een ervaren monteur: elke beugel, elke muur, waterpas gemonteerd, kabels weggewerkt en alles aangesloten. Vaste prijs per tv-formaat, vanaf €99.",
          path: "/tv-ophangen",
          // Drie aanbiedingen met een hard bedrag, uit dezelfde bron als de
          // kaarten op de pagina. Dat mag nu weer: het tarief per formaat
          // staat vast, dus een bezoeker die via een rich result binnenkomt
          // ziet hetzelfde bedrag als op de pagina. Eén samengevoegde
          // vanafprijs zou juist misleiden — wie een 75 inch heeft betaalt
          // €159 en niet €99.
          offers: prijsklassen.map((klasse) => ({
            name: `Tv ophangen, ${klasse.maat.replace(/^Voor tv's /, "")}`,
            price: klasse.prijs,
          })),
        })}
      />
      {/* Inclusief de vier bezwaren die verderop op deze pagina staan. */}
      <JsonLd
        data={faqJsonLd([
          ...bezwaren.map((bezwaar) => ({
            q: bezwaar.vraag,
            a: bezwaar.antwoord,
          })),
          ...faqItems,
        ])}
      />

      <PageHero
        breadcrumbs={
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Diensten", href: "/diensten" },
              { name: "Tv ophangen", href: "/tv-ophangen" },
            ]}
          />
        }
        eyebrow="Tv ophangen aan huis · ook ’s avonds en in het weekend"
        title="Tv laten ophangen"
        lead="U wijst aan waar hij moet hangen, wij doen de rest: de juiste hoogte voor uw bank, kaarsrecht opgehangen, kabels weggewerkt en alles aangesloten. U hoeft niets voor te bereiden en niets op te ruimen."
        image="/images/dienst-tv-ophangen.jpg"
        imageAlt="Monteur hangt een grote televisie waterpas aan de woonkamermuur"
      >
        <CheckList
          items={heroPunten}
          dark
          className="mt-8 grid gap-3 sm:grid-cols-2"
        />
        <HeroActions />
      </PageHero>

      <Section tone="surface">
        <TrustBar />
      </Section>

      <Section labelledBy="inbegrepen">
        <SectionHeading
          id="inbegrepen"
          eyebrow="Wat u krijgt"
          title="Wat is inbegrepen bij het ophangen van een tv?"
          lead="Een tv ophangen is meer dan vier gaten boren. Het beugeltype, het draagvermogen van de muur, de kijkhoogte en het wegwerken van de kabels bepalen samen of het resultaat strak én veilig is. Wij regelen dat van begin tot eind; u hoeft zelf niets voor te bereiden."
        />
        <CheckList
          items={inbegrepen}
          className="mt-10 grid max-w-4xl gap-3 sm:grid-cols-2"
        />
        <p className="mt-8 max-w-3xl text-ink-600">
          Onze monteurs hangen elke week televisies op — van een compacte 32 inch
          in de slaapkamer tot een 85 inch boven de open haard — en kennen voor
          elke situatie de beste oplossing. Hieronder leest u wat een tv ophangen
          kost, hoe wij werken en waar u op moet letten. Liever meteen geregeld?{" "}
          <Link href="#offerte" className="link">
            Vraag vrijblijvend uw offerte aan
          </Link>{" "}
          — u hoort binnen enkele uren van ons.
        </p>

        <h3 className="mt-14 text-h3">Tv ophangen en kabels wegwerken</h3>
        <div className="prose-tv mt-4 max-w-3xl">
          <p>
            Een zwevende tv verdient een muur zonder kabelspaghetti. Bij het
            ophangen werken we de stroom-, hdmi- en netwerkkabels netjes weg. De
            meest gekozen oplossing is een slanke kabelgoot in exact uw
            muurkleur (vanaf €39): van een afstandje vrijwel onzichtbaar en snel
            geplaatst.
          </p>
          <p>
            Wilt u helemaal geen kabel meer zien, dan kunnen we de bekabeling
            waar mogelijk volledig in de muur wegwerken. Dat spreken we vooraf
            tegen een vaste prijs met u af. Lees hoe wij{" "}
            <Link href="/kabels-wegwerken">kabels wegwerken</Link>, of bekijk
            alle <Link href="/prijzen">prijzen en opties</Link>.
          </p>
        </div>
      </Section>

      {/* Bewijs komt ná de belofte en vóór de prijs: eerst vertellen wat we
          leveren, dan laten zien dat we het leveren, dan wat het kost. */}
      <Reviews
        title="Klanten over het ophangen van hun tv"
        items={reviewsPerDienst["tv-ophangen"]}
      />

      <Section labelledBy="prijs">
        <SectionHeading
          id="prijs"
          eyebrow="Wat het kost"
          title="Wat kost een tv ophangen?"
          lead={`${PRIJZEN_KORT}, afhankelijk van het formaat van uw tv en altijd inclusief voorrijkosten en btw. Het soort muur verandert dat bedrag niet — steen, beton, gipsplaat of een holle voorzetwand, het tarief blijft hetzelfde.`}
        />
        {/* Het prijsblok draagt zelf de offerteknop. Daarom staat er geen
            tweede oproep onder: dit is het moment waarop iemand beslist, en
            twee knoppen naast elkaar maken van die beslissing een keuze. */}
        <div className="mt-12">
          <Prijsklassen />
        </div>
        <p className="mt-10 max-w-3xl text-ink-600">
          Heeft u nog geen beugel, of wilt u de kabels weggewerkt? Geef het door
          bij uw aanvraag, dan staat het totaalbedrag in uw offerte — u weet het
          dus vóór de afspraak. Komen we ter plekke iets tegen dat extra werk
          kost, dan hoort u eerst wat dat kost; u betaalt pas na afloop, als hij
          hangt en werkt. Bekijk alle tarieven en wat er altijd bij zit op de{" "}
          <Link href="/prijzen" className="link">
            prijzenpagina
          </Link>
          .
        </p>
      </Section>

      <Section tone="surface" labelledBy="werkwijze">
        <SectionHeading
          id="werkwijze"
          eyebrow="Zo werkt het"
          title="Zo werkt het tv ophangen aan huis"
          lead="U geeft bij uw aanvraag door welk moment u uitkomt — ook 's avonds en in het weekend — en krijgt binnen enkele uren het bedrag. Daartussen hoeft u niets uit te zoeken."
        />
        <div className="mt-12">
          <HowItWorks />
        </div>

        <h3 className="mt-16 text-h3">Wat de monteur bij u thuis doet</h3>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {montagestappen.map((stap, i) => (
            <li key={stap.title} className="card p-5">
              <p className="eyebrow">Stap {i + 1}</p>
              <h4 className="mt-3 font-display font-bold text-ink-950">
                {stap.title}
              </h4>
              <p className="mt-1.5 text-sm text-ink-600">{stap.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section labelledBy="wanden">
        <SectionHeading
          id="wanden"
          eyebrow="Elke wand"
          title="Tv ophangen aan verschillende soorten muren"
          lead={
            <>
              Elke muur vraagt om een andere aanpak en bevestiging. Onze
              monteurs herkennen het muurtype en kiezen de juiste pluggen, zodat
              uw tv overal veilig hangt. Heeft u een{" "}
              <Link href="/tv-ophangen-gipswand" className="link">
                gipswand of holle wand
              </Link>
              ? Daar leest u precies hoe we dat aanpakken.
            </>
          }
        />
        <ul className="mt-10 max-w-4xl divide-y divide-ink-200 border-y border-ink-200">
          {muren.map((muur) => (
            <li key={muur.h3} className="py-6">
              <h3 className="text-h3">{muur.h3}</h3>
              <p className="mt-2 text-ink-600">{muur.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface" labelledBy="beugel">
        <SectionHeading
          id="beugel"
          eyebrow="De beugel"
          title="Welke tv-beugel heb ik nodig?"
          lead="Er zijn drie hoofdtypen tv-beugels, elk met eigen voordelen. Welke het beste past, hangt af van uw kijkpositie, de ruimte en het formaat van uw tv."
        />
        <IconCardGrid items={beugels} columns={3} className="mt-10" />
        <p className="mt-10 max-w-3xl text-ink-600">
          Of een beugel precies past, hoeft u niet zelf uit te zoeken — de
          monteur controleert het ter plekke. Handig om te weten waar het van
          afhangt:
        </p>
        <CheckList
          items={beugelFactoren}
          className="mt-6 grid max-w-4xl gap-3 sm:grid-cols-2"
        />
        <p className="mt-6 max-w-3xl text-ink-600">
          Wilt u zelf controleren of een beugel op uw tv past?{" "}
          <Link href="/kennisbank/welke-tv-beugel" className="link">
            Zo meet u de VESA-maat
          </Link>
          .
        </p>
      </Section>

      <Section labelledBy="hoogte">
        <SectionHeading
          id="hoogte"
          eyebrow="De juiste hoogte"
          title="Hoe hoog moet een tv worden opgehangen?"
        />
        <div className="prose-tv mt-6 max-w-3xl">
          <p>
            De ideale hoogte hangt af van uw zithoogte, de kijkafstand en het
            formaat van de tv. Als vuistregel houdt u het midden van het scherm
            ongeveer op ooghoogte wanneer u ontspannen op de bank zit. Voor de
            meeste woonkamers komt dat neer op het midden van het scherm op
            ongeveer 100 tot 120 cm boven de vloer — maar de juiste hoogte is
            altijd persoonlijk.
          </p>
          <p>
            Hangt de tv boven een dressoir of open haard, dan komt hij vaak wat
            hoger. In dat geval adviseren we een kantelbare beugel, zodat u het
            scherm iets naar beneden richt en comfortabel blijft kijken zonder
            reflectie of nekklachten. Onze monteur bepaalt de hoogte altijd
            samen met u vóórdat er geboord wordt.
          </p>
          <p>
            Wilt u het zelf narekenen?{" "}
            <Link href="/kennisbank/hoe-hoog-tv-ophangen">
              In onze kennisbank staat de rekenregel met een tabel per
              schermformaat
            </Link>
            .
          </p>
        </div>
      </Section>

      <Section tone="surface" labelledBy="situaties">
        <SectionHeading
          id="situaties"
          eyebrow="Elke woonkamer"
          title="Tv ophangen in elke situatie"
          lead="Elke woonkamer is anders. Voor de meest voorkomende situaties weten onze monteurs precies wat er nodig is."
        />
        <IconCardGrid items={situaties} columns={3} className="mt-10" />
      </Section>

      <Section tone="dark" labelledBy="bezwaren">
        <SectionHeading
          dark
          id="bezwaren"
          eyebrow="Uw twijfels"
          title="Vier punten waarop u elders een voorbehoud krijgt"
          lead="Dit zijn de dingen die bezoekers tegenhouden. Bij ons leveren ze geen toeslag en geen nee op."
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {bezwaren.map((bezwaar) => (
            <li
              key={bezwaar.vraag}
              className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10"
            >
              <h3 className="flex items-start gap-3 text-h3 text-white">
                <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl bg-accent-400/15 text-accent-300">
                  <Icon name="check-circle" className="size-5" />
                </span>
                {bezwaar.vraag}
              </h3>
              <p className="mt-3 text-ink-300">{bezwaar.antwoord}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="werkgebied">
        <SectionHeading
          id="werkgebied"
          eyebrow="Werkgebied"
          title="Tv ophangen in ons werkgebied"
          lead="Onze monteurs komen aan huis in Zuid-Holland, Noord-Holland, Utrecht en Noord-Brabant. Bekijk of we ook bij u in de buurt zijn."
        />
        <ProvincieChips prefix="Tv ophangen" withOverview />
      </Section>

      <Section tone="surface" labelledBy="faq">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <SectionHeading
            id="faq"
            eyebrow="Veelgestelde vragen"
            title="Veelgestelde vragen over tv ophangen"
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
        <RelatedLinks
          items={[
            ["/tv-ophangen-gipswand", "Tv ophangen aan gipswand"],
            ["/kabels-wegwerken", "Kabels wegwerken"],
            ["/tv-boven-open-haard", "Tv boven de open haard"],
            ["/diensten/tv-installatie", "Complete tv installatie"],
            ["/diensten/soundbar-installatie", "Soundbar installeren"],
            ["/kennisbank/hoe-hoog-tv-ophangen", "Hoe hoog ophangen?"],
            ["/kennisbank", "Kennisbank"],
            ["/prijzen", "Bekijk onze prijzen"],
          ]}
        />
      </Section>

      {/* Het formulier staat op de pagina zelf en niet achter een knop naar
          /contact. Deze pagina ontvangt ruim de helft van het advertentiebudget
          en had geen enkel formulierveld: van 33 sessies in een week kwam er
          nul tot een aanvraag, terwijl de dienstpagina's mét formulier 9 tot
          25% halen. */}
      <Section id="offerte" labelledBy="offerte-kop">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div>
            <SectionHeading
              id="offerte-kop"
              eyebrow="Offerte aanvragen"
              title="Vraag uw offerte aan voor het ophangen"
              lead="Vertel kort wat er moet gebeuren en waar u woont. U krijgt binnen enkele uren een vrijblijvende offerte met het bedrag erbij. Daarna plannen we pas een afspraak, en alleen als u akkoord gaat."
            />
            <CheckList items={offerteBelofte} className="mt-8" />
          </div>
          <ContactForm
            variant="tv-ophangen"
            berichtLabel="Uw tv en uw muur"
            berichtPlaceholder="Bijvoorbeeld: 55 inch Samsung, en de wand is gipsplaat."
          />
        </div>
      </Section>
    </>
  );
}
