"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

export default function Reveal({
  children,
  delay = 0,
  className = "",
  immediate = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Sla de scroll-reveal over voor above-the-fold content (LCP). */
  immediate?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (immediate) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            io.disconnect();
          }
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -4% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [immediate]);

  if (immediate) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ "--reveal-delay": `${Math.min(delay, 200)}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
