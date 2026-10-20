import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import CtaSection from "@/components/CtaSection";
import Reviews from "@/components/Reviews";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import PriceCards from "@/components/PriceCards";
import CheckList from "@/components/CheckList";
import { BezelCard } from "@/components/ui";
import { addons, type FaqItem } from "@/lib/content";
import { faqJsonLd, pageMeta, serviceJsonLd } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Vaste Prijzen, Vooraf Bekend",
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
        eyebrow="Vaste prijzen"
        title="Duidelijk vooraf, nooit verrassingen"
        intro="Bij ons weet u vooraf precies waar u aan toe bent. Alle prijzen zijn inclusief voorrijkosten en btw — wat u hieronder ziet, is wat u betaalt."
      />

      <section className="mx-auto w-full max-w-6xl px-4 py-10 md:px-8">
        <Reveal>
          <h2 className="font-display text-step-3 font-bold">
            Onze tarieven per tv-formaat
          </h2>
        </Reveal>
        <div className="mt-8">
          <PriceCards headingLevel="h3" href="#afspraak" />
        </div>

        {/* Formulier in plaats van een doorverwijzende CTA. Deze pagina houdt
            bezoekers gemiddeld 234 seconden vast met 77% betrokkenheid — de
            hoogste van de site — en leverde nul aanvragen op, simpelweg omdat
            er niets te versturen viel. Direct onder de tarieven, want dat is
            het moment waarop iemand weet wat zijn formaat kost. */}
        <section id="afspraak" className="mt-12">
          <Reveal immediate>
            <div className="rounded-[2rem] bg-ink/[0.04] p-1.5 ring-1 ring-ink/5">
              <div className="rounded-[calc(2rem-0.375rem)] bg-white p-6 md:p-10">
                <div className="max-w-2xl">
                  <h2 className="font-display text-step-3 font-bold">
                    Dit is de prijs die u betaalt
                  </h2>
                  <p className="mt-3 leading-relaxed text-ink-soft">
                    Geen voorrijkosten, geen btw-verrassing en geen meerwerk
                    zonder uw toestemming. Kies een dag die u schikt; u krijgt
                    binnen enkele uren bericht over de eerstvolgende
                    mogelijkheid.
                  </p>
                </div>
                <div className="mt-8">
                  <ContactForm
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
          <h2 className="mt-20 font-display text-step-3 font-bold">
            Aanvullende diensten
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <BezelCard className="mt-8">
            <ul className="divide-y divide-ink/5">
              {addons.map((addon) => (
                <li
                  key={addon.naam}
                  className="flex flex-col justify-between gap-1 px-7 py-4.5 sm:flex-row sm:items-center sm:gap-4"
                >
                  <span className="text-[15px]">{addon.naam}</span>
                  <span className="shrink-0 font-display font-bold">
                    {addon.prijs}
                  </span>
                </li>
              ))}
            </ul>
          </BezelCard>
        </Reveal>

        <Reveal>
          <h2 className="mt-20 font-display text-step-3 font-bold">
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
          <h2 className="mt-20 font-display text-step-3 font-bold">
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

      <CtaSection title="Weten waar u aan toe bent?" />
    </main>
  );
}
