import Reveal from "./Reveal";
import { IconCheck, IconClock, IconShield } from "./icons";
import { IconChip } from "./ui";
import { prijsGaranties } from "@/lib/content";

function GarantieIcon({ naam }: { naam: string }) {
  if (naam === "clock") return <IconClock className="h-5 w-5" />;
  if (naam === "check") return <IconCheck className="h-5 w-5" />;
  return <IconShield className="h-5 w-5" />;
}

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
      {prijsGaranties.map((garantie, i) => (
        <li key={garantie.kop}>
          <Reveal delay={i * 80} className="h-full">
            <div className="flex h-full flex-col rounded-md bg-white p-7 border border-hairline">
              <IconChip>
                <GarantieIcon naam={garantie.icon} />
              </IconChip>
              <h3 className="mt-5 font-display text-[1.0625rem] leading-snug font-semibold">
                {garantie.kop}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">
                {garantie.tekst}
              </p>
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
