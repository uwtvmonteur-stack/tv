"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { Icon, type IconName } from "./Icon";
import { trackAdsConversion, trackEvent } from "./Analytics";
import { SITE, TRACKING } from "@/lib/site";

// Het formulier wordt via de eigen API-route (app/api/afspraak/route.ts) per
// SMTP verstuurd. De SMTP-gegevens staan als Environment Variables op Vercel.
// Antwoordt de server met 503 (SMTP niet geconfigureerd), dan valt het
// formulier terug op een e-mailconcept (mailto) — een noodoplossing.
const ENDPOINT = "/api/afspraak";

/**
 * Een offerteaanvraag vraagt om vier dingen en niet meer: uw naam, uw
 * telefoonnummer, uw postcode en wat er moet gebeuren.
 *
 * Hiervoor stond hier een configurator met het tv-formaat, de beugelvraag,
 * extra's, een datumkiezer en een meelopende prijs. Die hoorde bij vaste
 * tarieven per formaat. Nu de prijs uit een offerte komt, is elke vraag die
 * niet nodig is om die offerte te maken puur een reden om af te haken.
 *
 * Om diezelfde reden staan hier geen straatnaam, huisnummer en woonplaats
 * meer. Voor een offerte is de postcode genoeg: die bepaalt de rit en of de
 * plaats in het werkgebied valt. Het volledige adres is pas nodig om de
 * afspraak in te plannen, en dat gebeurt nadat iemand akkoord is. Zo vraagt
 * het formulier niet om een huisadres op het moment dat er nog geen bedrag
 * tegenover staat — twee velden minder, en twee verplichte vragen minder.
 */
const VELDEN = [
  "naam",
  "telefoon",
  "email",
  "postcode",
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

function valideer(p: Record<Veld, string>): FieldErrors {
  const fouten: FieldErrors = {};
  if (!p.naam.trim()) fouten.naam = "Wij willen graag weten hoe we u mogen noemen.";
  if (p.telefoon.replace(/\D/g, "").length < 9)
    fouten.telefoon = "Vul een telefoonnummer in waarop wij u kunnen bereiken.";
  // E-mail is optioneel: wij bellen u. Staat er wél iets, dan moet het kloppen.
  if (p.email && !EMAIL_RE.test(p.email))
    fouten.email =
      "Dit e-mailadres lijkt niet compleet. U mag het ook leeglaten; dan bellen we u.";
  if (!POSTCODE_RE.test(p.postcode.trim()))
    fouten.postcode = "Vul een geldige postcode in, bijvoorbeeld 3511 AB.";
  if (p.omschrijving.trim().length < 10)
    fouten.omschrijving =
      "Vertel kort wat er moet gebeuren; daarmee kunnen wij een offerte maken.";
  return fouten;
}

/**
 * Het sterretje bij een verplicht veld; de uitleg staat onder de knop.
 * Bewust niet `aria-hidden`: de velden hebben geen `required`-attribuut (het
 * formulier valideert zelf), dus dit sterretje is het enige wat een
 * schermlezer vertelt dat een veld verplicht is.
 */
const Verplicht = () => <span className="text-danger">*</span>;

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="field-error flex items-start gap-1.5">
      <Icon name="info" className="mt-0.5 size-4 shrink-0" />
      <span>{message}</span>
    </p>
  );
}

function Veldje({
  id,
  label,
  uitleg,
  children,
  fout,
  className = "",
}: {
  id: string;
  label: ReactNode;
  /**
   * Korte uitleg onder het veld. Alleen daar waar een veld een vraag oproept:
   * "waarom wilt u dit weten?" is bij een offerteaanvraag een reden om te
   * stoppen, en dat antwoord hoort naast het veld te staan en niet in de
   * privacyverklaring.
   */
  uitleg?: ReactNode;
  children: ReactNode;
  fout?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="label">
        {label}
      </label>
      {children}
      {uitleg && (
        <p id={`${id}-uitleg`} className="mt-1.5 text-sm text-ink-500">
          {uitleg}
        </p>
      )}
      <FieldError id={`${id}-fout`} message={fout} />
    </div>
  );
}

/** Het antwoordpaneel dat na het verzenden in de plaats van het formulier komt. */
function Paneel({
  titel,
  icoon,
  children,
  paneelRef,
}: {
  titel: string;
  icoon: IconName;
  children: ReactNode;
  paneelRef: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div ref={paneelRef} tabIndex={-1} className="card p-6 sm:p-8">
      <span className="grid size-12 place-items-center rounded-xl bg-accent-50 text-accent-700 ring-1 ring-accent-200">
        <Icon name={icoon} className="size-6" />
      </span>
      <h3 className="mt-5 text-h3">{titel}</h3>
      <p className="mt-3 text-ink-600">{children}</p>
    </div>
  );
}

