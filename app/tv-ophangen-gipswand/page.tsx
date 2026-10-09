import Link from "next/link";
import ServiceHero from "@/components/ServiceHero";
import Stappen from "@/components/Stappen";
import Faq from "@/components/Faq";
import CtaSection from "@/components/CtaSection";
import Reviews from "@/components/Reviews";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import CheckList from "@/components/CheckList";
import ProvincieChips from "@/components/ProvincieChips";
import IconCardGrid, { type IconCard } from "@/components/IconCardGrid";
import RelatedLinks from "@/components/RelatedLinks";
import { IconCable, IconShield, IconTv } from "@/components/icons";
import { reviewsPerDienst, type FaqItem } from "@/lib/content";
import { faqJsonLd, pageMeta, serviceJsonLd } from "@/lib/seo";
import heroFoto from "@/public/images/dienst-tv-ophangen.jpg";

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
  title: "Tv Ophangen aan Gipswand of Holle Wand",
  description:
    "Tv ophangen aan een gipswand, metal stud of holle wand? Wij rekenen het draagvermogen na en gebruiken de juiste bevestiging. Waar anderen nee zeggen, komen wij langs.",
  path: "/tv-ophangen-gipswand",
});

const inbegrepen = [
  "Wandonderzoek: we bepalen of het gipsplaat, gipsblok of een voorzetwand is",
  "Opsporen van het houten of metalen frame achter de platen",
  "Berekening van het draagvermogen op basis van gewicht en beugeltype",
  "Bevestiging die bij úw wand past: frameschroeven, tuimelankers of kantelpluggen",
  "De beugel waterpas en stevig monteren, daarna belast testen",
  "Tv ophangen, aansluiten en de kabels netjes wegwerken",
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
    icon: <IconShield className="h-6 w-6" />,
    h3: "Gipsplaat op metal stud",
    text: "De meest voorkomende binnenwand in nieuwbouw. Achter de platen zitten stalen profielen, meestal om de 60 cm. Zitten uw beugelgaten op die profielen, dan schroeven we daarin en hangt uw tv net zo stevig als op steen. Vallen ze ertussen, dan verdelen we het gewicht met tuimelankers of een montageplaat.",
  },
  {
    icon: <IconCable className="h-6 w-6" />,
    h3: "Gipsblok of voorzetwand",
    text: "Massief gipsblok draagt meer dan gipsplaat, maar is brozer. We gebruiken dan speciale gipspluggen die de druk over een groter vlak spreiden. Bij een voorzetwand vóór metselwerk boren we waar mogelijk door naar de achterliggende steen — dat is altijd de sterkste oplossing.",
  },
  {
    icon: <IconTv className="h-6 w-6" />,
    h3: "Holle wand of systeemwand",
    text: "Bij holle wanden verankeren kantelpluggen of tuimelankers zich achter de plaat. Voor een tv vanaf 55 inch zoeken we eerst naar het draagframe; een kantelbare of draaibare beugel vraagt namelijk veel meer van de bevestiging dan een vaste.",
  },
];

