import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CtaSection from "@/components/CtaSection";
import Bezwaren from "@/components/Bezwaren";
import ContactForm from "@/components/ContactForm";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import Reviews from "@/components/Reviews";
import PriceCards from "@/components/PriceCards";
import {
  BezelCard,
  Button,
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
import { bezwaren, diensten, dienstHref, faqAlgemeen } from "@/lib/content";
import { provincies, stedenInProvincie } from "@/lib/steden";
import { faqJsonLd, pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";
import heroImg from "@/public/images/hero-woonkamer.jpg";
// tv-beugel-detail.jpg toont een beugel die fysiek niet kan bestaan: de arm
// raakt alleen de rechterrand van het scherm, zonder VESA-bevestiging. Op de
// homepagekaart van een tv-ophangbedrijf is dat precies het verkeerde beeld.
import beugelImg from "@/public/images/dienst-tv-ophangen.jpg";
import monteurImg from "@/public/images/monteur-aan-het-werk.jpg";

const meta = pageMeta({
  title: "Tv ophangen aan huis — vaste prijs, geen voorrijkosten",
  description:
    "Tv laten ophangen aan huis? Wij hangen uw tv op, sluiten alles aan en werken de kabels weg. Vaste prijs vooraf vanaf €99, 's avonds en in het weekend zonder toeslag.",
  path: "/",
});

export const metadata: Metadata = {
  ...meta,
  title: {
    // De homepage mag niet op dezelfde woorden staan als /tv-ophangen:
    // stonden beide titels daarop, dan koos Google de homepage (meer interne
    // links) en kreeg de dienstpagina nul vertoningen -- precies wat Search
    // Console liet zien. De oplossing was hier "tv monteur", maar dat is in
    // het Nederlands vooral een reparatieterm. Daarom nu de merknaam voorop:
    // die is uniek van ons, en de exacte zoekterm blijft van /tv-ophangen.
    absolute: "Uw TV Monteur — tv aan de muur, vaste prijs vooraf",
  },
};

function Hero() {
  return (
    // `svh` i.p.v. `dvh`: dvh groeit zodra de mobiele adresbalk inklapt en
    // verschuift dan de hele hero (layout shift tijdens het scrollen).
    <section className="relative flex min-h-[max(33rem,86svh)] items-end overflow-hidden">
      <Image
        src={heroImg}
        alt="Wandgemonteerde tv in een sfeervolle moderne woonkamer bij schemering"
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(10_8_7/0.92)_0%,rgb(10_8_7/0.74)_26%,rgb(10_8_7/0.36)_58%,rgb(10_8_7/0.18)_100%)]" />

      <div className="on-inverse relative z-10 mx-auto w-full max-w-content px-gutter pt-32 pb-14 md:pt-40 md:pb-20">
        <Reveal immediate>
          {/* "Tv monteur" is in het Nederlands vooral een reparatieterm: wie
              dat zoekt heeft een kapot scherm, niet een lege muur. De
              commerciële zoekopdracht is "tv (laten) ophangen". De bedrijfsnaam
              blijft Uw TV Monteur; de koppen volgen voortaan de zoekterm. */}
          <Eyebrow light>Tv ophangen aan huis</Eyebrow>
        </Reveal>
        <Reveal immediate>
          {/* De vorige kop herhaalde letterlijk de bovenregel en eindigde op
              "zonder gedoe" — een gevoel dat elke concurrent ook claimt. Dit
              zegt wat ons onderscheidt van een platform: u krijgt het bedrijf
              dat de klus zelf uitvoert. */}
          <h1 className="mt-6 max-w-4xl font-display text-h1 font-semibold text-balance text-white">
            Uw tv laten ophangen door de monteur die zelf komt.
          </h1>
        </Reveal>
        <Reveal immediate>
          <p className="mt-6 max-w-xl text-lead text-pretty text-white/85">
            Elke tv, elke wand, ook de beugel die u al had. De prijs die u ziet
            is de prijs die u betaalt — ook &apos;s avonds, in het weekend, en
            ook als uw wand van gipsplaat blijkt.
          </p>
        </Reveal>
        <Reveal immediate>
          {/* Eén actie per scherm: alles wijst naar het afspraakformulier —
              dat staat sinds deze herbouw op deze pagina zelf, dus deze knop
              scrolt in plaats van dat hij de bezoeker verhuist. */}
          <div className="mt-8 sm:max-w-xs">
            <Button href="#afspraak" variant="inverse" maat="lg" breed>
              Bekijk uw prijs
              <IconArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </Reveal>
        <Reveal immediate>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/85">
            <span className="flex items-center gap-2">
              <span className="text-accent-ink">
                <Stars />
              </span>
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
              <IconShield className="h-4 w-4 text-accent-ink" />
              Volledig verzekerd
            </span>
            <span className="flex items-center gap-2">
              <IconClock className="h-4 w-4 text-accent-ink" />
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
    <section className="mx-auto w-full max-w-content px-4 py-24 md:px-8 md:py-36">
      <Reveal>
        <div className="max-w-2xl">
          <Eyebrow>Onze diensten</Eyebrow>
          <h2 className="mt-6 font-display text-h2 font-semibold">
            Alles voor het perfecte kijkmoment
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-fg-muted">
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
            <BezelCard className="h-full transition-transform duration-500 ease-out group-hover:-translate-y-1">
              <div className="flex h-full flex-col overflow-hidden rounded-lg md:flex-row">
                <div className="flex flex-1 flex-col justify-between gap-8 p-8 md:p-10">
                  <div>
                    <IconChip>
                      <DienstIcon slug={tvOphangen.slug} />
                    </IconChip>
                    <h3 className="mt-6 font-display text-h3 font-semibold">
                      {tvOphangen.naam}
                    </h3>
                    <p className="mt-4 leading-relaxed text-fg-muted">
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
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-tint text-accent-fg">
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
                    alt="Monteur bevestigt een televisie aan de wandbeugel in een woonkamer"
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
                className="h-full transition-transform duration-500 ease-out group-hover:-translate-y-1"
                innerClassName="p-8 md:p-9"
              >
                <IconChip>
                  <DienstIcon slug={dienst.slug} />
                </IconChip>
                <h3 className="mt-6 font-display text-h3 font-semibold">
                  {dienst.naam}
                </h3>
                <p className="mt-3 leading-relaxed text-fg-muted">
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
              className="h-full transition-transform duration-500 ease-out group-hover:-translate-y-1"
              innerClassName="flex items-center gap-6 p-8"
            >
              <IconChip>
                <DienstIcon slug={instellen.slug} />
              </IconChip>
              <div>
                <h3 className="font-display text-h3 font-semibold">
                  {instellen.naam}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
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
            className="group flex items-center gap-2.5 rounded-sm py-2.5 pr-2.5 pl-6 text-sm font-semibold border border-control transition-colors duration-300 ease-out hover:bg-sunk"
          >
            Bekijk alle diensten
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sunk transition-transform duration-500 ease-out group-hover:-translate-y-px group-hover:translate-x-0.5">
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
      <div className="mx-auto max-w-7xl rounded-lg bg-inverse px-4 py-24 text-fg-inverse md:px-8 md:py-32">
        <div className="mx-auto grid max-w-content gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <Reveal>
              <Eyebrow light>Onze werkwijze</Eyebrow>
              <h2 className="mt-6 font-display text-h2 font-semibold">
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
                    <span className="font-display text-sm font-semibold tracking-widest text-accent-ink">
                      {step.nr}
                    </span>
                    <div>
                      <h3 className="font-display text-h3 font-semibold">
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
            <div className="rounded-lg bg-white/5 p-1.5 ring-1 ring-white/10 transition-transform duration-700 ease-out md:rotate-2 md:hover:rotate-0">
              <div className="overflow-hidden rounded-lg">
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
    <section className="mx-auto w-full max-w-content px-4 py-24 md:px-8 md:py-36">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Vaste prijzen</Eyebrow>
          <h2 className="mt-6 font-display text-h2 font-semibold">
            Duidelijk vooraf, nooit verrassingen
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-fg-muted">
            De prijs die we vooraf afspreken is de prijs die u betaalt — zonder
            kleine lettertjes.
          </p>
        </div>
      </Reveal>

      <div className="mt-16">
        {/* Naar het formulier op deze pagina, niet naar /contact: een
            paginawissel tussen "ik weet de prijs" en "ik vraag aan" is de
            duurste stap van de hele site. De kaart geeft het gekozen formaat
            mee aan het formulier. */}
        <PriceCards headingLevel="h3" href="#afspraak" />
      </div>

      <Reveal delay={200}>
        <p className="mt-10 text-center text-sm text-fg-muted">
          Geen aanbetaling: u betaalt pas na afloop, per pin of betaalverzoek.{" "}
          <Link
            href="/prijzen"
            className="font-semibold text-fg underline decoration-accent-fg/60 underline-offset-4"
          >
            Bekijk alle prijzen en aanvullende diensten
          </Link>
        </p>
      </Reveal>
    </section>
  );
}

