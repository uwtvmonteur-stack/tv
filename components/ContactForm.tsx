"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { IconArrowUpRight } from "./icons";
import { trackAdsConversion, trackEvent } from "./Analytics";
import { SITE, TRACKING } from "@/lib/site";
import { beugelOpties, montageExtras, montageMaten } from "@/lib/content";

// Het formulier wordt via de eigen API-route (app/api/afspraak/route.ts) per
// SMTP verstuurd. De SMTP-gegevens staan als Environment Variables op Vercel.
// Antwoordt de server met 503 (SMTP niet geconfigureerd), dan valt het
// formulier terug op een e-mailconcept (mailto) — een noodoplossing.
const ENDPOINT = "/api/afspraak";

const VELDEN = [
  "postcode",
  "huisnummer",
  "tvmaat",
  "beugel",
  "datum",
  "dagdeel",
  "naam",
  "telefoon",
  "email",
  "bericht",
  "ref_check_2",
] as const;

const DAGDELEN = [
  "Ochtend (08:00 – 12:00)",
  "Middag (12:00 – 17:00)",
  "Avond (17:00 – 21:00)",
  "Maakt niet uit",
];

/**
 * Morgen in YYYY-MM-DD. De vroegst kiesbare dag: een afspraak op dezelfde dag
 * kunnen we niet waarmaken, dus die bieden we ook niet aan.
 */
function vroegsteDatum() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

const inputStyles =
  "w-full rounded-md bg-paper px-4 py-3.5 text-base border border-hairline transition-shadow duration-300 ease-out placeholder:text-fg-muted/85 focus:ring-2 focus:ring-ink focus:outline-none sm:text-sm";

const labelStyles =
  "mb-1.5 block text-[11px] font-semibold tracking-[0.14em] text-fg-muted uppercase";

/**
 * Eén tikbare keuze. Het bolletje of vinkje zelf is visueel verborgen maar
 * blijft een echte radio of checkbox: daarmee werken toetsenbord, schermlezer
 * en FormData zonder extra code, en de hele kaart is het raakvlak — op een
 * telefoon de helft van het werk dat een uitklaplijst kost.
 */
const keuzeStyles =
  "relative flex cursor-pointer items-start justify-between gap-4 rounded-md bg-paper px-4 py-3.5 text-left border border-hairline transition-[background-color,box-shadow] duration-300 ease-out has-[:checked]:bg-accent-tint has-[:checked]:ring-2 has-[:checked]:ring-accent has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ink";

type Status = "idle" | "submitting" | "success" | "mailto" | "error";

type Veld = (typeof VELDEN)[number];
type FieldErrors = Partial<
  Record<"postcode" | "naam" | "telefoon" | "email" | "datum", string>
>;

// Bewust tolerant: browsers zijn met `type="email"` soms strenger dan nodig
// (of tonen een onduidelijke bubbel). Wij controleren zelf, in het Nederlands.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Vier cijfers zijn genoeg om te weten of we komen; de twee letters mogen,
// maar een aanvraag mag er nooit op stuklopen.
const POSTCODE_RE = /^[1-9][0-9]{3}\s*[a-zA-Z]{0,2}$/;

function valideer(p: Record<Veld, string>): FieldErrors {
  const fouten: FieldErrors = {};
  if (!POSTCODE_RE.test(p.postcode.trim())) {
    fouten.postcode = "Vul uw postcode in, bijvoorbeeld 3511 AB.";
  }
  if (!p.naam.trim()) fouten.naam = "Vul uw naam in.";
  const cijfers = p.telefoon.replace(/\D/g, "");
  if (cijfers.length < 8) {
    fouten.telefoon = "Vul een geldig telefoonnummer in (bijv. 06 12 34 56 78).";
  }
  // E-mail is optioneel: wij bellen terug, dus het telefoonnummer is wat we
  // echt nodig hebben. Eén verplicht veld minder is één reden minder om
  // halverwege te stoppen. Staat er wél een adres, dan moet het kloppen —
  // anders komt de bevestiging nooit aan en weet niemand dat.
  if (p.email && !EMAIL_RE.test(p.email)) {
    fouten.email =
      "Dit e-mailadres lijkt niet compleet. U mag het ook leeglaten; dan bellen we u.";
  }
  // Vergelijking van twee YYYY-MM-DD-strings werkt gewoon alfabetisch.
  if (p.datum && p.datum < vroegsteDatum()) {
    fouten.datum = "Kies op zijn vroegst de dag van morgen.";
  }
  return fouten;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm font-medium text-red-700">
      {message}
    </p>
  );
}

