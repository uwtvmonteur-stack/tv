export function LogoGlyph({ className }: { className?: string }) {
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

export default function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={className}>
      <rect width="64" height="64" rx="16" fill="#191512" />
      <rect
        x="11.5"
        y="15"
        width="41"
        height="27"
        rx="5.5"
        stroke="#f59e0b"
        strokeWidth="3.5"
      />
      <path
        d="M24.5 24.5v8.5M39.5 24.5v8.5"
        stroke="#f59e0b"
        strokeWidth="2.25"
        strokeLinecap="round"
        opacity="0.5"
      />
      <circle cx="32" cy="28.75" r="3.75" fill="#f59e0b" />
      <path
        d="M25.5 50h13"
        stroke="#f59e0b"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
