import { Icon } from "./Icon";
import type { FaqItem } from "@/lib/content";

/**
 * Uitklapvragen op `<details>`/`<summary>`.
 *
 * Geen kaarten meer maar regels onder een haarlijn, net als de dienstenlijst
 * en de tarieven. Een vragenlijst in acht losse kaartjes leest als acht
 * onderwerpen; als één lijst met strepen leest het als één gesprek.
 *
 * Bewust geen clientcomponent met `useState`: dan zijn de antwoorden pas
 * zichtbaar nadat JavaScript geladen is, en ziet een bezoeker met een
 * haperende verbinding een rij knoppen zonder tekst. `<details>` doet
 * hetzelfde zonder één regel JavaScript — openen met Enter of Space, en de
 * tekst staat altijd in de HTML, ook voor de zoekmachine die de FAQ-schema
 * bij deze vragen moet kunnen terugvinden.
 */
export default function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <details
          key={item.q}
          // De eerste staat open: dan ziet een bezoeker meteen dát er
          // antwoorden onder zitten en niet alleen een rij vragen.
          open={i === 0}
          // Geen `overflow-hidden`: de sitebrede focusring heeft
          // `outline-offset: 3px` en ligt dus buiten de summary. Met
          // `overflow-hidden` op deze `details` werd die ring afgeknipt — bij
          // een ingeklapte vraag volledig. Op 52 pagina's zag een
          // toetsenbordgebruiker daardoor niet welke vraag focus had. Er is
          // geen kind met een eigen achtergrond, dus er valt niets te kappen.
          className="paneel group"
        >
          <summary className="list-none [&::-webkit-details-marker]:hidden">
            {/* De kop draagt de opvulling, zodat de hele aanraakrij (ruim boven
                de 48px) de summary zelf is en niet alleen de tekst erin. */}
            <h3 className="flex min-h-14 cursor-pointer items-center justify-between gap-5 px-5 py-4 text-lg transition-colors duration-200 group-hover:text-amber-800 sm:px-6">
              <span>{item.q}</span>
              <span className="icoonvlak size-9 shrink-0">
                <Icon
                  name="plus"
                  strokeWidth={2.5}
                  className="size-5 transition duration-300 group-open:rotate-45"
                />
              </span>
            </h3>
          </summary>
          <p className="max-w-2xl px-5 pb-6 text-ink-600 sm:px-6">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
