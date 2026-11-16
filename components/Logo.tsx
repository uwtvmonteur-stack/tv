/* =========================================================================
   Logo
   =========================================================================
   Een televisie met een waterpasbel in het midden: het gereedschap waar de
   hele belofte op rust. De kleuren komen uit het ontwerpsysteem en niet uit
   de SVG — in een eerdere versie stonden de hexwaarden hard in dit bestand,
   waardoor het logo als enige element achterliep toen de rest van de site
   van kleur veranderde.
   ========================================================================= */

/** Alleen het beeldmerk, in de kleur van de tekst eromheen. */
export function LogoGlyph({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={className}>
      <rect
        x="11.5"
        y="15"
        width="41"
        height="27"
        rx="5.5"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        d="M24.5 24.5v8.5M39.5 24.5v8.5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      <circle cx="32" cy="28.75" r="4" fill="currentColor" />
      <path
        d="M25.5 50h13"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Het beeldmerk op een bijna-zwarte plaat, voor gebruik op papier. */
export default function LogoMark({ className = "size-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={className}>
      {/* De hoekradius ging van 16 naar 10: het hele systeem is strakker
          geworden en een sterk afgeronde plaat liep daar als enige vorm uit
          de toon. */}
      <rect width="64" height="64" rx="10" className="fill-ink-950" />
      <rect
        x="11.5"
        y="15"
        width="41"
        height="27"
        rx="5.5"
        strokeWidth="3.5"
        className="stroke-amber-300"
      />
      <path
        d="M24.5 24.5v8.5M39.5 24.5v8.5"
        strokeWidth="2.25"
        strokeLinecap="round"
        opacity="0.5"
        className="stroke-amber-300"
      />
      <circle cx="32" cy="28.75" r="3.75" className="fill-amber-300" />
      <path
        d="M25.5 50h13"
        strokeWidth="3.5"
        strokeLinecap="round"
        className="stroke-amber-300"
      />
    </svg>
  );
}

/**
 * Beeldmerk plus naam. `dark` voor een donkere achtergrond.
 *
 * `min-w-0` met `truncate` in plaats van `shrink-0`: op een smalle Android
 * (360 px) stonden logo, afspraakknop en hamburger samen net te breed, en
 * omdat niets mocht krimpen schoof de hele pagina horizontaal. Nu kort de
 * merknaam af en verandert geen enkel scherm daarboven.
 */
export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    // De maten onder `sm` zijn op een scherm van 360 pixels gemeten en niet
    // geschat: met `size-8` en `text-base` had de merknaam daar 131 pixels
    // nodig en kreeg hij er 104, waarna `truncate` er "Uw TV Mon…" van
    // maakte. Dat komt doordat de wortelmaat 18px is — `size-8` is hier 36
    // pixels en niet 32 — zodat de hele balk 12,5% ruimer opbouwt dan de
    // klassenamen doen vermoeden. Met een kleiner beeldmerk, een krappere
    // tussenruimte en één tekstmaat kleiner past de naam voluit, met ruimte
    // over. `truncate` blijft staan als vangnet voor nog smallere schermen.
    <span className="flex min-w-0 items-center gap-1.5 sm:gap-3">
      {dark ? (
        <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-white/10 text-amber-300 sm:size-10">
          <LogoGlyph className="size-5 sm:size-7" />
        </span>
      ) : (
        <LogoMark className="size-7 shrink-0 sm:size-10" />
      )}
      <span className="min-w-0 leading-none">
        <span
          className={`block truncate font-display text-sm font-extrabold tracking-tight sm:text-lg sm:tracking-normal ${
            dark ? "text-white" : "text-ink-950"
          }`}
        >
          Uw TV{" "}
          <span className={dark ? "text-amber-300" : "text-amber-700"}>
            Monteur
          </span>
        </span>
        <span
          className={`mt-1.5 hidden text-2xs font-semibold sm:block ${
            dark ? "text-ink-400" : "text-ink-600"
          }`}
        >
          {/* De slogan noemde alleen het ophangen, terwijl de monteur ook
              aansluit, installeert, een soundbar koppelt en storingen in
              beeld, geluid en verbinding verhelpt. Hij staat in de koptekst
              en de voettekst van elke pagina en zette de hele site dus neer
              als ophangbedrijf. */}
          Ophangen, aansluiten en instellen
        </span>
      </span>
    </span>
  );
}
