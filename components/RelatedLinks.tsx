import Link from "next/link";
import { Icon } from "./Icon";

/**
 * Gedeelde "Ook interessant"-rij met interne links — één bron voor alle
 * dienstpagina's.
 *
 * Nu een lijst onder een haarlijn in plaats van een rij pillen. Een pil
 * belooft een filter of een keuze; dit zijn gewoon verwijzingen, en als
 * regels met een pijl leest meteen welke kant ze op gaan.
 */
export default function RelatedLinks({
  items,
  label = "Ook interessant",
}: {
  items: [string, string][];
  label?: string;
}) {
  return (
    <nav aria-label="Gerelateerde pagina's" className="mt-16">
      <h2 className="bovenkop">{label}</h2>
      <ul className="paneel mt-4 divide-y divide-ink-100 px-5 sm:px-6">
        {items.map(([href, linkLabel]) => (
          <li key={href}>
            <Link
              href={href}
              // Een rij van minimaal 48px hoog: op een telefoon staan deze
              // links direct onder elkaar, en dan moet elk doel met een duim
              // te raken zijn zonder de buur te treffen.
              className="group flex min-h-14 items-center justify-between gap-4 py-2.5 font-semibold text-ink-800 transition-colors duration-200 hover:text-amber-800"
            >
              {linkLabel}
              <Icon
                name="arrow-right"
                className="size-5 shrink-0 text-ink-400 transition group-hover:translate-x-1 group-hover:text-amber-700"
              />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
