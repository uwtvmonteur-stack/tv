import PageHeader from "@/components/PageHeader";
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
  title: "Vaste Prijzen — Tv Ophangen & Installatie",
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
            { name: "Tv ophangen 44 t/m 65 inch", price: "129" },
            { name: "Tv ophangen vanaf 65 inch", price: "179" },
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
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            Onze tarieven per tv-formaat
          </h2>
        </Reveal>
        <div className="mt-8">
          <PriceCards headingLevel="h3" />
        </div>

        <Reveal>
          <h2 className="mt-20 font-display text-3xl font-bold tracking-tight md:text-4xl">
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
          <h2 className="mt-20 font-display text-3xl font-bold tracking-tight md:text-4xl">
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
          <h2 className="mt-20 font-display text-3xl font-bold tracking-tight md:text-4xl">
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
