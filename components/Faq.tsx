import { Icon } from "./Icon";
import type { FaqItem } from "@/lib/content";

/**
 * Uitklapvragen op `<details>`/`<summary>`.
 *
 * Hiervoor was dit een clientcomponent met `useState`: één vraag open, de rest
 * dicht, en de antwoorden pas zichtbaar nadat JavaScript geladen was. Een
 * bezoeker met een haperende verbinding zag dan een rij knoppen zonder tekst,
 * en een toetsenbordgebruiker moest wachten tot de handler eraan hing.
 * `<details>` kan hetzelfde zonder één regel JavaScript: openen en sluiten met
 * Enter of Space, en de tekst staat altijd in de HTML — ook voor de
 * zoekmachine die de FAQ-schema bij deze vragen moet kunnen terugvinden.
 */
export default function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <details
          key={item.q}
          // De eerste staat open: dan ziet een bezoeker meteen dát er
          // antwoorden onder zitten en niet alleen een rij vragen.
          open={i === 0}
          // Geen `overflow-hidden`: de focusring van de summary loopt tot net
          // buiten de kaart, en die mag niet worden afgesneden.
          className="card group"
        >
          <summary className="list-none [&::-webkit-details-marker]:hidden">
            {/* De kop draagt de opvulling, zodat de hele aanraakrij (ruim boven
                de 48px) de summary zelf is en niet alleen de tekst erin. */}
            <h3 className="flex min-h-12 cursor-pointer items-center justify-between gap-4 px-5 py-4 text-lg transition group-hover:text-accent-700 sm:px-6">
              <span>{item.q}</span>
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent-50 text-accent-700 ring-1 ring-accent-200 transition duration-300 group-hover:bg-accent-100 group-open:rotate-45">
                <Icon name="plus" className="size-5" strokeWidth={2} />
              </span>
            </h3>
          </summary>
          <p className="px-5 pb-5 text-ink-600 sm:px-6">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
