import Reveal from "./Reveal";
import { Button, Card } from "./ui";
import { IconArrowUpRight } from "./icons";
import { VANAF_PRIJS, prijsFactoren } from "@/lib/content";

/**
 * De vanafprijs, met daarnaast waar het uiteindelijke bedrag van afhangt.
 *
 * Dit blok verving de drie prijskaarten per tv-formaat. Een bezoeker die geen
 * vast bedrag ziet, wil precies één ding weten: waar hangt het dan van af?
 * Krijgt hij daar geen antwoord op, dan leest "offerte" als "ze willen niet
 * zeggen wat het kost" — en dat is duurder dan welk tarief ook.
 */
export default function Prijsindicatie({
  href = "#offerte",
  className = "",
}: {
  href?: string;
  className?: string;
}) {
  return (
    <div className={`grid gap-4 lg:grid-cols-5 ${className}`}>
      <Reveal className="lg:col-span-2">
        <Card
          tone="inverse"
          className="flex h-full flex-col justify-between p-8"
        >
          <div>
            <p className="text-2xs font-semibold tracking-[0.12em] text-accent-ink uppercase">
              Tv ophangen
            </p>
            <p className="mt-4 flex items-baseline gap-2">
              <span className="text-lead text-fg-inverse-muted">vanaf</span>
              <span className="font-display text-stat font-semibold tabular">
                {VANAF_PRIJS}
              </span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-fg-inverse-muted">
              Inclusief voorrijkosten en btw. Wat het bij u precies wordt, zet
              u binnen enkele uren zwart-op-wit in uw offerte — vrijblijvend.
            </p>
          </div>
          <div className="mt-8">
            <Button href={href} variant="inverse" maat="lg" breed>
              Offerte aanvragen
              <IconArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </Reveal>

      <div className="lg:col-span-3">
        <Reveal delay={80}>
          <h3 className="font-display text-h3 font-semibold">
            Waar uw prijs van afhangt
          </h3>
        </Reveal>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {prijsFactoren.map((factor, i) => (
            <li key={factor.kop} className="h-full">
              <Reveal delay={100 + (i % 2) * 60} className="h-full">
                <Card className="h-full p-5">
                  <h4 className="font-display text-base font-semibold">
                    {factor.kop}
                  </h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
                    {factor.tekst}
                  </p>
                </Card>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
