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
   er ruimte voor.

   Opnieuw vormgegeven volgens het nieuwe systeem: de actieve pagina krijgt
   een amberen streep onder de link in plaats van een grijze pil. Een pil is
   een vakje in een ontwerp dat geen vakjes meer heeft, en de streep leest
   bovendien beter — hij hoort bij de tekst, hij ligt er niet achter.

   Het telefoonnummer staat hier bewust niet — niet als knop en niet als
   link. Eén actie per scherm: de afspraakaanvraag. Het nummer staat alleen in
   de voettekst.
   ========================================================================= */

/**
 * "Diensten" stond in de oude balk en /tv-ophangen niet — terwijl dat de
 * pagina is waar het advertentiegeld landt en waar de omzet vandaan komt.
 * Diensten is daarom het megamenu (vanaf `lg`); daaronder blijven ze
 * bereikbaar via het mobiele menu en de voettekst.
 *
 * `pasVanafXl` houdt een link onder 1280px uit de balk. Nodig omdat het
 * dienstenmenu al vanaf `lg` meedoet: de hamburger verdwijnt op 1024px, en
 * zonder deze uitwijk wordt de balk daar breder dan er ruimte is.
 */
const links: { href: string; label: string; pasVanafXl?: boolean }[] = [
  { href: "/tv-ophangen", label: "Tv ophangen" },
  { href: "/prijzen", label: "Prijzen" },
  { href: "/werkgebied", label: "Werkgebied" },
  { href: "/kennisbank", label: "Kennisbank", pasVanafXl: true },
  { href: "/over-ons", label: "Over ons", pasVanafXl: true },
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
 * Staat er een afspraakformulier op deze pagina? Dan moet de knop in de balk
 * ernaartoe scrollen in plaats van de bezoeker te verhuizen naar /contact.
 *
 * Dat was de duurste fout in de oude balk: op /prijzen — de pagina waar
 * bezoekers het langst blijven — stuurde de meest opvallende knop van het
 * scherm ze wég van het formulier dat 300 pixels lager stond.
 */
const MET_FORMULIER = new Set([
  "/",
  "/contact",
  "/prijzen",
  "/tv-ophangen",
  "/tv-ophangen-gipswand",
  "/tv-boven-open-haard",
  "/kabels-wegwerken",
  "/tv-geen-geluid",
  "/tv-geen-wifi",
]);

/**
 * Een vaste regel op basis van het pad, en bewust geen zoekopdracht in de
 * DOM binnen een effect: dat laatste zet de knop pas goed ná de eerste
 * tekening, zodat iemand die meteen klikt alsnog naar /contact vertrekt. Zo
 * klopt de link al in de HTML die van de server komt.
 *
 * De lijst noemt de pagina's die een formulier dragen, en niet andersom.
 * Dat is bewust omgekeerd: hiervoor stond hier een lijst pagina's *zonder*
 * formulier, en alles wat daar niet in stond kreeg `#afspraak`. Daardoor wees
 * op de 404-pagina — die geen formulier heeft en in geen enkele lijst stond —
 * zowel de knop in de koptekst als de zwevende balk naar een anker dat daar
 * niet bestaat. Wie uit een oude advertentie of bladwijzer kwam, klikte op de
 * enige gekleurde knop van het scherm en er gebeurde niets.
 *
 * Met een lijst van pagina's mét formulier valt elk onbekend pad vanzelf
 * terug op /contact. Een nieuwe pagina die vergeten wordt, verliest dan
 * hooguit het soepele scrollen — hij wordt nooit een doodlopende knop.
 * `scripts/check-ontwerp.mjs` controleert na een build dat elke pagina die
 * naar `#afspraak` wijst dat anker ook werkelijk heeft.
 *
 * StickyBar leest dezelfde functie, zodat balk en knop nooit naar
 * verschillende plekken wijzen.
 */
export function afspraakHref(pathname: string) {
  const heeftFormulier =
    MET_FORMULIER.has(pathname) ||
    // De drie dienstpagina's, de 32 stadpagina's en de vier
    // provinciepagina's dragen het formulier allemaal; de overzichten
    // /diensten en /werkgebied niet, en /kennisbank-artikelen evenmin.
    /^\/diensten\/[^/]+$/.test(pathname) ||
    /^\/tv-ophangen\/[^/]+$/.test(pathname) ||
    /^\/werkgebied\/[^/]+$/.test(pathname);
  return heeftFormulier ? "#afspraak" : "/contact";
}

export default function Header() {
  const pathname = usePathname();
  const href = afspraakHref(pathname);
  // Zelfde regel als bij de losse menu-items: de pagina zelf of iets eronder.
  const dienstenActief =
    pathname === "/diensten" || pathname.startsWith("/diensten/");
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
    const balk = document.getElementById("afspraak-balk");
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

    // Sluit het menu zodra het scherm breed genoeg wordt voor de gewone
    // navigatie. Zonder dit bleef `open` waar staan als iemand het menu op
    // een tablet opende en die daarna kantelde: het menu zelf is `lg:hidden`
    // en verdween dus uit beeld, terwijl main, footer en de onderbalk `inert`
    // bleven en de pagina niet meer scrolde. De bezoeker zag een normale
    // pagina die nergens meer op reageerde.
    const breed = window.matchMedia("(min-width: 64rem)");
    function onBreedte(e: MediaQueryListEvent) {
      if (e.matches) setOpen(false);
    }
    if (open) breed.addEventListener("change", onBreedte);

    return () => {
      document.body.style.overflow = "";
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      balk?.removeAttribute("inert");
      document.removeEventListener("keydown", onKeyDown);
      breed.removeEventListener("change", onBreedte);
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-ink-100 bg-white/92 backdrop-blur-md">
        {/* De feitenstrook. Donker, als het bordje boven een winkelpui: het
            geeft de hele site bovenaan een rand en zet de warme pagina
            daaronder af tegen iets vasts. */}
        <div className="op-donker hidden bg-ink-950 lg:block">
          <ul className="kader flex h-10 items-center gap-7 whitespace-nowrap text-2xs text-ink-200">
            {feiten.map((f) => (
              <li
                key={f.tekst}
                className={`flex items-center gap-2 ${f.className ?? ""}`}
              >
                <Icon name={f.icon} className="size-4 text-amber-300" />
                {f.tekst}
              </li>
            ))}
          </ul>
        </div>

        {/* `gap-2` onder `sm`: op 390 pixels kwam de merknaam 13 pixels tekort
            en kapte `truncate` hem af tot "Uw TV Mon…". Dat komt doordat de
            wortelmaat 18px is — `size-11` is hier 49,5 pixels en niet 44 —
            waardoor de hele balk 12,5% ruimer opbouwt dan de klassenamen
            suggereren. De ruimte komt uit de tussenruimtes en de knopopvulling
            hieronder; `truncate` blijft staan als vangnet voor 360 pixels. */}
        <div className="kader flex h-18 items-center justify-between gap-2 sm:gap-3 lg:h-20">
          <Link
            href="/"
            inert={open || undefined}
            className="min-w-0 rounded-lg"
            onClick={() => setOpen(false)}
          >
            <Logo />
          </Link>

          <nav aria-label="Hoofdnavigatie" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {/* Megamenu zonder JavaScript: `group-hover` voor de muis,
                  `group-focus-within` voor het toetsenbord. Vanaf `lg`, dus
                  precies waar de hamburger verdwijnt. */}
              <li className="group relative hidden lg:block">
                {/* Dezelfde actieve staat als de losse menu-items hieronder.
                    Die stond hier niet: op /diensten en de drie dienst-
                    pagina's wees het menu dus niets aan, terwijl het dat op
                    elke andere pagina wel doet. Vier van de tien pagina's in
                    het menu, en juist de vier waar de bezoeker het diepst
                    zit. */}
                <Link
                  href="/diensten"
                  aria-current={dienstenActief ? "page" : undefined}
                  className={`flex items-center gap-1 border-b-2 px-1.5 py-2 text-sm font-semibold hover:text-ink-950 2xl:px-2.5 2xl:text-base ${
                    dienstenActief
                      ? "border-amber-600 text-ink-950"
                      : "border-transparent text-ink-700 hover:border-ink-200"
                  }`}
                >
                  Diensten
                  <Icon
                    name="chevron-down"
                    className="size-4 transition group-hover:rotate-180"
                  />
                </Link>
                <div className="invisible absolute left-1/2 top-full z-50 w-168 -translate-x-1/2 pt-4 opacity-0 transition duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  {/* Regels onder een haarlijn, net als de dienstenlijst op de
                      pagina's zelf. Hiervoor stonden hier icoontegels in een
                      raster van twee bij twee — een derde manier om dezelfde
                      vier diensten te tonen. */}
                  <div className="rounded-2xl bg-white p-2.5 shadow-lift ring-1 ring-ink-100">
                    <ul>
                      {diensten.map((d) => (
                        <li key={d.slug}>
                          <Link
                            href={dienstHref(d)}
                            className="flex items-center gap-3.5 rounded-lg px-3 py-3 hover:bg-surface"
                          >
                            <DienstIcon
                              slug={d.slug}
                              className="size-5 shrink-0 text-amber-700"
                            />
                            <span className="min-w-0">
                              <span className="block font-display font-semibold text-ink-950">
                                {d.naam}
                              </span>
                              <span className="mt-0.5 block text-sm text-ink-600">
                                {d.kort}
                              </span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/diensten"
                      className="mt-1 flex min-h-11 items-center justify-center gap-2 rounded-lg border-t border-ink-200 font-semibold text-amber-800 hover:bg-surface"
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
                  <li
                    key={link.href}
                    className={link.pasVanafXl ? "hidden xl:block" : undefined}
                  >
                    <Link
                      href={link.href}
                      aria-current={actief ? "page" : undefined}
                      className={`block whitespace-nowrap border-b-2 px-1.5 py-2 text-sm font-semibold hover:text-ink-950 2xl:px-2.5 2xl:text-base ${
                        // amber-600 en niet amber-500: deze streep is het
                        // enige dat zegt op welke pagina u staat, en dan is
                        // het een vorm die informatie draagt (WCAG 1.4.11,
                        // 3:1). amber-500 haalt op wit 2,41:1, amber-600
                        // 3,40:1. De hover is ink-200, de haarlijnkleur van
                        // het ontwerpsysteem; ink-300 hoort er niet bij.
                        actief
                          ? "border-amber-600 text-ink-950"
                          : "border-transparent text-ink-700 hover:border-ink-200"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
            <Link
              href={href}
              inert={open || undefined}
              className="knop-vol whitespace-nowrap px-2.5 sm:px-6"
            >
              <span className="hidden sm:inline">Afspraak maken</span>
              <span className="sm:hidden">Afspraak</span>
            </Link>
            <button
              ref={hamburgerRef}
              type="button"
              aria-label={open ? "Menu sluiten" : "Menu openen"}
              aria-expanded={open}
              aria-controls="mobiel-menu"
              aria-haspopup="dialog"
              onClick={() => setOpen(!open)}
              className="grid size-11 cursor-pointer place-items-center rounded-lg border border-ink-500 text-ink-900 hover:bg-ink-50 sm:size-12 lg:hidden"
            >
              <span className="flex flex-col gap-1.5" aria-hidden="true">
                <span className="block h-0.5 w-5 bg-current" />
                <span className="block h-0.5 w-5 bg-current" />
                <span className="block h-0.5 w-5 bg-current" />
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
        <div className="flex h-18 shrink-0 items-center justify-between gap-3 border-b border-ink-200 px-5">
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
            className="grid size-12 shrink-0 cursor-pointer place-items-center rounded-lg border border-ink-500 text-ink-900 hover:bg-ink-50"
          >
            {/* De icoonset heeft geen kruis: een plus van 45 graden is
                hetzelfde pad en houdt het binnen de bibliotheek. */}
            <Icon name="plus" className="size-6 rotate-45" strokeWidth={2} />
          </button>
        </div>

        <nav aria-label="Mobiel menu" className="flex-1 overflow-y-auto px-5 py-5">
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  // Geen gestapelde vertragingen: het oude menu bouwde zich in
                  // 400 ms op terwijl de bezoeker al wist waar hij heen wilde.
                  className="flex min-h-14 items-center justify-between gap-3 border-b border-ink-200 font-display text-h3 font-semibold text-ink-950"
                >
                  {link.label}
                  <Icon name="arrow-right" className="size-5 text-ink-400" />
                </Link>
              </li>
            ))}
          </ul>

          <p className="bovenkop mt-8">Diensten</p>
          <ul className="mt-2.5 grid gap-0.5 sm:grid-cols-2">
            {diensten.map((d) => (
              <li key={d.slug}>
                <Link
                  href={dienstHref(d)}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center gap-3 rounded-lg px-2 font-semibold text-ink-900 hover:bg-surface"
                >
                  <DienstIcon slug={d.slug} className="size-5 text-amber-700" />
                  {d.naam}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="shrink-0 border-t border-ink-200 p-5">
          <Link
            href={href}
            onClick={() => setOpen(false)}
            className="knop-vol knop-groot w-full"
          >
            Afspraak maken
            <Icon name="arrow-right" className="size-5" />
          </Link>
        </div>
      </div>
    </>
  );
}
