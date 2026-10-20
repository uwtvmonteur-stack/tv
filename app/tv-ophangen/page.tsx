import Link from "next/link";
import ServiceHero from "@/components/ServiceHero";
import Stappen from "@/components/Stappen";
import Faq from "@/components/Faq";
import CtaSection from "@/components/CtaSection";
import InlineCta from "@/components/InlineCta";
import Reviews from "@/components/Reviews";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import CheckList from "@/components/CheckList";
import ProvincieChips from "@/components/ProvincieChips";
import BrandMarquee from "@/components/BrandMarquee";
import IconCardGrid, { type IconCard } from "@/components/IconCardGrid";
import RelatedLinks from "@/components/RelatedLinks";
import { IconCable, IconShield, IconTv } from "@/components/icons";
import { reviewsPerDienst, type FaqItem } from "@/lib/content";
import { faqJsonLd, pageMeta, serviceJsonLd } from "@/lib/seo";
import heroFoto from "@/public/images/dienst-tv-ophangen.jpg";

export const metadata = pageMeta({
  title: "Tv Laten Ophangen — Vaste Prijs vanaf €99",
  description:
    "Tv laten ophangen door een ervaren monteur: waterpas, getest en kabels weggewerkt. Vaste prijs vanaf €99 incl. voorrijkosten en btw. Ook 's avonds en in het weekend.",
  path: "/tv-ophangen",
});

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

