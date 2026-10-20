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
  /**
   * Waar de knop onder elke kaart heen gaat. Standaard /contact, maar een
   * pagina die zelf een afspraakformulier draagt geeft `#afspraak` mee. Dat
   * stond er niet, waardoor alle drie de knoppen op /prijzen naar een andere
   * pagina stuurden terwijl het formulier 300px lager op diezelfde pagina
   * stond — drie lekken op de pagina met de hoogste betrokkenheid van de site.
   */
  href = "/contact",
}: {
  headingLevel?: "h2" | "h3";
  href?: string;
}) {
  const Heading = headingLevel;
  return (
    <ul className="grid items-stretch gap-x-5 gap-y-9 md:grid-cols-3 md:gap-5">
      {priceCards.map((card, i) => (
        <li key={card.name} className="h-full">
          <Reveal delay={i * 100} className="h-full">
          <div
            className={`relative h-full rounded-lg p-1.5 ring-1 ${
              card.featured
                ? "bg-sunk border-hairline"
                : "bg-sunk border-hairline"
            }`}
          >
            {card.featured && (
              <span className="absolute -top-3.5 left-1/2 z-10 -translate-x-1/2 rounded-full bg-accent px-4 py-1.5 text-[10px] font-semibold tracking-[0.15em] text-white uppercase shadow-e1">
                Meest gekozen
              </span>
            )}
            <div
              className={`flex h-full flex-col rounded-lg p-8 ${
                card.featured
                  ? "bg-inverse text-fg-inverse shadow-e3"
                  : "bg-white"
              }`}
            >
              <Heading className="font-display text-lg font-semibold tracking-tight">
                {card.name}
              </Heading>
              <p
                className={`mt-1 text-sm ${
                  card.featured ? "text-white/70" : "text-fg-muted"
                }`}
              >
                {card.size}
              </p>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-display text-h1 font-semibold tabular-nums">
                  {card.price}
                </span>
                <span
                  className={`text-sm ${
                    card.featured ? "text-white/70" : "text-fg-muted"
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
                          ? "bg-accent-ink/20 text-accent-ink"
                          : "bg-accent-tint text-accent-fg"
                      }`}
                    >
                      <IconCheck className="h-3 w-3" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={href}
                // Staat het formulier op dezelfde pagina, dan neemt het deze
                // keuze over: wie op "Standaard — €129" klikt heeft zijn
                // formaat al gekozen en hoort dat niet twee regels lager
                // opnieuw te moeten doen. ContactForm luistert hierop.
                data-maat={card.name.toLowerCase()}
                className={`mt-8 flex items-center justify-center rounded-sm py-3.5 text-sm font-semibold transition-transform duration-300 ease-out active:scale-[0.98] ${
                  card.featured
                    ? "bg-accent text-white hover:bg-accent-hover"
                    : "border border-control hover:bg-sunk"
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
