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
import { IconChip } from "@/components/ui";
import {
  IconCable,
  IconChat,
  IconSliders,
  IconSpeaker,
  IconTv,
} from "@/components/icons";
import { SITE } from "@/lib/site";
import type { FaqItem } from "@/lib/content";
import { faqJsonLd, pageMeta, serviceJsonLd } from "@/lib/seo";
import familieImg from "@/public/images/dienst-soundbar.jpg";

export const metadata = pageMeta({
  title: "Soundbar Installeren — v.a. €49",
  description:
    "Soundbar laten installeren? Wij monteren, sluiten aan en stellen het geluid af op uw kamer — ook surround en home-cinema. Vanaf €49.",
  path: "/diensten/soundbar-installatie",
});

const audioItems = [
  "Soundbar of speakerset vakkundig monteren",
  "Draadloze subwoofer en achterspeakers koppelen",
  "Verbinden via HDMI ARC of eARC",
  "Surround- en home-cinema-sets volledig aansluiten",
  "Geluid testen en fijn afstellen",
  "Eén afstandsbediening voor tv én audio",
];

const keuze: IconCard[] = [
  {
    icon: <IconSpeaker className="h-6 w-6" />,
    h3: "Losse soundbar",
    text: "De eenvoudigste upgrade: één balk onder de tv voor voller, helderder geluid. Ideaal als u vooral series en films kijkt en het strak wilt houden.",
  },
  {
    icon: <IconSliders className="h-6 w-6" />,
    h3: "Soundbar met surround",
    text: "Een soundbar met draadloze subwoofer en achterspeakers voor echt ruimtelijk geluid. Wij plaatsen en koppelen alles en stellen het surround-beeld af op uw kamer.",
  },
  {
    icon: <IconTv className="h-6 w-6" />,
    h3: "Complete home-cinema",
    text: "Een volledige set met versterker en meerdere speakers voor bioscoopgeluid thuis. We verzorgen de bekabeling, de aansluiting en de fijnafstemming — op maat.",
  },
];

const situaties: IconCard[] = [
  {
    icon: <IconSpeaker className="h-6 w-6" />,
    h3: "Nieuwe soundbar gekocht",
    text: "Net een soundbar of set in huis? Wij monteren, sluiten aan en stellen af — u hoort meteen het verschil zonder zelf te hoeven uitzoeken welke kabel waar hoort.",
  },
  {
    icon: <IconTv className="h-6 w-6" />,
    h3: "Samen met tv ophangen",
    text: "De meest gekozen combinatie: eerst de tv, direct daarna de soundbar. Eén bezoek, geen extra voorrijkosten, en de kabels van beide netjes weggewerkt.",
  },
  {
    icon: <IconCable className="h-6 w-6" />,
    h3: "Bestaande set opnieuw aansluiten",
    text: "Verhuisd of alles in de war na een nieuwe tv? We sluiten uw bestaande soundbar of surround-set weer correct aan en stellen het geluid opnieuw af.",
  },
  {
    icon: <IconChat className="h-6 w-6" />,
    h3: "Advies over de beste set",
    text: "Nog geen soundbar? De monteur denkt mee over wat past bij uw kamer, tv en budget — eerlijk advies, zonder u iets aan te praten.",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "Werkt een soundbar met elke tv?",
    a: "Vrijwel altijd, ongeacht het merk of de leeftijd van uw televisie. Twijfelt u of uw tv geschikt is? Bel ons, dan kijken we het zo met u na.",
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
    a: `Ja, doordeweeks tot 21:00 uur en in het weekend, zonder toeslag. Bel ${SITE.phoneDisplay} voor de eerstvolgende beschikbaarheid.`,
  },
];