const stappen = [
  {
    title: "Afspraak maken",
    text: "Geef online door welk moment u uitkomt — ook 's avonds en in het weekend. Wij bevestigen binnen enkele uren.",
  },
  {
    title: "Muur & tv beoordelen",
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
    title: "Ophangen & waterpas zetten",
    text: "De tv wordt opgehangen, exact waterpas gezet en op de ideale kijkhoogte afgesteld.",
  },
  {
    title: "Aansluiten & controleren",
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
    icon: <IconTv className="h-6 w-6" />,
    h3: "Tv ophangen boven een dressoir",
    text: "Een populaire plek. We kiezen de juiste hoogte voor comfortabel kijken vanaf de bank, houden ruimte voor een soundbar en laten de kabels netjes achter het meubel verdwijnen.",
  },
  {
    icon: <IconShield className="h-6 w-6" />,
    h3: "Tv ophangen boven een open haard",
    text: "Kan een mooie oplossing zijn, mits het draagvermogen en de warmte-afgifte het toelaten. We beoordelen uw situatie altijd eerst ter plekke.",
  },
  {
    icon: <IconCable className="h-6 w-6" />,
    h3: "Tv ophangen en aansluiten",
    text: "Na het ophangen sluiten we alles in de juiste volgorde aan en houden we rekening met de ruimte voor een soundbar. Hulp met zenders en apps kan erbij.",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "Wat kost een tv ophangen?",
    a: "Tv ophangen heeft een vaste prijs op basis van het schermformaat, altijd inclusief voorrijkosten en btw — de tarieven per formaat vindt u hierboven. Het wegwerken van kabels kan er tegen meerprijs bij, altijd vooraf afgesproken.",
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
    a: "Heeft u er al een? Die monteren we gewoon. Heeft u er geen, dan regelen wij de juiste beugel voor uw tv — geef bij uw aanvraag het merk en het formaat door, dan krijgt u de prijs van de beugel er direct bij in de bevestiging. U weet dus vóór de afspraak wat het totaal wordt.",
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
    <main>
      <JsonLd
        data={serviceJsonLd({
          name: "Tv ophangen",
          description:
            "Tv ophangen aan huis door een ervaren monteur: elke beugel, elke muur, waterpas gemonteerd, kabels weggewerkt en alles aangesloten. Vaste prijzen vanaf €99.",
          path: "/tv-ophangen",
          offers: [
            { name: "Tv ophangen tot 43 inch", price: "99" },
            { name: "Tv ophangen 44 t/m 64 inch", price: "129" },
            { name: "Tv ophangen vanaf 65 inch", price: "159" },
          ],
        })}
      />
      <JsonLd data={faqJsonLd(faqItems)} />

      <ServiceHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Diensten", href: "/diensten" },
          { name: "Tv ophangen", href: "/tv-ophangen" },
        ]}
        eyebrow="Tv ophangen aan huis · ook ’s avonds en in het weekend"
        title="Tv laten ophangen"
        intro="U wijst aan waar hij moet hangen, wij doen de rest: de juiste hoogte voor uw bank, kaarsrecht opgehangen, kabels weggewerkt en alles aangesloten. U hoeft niets voor te bereiden en niets op te ruimen."
        benefits={[
          "Kaarsrecht opgehangen, op de hoogte die bij uw bank past",
          "Kabels netjes weggewerkt — u ziet er niets meer van",
          "Elke muur: steen, beton, gipswand of holle wand",
          "Vaste prijs vooraf — u betaalt pas als hij hangt en werkt",
        ]}
        image={heroFoto}
        imageAlt="Monteur hangt een grote televisie waterpas aan de woonkamermuur"
        // Deze pagina ontvangt ruim de helft van het advertentiebudget en had
        // geen enkel formulierveld: elke CTA sprong naar /contact. Van 33
        // sessies in een week kwam er nul tot een aanvraag, terwijl de
        // dienstpagina's mét formulier 9 tot 25% halen. Het blok staat ónder de
        // hero, dus de foto blijft het verkoopargument, en `planner` zet de
        // datum- en dagdeelkeuze aan die tot nu toe nergens werd getoond.
        formulier={{
          titel: "Plan het ophangen van uw tv",
          intro:
            "Vertel kort welke tv u heeft en wanneer het u schikt. U krijgt binnen enkele uren bericht met de eerstvolgende mogelijkheid en de vaste prijs voor uw situatie.",
          submitLabel: "Afspraak aanvragen",
          variant: "tv-ophangen-hero",
          berichtLabel: "Uw tv en uw muur",
          berichtPlaceholder:
            "Bijvoorbeeld: 55 inch Samsung, bakstenen muur, ik heb nog geen beugel.",
        }}
      />

      <BrandMarquee />

      <section className="mx-auto w-full max-w-6xl px-4 py-10 md:px-8">
        <Reveal immediate>
          <div className="max-w-3xl">
            <p className="leading-relaxed text-ink-soft">
              Een tv ophangen lijkt eenvoudig, maar er komt meer bij kijken dan
              vier gaten boren. Het juiste beugeltype, het draagvermogen van de
              muur, de perfecte hoogte en het onzichtbaar wegwerken van kabels
              bepalen samen of het resultaat écht strak en veilig is. Onze
              monteurs hangen elke week televisies op — van een compacte 32 inch
              in de slaapkamer tot een 85 inch boven de open haard — en kennen
              voor elke situatie de beste oplossing. Op deze pagina leest u wat
              een tv ophangen kost, wat er is inbegrepen en waar u op moet
              letten. Liever meteen geregeld?{" "}
              <Link
                href="/contact"
                className="font-semibold text-ink underline decoration-amber-600/50 underline-offset-4"
              >
                Plan een afspraak
              </Link>{" "}
              — u hoort binnen enkele uren van ons.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <h2 className="mt-20 font-display text-step-3 font-bold">
            Wat is inbegrepen bij het ophangen van een tv?
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
            Bij onze tv-ophangservice regelen we alles van begin tot eind. U
            hoeft zelf niets voor te bereiden.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <CheckList
            items={inbegrepen}
            className="mt-8 grid max-w-4xl gap-3 sm:grid-cols-2"
          />
        </Reveal>
      </section>

      {/* Bewijs komt ná de belofte en vóór de prijs: eerst vertellen wat we
          leveren, dan laten zien dat we het leveren, dan wat het kost. */}
      <div id="reviews" className="pt-6">
        <Reviews
          title="Klanten over het ophangen van hun tv"
          items={reviewsPerDienst["tv-ophangen"]}
        />
      </div>

      <section className="mx-auto w-full max-w-6xl px-4 pb-10 md:px-8">
        <Reveal>
          <h2 className="mt-20 font-display text-step-3 font-bold">
            Wat kost een tv ophangen?
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
            De prijs hangt alleen af van het schermformaat, want dat bepaalt het
            werk: een scherm vanaf 65 inch is zwaar en kwetsbaar, vraagt een
            stevigere beugel en wordt door twee monteurs opgehangen.
            Voorrijkosten, montagemateriaal en btw zitten er altijd in. De prijs
            die we vooraf afspreken is de prijs die u betaalt.
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5 text-sm font-medium">
            <span className="rounded-full bg-ink/[0.04] px-4 py-2 ring-1 ring-ink/5">
              Tot 43 inch — €99
            </span>
            <span className="rounded-full bg-ink text-cream px-4 py-2">
              44 t/m 64 inch — €129 · populair
            </span>
            <span className="rounded-full bg-ink/[0.04] px-4 py-2 ring-1 ring-ink/5">
              Vanaf 65 inch — €159
            </span>
          </div>
          <p className="mt-5 max-w-2xl text-sm text-ink-soft">
            Heeft u nog geen beugel, of wilt u de kabels weggewerkt? Geef het
            door bij uw aanvraag, dan staat het totaalbedrag in de bevestiging —
            ook dat spreken we vooraf af. Bekijk alle tarieven en opties op de{" "}
            <Link
              href="/prijzen"
              className="font-semibold text-ink underline decoration-amber-600/50 underline-offset-4"
            >
              prijzenpagina
            </Link>
            .
          </p>
        </Reveal>

        {/* Deze CTA hoort direct ná het tariefblok te staan: pas als iemand de
            prijs voor zijn formaat heeft gezien, is "plan een afspraak" een
            vraag die hij kán beantwoorden. Stond eerder per ongeluk vóór de
            prijzen, en deze pagina converteerde 0% terwijl de dienstpagina's
            mét de CTA ná de prijs 9 tot 25% doen. */}
        {/* `#afspraak`: het formulier staat op deze pagina zelf, onder de hero.
            Hiervóór sprong deze knop naar /contact en haalde hij de bezoeker
            juist weg van het formulier, op het moment dat hij zijn prijs net
            had gezien. */}
        <InlineCta
          href="#afspraak"
          title="Uw prijs staat hierboven al vast"
          text="Inclusief voorrijkosten en btw, en u betaalt pas na afloop. Kies hieronder een dag die u schikt — ook 's avonds of op zaterdag."
        />

        <Stappen title="Zo werkt het tv ophangen aan huis" steps={stappen} />

        <Reveal>
          <h2 className="mt-20 font-display text-step-3 font-bold">
            Tv ophangen aan verschillende soorten muren
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
            Elke muur vraagt om een andere aanpak en bevestiging. Onze monteurs
            herkennen het muurtype en kiezen de juiste pluggen, zodat uw tv
            overal veilig hangt. Heeft u een{" "}
            <Link
              href="/tv-ophangen-gipswand"
              className="font-semibold text-ink underline decoration-amber-600/50 underline-offset-4"
            >
              gipswand of holle wand
            </Link>
            ? Daar leest u precies hoe we dat aanpakken.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <ul className="mt-8 max-w-4xl divide-y divide-ink/10 border-y border-ink/10">
            {muren.map((m) => (
              <li key={m.h3} className="py-6">
                <h3 className="font-display text-lg font-bold tracking-tight">
                  {m.h3}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                  {m.text}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <h2 className="mt-20 font-display text-step-3 font-bold">
            Welke tv-beugel heb ik nodig?
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
            Er zijn drie hoofdtypen tv-beugels, elk met eigen voordelen. Welke
            het beste past, hangt af van uw kijkpositie, de ruimte en het formaat
            van uw tv.
          </p>
        </Reveal>
        <IconCardGrid items={beugels} columns={3} />
        <Reveal>
          <p className="mt-8 max-w-3xl leading-relaxed text-ink-soft">
            Of een beugel precies past, hoeft u niet zelf uit te zoeken — de
            monteur controleert het ter plekke. Handig om te weten waar het van
            afhangt:
          </p>
        </Reveal>
        <Reveal delay={100}>
          <CheckList
            items={beugelFactoren}
            className="mt-6 grid max-w-4xl gap-3 sm:grid-cols-2"
          />
          <p className="mt-5 max-w-2xl text-sm text-ink-soft">
            Wilt u zelf controleren of een beugel op uw tv past?{" "}
            <Link
              href="/kennisbank/welke-tv-beugel"
              className="font-semibold text-ink underline decoration-amber-600/50 underline-offset-4"
            >
              Zo meet u de VESA-maat
            </Link>
            .
          </p>
        </Reveal>

        <Reveal>
          <h2 className="mt-20 font-display text-step-3 font-bold">
            Hoe hoog moet een tv worden opgehangen?
          </h2>
          <div className="mt-4 max-w-3xl space-y-4 leading-relaxed text-ink-soft">
            <p>
              De ideale hoogte hangt af van uw zithoogte, de kijkafstand en het
              formaat van de tv. Als vuistregel houdt u het midden van het
              scherm ongeveer op ooghoogte wanneer u ontspannen op de bank zit.
              Voor de meeste woonkamers komt dat neer op het midden van het
              scherm op ongeveer 100 tot 120 cm boven de vloer — maar de juiste
              hoogte is altijd persoonlijk.
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
              <Link
                href="/kennisbank/hoe-hoog-tv-ophangen"
                className="font-semibold text-ink underline decoration-amber-600/50 underline-offset-4"
              >
                In onze kennisbank staat de rekenregel met een tabel per
                schermformaat
              </Link>
              .
            </p>
          </div>
        </Reveal>

        <Reveal>
          <h2 className="mt-20 font-display text-step-3 font-bold">
            Tv ophangen en kabels wegwerken
          </h2>
          <div className="mt-4 max-w-3xl space-y-4 leading-relaxed text-ink-soft">
            <p>
              Een zwevende tv verdient een muur zonder kabelspaghetti. Bij het
              ophangen werken we de stroom-, hdmi- en netwerkkabels netjes weg.
              De meest gekozen oplossing is een slanke kabelgoot in exact uw
              muurkleur (vanaf €39): van een afstandje vrijwel onzichtbaar en snel
              geplaatst.
            </p>
            <p>
              Wilt u helemaal geen kabel meer zien, dan kunnen we de bekabeling
              waar mogelijk volledig in de muur wegwerken. Dat spreken we vooraf
              tegen een vaste prijs met u af. Meer weten? Bekijk onze{" "}
              <Link
                href="/prijzen"
                className="font-semibold text-ink underline decoration-amber-600/50 underline-offset-4"
              >
                prijzen en opties
              </Link>
              .
            </p>
          </div>
        </Reveal>

        <Reveal>
          <h2 className="mt-20 font-display text-step-3 font-bold">
            Tv ophangen in elke situatie
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
            Elke woonkamer is anders. Voor de meest voorkomende situaties weten
            onze monteurs precies wat er nodig is.
          </p>
        </Reveal>
        <IconCardGrid items={situaties} columns={2} hover />

        <Reveal>
          <h2 className="mt-20 font-display text-step-3 font-bold">
            Tv ophangen in ons werkgebied
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
            Onze monteurs komen aan huis in Zuid-Holland, Noord-Holland, Utrecht
            en Noord-Brabant. Bekijk of we ook bij u in de buurt zijn:
          </p>
        </Reveal>
        <Reveal delay={100}>
          <ProvincieChips prefix="Tv ophangen" withOverview />
        </Reveal>

        <Reveal>
          <h2 className="mt-20 font-display text-step-3 font-bold">
            Veelgestelde vragen over tv ophangen
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-8 max-w-3xl">
            <Faq items={faqItems} />
          </div>
        </Reveal>

        <RelatedLinks
          items={[
            ["/tv-ophangen-gipswand", "Tv ophangen aan gipswand"],
            ["/diensten/tv-installatie", "Complete tv installatie"],
            ["/diensten/soundbar-installatie", "Soundbar installeren"],
            ["/kennisbank/hoe-hoog-tv-ophangen", "Hoe hoog ophangen?"],
            ["/kennisbank", "Kennisbank"],
            ["/prijzen", "Bekijk onze prijzen"],
          ]}
        />
      </section>


      {/* "Vandaag gebeld" beloofde een telefoontje terwijl er bewust nergens
          een belknop staat en de datumkiezer pas morgen begint. */}
      <CtaSection
        title="Tv ophangen? Kies een dag die u schikt"
        text="Vraag online uw afspraak aan — u krijgt binnen enkele uren bericht over de eerstvolgende mogelijkheid. Ook 's avonds en in het weekend, zonder toeslag."
      />
    </main>
  );
}
