import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CtaSection from "@/components/CtaSection";
import BrandMarquee from "@/components/BrandMarquee";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import Reviews from "@/components/Reviews";
import PriceCards from "@/components/PriceCards";
import {
  BezelCard,
  DienstIcon,
  Eyebrow,
  IconChip,
  Stars,
} from "@/components/ui";
import {
  IconArrowUpRight,
  IconCheck,
  IconClock,
    IconShield,
} from "@/components/icons";
import { diensten, dienstHref, faqAlgemeen } from "@/lib/content";
import { provincies, stedenInProvincie } from "@/lib/steden";
import { faqJsonLd, pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";
import heroImg from "@/public/images/hero-woonkamer.jpg";
import beugelImg from "@/public/images/tv-beugel-detail.jpg";
import monteurImg from "@/public/images/monteur-aan-het-werk.jpg";

const meta = pageMeta({
  title: "Tv Monteur aan Huis — Ophangen & Installatie",
  description:
    "Op zoek naar een tv monteur aan huis? Wij hangen uw tv op, werken kabels weg en installeren alles. Vaste prijzen incl. voorrijkosten, vaak binnen 24 uur.",
  path: "/",
});

export const metadata: Metadata = {
  ...meta,
  title: {
    absolute: "Tv Ophangen & Installatie aan Huis | Uw TV Monteur",
  },
};

function Hero() {
  return (
    // `svh` i.p.v. `dvh`: dvh groeit zodra de mobiele adresbalk inklapt en
    // verschuift dan de hele hero (layout shift tijdens het scrollen).
    <section className="relative flex min-h-[100svh] items-end overflow-hidden">
      <Image
        src={heroImg}
        alt="Wandgemonteerde tv in een sfeervolle moderne woonkamer bij schemering"
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-black/30" />
      <div className="absolute inset-0 bg-linear-to-r from-black/40 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pt-28 pb-10 md:px-8 md:pt-44 md:pb-24 [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
        <Reveal immediate>
          <Eyebrow light>Tv ophangen & installatie aan huis · Heel Nederland</Eyebrow>
        </Reveal>
        <Reveal immediate>
          <h1 className="mt-7 max-w-3xl font-display text-5xl leading-[0.98] font-bold tracking-tight text-white md:text-7xl lg:text-[5rem]">
            Uw tv monteur aan huis.
            <span className="mt-2 block text-amber-400">
              Strak aan de muur, zonder gedoe.
            </span>
          </h1>
        </Reveal>
        <Reveal immediate>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
            Onze monteur hangt uw tv waterpas op, werkt de kabels netjes weg en
            sluit alles aan — u hoeft zelf niets te doen. Vaste prijs vooraf, u
            betaalt pas als het klaar is.
          </p>
        </Reveal>
        <Reveal immediate>
          {/* Eén actie per scherm: alles wijst naar het afspraakformulier. */}
          <div className="mt-8">
            <Link
              href="/contact"
              className="group flex w-full items-center justify-center gap-3 rounded-full bg-cream py-2.5 pr-2.5 pl-7 text-base font-semibold text-ink transition-transform duration-300 ease-fluid active:scale-[0.98] sm:inline-flex sm:w-auto"
            >
              Plan een afspraak
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink/10 transition-transform duration-500 ease-spring group-hover:-translate-y-px group-hover:translate-x-0.5 group-hover:scale-105">
                <IconArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </Reveal>
        <Reveal immediate>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/80">
            <span className="flex items-center gap-2">
              <Stars />
              <strong className="font-semibold text-white">
                {SITE.reviews.score} / 5
              </strong>
              {SITE.reviews.url ? (
                <a
                  href={SITE.reviews.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-white/40 underline-offset-2"
                >
                  {SITE.reviews.count} reviews
                </a>
              ) : (
                <>{SITE.reviews.count} reviews</>
              )}
            </span>
            <span className="flex items-center gap-2">
              <IconShield className="h-4 w-4 text-amber-400" />
              Volledig verzekerd
            </span>
            <span className="flex items-center gap-2">
              <IconClock className="h-4 w-4 text-amber-400" />
              Ook &apos;s avonds en in het weekend
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Diensten() {
  const [tvOphangen, tvInstallatie, soundbar, instellen] = diensten;

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-24 md:px-8 md:py-36">
      <Reveal>
        <div className="max-w-2xl">
          <Eyebrow>Onze diensten</Eyebrow>
          <h2 className="mt-6 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Alles voor het perfecte kijkmoment
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            Van tv ophangen tot alles ingesteld: één monteur, één afspraak, en
            alles werkt.
          </p>
        </div>
      </Reveal>

      <ul className="mt-14 grid gap-4 lg:grid-cols-12">
        <li className="lg:col-span-7 lg:row-span-2">
          <Reveal className="h-full">
          <Link
            href={dienstHref(tvOphangen)}
            className="group block h-full"
          >
            <BezelCard className="h-full transition-transform duration-500 ease-fluid group-hover:-translate-y-1">
              <div className="flex h-full flex-col overflow-hidden rounded-[calc(2rem-0.375rem)] md:flex-row">
                <div className="flex flex-1 flex-col justify-between gap-8 p-8 md:p-10">
                  <div>
                    <IconChip>
                      <DienstIcon slug={tvOphangen.slug} />
                    </IconChip>
                    <h3 className="mt-6 font-display text-2xl font-bold tracking-tight md:text-3xl">
                      {tvOphangen.naam}
                    </h3>
                    <p className="mt-4 leading-relaxed text-ink-soft">
                      Vast, kantelbaar of volledig draaibaar — wij monteren elke
                      tv op elke muur. Heeft u nog geen beugel? Dan regelen we er
                      op aanvraag een voor u.
                    </p>
                  </div>
                  <ul className="flex flex-col gap-3 text-sm font-medium">
                    {[
                      "Gratis beugeladvies op maat",
                      "Elke muur: steen, beton, hout of gips",
                      "Waterpas gemonteerd én getest",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-600/10 text-amber-700">
                          <IconCheck className="h-3.5 w-3.5" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative min-h-64 md:w-2/5">
                  <Image
                    src={beugelImg}
                    alt="Tv op een draaibare wandbeugel, elegant van de muur gedraaid"
                    fill
                    placeholder="blur"
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </BezelCard>
          </Link>
          </Reveal>
        </li>

        {[tvInstallatie, soundbar].map((dienst, i) => (
          <li key={dienst.slug} className="lg:col-span-5">
            <Reveal delay={100 + i * 100} className="h-full">
            <Link href={dienstHref(dienst)} className="group block h-full">
              <BezelCard
                className="h-full transition-transform duration-500 ease-fluid group-hover:-translate-y-1"
                innerClassName="p-8 md:p-9"
              >
                <IconChip>
                  <DienstIcon slug={dienst.slug} />
                </IconChip>
                <h3 className="mt-6 font-display text-xl font-bold tracking-tight md:text-2xl">
                  {dienst.naam}
                </h3>
                <p className="mt-3 leading-relaxed text-ink-soft">
                  {dienst.kort}
                </p>
              </BezelCard>
            </Link>
            </Reveal>
          </li>
        ))}

        <li className="lg:col-span-12">
          <Reveal delay={100} className="h-full">
          <Link href={dienstHref(instellen)} className="group block h-full">
            <BezelCard
              className="h-full transition-transform duration-500 ease-fluid group-hover:-translate-y-1"
              innerClassName="flex items-center gap-6 p-8"
            >
              <IconChip>
                <DienstIcon slug={instellen.slug} />
              </IconChip>
              <div>
                <h3 className="font-display text-xl font-bold tracking-tight">
                  {instellen.naam}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {instellen.kort}
                </p>
              </div>
            </BezelCard>
          </Link>
          </Reveal>
        </li>
      </ul>

      <Reveal>
        <div className="mt-10 flex justify-center">
          <Link
            href="/diensten"
            className="group flex items-center gap-2.5 rounded-full py-2.5 pr-2.5 pl-6 text-sm font-semibold ring-1 ring-ink/15 transition-colors duration-300 ease-fluid hover:bg-ink/5"
          >
            Bekijk alle diensten
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink/5 transition-transform duration-500 ease-spring group-hover:-translate-y-px group-hover:translate-x-0.5">
              <IconArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

const steps = [
  {
    nr: "01",
    title: "Plan uw afspraak",
    text: "Online in één minuut geregeld, ook 's avonds en in het weekend. Wij nemen binnen enkele uren contact met u op om datum en tijd te bevestigen.",
  },
  {
    nr: "02",
    title: "De monteur komt langs",
    text: "Met het juiste gereedschap en beschermmateriaal. Een halfuur voor aankomst krijgt u een belletje, zodat u nooit hoeft te wachten.",
  },
  {
    nr: "03",
    title: "Achteroverleunen",
    text: "Uw tv hangt perfect waterpas, alles is aangesloten en ingesteld, en wij nemen al het verpakkings- en boorafval mee terug.",
  },
];

function Werkwijze() {
  return (
    <section className="px-2 md:px-6">
      <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-ink px-4 py-24 text-cream md:px-8 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <Reveal>
              <Eyebrow light>Onze werkwijze</Eyebrow>
              <h2 className="mt-6 font-display text-4xl font-bold tracking-tight md:text-5xl">
                Geregeld in drie stappen
              </h2>
            </Reveal>
            <div className="mt-12 flex flex-col">
              {steps.map((step, i) => (
                <Reveal key={step.nr} delay={i * 100}>
                  <div
                    className={`flex gap-6 py-8 ${
                      i > 0 ? "border-t border-white/10" : ""
                    }`}
                  >
                    <span className="font-display text-sm font-bold tracking-widest text-amber-500">
                      {step.nr}
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-bold tracking-tight md:text-2xl">
                        {step.title}
                      </h3>
                      <p className="mt-3 leading-relaxed text-white/70">
                        {step.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={150}>
            <div className="rounded-[2rem] bg-white/5 p-1.5 ring-1 ring-white/10 transition-transform duration-700 ease-fluid md:rotate-2 md:hover:rotate-0">
              <div className="overflow-hidden rounded-[calc(2rem-0.375rem)]">
                <Image
                  src={monteurImg}
                  alt="Monteur van Uw TV Monteur monteert een tv perfect waterpas"
                  placeholder="blur"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Prijzen() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-24 md:px-8 md:py-36">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Vaste prijzen</Eyebrow>
          <h2 className="mt-6 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Duidelijk vooraf, nooit verrassingen
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            De prijs die we vooraf afspreken is de prijs die u betaalt — zonder
            kleine lettertjes.
          </p>
        </div>
      </Reveal>

      <div className="mt-16">
        <PriceCards headingLevel="h3" />
      </div>

      <Reveal delay={200}>
        <p className="mt-10 text-center text-sm text-ink-soft">
          Geen aanbetaling: u betaalt pas na afloop, per pin of betaalverzoek.{" "}
          <Link
            href="/prijzen"
            className="font-semibold text-ink underline decoration-amber-600/50 underline-offset-4"
          >
            Bekijk alle prijzen en aanvullende diensten
          </Link>
        </p>
      </Reveal>
    </section>
  );
}

function Werkgebied() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-24 md:px-8 md:py-36">
      <Reveal>
        <div className="max-w-2xl">
          <Eyebrow>Werkgebied</Eyebrow>
          <h2 className="mt-6 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Een tv monteur bij u in de buurt
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            Dagelijks onderweg in Zuid-Holland, Noord-Holland, Utrecht en
            Noord-Brabant. Kijk of we ook bij u in de buurt komen.
          </p>
        </div>
      </Reveal>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {provincies.map((provincie, i) => {
          const topSteden = stedenInProvincie(provincie.slug).slice(0, 3);
          return (
            <li key={provincie.slug} className="h-full">
              <Reveal delay={i * 80} className="h-full">
              <BezelCard className="h-full" innerClassName="flex h-full flex-col gap-4 p-7">
                <h3 className="font-display text-lg font-bold tracking-tight">
                  <Link
                    href={`/werkgebied/${provincie.slug}`}
                    className="transition-colors duration-300 ease-fluid hover:text-amber-700"
                  >
                    {provincie.naam}
                  </Link>
                </h3>
                <ul className="flex flex-col gap-2 text-sm text-ink-soft">
                  {topSteden.map((stad) => (
                    <li key={stad.slug}>
                      <Link
                        href={`/tv-monteur/${stad.slug}`}
                        className="transition-colors duration-300 ease-fluid hover:text-ink"
                      >
                        Tv monteur {stad.naam}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/werkgebied/${provincie.slug}`}
                  className="group mt-auto flex w-max items-center gap-2 text-sm font-semibold"
                >
                  Alle plaatsen
                  <IconArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 ease-spring group-hover:-translate-y-px group-hover:translate-x-0.5" />
                </Link>
              </BezelCard>
              </Reveal>
            </li>
          );
        })}
      </ul>

      <Reveal>
        <div className="mt-10 flex justify-center">
          <Link
            href="/werkgebied"
            className="group flex items-center gap-2.5 rounded-full py-2.5 pr-2.5 pl-6 text-sm font-semibold ring-1 ring-ink/15 transition-colors duration-300 ease-fluid hover:bg-ink/5"
          >
            Bekijk het volledige werkgebied
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink/5 transition-transform duration-500 ease-spring group-hover:-translate-y-px group-hover:translate-x-0.5">
              <IconArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

function FaqSectie() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-24 md:px-8 md:py-36">
      <JsonLd data={faqJsonLd(faqAlgemeen)} />
      <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
        <div className="lg:col-span-2">
          <Reveal>
            <Eyebrow>Veelgestelde vragen</Eyebrow>
            <h2 className="mt-6 font-display text-4xl font-bold tracking-tight md:text-5xl">
              Alles wat u wilt weten
            </h2>
            <p className="mt-5 leading-relaxed text-ink-soft">
              Staat uw vraag er niet tussen? Stel hem gerust in het{" "}
              <Link
                href="/contact"
                className="font-semibold text-ink underline decoration-amber-600/50 underline-offset-4"
              >
                aanvraagformulier
              </Link>{" "}
              — we denken graag met u mee.
            </p>
          </Reveal>
        </div>
        <Reveal delay={100} className="lg:col-span-3">
          <Faq items={faqAlgemeen} />
        </Reveal>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <main>
      {/* Volgorde volgt de beslisvolgorde van een advertentiebezoeker:
          wat doen jullie → wat kost het → hoe werkt het → bewijs → twijfels → actie. */}
      <Hero />
      <Diensten />
      <Prijzen />
      <Werkwijze />
      <BrandMarquee />
      <Reviews />
      <FaqSectie />
      <Werkgebied />
      <CtaSection />
    </main>
  );
}
