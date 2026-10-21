"use client";

import Script from "next/script";
import { useEffect } from "react";
import { TRACKING } from "@/lib/site";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Stuurt een GA4-event; doet niets als er geen tracking is geconfigureerd. */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

/**
 * Registreert een Google Ads-conversie op basis van een "AW-…/label"-string.
 *
 * `waarde` hoort bij een conversie met een bedrag erachter: een klus loopt
 * van €89 tot ruim €250. Zonder bedrag telt Google elke aanvraag even zwaar
 * en biedt het net zo hard op een zoekwoord dat klussen van €89 oplevert
 * als op een zoekwoord dat klussen van €250 oplevert. Sinds de site met
 * offertes werkt kent het formulier dat bedrag niet meer; het hoort nu uit
 * de offerte zelf terug te komen.
 */
export function trackAdsConversion(sendTo: string, waarde?: number | null) {
  if (!sendTo) return;
  trackEvent("conversion", {
    send_to: sendTo,
    ...(waarde ? { value: waarde, currency: "EUR" } : {}),
  });
}

const adsAccount = (label: string) => label.split("/")[0] ?? "";

/**
 * Laadt gtag.js alleen als er een GA4- of Google Ads-ID is ingesteld en meet
 * automatisch de twee belangrijkste conversiepunten buiten het formulier:
 * klikken op het telefoonnummer en op WhatsApp. Formulieraanvragen worden
 * vanuit ContactForm gemeld.
 */
export default function Analytics() {
  const ids = Array.from(
    new Set(
      [
        TRACKING.gaId,
        adsAccount(TRACKING.adsFormConversion),
        adsAccount(TRACKING.adsCallConversion),
      ].filter(Boolean),
    ),
  );

  useEffect(() => {
    if (ids.length === 0) return;
    function onClick(e: MouseEvent) {
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      // Alleen telefoonkliks: WhatsApp is uitgeschakeld (SITE.whatsapp is leeg),
      // dus een whatsapp_klik-event zou alleen de rapportage vervuilen.
      if (href.startsWith("tel:")) {
        trackEvent("telefoon_klik", { pagina: location.pathname });
        trackAdsConversion(TRACKING.adsCallConversion);
      }
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [ids.length]);

  if (ids.length === 0) return null;

  const config = ids.map((id) => `gtag('config','${id}');`).join("");

  return (
    <>
      {/* `lazyOnload` in plaats van `afterInteractive`: gemeten met Lighthouse
          op mobiel was gtag.js 191 kB en 542 ms blokkeertijd — een derde van
          alle JavaScript en de grootste enkele blokkeerder van de hoofdthread.
          Met `afterInteractive` zet Next er bovendien een preload-hint voor in
          de <head>, waardoor het script meedingt tijdens het LCP-venster, en
          juist daar zit 75% van de laadtijd van deze site.

          Het inline script hieronder blijft wél `afterInteractive`: dát
          definieert `window.gtag` en `dataLayer`. Daardoor worden events die
          afgaan vóórdat gtag.js binnen is netjes in `dataLayer` gequeued in
          plaats van verloren te gaan — zonder die volgorde zou een vroege
          formulierverzending niet meetellen. */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${ids[0]}`}
        strategy="lazyOnload"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());${config}`}
      </Script>
    </>
  );
}
