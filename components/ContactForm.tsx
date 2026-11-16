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
 * Een afspraakaanvraag vraagt om wat er nodig is om die afspraak te maken:
 * uw naam, uw telefoonnummer, uw adres en wat er moet gebeuren.
 *
 * Er stond hier eens een configurator met het tv-formaat, de beugelvraag,
 * extra's, een datumkiezer en een meelopende prijs. Elke vraag die niet nodig
 * is om de afspraak te maken, is een reden om af te haken.
 *
 * Het volledige adres stond hier bewust NIET, en die reden gold: elk extra
 * veld kost aanvragen. Op 16-11-2026 heeft de eigenaar straatnaam,
 * huisnummer en woonplaats er alsnog in laten zetten, met een eigen goede
 * reden: met een compleet adres kan de afspraak in een keer ingepland worden
 * in plaats van dat er eerst teruggebeld moet worden om de straat te vragen.
 *
 * Wie dat ooit omdraait: haal `<Verplicht />` uit de drie labels en de drie
 * regels uit `valideer()`. De velden mogen dan blijven staan, alleen niet
 * meer verplicht. De server eist ze overigens niet (zie
 * app/api/afspraak/route.ts): een bezoeker met een gecachte oude pagina mag
 * nooit een aanvraag verliezen op een veld dat zijn pagina niet had.
 */
const VELDEN = [
  "naam",
  "telefoon",
  "email",
  "straat",
  "huisnummer",
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
    fouten.straat = "Vul uw straatnaam in, dan weet de monteur waar hij moet zijn.";
  if (!p.huisnummer.trim()) fouten.huisnummer = "Vul uw huisnummer in.";
  if (!POSTCODE_RE.test(p.postcode.trim()))
    fouten.postcode = "Vul een geldige postcode in, bijvoorbeeld 3511 AB.";
  if (!p.plaats.trim()) fouten.plaats = "Vul uw woonplaats in.";
  if (p.omschrijving.trim().length < 10)
    fouten.omschrijving =
      "Vertel kort wat er moet gebeuren, dan komt de monteur voorbereid.";
  return fouten;
}

/**
 * Het sterretje bij een verplicht veld; de uitleg staat onder de knop.
 *
 * Wel `aria-hidden`. Hier stond het tegenovergestelde, met de redenering dat
 * dit sterretje het enige was wat een schermlezer over "verplicht" vertelde.
 * Dat was juist het probleem: een los sterretje wordt als "ster" of als niets
 * voorgelezen, en de uitleg staat pas ná de verzendknop. De velden dragen nu
 * `aria-required="true"`, en dát is wat een schermlezer aankondigt bij het
 * veld zelf. Het sterretje is daarmee nog alleen een visueel teken, en de
 * regel onder de knop blijft staan waar hij staat: een alinea boven het
 * eerste veld duwde dat veld op een telefoon bijna een half scherm omlaag.
 */
