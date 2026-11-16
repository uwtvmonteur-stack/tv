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
   gewone link: elders zou een belknop concurreren met de afspraakaanvraag.

   Opnieuw opgebouwd. De oude voettekst was één raster van vijf kolommen
   waarin het bedrijf, de diensten, het werkgebied en de contactgegevens
   allemaal even zwaar wogen. Nu staat bovenaan wie wij zijn en hoe u ons
   bereikt, en daaronder — onder een haarlijn, in kleinere letter — de weg
   naar alles wat de site verder heeft. Dat is de volgorde waarin iemand een
   voettekst gebruikt.

   Elke link is een rij van minimaal 44 px (`min-h-11`). In de oudste versie
   waren de aanraakrijen 20 tot 32 px hoog — op een telefoon raakte je daar
   structureel de verkeerde link, en dat is geen smaakkwestie maar een fout.
   ========================================================================= */

const rij =
  "inline-flex min-h-11 items-center gap-2 text-sm text-ink-300 transition-colors duration-200 hover:text-white";

/**
 * De specialistische pagina's staan náást `diensten` en niet erin: ze horen
 * in de voettekst en in de sitemap, maar ze mogen het dienstenoverzicht en
 * de dienstenlijst op de homepage niet uit balans trekken.
 */
const extraPaginas = [
  { href: "/kabels-wegwerken", label: "Kabels wegwerken" },
  { href: "/tv-boven-open-haard", label: "Tv boven de open haard" },
  { href: "/tv-ophangen-gipswand", label: "Ophangen aan een gipswand" },
  { href: "/tv-geen-geluid", label: "Geen geluid op de tv" },
  { href: "/tv-geen-wifi", label: "Tv zonder wifi of internet" },
  { href: "/prijzen", label: "Prijzen" },
];

export default function Footer() {
  return (
    // De extra onderruimte op mobiel is voor StickyBar: die balk staat vast
    // onderaan en zou anders de laatste regels van de voettekst afdekken.
    <footer className="op-donker relative isolate overflow-hidden bg-ink-950 pb-20 text-ink-300 lg:pb-0">
      <div aria-hidden="true" className="raster absolute inset-0" />
      <div aria-hidden="true" className="gloed -left-32 -top-32 size-[26rem] opacity-70" />
      <div className="kader relative py-14 lg:py-20">
        {/* ---- Wie wij zijn, en hoe u ons bereikt ------------------------ */}
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div>
            <Logo dark />
            <p className="mt-6 max-w-xl text-lead text-ink-300">
              Uw tv monteur aan huis. Tv ophangen, kabels wegwerken, soundbar
              installeren en een complete tv-installatie — vakkundig, netjes en
              verzekerd, met het bedrag vooraf.
            </p>
            <ul className="mt-7 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <Icon name="shield" className="size-5 shrink-0 text-amber-300" />
                Eigen verzekerde monteurs
              </li>
              <li className="flex items-center gap-2.5">
                <Icon
                  name="map-pin"
                  className="size-5 shrink-0 text-amber-300"
                />
                {provincies.length} provincies, {steden.length} steden
              </li>
              <li className="flex items-center gap-2.5">
                <Icon name="clock" className="size-5 shrink-0 text-amber-300" />
                Zeven dagen per week
              </li>
            </ul>
          </div>

          <div className="border-t border-white/15 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <p className="bovenkop-donker">Contact</p>
            {/* Het nummer als gewone link en niet als knop. Dat is een
                besluit van de eigenaar en geldt voor de hele site. */}
            <a
              href={`tel:${SITE.phone}`}
              // `flex w-fit` en niet `inline-flex`: de bovenkop erboven is
              // sinds de huisstijl een pil (`inline-flex`), en een inline
              // element eronder ging naast die pil op dezelfde regel staan.
              className="mt-3 flex min-h-11 w-fit items-center gap-2.5 font-display text-h3 font-extrabold text-white underline decoration-amber-400 decoration-2 underline-offset-4 hover:decoration-amber-300"
            >
              {SITE.phoneDisplay}
            </a>
            <ul className="mt-2">
              <li>
                <a href={`mailto:${SITE.email}`} className={rij}>
                  <Icon name="mail" className="size-4 text-amber-300" />
                  {SITE.email}
                </a>
              </li>
              {SITE.whatsapp && (
                <li>
                  <a href={SITE.whatsapp} className={rij}>
                    <Icon name="whatsapp" className="size-4 text-amber-300" />
                    WhatsApp
                  </a>
                </li>
              )}
              <li>
                <Link href="/contact" className={rij}>
                  <Icon name="chat" className="size-4 text-amber-300" />
                  Afspraak maken
                </Link>
              </li>
            </ul>
            {/* Dezelfde tijden als in `openingHoursSpecification` in
                app/layout.tsx en in de bovenbalk van Header. */}
            <div className="mt-4 border-t border-white/15 pt-4 text-sm text-ink-400">
              {SITE.openingstijden.lang.map((regel) => (
                <p key={regel}>{regel}</p>
              ))}
            </div>
          </div>
        </div>

        {/* ---- De weg naar de rest van de site ---------------------------
            Hub-and-spoke in plaats van 32 stadlinks op elke pagina.
            Gemeten: elke stadpagina kreeg 57 interne links en /privacy
            (noindex) er 54, terwijl de kennisbankartikelen er 2 tot 6 hadden.
            Daarmee vertelde de site Google dat 32 vrijwel identieke
            stadpagina's het belangrijkst waren — en 19 ervan stonden alsnog
            niet in de index. De provincies en /werkgebied zijn nu de hub; die
            linken door naar de steden, zodat elke stadpagina bereikbaar
            blijft zonder dat elke pagina 32 keer hetzelfde signaal afgeeft. */}
        <div className="mt-14 grid gap-10 border-t border-white/15 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <nav aria-labelledby="voet-diensten">
            <p id="voet-diensten" className="bovenkop-donker">
              Diensten
            </p>
            <ul className="mt-2">
              {diensten.map((d) => (
                <li key={d.slug}>
                  <Link href={dienstHref(d)} className={rij}>
                    {d.naam}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="voet-specialisme">
            <p id="voet-specialisme" className="bovenkop-donker">
              Specifieke klussen
            </p>
            <ul className="mt-2">
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
            <p id="voet-werkgebied" className="bovenkop-donker">
              Werkgebied
            </p>
            <ul className="mt-2">
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

          <nav aria-labelledby="voet-kennisbank">
            <p id="voet-kennisbank" className="bovenkop-donker">
              Kennisbank
            </p>
            <ul className="mt-2">
              {artikelen.map((a) => (
                <li key={a.slug}>
                  <Link href={`/kennisbank/${a.slug}`} className={rij}>
                    {a.titel}
                  </Link>
                </li>
              ))}
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
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/15 pt-7 text-2xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
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