/**
 * Het afspraakformulier op de homepage zelf.
 *
 * Tot nu toe eindigde elke weg op deze pagina bij een knop naar /contact. Dat
 * is een paginawissel op het moment dat iemand besloten heeft — de stap waar
 * verkeer het makkelijkst verdwijnt. Het formulier staat nu direct onder de
 * prijzen, zodat de prijs en het aanvragen één beweging zijn.
 */
function Afspraak() {
  return (
    <section
      id="afspraak"
      className="mx-auto w-full max-w-content scroll-mt-24 px-4 pb-section md:px-8"
    >
      <Reveal immediate>
        <div className="rounded-lg bg-sunk p-1.5 border border-hairline">
          <div className="rounded-lg bg-white p-6 md:p-10">
            <div className="max-w-2xl">
              <h2 className="font-display text-h2 font-semibold">
                Vraag uw afspraak aan
              </h2>
              <p className="mt-3 leading-relaxed text-fg-muted">
                Kies het formaat van uw tv, dan staat uw prijs er direct bij. U
                hoort binnen enkele uren wat de eerstvolgende mogelijkheid is.
              </p>
            </div>
            <div className="mt-8">
              <ContactForm
                montage
                planner
                variant="home"
                berichtLabel="Uw tv en uw muur"
                berichtPlaceholder="Bijvoorbeeld: 55 inch Samsung, en de wand is gipsplaat."
              />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Werkgebied() {
  return (
    <section className="mx-auto w-full max-w-content px-4 py-24 md:px-8 md:py-36">
      <Reveal>
        <div className="max-w-2xl">
          <Eyebrow>Werkgebied</Eyebrow>
          <h2 className="mt-6 font-display text-h2 font-semibold">
            Een tv monteur bij u in de buurt
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-fg-muted">
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
                <h3 className="font-display text-lg font-semibold tracking-tight">
                  <Link
                    href={`/werkgebied/${provincie.slug}`}
                    className="transition-colors duration-300 ease-out hover:text-accent-fg"
                  >
                    {provincie.naam}
                  </Link>
                </h3>
                <ul className="flex flex-col gap-2 text-sm text-fg-muted">
                  {topSteden.map((stad) => (
                    <li key={stad.slug}>
                      <Link
                        href={`/tv-ophangen/${stad.slug}`}
                        className="transition-colors duration-300 ease-out hover:text-fg"
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
                  <IconArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 ease-out group-hover:-translate-y-px group-hover:translate-x-0.5" />
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
            className="group flex items-center gap-2.5 rounded-sm py-2.5 pr-2.5 pl-6 text-sm font-semibold border border-control transition-colors duration-300 ease-out hover:bg-sunk"
          >
            Bekijk het volledige werkgebied
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sunk transition-transform duration-500 ease-out group-hover:-translate-y-px group-hover:translate-x-0.5">
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
    <section className="mx-auto w-full max-w-content px-4 py-24 md:px-8 md:py-36">
      {/* De vier bezwaren staan zichtbaar op deze pagina als vraag met
          antwoord, dus horen ze ook in het FAQPage-schema: dit is wat
          zoekmachines en AI-antwoordmachines uitlezen, en het zijn precies de
          vier vragen waarop wij een ander antwoord geven dan de markt. */}
      <JsonLd
        data={faqJsonLd([
          ...bezwaren.map((bezwaar) => ({
            q: bezwaar.vraag,
            a: bezwaar.antwoord,
          })),
          ...faqAlgemeen,
        ])}
      />
      <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
        <div className="lg:col-span-2">
          <Reveal>
            <Eyebrow>Veelgestelde vragen</Eyebrow>
            <h2 className="mt-6 font-display text-h2 font-semibold">
              Alles wat u wilt weten
            </h2>
            <p className="mt-5 leading-relaxed text-fg-muted">
              Staat uw vraag er niet tussen? Stel hem gerust in het{" "}
              <Link
                href="/contact"
                className="font-semibold text-fg underline decoration-accent-fg/60 underline-offset-4"
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
      {/* Volgorde volgt de beslisvolgorde van een advertentiebezoeker: wat doen
          jullie → hoe gaat het → bewijs → mijn twijfels → wat kost het →
          aanvragen. Het aanvragen stond hier eerst helemaal aan het eind, en
          alleen als een knop naar een andere pagina; de prijzen stonden vóór
          het bewijs en de twijfels bleven onderaan in de FAQ liggen. */}
      <Hero />
      <Diensten />
      <Werkwijze />
      <Reviews />
      <Bezwaren />
      <Prijzen />
      <Afspraak />
      <FaqSectie />
      <Werkgebied />
      <CtaSection href="#afspraak" />
    </main>
  );
}
