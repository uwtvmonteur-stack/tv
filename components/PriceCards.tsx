import Link from "next/link";
import Reveal from "./Reveal";
import { IconCheck } from "./icons";
import { priceCards } from "@/lib/content";

/**
 * Gedeelde prijskaarten (home + prijzen) — één bron van waarheid voor de tarieven.
 * `headingLevel` past de koptekst aan de pagina-hiërarchie aan (h3 onder een sectie-h2,
 * h2 als de kaarten direct onder de pagina-h1 staan).
 */
export default function PriceCards({
  headingLevel = "h3",
}: {
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <ul className="grid items-stretch gap-5 md:grid-cols-3">
      {priceCards.map((card, i) => (
        <li key={card.name} className="h-full">
          <Reveal delay={i * 100} className="h-full">
          <div
            className={`relative h-full rounded-[2rem] p-1.5 ring-1 ${
              card.featured
                ? "bg-ink/[0.06] ring-ink/10"
                : "bg-ink/[0.04] ring-ink/5"
            }`}
          >
            {card.featured && (
              <span className="absolute -top-3.5 left-1/2 z-10 -translate-x-1/2 rounded-full bg-amber-700 px-4 py-1.5 text-[10px] font-semibold tracking-[0.15em] text-white uppercase shadow-[0_10px_25px_-8px_rgba(217,119,6,0.6)]">
                Meest gekozen
              </span>
            )}
            <div
              className={`flex h-full flex-col rounded-[calc(2rem-0.375rem)] p-8 ${
                card.featured
                  ? "bg-ink text-cream shadow-[0_40px_80px_-40px_rgba(25,21,18,0.5)]"
                  : "bg-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]"
              }`}
            >
              <Heading className="font-display text-lg font-bold tracking-tight">
                {card.name}
              </Heading>
              <p
                className={`mt-1 text-sm ${
                  card.featured ? "text-white/70" : "text-ink-soft"
                }`}
              >
                {card.size}
              </p>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-display text-5xl font-bold tracking-tight">
                  {card.price}
                </span>
                <span
                  className={`text-sm ${
                    card.featured ? "text-white/70" : "text-ink-soft"
                  }`}
                >
                  eenmalig
                </span>
              </div>
              <ul className="mt-8 flex flex-1 flex-col gap-3 text-sm">
                {card.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                        card.featured
                          ? "bg-amber-500/20 text-amber-300"
                          : "bg-amber-600/10 text-amber-700"
                      }`}
                    >
                      <IconCheck className="h-3 w-3" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={`mt-8 flex items-center justify-center rounded-full py-3.5 text-sm font-semibold transition-transform duration-300 ease-fluid active:scale-[0.98] ${
                  card.featured
                    ? "bg-amber-700 text-white"
                    : "ring-1 ring-ink/15 hover:bg-ink/5"
                }`}
              >
                Plan een afspraak
              </Link>
            </div>
          </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
