import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import CtaSection from "@/components/CtaSection";
import Reviews from "@/components/Reviews";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import Prijsindicatie from "@/components/Prijsindicatie";
import PrijsGarantie from "@/components/PrijsGarantie";
import CheckList from "@/components/CheckList";
import Prijstabel from "@/components/Prijstabel";
import { tarieven, type FaqItem } from "@/lib/content";
import { faqJsonLd, pageMeta, serviceJsonLd } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Wat kost een tv laten ophangen? Prijzen 2026",
  description:
    "Tv ophangen vanaf €89, inclusief voorrijkosten en btw. Vraag een vrijblijvende offerte aan; u weet het exacte bedrag voordat wij langskomen.",
  path: "/prijzen",
});

const inbegrepen = [
  "Advies over de beste plek, hoogte en beugelkeuze",
  "Opruimen van al het verpakkings- en boorafval",
  "Volledig verzekerde monteurs aan huis",
  "Geen aanbetaling — u betaalt pas na afloop",
];

const faqItems: FaqItem[] = [
  {
    q: "Zijn er ooit extra kosten bovenop de offerte?",
    a: "Nee — het bedrag uit uw offerte is definitief. Alleen als u ter plekke extra werk laat uitvoeren (bijvoorbeeld alsnog de kabels laten wegwerken) komt dat er transparant bij, altijd eerst in overleg.",
  },
  {
    q: "Hoe kan ik betalen?",
    a: "Na afloop betaalt u eenvoudig per pin, Tikkie of betaalverzoek. Zakelijke klanten kunnen op factuur betalen.",
  },
  {
    q: "Ik heb een bijzondere situatie — wat kost dat?",
    a: "Elke klus krijgt een offerte op maat, dus ook een bijzondere situatie. Bij een tv boven een open haard, extra grote schermen of kabels volledig in de muur komen we eerst kijken of meten voordat we een bedrag noemen. Daarna staat dat bedrag vast, ook als het werk tegenvalt.",
  },
];

export default function PrijzenPage() {
  return (
    <main>
      <JsonLd
        data={serviceJsonLd({
          name: "Tv montage en installatie",
          description:
            "Tv ophangen en installeren vanaf €89, inclusief voorrijkosten en btw. Het exacte bedrag staat in een vrijblijvende offerte.",
          path: "/prijzen",
          // Bewust alleen vanafbedragen, afgeleid van dezelfde bron als de
          // tabel op de pagina. Een hard bedrag in een rich result dat
          // afwijkt van de offerte is een reden voor afkeuring - en terecht.
          offers: tarieven.map((tarief) => ({
            name: tarief.naam,
            price: tarief.prijs,
          })),
        })}
      />
      <JsonLd data={faqJsonLd(faqItems)} />

      <PageHeader
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Prijzen", href: "/prijzen" },
        ]}
        eyebrow="Tarieven 2026"
        title="Wat kost een tv laten ophangen?"
        intro="Tv ophangen begint bij €89, inclusief voorrijkosten en btw. Wat het bij u precies wordt hangt af van uw tv, uw wand en wat er verder moet gebeuren — dat zetten wij vrijblijvend voor u op papier."
      />

      <section className="mx-auto w-full max-w-content px-4 py-section md:px-8">
        <Reveal>
          <h2 className="font-display text-h2 font-semibold">
            Tv ophangen vanaf €89
          </h2>
        </Reveal>
        <div className="mt-8">
          <Prijsindicatie href="#offerte" />
        </div>

        {/* Pal onder de bedragen, want dit is het moment waarop iemand zich
            afvraagt wat er nog bij komt. */}
        <PrijsGarantie className="mt-4" />

        {/* Formulier in plaats van een doorverwijzende CTA. Deze pagina houdt
            bezoekers gemiddeld 234 seconden vast met 77% betrokkenheid — de
            hoogste van de site — en leverde nul aanvragen op, simpelweg omdat
            er niets te versturen viel. Direct onder de tarieven, want dat is
            het moment waarop iemand weet wat zijn formaat kost. */}
        <section id="offerte" className="mt-12">
          <Reveal immediate>
            <div className="rounded-lg bg-sunk p-1.5 border border-hairline">
              <div className="rounded-lg bg-white p-6 md:p-10">
                <div className="max-w-2xl">
                  <h2 className="font-display text-h2 font-semibold">
                    Vraag uw offerte aan
                  </h2>
                  <p className="mt-3 leading-relaxed text-fg-muted">
                    Geen voorrijkosten, geen btw-verrassing en geen meerwerk
                    zonder uw toestemming. Vertel kort wat er moet gebeuren,
                    dan krijgt u binnen enkele uren een vrijblijvende offerte
                    met het bedrag erbij.
                  </p>
                </div>
                <div className="mt-8">
                  <ContactForm
                    variant="prijzen"
                    submitLabel="Offerte aanvragen"
                    berichtLabel="Uw tv en uw muur"
                    berichtPlaceholder="Bijvoorbeeld: 55 inch Samsung, bakstenen muur, ik heb nog geen beugel."
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <Reveal>
          <h2 className="mt-block font-display text-h2 font-semibold">
            Alle tarieven op een rij
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-8">
            <Prijstabel />
          </div>
        </Reveal>
        <Reveal delay={150}>
          <p className="mt-4 max-w-prose text-sm leading-relaxed text-fg-muted">
            Niet inbegrepen is de tv-beugel zelf. Heeft u er al een, dan
            monteren wij die — ook als u hem ergens anders kocht. Heeft u er
            geen, dan zoeken wij er een die bij uw tv en wand past en hoort u
            het bedrag vóór de afspraak, zodat u dan pas beslist.
          </p>
        </Reveal>

        <Reveal>
          <h2 className="mt-block font-display text-h2 font-semibold">
            Altijd inbegrepen
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <CheckList
            items={inbegrepen}
            className="mt-8 grid max-w-4xl gap-3 sm:grid-cols-2"
          />
        </Reveal>

        <Reveal>
          <h2 className="mt-block font-display text-h2 font-semibold">
            Veelgestelde vragen over prijzen
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-8 max-w-3xl">
            <Faq items={faqItems} />
          </div>
        </Reveal>
      </section>

      <Reviews />

      <CtaSection title="Weten waar u aan toe bent?" href="#offerte" />
    </main>
  );
}
