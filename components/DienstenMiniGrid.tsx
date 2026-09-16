import Link from "next/link";
import Reveal from "./Reveal";
import { BezelCard, DienstIcon, IconChip } from "./ui";
import { diensten, dienstHref } from "@/lib/content";

/** Gedeelde "Onze diensten in {plaats}"-grid (stad- en provincie-pagina's). */
export default function DienstenMiniGrid({ plaats }: { plaats: string }) {
  return (
    <>
      <Reveal>
        <h2 className="mt-20 font-display text-3xl font-bold tracking-tight md:text-4xl">
          Onze diensten in {plaats}
        </h2>
      </Reveal>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {diensten.map((dienst, i) => (
          <li key={dienst.slug} className="h-full">
            <Reveal delay={i * 60} className="h-full">
              <Link href={dienstHref(dienst)} className="group block h-full">
                <BezelCard
                  className="h-full transition-transform duration-500 ease-fluid group-hover:-translate-y-1"
                  innerClassName="flex h-full flex-col gap-4 p-7"
                >
                  <IconChip>
                    <DienstIcon slug={dienst.slug} className="h-5.5 w-5.5" />
                  </IconChip>
                  <div>
                    <h3 className="font-display text-lg font-bold tracking-tight">
                      {dienst.naam}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      {dienst.kort}
                    </p>
                  </div>
                </BezelCard>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </>
  );
}