export default function ContactForm({
  variant,
  /**
   * Hier stond even "Vraag mijn offerte aan": eerste persoon leest beter op de
   * knop die daadwerkelijk verstuurt. Gemeten op 360px loopt dat label over
   * twee regels — de knop houdt binnen `px-6` 224px over en de tekst vraagt
   * met de pijl ongeveer 237px. Een omgevouwen hoofdknop op elke telefoon
   * kost meer dan de formulering oplevert, dus het blijft dit.
   */
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

  // Een veld kan zowel een uitleg als een foutmelding onder zich hebben. Een
  // schermlezer moet ze beide horen en in die volgorde, dus worden de id's
  // samengevoegd in plaats van dat de fout de uitleg verdringt.
  const beschrijf = (veld: Veld, heeftUitleg = false) =>
    [heeftUitleg ? `${veld}-uitleg` : "", fieldErrors[veld] ? `${veld}-fout` : ""]
      .filter(Boolean)
      .join(" ") || undefined;

  // Het foute veld krijgt een rode ring boven op `input`. Een foutmelding die
  // alleen onder het veld staat, wordt op een volle telefoonschermhoogte
  // gemist; de rand wijst aan wáár gekeken moet worden.
  const veldKlasse = (veld: Veld) =>
    fieldErrors[veld] ? "input ring-2 ring-danger" : "input";

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
        `Postcode: ${payload.postcode}`,
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
      <Paneel
        paneelRef={resultRef}
        icoon="check-circle"
        titel="Uw aanvraag staat bij ons"
      >
        {SITE.reactie} U krijgt een vrijblijvende offerte met het bedrag erbij;
        pas als u daarmee akkoord gaat, plannen we de afspraak in.
      </Paneel>
    );
  }

  if (status === "mailto") {
    return (
      <Paneel paneelRef={resultRef} icoon="mail" titel="Bijna verstuurd">
        Wij hebben een e-mail voor u klaargezet met uw gegevens erin. Verstuur
        die, dan komt uw aanvraag bij ons binnen. Lukt dat niet? Mail ons dan
        rechtstreeks op{" "}
        <a className="link" href={`mailto:${SITE.email}`}>
          {SITE.email}
        </a>
        .
      </Paneel>
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
      className="card flex flex-col gap-6 p-6 sm:p-8"
    >
      {/* Alleen de kop. Hier stond daaronder dezelfde alinea die de sectie
          erboven al voert ("uw gegevens, uw adres en wat er moet gebeuren,
          binnen enkele uren het bedrag") — twee keer dezelfde zin, precies op
          de plek waar de bezoeker wil beginnen met invullen. Het eerste veld
          stond daardoor een alinea lager dan nodig, op een telefoon bijna een
          half scherm. */}
      <h3 className="text-h3">Uw offerteaanvraag</h3>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        <Veldje
          id="naam"
          label={
            <>
              Uw naam <Verplicht />
            </>
          }
          fout={fieldErrors.naam}
        >
          <input
            id="naam"
            name="naam"
            autoComplete="name"
            placeholder="Jan de Vries"
            aria-invalid={!!fieldErrors.naam}
            aria-describedby={beschrijf("naam")}
            className={veldKlasse("naam")}
          />
        </Veldje>

        <Veldje
          id="telefoon"
          label={
            <>
              Telefoonnummer <Verplicht />
            </>
          }
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
            className={veldKlasse("telefoon")}
          />
        </Veldje>

        <Veldje
          id="postcode"
          label={
            <>
              Postcode <Verplicht />
            </>
          }
          // Eén zin, en wel deze. Hier stonden er twee ("hiermee weten wij of
          // wij bij u komen en wat de rit is" ervoor), samen vier regels grijze
          // tekst midden in het formulier op 360px. Waarvoor een postcode
          // dient weet iedereen; dat het huisadres níet gevraagd wordt is het
          // onverwachte deel, en dat is de regel die een bezoeker over de
          // streep helpt.
          uitleg="Uw straat en huisnummer vragen wij pas als u akkoord gaat met de offerte."
          fout={fieldErrors.postcode}
        >
          <input
            id="postcode"
            name="postcode"
            autoComplete="postal-code"
            placeholder="3511 AB"
            aria-invalid={!!fieldErrors.postcode}
            aria-describedby={beschrijf("postcode", true)}
            className={veldKlasse("postcode")}
          />
        </Veldje>

        <Veldje
          id="email"
          label={
            <>
              E-mailadres{" "}
              <span className="font-normal text-ink-500">(optioneel)</span>
            </>
          }
          fout={fieldErrors.email}
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
            className={veldKlasse("email")}
          />
        </Veldje>

        <Veldje
          id="omschrijving"
          label={
            <>
              {berichtLabel} <Verplicht />
            </>
          }
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
            className={`${veldKlasse("omschrijving")} resize-y`}
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
          className="btn-primary btn-lg w-full"
        >
          {status === "submitting" ? (
            <>
              <span
                className="size-5 animate-spin rounded-full border-2 border-ink-950/25 border-t-ink-950"
                aria-hidden="true"
              />
              Bezig met versturen…
            </>
          ) : (
            <>
              {submitLabel}
              <Icon name="arrow-right" className="size-5" />
            </>
          )}
        </button>

        {status === "error" && (
          <p
            role="alert"
            className="mt-4 rounded-xl bg-danger/10 p-4 text-sm font-semibold text-danger ring-1 ring-danger/20"
          >
            Er ging iets mis bij het versturen. Probeer het nog eens, of mail
            ons op{" "}
            <a className="underline" href={`mailto:${SITE.email}`}>
              {SITE.email}
            </a>
            .
          </p>
        )}

        <p className="mt-4 flex items-start gap-2 text-sm text-ink-500">
          <Icon name="lock" className="mt-0.5 size-4 shrink-0" />
          <span>
            Velden met * zijn verplicht. Wij gebruiken uw gegevens alleen om u
            deze offerte te sturen — geen nieuwsbrief, geen spam.
          </span>
        </p>
      </div>
    </form>
  );
}
