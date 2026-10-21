"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { afspraakHref } from "./Header";

/**
 * Vaste onderbalk op mobiel, met de enige actie die telt.
 *
 * Verschijnt pas na ongeveer één schermhoogte: zolang de hero in beeld staat
 * heeft de bezoeker die knop al. En hij verdwijnt zodra het formulier in
 * beeld komt, want anders dekt de balk precies de velden af die ingevuld
 * moeten worden. Geen telefoonknop: één actie per scherm.
 *
 * Alleen onder `lg`. Op een bureaublad staat de knop in de koptekstbalk al
 * permanent in beeld; een tweede vaste knop zou daar alleen ruimte kosten.
 */
export default function StickyBar() {
  const pathname = usePathname();
  const [zichtbaar, setZichtbaar] = useState(false);

  useEffect(() => {
    // Op /contact is de balk overbodig; dan ook geen scrollluisteraar.
    if (pathname === "/contact") return;

    const onScroll = () => {
      const voorbijHero = window.scrollY > window.innerHeight * 0.9;
      const formulier = document.getElementById("offerte");
      if (!formulier) {
        setZichtbaar(voorbijHero);
        return;
      }
      const rect = formulier.getBoundingClientRect();
      const inBeeld = rect.top < window.innerHeight && rect.bottom > 0;
      setZichtbaar(voorbijHero && !inBeeld);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // Niet op de contactpagina — daar staat het formulier al.
  if (pathname === "/contact") return null;

  return (
    <div
      // Het id staat hier voor Header: die zet de balk `inert` zolang het
      // mobiele menu openstaat, zodat hij niet in de tabvolgorde blijft.
      id="offerte-balk"
      aria-hidden={!zichtbaar}
      // De enige losse maat op de hele site, en onvermijdelijk: zonder
      // `safe-area-inset-bottom` valt de knop op een iPhone deels achter de
      // streep waarmee de gebruiker van app wisselt.
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-ink-100 bg-white/95 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-md transition duration-300 ease-out lg:hidden ${
        zichtbaar
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <Link
        href={afspraakHref(pathname)}
        tabIndex={zichtbaar ? undefined : -1}
        className="btn-primary w-full"
      >
        Offerte aanvragen
        <Icon name="arrow-right" className="size-5" />
      </Link>
    </div>
  );
}
