"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IconArrowUpRight, IconPhone } from "./icons";
import LogoMark from "./Logo";
import { SITE } from "@/lib/site";

const links = [
  { href: "/diensten", label: "Diensten" },
  { href: "/prijzen", label: "Prijzen" },
  { href: "/werkgebied", label: "Werkgebied" },
  { href: "/over-ons", label: "Over ons" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    // Achtergrond onbereikbaar maken voor toetsenbord/schermlezer als het menu open is
    const main = document.getElementById("hoofdinhoud");
    const footer = document.querySelector("footer");
    main?.toggleAttribute("inert", open);
    footer?.toggleAttribute("inert", open);

    // Focus het menu in zodra het opent (ARIA-dialoogpatroon).
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
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-6">
        <nav
          aria-label="Hoofdnavigatie"
          className="pointer-events-auto flex w-full max-w-3xl items-center justify-between gap-1 rounded-full bg-cream/90 py-1.5 pr-1.5 pl-2 shadow-[0_16px_50px_-16px_rgba(25,21,18,0.3)] ring-1 ring-ink/10 backdrop-blur-md lg:w-auto lg:max-w-none lg:justify-start lg:gap-2"
        >
          <Link
            href="/"
            inert={open || undefined}
            className="flex shrink-0 items-center gap-2.5 pr-2"
            onClick={() => setOpen(false)}
          >
            <LogoMark className="h-9 w-9" />
            <span className="font-display text-[15px] font-bold tracking-tight whitespace-nowrap">
              Uw TV Monteur
            </span>
          </Link>

          <div className="hidden items-center lg:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium whitespace-nowrap text-ink/80 transition-colors duration-300 ease-fluid hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1.5 pl-1">
            {/* Bellen is op mobiel de snelste conversie: altijd zichtbaar, als
                icoonknop op kleine schermen en met nummer op brede schermen. */}
            <a
              href={`tel:${SITE.phone}`}
              inert={open || undefined}
              aria-label={`Bel ${SITE.phoneDisplay}`}
              className="flex h-11 w-11 shrink-0 items-center justify-center gap-2 rounded-full bg-amber-700 text-sm font-semibold whitespace-nowrap text-white transition-colors duration-300 ease-fluid hover:bg-amber-800 xl:h-auto xl:w-auto xl:bg-transparent xl:px-4 xl:py-2.5 xl:text-ink xl:ring-1 xl:ring-ink/10 xl:hover:bg-ink/5"
            >
              <IconPhone className="h-4.5 w-4.5 xl:h-4 xl:w-4" />
              <span className="hidden xl:inline">{SITE.phoneDisplay}</span>
            </a>
            <Link
              href="/contact"
              inert={open || undefined}
              className="group hidden shrink-0 items-center gap-2.5 rounded-full bg-ink py-2 pr-2 pl-4.5 text-sm font-semibold whitespace-nowrap text-cream transition-transform duration-300 ease-fluid active:scale-[0.97] sm:flex"
            >
              Afspraak maken
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 ease-spring group-hover:-translate-y-px group-hover:translate-x-0.5 group-hover:scale-105">
                <IconArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </Link>
            <button
              ref={hamburgerRef}
              type="button"
              aria-label={open ? "Menu sluiten" : "Menu openen"}
              aria-expanded={open}
              aria-controls="mobiel-menu"
              onClick={() => setOpen(!open)}
              className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full ring-1 ring-ink/10 lg:hidden"
            >
              <span
                className={`h-[1.5px] w-4 rounded-full bg-ink transition-transform duration-500 ease-fluid ${
                  open ? "translate-y-[3.25px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-[1.5px] w-4 rounded-full bg-ink transition-transform duration-500 ease-fluid ${
                  open ? "-translate-y-[3.25px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Fullscreen mobiel menu */}
      <div
        ref={menuRef}
        id="mobiel-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
        className={`fixed inset-0 z-40 flex flex-col justify-between bg-cream/90 px-6 pt-32 pb-10 backdrop-blur-3xl transition-opacity duration-500 ease-fluid lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav aria-label="Mobiel menu" className="flex flex-col gap-2">
          {links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${100 + i * 50}ms` : "0ms" }}
              className={`font-display text-4xl font-bold tracking-tight transition-all duration-700 ease-fluid ${
                open ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div
          style={{ transitionDelay: open ? "400ms" : "0ms" }}
          className={`flex flex-col gap-3 transition-all duration-700 ease-fluid ${
            open ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2.5 rounded-full bg-ink px-6 py-4 text-base font-semibold text-cream"
          >
            Afspraak maken
            <IconArrowUpRight className="h-4 w-4" />
          </Link>
          <a
            href={`tel:${SITE.phone}`}
            className="flex items-center justify-center gap-2.5 rounded-full px-6 py-4 text-base font-semibold ring-1 ring-ink/15"
          >
            <IconPhone className="h-4.5 w-4.5" />
            {SITE.phoneDisplay}
          </a>
        </div>
      </div>
    </>
  );
}
