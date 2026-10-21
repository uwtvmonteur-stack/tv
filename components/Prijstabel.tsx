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
  // `bg-white` op de omlijsting, zodat de tabel ook op een grijze sectie als
  // papier leest en alleen de kopregel grijs is.
  return (
    <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-ink-200">
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">
          Vanafprijzen van Uw TV Monteur, inclusief voorrijkosten en btw. Het
          exacte bedrag staat in uw offerte.
        </caption>
        <thead>
          <tr className="border-b border-ink-200 bg-surface">
            <th
              scope="col"
              className="px-4 py-3 text-sm font-semibold text-ink-600 sm:px-6"
            >
              Dienst
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-right text-sm font-semibold text-ink-600 sm:px-6"
            >
              Prijs
            </th>
          </tr>
        </thead>
        <tbody>
          {tarieven.map((tarief) => (
            <tr key={tarief.naam} className="border-b border-ink-100 last:border-0">
              {/* Smalle opvulling links en rechts, en het bedrag zonder
                  afbreking: op 360px moeten dienst en bedrag naast elkaar
                  blijven passen zonder dat de tabel horizontaal gaat schuiven.
                  De dienstnaam is de enige kolom die mag afbreken. */}
              <th
                scope="row"
                className="px-4 py-4 text-left font-normal text-pretty sm:px-6"
              >
                <span className="block font-display font-bold text-ink-950">
                  {tarief.naam}
                </span>
                <span className="mt-1 block text-sm text-ink-600">
                  {tarief.toelichting}
                </span>
              </th>
              <td className="px-4 py-4 text-right align-top font-display font-bold whitespace-nowrap text-ink-950 tabular sm:px-6">
                {tarief.prijs}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
