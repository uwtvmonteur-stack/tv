import { tarieven } from "@/lib/content";

/**
 * Alle tarieven in één echte tabel.
 *
 * Hiervoor stonden de bedragen in losse kaarten en in een lijst met
 * `<span>`-jes. Dat leest voor een bezoeker als marketing en voor een
 * zoekmachine als niets: de pagina's die ranken op "wat kost tv ophangen"
 * zetten hun prijzen zonder uitzondering in een tabel, met de dienst links
 * en het bedrag rechts. Een `<table>` met koppen is bovendien het enige wat
 * een schermlezer kan voorlezen als "dienst X kost Y".
 *
 * Afgeleid van dezelfde bron als de prijskaarten en het formulier, zodat de
 * drie elkaar niet kunnen tegenspreken.
 */
export default function Prijstabel() {
  return (
    <div className="overflow-hidden rounded-md border border-hairline bg-raised shadow-e1">
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">
          Vanafprijzen van Uw TV Monteur, inclusief voorrijkosten en btw. Het
          exacte bedrag staat in uw offerte.
        </caption>
        <thead>
          <tr className="border-b border-hairline bg-sunk">
            <th
              scope="col"
              className="px-5 py-3 text-2xs font-semibold tracking-[0.12em] uppercase text-fg-muted"
            >
              Dienst
            </th>
            <th
              scope="col"
              className="px-5 py-3 text-right text-2xs font-semibold tracking-[0.12em] uppercase text-fg-muted"
            >
              Prijs
            </th>
          </tr>
        </thead>
        <tbody>
          {tarieven.map((tarief) => (
            <tr
              key={tarief.naam}
              className="border-b border-hairline last:border-0"
            >
              <th
                scope="row"
                className="px-5 py-4 text-left font-normal text-pretty"
              >
                <span className="block text-sm font-semibold">
                  {tarief.naam}
                </span>
                <span className="mt-0.5 block text-sm text-fg-muted">
                  {tarief.toelichting}
                </span>
              </th>
              <td className="px-5 py-4 text-right align-top font-display text-base font-semibold whitespace-nowrap tabular">
                {tarief.prijs}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
