import Link from "next/link";
import { Icon } from "./Icon";

/**
 * Compacte oproep midden op een pagina.
 *
 * Maar een klein deel van de bezoekers haalt de onderkant van een
 * dienstpagina, waardoor het grote slotblok daar de meeste mensen nooit
 * bereikt. Deze variant staat direct onder het prijsblok — het moment waarop
 * iemand beslist — en pareert kort de bezwaren die dan spelen.
 *
 * Licht en met een amberen streep ernaast, niet zwart. Het slotblok onderaan
 * de pagina is al donker; twee zwarte vlakken op één pagina maken van een
 * tussenoproep een tweede einde.
 *
 * De kop is bewust geen h2: dit introduceert geen nieuw onderwerp en hoort
 * dus niet in de documentstructuur die zoekmachines uitlezen.
 */
export default function InlineCta({
  title = "Klaar om het bedrag te weten?",
  text = "U kent uw prijs vooraf, ook aan een gipswand of holle wand. Binnen enkele uren bericht.",
  label = "Afspraak aanvragen",
  /**
   * Standaard naar /contact. Pagina's die zélf een formulier dragen geven
   * `#offerte` mee, zodat deze knop naar dat formulier springt in plaats van
   * de bezoeker van de pagina te halen — precies op het moment dat hij zijn
   * prijs heeft gezien. Bewust een prop en geen detectie in de browser: zo
   * blijft dit een servercomponent zonder JavaScript.
   */
  href = "/contact",
}: {
  title?: string;
  text?: string;
  label?: string;
  href?: string;
}) {
  return (
    <div className="mt-12 rounded-2xl border-l-4 border-amber-400 bg-surface px-6 py-7 ring-1 ring-ink-100 sm:px-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <p className="font-display text-h3 font-extrabold text-ink-950">
            {title}
          </p>
          <p className="mt-2 text-ink-600">{text}</p>
        </div>
        <Link href={href} className="knop-vol shrink-0">
          {label}
          <Icon name="arrow-right" className="size-5" />
        </Link>
      </div>
    </div>
  );
}
