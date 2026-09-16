import Link from "next/link";
import ServiceHero from "@/components/ServiceHero";
import Stappen from "@/components/Stappen";
import CtaSection from "@/components/CtaSection";
import Reviews from "@/components/Reviews";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import ProvincieChips from "@/components/ProvincieChips";
import BrandMarquee from "@/components/BrandMarquee";
import IconCardGrid, { type IconCard } from "@/components/IconCardGrid";
import RelatedLinks from "@/components/RelatedLinks";
import CheckList from "@/components/CheckList";
import { IconChat, IconSliders, IconSpeaker, IconTv } from "@/components/icons";
import { SITE } from "@/lib/site";
import type { FaqItem } from "@/lib/content";
import { faqJsonLd, pageMeta, serviceJsonLd } from "@/lib/seo";
import heroImg from "@/public/images/dienst-tv-installatie.jpg";

export const metadata = pageMeta({
  title: "Tv Installatie aan Huis — Vaste Prijs €70",
  description:
    "Nieuwe tv gekocht? Wij maken hem gebruiksklaar aan huis: aansluiten, zenders, wifi en apps instellen en uitleg. Vaste prijs €70. Ophangen kan als optie.",
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

const apparatuur: IconCard[] = [
  {
    icon: <IconSpeaker className="h-6 w-6" />,
    h3: "Soundbar en audio",
    text: "Heeft u een soundbar of surround-systeem? Wij sluiten deze aan, bijvoorbeeld via HDMI ARC of eARC, en controleren of het geluid goed werkt.",
  },
  {
    icon: <IconChat className="h-6 w-6" />,
    h3: "Apple TV, Chromecast en mediaspelers",
    text: "Heeft u een Apple TV, Chromecast, Fire TV of andere mediaspeler? Wij sluiten deze aan, verbinden hem met internet en helpen met de gewenste apps.",
  },
  {
    icon: <IconSliders className="h-6 w-6" />,
    h3: "PlayStation, Xbox en Nintendo Switch",
    text: "Ook uw spelcomputer kunnen we aansluiten. Waar mogelijk controleren we instellingen zoals HDR en de geschikte beeldmodus voor gaming.",
  },
  {
    icon: <IconTv className="h-6 w-6" />,
    h3: "Tv-ontvanger en decoder",
    text: "We sluiten uw tv-ontvanger of decoder aan, zoeken de zenders en controleren of alles correct werkt.",
  },
];

const situaties: IconCard[] = [
  {
    icon: <IconTv className="h-6 w-6" />,
    h3: "Nieuwe tv gekocht",
    text: "Uw nieuwe televisie is binnen, maar u wilt hem niet zelf installeren? Wij pakken hem uit, plaatsen hem, sluiten alles aan en stellen hem volledig in. Na onze afspraak kunt u direct kijken.",
  },
  {
    icon: <IconChat className="h-6 w-6" />,
    h3: "Hulp omdat u niet technisch bent",
    text: "Geen probleem. Wij nemen de tijd om alles rustig uit te leggen. U hoeft geen technische kennis te hebben.",
  },
  {
    icon: <IconSliders className="h-6 w-6" />,
    h3: "Van oude naar nieuwe tv",
    text: "Een nieuwer of groter toestel in huis? Wij sluiten uw nieuwe tv aan, zetten uw zenders, apps en accounts weer klaar en ruimen de oude opstelling netjes op.",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "Kunnen jullie mijn tv ook ophangen?",
    a: "Ja. Het ophangen van uw tv aan de muur kan als extra optie tijdens dezelfde afspraak worden uitgevoerd, vanaf €99.",
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
    <main>
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

      <ServiceHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Diensten", href: "/diensten" },
          { name: "Tv installatie", href: "/diensten/tv-installatie" },
        ]}
        eyebrow="Tv installatie · aan huis · vaste prijs €70"
        title="Tv installatie aan huis"
        intro="Uw nieuwe tv volledig geïnstalleerd en direct gebruiksklaar. Wij sluiten uw tv en apparatuur aan, stellen zenders, wifi, apps, beeld en geluid voor u in en leggen rustig uit hoe alles werkt."
        benefits={[
          "Zenders, wifi en streaming-apps ingesteld",
          "Soundbar, decoder en andere apparatuur aangesloten",
          "Beeld en geluid zorgvuldig ingesteld",
          "Tv ophangen aan de muur mogelijk als extra optie",
        ]}
        image={heroImg}
        imageAlt="Volledig geïnstalleerde tv aan de muur in een moderne woonkamer"
      />

      <BrandMarquee />

      <section className="mx-auto w-full max-w-6xl px-4 py-10 md:px-8">
        <Reveal immediate>
          <div className="max-w-3xl">
            <p className="leading-relaxed text-ink-soft">
              Een nieuwe televisie aansluiten is meer dan de stekker erin doen:
              zenders instellen, wifi verbinden en alle apparaten goed laten
              samenwerken. Onze monteur komt bij u thuis, sluit uw tv en
              apparatuur aan, stelt alles zorgvuldig in en legt daarna rustig uit
              hoe u de tv en afstandsbediening gebruikt. Eén afspraak, en uw
              nieuwe tv is direct gebruiksklaar.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <h2 className="mt-20 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Wat kost een tv installatie aan huis?
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
            Eén vaste prijs voor de complete installatie, inclusief btw en
            voorrijkosten. Wat we vooraf afspreken, is wat u betaalt — geen
            verrassingen achteraf.
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5 text-sm font-medium">
            <span className="rounded-full bg-ink text-cream px-5 py-2.5">
              Complete tv installatie — vaste prijs €70
            </span>
          </div>
        </Reveal>

        <Reveal>
          <h2 className="mt-20 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Wat is inbegrepen bij de tv installatie?
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
            Bij een standaard tv installatie regelen wij onder andere:
          </p>
        </Reveal>
        <Reveal delay={100}>
          <CheckList
            items={inbegrepen}
            className="mt-8 grid max-w-4xl gap-3 sm:grid-cols-2"
          />
        </Reveal>

        <Reveal>
          <h2 className="mt-20 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Ook uw andere apparatuur aansluiten
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
            Uw televisie staat meestal niet alleen. Daarom kunnen we ook de
            apparatuur rondom uw tv aansluiten en instellen.
          </p>
        </Reveal>
        <IconCardGrid items={apparatuur} columns={2} hover />

        <Stappen
          title="Zo werkt onze tv installatie"
          steps={[
            {
              title: "Afspraak maken",
              text: "Plan eenvoudig online een afspraak of bel ons. We spreken een geschikt moment met u af.",
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
          ]}
        />
        <Reveal>
          <h2 className="mt-20 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Tv installatie voor iedere situatie
          </h2>
        </Reveal>
        <IconCardGrid items={situaties} columns={2} hover />

        <Reveal>
          <div className="mt-20 rounded-[2rem] bg-cream-deep/60 p-8 md:p-10">
            <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              Tv laten installeren of alleen ophangen?
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-display text-lg font-bold tracking-tight">
                  Alleen tv ophangen
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                  Wilt u vooral dat uw televisie veilig en waterpas aan de muur
                  wordt gemonteerd? Bekijk dan onze{" "}
                  <Link
                    href="/tv-ophangen"
                    className="font-semibold text-ink underline decoration-amber-600/50 underline-offset-4"
                  >
                    tv ophangservice
                  </Link>{" "}
                  vanaf €99.
                </p>
              </div>
              <div>
                <h3 className="font-display text-lg font-bold tracking-tight">
                  Complete tv installatie
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                  Wilt u dat uw tv wordt aangesloten, met wifi wordt verbonden,
                  zenders en apps krijgt, met uw apparatuur samenwerkt en aan u
                  wordt uitgelegd? Dan is de complete tv installatie aan huis de
                  beste keuze.
                </p>
              </div>
            </div>
            <p className="mt-6 text-[15px] leading-relaxed text-ink-soft">
              Twijfelt u welke service bij u past? Bel{" "}
              <a
                href={`tel:${SITE.phone}`}
                className="font-semibold text-ink underline decoration-amber-600/50 underline-offset-4"
              >
                {SITE.phoneDisplay}
              </a>{" "}
              — wij denken graag met u mee.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <h2 className="mt-20 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Veelgestelde vragen over tv installatie
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-8 max-w-3xl">
            <Faq items={faqItems} />
          </div>
        </Reveal>

        <Reveal>
          <h2 className="mt-20 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Tv installatie aan huis in uw regio
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
            Wij helpen klanten aan huis met tv installatie, montage en technische
            ondersteuning in Zuid-Holland, Noord-Holland, Utrecht en
            Noord-Brabant. Woont u in een andere plaats? Neem gerust contact op —
            we bekijken graag of we u kunnen helpen.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <ProvincieChips prefix="Tv installatie" withOverview />
        </Reveal>

        <RelatedLinks
          items={[
            ["/tv-ophangen", "Tv ophangen"],
            ["/diensten/soundbar-installatie", "Soundbar installeren"],
            ["/diensten/tv-instellen", "Tv instellen & hulp"],
            ["/prijzen", "Bekijk onze prijzen"],
          ]}
        />
      </section>

      <Reviews />

      <CtaSection
        title="Uw nieuwe tv. Wij regelen de rest."
        text="Van aansluiten en instellen tot persoonlijke uitleg — wij zorgen dat uw nieuwe tv gewoon werkt."
      />
    </main>
  );
}
