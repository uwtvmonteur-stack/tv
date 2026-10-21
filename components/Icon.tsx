import type { ReactNode } from "react";

/* =========================================================================
   Eén icoonset
   =========================================================================
   Hiervoor was elk icoon een eigen component (`IconTv`, `IconCable`, ...),
   wat betekende dat elke pagina zijn eigen import-regel had en dat een lijst
   met iconen alleen met een switch-statement te maken was. Nu is de naam een
   gegeven: `<Icon name="tv" />`. Daarmee kan data een icoonnaam bevatten en
   kan een sectie een lijst renderen zonder iets van iconen te weten.

   Lijndikte 1.75 en niet 1.25: bij Sora-koppen en vette knoppen valt een
   dunne lijn weg. Op 16px komt 1.25 bovendien onder de halve pixel uit en
   wordt hij grijs in plaats van zwart.
   ========================================================================= */

const paths: Record<string, ReactNode> = {
  tv: (
    <>
      <rect x="2.5" y="4.5" width="19" height="12.5" rx="2" />
      <path d="M8.5 21h7" />
    </>
  ),
  cable: (
    <>
      <path d="M4 4v5a4 4 0 0 0 4 4h8a4 4 0 0 1 4 4v3" />
      <path d="M2.5 6.5h3M2.5 4h3" />
      <circle cx="20" cy="21" r="1" />
    </>
  ),
  speaker: (
    <>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <circle cx="12" cy="14.5" r="3.5" />
      <circle cx="12" cy="7" r="1.25" />
    </>
  ),
  sliders: (
    <>
      <path d="M4 8h10M18 8h2M4 16h2M10 16h10" />
      <circle cx="16" cy="8" r="2" />
      <circle cx="8" cy="16" r="2" />
    </>
  ),
  phone: (
    <path d="M5 4h4l1.5 4.5L8 10a12 12 0 0 0 6 6l1.5-2.5L20 15v4a1.5 1.5 0 0 1-1.6 1.5C10.3 20 4 13.7 3.5 5.6A1.5 1.5 0 0 1 5 4Z" />
  ),
  chat: (
    <>
      <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.1A9 9 0 1 0 12 3Z" />
      <path d="M8.5 10h7M8.5 13.5h4.5" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="m4 7.5 8 6 8-6" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2.5 4.5 5.5v6c0 4.5 3 8 7.5 10 4.5-2 7.5-5.5 7.5-10v-6L12 2.5Z" />
      <path d="m8.75 11.5 2.25 2.25L15.5 9.25" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.25L15.25 14" />
    </>
  ),
  check: <path d="m4.5 12.5 5 5 10-11" />,
  "check-circle": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12.25 2.5 2.5L16 9" />
    </>
  ),
  "arrow-right": <path d="M4 12h15m-6-6 6 6-6 6" />,
  "arrow-up-right": <path d="M7 17 17 7M9 7h8v8" />,
  plus: <path d="M12 5v14M5 12h14" />,
  "chevron-down": <path d="m6 9.5 6 6 6-6" />,
  "map-pin": (
    <>
      <path d="M12 21.5s-7-6.1-7-11.5a7 7 0 0 1 14 0c0 5.4-7 11.5-7 11.5Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  map: (
    <>
      <path d="m9 4 6 2 5.5-2v14L15 20l-6-2-5.5 2V6L9 4Z" />
      <path d="M9 4v14M15 6v14" />
    </>
  ),
  euro: (
    <>
      <path d="M17.5 5.5a7 7 0 1 0 0 13" />
      <path d="M4.5 10h8M4.5 14h8" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 10h17M8 3.5v3M16 3.5v3" />
    </>
  ),
  /** Waterpas — het gereedschap dat het verschil maakt tussen recht en bijna recht. */
  level: (
    <>
      <rect x="2.5" y="8.5" width="19" height="7" rx="2" />
      <circle cx="12" cy="12" r="1.75" />
      <path d="M7 12h1.5M15.5 12H17" />
    </>
  ),
  drill: (
    <>
      <path d="M4 7h9a3 3 0 0 1 3 3v1H4V7Z" />
      <path d="M16 9h3l1.5 1.5L19 12h-3M7 11v4a2 2 0 0 0 2 2h1v3" />
    </>
  ),
  tool: (
    <path d="M14.5 3.5a5 5 0 0 0-6.4 6.4L3 15v3.5a1.5 1.5 0 0 0 1.5 1.5H8l5.1-5.1a5 5 0 0 0 6.4-6.4L16.5 11l-3.5-3.5 1.5-4Z" />
  ),
  home: (
    <>
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9.5Z" />
      <path d="M9.5 21v-6h5v6" />
    </>
  ),
  flame: (
    <path d="M12 2.5c3.5 4 6.5 6 6.5 10.5a6.5 6.5 0 0 1-13 0C5.5 10 7 8.5 9 7c0 2 .5 3.5 2 4 .5-3.5.5-6.5 1-8.5Z" />
  ),
  "thumbs-up": (
    <>
      <path d="M7 10.5 11 3a2.5 2.5 0 0 1 2.5 2.5V9h4.5a2 2 0 0 1 2 2.4l-1.3 6.2A2.5 2.5 0 0 1 16.2 20H7" />
      <rect x="2.5" y="10.5" width="4.5" height="9.5" rx="1.25" />
    </>
  ),
  lock: (
    <>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5.5M12 7.75h.01" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.3A9 9 0 1 0 12 3Z" />
      <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5.6 0 1-.5 1-1l-1.5-.8-1 .8a5 5 0 0 1-2.3-2.3l.8-1L10.5 9c-.5 0-1.5 0-1.5.5Z" />
    </>
  ),
};

export type IconName = keyof typeof paths;

/** Sterretje — apart omdat het het enige gevulde icoon is. */
export function Star({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 2.75l2.85 5.78 6.38.93-4.62 4.5 1.09 6.36L12 17.32l-5.7 3-1.09-6.36-4.62-4.5 6.38-.93L12 2.75z" />
    </svg>
  );
}

export function Stars({
  className = "size-4",
  dark = false,
}: {
  className?: string;
  /**
   * Op een bijna-zwarte achtergrond is accent-500 te donker om als sterretje
   * te lezen; accent-300 houdt daar de vorm vast. Op wit is het omgekeerd.
   */
  dark?: boolean;
}) {
  return (
    <span
      className={`flex items-center gap-0.5 ${dark ? "text-accent-300" : "text-accent-500"}`}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} className={className} />
      ))}
    </span>
  );
}

export function Icon({
  name,
  className = "size-5",
  strokeWidth = 1.75,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}

/** Het icoon dat bij een dienst hoort, zodat data alleen een slug hoeft te kennen. */
export function DienstIcon({
  slug,
  className = "size-6",
}: {
  slug: string;
  className?: string;
}) {
  const map: Record<string, IconName> = {
    "tv-ophangen": "tv",
    "tv-installatie": "sliders",
    "soundbar-installatie": "speaker",
    "tv-instellen": "chat",
    "kabels-wegwerken": "cable",
    "tv-boven-open-haard": "flame",
    "tv-ophangen-gipswand": "level",
  };
  return <Icon name={map[slug] ?? "tv"} className={className} />;
}
