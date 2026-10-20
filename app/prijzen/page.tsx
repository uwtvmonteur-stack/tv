import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import CtaSection from "@/components/CtaSection";
import Reviews from "@/components/Reviews";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import PriceCards from "@/components/PriceCards";
import PrijsGarantie from "@/components/PrijsGarantie";
import CheckList from "@/components/CheckList";
import Prijstabel from "@/components/Prijstabel";
import { type FaqItem } from "@/lib/content";
import { faqJsonLd, pageMeta, serviceJsonLd } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Wat kost een tv laten ophangen? Prijzen 2026",
  description:
    "Bekijk onze vaste prijzen: tv ophangen vanaf €99, tv installatie €70, soundbar €49. Altijd inclusief voorrijkosten en btw.",
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
    q: "Zijn er ooit extra kosten bovenop de vaste prijs?",
    a: "Nee — de prijs die we vooraf afspreken is definitief. Alleen als u ter plekke extra werk laat uitvoeren (bijvoorbeeld alsnog de kabels laten wegwerken) komt dat er transparant bij, altijd eerst in overleg.",
  },
  {
    q: "Hoe kan ik betalen?",
    a: "Na afloop betaalt u eenvoudig per pin, Tikkie of betaalverzoek. Zakelijke klanten kunnen op factuur betalen.",
  },
  {
    q: "Ik heb een bijzondere situatie — wat kost dat?",
    a: "Voor bijzondere klussen, zoals een tv boven een open haard, extra grote schermen of kabels volledig in de muur, maken we vooraf een vaste prijsafspraak op maat. Zo komt u nooit voor verrassingen te staan.",
  },
];

export default function PrijzenPage() {
  return (
    <main>
      <JsonLd
        data={serviceJsonLd({
          name: "Tv montage en installatie",
          description:
            "Tv ophangen en installeren tegen vaste tarieven, inclusief voorrijkosten en btw.",
          path: "/prijzen",
          offers: [
            { name: "Tv ophangen tot 43 inch", price: "99" },
            { name: "Tv ophangen 44 t/m 64 inch", price: "129" },
            { name: "Tv ophangen vanaf 65 inch", price: "159" },
            { name: "Complete tv installatie", price: "70" },
            { name: "Kabels wegwerken in kabelgoot", price: "39" },
            { name: "Soundbar installeren", price: "49" },
            { name: "Surround- of home-cinema-set aansluiten", price: "79" },
            { name: "Tv hulp aan huis", price: "60" },
          ],
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
        intro="€99 tot €159, afhankelijk van het formaat — en dat bedrag verandert niet. Niet als uw wand van gipsplaat blijkt, niet 's avonds, niet in het weekend. Inclusief voorrijkosten en btw."
      />

      <section className="mx-auto w-full max-w-content px-4 py-section md:px-8">
        <Reveal>
          <h2 className="font-display text-h2 font-semibold">
            Onze tarieven per tv-formaat
          </h2>
        </Reveal>
        <div className="mt-8">
          <PriceCards headingLevel="h3" href="#afspraak" />
        </div>

        {/* Pal onder de bedragen, want dit is het moment waarop iemand zich
            afvraagt wat er nog bij komt. */}
        <PrijsGarantie className="mt-4" />

        {/* Formulier in plaats van een doorverwijzende CTA. Deze pagina houdt
            bezoekers gemiddeld 234 seconden vast met 77% betrokkenheid — de
            hoogste van de site — en leverde nul aanvragen op, simpelweg omdat
            er niets te versturen viel. Direct onder de tarieven, want dat is
            het moment waarop iemand weet wat zijn formaat kost. */}
        <section id="afspraak" className="mt-12">
          <Reveal immediate>
            <div className="rounded-lg bg-sunk p-1.5 border border-hairline">
              <div className="rounded-lg bg-white p-6 md:p-10">
                <div className="max-w-2xl">
                  <h2 className="font-display text-h2 font-semibold">
                    Dit is de prijs die u betaalt
                  </h2>
                  <p className="mt-3 leading-relaxed text-fg-muted">
                    Geen voorrijkosten, geen btw-verrassing en geen meerwerk
                    zonder uw toestemming. Kies een dag die u schikt; u krijgt
                    binnen enkele uren bericht over de eerstvolgende
                    mogelijkheid.
                  </p>
                </div>
                <div className="mt-8">
                  <ContactForm
                    montage
                    planner
                    variant="prijzen"
                    submitLabel="Afspraak aanvragen"
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

      <CtaSection title="Weten waar u aan toe bent?" href="#afspraak" />
    </main>
  );
}
