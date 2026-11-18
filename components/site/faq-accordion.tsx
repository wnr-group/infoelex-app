"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { EASE } from "@/components/home/motion";
import { cn } from "@/lib/utils";

export type FaqItem = { q: string; a: string };

/** One-open-at-a-time accordion. Buttons carry aria-expanded and control their panel; height animates smoothly. */
export function FaqAccordion({ items, className }: { items: readonly FaqItem[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <ul className={cn("divide-y divide-white/10 overflow-hidden rounded-md border border-white/10 bg-white/[0.03]", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${base}-panel-${i}`;
        const buttonId = `${base}-button-${i}`;
        return (
          <li key={item.q} className={cn("relative transition-colors duration-300", isOpen && "bg-white/[0.05]")}>
            <span aria-hidden className={cn("absolute inset-y-0 left-0 w-0.5 bg-brand transition-opacity duration-300", isOpen ? "opacity-100" : "opacity-0")} />
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center gap-4 px-5 py-5 text-left outline-none focus-visible:bg-white/[0.06] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand sm:px-7 sm:py-6"
              >
                <span className="font-display w-7 shrink-0 text-[12px] font-bold tabular-nums text-brand">{String(i + 1).padStart(2, "0")}</span>
                <span className={cn("flex-1 text-[15px] font-semibold leading-snug transition-colors duration-300 sm:text-[15px]", isOpen ? "text-white" : "text-paper/80 group-hover:text-white")}>
                  {item.q}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300",
                    isOpen ? "rotate-45 border-brand bg-brand text-white" : "border-white/20 text-paper/70 group-hover:border-white/50"
                  )}
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  key="panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-6 pl-[3.75rem] pr-5 text-[14px] leading-relaxed text-paper/65 sm:pl-[4.75rem] sm:pr-7">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
