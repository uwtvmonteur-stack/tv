import Link from "next/link";
import { IconMapPin, IconShield } from "./icons";
import { LogoGlyph } from "./Logo";
import { SITE } from "@/lib/site";
import { diensten, dienstHref } from "@/lib/content";
import { provincies, steden } from "@/lib/steden";

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

        <div className="mt-14 border-t border-white/10 pt-8">
          <h3 className="text-[11px] font-semibold tracking-[0.16em] text-white/50 uppercase">
            Steden in ons werkgebied
          </h3>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {steden.map((stad) => (
              <li key={stad.slug}>
                <Link
                  href={`/tv-monteur/${stad.slug}`}
                  className="text-white/55 transition-colors duration-300 ease-fluid hover:text-white"
                >
                  Tv monteur {stad.naam}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/50 md:flex-row md:items-center">
          <span>
            © {new Date().getFullYear()} {SITE.name}
            {SITE.kvk ? ` · KvK ${SITE.kvk}` : ""}
          </span>
          <span>Alle prijzen inclusief btw en voorrijkosten</span>
        </div>
      </div>
    </footer>
  );
}
