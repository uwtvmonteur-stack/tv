"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { DienstIcon, Icon, type IconName } from "./Icon";
import { Logo } from "./Logo";
import { diensten, dienstHref } from "@/lib/content";
import { SITE } from "@/lib/site";
import { provincies } from "@/lib/steden";

/* =========================================================================
   Koptekstbalk
   =========================================================================
   Loopt mee in de stroom (`sticky top-0`), dus geen enkele pagina reserveert
   er ruimte voor. Hoogte: 4,5rem op mobiel; op `lg` en groter 2,5rem
   donkere bovenbalk plus 5rem.

   Het telefoonnummer staat hier bewust niet — niet als knop en niet als
   link. Eén actie per scherm: de offerteaanvraag. Het nummer staat alleen in
   de voettekst.
   ========================================================================= */

/**
 * "Diensten" stond in de oude balk en /tv-ophangen niet — terwijl dat de
 * pagina is waar het advertentiegeld landt en waar de omzet vandaan komt.
 * Een overzichtshub met vier kaartjes kreeg zo de navigatiewaarde die de
 * geldpagina hoort te krijgen. Diensten is nu het megamenu (vanaf `xl`);
 * daaronder blijven ze bereikbaar via het mobiele menu en de voettekst.
 */
const links = [
  { href: "/tv-ophangen", label: "Tv ophangen" },
  { href: "/prijzen", label: "Prijzen" },
  { href: "/werkgebied", label: "Werkgebied" },
  { href: "/kennisbank", label: "Kennisbank" },
  { href: "/over-ons", label: "Over ons" },
  { href: "/contact", label: "Contact" },
];

/** "Zuid-Holland, Noord-Holland, Utrecht en Noord-Brabant", uit lib/steden. */
const werkgebied = provincies
  .map((p) => p.naam)
  .reduce((tekst, naam, i, alle) =>
    i === alle.length - 1 ? `${tekst} en ${naam}` : `${tekst}, ${naam}`,
  );

/**
 * De bovenbalk draagt geen marketing maar drie feiten die een bezoeker
 * anders moet opzoeken. De openingstijden komen uit `SITE.openingstijden`,
 * net als het schema in app/layout.tsx, de voettekst en de contactpagina —
 * één bron, zodat ze niet uit elkaar kunnen lopen.
 */
const feiten: { icon: IconName; tekst: string; className?: string }[] = [
  { icon: "clock", tekst: SITE.openingstijden.kort },
  { icon: "euro", tekst: "Inclusief voorrijkosten en btw" },
  { icon: "map", tekst: werkgebied, className: "hidden xl:flex" },
];

/**
 * Staat er een offerteformulier op deze pagina? Dan moet de knop in de balk
 * ernaartoe scrollen in plaats van de bezoeker te verhuizen naar /contact.
 *
 * Dat was de duurste fout in de oude balk: op /prijzen — de pagina waar
 * bezoekers het langst blijven — stuurde de meest opvallende knop van het
 * scherm ze wég van het formulier dat 300 pixels lager stond.
 */
const ZONDER_FORMULIER = new Set([
  "/diensten",
  "/over-ons",
  "/werkgebied",
  "/kennisbank",
  "/privacy",
]);

/**
 * Een vaste regel op basis van het pad, en bewust geen zoekopdracht in de
 * DOM binnen een effect: dat laatste zet de knop pas goed ná de eerste
 * tekening, zodat iemand die meteen klikt alsnog naar /contact vertrekt. Zo
 * klopt de link al in de HTML die van de server komt.
 *
 * Alle commerciële pagina's dragen sinds deze herbouw zelf een formulier;
 * alleen de overzichts- en informatiepagina's hierboven niet. Komt er een
 * pagina bij zonder formulier, zet hem dan in deze lijst. StickyBar leest
 * dezelfde functie, zodat balk en knop nooit naar verschillende plekken
 * wijzen.
 */
export function afspraakHref(pathname: string) {
  if (ZONDER_FORMULIER.has(pathname) || pathname.startsWith("/kennisbank/")) {
    return "/contact";
  }
  return "#offerte";
}