export default function SoundbarPage() {
  return (
    <main>
      <JsonLd
        data={serviceJsonLd({
          name: "Soundbar installeren",
          description:
            "Soundbar, surround-set of home-cinema installeren en perfect afstellen aan huis.",
          path: "/diensten/soundbar-installatie",
          offers: [
            { name: "Soundbar installeren", price: "49" },
            { name: "Surround-set aansluiten", price: "79" },
          ],
        })}
      />
      <JsonLd data={faqJsonLd(faqItems)} />

      <ServiceHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Diensten", href: "/diensten" },
          {
            name: "Soundbar installeren",
            href: "/diensten/soundbar-installatie",
          },
        ]}
        eyebrow="Soundbar installeren · aan huis · v.a. €49"
        title="Soundbar en audio installeren"
        intro="Goed beeld verdient goed geluid. Wij sluiten uw soundbar, surround-set of complete home-cinema aan en stellen alles af op uw kamer — zodat elke film klinkt zoals de maker het bedoelde."
        benefits={[
          "Soundbar strak gemonteerd en kabels weggewerkt",
          "Subwoofer en achterspeakers draadloos gekoppeld",
          "Aangesloten via HDMI ARC / eARC",
          "Perfect afgesteld voor uw ruimte",
        ]}
        image={familieImg}
        imageAlt="Stel geniet 's avonds van film en geluid via een wandgemonteerde tv"
      />

      <BrandMarquee />

      <section className="mx-auto w-full max-w-6xl px-4 py-10 md:px-8">
        <Reveal immediate>
          <div className="max-w-3xl">
            <p className="leading-relaxed text-ink-soft">
              Moderne tv&apos;s zijn flinterdun — en dat hoort u: de ingebouwde
              speakers halen het niet bij een echte soundbar of surround-set.
              Wij zorgen dat uw beeld eindelijk het geluid krijgt dat het
              verdient. Van een enkele soundbar tot een volledige home-cinema met
              subwoofer en achterspeakers: we monteren, sluiten aan en stellen
              alles zorgvuldig af op de akoestiek van uw kamer.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <h2 className="mt-20 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Wat kost soundbar installeren?
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
            Vaste prijzen, inclusief montage, aansluiten en afstellen — altijd
            inclusief voorrijkosten en btw.
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5 text-sm font-medium">
            <span className="rounded-full bg-ink text-cream px-4 py-2">
              Soundbar installeren — €49 · populair
            </span>
            <span className="rounded-full bg-ink/[0.04] px-4 py-2 ring-1 ring-ink/5">
              Surround-set — vanaf €79
            </span>
            <span className="rounded-full bg-ink/[0.04] px-4 py-2 ring-1 ring-ink/5">
              Home-cinema — prijs op maat
            </span>
          </div>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ink-soft">
            Bekijk alle tarieven en opties op de{" "}
            <Link
              href="/prijzen"
              className="font-semibold text-ink underline decoration-amber-600/50 underline-offset-4"
            >
              prijzenpagina
            </Link>
            .
          </p>
        </Reveal>

        <Reveal>
          <h2 className="mt-20 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Van soundbar tot home-cinema
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <CheckList
            items={audioItems}
            className="mt-8 grid max-w-4xl gap-3 sm:grid-cols-2"
          />
        </Reveal>

        <Reveal>
          <h2 className="mt-20 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Soundbar, surround of home-cinema — wat past bij u?
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
            Elke woonkamer en elk budget is anders. De monteur adviseert wat het
            beste bij uw situatie past.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <ul className="mt-8 max-w-4xl divide-y divide-ink/10 border-y border-ink/10">
            {keuze.map((k) => (
              <li key={k.h3} className="flex items-start gap-5 py-6">
                <IconChip>{k.icon}</IconChip>
                <div>
                  <h3 className="font-display text-lg font-bold tracking-tight">
                    {k.h3}
                  </h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink-soft">
                    {k.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <h2 className="mt-20 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Hoe sluiten we uw soundbar aan?
          </h2>
          <div className="mt-4 max-w-3xl space-y-4 leading-relaxed text-ink-soft">
            <p>
              De aansluitmethode bepaalt hoe goed uw geluid wordt. Waar mogelijk
              gebruiken we{" "}
              <strong className="font-semibold text-ink">
                HDMI ARC of eARC
              </strong>
              : dat geeft het volle, ongecomprimeerde geluid én zorgt dat u tv en
              soundbar met één afstandsbediening bedient. Heeft uw tv geen HDMI
              ARC, dan is een optische kabel een prima alternatief.
            </p>
            <p>
              We controleren de aansluitingen van uw tv, kiezen de beste
              verbinding en testen het resultaat met beeld en muziek. Daarna
              stellen we het geluid af op uw kamer — zodat stemmen helder blijven
              en de bas niet dreunt.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <h2 className="mt-20 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Soundbar plaatsen: onder de tv of aan de muur
          </h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-ink-soft">
            Staat uw tv aan de muur, dan oogt een soundbar die netjes
            gecentreerd eronder hangt het strakst — perfect uitgelijnd en met de
            kabels mee weggewerkt. Staat de tv op een meubel, dan plaatsen we de
            soundbar ervoor of eronder, op de juiste hoogte voor het beste
            geluid. We denken mee over de mooiste én best klinkende plek.
          </p>
        </Reveal>

        <Stappen
          title="Zo verloopt de soundbar-installatie"
          steps={[
            {
              title: "Afspraak inplannen",
              text: "Kies online of telefonisch een moment dat u uitkomt. Geef door welke soundbar of set u heeft, dan komt de monteur voorbereid.",
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
          ]}
        />

        <Reveal>
          <h2 className="mt-20 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Alle grote audiomerken
          </h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-ink-soft">
            Onze monteurs installeren dagelijks soundbars en sets van Sonos,
            Samsung, LG, Bose, JBL, Philips, Denon en meer. Elk merk heeft zijn
            eigen app, aansluitopties en instellingen — en wij kennen ze. Zo
            haalt u het maximale uit de set die u al heeft of net heeft gekocht.
          </p>
        </Reveal>

        <Reveal>
          <h2 className="mt-20 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Soundbar installeren in elke situatie
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
            Waarvoor u ons ook belt, onze monteurs zorgen voor het beste geluid
            in uw kamer.
          </p>
        </Reveal>
        <IconCardGrid items={situaties} columns={2} hover />

        <Reveal>
          <h2 className="mt-20 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Soundbar installeren in ons werkgebied
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
            Onze monteurs komen aan huis in Zuid-Holland, Noord-Holland, Utrecht
            en Noord-Brabant:
          </p>
        </Reveal>
        <Reveal delay={100}>
          <ProvincieChips prefix="Soundbar installeren" withOverview />
        </Reveal>

        <Reveal>
          <h2 className="mt-20 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Veelgestelde vragen over soundbar-installatie
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-8 max-w-3xl">
            <Faq items={faqItems} />
          </div>
        </Reveal>

        <RelatedLinks
          items={[
            ["/tv-ophangen", "Tv ophangen"],
            ["/diensten/tv-installatie", "Complete tv installatie"],
            ["/diensten/tv-instellen", "Tv instellen & hulp"],
            ["/prijzen", "Bekijk onze prijzen"],
          ]}
        />
      </section>

      <Reviews />

      <CtaSection title="Bioscoopgeluid in uw woonkamer?" />
    </main>
  );
}
