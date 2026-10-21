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

// Het formulier wordt via de eigen API-route (app/api/afspraak/route.ts) per
// SMTP verstuurd. De SMTP-gegevens staan als Environment Variables op Vercel.
// Antwoordt de server met 503 (SMTP niet geconfigureerd), dan valt het
// formulier terug op een e-mailconcept (mailto) — een noodoplossing.
const ENDPOINT = "/api/afspraak";

/**
 * Een offerteaanvraag vraagt om drie dingen en niet meer: wie u bent, waar u
 * woont en wat er moet gebeuren.
 *
 * Hiervoor stond hier een configurator met het tv-formaat, de beugelvraag,
 * extra's, een datumkiezer en een meelopende prijs. Die hoorde bij vaste
 * tarieven per formaat. Nu de prijs uit een offerte komt, is elke vraag die
 * niet nodig is om die offerte te maken puur een reden om af te haken.
 */
const VELDEN = [
  "naam",
  "telefoon",
  "email",
  "straat",
  "postcode",
  "plaats",
  "omschrijving",
  "ref_check_2",
] as const;

type Veld = (typeof VELDEN)[number];
type FieldErrors = Partial<Record<Veld, string>>;
type Status = "idle" | "submitting" | "success" | "error" | "mailto";

// Bewust ruim: een adres afkeuren dat eigenlijk klopt kost een klant, en de
// monteur belt toch voordat hij langskomt.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
const POSTCODE_RE = /^[1-9][0-9]{3}\s*[a-zA-Z]{0,2}$/;

const inputStyles =
  "w-full rounded-md border border-control bg-paper px-4 py-3.5 text-base transition-shadow duration-200 ease-out placeholder:text-fg-muted/80 focus:ring-2 focus:ring-fg focus:outline-none sm:text-sm";

const labelStyles =
  "mb-1.5 block text-2xs font-semibold tracking-[0.12em] text-fg-muted uppercase";

function valideer(p: Record<Veld, string>): FieldErrors {
  const fouten: FieldErrors = {};
  if (!p.naam.trim()) fouten.naam = "Wij willen graag weten hoe we u mogen noemen.";
  if (p.telefoon.replace(/\D/g, "").length < 9)
    fouten.telefoon = "Vul een telefoonnummer in waarop wij u kunnen bereiken.";
  // E-mail is optioneel: wij bellen u. Staat er wél iets, dan moet het kloppen.
  if (p.email && !EMAIL_RE.test(p.email))
    fouten.email =
      "Dit e-mailadres lijkt niet compleet. U mag het ook leeglaten; dan bellen we u.";
  if (!p.straat.trim())
    fouten.straat = "Vul uw straat en huisnummer in.";
  if (!POSTCODE_RE.test(p.postcode.trim()))
    fouten.postcode = "Vul een geldige postcode in, bijvoorbeeld 3511 AB.";
  if (!p.plaats.trim()) fouten.plaats = "Vul uw woonplaats in.";
  if (p.omschrijving.trim().length < 10)
    fouten.omschrijving =
      "Vertel kort wat er moet gebeuren; daarmee kunnen wij een offerte maken.";
  return fouten;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm font-medium text-danger">
      {message}
    </p>
  );
}

function Veldje({
  id,
  label,
  children,
  fout,
  className = "",
}: {
  id: string;
  label: ReactNode;
  children: ReactNode;
  fout?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className={labelStyles}>
        {label}
      </label>
      {children}
      <FieldError id={`${id}-fout`} message={fout} />
    </div>
  );
}

