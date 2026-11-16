import { Icon } from "./Icon";
import { prijsGaranties } from "@/lib/content";

/**
 * De drie dingen die de prijs niet veranderen, direct onder de tarieven.
 *
 * "Vaste prijs" is op zichzelf een lege belofte — iedere concurrent zegt het,
 * en rekent vervolgens een toeslag voor de avond, het weekend of een wand die
 * anders blijkt. Daarom staat hier waar de prijs tégen vast is, op de plek
 * waar de bezoeker net een bedrag heeft gezien en zich afvraagt wat er nog bij
 * komt.
 */
export default function PrijsGarantie({
  className = "",
}: {
  className?: string;
}) {
  return (
    <ul className={`grid gap-4 md:grid-cols-3 ${className}`}>
      {prijsGaranties.map((garantie) => (
        <li key={garantie.kop} className="komt-op paneel p-5 sm:p-6">
          <span className="icoonvlak">
            <Icon name={garantie.icon} className="size-6" />
          </span>
          <h3 className="mt-4 text-h3">{garantie.kop}</h3>
          <p className="mt-2 text-kaart text-ink-600">{garantie.tekst}</p>
        </li>
      ))}
    </ul>
  );
}
