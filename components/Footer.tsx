import Link from "next/link";
import { IconMapPin, IconShield } from "./icons";
import { LogoGlyph } from "./Logo";
import { SITE } from "@/lib/site";
import { diensten, dienstHref } from "@/lib/content";
import { provincies, steden } from "@/lib/steden";
import { artikelen } from "@/lib/kennisbank";

export default function Footer() {
  return (
    <footer className="bg-inverse text-fg-inverse">
      <div className="mx-auto w-full max-w-content px-4 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                <LogoGlyph className="h-5 w-5 text-accent-ink" />
              </span>
              <span className="font-display text-lg font-semibold tracking-tight">
                {SITE.name}
              </span>
            </div>
            <p className="mt-5 max-w-sm leading-relaxed text-white/60">
              Uw tv monteur aan huis: tv ophangen, kabels wegwerken en complete
              tv-installatie — vakkundig, netjes en verzekerd.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm text-white/60">
              <IconShield className="h-4 w-4 text-accent-ink" />
              Volledig verzekerd · 7 dagen per week
            </div>
            <div className="mt-3 flex items-start gap-2 text-sm text-white/60">
              <IconMapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-ink" />
              <span>
                Actief in Zuid-Holland, Noord-Holland, Utrecht en Noord-Brabant
                — en daarbuiten.
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-2xs font-semibold tracking-[0.16em] text-white/50 uppercase">
              Diensten
            </h3>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              {diensten.map((dienst) => (
                <li key={dienst.slug}>
                  <Link
                    href={dienstHref(dienst)}
                    className="inline-flex min-h-11 items-center text-white/70 transition-colors duration-300 ease-out hover:text-white"
                  >
                    {dienst.naam}
                  </Link>
                </li>
              ))}
              {/* De specialistische pagina's staan bewust náást `diensten` en
                  niet erin: ze horen in de voettekst en in de sitemap, maar ze
                  mogen het dienstenoverzicht en het raster op de homepage niet
                  uit balans trekken. */}
              {[
                ["/kabels-wegwerken", "Kabels wegwerken"],
                ["/tv-boven-open-haard", "Tv boven de open haard"],
                ["/tv-ophangen-gipswand", "Ophangen aan een gipswand"],
                ["/prijzen", "Prijzen"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="inline-flex min-h-11 items-center text-white/70 transition-colors duration-300 ease-out hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-2xs font-semibold tracking-[0.16em] text-white/50 uppercase">
              Werkgebied
            </h3>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              {provincies.map((provincie) => (
                <li key={provincie.slug}>
                  <Link
                    href={`/werkgebied/${provincie.slug}`}
                    className="inline-flex min-h-11 items-center text-white/70 transition-colors duration-300 ease-out hover:text-white"
                  >
                    Tv monteur {provincie.naam}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/werkgebied"
                  className="inline-flex min-h-11 items-center text-white/70 transition-colors duration-300 ease-out hover:text-white"
                >
                  Volledig werkgebied
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xs font-semibold tracking-[0.16em] text-white/50 uppercase">
              Contact
            </h3>
            <ul className="mt-5 flex flex-col gap-3 text-sm text-white/70">
              <li>
                <a
                  href={`tel:${SITE.phone}`}
                  className="inline-flex min-h-11 items-center transition-colors duration-300 ease-out hover:text-white"
                >
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex min-h-11 items-center transition-colors duration-300 ease-out hover:text-white"
                >
                  {SITE.email}
                </a>
              </li>
              {SITE.whatsapp && (
                <li>
                  <a
                    href={SITE.whatsapp}
                    className="inline-flex min-h-11 items-center transition-colors duration-300 ease-out hover:text-white"
                  >
                    WhatsApp
                  </a>
                </li>
              )}
              <li>
                <Link
                  href="/kennisbank"
                  className="inline-flex min-h-11 items-center transition-colors duration-300 ease-out hover:text-white"
                >
                  Kennisbank
                </Link>
              </li>
              <li>
                <Link
                  href="/over-ons"
                  className="inline-flex min-h-11 items-center transition-colors duration-300 ease-out hover:text-white"
                >
                  Over ons
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="inline-flex min-h-11 items-center transition-colors duration-300 ease-out hover:text-white"
                >
                  Offerte aanvragen
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="inline-flex min-h-11 items-center transition-colors duration-300 ease-out hover:text-white"
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
              <h3 className="text-2xs font-semibold tracking-[0.16em] text-white/50 uppercase">
                Ons werkgebied
              </h3>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                {provincies.map((provincie) => (
                  <li key={provincie.slug}>
                    <Link
                      href={`/werkgebied/${provincie.slug}`}
                      className="inline-flex min-h-11 items-center text-white/55 transition-colors duration-300 ease-out hover:text-white"
                    >
                      Tv monteur {provincie.naam}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/werkgebied"
                    className="inline-flex min-h-11 items-center font-medium text-white/75 transition-colors duration-300 ease-out hover:text-white"
                  >
                    Alle {steden.length} steden
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xs font-semibold tracking-[0.16em] text-white/50 uppercase">
                Kennisbank
              </h3>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                {artikelen.map((artikel) => (
                  <li key={artikel.slug}>
                    <Link
                      href={`/kennisbank/${artikel.slug}`}
                      className="inline-flex min-h-11 items-center text-white/55 transition-colors duration-300 ease-out hover:text-white"
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
