import Link from "next/link";
import { IconMapPin, IconShield } from "./icons";
import { LogoGlyph } from "./Logo";
import { SITE } from "@/lib/site";
import { diensten, dienstHref } from "@/lib/content";
import { provincies, steden } from "@/lib/steden";
import { artikelen } from "@/lib/kennisbank";

export default function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                <LogoGlyph className="h-5 w-5 text-amber-500" />
              </span>
              <span className="font-display text-lg font-bold tracking-tight">
                {SITE.name}
              </span>
            </div>
            <p className="mt-5 max-w-sm leading-relaxed text-white/60">
              Uw tv monteur aan huis: tv ophangen, kabels wegwerken en complete
              tv-installatie — vakkundig, netjes en verzekerd.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm text-white/60">
              <IconShield className="h-4 w-4 text-amber-500" />
              Volledig verzekerd · 7 dagen per week
            </div>
            <div className="mt-3 flex items-start gap-2 text-sm text-white/60">
              <IconMapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
              <span>
                Actief in Zuid-Holland, Noord-Holland, Utrecht en Noord-Brabant
                — en daarbuiten.
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold tracking-[0.16em] text-white/50 uppercase">
              Diensten
            </h3>
            <ul className="mt-5 flex flex-col gap-3 text-[15px]">
              {diensten.map((dienst) => (
                <li key={dienst.slug}>
                  <Link
                    href={dienstHref(dienst)}
                    className="text-white/70 transition-colors duration-300 ease-fluid hover:text-white"
                  >
                    {dienst.naam}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/prijzen"
                  className="text-white/70 transition-colors duration-300 ease-fluid hover:text-white"
                >
                  Prijzen
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold tracking-[0.16em] text-white/50 uppercase">
              Werkgebied
            </h3>
            <ul className="mt-5 flex flex-col gap-3 text-[15px]">
              {provincies.map((provincie) => (
                <li key={provincie.slug}>
                  <Link
                    href={`/werkgebied/${provincie.slug}`}
                    className="text-white/70 transition-colors duration-300 ease-fluid hover:text-white"
                  >
                    Tv monteur {provincie.naam}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/werkgebied"
                  className="text-white/70 transition-colors duration-300 ease-fluid hover:text-white"
                >
                  Volledig werkgebied
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold tracking-[0.16em] text-white/50 uppercase">
              Contact
            </h3>
            <ul className="mt-5 flex flex-col gap-3 text-[15px] text-white/70">
              <li>
                <a
                  href={`tel:${SITE.phone}`}
                  className="transition-colors duration-300 ease-fluid hover:text-white"
                >
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="transition-colors duration-300 ease-fluid hover:text-white"
                >
                  {SITE.email}
                </a>
              </li>
              {SITE.whatsapp && (
                <li>
                  <a
                    href={SITE.whatsapp}
                    className="transition-colors duration-300 ease-fluid hover:text-white"
                  >
                    WhatsApp
                  </a>
                </li>
              )}
              <li>
                <Link
                  href="/kennisbank"
                  className="transition-colors duration-300 ease-fluid hover:text-white"
                >
                  Kennisbank
                </Link>
              </li>
              <li>
                <Link
                  href="/over-ons"
                  className="transition-colors duration-300 ease-fluid hover:text-white"
                >
                  Over ons
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="transition-colors duration-300 ease-fluid hover:text-white"
                >
                  Afspraak maken
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="transition-colors duration-300 ease-fluid hover:text-white"
                >
                  Privacyverklaring
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Hub-and-spoke in plaats van 32 stadlinks op elke pagina.
            Gemeten: elke stadpagina kreeg 57 interne links en /privacy (noindex)
            er 54, terwijl de kennisbankartikelen er 2 tot 6 hadden. Daarmee
            vertelde de site Google dat 32 vrijwel identieke stadpagina's het
            belangrijkst waren — en 19 ervan stonden alsnog niet in de index.
            De provincies en /werkgebied zijn nu de hub; die linken door naar de
            steden, zodat elke stadpagina bereikbaar blijft zonder dat elke
            pagina 32 keer hetzelfde signaal afgeeft. */}
        <div className="mt-14 border-t border-white/10 pt-8">
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-[11px] font-semibold tracking-[0.16em] text-white/50 uppercase">
                Ons werkgebied
              </h3>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                {provincies.map((provincie) => (
                  <li key={provincie.slug}>
                    <Link
                      href={`/werkgebied/${provincie.slug}`}
                      className="text-white/55 transition-colors duration-300 ease-fluid hover:text-white"
                    >
                      Tv monteur {provincie.naam}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/werkgebied"
                    className="font-medium text-white/75 transition-colors duration-300 ease-fluid hover:text-white"
                  >
                    Alle {steden.length} steden
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-[11px] font-semibold tracking-[0.16em] text-white/50 uppercase">
                Kennisbank
              </h3>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                {artikelen.map((artikel) => (
                  <li key={artikel.slug}>
                    <Link
                      href={`/kennisbank/${artikel.slug}`}
                      className="text-white/55 transition-colors duration-300 ease-fluid hover:text-white"
                    >
                      {artikel.titel}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/50 md:flex-row md:items-center">
          <span>
            © {new Date().getFullYear()} {SITE.name}
            {SITE.kvk ? ` · KvK ${SITE.kvk}` : ""}
            {SITE.btw ? ` · BTW ${SITE.btw}` : ""}
          </span>
          <span>Alle prijzen inclusief btw en voorrijkosten</span>
        </div>
      </div>
    </footer>
  );
}
