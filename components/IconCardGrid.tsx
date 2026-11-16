import type { ReactNode } from "react";

export type IconCard = { icon?: ReactNode; h3: string; text: string };

/**
 * Gedeelde rij blokken met een icoon erboven — één bron voor dit patroon,
 * zodat de dienstpagina's niet elk hun eigen variant tekenen.
 *
 * Witte kaarten met een haarlijnring, zoals overal in dit systeem. Het
 * pictogram zit in een amberen vierkantje boven de kop — hetzelfde patroon
 * als in `Bewijsrij` en `Werkwijze`, zodat een bezoeker die vorm één keer
 * leert kennen. `columns` kiest twee of drie kolommen.
 */
export default function IconCardGrid({
  items,
  columns = 2,
  className = "mt-8",
}: {
  items: IconCard[];
  columns?: 2 | 3;
  className?: string;
}) {
  const cols =
    columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2";
  return (
    <ul className={`grid gap-4 ${cols} ${className}`}>
      {items.map((item) => (
        <li key={item.h3} className="komt-op paneel p-5 sm:p-6">
          {item.icon && (
            <span className="icoonvlak [&_svg]:size-6">{item.icon}</span>
          )}
          <h3 className={`text-h3 ${item.icon ? "mt-4" : ""}`}>{item.h3}</h3>
          <p className="mt-2 text-kaart text-ink-600">{item.text}</p>
        </li>
      ))}
    </ul>
  );
}
