import Reveal from "./Reveal";
import { stats } from "@/lib/content";

/** Gedeelde cijfer-grid (home + over-ons) — één bron voor de kerncijfers. */
export default function StatsGrid({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <h2 className="sr-only">Onze cijfers</h2>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <li key={stat.label}>
            <Reveal delay={i * 80}>
              <div className="flex flex-col items-center gap-2 text-center">
                <span className="font-display text-h2 font-semibold">
                  {stat.value}
                </span>
                <span className="text-sm text-fg-muted">{stat.label}</span>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}
