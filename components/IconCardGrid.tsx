import type { ReactNode } from "react";
import Reveal from "./Reveal";
import { BezelCard, IconChip } from "./ui";

export type IconCard = { icon?: ReactNode; h3: string; text: string };

/**
 * Gedeelde kaart-grid (semantische <ul>/<li>) — één bron voor het icoon-kaart-patroon.
 * Icoon is optioneel; `columns` kiest 2 of 3 kolommen; `hover` voegt een lift toe.
 */
export default function IconCardGrid({
  items,
  columns = 2,
  hover = false,
  className = "mt-8",
}: {
  items: IconCard[];
  columns?: 2 | 3;
  hover?: boolean;
  className?: string;
}) {
  const cols =
    columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2";
  return (
    <ul className={`grid gap-4 ${cols} ${className}`}>
      {items.map((item, i) => (
        <li key={i} className="h-full">
          <Reveal delay={(i % columns) * 60} className="h-full">
            <BezelCard
              className={`h-full ${
                hover
                  ? "transition-transform duration-500 ease-fluid hover:-translate-y-1"
                  : ""
              }`}
              innerClassName={
                item.icon ? "flex h-full flex-col gap-4 p-7" : "p-7"
              }
            >
              {item.icon && <IconChip>{item.icon}</IconChip>}
              <div>
                <h3 className="font-display text-lg font-bold tracking-tight">
                  {item.h3}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                  {item.text}
                </p>
              </div>
            </BezelCard>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