const Verplicht = () => (
  <span aria-hidden="true" className="text-danger">
    *
  </span>
);

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="veld-fout flex items-start gap-1.5">
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
   * "waarom wilt u dit weten?" is bij een afspraakaanvraag een reden om te
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
      <label htmlFor={id} className="veld-label">
        {label}
      </label>
      {children}
      {uitleg && (
        <p id={`${id}-uitleg`} className="mt-1.5 text-sm text-ink-600">
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
    <div
      ref={paneelRef}
      tabIndex={-1}
      className="paneel border-t-4 border-t-amber-400 p-6 sm:p-8"
    >
      <Icon name={icoon} className="size-8 text-amber-700" />
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
  submitLabel = "Afspraak maken",
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

  // Het foute veld krijgt een rode rand in plaats van de gewone. Een
  // foutmelding die alleen onder het veld staat, wordt op een volle
  // telefoonschermhoogte gemist; de rand wijst aan wáár gekeken moet worden.
  // Een echte rand en geen `ring`: een ring is een box-shadow, en die laat
  // Windows in hoog-contrastmodus weg — dan bleef de fout onzichtbaar.
  const veldKlasse = (veld: Veld) =>
    fieldErrors[veld] ? "veld border-2 border-danger" : "veld";

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
      // In schermvolgorde en niet in de volgorde waarin `valideer()` toevallig
      // controleert. Die laatste loopt naam, telefoon, e-mail, postcode,
      // terwijl de velden op het scherm staan als naam, telefoon, postcode,
      // e-mail: waren postcode én e-mail fout, dan sprong de focus naar het
      // e-mailveld en scrolde de bezoeker langs de fout erboven heen.
      const opScherm: Veld[] = [
        "naam",
        "telefoon",
        "straat",
        "huisnummer",
        "postcode",
        "plaats",
        "email",
        "omschrijving",
      ];
      const eerste = opScherm.find((veld) => fouten[veld]);
      if (eerste) form.querySelector<HTMLInputElement>(`#${eerste}`)?.focus();
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
        `Adres: ${payload.straat} ${payload.huisnummer}`,
        `Postcode en plaats: ${payload.postcode} ${payload.plaats}`,
        "",
        payload.omschrijving,
      ].join("\n");
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
        `Afspraakaanvraag — ${payload.naam}`,
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
        // Zonder tijdslimiet blijft de knop bij een stille SMTP-server
        // minutenlang op "Bezig met versturen" staan en kan de bezoeker
        // niets. Twintig seconden is ruim voor een trage mobiele verbinding
        // en kort genoeg om nog een tweede poging te doen. De `catch`
        // hieronder vangt het af als de melding met het e-mailadres.
        signal: AbortSignal.timeout(20000),
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
          // De conversie gaat zonder waarde mee. Wilt u Google Ads op omzet
          // laten sturen, dan hoort die waarde uit het geoffreerde bedrag te
          // komen — dat vraagt om terugkoppeling vanuit de afspraak, niet
          // vanaf de site.
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
        const serverFouten = valideer(payload);
        // Het formulier en de server keuren e-mailadressen niet identiek:
        // de server weigert tekens als een apostrof of een komma die het
        // formulier doorlaat. Zonder deze regel zag een bezoeker met
        // `o'brien@gmail.com` alleen "er ging iets mis", bij geen enkel veld
        // een fout, en elke nieuwe poging gaf hetzelfde. Het e-mailveld is
        // optioneel, dus de uitweg is hem leeg laten — maar dat moet er wel
        // staan.
        if (!Object.keys(serverFouten).length && payload.email.trim()) {
          serverFouten.email =
            "Dit e-mailadres kunnen wij niet verwerken. Controleer het, of laat het leeg — dan bellen wij u.";
        }
        setFieldErrors(serverFouten);
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
        titel="Uw afspraak is aangevraagd"
      >
        {SITE.reactie} Het tarief dat op deze pagina staat is het bedrag dat u
        betaalt; u zit tot dat gesprek nergens aan vast.
      </Paneel>
    );
  }

  if (status === "mailto") {
    return (
      <Paneel paneelRef={resultRef} icoon="mail" titel="Bijna verstuurd">
        Wij hebben een e-mail voor u klaargezet met uw gegevens erin. Verstuur
        die, dan komt uw afspraak bij ons binnen. Lukt dat niet? Mail ons dan
        rechtstreeks op{" "}
        <a className="verwijzing" href={`mailto:${SITE.email}`}>
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
      // De amberen streep bovenlangs is het enige sieraad: hij markeert dit
      // paneel als de plek waar het om gaat, zonder dat er een tweede
      // gekleurd vlak op het scherm komt dat met de knop concurreert.
      className="paneel flex flex-col gap-6 border-t-4 border-t-amber-400 p-6 sm:p-8"
    >
      {/* Alleen de kop. Hier stond daaronder dezelfde alinea die de sectie
          erboven al voert ("uw gegevens, uw adres en wat er moet gebeuren,
          binnen enkele uren het bedrag") — twee keer dezelfde zin, precies op
          de plek waar de bezoeker wil beginnen met invullen. Het eerste veld
          stond daardoor een alinea lager dan nodig, op een telefoon bijna een
          half scherm. */}
      <h3 className="text-h3">Uw afspraak</h3>

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
            aria-required="true"
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
            aria-required="true"
            aria-invalid={!!fieldErrors.telefoon}
            aria-describedby={beschrijf("telefoon")}
            className={veldKlasse("telefoon")}
          />
        </Veldje>

        {/* Het volledige adres, op twee regels in de volgorde die iedereen
            kent: straat en nummer, dan postcode en plaats. Voorheen stond
            hier alleen de postcode; sinds 16-11-2026 vraagt het formulier het
            hele adres, zodat de monteur de afspraak in een keer kan inplannen
            in plaats van eerst terug te bellen. */}
        <Veldje
          id="straat"
          label={
            <>
              Straatnaam <Verplicht />
            </>
          }
          fout={fieldErrors.straat}
        >
          {/* `autoComplete="off"` en niet `address-line1`. Er bestaat geen
              HTML-token voor alleen een straatnaam: browsers vullen
              `address-line1` met straat én huisnummer ("Dorpsstraat 12"). Dan
              staat het nummer twee keer in de aanvraag, of Huisnummer blijft
              leeg terwijl de browser denkt dat hij het heeft gevuld — en dan
              klaagt onze eigen validatie over een veld dat de bezoeker al
              gevuld dacht te hebben. Postcode en woonplaats hebben wél een
              eenduidig token en houden hun autofill. */}
          <input
            id="straat"
            name="straat"
            autoComplete="off"
            placeholder="Dorpsstraat"
            aria-required="true"
            aria-invalid={!!fieldErrors.straat}
            aria-describedby={beschrijf("straat")}
            className={veldKlasse("straat")}
          />
        </Veldje>

        <Veldje
          id="huisnummer"
          label={
            <>
              Huisnummer <Verplicht />
            </>
          }
          fout={fieldErrors.huisnummer}
        >
          {/* Geen inputMode="numeric": een huisnummer is vaak "12 B" of
              "7-bis", en een cijfertoetsenbord maakt dat juist moeilijker. */}
          <input
            id="huisnummer"
            name="huisnummer"
            autoComplete="off"
            placeholder="12 B"
            aria-required="true"
            aria-invalid={!!fieldErrors.huisnummer}
            aria-describedby={beschrijf("huisnummer")}
            className={veldKlasse("huisnummer")}
          />
        </Veldje>

        <Veldje
          id="postcode"
          label={
            <>
              Postcode <Verplicht />
            </>
          }
          fout={fieldErrors.postcode}
        >
          {/* De placeholder draagt het formaat. Die staat daarom op ink-500
              (4,83:1) en niet lichter: hij is hier geen versiering. */}
          <input
            id="postcode"
            name="postcode"
            autoComplete="postal-code"
            placeholder="3511 AB"
            aria-required="true"
            aria-invalid={!!fieldErrors.postcode}
            aria-describedby={beschrijf("postcode")}
            className={veldKlasse("postcode")}
          />
        </Veldje>

        <Veldje
          id="plaats"
          label={
            <>
              Woonplaats <Verplicht />
            </>
          }
          fout={fieldErrors.plaats}
        >
          <input
            id="plaats"
            name="plaats"
            autoComplete="address-level2"
            placeholder="Utrecht"
            aria-required="true"
            aria-invalid={!!fieldErrors.plaats}
            aria-describedby={beschrijf("plaats")}
            className={veldKlasse("plaats")}
          />
        </Veldje>

        <Veldje
          id="email"
          label={
            <>
              E-mailadres{" "}
              <span className="font-normal text-ink-600">(optioneel)</span>
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
            aria-required="true"
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
          className="knop-vol knop-groot w-full"
        >
          {status === "submitting" ? (
            <>
              {/* Bijna-zwart op de amberen knop, net als de knoptekst zelf.
                  Een wit rondje zou op dit amber vrijwel onzichtbaar zijn. */}
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
            className="mt-4 rounded-lg border border-danger/30 bg-danger/8 p-4 text-sm font-semibold text-danger"
          >
            Er ging iets mis bij het versturen. Probeer het nog eens, of mail
            ons op{" "}
            <a className="underline" href={`mailto:${SITE.email}`}>
              {SITE.email}
            </a>
            .
          </p>
        )}

        <p className="mt-4 flex items-start gap-2 text-sm text-ink-600">
          <Icon name="lock" className="mt-0.5 size-4 shrink-0" />
          <span>
            Velden met * zijn verplicht. Wij gebruiken uw gegevens alleen voor
            deze afspraak — geen nieuwsbrief, geen spam.
          </span>
        </p>
      </div>
    </form>
  );
}