/**
 * Eén genummerde stap. De nummers maken van een lange lijst velden een korte
 * route met een zichtbaar einde; dat is het verschil tussen "nog veel te gaan"
 * en "nog twee stappen".
 */
function Stap({
  nummer,
  titel,
  hint,
  children,
}: {
  nummer: number;
  titel: string;
  hint?: ReactNode;
  children: ReactNode;
}) {
  return (
    <fieldset className="min-w-0 border-0 p-0">
      <legend className="mb-3 w-full">
        <span className="flex items-baseline gap-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-inverse text-[12px] font-semibold text-fg-inverse tabular-nums">
            {nummer}
          </span>
          <span className="font-display text-[1.0625rem] leading-snug font-semibold">
            {titel}
          </span>
        </span>
      </legend>
      {hint && (
        <p className="mb-3 text-sm leading-relaxed text-fg-muted">{hint}</p>
      )}
      {children}
    </fieldset>
  );
}

export default function ContactForm({
  planner = false,
  montage = false,
  variant,
  submitLabel,
  berichtLabel = "Uw bericht",
  berichtPlaceholder = "Bijv. om welke dienst het gaat en wat u nodig heeft…",
}: {
  /** Toont een voorkeursdatum en dagdeel, zodat de klant zelf een moment kiest. */
  planner?: boolean;
  /**
   * Toont de montagevragen: het formaat van de tv (met de prijs erbij), de
   * beugelvraag en de extra's. Alleen op pagina's die over ophangen gaan — op
   * de soundbar- of tv-hulppagina zou een tv-formaat met montageprijs de
   * verkeerde vraag zijn.
   */
  montage?: boolean;
  /** Label voor A/B-meting; komt mee als parameter in het GA4-event. */
  variant?: string;
  submitLabel?: string;
  /**
   * Label en voorbeeldtekst van het berichtveld. Per dienst anders: bij het
   * ophangen helpt het muurtype, bij een installatie juist de apparatuur. Een
   * goede voorbeeldtekst levert bruikbare aanvragen op en scheelt navragen.
   */
  berichtLabel?: string;
  berichtPlaceholder?: string;
} = {}) {
  const [status, setStatus] = useState<Status>("idle");

  // `useRef` en niet `useState`: dit mag geen hertekening veroorzaken terwijl
  // iemand in een veld staat te typen.
  const startGemeld = useRef(false);
  const meldStart = () => {
    if (startGemeld.current) return;
    startGemeld.current = true;
    trackEvent("formulier_start", { variant });
  };
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [maatId, setMaatId] = useState("");
  const [beugelId, setBeugelId] = useState("");
  const [extraIds, setExtraIds] = useState<string[]>([]);
  const resultRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);

  const ringFout = (veld: keyof FieldErrors) =>
    fieldErrors[veld] ? " ring-2 ring-red-600 focus:ring-red-600" : "";

  // De prijs die de bezoeker ziet terwijl hij kiest. Dit is het hele
  // verkoopargument van dit bedrijf: de concurrentie rekent toeslagen voor de
  // avond, het weekend en een gipswand, en noemt vooraf geen bedrag. Dus zetten
  // wij het bedrag midden in het formulier, vóór de naam en het nummer.
  const maat = montageMaten.find((m) => m.id === maatId);
  const gekozenExtras = montageExtras.filter((e) => extraIds.includes(e.id));
  const beugel = beugelOpties.find((b) => b.id === beugelId);
  const totaal =
    maat?.bedrag == null
      ? null
      : maat.bedrag +
        gekozenExtras.reduce((som, extra) => som + (extra.bedrag ?? 0), 0);
  // Eén open post maakt het hele totaal een vanaf-prijs. Een hard bedrag tonen
  // dat later toch oploopt is precies de verrassing die wij niet verkopen.
  const totaalIsOpen =
    gekozenExtras.some((extra) => extra.open) || beugelId === "nodig";

  const prijsRegels: [string, string][] = maat
    ? [
        [`Tv ophangen, ${maat.label}`, maat.prijs],
        ...gekozenExtras.map(
          (extra) => [extra.label, extra.prijs] as [string, string],
        ),
        ...(beugelId === "nodig"
          ? ([["Beugel erbij", "prijs vooraf"]] as [string, string][])
          : []),
      ]
    : [];

  const prijsTekst =
    totaal === null ? "" : `${totaalIsOpen ? "vanaf " : ""}€${totaal}`;

  // Verplaats de focus naar de bevestiging of foutmelding zodat schermlezers
  // deze direct aankondigen.
  useEffect(() => {
    if (status === "success" || status === "mailto") resultRef.current?.focus();
    if (status === "error") errorRef.current?.focus();
  }, [status]);

  // Staat er een prijskaart op dezelfde pagina (op /prijzen springt die naar
  // #afspraak), dan neemt het formulier die keuze over. Eén luisteraar op het
  // document in plaats van de kaarten zelf interactief maken: zo blijven de
  // prijskaarten gewone server-HTML zonder een regel JavaScript.
  useEffect(() => {
    if (!montage) return;
    const onClick = (event: MouseEvent) => {
      const el = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-maat]",
      );
      const gekozen = el?.dataset.maat;
      if (gekozen && montageMaten.some((m) => m.id === gekozen)) {
        setMaatId(gekozen);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [montage]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(
      VELDEN.map((veld) => [veld, String(data.get(veld) ?? "").trim()]),
    ) as Record<Veld, string>;
    // Mobiele toetsenborden zetten soms een hoofdletter of spatie in het
    // e-mailadres; dat mag nooit een reden zijn om een aanvraag te blokkeren.
    payload.email = payload.email.replace(/\s+/g, "").toLowerCase();

    // Honeypot: bots vullen dit verborgen veld in; mensen zien het niet.
    // De naam is bewust betekenisloos: een veld dat "website" of "url" heet
    // wordt door Chrome en wachtwoordbeheerders ingevuld, ook buiten beeld en
    // ook met autoComplete="off". Dan verdween een echte aanvraag stil achter
    // een bedankscherm.
    if (payload.ref_check_2) {
      setStatus("success");
      return;
    }

    const fouten = valideer(payload);
    setFieldErrors(fouten);
    if (Object.keys(fouten).length > 0) {
      const eerste = Object.keys(fouten)[0];
      form.querySelector<HTMLInputElement>(`#${eerste}`)?.focus();
      return;
    }

    // 3511ab → 3511 AB. Eén nette notatie in de mail scheelt navragen.
    const pc = payload.postcode.replace(/\s+/g, "").toUpperCase();
    payload.postcode = pc.length > 4 ? `${pc.slice(0, 4)} ${pc.slice(4)}` : pc;

    // De keuzes gaan als leesbare tekst mee, zodat de aanvraagmail meteen
    // bruikbaar is: wat er hangt, welke prijs de klant op het scherm zag en of
    // er een beugel mee moet.
    const verstuur = {
      ...payload,
      tvmaat: maat ? `${maat.naam} — ${maat.label} (${maat.prijs})` : "",
      beugel: beugel?.label ?? "",
      extras: gekozenExtras
        .map((extra) => `${extra.label} (${extra.prijs})`)
        .join("; "),
      prijs: prijsTekst,
    };

    // Noodoplossing als SMTP (nog) niet is ingesteld: e-mailconcept openen.
    // We tonen dan géén "bedankt" maar een eerlijke tussenstap, omdat de
    // aanvraag pas binnenkomt als de bezoeker de e-mail zelf verstuurt.
    const openMailto = () => {
      const body = [
        `Naam: ${payload.naam}`,
        `Telefoon: ${payload.telefoon}`,
        `E-mail: ${payload.email || "–"}`,
        `Postcode: ${payload.postcode}`,
        `Huisnummer: ${payload.huisnummer}`,
        ...(verstuur.tvmaat ? [`Tv: ${verstuur.tvmaat}`] : []),
        ...(verstuur.beugel ? [`Beugel: ${verstuur.beugel}`] : []),
        ...(verstuur.extras ? [`Extra's: ${verstuur.extras}`] : []),
        ...(verstuur.prijs ? [`Prijs op het scherm: ${verstuur.prijs}`] : []),
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
        body: JSON.stringify(verstuur),
      });
      if (res.ok) {
        form.reset();
        setMaatId("");
        setBeugelId("");
        setExtraIds([]);
        // Converteer alleen als de server bevestigt dat de aanvraag echt is
        // verstuurd. Een 200 alléén is niet genoeg: de honeypot-afhandeling
        // antwoordt bewust met een nep-200 (`verzonden: false`) om bots niets
        // te verraden, en zo'n hit mag nooit als aanvraag meetellen in
        // Analytics of Google Ads.
        //
        // Bewust `!== false` en niet `=== true`: kan het antwoord niet gelezen
        // worden, dan is de mail wél verstuurd (de route geeft 502 als dat
        // mislukt) en is een getelde conversie juist. Alleen een expliciete
        // ontkenning onderdrukt de meting.
        const antwoord = (await res.json().catch(() => null)) as {
          verzonden?: boolean;
        } | null;
        if (antwoord?.verzonden !== false) {
          trackEvent("afspraak_aanvraag", {
            methode: "formulier",
            ...(variant ? { variant } : {}),
            // Waarde van de aanvraag: hiermee kan Google Ads later op omzet
            // bieden in plaats van op aantallen, en zien we welk formaat de
            // advertenties werkelijk opleveren.
            ...(totaal !== null ? { waarde: totaal } : {}),
            ...(beugelId ? { beugel: beugelId } : {}),
          });
          // Het bedrag gaat mee naar Google Ads, niet alleen naar GA4: anders
          // telt een klus van €99 daar even zwaar als een van €250 en kan de
          // campagne alleen op aantallen sturen.
          trackAdsConversion(TRACKING.adsFormConversion, totaal);
        }
        setStatus("success");
      } else if (res.status === 503) {
        openMailto();
      } else if (res.status === 422) {
        // De server keurde een veld af (in de praktijk het e-mailadres).
        setFieldErrors({
          email: "Controleer uw e-mailadres; het lijkt niet compleet.",
        });
        setStatus("idle");
        form.querySelector<HTMLInputElement>("#email")?.focus();
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
        className="rounded-md bg-accent-tint p-6 text-center ring-1 ring-accent/25 focus:outline-none"
      >
        <p className="font-display text-h3 font-semibold">
          Bedankt! Uw aanvraag is ontvangen.
        </p>
        <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">
          {SITE.reactie} Houd uw telefoon dus even bij de hand.
        </p>
      </div>
    );
  }

  if (status === "mailto") {
    return (
      <div
        ref={resultRef}
        tabIndex={-1}
        role="status"
        className="rounded-md bg-accent-tint p-6 text-center ring-1 ring-accent/25 focus:outline-none"
      >
        <p className="font-display text-h3 font-semibold">
          Nog één stap: verstuur de e-mail
        </p>
        <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">
          Uw e-mailprogramma is geopend met uw gegevens. Verstuur dat bericht,
          dan nemen wij binnen enkele uren contact met u op. Is er geen
          e-mailprogramma geopend? Mail uw gegevens dan naar{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="font-semibold text-fg underline decoration-accent-fg/60 underline-offset-4"
          >
            {SITE.email}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-semibold underline decoration-accent-fg/60 underline-offset-4"
        >
          Terug naar het formulier
        </button>
      </div>
    );
  }

  // De volgorde is bewust: eerst de vraag die de bezoeker zélf heeft ("komen
  // jullie bij mij?"), dan wat het kost, en pas aan het eind zijn naam en
  // nummer. Wie de prijs al heeft gezien, geeft dat nummer makkelijker.
  let stap = 0;
  const nrWaar = ++stap;
  const nrTv = montage ? ++stap : 0;
  const nrExtra = montage ? ++stap : 0;
  const nrWanneer = planner ? ++stap : 0;
  const nrContact = ++stap;

  return (
    // noValidate: geen browser-bubbels; wij valideren zelf met duidelijke tekst.
    <form
      onSubmit={handleSubmit}
      noValidate
      // Eén keer melden dat iemand het formulier daadwerkelijk aanraakt.
      // Zonder dit event is er maar één meetpunt — de geslaagde verzending —
      // en is "niemand kwam bij het formulier" niet te onderscheiden van
      // "iedereen haakte af bij stap 4". Dat verschil bepaalt of je aan de
      // advertenties of aan het formulier moet sleutelen.
      onFocusCapture={meldStart}
      className="relative flex flex-col gap-8"
    >
      <Stap
        nummer={nrWaar}
        titel="Waar moet de monteur zijn?"
        hint="Zo zien we direct of uw adres in ons werkgebied valt."
      >
        <div className="grid gap-4 sm:grid-cols-[1fr_7rem]">
          <div>
            <label htmlFor="postcode" className={labelStyles}>
              Postcode{" "}
              <span className="text-accent-fg" aria-hidden="true">
                *
              </span>
            </label>
            <input
              id="postcode"
              name="postcode"
              aria-required="true"
              aria-invalid={!!fieldErrors.postcode}
              aria-describedby={fieldErrors.postcode ? "postcode-fout" : undefined}
              autoComplete="postal-code"
              placeholder="3511 AB"
              className={inputStyles + ringFout("postcode")}
            />
            <FieldError id="postcode-fout" message={fieldErrors.postcode} />
          </div>
          <div>
            <label htmlFor="huisnummer" className={labelStyles}>
              Huisnr.
            </label>
            <input
              id="huisnummer"
              name="huisnummer"
              inputMode="numeric"
              autoComplete="address-line2"
              placeholder="12"
              className={inputStyles}
            />
          </div>
        </div>
      </Stap>

      {montage && (
        <>
          <Stap
            nummer={nrTv}
            titel="Hoe groot is uw tv?"
            hint="Hieraan hangt de prijs — en daarmee staat hij ook meteen vast."
          >
            <div className="flex flex-col gap-2.5">
              {montageMaten.map((optie) => (
                <label key={optie.id} className={keuzeStyles}>
                  <input
                    type="radio"
                    name="tvmaat"
                    value={optie.id}
                    checked={maatId === optie.id}
                    onChange={() => setMaatId(optie.id)}
                    className="sr-only"
                  />
                  <span className="min-w-0">
                    <span className="block font-semibold">{optie.label}</span>
                    {optie.populair && (
                      <span className="mt-0.5 block text-[13px] text-fg-muted">
                        Meest gekozen
                      </span>
                    )}
                  </span>
                  <span className="shrink-0 font-display font-semibold tabular-nums">
                    {optie.prijs}
                  </span>
                </label>
              ))}
            </div>

            <p className="mt-6 mb-3 text-sm leading-relaxed text-fg-muted">
              En heeft u al een beugel voor die tv?
            </p>
            <div className="flex flex-col gap-2.5">
              {beugelOpties.map((optie) => (
                <label key={optie.id} className={keuzeStyles}>
                  <input
                    type="radio"
                    name="beugel"
                    value={optie.id}
                    checked={beugelId === optie.id}
                    onChange={() => setBeugelId(optie.id)}
                    className="sr-only"
                  />
                  <span className="min-w-0">
                    <span className="block font-semibold">{optie.label}</span>
                    <span className="mt-0.5 block text-[13px] leading-relaxed text-fg-muted">
                      {optie.detail}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </Stap>

          <Stap
            nummer={nrExtra}
            titel="Iets erbij, in dezelfde rit?"
            hint="Optioneel. Alles wat u hier aanvinkt doen we tijdens hetzelfde bezoek — u hoeft ons dus niet twee keer thuis te laten komen."
          >
            <div className="flex flex-col gap-2.5">
              {montageExtras.map((extra) => (
                <label key={extra.id} className={keuzeStyles}>
                  <input
                    type="checkbox"
                    name="extras"
                    value={extra.id}
                    checked={extraIds.includes(extra.id)}
                    onChange={(event) =>
                      setExtraIds((huidig) =>
                        event.target.checked
                          ? [...huidig, extra.id]
                          : huidig.filter((id) => id !== extra.id),
                      )
                    }
                    className="sr-only"
                  />
                  <span className="min-w-0 font-semibold">{extra.label}</span>
                  <span className="shrink-0 text-sm font-semibold text-fg-muted tabular-nums">
                    {extra.prijs}
                  </span>
                </label>
              ))}
            </div>
          </Stap>
        </>
      )}

      {planner && (
        <Stap
          nummer={nrWanneer}
          titel="Wanneer schikt het u?"
          hint="Optioneel en niet bindend — ook ’s avonds en in het weekend, zonder toeslag."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="datum" className={labelStyles}>
                Gewenste dag
              </label>
              <input
                id="datum"
                name="datum"
                type="date"
                // De pagina's worden statisch gebouwd, dus in de HTML zou de
                // vroegste datum op de builddatum blijven staan. Daarom zetten
                // we hem in de browser, bij het plaatsen van het veld.
                ref={(el) => {
                  if (el) el.min = vroegsteDatum();
                }}
                aria-invalid={!!fieldErrors.datum}
                aria-describedby={fieldErrors.datum ? "datum-fout" : undefined}
                className={inputStyles + ringFout("datum")}
              />
              <FieldError id="datum-fout" message={fieldErrors.datum} />
            </div>
            {DAGDELEN.map((dagdeel) => (
              <label key={dagdeel} className={keuzeStyles}>
                <input
                  type="radio"
                  name="dagdeel"
                  value={dagdeel}
                  className="sr-only"
                />
                <span className="min-w-0 font-semibold">{dagdeel}</span>
              </label>
            ))}
          </div>
        </Stap>
      )}

      <Stap
        nummer={nrContact}
        titel="Hoe bereiken we u?"
        hint="Wij bellen u terug met de eerstvolgende mogelijkheden. Een e-mailadres is niet verplicht."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="naam" className={labelStyles}>
              Uw naam{" "}
              <span className="text-accent-fg" aria-hidden="true">
                *
              </span>
            </label>
            <input
              id="naam"
              name="naam"
              aria-required="true"
              aria-invalid={!!fieldErrors.naam}
              aria-describedby={fieldErrors.naam ? "naam-fout" : undefined}
              autoComplete="name"
              placeholder="Jan de Vries"
              className={inputStyles + ringFout("naam")}
            />
            <FieldError id="naam-fout" message={fieldErrors.naam} />
          </div>
          <div>
            <label htmlFor="telefoon" className={labelStyles}>
              Telefoonnummer{" "}
              <span className="text-accent-fg" aria-hidden="true">
                *
              </span>
            </label>
            <input
              id="telefoon"
              name="telefoon"
              type="tel"
              inputMode="tel"
              aria-required="true"
              aria-invalid={!!fieldErrors.telefoon}
              aria-describedby={fieldErrors.telefoon ? "telefoon-fout" : undefined}
              autoComplete="tel"
              placeholder="06 12 34 56 78"
              className={inputStyles + ringFout("telefoon")}
            />
            <FieldError id="telefoon-fout" message={fieldErrors.telefoon} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className={labelStyles}>
              E-mailadres <span className="normal-case">(optioneel)</span>
            </label>
            {/* type="text" + inputMode="email": wel het @-toetsenbord, maar geen
                strenge browser-validatie of autocorrectie die adressen afkeurt. */}
            <input
              id="email"
              name="email"
              type="text"
              inputMode="email"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              aria-invalid={!!fieldErrors.email}
              aria-describedby={fieldErrors.email ? "email-fout" : undefined}
              autoComplete="email"
              placeholder="jan@voorbeeld.nl — voor de bevestiging"
              className={inputStyles + ringFout("email")}
            />
            <FieldError id="email-fout" message={fieldErrors.email} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="bericht" className={labelStyles}>
              {berichtLabel} <span className="normal-case">(optioneel)</span>
            </label>
            <textarea
              id="bericht"
              name="bericht"
              rows={3}
              placeholder={berichtPlaceholder}
              className={`${inputStyles} resize-none`}
            />
          </div>
        </div>
      </Stap>

      {/* Honeypot tegen spam — onzichtbaar voor mensen, niet voor bots. */}
      <div
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="ref_check_2">Laat dit veld leeg</label>
        <input
          id="ref_check_2"
          name="ref_check_2"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {montage && (
        <div
          aria-live="polite"
          className="rounded-md bg-inverse p-5 text-fg-inverse md:p-6"
        >
          {totaal === null ? (
            <p className="text-[15px] leading-relaxed text-white/70">
              Kies hierboven het formaat van uw tv, dan staat uw prijs hier. Wat
              daar komt te staan is wat u betaalt — ook ’s avonds, ook in het
              weekend en ook als uw wand van gipsplaat blijkt.
            </p>
          ) : (
            <>
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-[11px] font-semibold tracking-[0.14em] text-white/60 uppercase">
                  Uw prijs
                </span>
                <span className="font-display text-h2 font-semibold tabular-nums">
                  {totaalIsOpen && (
                    <span className="mr-1.5 align-middle text-base font-semibold text-white/60">
                      vanaf
                    </span>
                  )}
                  €{totaal}
                </span>
              </div>
              <ul className="mt-4 flex flex-col gap-2 border-t border-white/15 pt-4 text-sm text-white/70">
                {prijsRegels.map(([label, prijs]) => (
                  <li key={label} className="flex justify-between gap-4">
                    <span className="min-w-0">{label}</span>
                    <span className="shrink-0 tabular-nums">{prijs}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                Inclusief voorrijkosten en btw. Geen avond- of weekendtoeslag,
                en geen meerwerk zonder uw toestemming.
              </p>
            </>
          )}
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group flex w-full items-center justify-center gap-3 rounded-full bg-accent py-2.5 pr-2.5 pl-6 text-base font-semibold text-white transition-[transform,background-color] duration-300 ease-out hover:bg-accent-hover active:scale-[0.98] disabled:opacity-70"
        >
          {status === "submitting"
            ? "Bezig met verzenden…"
            : (submitLabel ?? "Afspraak aanvragen")}
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 transition-transform duration-500 ease-out group-hover:-translate-y-px group-hover:translate-x-0.5 group-hover:scale-105">
            <IconArrowUpRight className="h-4 w-4" />
          </span>
        </button>
        {/* De laatste twijfel vlak voor de klik: zit ik hier nu aan vast? */}
        <p className="mt-3 text-center text-sm text-fg-muted">
          U zit nog nergens aan vast — u krijgt eerst een voorstel voor dag en
          tijd.{" "}
          <span className="text-accent-fg" aria-hidden="true">
            *
          </span>{" "}
          Verplicht veld.
        </p>
      </div>

      {/* Onder de knop staat verder alleen nog de foutmelding, en alleen als
          het versturen mislukt. */}
      {status === "error" && (
        <p
          ref={errorRef}
          tabIndex={-1}
          role="alert"
          className="text-center text-sm font-semibold text-red-700 focus:outline-none"
        >
          Er ging iets mis bij het versturen. Probeer het nog een keer, of mail
          uw gegevens naar{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="underline underline-offset-4"
          >
            {SITE.email}
          </a>
          — dan plannen we het direct in.
        </p>
      )}
    </form>
  );
}
