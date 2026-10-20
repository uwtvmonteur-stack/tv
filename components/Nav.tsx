"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IconArrowUpRight } from "./icons";
import LogoMark from "./Logo";
import { Button } from "./ui";

/**
 * "Diensten" stond hier en /tv-ophangen niet — terwijl dat de pagina is waar
 * het advertentiegeld landt en waar de omzet vandaan komt. Een overzichtshub
 * met vier kaartjes kreeg dus de navigatiewaarde die de geldpagina hoort te
 * krijgen. De overige diensten blijven bereikbaar via /tv-ophangen en de
 * voettekst.
 */
const links = [
  { href: "/tv-ophangen", label: "Tv ophangen" },
  { href: "/prijzen", label: "Prijzen" },
  { href: "/werkgebied", label: "Werkgebied" },
  { href: "/kennisbank", label: "Kennisbank" },
  { href: "/over-ons", label: "Over ons" },
  { href: "/contact", label: "Contact" },
];

/**
 * Staat er een afspraakformulier op deze pagina? Dan moet de knop in de balk
 * ernaartoe scrollen in plaats van de bezoeker te verhuizen naar /contact.
 *
 * Dat was de duurste fout in de oude balk: op /prijzen — de pagina waar
 * bezoekers het langst blijven — stuurde de meest opvallende knop van het
 * scherm ze wég van het formulier dat 300 pixels lager stond, inclusief het
 * tv-formaat dat ze net hadden aangeklikt.
 */
const ZONDER_FORMULIER = new Set([
  "/diensten",
  "/over-ons",
  "/werkgebied",
  "/kennisbank",
  "/privacy",
]);

/**
 * Een vaste regel op basis van het pad, en bewust geen zoekopdracht in de DOM
 * binnen een effect: dat laatste zet de knop pas goed ná de eerste tekening,
 * zodat iemand die meteen klikt alsnog naar /contact vertrekt. Zo klopt de
 * link al in de HTML die van de server komt.
 *
 * Alle pagina's met koopintentie dragen sinds deze herbouw zelf een
 * formulier; alleen de overzichts- en informatiepagina's hierboven niet.
 * Komt er een pagina bij zonder formulier, zet hem dan in deze lijst.
 */
function afspraakHref(pathname: string) {
  if (ZONDER_FORMULIER.has(pathname) || pathname.startsWith("/kennisbank/")) {
    return "/contact";
  }
  return "#afspraak";
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const href = afspraakHref(usePathname());
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    // Achtergrond onbereikbaar maken voor toetsenbord en schermlezer zolang
    // het menu openstaat.
    const main = document.getElementById("hoofdinhoud");
    const footer = document.querySelector("footer");
    main?.toggleAttribute("inert", open);
    footer?.toggleAttribute("inert", open);

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
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 md:pt-5">
        <nav
          aria-label="Hoofdnavigatie"
          // Rechte hoeken in plaats van een zwevende pil: een balk die als
          // document leest in plaats van als app-widget.
          className="pointer-events-auto flex w-full max-w-content items-center justify-between gap-2 rounded-md border border-hairline bg-paper/92 py-2 pr-2 pl-3 shadow-e2 backdrop-blur-md"
        >
          <Link
            href="/"
            inert={open || undefined}
            className="flex shrink-0 items-center gap-2.5 pr-2"
            onClick={() => setOpen(false)}
          >
            <LogoMark className="h-9 w-9" />
            <span className="font-display text-base font-semibold whitespace-nowrap">
              Uw TV Monteur
            </span>
          </Link>

          <div className="hidden items-center lg:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xs px-3 py-2 text-sm font-medium whitespace-nowrap text-fg-muted transition-colors duration-200 ease-out hover:text-fg"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {/* Eén actie in de balk: de afspraak. Het telefoonnummer staat
                alleen in de voettekst, zodat niets de afspraakknop beconcurreert. */}
            <Link
              href={href}
              inert={open || undefined}
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-sm bg-accent px-4 text-sm font-semibold whitespace-nowrap text-white shadow-e1 transition-colors duration-200 ease-out hover:bg-accent-hover"
            >
              <span className="hidden sm:inline">Afspraak maken</span>
              <span className="sm:hidden">Afspraak</span>
              <IconArrowUpRight className="hidden h-4 w-4 sm:block" />
            </Link>
            <button
              ref={hamburgerRef}
              type="button"
              aria-label={open ? "Menu sluiten" : "Menu openen"}
              aria-expanded={open}
              aria-controls="mobiel-menu"
              onClick={() => setOpen(!open)}
              className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-sm border border-control lg:hidden"
            >
              <span
                className={`h-[1.5px] w-4 bg-fg transition-transform duration-200 ease-out ${
                  open ? "translate-y-[3.25px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-[1.5px] w-4 bg-fg transition-transform duration-200 ease-out ${
                  open ? "-translate-y-[3.25px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobiel menu over het volledige scherm */}
      <div
        ref={menuRef}
        id="mobiel-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
        className={`fixed inset-0 z-40 flex flex-col justify-between bg-paper px-gutter pt-28 pb-10 transition-opacity duration-200 ease-out lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav aria-label="Mobiel menu" className="flex flex-col">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              // Geen gestapelde vertragingen meer: het oude menu bouwde zich
              // in 400 ms op terwijl de bezoeker al wist waar hij heen wilde.
              className="border-b border-hairline py-4 font-display text-h3 font-semibold"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-8">
          <Button
            href={href}
            maat="lg"
            breed
            onClick={() => setOpen(false)}
          >
            Afspraak maken
            <IconArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
}
