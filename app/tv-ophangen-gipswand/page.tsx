import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import IconCardGrid, { type IconCard } from "@/components/IconCardGrid";
import InlineCta from "@/components/InlineCta";
import JsonLd from "@/components/JsonLd";
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
import { BELOFTE, HERO_PRIJZEN, PRIJZEN_KORT, type FaqItem } from "@/lib/content";
import { faqJsonLd, pageMeta, serviceJsonLd } from "@/lib/seo";

/**
 * Eigen pagina voor de moeilijke wanden — ons enige echte onderscheid.
 *
 * Bezorgdiensten van elektronicawinkels monteren alleen aan massief steen of
 * beton en weigeren gipswand, holle wand en hout. In Google Ads kregen de
 * zoektermen rond "tv ophangen gipswand" wel vertoningen maar nauwelijks
 * klikken, omdat noch de advertentie noch de landingspagina die vraag
 * beantwoordde. Deze pagina bedient die vraag in beide kanalen.
 */
export const metadata = pageMeta({
  title: "Tv ophangen aan een gipswand of holle wand",
  description:
    "Tv ophangen aan gipswand, metal stud of holle wand? Wij rekenen het draagvermogen na en kiezen de bevestiging die bij uw wand hoort. Vaste prijs vooraf.",
  path: "/tv-ophangen-gipswand",
});

const heroPunten = [
  "Frame opgespoord of hollewandbevestiging die het gewicht verdeelt",
  "Draagvermogen vooraf nagerekend, beugel belast getest",
  "Eigen monteurs in loondienst, volledig verzekerd werk",
  "Kan het niet veilig? Dan zeggen we dat vóórdat we boren",
];

const inbegrepen = [
  "Wandonderzoek: we bepalen of het gipsplaat, gipsblok of een voorzetwand is",
  "Opsporen van het houten of metalen frame achter de platen",
  "Berekening van het draagvermogen op basis van gewicht en beugeltype",
  "Bevestiging die bij úw wand past: frameschroeven, tuimelankers of kantelpluggen",
  "De beugel waterpas en stevig monteren, daarna belast testen",
  "Tv ophangen, aansluiten en de kabels gebundeld wegleggen",
  "Een eerlijk oordeel vooraf als het níet veilig kan",
];

const stappen = [
  {
    title: "U meldt uw wand",
    text: "Geef in uw aanvraag door wat u denkt dat het is: gipsplaat, voorzetwand, systeemwand of twijfel. Een foto mag ook.",
  },
  {
    title: "Wij bevestigen het moment",
    text: "Binnen enkele uren hoort u van ons. De monteur komt met bevestigingsmateriaal voor élk wandtype mee.",
  },
  {
    title: "Wand onderzoeken",
    text: "Ter plekke bepalen we het wandtype, zoeken we het frame en meten we de plaatdikte en de holte erachter.",
  },
  {
    title: "Draagvermogen narekenen",
    text: "Gewicht van de tv, formaat, beugeltype en hefboomwerking bepalen samen welke bevestiging nodig is.",
  },
  {
    title: "Monteren en belast testen",
    text: "De beugel gaat waterpas aan de wand en we belasten hem voordat uw tv erop gaat.",
  },
  {
    title: "Ophangen en opleveren",
    text: "Tv erop, alles aangesloten, kabels weggewerkt en het boorafval gaat mee.",
  },
];

const wandtypes: IconCard[] = [
  {
    icon: <Icon name="drill" />,
    h3: "Gipsplaat op metal stud",
    text: "De meest voorkomende binnenwand in nieuwbouw. Achter de platen zitten stalen profielen, meestal om de 60 cm. Zitten uw beugelgaten op die profielen, dan schroeven we daarin en hangt uw tv net zo stevig als op steen. Vallen ze ertussen, dan verdelen we het gewicht met tuimelankers of een montageplaat.",
  },
  {
    icon: <Icon name="home" />,
    h3: "Gipsblok of voorzetwand",
    text: "Massief gipsblok draagt meer dan gipsplaat, maar is brozer. We gebruiken dan speciale gipspluggen die de druk over een groter vlak spreiden. Bij een voorzetwand vóór metselwerk boren we waar mogelijk door naar de achterliggende steen — dat is altijd de sterkste oplossing.",
  },
  {
    icon: <Icon name="tool" />,
    h3: "Holle wand of systeemwand",
    text: "Bij holle wanden verankeren kantelpluggen of tuimelankers zich achter de plaat. Voor een tv vanaf 55 inch zoeken we eerst naar het draagframe; een kantelbare of draaibare beugel vraagt namelijk veel meer van de bevestiging dan een vaste.",
  },
];

