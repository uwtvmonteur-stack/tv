type IconProps = { className?: string };

function Base({
  className,
  children,
  filled = false,
}: IconProps & { children: React.ReactNode; filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

export function IconTv({ className }: IconProps) {
  return (
    <Base className={className}>
      <rect x="2.5" y="4.5" width="19" height="12.5" rx="2" />
      <path d="M8.5 21h7" />
    </Base>
  );
}

export function IconCable({ className }: IconProps) {
  return (
    <Base className={className}>
      <path d="M4 4v5a4 4 0 0 0 4 4h8a4 4 0 0 1 4 4v3" />
      <path d="M2.5 6.5h3M2.5 4h3" />
      <circle cx="20" cy="21" r="1" />
    </Base>
  );
}

export function IconSpeaker({ className }: IconProps) {
  return (
    <Base className={className}>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <circle cx="12" cy="14.5" r="3.5" />
      <circle cx="12" cy="7" r="1.25" />
    </Base>
  );
}

export function IconSliders({ className }: IconProps) {
  return (
    <Base className={className}>
      <path d="M4 8h10M18 8h2M4 16h2M10 16h10" />
      <circle cx="16" cy="8" r="2" />
      <circle cx="8" cy="16" r="2" />
    </Base>
  );
}

export function IconPhone({ className }: IconProps) {
  return (
    <Base className={className}>
      <path d="M5 4h4l1.5 4.5L8 10a12 12 0 0 0 6 6l1.5-2.5L20 15v4a1.5 1.5 0 0 1-1.6 1.5C10.3 20 4 13.7 3.5 5.6A1.5 1.5 0 0 1 5 4Z" />
    </Base>
  );
}

export function IconChat({ className }: IconProps) {
  return (
    <Base className={className}>
      <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.1A9 9 0 1 0 12 3Z" />
      <path d="M8.5 10h7M8.5 13.5h4.5" />
    </Base>
  );
}

export function IconMail({ className }: IconProps) {
  return (
    <Base className={className}>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="m4 7.5 8 6 8-6" />
    </Base>
  );
}

export function IconShield({ className }: IconProps) {
  return (
    <Base className={className}>
      <path d="M12 2.5 4.5 5.5v6c0 4.5 3 8 7.5 10 4.5-2 7.5-5.5 7.5-10v-6L12 2.5Z" />
      <path d="m8.75 11.5 2.25 2.25L15.5 9.25" />
    </Base>
  );
}

export function IconClock({ className }: IconProps) {
  return (
    <Base className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.25L15.25 14" />
    </Base>
  );
}

export function IconStar({ className }: IconProps) {
  return (
    <Base className={className} filled>
      <path d="M12 2.75l2.85 5.78 6.38.93-4.62 4.5 1.09 6.36L12 17.32l-5.7 3-1.09-6.36-4.62-4.5 6.38-.93L12 2.75z" />
    </Base>
  );
}

export function IconCheck({ className }: IconProps) {
  return (
    <Base className={className}>
      <path d="m4.5 12.5 5 5 10-11" />
    </Base>
  );
}

export function IconArrowUpRight({ className }: IconProps) {
  return (
    <Base className={className}>
      <path d="M7 17 17 7M9 7h8v8" />
    </Base>
  );
}

export function IconPlus({ className }: IconProps) {
  return (
    <Base className={className}>
      <path d="M12 5v14M5 12h14" />
    </Base>
  );
}

export function IconMapPin({ className }: IconProps) {
  return (
    <Base className={className}>
      <path d="M12 21.5s-7-6.1-7-11.5a7 7 0 0 1 14 0c0 5.4-7 11.5-7 11.5Z" />
      <circle cx="12" cy="10" r="2.5" />
    </Base>
  );
}