const risicos = [
  "Een vaste beugel belast de wand recht naar beneden; een draaibare arm vermenigvuldigt die kracht",
  "Gipsplaat van 9,5 mm draagt minder dan 12,5 mm — dat verschil zie je niet, wij meten het",
  "Pluggen die alleen in de gipsplaat grijpen, trekken op termijn los door trillingen",
  "Achter voorzetwanden lopen vaak leidingen; blind boren is het grootste risico in huis",
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
    <main>
      <JsonLd
        data={serviceJsonLd({
          name: "Tv ophangen aan gipswand of holle wand",
          description:
            "Tv ophangen aan gipsplaat, metal stud, gipsblok, voorzetwand of holle wand, met berekening van het draagvermogen en passende bevestiging.",
          path: "/tv-ophangen-gipswand",
        })}
      />
      <JsonLd data={faqJsonLd(faqItems)} />

      <ServiceHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Tv ophangen", href: "/tv-ophangen" },
          { name: "Gipswand & holle wand", href: "/tv-ophangen-gipswand" },
        ]}
        eyebrow="Gipswand · holle wand · metal stud"
        title="Tv ophangen aan een gipswand"
        intro="Kreeg u te horen dat het niet kan? Bezorgdiensten van elektronicawinkels monteren alleen aan massief steen of beton. Wij komen juist voor de lastige wanden: we zoeken het frame, rekenen het draagvermogen na en gebruiken bevestiging die bij úw wand past."
        benefits={[
          "Frame opgespoord of hollewandbevestiging die het gewicht verdeelt",
          "Draagvermogen vooraf nagerekend, beugel belast getest",
          "Eigen monteurs in loondienst, volledig verzekerd werk",
          "Kan het niet veilig? Dan zeggen we dat vóórdat we boren",
        ]}
        image={heroFoto}
        imageAlt="Monteur hangt een televisie waterpas op aan een lichte binnenwand"
      />

      <section className="mx-auto w-full max-w-6xl px-4 py-10 md:px-8">
        <Reveal immediate>
          <div className="max-w-3xl">
            <p className="leading-relaxed text-ink-soft">
              Een tv aan een gipswand is geen kwestie van zwaardere pluggen
              pakken. Het gaat om weten wát er achter de plaat zit en hoeveel
              kracht uw beugel er precies op uitoefent. Die twee dingen samen
              bepalen of uw televisie over vijf jaar nog net zo recht hangt. Op
              deze pagina leest u hoe wij dat aanpakken — en wanneer we eerlijk
              nee zeggen.{" "}
              <Link
                href="/contact"
                className="font-semibold text-ink underline decoration-amber-600/50 underline-offset-4"
              >
                Plan een afspraak
              </Link>{" "}
              en zet erbij wat voor wand u denkt te hebben.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <h2 className="mt-20 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Welke wand heeft u?
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
            Elk type vraagt een andere bevestiging. U hoeft het niet zelf te
            weten — de monteur stelt het ter plekke vast.
          </p>
        </Reveal>
        <IconCardGrid items={wandtypes} columns={3} />

        <Reveal>
          <h2 className="mt-20 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Wat er misgaat als het verkeerd wordt gedaan
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
            De meeste tv&apos;s die van een wand komen, vallen niet meteen. Ze
            zakken eerst, en dan laat de bevestiging los.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <CheckList
            items={risicos}
            className="mt-8 grid max-w-4xl gap-3 sm:grid-cols-2"
            medium
          />
        </Reveal>

        <Reveal>
          <h2 className="mt-20 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Wat er is inbegrepen
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
            Dezelfde vaste prijs als een gewone montage. Een moeilijke wand kost
            bij ons niets extra.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <CheckList
            items={inbegrepen}
            className="mt-8 grid max-w-4xl gap-3 sm:grid-cols-2"
          />
        </Reveal>
      </section>

      <div id="reviews" className="pt-6">
        <Reviews
          title="Klanten over het ophangen van hun tv"
          items={reviewsPerDienst["tv-ophangen"]}
        />
      </div>

      <section className="mx-auto w-full max-w-6xl px-4 pb-10 md:px-8">
        <Stappen title="Zo pakken wij een gipswand aan" steps={stappen} />

        <Reveal>
          <h2 className="mt-20 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Wat kost het?
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
            Hetzelfde als elke andere montage: de prijs hangt alleen af van het
            schermformaat, niet van het wandtype. Voorrijkosten,
            montagemateriaal en btw zitten er altijd in.{" "}
            <Link
              href="/prijzen"
              className="font-semibold text-ink underline decoration-amber-600/50 underline-offset-4"
            >
              Bekijk de prijzen
            </Link>
            .
          </p>
        </Reveal>

        <Reveal>
          <h2 className="mt-20 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Veelgestelde vragen over tv ophangen aan gipswand
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-8 max-w-3xl">
            <Faq items={faqItems} />
          </div>
        </Reveal>

        <Reveal>
          <h2 className="mt-20 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Ook bij u in de buurt
          </h2>
          <ProvincieChips prefix="Tv ophangen" withOverview />
        </Reveal>

        <RelatedLinks
          items={[
            ["/tv-ophangen", "Tv ophangen"],
            ["/prijzen", "Prijzen"],
            ["/diensten/tv-installatie", "Tv installatie"],
            ["/contact", "Afspraak maken"],
          ]}
        />
      </section>

      <CtaSection
        title="Twijfelt u over uw wand?"
        text="Zet het in uw aanvraag — dan weet de monteur het vooraf en heeft hij het juiste materiaal bij zich."
      />
    </main>
  );
}
