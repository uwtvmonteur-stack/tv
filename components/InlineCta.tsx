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
 * De kop is bewust geen h2: dit introduceert geen nieuw onderwerp en hoort
 * dus niet in de documentstructuur die zoekmachines uitlezen.
 */
export default function InlineCta({
  title = "Klaar om het bedrag te weten?",
  text = "U krijgt uw prijs vooraf in een vrijblijvende offerte, ook aan een gipswand of holle wand. Binnen enkele uren bericht.",
  label = "Offerte aanvragen",
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
    <div className="relative mt-12 overflow-hidden rounded-3xl bg-ink-950 px-7 py-8 text-white md:px-10">
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -right-20 -top-20 size-64 rounded-full bg-accent-500/20 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <p className="font-display text-h3 font-bold text-white">{title}</p>
          <p className="mt-2 text-ink-300">{text}</p>
        </div>
        <Link href={href} className="btn-primary shrink-0">
          {label}
          <Icon name="arrow-right" className="size-5" />
        </Link>
      </div>
    </div>
  );
}
