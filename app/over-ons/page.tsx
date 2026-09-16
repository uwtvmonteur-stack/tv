import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import CtaSection from "@/components/CtaSection";
import Reviews from "@/components/Reviews";
import Reveal from "@/components/Reveal";
import StatsGrid from "@/components/StatsGrid";
import CheckList from "@/components/CheckList";
import { pageMeta } from "@/lib/seo";
import monteurImg from "@/public/images/monteur-aan-het-werk.jpg";

export const metadata = pageMeta({
  title: "Over Ons — Eigen, Verzekerde Monteurs",
  description:
    "Maak kennis met Uw TV Monteur: eigen, ervaren en verzekerde monteurs die door heel Nederland tv's ophangen en installeren. Ruim 12.000 tv's opgehangen.",
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
    <main>
      <PageHeader
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Over ons", href: "/over-ons" },
        ]}
        eyebrow="Over ons"
        title="De monteurs die Nederland laten kijken"
        intro="Uw TV Monteur begon met één busje en één overtuiging: een tv hoort gewoon perfect opgehangen te worden — half werk bestaat niet. Inmiddels rijdt er een heel team op uit, met bij elke klus diezelfde standaard."
      />

      <section className="mx-auto w-full max-w-6xl px-4 py-10 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <div className="max-w-xl space-y-4 leading-relaxed text-ink-soft">
                <p>
                  Wat begon als een eenmanszaak groeide uit tot een hecht team
                  van ervaren tv-monteurs, actief in Zuid-Holland,
                  Noord-Holland, Utrecht en Noord-Brabant. Ze volgen onze interne
                  opleiding en werken allemaal volgens dezelfde standaard:
                  waterpas, veilig en zonder zichtbare kabels.
                </p>
                <p>
                  We geloven in duidelijke afspraken en vaste prijzen zonder
                  kleine lettertjes. Niet omdat het moet, maar omdat we vinden
                  dat het zo hoort.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <CheckList
                items={waarden}
                className="mt-8 flex flex-col gap-3"
                medium
              />
            </Reveal>
          </div>
          <Reveal delay={150}>
            <div className="rounded-[2rem] bg-ink/[0.04] p-1.5 ring-1 ring-ink/5 transition-transform duration-700 ease-fluid md:rotate-2 md:hover:rotate-0">
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

        <StatsGrid className="mt-24" />
      </section>

      <Reviews />

      <CtaSection title="Ervaar het zelf" />
    </main>
  );
}
