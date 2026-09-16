"use client";

import { useId, useState } from "react";
import { IconPlus } from "./icons";
import type { FaqItem } from "@/lib/content";

export default function Faq({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const btnId = `${baseId}-btn-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <div
            key={item.q}
            className="rounded-[1.75rem] bg-ink/[0.04] p-1.5 ring-1 ring-ink/5"
          >
            <div className="rounded-[calc(1.75rem-0.375rem)] bg-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]">
              <h3 className="m-0">
                <button
                  type="button"
                  id={btnId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-display text-base font-semibold tracking-tight md:text-lg"
                >
                  <span>{item.q}</span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink/5 transition-transform duration-500 ease-fluid ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    <IconPlus className="h-4 w-4" />
                  </span>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={btnId}
                aria-hidden={!isOpen}
                className="grid transition-[grid-template-rows] duration-500 ease-fluid"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-6 text-[15px] leading-relaxed text-ink-soft">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
