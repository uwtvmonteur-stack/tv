import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import { IconArrowUpRight } from "./icons";
import familieImg from "@/public/images/familie-kijkt-tv.jpg";

export default function CtaSection({
  // "Vanavond al zorgeloos kijken?" en "vaak al binnen 24 uur" beloofden iets
  // wat de aanvraagflow niet waarmaakt: de datumkiezer begint pas op morgen.
  // Om precies dezelfde reden is eerder "Vandaag gebeld" van /tv-ophangen
  // gehaald. Deze standaard staat op home, /diensten, /over-ons, /prijzen, de
  // kennisbank en de 32 stadpagina's — dus zesvoudig dezelfde loze belofte.
  title = "Vraag vrijblijvend uw offerte aan",
  text = "Vraag online uw afspraak aan — u hoort binnen enkele uren wat de eerstvolgende mogelijkheid is. 's Avonds tot 21:00 en in het weekend zonder toeslag, en u betaalt pas na afloop.",
  // Staat het formulier op dezelfde pagina, dan geeft die pagina `#offerte`
  // mee: deze afsluiter hoeft niemand te verhuizen naar /contact voor iets wat
  // een paar regels hoger staat.
  href = "/contact",
}: {
  title?: string;
  text?: string;
  href?: string;
}) {
  return (
    <section className="px-2 py-12 md:px-6">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-lg">
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
            <h2 className="font-display text-h1 font-semibold text-white">
              {title}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/80">
              {text}
            </p>
          </Reveal>
          <Reveal delay={150}>
            <div className="mt-10">
              <Link
                href={href}
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-paper py-2.5 pr-2.5 pl-7 text-base font-semibold text-fg transition-[transform,background-color] duration-300 ease-out hover:bg-white active:scale-[0.98]"
              >
                Offerte aanvragen
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sunk transition-transform duration-500 ease-out group-hover:-translate-y-px group-hover:translate-x-0.5 group-hover:scale-105">
                  <IconArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
