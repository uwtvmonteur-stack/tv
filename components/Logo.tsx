/* =========================================================================
   Logo
   =========================================================================
   Een televisie met een waterpasbel in het midden: het gereedschap waar de
   hele belofte op rust. De kleuren komen uit het ontwerpsysteem en niet uit
   de SVG — in de vorige versie stonden #191512 en #f59e0b hard in dit
   bestand, waardoor het logo als enige element achterliep toen de rest van
   de site van kleur veranderde.
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

/** Het beeldmerk op een bijna-zwarte plaat, voor gebruik op wit. */
export default function LogoMark({ className = "size-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={className}>
      <rect width="64" height="64" rx="16" className="fill-ink-950" />
      <rect
        x="11.5"
        y="15"
        width="41"
        height="27"
        rx="5.5"
        strokeWidth="3.5"
        className="stroke-accent-400"
      />
      <path
        d="M24.5 24.5v8.5M39.5 24.5v8.5"
        strokeWidth="2.25"
        strokeLinecap="round"
        opacity="0.5"
        className="stroke-accent-400"
      />
      <circle cx="32" cy="28.75" r="3.75" className="fill-accent-400" />
      <path
        d="M25.5 50h13"
        strokeWidth="3.5"
        strokeLinecap="round"
        className="stroke-accent-400"
      />
    </svg>
  );
}

/**
 * Beeldmerk plus naam. `dark` voor een donkere achtergrond.
 *
 * `min-w-0` met `truncate` in plaats van `shrink-0`: op een smalle Android
 * (360 px) stonden logo, offerteknop en hamburger samen net te breed, en
 * omdat niets mocht krimpen schoof de hele pagina horizontaal. Nu kort de
 * merknaam af en verandert geen enkel scherm daarboven.
 */
export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex min-w-0 items-center gap-1.5 sm:gap-2.5">
      {dark ? (
        <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-white/10 text-accent-300 sm:size-10">
          <LogoGlyph className="size-6 sm:size-7" />
        </span>
      ) : (
        <LogoMark className="size-8 shrink-0 sm:size-10" />
      )}
      <span className="min-w-0 leading-none">
        <span
          className={`block truncate font-display text-base font-bold tracking-tight sm:text-lg sm:tracking-normal ${
            dark ? "text-white" : "text-ink-950"
          }`}
        >
          Uw TV{" "}
          <span className={dark ? "text-accent-300" : "text-accent-700"}>
            Monteur
          </span>
        </span>
        <span
          className={`mt-1.5 hidden text-2xs font-semibold sm:block ${
            dark ? "text-ink-400" : "text-ink-500"
          }`}
        >
          Tv ophangen aan huis
        </span>
      </span>
    </span>
  );
}
