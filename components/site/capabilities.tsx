"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/components/home/motion";
import { cn } from "@/lib/utils";
import { CAPABILITIES } from "./data";
import { CapabilityDrawing } from "./diagrams";
import { CtaBand, PageHero } from "./primitives";

type Cap = (typeof CAPABILITIES)[number];

function Detail({ cap }: { cap: Cap }) {
  return (
    <div>
      <p className="text-lg leading-relaxed text-graphite-800">{cap.lead}</p>
      <ul className="mt-6 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
        {cap.points.map((p) => (
          <li key={p} className="flex gap-3 text-[15px] text-graphite-600">
            <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-signal" />
            {p}
          </li>
        ))}
      </ul>
      <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-hairline pt-5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-steel">Deliverables</span>
        {cap.deliverables.map((d) => (
          <span key={d} className="text-sm text-graphite-950">{d}</span>
        ))}
        <Link href={cap.href} className="ml-auto text-[12.5px] font-bold uppercase tracking-[0.1em] text-signal underline-offset-4 hover:underline">
          Learn more →
        </Link>
      </div>
    </div>
  );
}

export function Capabilities() {
  const [active, setActive] = useState(0);
  const current = CAPABILITIES[active];

  return (
    <>
      <PageHero
        index="02"
        label="Capabilities"
        title="Six disciplines. One engineering team."
        lead="From the first network model to the last drawing issued, the same engineers carry the work. Select a discipline to see how we approach it."
      />
      <section className="bg-canvas py-[calc(var(--space-section)*0.55)] text-graphite-950">
        <div className="wrap">
          {/* Split screen: index on the left, drawing and detail on the right */}
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-0">
            <ul className="border-t border-hairline lg:col-span-5 lg:border-r" aria-label="Engineering capabilities">
              {CAPABILITIES.map((cap, i) => {
                const open = i === active;
                return (
                  <li key={cap.id} className="border-b border-hairline">
                    <button
                      aria-expanded={open}
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                      className="group relative flex w-full items-baseline gap-5 py-6 pr-6 text-left lg:pr-10"
                    >
                      <span
                        aria-hidden
                        className={cn("absolute left-0 top-0 h-px bg-signal transition-all duration-500", open ? "w-full" : "w-0")}
                      />
                      <span className={cn("w-8 shrink-0 text-sm tabular-nums transition-colors", open ? "text-signal" : "text-steel")}>{cap.index}</span>
                      <span className={cn("font-display text-card flex-1 transition-all duration-300", open ? "translate-x-1 text-graphite-950" : "text-graphite-600 group-hover:text-graphite-950")}>
                        {cap.title}
                      </span>
                      <span aria-hidden className={cn("text-lg transition-all duration-300", open ? "rotate-90 text-signal lg:rotate-0 lg:translate-x-0" : "text-steel lg:-translate-x-2 lg:opacity-0 lg:group-hover:translate-x-0 lg:group-hover:opacity-100")}>
                        →
                      </span>
                    </button>
                    {/* Mobile: detail opens inline */}
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: EASE }}
                          className="overflow-hidden lg:hidden"
                        >
                          <div className="mb-6 aspect-[4/3] rounded-xl border border-hairline bg-white p-3">
                            <CapabilityDrawing id={cap.id} />
                          </div>
                          <div className="pb-8">
                            <Detail cap={cap} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>

            {/* Desktop: sticky detail panel */}
            <div aria-live="polite" className="hidden lg:col-span-7 lg:block lg:pl-12">
              <div className="sticky top-28">
                <div className="bg-blueprint relative aspect-[4/3] w-full rounded-2xl border border-hairline bg-white p-4 shadow-lift">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="h-full w-full"
                    >
                      <CapabilityDrawing id={current.id} />
                    </motion.div>
                  </AnimatePresence>
                  <span className="absolute right-4 top-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-steel">
                    Fig. {current.index}
                  </span>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="mt-8"
                  >
                    <Detail cap={current} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-canvas">
        <CtaBand eyebrow="Where it matters most" title="Our deepest work is in mission-critical power." href="/critical-power" label="Critical Power" />
      </div>
    </>
  );
}
