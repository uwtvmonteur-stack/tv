"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { IconArrowUpRight, IconCheck, IconPhone } from "./icons";
import { trackAdsConversion, trackEvent } from "./Analytics";
import { SITE, TRACKING } from "@/lib/site";

// Het formulier wordt via de eigen API-route (app/api/afspraak/route.ts) per
// SMTP verstuurd. De SMTP-gegevens staan als Environment Variables op Vercel.
// Antwoordt de server met 503 (SMTP niet geconfigureerd), dan valt het
// formulier terug op een e-mailconcept (mailto) — een noodoplossing.
const ENDPOINT = "/api/afspraak";

const VELDEN = ["naam", "telefoon", "email", "postcode", "huisnummer", "bericht", "website"] as const;

const inputStyles =
  "w-full rounded-2xl bg-cream px-4 py-3.5 text-base ring-1 ring-ink/10 transition-shadow duration-300 ease-fluid placeholder:text-ink-soft/85 focus:ring-2 focus:ring-ink focus:outline-none sm:text-sm";

const labelStyles =
  "mb-1.5 block text-[11px] font-semibold tracking-[0.14em] text-ink-soft uppercase";

const zekerheden = ["Vaste prijs vooraf", "Geen aanbetaling", "Volledig verzekerd"];

type Status = "idle" | "submitting" | "success" | "mailto" | "error";

function TelButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={`tel:${SITE.phone}`}
      className={`flex items-center justify-center gap-2.5 rounded-full bg-ink px-6 py-3.5 text-base font-semibold text-cream transition-transform duration-300 ease-fluid active:scale-[0.98] ${className}`}
    >
      <IconPhone className="h-4.5 w-4.5" />
      Bel {SITE.phoneDisplay}
    </a>
  );
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const resultRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);

  // Verplaats de focus naar de bevestiging of foutmelding zodat schermlezers
  // deze direct aankondigen.
  useEffect(() => {
    if (status === "success" || status === "mailto") resultRef.current?.focus();
    if (status === "error") errorRef.current?.focus();
  }, [status]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(
      VELDEN.map((veld) => [veld, String(data.get(veld) ?? "")]),
    ) as Record<(typeof VELDEN)[number], string>;

    // Honeypot: bots vullen dit verborgen veld in; mensen zien het niet.
    if (payload.website) {
      setStatus("success");
      return;
    }

    // Noodoplossing als SMTP (nog) niet is ingesteld: e-mailconcept openen.
    // We tonen dan géén "bedankt" maar een eerlijke tussenstap met het
    // telefoonnummer, omdat de aanvraag pas binnenkomt als de bezoeker de
    // e-mail zelf verstuurt.
    const openMailto = () => {
      const body = [
        `Naam: ${payload.naam}`,
        `Telefoon: ${payload.telefoon}`,
        `E-mail: ${payload.email}`,
        `Postcode: ${payload.postcode}`,
        `Huisnummer: ${payload.huisnummer}`,
        "",
        payload.bericht,
      ].join("\n");
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
        `Afspraakaanvraag — ${payload.naam}`,
      )}&body=${encodeURIComponent(body)}`;
      trackEvent("afspraak_aanvraag_mailto");
      setStatus("mailto");
    };

    setStatus("submitting");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        form.reset();
        trackEvent("afspraak_aanvraag", { methode: "formulier" });
        trackAdsConversion(TRACKING.adsFormConversion);
        setStatus("success");
      } else if (res.status === 503) {
        openMailto();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        ref={resultRef}
        tabIndex={-1}
        role="status"
        className="rounded-2xl bg-amber-600/10 p-6 text-center ring-1 ring-amber-600/20 focus:outline-none"
      >
        <p className="font-display text-xl font-bold tracking-tight">
          Bedankt! Uw aanvraag is ontvangen.
        </p>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
          {SITE.reactie} Wilt u het liever nu regelen?
        </p>
        <TelButton className="mx-auto mt-5 w-full sm:w-auto" />
      </div>
    );
  }

  if (status === "mailto") {
    return (
      <div
        ref={resultRef}
        tabIndex={-1}
        role="status"
        className="rounded-2xl bg-amber-600/10 p-6 text-center ring-1 ring-amber-600/20 focus:outline-none"
      >
        <p className="font-display text-xl font-bold tracking-tight">
          Nog één stap: verstuur de e-mail
        </p>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
          Uw e-mailprogramma is geopend met uw gegevens. Verstuur dat bericht,
          dan bellen wij u terug. Is er geen e-mailprogramma geopend? Bel ons
          dan even — dat is de snelste weg naar een afspraak.
        </p>
        <TelButton className="mx-auto mt-5 w-full sm:w-auto" />
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-semibold underline decoration-amber-600/50 underline-offset-4"
        >
          Terug naar het formulier
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="naam" className={labelStyles}>
            Uw naam <span className="text-amber-700" aria-hidden="true">*</span>
          </label>
          <input
            id="naam"
            name="naam"
            required
            autoComplete="name"
            placeholder="Jan de Vries"
            className={inputStyles}
          />
        </div>
        <div>
          <label htmlFor="telefoon" className={labelStyles}>
            Telefoonnummer{" "}
            <span className="text-amber-700" aria-hidden="true">*</span>
          </label>
          <input
            id="telefoon"
            name="telefoon"
            type="tel"
            inputMode="tel"
            required
            autoComplete="tel"
            placeholder="06 12 34 56 78"
            className={inputStyles}
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelStyles}>
          E-mailadres{" "}
          <span className="text-amber-700" aria-hidden="true">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          required
          autoComplete="email"
          placeholder="jan@voorbeeld.nl"
          className={inputStyles}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="postcode" className={labelStyles}>
            Postcode
          </label>
          <input
            id="postcode"
            name="postcode"
            autoComplete="postal-code"
            placeholder="3511 AB"
            className={inputStyles}
          />
        </div>
        <div>
          <label htmlFor="huisnummer" className={labelStyles}>
            Huisnummer
          </label>
          <input
            id="huisnummer"
            name="huisnummer"
            inputMode="numeric"
            placeholder="12"
            className={inputStyles}
          />
        </div>
      </div>

      <div>
        <label htmlFor="bericht" className={labelStyles}>
          Uw bericht <span className="normal-case">(optioneel)</span>
        </label>
        <textarea
          id="bericht"
          name="bericht"
          rows={3}
          placeholder="Bijv. tv-formaat, type muur of wanneer het u uitkomt…"
          className={`${inputStyles} resize-none`}
        />
      </div>

      {/* Honeypot tegen spam — onzichtbaar voor mensen, niet voor bots. */}
      <div
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="text-xs text-ink-soft">
        <span className="text-amber-700" aria-hidden="true">*</span> Verplicht
        veld
      </p>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group mt-1 flex w-full items-center justify-center gap-3 rounded-full bg-amber-700 py-2.5 pr-2.5 pl-6 text-base font-semibold text-white transition-transform duration-300 ease-fluid active:scale-[0.98] disabled:opacity-70"
      >
        {status === "submitting" ? "Bezig met verzenden…" : "Afspraak aanvragen"}
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 transition-transform duration-500 ease-spring group-hover:-translate-y-px group-hover:translate-x-0.5 group-hover:scale-105">
          <IconArrowUpRight className="h-4 w-4" />
        </span>
      </button>

      <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-xs font-medium text-ink-soft">
        {zekerheden.map((z) => (
          <li key={z} className="flex items-center gap-1.5">
            <IconCheck className="h-3 w-3 text-amber-700" />
            {z}
          </li>
        ))}
      </ul>

      {status === "error" ? (
        <p
          ref={errorRef}
          tabIndex={-1}
          role="alert"
          className="text-center text-sm font-semibold text-red-700 focus:outline-none"
        >
          Er ging iets mis bij het versturen. Bel ons gerust op{" "}
          <a href={`tel:${SITE.phone}`} className="underline underline-offset-4">
            {SITE.phoneDisplay}
          </a>
          , dan plannen we het direct in.
        </p>
      ) : (
        <p className="text-center text-xs leading-relaxed text-ink-soft">
          {SITE.reactie} Liever direct?{" "}
          <a
            href={`tel:${SITE.phone}`}
            className="font-semibold text-ink underline decoration-amber-600/50 underline-offset-4"
          >
            Bel {SITE.phoneDisplay}
          </a>
          .
        </p>
      )}

      <p className="text-center text-[11px] leading-relaxed text-ink-soft/80">
        Uw gegevens gebruiken we alleen om contact met u op te nemen over uw
        aanvraag.{" "}
        <Link href="/privacy" className="underline underline-offset-2">
          Privacyverklaring
        </Link>
      </p>
    </form>
  );
}
