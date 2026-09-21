import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import { Stars } from "@/components/ui";
import {
  IconArrowUpRight,
  IconCheck,
  IconClock,
  IconShield,
} from "@/components/icons";
import { priceCards, type FaqItem } from "@/lib/content";
import { absUrl, faqJsonLd, serviceJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";
import heroFoto from "@/public/images/dienst-tv-ophangen.jpg";

// Variant B van /tv-ophangen: een kortere, boekingsgerichte landingspagina voor
// Google Ads. De originele pagina blijft ongewijzigd bestaan; deze versie test
// of "zelf een moment kiezen" beter converteert dan de uitgebreide infopagina.
// Canonical wijst naar /tv-ophangen en de pagina staat bewust niet in de sitemap,
// zodat Google dit niet als dubbele content behandelt.

export const metadata: Metadata = {
  title: "Tv laten ophangen — plan direct uw afspraak",
  description: `Tv laten ophangen vanaf ${priceCards[0].price}, vaste prijs incl. voorrijkosten en btw. Kies zelf uw dag en dagdeel — vaak al binnen 24 uur een monteur aan huis.`,
  alternates: { canonical: "/tv-ophangen" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Tv laten ophangen — plan direct uw afspraak",
    description: `Vaste prijs vanaf ${priceCards[0].price}, inclusief voorrijkosten en btw. Kies zelf uw dag en dagdeel.`,
    url: absUrl("/tv-ophangen-plannen"),
    siteName: SITE.name,
    locale: "nl_NL",
    type: "website",
  },
};

// Bewust risico-wegnemend in plaats van prijsgedreven: de prijs komt pas na de
// waarde aan bod, verderop op de pagina.
const zekerheden = [
  "Ervaren monteurs, volledig verzekerd werk",
  "Waterpas opgehangen, kabels netjes weggewerkt",
  "Vaste prijs vooraf — geen verrassingen achteraf",
  "Ook 's avonds en in het weekend, zonder toeslag",
];

// Bewust kort: het formulier staat er al naast, dus dit hoeft alleen het
// verloop te tonen — geen uitleg die niemand leest.
const stappen = [
  "Kies uw dag en dagdeel",
  "Vertel kort wat er moet gebeuren",
  "Wij bevestigen binnen enkele uren",
];

const faqItems: FaqItem[] = [
  {
    q: "Wat kost het ophangen van een tv?",
    a: `Een vaste prijs op basis van het schermformaat: ${priceCards[0].price} tot 43 inch, ${priceCards[1].price} van 44 t/m 65 inch en ${priceCards[2].price} vanaf 65 inch. Altijd inclusief voorrijkosten en btw, zonder verrassingen achteraf.`,
  },
  {
    q: "Hoe snel hoor ik iets en wanneer kan de monteur komen?",
    a: "Na uw aanvraag nemen wij binnen enkele uren contact met u op om het moment te bevestigen. De monteur kan er vaak al binnen een dag zijn — ook 's avonds en in het weekend, zonder toeslag.",
  },
  {
    q: "Heb ik zelf een beugel nodig?",
    a: "Wij verkopen zelf geen beugels, maar regelen er op aanvraag een voor u. Geef door welke tv u heeft, dan ligt de juiste beugel klaar. Heeft u er al een? Dan monteren we die gewoon.",
  },
  {
    q: "Wanneer betaal ik?",
    a: "Pas na afloop, als uw tv hangt en alles werkt. Geen aanbetaling. Betalen kan per pin of betaalverzoek; zakelijke klanten kunnen op factuur betalen.",
  },
  {
    q: "Kan mijn tv op elke muur?",
    a: "Vrijwel altijd. Steen, beton en hout zijn nooit een probleem. Bij gipsplaat of holle wanden gebruiken we speciale bevestigingen en controleren we vooraf het draagvermogen.",
  },
];

export default function TvOphangenPlannenPage() {
  return (
    <main>
      <JsonLd
        data={serviceJsonLd({
          name: "Tv ophangen",
          description:
            "Tv laten ophangen aan huis met een vaste prijs — zelf uw dag en dagdeel kiezen.",
          path: "/tv-ophangen",
          offers: [
            { name: "Tv ophangen tot 43 inch", price: priceCards[0].price.replace("€", "") },
            { name: "Tv ophangen 44 t/m 65 inch", price: priceCards[1].price.replace("€", "") },
            { name: "Tv ophangen vanaf 65 inch", price: priceCards[2].price.replace("€", "") },
          ],
        })}
      />
      <JsonLd data={faqJsonLd(faqItems)} />

      {/* Het formulier staat direct in beeld: het conversiepunt komt vooraan. */}
      <section className="relative overflow-hidden bg-ink text-cream">
        <Image
          src={heroFoto}
          alt="Monteur hangt een televisie waterpas aan de woonkamermuur"
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 px-4 pt-28 pb-14 md:px-8 md:pt-36 md:pb-20 lg:grid-cols-2 lg:items-start lg:gap-14">
          <Reveal immediate>
            <div>
              <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-[0.12em] text-amber-300 uppercase ring-1 ring-white/15">
                Tv ophangen aan huis · heel Nederland
              </span>
              <h1 className="mt-6 font-display text-4xl leading-[1.05] font-bold tracking-tight md:text-5xl lg:text-6xl">
                Tv laten ophangen?
                <span className="mt-2 block text-amber-400">
                  Kies uw moment, wij doen de rest.
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
                Een ervaren monteur hangt uw tv waterpas op, werkt de kabels netjes weg en
                sluit alles aan — u hoeft zelf niets te doen. U geeft alleen door wanneer
                het u uitkomt; wij bevestigen binnen enkele uren.
              </p>

              <ul className="mt-8 flex flex-col gap-3">
                {zekerheden.map((z) => (
                  <li key={z} className="flex items-start gap-3 text-[15px] font-medium">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-300">
                      <IconCheck className="h-3.5 w-3.5" />
                    </span>
                    {z}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/80">
                <span className="flex items-center gap-2">
                  <Stars />
                  <strong className="font-semibold text-white">
                    {SITE.reviews.score} / 5
                  </strong>
                  {SITE.reviews.count} reviews
                </span>
                <span className="flex items-center gap-2">
                  <IconShield className="h-4 w-4 text-amber-400" />
                  Volledig verzekerd
                </span>
                <span className="flex items-center gap-2">
                  <IconClock className="h-4 w-4 text-amber-400" />7 dagen per week
                </span>
              </div>

              {/* Op mobiel staat het formulier ónder deze kolom; deze knop
                  brengt de bezoeker er in één tik naartoe. Op groot scherm
                  staat het formulier al naast de tekst. */}
              <a
                href="#afspraak"
                className="mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-amber-600 py-4 text-base font-semibold text-white transition-transform duration-300 ease-fluid active:scale-[0.98] lg:hidden"
              >
                Plan uw afspraak
                <IconArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          <Reveal immediate>
            <div
              id="afspraak"
              className="scroll-mt-24 rounded-[2rem] bg-white/10 p-1.5 ring-1 ring-white/15"
            >
              <div className="rounded-[calc(2rem-0.375rem)] bg-cream p-6 text-ink md:p-8">
                <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                  Plan uw afspraak
                </h2>
                <p className="mt-2 mb-6 text-[15px] leading-relaxed text-ink-soft">
                  Geef door wanneer het u schikt. Wij bevestigen binnen enkele uren — en u
                  zit nergens aan vast.
                </p>
                <ContactForm
                  planner
                  variant="tv-ophangen-plannen"
                  submitLabel="Plan mijn afspraak"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-8 md:py-20">
        <Reveal>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            Zo werkt het
          </h2>
        </Reveal>
        <ol className="mt-8 grid gap-3 md:grid-cols-3 md:gap-4">
          {stappen.map((stap, i) => (
            <li key={stap}>
              <Reveal delay={i * 60}>
                <div className="flex items-center gap-4 rounded-2xl bg-ink/[0.04] px-5 py-4 ring-1 ring-ink/5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-600 font-display text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="font-display text-[17px] font-bold tracking-tight">
                    {stap}
                  </span>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal>
          <h2 className="mt-20 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Vaste prijs, vooraf bekend
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
            De prijs hangt alleen af van het schermformaat — voorrijkosten en btw zitten er
            altijd in. Wat we vooraf afspreken, is wat u betaalt. Geen uurtarief, geen
            meerwerk achteraf.
          </p>
        </Reveal>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {priceCards.map((card, i) => (
            <li key={card.name} className="h-full">
              <Reveal delay={i * 60} className="h-full">
                <div
                  className={`flex h-full flex-col rounded-[1.75rem] p-7 ${
                    card.featured
                      ? "bg-ink text-cream shadow-[0_40px_80px_-40px_rgba(25,21,18,0.5)]"
                      : "bg-white ring-1 ring-ink/5"
                  }`}
                >
                  <span
                    className={`text-sm ${card.featured ? "text-white/70" : "text-ink-soft"}`}
                  >
                    {card.size}
                  </span>
                  <span className="mt-2 font-display text-4xl font-bold tracking-tight">
                    {card.price}
                  </span>
                  <span
                    className={`mt-1 text-sm ${
                      card.featured ? "text-white/70" : "text-ink-soft"
                    }`}
                  >
                    eenmalig, incl. voorrijkosten en btw
                  </span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
        <Reveal>
          <p className="mt-6 text-sm text-ink-soft">
            Kabels wegwerken in een kabelgoot kan erbij.{" "}
            <Link
              href="/prijzen"
              className="font-semibold text-ink underline decoration-amber-600/50 underline-offset-4"
            >
              Bekijk alle prijzen
            </Link>
            .
          </p>
        </Reveal>

        <Reveal>
          <h2 className="mt-20 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Veelgestelde vragen
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-8 max-w-3xl">
            <Faq items={faqItems} />
          </div>
        </Reveal>
      </section>
    </main>
  );
}