export default function Header() {
  const pathname = usePathname();
  const href = afspraakHref(pathname);
  const [open, setOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    // Achtergrond onbereikbaar maken voor toetsenbord en schermlezer zolang
    // het menu openstaat. De vaste onderbalk hoort daarbij: die staat buiten
    // main en footer en zou anders in de tabvolgorde van het menu blijven.
    const main = document.getElementById("hoofdinhoud");
    const footer = document.querySelector("footer");
    const balk = document.getElementById("offerte-balk");
    main?.toggleAttribute("inert", open);
    footer?.toggleAttribute("inert", open);
    balk?.toggleAttribute("inert", open);

    if (open) menuRef.current?.querySelector<HTMLElement>("a")?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        hamburgerRef.current?.focus();
      }
    }
    if (open) document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      balk?.removeAttribute("inert");
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-ink-100 bg-white/90 backdrop-blur-md">
        <div className="hidden bg-ink-950 lg:block">
          <ul className="container-x flex h-10 items-center gap-6 whitespace-nowrap text-2xs text-ink-300">
            {feiten.map((f) => (
              <li
                key={f.tekst}
                className={`flex items-center gap-2 ${f.className ?? ""}`}
              >
                <Icon name={f.icon} className="size-4 text-accent-300" />
                {f.tekst}
              </li>
            ))}
          </ul>
        </div>

        <div className="container-x flex h-18 items-center justify-between gap-3 lg:h-20">
          <Link
            href="/"
            inert={open || undefined}
            className="min-w-0 rounded-xl"
            onClick={() => setOpen(false)}
          >
            <Logo />
          </Link>

          <nav aria-label="Hoofdnavigatie" className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {/* Megamenu zonder JavaScript: `group-hover` voor de muis,
                  `group-focus-within` voor het toetsenbord. Pas vanaf `xl`,
                  omdat er daaronder geen ruimte is naast de zes links. */}
              <li className="group relative hidden xl:block">
                <Link
                  href="/diensten"
                  className="flex items-center gap-1 rounded-lg px-2.5 py-2 text-sm font-semibold text-ink-700 hover:bg-ink-50 hover:text-ink-950 2xl:px-3 2xl:text-base"
                >
                  Diensten
                  <Icon
                    name="chevron-down"
                    className="size-4 transition group-hover:rotate-180"
                  />
                </Link>
                <div className="invisible absolute left-1/2 top-full z-50 w-184 -translate-x-1/2 pt-3 opacity-0 transition duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <div className="grid grid-cols-2 gap-1 rounded-2xl bg-white p-3 shadow-lift ring-1 ring-ink-200">
                    {diensten.map((d) => (
                      <Link
                        key={d.slug}
                        href={dienstHref(d)}
                        className="flex items-start gap-3 rounded-xl p-3 hover:bg-accent-50"
                      >
                        <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-accent-50 text-accent-700 ring-1 ring-accent-200">
                          <DienstIcon slug={d.slug} className="size-5" />
                        </span>
                        <span>
                          <span className="block font-display font-bold text-ink-950">
                            {d.naam}
                          </span>
                          <span className="mt-1 block text-sm text-ink-600">
                            {d.kort}
                          </span>
                        </span>
                      </Link>
                    ))}
                    <Link
                      href="/diensten"
                      className="col-span-2 mt-1 flex min-h-11 items-center justify-center gap-2 rounded-xl bg-ink-50 font-semibold text-ink-900 hover:bg-ink-100"
                    >
                      Alle diensten bekijken
                      <Icon name="arrow-right" className="size-4" />
                    </Link>
                  </div>
                </div>
              </li>

              {links.map((link) => {
                const actief =
                  pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={actief ? "page" : undefined}
                      className={`block whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-semibold hover:bg-ink-50 hover:text-ink-950 2xl:px-3 2xl:text-base ${
                        actief ? "bg-ink-50 text-ink-950" : "text-ink-700"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              href={href}
              inert={open || undefined}
              className="btn-primary whitespace-nowrap px-4 sm:px-6"
            >
              <span className="hidden sm:inline">Offerte aanvragen</span>
              <span className="sm:hidden">Offerte</span>
            </Link>
            <button
              ref={hamburgerRef}
              type="button"
              aria-label={open ? "Menu sluiten" : "Menu openen"}
              aria-expanded={open}
              aria-controls="mobiel-menu"
              aria-haspopup="dialog"
              onClick={() => setOpen(!open)}
              className="grid size-12 cursor-pointer place-items-center rounded-xl text-ink-900 ring-1 ring-ink-300 hover:bg-ink-50 lg:hidden"
            >
              <span className="flex flex-col gap-1.5" aria-hidden="true">
                <span className="block h-0.5 w-5 rounded-full bg-current" />
                <span className="block h-0.5 w-5 rounded-full bg-current" />
                <span className="block h-0.5 w-5 rounded-full bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobiel menu over het volledige scherm */}
      <div
        ref={menuRef}
        id="mobiel-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
        className={`fixed inset-0 z-50 flex flex-col bg-white transition-opacity duration-200 ease-out lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-18 shrink-0 items-center justify-between gap-3 border-b border-ink-100 px-4">
          <Link href="/" onClick={() => setOpen(false)} className="min-w-0">
            <Logo />
          </Link>
          <button
            type="button"
            aria-label="Menu sluiten"
            onClick={() => {
              setOpen(false);
              hamburgerRef.current?.focus();
            }}
            className="grid size-12 shrink-0 cursor-pointer place-items-center rounded-xl text-ink-900 ring-1 ring-ink-300 hover:bg-ink-50"
          >
            {/* De icoonset heeft geen kruis: een plus van 45 graden is
                hetzelfde pad en houdt het binnen de bibliotheek. */}
            <Icon name="plus" className="size-6 rotate-45" strokeWidth={2} />
          </button>
        </div>

        <nav aria-label="Mobiel menu" className="flex-1 overflow-y-auto px-4 py-4">
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  // Geen gestapelde vertragingen meer: het oude menu bouwde
                  // zich in 400 ms op terwijl de bezoeker al wist waar hij
                  // heen wilde.
                  className="flex min-h-14 items-center justify-between gap-3 border-b border-ink-100 font-display text-h3 font-bold text-ink-950"
                >
                  {link.label}
                  <Icon name="arrow-right" className="size-5 text-ink-400" />
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-7 text-2xs font-bold uppercase tracking-widest text-ink-500">
            Diensten
          </p>
          <ul className="mt-2 grid gap-1 sm:grid-cols-2">
            {diensten.map((d) => (
              <li key={d.slug}>
                <Link
                  href={dienstHref(d)}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center gap-3 rounded-xl px-2 font-semibold text-ink-900 hover:bg-accent-50"
                >
                  <DienstIcon slug={d.slug} className="size-5 text-accent-700" />
                  {d.naam}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="shrink-0 border-t border-ink-100 p-4">
          <Link
            href={href}
            onClick={() => setOpen(false)}
            className="btn-primary btn-lg w-full"
          >
            Offerte aanvragen
            <Icon name="arrow-right" className="size-5" />
          </Link>
        </div>
      </div>
    </>
  );
}
