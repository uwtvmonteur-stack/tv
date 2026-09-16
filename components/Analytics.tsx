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

/** Registreert een Google Ads-conversie op basis van een "AW-…/label"-string. */
export function trackAdsConversion(sendTo: string) {
  if (!sendTo) return;
  trackEvent("conversion", { send_to: sendTo });
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
      if (href.startsWith("tel:")) {
        trackEvent("telefoon_klik", { pagina: location.pathname });
        trackAdsConversion(TRACKING.adsCallConversion);
      } else if (href.includes("wa.me") || href.includes("whatsapp")) {
        trackEvent("whatsapp_klik", { pagina: location.pathname });
      }
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [ids.length]);

  if (ids.length === 0) return null;

  const config = ids.map((id) => `gtag('config','${id}');`).join("");

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${ids[0]}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());${config}`}
      </Script>
    </>
  );
}
