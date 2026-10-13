"use client";

import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "./use-reduced-motion";
import { PROCESS } from "./content";
import { Eyebrow, Reveal, ScrubHeadline } from "./reveal";

const STROKE = { stroke: "currentColor", strokeWidth: 1.25, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" } as const;

/** Minimal line art, one drawing per step. */
const ART = [
  // Study: waveform over axes
  <svg key="s" viewBox="0 0 64 64" className="h-14 w-14" aria-hidden="true">
    <path d="M8 8v48h48" {...STROKE} />
    <path d="M12 38c6-22 10-22 14 0s8 22 14 0 8-14 12-6" {...STROKE} />
  </svg>,
  // Design: single-line diagram
  <svg key="d" viewBox="0 0 64 64" className="h-14 w-14" aria-hidden="true">
    <path d="M32 6v14M32 44v14M16 32h32" {...STROKE} />
    <circle cx="32" cy="32" r="12" {...STROKE} />
    <path d="M16 32v10M48 32v10" {...STROKE} />
    <rect x="11" y="42" width="10" height="8" {...STROKE} />
    <rect x="43" y="42" width="10" height="8" {...STROKE} />
  </svg>,
  // Validate: shield with check
  <svg key="v" viewBox="0 0 64 64" className="h-14 w-14" aria-hidden="true">
    <path d="M32 7 12 15v15c0 14 9 23 20 27 11-4 20-13 20-27V15L32 7Z" {...STROKE} />
    <path d="m23 32 7 7 12-14" {...STROKE} />
  </svg>,
  // Commission: switch closing a circuit
  <svg key="c" viewBox="0 0 64 64" className="h-14 w-14" aria-hidden="true">
    <path d="M6 44h14M44 44h14" {...STROKE} />
    <circle cx="23" cy="44" r="3" {...STROKE} />
    <circle cx="41" cy="44" r="3" {...STROKE} />
    <path d="M23 44 40 22" {...STROKE} />
    <path d="M32 10v8M24 14l3 5M40 14l-3 5" {...STROKE} />
  </svg>,
];

/** Study → Design → Validate → Commission, with a red progress line that follows the scroll. */
export function ProcessSection() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 65%"] });
  const line = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(PROCESS.length - 1, Math.max(0, Math.floor(v * PROCESS.length * 0.999)));
    setActive((prev) => (prev === idx ? prev : idx));
  });

  const lit = (i: number) => reduce || i <= active;

  return (
    <section id="process" ref={ref} className="border-t border-hairline bg-canvas py-[var(--space-section)]">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>Process</Eyebrow>
          </div>
          <div className="lg:col-span-8">
            <ScrubHeadline
              text="Four stages. Every decision traceable from study to commissioning."
              className="font-display text-headline text-graphite-950"
            />
          </div>
        </div>

        <div className="relative mt-20 md:mt-28">
          {/* Horizontal rail (desktop) */}
          <div className="absolute left-0 right-0 top-[7px] hidden h-px bg-hairline lg:block" aria-hidden="true">
            <motion.div
              className="h-full origin-left bg-signal"
              style={{ scaleX: reduce ? 1 : line }}
            />
          </div>
          {/* Vertical rail (mobile) */}
          <div className="absolute bottom-0 left-[7px] top-0 w-px bg-hairline lg:hidden" aria-hidden="true">
            <motion.div className="h-full origin-top bg-signal" style={{ scaleY: reduce ? 1 : line }} />
          </div>

          <ol className="grid gap-14 lg:grid-cols-4 lg:gap-10">
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} as="li" delay={i * 0.06} className="relative pl-10 lg:pl-0 lg:pt-14">
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute left-0 top-1 h-[15px] w-[15px] border transition-colors duration-[500ms] ease-signature lg:top-0",
                    lit(i) ? "border-signal bg-signal" : "border-graphite-600/40 bg-canvas"
                  )}
                />
                <div
                  className={cn(
                    "transition-colors duration-[500ms] ease-signature",
                    lit(i) ? "text-graphite-950" : "text-graphite-600/50"
                  )}
                >
                  <div className="flex items-start justify-between">
                    {ART[i]}
                    <span className="font-display text-5xl leading-none tabular-nums md:text-6xl">{p.step}</span>
                  </div>
                  <h3 className="mt-8 font-display text-title">{p.title}</h3>
                  <p className="mt-3 max-w-xs text-[15px] leading-relaxed">{p.copy}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
