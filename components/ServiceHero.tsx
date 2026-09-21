import Image from "next/image";
import Link from "next/link";
import type { StaticImageData } from "next/image";
import type { ReactNode } from "react";
import Reveal from "./Reveal";
import Breadcrumbs, { type Crumb } from "./Breadcrumbs";
import { Eyebrow, Stars } from "./ui";
import { IconArrowUpRight, IconCheck, IconClock, IconShield } from "./icons";
import { SITE } from "@/lib/site";

export default function ServiceHero({
  crumbs,
  eyebrow,
  title,
  intro,
  benefits,
  image,
  imageAlt,
  priority = true,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  benefits: string[];
  image: StaticImageData;
  imageAlt: string;
  priority?: boolean;
}) {
  return (
    <header className="mx-auto w-full max-w-6xl px-4 pt-32 pb-6 md:px-8 md:pt-40">
      <Breadcrumbs items={crumbs} />
      <div className="mt-8 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <Reveal immediate>
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="mt-6 font-display text-4xl leading-[1.02] font-bold tracking-tight md:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              {intro}
            </p>

            <ul className="mt-7 flex flex-col gap-2.5">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[15px] font-medium">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-600/10 text-amber-700">
                    <IconCheck className="h-3.5 w-3.5" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            {/* Eén actie per scherm. Het telefoonnummer staat alleen nog in de
                footer, zodat niets de afspraakknop beconcurreert. */}
            <div className="mt-8">
              <Link
                href="/contact"
                className="group flex w-full items-center justify-center gap-3 rounded-full bg-ink py-2.5 pr-2.5 pl-7 text-base font-semibold text-cream transition-transform duration-300 ease-fluid active:scale-[0.98] sm:w-auto sm:inline-flex"
              >
                Plan een afspraak
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 ease-spring group-hover:-translate-y-px group-hover:translate-x-0.5 group-hover:scale-105">
                  <IconArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-soft">
              <span className="flex items-center gap-2">
                <Stars />
                <strong className="font-semibold text-ink">
                  {SITE.reviews.score} / 5
                </strong>
                {SITE.reviews.url && (
                  <a
                    href={SITE.reviews.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-amber-600/50 underline-offset-2"
                  >
                    {SITE.reviews.count} reviews
                  </a>
                )}
              </span>
              <span className="flex items-center gap-2">
                <IconClock className="h-4 w-4 text-amber-700" />7 dagen per week
              </span>
              <span className="flex items-center gap-2">
                <IconShield className="h-4 w-4 text-amber-700" />
                Volledig verzekerd
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal immediate>
          <div className="rounded-[2rem] bg-ink/[0.04] p-1.5 ring-1 ring-ink/5">
            <div className="overflow-hidden rounded-[calc(2rem-0.375rem)]">
              <Image
                src={image}
                alt={imageAlt}
                placeholder="blur"
                priority={priority}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </header>
  );
}