export default function ContactForm({
  variant,
  submitLabel = "Offerte aanvragen",
  berichtLabel = "Wat moet er gebeuren?",
  berichtPlaceholder = "Bijvoorbeeld: 55 inch Samsung ophangen in de woonkamer, de wand is gipsplaat en ik heb nog geen beugel.",
}: {
  /** Label voor meting; komt mee als parameter in het GA4-event. */
  variant?: string;
  submitLabel?: string;
  /**
   * Label en voorbeeldtekst van het omschrijvingsveld. Per dienst anders: bij
   * het ophangen helpt het wandtype, bij een installatie juist de apparatuur.
   * Een goede voorbeeldtekst levert een bruikbare aanvraag op en scheelt
   * navragen — en dus een snellere offerte.
   */
  berichtLabel?: string;
  berichtPlaceholder?: string;
} = {}) {
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const resultRef = useRef<HTMLDivElement>(null);

  // Na het verzenden verdwijnt het formulier en komt het antwoord ervoor in de
  // plaats. Zonder deze focus merkt een schermlezer daar niets van — de
  // bezoeker hoort niets meer en weet niet of zijn aanvraag staat. Focus
  // scrollt het paneel bovendien in beeld, wat op een telefoon net zo nodig is.
  useEffect(() => {
    if (status === "success" || status === "mailto") resultRef.current?.focus();
  }, [status]);

  // `useRef` en niet `useState`: dit mag geen hertekening veroorzaken terwijl
  // iemand in een veld staat te typen.
  const startGemeld = useRef(false);
  const meldStart = () => {
    if (startGemeld.current) return;
    startGemeld.current = true;
    trackEvent("formulier_start", { variant });
  };

  const beschrijf = (veld: Veld) =>
    fieldErrors[veld] ? `${veld}-fout` : undefined;

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

    // Honeypot: bots vullen dit verborgen veld in, mensen zien het niet. De
    // naam is bewust betekenisloos — een veld dat "website" of "url" heet
    // wordt door browsers en wachtwoordbeheerders ingevuld, ook buiten beeld,
    // en dan verdwijnt een echte aanvraag stil achter een bedankscherm.
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

    // Noodoplossing als SMTP (nog) niet is ingesteld: e-mailconcept openen.
    // We tonen dan géén "bedankt" maar een eerlijke tussenstap, omdat de
    // aanvraag pas binnenkomt als de bezoeker de e-mail zelf verstuurt.
    const openMailto = () => {
      const body = [
        `Naam: ${payload.naam}`,
        `Telefoon: ${payload.telefoon}`,
        `E-mail: ${payload.email || "– (klant wordt gebeld)"}`,
        `Adres: ${payload.straat}, ${payload.postcode} ${payload.plaats}`,
        "",
        payload.omschrijving,
      ].join("\n");
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
        `Offerteaanvraag — ${payload.naam}`,
      )}&body=${encodeURIComponent(body)}`;
      trackEvent("offerte_aanvraag_mailto");
      setStatus("mailto");
    };

    setStatus("submitting");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        form.reset();
        // Converteer alleen als de server bevestigt dat de aanvraag echt is
        // verstuurd. Een 200 alléén is niet genoeg: de honeypot-afhandeling
        // antwoordt bewust met een nep-200 (`verzonden: false`) om bots niets
        // te verraden, en zo'n hit mag nooit als aanvraag meetellen.
        //
        // Bewust `!== false` en niet `=== true`: kan het antwoord niet gelezen
        // worden, dan is de mail wél verstuurd (de route geeft 502 als dat
        // mislukt) en is een getelde conversie juist. Alleen een expliciete
        // ontkenning onderdrukt de meting.
        const antwoord = (await res.json().catch(() => null)) as {
          verzonden?: boolean;
        } | null;
        if (antwoord?.verzonden !== false) {
          trackEvent("offerte_aanvraag", {
            methode: "formulier",
            ...(variant ? { variant } : {}),
          });
          // Zonder vaste tarieven kent het formulier geen bedrag meer, dus de
          // conversie gaat zonder waarde mee. Wilt u Google Ads op omzet laten
          // sturen, dan hoort die waarde uit het geoffreerde bedrag te komen —
          // dat vraagt om terugkoppeling vanuit de offerte, niet vanaf de site.
          trackAdsConversion(TRACKING.adsFormConversion);
        }
        setStatus("success");
      } else if (res.status === 503) {
        openMailto();
      } else if (res.status === 422) {
        // De server keurt dezelfde velden af als het formulier hierboven, dus
        // dit hoort niet voor te komen. Gebeurt het toch, dan tonen we wat er
        // mis is én de algemene melding met het e-mailadres eronder. Eerder
        // wees dit altijd naar het e-mailveld — dan zoekt iemand een fout in
        // het enige veld dat optioneel is, en komt hij er nooit meer uit.
        setFieldErrors(valideer(payload));
        setStatus("error");
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
        className="rounded-md border border-hairline bg-raised p-8 shadow-e1"
      >
        <h3 className="font-display text-h3 font-semibold">
          Uw aanvraag staat bij ons
        </h3>
        <p className="mt-3 leading-relaxed text-fg-muted">
          {SITE.reactie} U krijgt een vrijblijvende offerte met het bedrag
          erbij; pas als u daarmee akkoord gaat, plannen we de afspraak in.
        </p>
      </div>
    );
  }

  if (status === "mailto") {
    return (
      <div
        ref={resultRef}
        tabIndex={-1}
        className="rounded-md border border-hairline bg-raised p-8 shadow-e1"
      >
        <h3 className="font-display text-h3 font-semibold">
          Bijna verstuurd
        </h3>
        <p className="mt-3 leading-relaxed text-fg-muted">
          Wij hebben een e-mail voor u klaargezet met uw gegevens erin. Verstuur
          die, dan komt uw aanvraag bij ons binnen. Lukt dat niet? Mail ons dan
          rechtstreeks op{" "}
          <a className="font-semibold underline" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      // Eén keer melden dat iemand het formulier daadwerkelijk aanraakt.
      // Zonder dit event is er maar één meetpunt — de geslaagde verzending —
      // en is "niemand kwam bij het formulier" niet te onderscheiden van
      // "iedereen haakte halverwege af".
      onFocusCapture={meldStart}
      className="flex flex-col gap-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Veldje id="naam" label="Uw naam *" fout={fieldErrors.naam}>
          <input
            id="naam"
            name="naam"
            autoComplete="name"
            placeholder="Jan de Vries"
            aria-invalid={!!fieldErrors.naam}
            aria-describedby={beschrijf("naam")}
            className={inputStyles}
          />
        </Veldje>

        <Veldje
          id="telefoon"
          label="Telefoonnummer *"
          fout={fieldErrors.telefoon}
        >
          <input
            id="telefoon"
            name="telefoon"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="06 12 34 56 78"
            aria-invalid={!!fieldErrors.telefoon}
            aria-describedby={beschrijf("telefoon")}
            className={inputStyles}
          />
        </Veldje>

        <Veldje
          id="email"
          label={
            <>
              E-mailadres <span className="normal-case">(optioneel)</span>
            </>
          }
          fout={fieldErrors.email}
          className="sm:col-span-2"
        >
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="jan@voorbeeld.nl"
            aria-invalid={!!fieldErrors.email}
            aria-describedby={beschrijf("email")}
            className={inputStyles}
          />
        </Veldje>

        <Veldje
          id="straat"
          label="Straat en huisnummer *"
          fout={fieldErrors.straat}
          className="sm:col-span-2"
        >
          <input
            id="straat"
            name="straat"
            autoComplete="street-address"
            placeholder="Dorpsstraat 12"
            aria-invalid={!!fieldErrors.straat}
            aria-describedby={beschrijf("straat")}
            className={inputStyles}
          />
        </Veldje>

        <Veldje id="postcode" label="Postcode *" fout={fieldErrors.postcode}>
          <input
            id="postcode"
            name="postcode"
            autoComplete="postal-code"
            placeholder="3511 AB"
            aria-invalid={!!fieldErrors.postcode}
            aria-describedby={beschrijf("postcode")}
            className={inputStyles}
          />
        </Veldje>

        <Veldje id="plaats" label="Plaats *" fout={fieldErrors.plaats}>
          <input
            id="plaats"
            name="plaats"
            autoComplete="address-level2"
            placeholder="Utrecht"
            aria-invalid={!!fieldErrors.plaats}
            aria-describedby={beschrijf("plaats")}
            className={inputStyles}
          />
        </Veldje>

        <Veldje
          id="omschrijving"
          label={`${berichtLabel} *`}
          fout={fieldErrors.omschrijving}
          className="sm:col-span-2"
        >
          <textarea
            id="omschrijving"
            name="omschrijving"
            rows={4}
            placeholder={berichtPlaceholder}
            aria-invalid={!!fieldErrors.omschrijving}
            aria-describedby={beschrijf("omschrijving")}
            className={`${inputStyles} resize-y`}
          />
        </Veldje>
      </div>

      {/* Honeypot tegen spam — onzichtbaar voor mensen, niet voor bots. */}
      <div
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="ref_check_2">Laat dit veld leeg</label>
        <input id="ref_check_2" name="ref_check_2" tabIndex={-1} />
      </div>

      <div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-sm bg-accent px-7 text-base font-semibold text-white shadow-e1 transition-colors duration-200 ease-out hover:bg-accent-hover disabled:opacity-70 sm:w-auto"
        >
          {status === "submitting" ? "Bezig met versturen…" : submitLabel}
          <IconArrowUpRight className="h-4 w-4" />
        </button>

        {status === "error" && (
          <p className="mt-3 text-sm font-medium text-danger">
            Er ging iets mis bij het versturen. Probeer het nog eens, of mail
            ons op{" "}
            <a className="underline" href={`mailto:${SITE.email}`}>
              {SITE.email}
            </a>
            .
          </p>
        )}

        <p className="mt-3 max-w-prose text-sm leading-relaxed text-fg-muted">
          U zit nergens aan vast. De offerte is gratis en vrijblijvend; pas als
          u akkoord gaat, plannen we een afspraak. * Verplicht veld.
        </p>
      </div>
    </form>
  );
}
