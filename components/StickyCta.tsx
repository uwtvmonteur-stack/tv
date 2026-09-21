"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { IconArrowUpRight, IconChat } from "./icons";
import { SITE } from "@/lib/site";

/**
 * Vaste onderbalk met de enige actie die telt: een afspraak maken (en, zodra
 * `SITE.whatsapp` is ingevuld, WhatsApp). Verschijnt pas ná de hero (na ± één
 * schermhoogte scrollen). Op mobiel een onderbalk over de volle breedte, op
 * grotere schermen een zwevende pil. Niet op de contactpagina (daar staat het
 * formulier al).
 */
export default function StickyCta() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > window.innerHeight * 0.9);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Niet op de contactpagina — daar staat het afspraakformulier al.
  if (pathname === "/contact") return null;

  // Op landingspagina's met een eigen formulier scrollen we daarheen in plaats
  // van de bezoeker naar /contact te sturen.
  const eigenFormulier = pathname === "/tv-ophangen-plannen";

  const btn =
    "flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold whitespace-nowrap transition-transform duration-300 ease-fluid active:scale-[0.98]";

  return (
    <>
      {/* Reserveert ruimte onderaan zodat de vaste balk de footer niet overlapt. */}
      <div className="h-20" aria-hidden />
      <div
        aria-hidden={!show}
        className={`fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-ink/10 bg-cream/95 px-3 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-sm transition-all duration-300 ease-fluid sm:bottom-5 sm:mx-auto sm:max-w-lg sm:rounded-full sm:border sm:pb-3 sm:shadow-[0_25px_50px_-20px_rgba(25,21,18,0.45)] ${
          show
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <Link
          href={eigenFormulier ? "#afspraak" : "/contact"}
          tabIndex={show ? undefined : -1}
          className={`${btn} bg-amber-700 text-white`}
        >
          Afspraak maken
          <IconArrowUpRight className="h-4 w-4" />
        </Link>
        {SITE.whatsapp && (
          <a
            href={SITE.whatsapp}
            tabIndex={show ? undefined : -1}
            aria-label="WhatsApp"
            className={`${btn} max-w-14 bg-[#25D366] text-ink sm:max-w-none sm:flex-none sm:px-4`}
          >
            <IconChat className="h-4 w-4" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        )}
      </div>
    </>
  );
}
