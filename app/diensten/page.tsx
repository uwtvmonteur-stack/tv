import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import CtaSection from "@/components/CtaSection";
import Reviews from "@/components/Reviews";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import { BezelCard, IconChip, DienstIcon } from "@/components/ui";
import { IconArrowUpRight, IconCheck } from "@/components/icons";
import { diensten, dienstHref, usps } from "@/lib/content";
import { absUrl, itemListJsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Onze Diensten aan Huis — Tv Monteur",
  description:
    "Alle diensten van uw tv monteur aan huis: van montage tot soundbar aansluiten en tv instellen. Vaste prijzen en vaak binnen 24 uur.",
  path: "/diensten",
});

export default function DienstenPage() {
  const itemList = itemListJsonLd(
    diensten.map((dienst) => ({
      name: dienst.naam,
      url: absUrl(dienstHref(dienst)),
    })),
  );

  return (
    <main>
      <JsonLd data={itemList} />
      <PageHeader
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Diensten", href: "/diensten" },
        ]}
        eyebrow="Onze diensten"
        title="Onze diensten aan huis"
        intro="Van tv ophangen en complete installatie tot soundbar aansluiten en tv instellen — kies hieronder de dienst die bij u past. Overal vaste prijzen, inclusief voorrijkosten en btw."
      />

      <section className="mx-auto w-full max-w-6xl px-4 pb-8 md:px-8">
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {diensten.map((dienst, i) => (
            <li key={dienst.slug} className="h-full">
              <Reveal delay={i * 80} className="h-full">
              <Link href={dienstHref(dienst)} className="group block h-full">
                <BezelCard
                  className="h-full transition-transform duration-500 ease-fluid group-hover:-translate-y-1"
                  innerClassName="flex h-full flex-col justify-between gap-8 p-8"
                >
                  <div>
                    <IconChip>
                      <DienstIcon slug={dienst.slug} />
                    </IconChip>
                    <h2 className="mt-6 font-display text-xl font-bold tracking-tight md:text-2xl">
                      {dienst.naam}
                    </h2>
                    <p className="mt-3 leading-relaxed text-ink-soft">
                      {dienst.kort}
                    </p>
                  </div>
                  <span className="flex items-center gap-2.5 text-sm font-semibold">
                    Lees meer
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink/5 transition-transform duration-500 ease-spring group-hover:-translate-y-px group-hover:translate-x-0.5">
                      <IconArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </span>
                </BezelCard>
              </Link>
              </Reveal>
            </li>
          ))}

          <li className="h-full">
            <Reveal delay={400} className="h-full">
            <div className="flex h-full flex-col justify-between gap-8 rounded-[2rem] bg-ink p-8 text-cream">
              <div>
                <h2 className="font-display text-xl font-bold tracking-tight md:text-2xl">
                  Waarom Uw TV Monteur?
                </h2>
                <ul className="mt-5 flex flex-col gap-3 text-sm">
                  {usps.map((usp) => (
                    <li key={usp} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-400">
                        <IconCheck className="h-3 w-3" />
                      </span>
                      {usp}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/prijzen"
                className="flex items-center justify-center rounded-full bg-amber-700 py-3.5 text-sm font-semibold text-white transition-transform duration-300 ease-fluid active:scale-[0.98]"
              >
                Bekijk alle prijzen
              </Link>
            </div>
            </Reveal>
          </li>
        </ul>
      </section>

      <Reviews />

      <CtaSection />
    </main>
  );
}