const risicos = [
  "Een vaste beugel belast de wand recht naar beneden; een draaibare arm vermenigvuldigt die kracht",
  "Gipsplaat van 9,5 mm draagt minder dan 12,5 mm — dat verschil ziet u niet, wij meten het",
  "Pluggen die alleen in de gipsplaat grijpen, trekken op termijn los door trillingen",
  "Achter voorzetwanden lopen vaak leidingen; blind boren is het grootste risico in huis",
];

const aanvraagBelofte = [
  "Een gipswand of holle wand kost bij ons niets extra",
  BELOFTE.vrijblijvend,
  BELOFTE.inclusief,
  BELOFTE.avondWeekend,
];

const faqItems: FaqItem[] = [
  {
    q: "Kan een tv aan een gipswand worden opgehangen?",
    a: "Ja, in vrijwel alle gevallen. Het hangt af van het wandtype, de plaatdikte, het gewicht van uw tv en het beugeltype. Waar mogelijk bevestigen we in het stalen of houten frame achter de platen; lukt dat niet, dan gebruiken we tuimelankers of kantelpluggen die het gewicht achter de plaat verdelen. Wij rekenen het draagvermogen vooraf na.",
  },
  {
    q: "Hoeveel gewicht houdt een gipswand?",
    a: "Dat hangt af van meer dan de wand alleen. Het beugeltype bepaalt de hefboom: een draaibare arm met een 65 inch-tv oefent veel meer kracht uit dan een vaste beugel met hetzelfde scherm. Ook de plaatdikte en de afstand tussen de profielen tellen mee. Daarom meten we ter plekke in plaats van met een vuistregel te werken.",
  },
  {
    q: "Waarom weigeren sommige diensten een gipswand?",
    a: "Bezorgdiensten van elektronicawinkels werken met één standaardprocedure en standaard pluggen. Die zijn gemaakt voor massief steen of beton. Alles daarbuiten valt buiten hun werkinstructie, dus zeggen ze nee. Wij komen met bevestigingsmateriaal voor elk wandtype en nemen de tijd om de wand eerst te beoordelen.",
  },
  {
    q: "Hoe weet ik of ik een gipswand heb?",
    a: "Klop erop: klinkt het hol, dan is het waarschijnlijk gipsplaat of een voorzetwand. Een punaise die er makkelijk in gaat, wijst ook op gips. Twijfelt u? Zet het gewoon in uw aanvraag — de monteur stelt het ter plekke vast en heeft het juiste materiaal bij zich.",
  },
  {
    q: "Wat als mijn wand het écht niet kan dragen?",
    a: "Dan zeggen we dat eerlijk, vóórdat we boren. In zo'n geval bespreken we alternatieven: een andere plek op dezelfde wand waar wél een frame zit, een montageplaat die de belasting spreidt, of een tv-meubel. U betaalt dan niet voor een montage die niet is uitgevoerd.",
  },
  {
    q: "Kunnen jullie ook de kabels wegwerken in een holle wand?",
    a: "Juist bij een holle wand is dat vaak eenvoudiger dan bij steen: de kabels kunnen door de spouw naar beneden lopen, zodat u helemaal niets meer ziet. We bespreken ter plekke of dat bij uw wand kan.",
  },
];

