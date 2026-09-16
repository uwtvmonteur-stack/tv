import type { ReactNode } from "react";
import {
  IconChat,
  IconSliders,
  IconSpeaker,
  IconStar,
  IconTv,
} from "./icons";

export function Stars({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <span className="flex items-center gap-0.5 text-amber-500">
      {[0, 1, 2, 3, 4].map((i) => (
        <IconStar key={i} className={className} />
      ))}
    </span>
  );
}

export function Eyebrow({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-medium tracking-[0.2em] uppercase ring-1 ${
        light
          ? "bg-white/10 text-white/90 ring-white/20"
          : "bg-amber-600/10 text-amber-800 ring-amber-600/20"
      }`}
    >
      {children}
    </span>
  );
}

export function BezelCard({
  children,
  className = "",
  innerClassName = "",
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <div
      className={`rounded-[2rem] bg-ink/[0.04] p-1.5 ring-1 ring-ink/5 ${className}`}
    >
      <div
        className={`h-full rounded-[calc(2rem-0.375rem)] bg-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_30px_60px_-35px_rgba(25,21,18,0.18)] ${innerClassName}`}
      >
        {children}
      </div>
    </div>
  );
}

export function IconChip({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-600/10 text-amber-700">
      {children}
    </span>
  );
}

export function DienstIcon({
  slug,
  className = "h-6 w-6",
}: {
  slug: string;
  className?: string;
}) {
  switch (slug) {
    case "tv-ophangen":
      return <IconTv className={className} />;
    case "tv-installatie":
      return <IconSliders className={className} />;
    case "soundbar-installatie":
      return <IconSpeaker className={className} />;
    case "tv-instellen":
      return <IconChat className={className} />;
    default:
      return <IconTv className={className} />;
  }
}
