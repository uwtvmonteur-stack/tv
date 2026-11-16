import { tarieven } from "@/lib/content";

/**
 * Alle tarieven in één echte tabel.
 *
 * De bedragen stonden eens in losse kaarten en in een lijst met
 * `<span>`-jes. Dat leest voor een bezoeker als marketing en voor een
 * zoekmachine als niets: de pagina's die ranken op "wat kost tv ophangen"
 * zetten hun prijzen zonder uitzondering in een tabel, met de dienst links
 * en het bedrag rechts. Een `<table>` met koppen is bovendien het enige wat
 * een schermlezer kan voorlezen als "dienst X kost Y".
 *
 * De tabel staat in een witte kaart met een bijna-zwarte kopregel, zoals de
 * prijskaart op de andere eigen sites. De kopregel is een echt gevulde rij en
 * geen rand: die blijft ook in de hoog-contrastmodus van Windows staan, waar
 * een `ring` (een box-shadow) wordt weggelaten.
 *
 * Afgeleid van dezelfde bron als de prijsklassen en het formulier, zodat de
 * drie elkaar niet kunnen tegenspreken.
 */
export default function Prijstabel() {
  return (
    <div className="paneel overflow-hidden">
      <table className="w-full border-collapse text-left">
        {/* Beschreef de tabel eerder als "vanafprijzen" met het exacte bedrag in
            een offerte. Sinds de vaste tarieven terug zijn, klopt dat voor de
            meeste regels niet: alleen de regels met "vanaf" of "na meting"
            hangen nog van de situatie af. */}
        <caption className="sr-only">
          Tarieven van Uw TV Monteur, inclusief voorrijkosten en btw. Een bedrag
          met &quot;vanaf&quot; of &quot;na meting&quot; hangt af van uw
          situatie; de rest staat vast.
        </caption>
        <thead>
          <tr className="bg-ink-950">
            <th
              scope="col"
              className="py-3.5 pl-5 pr-4 text-xs font-bold uppercase tracking-[0.14em] text-amber-300 sm:pl-6"
            >
              Dienst
            </th>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-5 text-right text-xs font-bold uppercase tracking-[0.14em] text-amber-300 sm:pr-6"
            >
              Prijs
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-100">
          {tarieven.map((tarief) => (
            <tr key={tarief.naam}>
              {/* Het bedrag zonder afbreking: op 360px moeten dienst en bedrag
                  naast elkaar blijven passen zonder dat de tabel horizontaal
                  gaat schuiven. De dienstnaam is de enige kolom die mag
                  afbreken. */}
              <th
                scope="row"
                className="py-4 pl-5 pr-4 text-left font-normal text-pretty sm:pl-6"
              >
                <span className="block font-display text-h4 font-extrabold text-ink-950">
                  {tarief.naam}
                </span>
                <span className="mt-1 block text-sm text-ink-600">
                  {tarief.toelichting}
                </span>
              </th>
              <td className="cijfers py-4 pl-4 pr-5 text-right align-top font-display text-h4 font-extrabold whitespace-nowrap text-ink-950 sm:pr-6">
                {tarief.prijs}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
