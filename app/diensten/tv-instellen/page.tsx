import Link from "next/link";
import ServiceHero from "@/components/ServiceHero";
import Stappen from "@/components/Stappen";
import CtaSection from "@/components/CtaSection";
import Reviews from "@/components/Reviews";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import CheckList from "@/components/CheckList";
import ProvincieChips from "@/components/ProvincieChips";
import BrandMarquee from "@/components/BrandMarquee";
import IconCardGrid, { type IconCard } from "@/components/IconCardGrid";
import RelatedLinks from "@/components/RelatedLinks";
import { IconCable, IconChat, IconSliders, IconTv } from "@/components/icons";
import { reviewsPerDienst, type FaqItem } from "@/lib/content";
import { faqJsonLd, pageMeta, serviceJsonLd } from "@/lib/seo";
import heroImg from "@/public/images/dienst-tv-instellen.jpg";

export const metadata = pageMeta({
  title: "Tv Instellen & Hulp aan Huis",
  description:
    "Werkt uw tv niet meer, geen zenders of geen wifi-verbinding? Onze monteur verhelpt het bij u thuis en legt het rustig uit. Vaste prijs van €60.",
  path: "/diensten/tv-instellen",
});

const hulpItems = [
  "Geen of verkeerde zenders? Opnieuw afstemmen en sorteren",
  "Geen wifi of internet? De verbinding herstellen",
  "Netflix, Viaplay of NPO die niet werkt? Opnieuw instellen en inloggen",
  "Afstandsbediening die niet reageert — of een universele instellen",
  "Slecht of verkeerd beeld en geluid? De juiste instellingen terugzetten",
  "Rustige uitleg, net zo lang tot u het zelf kunt",
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

const situaties: IconCard[] = [
  {
    icon: <IconTv className="h-6 w-6" />,
    h3: "Ineens geen beeld of geluid",
    text: "Verkeerde bron, een instelling die is omgesprongen of een verbinding die eruit ligt? Wij zoeken uit waar het aan ligt en zetten uw tv weer aan het werk.",
  },
  {
    icon: <IconCable className="h-6 w-6" />,
    h3: "Na een verhuizing of storing",
    text: "Beeld weg, geen zenders of internet? We sluiten alles opnieuw aan, stellen het in en controleren de verbindingen — meestal binnen een uur weer werkend.",
  },
  {
    icon: <IconSliders className="h-6 w-6" />,
    h3: "Eén afstandsbediening voor alles",
    text: "We koppelen en programmeren een universele afstandsbediening, zodat u tv, soundbar en mediaspeler met één bediening aanstuurt.",
  },
  {
    icon: <IconChat className="h-6 w-6" />,
    h3: "Zenders kwijt of door elkaar",
    text: "Ineens andere zenders of alles door elkaar? We zoeken de zenders opnieuw, zetten uw favorieten weer op de juiste plek en leggen uit hoe u het zelf bijhoudt.",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "Repareren jullie ook kapotte tv's?",
    a: "Nee, wij doen geen hardwarereparaties. We helpen met alles rondom de instellingen, zenders, wifi, apps en verbindingen van uw tv. Is het toestel zelf defect (bijvoorbeeld een kapot scherm)? Dan verwijzen we u naar de fabrikant of een reparateur.",
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
    a: "Vaak al binnen 24 uur, uiterlijk binnen 48 uur. Vraag online een afspraak aan, dan laten we u binnen enkele uren weten wat de eerstvolgende mogelijkheid bij u in de buurt is.",
  },
  {
    q: "Kan de afspraak ook 's avonds of in het weekend?",
    a: "Ja, doordeweeks tot 21:00 uur en in het weekend, zonder toeslag. Vraag online een afspraak aan, dan laten we u de eerstvolgende beschikbaarheid weten.",
  },
];

export default function TvInstellenPage() {
  return (
    <main>
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

      <ServiceHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Diensten", href: "/diensten" },
          { name: "Tv instellen & hulp", href: "/diensten/tv-instellen" },
        ]}
        eyebrow="Tv hulp aan huis · vaste prijs €60"
        title="Tv hulp aan huis: uw tv snel weer werkend"
        intro="Werkt uw tv niet meer zoals het hoort? Geen zenders, geen wifi of internet, een app die niet opstart of een afstandsbediening die niet reageert? Onze monteur komt bij u thuis, verhelpt het en legt rustig uit hoe u het zelf houdt — in gewone taal, zonder jargon."
        benefits={[
          "Alles werkt weer na één bezoek",
          "Zenders, wifi en apps op orde",
          "Uitleg in gewone taal — ook prettig voor senioren",
          "Vaste prijs van €60, incl. voorrijkosten",
        ]}
        image={heroImg}
        imageAlt="Ingestelde smart-tv met heldere beeldweergave in de woonkamer"
      />

      <BrandMarquee />

      <section className="mx-auto w-full max-w-6xl px-4 py-10 md:px-8">
        <Reveal immediate>
          <div className="max-w-3xl">
            <p className="leading-relaxed text-ink-soft">
              Moderne tv&apos;s kunnen ontzettend veel, en juist daardoor gaat er
              weleens iets mis: zenders die verdwijnen, geen internet, een app
              die hapert of een instelling die per ongeluk is veranderd. Wij
              verhelpen dat soort problemen met de instellingen, software en
              verbindingen van uw tv — en leggen meteen uit hoe u het zelf houdt.
              Hardwarereparaties (zoals een kapot scherm) doen we niet.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <h2 className="mt-20 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Wat kost tv hulp aan huis?
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
            De meeste hulpvragen lost onze monteur op voor een vaste prijs van
            €60, inclusief voorrijkosten en btw. Vooraf afgesproken, geen
            verrassingen achteraf.
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5 text-sm font-medium">
            <span className="rounded-full bg-ink text-cream px-4 py-2">
              Tv hulp — vaste prijs €60
            </span>
          </div>
          <p className="mt-5 text-sm text-ink-soft">
            Bekijk alle{" "}
            <Link
              href="/prijzen"
              className="font-semibold text-ink underline decoration-amber-600/50 underline-offset-4"
            >
              prijzen
            </Link>{" "}
            of{" "}
            <Link
              href="/contact"
              className="font-semibold text-ink underline decoration-amber-600/50 underline-offset-4"
            >
              plan direct een afspraak
            </Link>
            .
          </p>
        </Reveal>

        <Reveal>
          <h2 className="mt-20 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Waarmee we u helpen
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <CheckList
            items={hulpItems}
            className="mt-8 grid max-w-4xl gap-3 sm:grid-cols-2"
          />
        </Reveal>

        <Reveal>
          <h2 className="mt-20 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Hulp met streaming en apps
          </h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-ink-soft">
            Doet Netflix, Viaplay of NPO Start het niet, of komt u niet meer
            ingelogd? We zetten uw streaming-apps weer goed en helpen u met
            inloggen. Uw wachtwoorden blijven van u — die vullen we alleen samen
            met u in.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {streaming.map((dienst) => (
              <li
                key={dienst}
                className="rounded-full bg-white px-4 py-2 text-sm font-medium ring-1 ring-ink/5"
              >
                {dienst}
              </li>
            ))}
          </ul>
        </Reveal>

        <Stappen
          title="Zo werkt tv hulp aan huis"
          steps={[
            {
              title: "Afspraak inplannen",
              text: "Plan online een moment dat u uitkomt. Vertel kort wat er niet lukt, dan komt de monteur voorbereid.",
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
          ]}
        />

        <Reveal>
          <h2 className="mt-20 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Geduldig en in gewone taal — ook voor senioren
          </h2>
          <div className="mt-4 max-w-3xl space-y-4 leading-relaxed text-ink-soft">
            <p>
              Onze monteurs zijn er niet alleen om het óp te lossen, maar ook om
              het úít te leggen. Veel van onze klanten zijn senioren die gewoon
              fijn tv willen kijken zonder gedoe. We nemen de tijd, herhalen de
              stappen zo vaak als nodig en laten desgewenst een handig
              stappenbriefje achter. Zo bent u ook na ons bezoek zelfredzaam.
            </p>
            <p>
              Geen ingewikkelde termen, geen haast. U bepaalt het tempo, en we
              gaan pas weg als u zich er zeker bij voelt.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <h2 className="mt-20 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Tv hulp in elke situatie
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
            Waar u ook op vastloopt, onze monteur helpt u snel verder.
          </p>
        </Reveal>
        <IconCardGrid items={situaties} columns={2} hover />

        <Reveal>
          <h2 className="mt-20 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Tv hulp aan huis in ons werkgebied
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
            Onze monteurs komen aan huis in Zuid-Holland, Noord-Holland, Utrecht
            en Noord-Brabant:
          </p>
        </Reveal>
        <Reveal delay={100}>
          <ProvincieChips prefix="Tv hulp" withOverview />
        </Reveal>

        <Reveal>
          <h2 className="mt-20 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Veelgestelde vragen over tv hulp
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-8 max-w-3xl">
            <Faq items={faqItems} />
          </div>
        </Reveal>

        <RelatedLinks
          items={[
            ["/diensten/tv-installatie", "Complete tv installatie"],
            ["/tv-ophangen", "Tv ophangen"],
            ["/diensten/soundbar-installatie", "Soundbar installeren"],
            ["/prijzen", "Alle prijzen"],
          ]}
        />
      </section>

      <Reviews
        title="Klanten over onze hulp aan huis"
        items={reviewsPerDienst["tv-instellen"]}
      />

      <CtaSection
        title="Vandaag nog hulp bij uw tv?"
        text="Plan online een afspraak — vaak kunnen we binnen 24 uur bij u langskomen."
      />
    </main>
  );
}
