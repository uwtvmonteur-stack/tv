import Link from "next/link";
import Reveal from "./Reveal";
import { IconArrowUpRight } from "./icons";

/**
 * Compacte CTA voor midden op een pagina. Uit Analytics blijkt dat maar 16% van
 * de bezoekers de onderkant van een dienstpagina haalt, waardoor de grote
 * CtaSection daar de meeste mensen nooit bereikt. Deze variant staat direct
 * onder het tariefblok — het moment waarop iemand beslist — en pareert kort de
 * drie bezwaren die dan spelen: prijs, haalbaarheid en wachttijd.
 *
 * De kop is bewust geen <h2>: dit introduceert geen nieuw onderwerp en hoort
 * dus niet in de documentstructuur die zoekmachines uitlezen.
 */
export default function InlineCta({
  title = "Klaar om een datum te kiezen?",
  text = "Vaste prijs vooraf, ook aan gipswand of holle wand. U krijgt binnen enkele uren bericht over de eerstvolgende mogelijkheid.",
  label = "Afspraak aanvragen",
  /**
   * Standaard naar /contact. Pagina's die zélf een afspraakformulier dragen
   * geven `#afspraak` mee, zodat deze knop naar dat formulier springt in
   * plaats van de bezoeker van de pagina te halen — precies op het moment dat
   * hij zijn prijs heeft gezien. Bewust een prop en geen detectie in de
   * browser: zo blijft dit een servercomponent zonder JavaScript.
   */
  href = "/contact",
}: {
  title?: string;
  text?: string;
  label?: string;
  href?: string;
}) {
  return (
    <Reveal>
      <div className="mt-12 flex flex-col gap-6 rounded-[2rem] bg-ink px-7 py-8 text-cream md:flex-row md:items-center md:justify-between md:px-10">
        <div className="max-w-xl">
          <p className="font-display text-2xl font-bold tracking-tight">
            {title}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-cream/70">{text}</p>
        </div>
        <Link
          href={href}
          className="group inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-cream py-2.5 pr-2.5 pl-7 text-base font-semibold text-ink transition-transform duration-300 ease-fluid active:scale-[0.98]"
        >
          {label}
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink/10 transition-transform duration-500 ease-spring group-hover:-translate-y-px group-hover:translate-x-0.5 group-hover:scale-105">
            <IconArrowUpRight className="h-4 w-4" />
          </span>
        </Link>
      </div>
    </Reveal>
  );
}
