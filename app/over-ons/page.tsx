import Breadcrumbs from "@/components/Breadcrumbs";
import Reviews from "@/components/Reviews";
import {
  CheckList,
  CtaBand,
  PageHero,
  Section,
  SectionHeading,
  StatRow,
} from "@/components/sections";
import { stats } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Over ons — eigen, verzekerde monteurs",
  description:
    "Maak kennis met Uw TV Monteur: eigen, ervaren en verzekerde monteurs die in Zuid-Holland, Noord-Holland, Utrecht en Noord-Brabant tv's ophangen, installeren en instellen.",
  path: "/over-ons",
});

const waarden = [
  "Eigen monteurs in loondienst — geen wisselende onderaannemers",
  "Volledig verzekerd — ook uw kostbaarste OLED-tv",
  "Afspraak is afspraak: we bellen 30 minuten voor aankomst",
  "Netjes werken: beschermmateriaal neer, afval mee terug",
];

export default function OverOnsPage() {
  return (
    <>
      <PageHero
        breadcrumbs={
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Over ons", href: "/over-ons" },
            ]}
          />
        }
        eyebrow="Over ons"
        // Niet "Nederland": wij rijden in vier provincies, en dat staat zo in
        // het schema, in de voettekst en op het werkgebied. Eén kop die het
        // land belooft maakt de rest van de site ongeloofwaardig in plaats van
        // groter.
        title="De monteurs die uw tv ophangen en aansluiten"
        lead="Uw TV Monteur begon met één busje en één overtuiging: een tv hoort gewoon perfect opgehangen te worden — half werk bestaat niet. Inmiddels rijdt er een heel team op uit, met bij elke klus diezelfde standaard."
        image="/images/monteur-aan-het-werk.jpg"
        imageAlt="Monteur van Uw TV Monteur monteert een tv perfect waterpas"
      />

      <Section labelledBy="verhaal-kop">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading
              id="verhaal-kop"
              eyebrow="Hoe wij werken"
              title="Eén standaard, bij elke klus"
            />
            <div className="prose-tv mt-6">
              <p>
                Wat begon als een eenmanszaak groeide uit tot een hecht team van
                ervaren tv-monteurs, actief in Zuid-Holland, Noord-Holland,
                Utrecht en Noord-Brabant. Ze volgen onze interne opleiding en
                werken allemaal volgens dezelfde standaard: waterpas, veilig en
                zonder zichtbare kabels.
              </p>
              <p>
                We geloven in duidelijke afspraken: u weet het bedrag voordat
                wij beginnen, zonder kleine lettertjes. Niet omdat het moet,
                maar omdat we vinden dat het zo hoort.
              </p>
            </div>
          </div>
          <CheckList items={waarden} className="text-lg lg:mt-20" />
        </div>
      </Section>

      <Section tone="dark" labelledBy="cijfers-kop">
        <SectionHeading
          id="cijfers-kop"
          dark
          center
          eyebrow="In cijfers"
          title="Waar dat inmiddels op uitkomt"
        />
        <div className="mt-12">
          <StatRow items={stats} dark />
        </div>
      </Section>

      <Reviews />

      <CtaBand
        title="Ervaar het zelf"
        text="Vertel kort wat er moet gebeuren en waar u woont. U krijgt binnen enkele uren het bedrag, vrijblijvend."
        tone="white"
      />
    </>
  );
}