export default function TvOphangenGipswandPage() {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: "Tv ophangen aan gipswand of holle wand",
          description:
            "Tv ophangen aan gipsplaat, metal stud, gipsblok, voorzetwand of holle wand, met berekening van het draagvermogen en passende bevestiging.",
          path: "/tv-ophangen-gipswand",
        })}
      />
      <JsonLd data={faqJsonLd(faqItems)} />

      <Hero
        prijzen={HERO_PRIJZEN}
        kruimels={
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Tv ophangen", href: "/tv-ophangen" },
              { name: "Gipswand & holle wand", href: "/tv-ophangen-gipswand" },
            ]}
          />
        }
        bovenkop="Gipswand · holle wand · metal stud"
        titel="Tv ophangen aan een gipswand"
        inleiding="Kreeg u te horen dat het niet kan? Bezorgdiensten van elektronicawinkels monteren alleen aan massief steen of beton. Wij komen juist voor de lastige wanden: we zoeken het frame, rekenen het draagvermogen na en gebruiken bevestiging die bij úw wand past."
        beeld="/images/tv-ophangen-gipswand.webp"
        beeldAlt="Monteur zoekt met een detector de stijlen in een gipswand en zet de boorpunten af"
      >
        <HeroKnoppen
          tweedeHref="/tv-ophangen"
          tweedeLabel="Alles over tv ophangen"
        />
        <Vinkjes donker
          items={heroPunten}
          className="mt-8 grid gap-3 border-t border-white/15 pt-6 sm:grid-cols-2"
        />
      </Hero>

      <Vlak toon="wit" labelledBy="wandtypes">
        <Kop
          id="wandtypes"
          bovenkop="Welke wand heeft u?"
        titel="Drie wanden die er hetzelfde uitzien en anders werken"
        tekst="Een tv aan een gipswand is geen kwestie van zwaardere pluggen pakken. Het gaat om weten wát er achter de plaat zit en hoeveel kracht uw beugel erop uitoefent; die twee bepalen samen of uw televisie over vijf jaar nog net zo recht hangt. U hoeft het niet zelf te weten — de monteur stelt het ter plekke vast."
        />
        <IconCardGrid items={wandtypes} columns={3} className="mt-10" />
        <p className="mt-12 max-w-3xl text-ink-600">
          Twijfelt u welke u heeft?{" "}
          <Link href="#afspraak" className="verwijzing">
            Vraag vrijblijvend een afspraak aan
          </Link>{" "}
          en zet erbij wat voor wand u denkt te hebben — dan weet de monteur
          vooraf wat hij moet meenemen.
        </p>
      </Vlak>

      <Vlak toon="oppervlak" labelledBy="risicos">
        <Kop
          id="risicos"
          bovenkop="Waarom het misgaat"
        titel="Wat er misgaat als het verkeerd wordt gedaan"
        tekst="De meeste tv's die van een wand komen, vallen niet meteen. Ze zakken eerst, en dan laat de bevestiging los."
        />
        <Vinkjes
          items={risicos}
          className="mt-10 grid max-w-4xl gap-3.5 sm:grid-cols-2"
        />
      </Vlak>

      <Vlak toon="wit" labelledBy="inbegrepen">
        <Kop
          id="inbegrepen"
          bovenkop="Wat u krijgt"
        titel="Wat er inbegrepen is"
        tekst="Hetzelfde bedrag als bij een gewone montage. Een moeilijke wand kost bij ons niets extra."
        />
        <Vinkjes
          items={inbegrepen}
          className="mt-10 grid max-w-4xl gap-3.5 sm:grid-cols-2"
        />
      </Vlak>

      <Vlak toon="oppervlak" labelledBy="werkwijze">
        <Kop
          id="werkwijze"
          bovenkop="Zo werkt het"
        titel="Zo pakken wij een gipswand aan"
        tekst="Van uw aanvraag tot een beugel die belast is getest — zes stappen, en u hoeft er zelf maar één van te doen."
        />
        <div className="mt-12">
          <Stappen items={stappen} kolommen={3} />
        </div>
      </Vlak>

      <Reviews toon="wit" />

      <Vlak toon="oppervlak" labelledBy="prijs">
        <Kop
          id="prijs"
          bovenkop="Wat het kost"
        titel="Wat kost tv ophangen aan een gipswand?"
        tekst={`Hetzelfde als elke andere montage: uw wandtype verandert het bedrag niet. Tv ophangen kost ${PRIJZEN_KORT}, afhankelijk van het formaat van uw tv en inclusief voorrijkosten en btw — ook als er hollewandpluggen of een draagframe aan te pas komen.`}
        />
        <p className="mt-9 max-w-3xl text-ink-600">
          Wij rekenen geen toeslag voor een wand die anders blijkt dan u dacht.
          Komen we iets tegen dat extra werk kost, dan hoort u eerst wat dat
          kost — en u betaalt pas na afloop.{" "}
          <Link href="/prijzen" className="verwijzing">
            Bekijk alle tarieven
          </Link>
          .
        </p>

        <InlineCta href="#afspraak" />
      </Vlak>

      <Vlak toon="wit" labelledBy="werkgebied">
        <Kop
          id="werkgebied"
          bovenkop="Werkgebied"
        titel="Ook bij u in de buurt"
        tekst="Onze monteurs rijden dagelijks in Zuid-Holland, Noord-Holland, Utrecht en Noord-Brabant."
        />
        <ProvincieChips prefix="Tv ophangen" withOverview />
        <RelatedLinks
          items={[
            ["/tv-ophangen", "Tv ophangen"],
            ["/kennisbank/tv-ophangen-gipswand-plug", "Welke plug in gipswand?"],
            ["/kennisbank/welke-tv-beugel", "Welke beugel past?"],
            ["/prijzen", "Prijzen"],
            ["/diensten/tv-installatie", "Tv installatie"],
            ["/contact", "Contact opnemen"],
          ]}
        />
      </Vlak>

      <Faqsectie
        titel="Veelgestelde vragen over tv ophangen aan gipswand"
        items={faqItems}
        toon="oppervlak"
      />

      <Aanvraagsectie
        toon="wit"
        titel="Twijfelt u over uw wand?"
        tekst="Zet het in uw aanvraag — dan weet de monteur het vooraf en heeft hij het juiste materiaal bij zich. Wij bellen u binnen enkele uren om het tarief te bevestigen."
        beloftes={aanvraagBelofte}
      >
        <ContactForm
          variant="gipswand"
          berichtLabel="Uw tv en uw wand"
          berichtPlaceholder="Bijvoorbeeld: 55 inch Samsung, gipswand met stalen frame."
        />
      </Aanvraagsectie>
    </>
  );
}
