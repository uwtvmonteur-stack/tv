import type { ReactNode } from "react";

export type IconCard = { icon?: ReactNode; h3: string; text: string };

/**
 * Gedeelde kaartenrij met een icoon erboven — één bron voor dit patroon,
 * zodat de dienstpagina's niet elk hun eigen kaart tekenen.
 *
 * Het icoon is optioneel; `columns` kiest twee of drie kolommen en `hover`
 * voegt de lift toe die een aanklikbare kaart hoort te hebben. Staat de kaart
 * niet in een link, dan blijft `hover` uit: beweging die nergens heen leidt
 * belooft iets wat er niet is.
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
      {items.map((item) => (
        <li key={item.h3} className="h-full">
          <div className={`card h-full p-6 ${hover ? "card-hover" : ""}`}>
            {item.icon && (
              <span className="grid size-11 place-items-center rounded-xl bg-accent-50 text-accent-700 ring-1 ring-accent-200">
                {item.icon}
              </span>
            )}
            <h3 className={`text-h3 ${item.icon ? "mt-5" : ""}`}>{item.h3}</h3>
            <p className="mt-2 text-ink-600">{item.text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
