import Link from "next/link";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { SITE } from "@/lib/site";
import { diensten, dienstHref } from "@/lib/content";
import { provincies, steden } from "@/lib/steden";
import { artikelen } from "@/lib/kennisbank";

/* =========================================================================
   Voettekst
   =========================================================================
   De enige plek op de site waar het telefoonnummer staat, en bewust als
   gewone link: elders zou een belknop concurreren met de offerteaanvraag.

   Elke link is een rij van minimaal 44 px (`min-h-11`). In de oude voettekst
   waren de aanraakrijen 20 tot 32 px hoog — op een telefoon raakte je daar
   structureel de verkeerde link, en dat is geen smaakkwestie maar een fout.
   ========================================================================= */

const rij =
  "inline-flex min-h-11 items-center gap-2 text-sm text-ink-300 transition-colors duration-200 hover:text-white";
const kop = "text-2xs font-bold uppercase tracking-widest text-ink-400";

/**
 * De specialistische pagina's staan náást `diensten` en niet erin: ze horen
 * in de voettekst en in de sitemap, maar ze mogen het dienstenoverzicht en
 * het raster op de homepage niet uit balans trekken.
 */
const extraPaginas = [
  { href: "/kabels-wegwerken", label: "Kabels wegwerken" },
  { href: "/tv-boven-open-haard", label: "Tv boven de open haard" },
  { href: "/tv-ophangen-gipswand", label: "Ophangen aan een gipswand" },
  { href: "/prijzen", label: "Prijzen" },
];

export default function Footer() {
  return (
    // De extra onderruimte op mobiel is voor StickyBar: die balk staat vast
    // onderaan en zou anders de laatste regels van de voettekst afdekken.
    <footer className="bg-ink-950 pb-20 text-ink-300 lg:pb-0">
      <div className="container-x py-16 lg:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo dark />
            <p className="mt-5 max-w-sm text-sm text-ink-400">
              Uw tv monteur aan huis: tv ophangen, kabels wegwerken, soundbar
              installeren en een complete tv-installatie. Vakkundig, netjes en
              verzekerd — met het bedrag vooraf op papier.
            </p>
            <p className="mt-6 flex items-start gap-2.5 text-sm">
              <Icon
                name="shield"
                className="mt-0.5 size-5 shrink-0 text-accent-300"
              />
              Eigen verzekerde monteurs, zeven dagen per week
            </p>
            <p className="mt-3 flex items-start gap-2.5 text-sm">
              <Icon
                name="map-pin"
                className="mt-0.5 size-5 shrink-0 text-accent-300"
              />
              Aan huis in {provincies.length} provincies en {steden.length}{" "}
              steden
            </p>
          </div>

          <nav aria-labelledby="voet-diensten">
            <h2 id="voet-diensten" className={kop}>
              Diensten
            </h2>
            <ul className="mt-3">
              {diensten.map((d) => (
                <li key={d.slug}>
                  <Link href={dienstHref(d)} className={rij}>
                    {d.naam}
                  </Link>
                </li>
              ))}
              {extraPaginas.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className={rij}>
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="voet-werkgebied">
            <h2 id="voet-werkgebied" className={kop}>
              Werkgebied
            </h2>
            <ul className="mt-3">
              {provincies.map((p) => (
                <li key={p.slug}>
                  <Link href={`/werkgebied/${p.slug}`} className={rij}>
                    Tv monteur {p.naam}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/werkgebied" className={`${rij} font-semibold`}>
                  Alle {steden.length} steden
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className={kop}>Contact</h2>
            <ul className="mt-3">
              <li>
                <a href={`tel:${SITE.phone}`} className={`${rij} text-white`}>
                  <Icon name="phone" className="size-4 text-accent-300" />
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className={rij}>
                  <Icon name="mail" className="size-4 text-accent-300" />
                  {SITE.email}
                </a>
              </li>
              {SITE.whatsapp && (
                <li>
                  <a href={SITE.whatsapp} className={rij}>
                    <Icon name="whatsapp" className="size-4 text-accent-300" />
                    WhatsApp
                  </a>
                </li>
              )}
              <li>
                <Link href="/contact" className={rij}>
                  <Icon name="chat" className="size-4 text-accent-300" />
                  Offerte aanvragen
                </Link>
              </li>
            </ul>
            {/* Dezelfde tijden als in `openingHoursSpecification` in
                app/layout.tsx en in de bovenbalk van Header. */}
            <p className="mt-3 flex items-start gap-2 text-sm text-ink-400">
              <Icon
                name="clock"
                className="mt-0.5 size-4 shrink-0 text-accent-300"
              />
              <span>
                {SITE.openingstijden.lang.map((regel) => (
                  <span key={regel} className="block">
                    {regel}
                  </span>
                ))}
              </span>
            </p>
            <ul className="mt-3">
              <li>
                <Link href="/over-ons" className={rij}>
                  Over ons
                </Link>
              </li>
              <li>
                <Link href="/privacy" className={rij}>
                  Privacyverklaring
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Hub-and-spoke in plaats van 32 stadlinks op elke pagina.
            Gemeten: elke stadpagina kreeg 57 interne links en /privacy
            (noindex) er 54, terwijl de kennisbankartikelen er 2 tot 6 hadden.
            Daarmee vertelde de site Google dat 32 vrijwel identieke
            stadpagina's het belangrijkst waren — en 19 ervan stonden alsnog
            niet in de index. De provincies en /werkgebied zijn nu de hub; die
            linken door naar de steden, zodat elke stadpagina bereikbaar
            blijft zonder dat elke pagina 32 keer hetzelfde signaal afgeeft. */}
        <div className="mt-12 grid gap-8 border-t border-white/10 pt-8 sm:grid-cols-2">
          <nav aria-labelledby="voet-provincies">
            <h2 id="voet-provincies" className={kop}>
              Ons werkgebied
            </h2>
            <ul className="mt-2 flex flex-wrap gap-x-5">
              {provincies.map((p) => (
                <li key={p.slug}>
                  <Link href={`/werkgebied/${p.slug}`} className={rij}>
                    Tv monteur {p.naam}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="voet-kennisbank">
            <h2 id="voet-kennisbank" className={kop}>
              Kennisbank
            </h2>
            <ul className="mt-2 flex flex-wrap gap-x-5">
              {artikelen.map((a) => (
                <li key={a.slug}>
                  <Link href={`/kennisbank/${a.slug}`} className={rij}>
                    {a.titel}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/kennisbank" className={`${rij} font-semibold`}>
                  Alle artikelen
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-8 text-2xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name} · KvK {SITE.kvk} · Btw{" "}
            {SITE.btw}
          </p>
          <p>Alle prijzen inclusief btw en voorrijkosten</p>
        </div>
      </div>
    </footer>
  );
}
