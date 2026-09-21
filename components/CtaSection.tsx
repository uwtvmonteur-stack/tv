import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import { IconArrowUpRight, IconPhone } from "./icons";
import { SITE } from "@/lib/site";
import familieImg from "@/public/images/familie-kijkt-tv.jpg";

export default function CtaSection({
  title = "Vanavond al zorgeloos kijken?",
  text = "Plan uw afspraak binnen één minuut. Onze monteurs staan voor u klaar — vaak al binnen 24 uur.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="px-2 py-12 md:px-6">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem]">
        <Image
          src={familieImg}
          alt="Stel geniet 's avonds van een film op een wandgemonteerde tv"
          fill
          placeholder="blur"
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/70 to-black/55" />
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center md:py-36 [text-shadow:0_1px_16px_rgba(0,0,0,0.6)]">
          <Reveal>
            <h2 className="font-display text-4xl font-bold tracking-tight text-white md:text-6xl">
              {title}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/80">
              {text}
            </p>
          </Reveal>
          <Reveal delay={150}>
            <div className="mt-10 flex flex-col items-center gap-5">
              <Link
                href="/contact"
                className="group flex items-center justify-center gap-3 rounded-full bg-cream py-2.5 pr-2.5 pl-7 text-base font-semibold text-ink transition-transform duration-300 ease-fluid active:scale-[0.98]"
              >
                Plan een afspraak
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink/10 transition-transform duration-500 ease-spring group-hover:-translate-y-px group-hover:translate-x-0.5 group-hover:scale-105">
                  <IconArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
              <a
                href={`tel:${SITE.phone}`}
                className="flex items-center gap-2 text-[15px] font-medium text-white/80 transition-colors duration-300 ease-fluid hover:text-white"
              >
                <IconPhone className="h-4 w-4" />
                Liever bellen?{" "}
                <span className="font-semibold text-white underline decoration-white/40 underline-offset-4">
                  {SITE.phoneDisplay}
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
