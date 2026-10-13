"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { PROCESS } from "./content";
import { Eyebrow, Reveal, ScrubHeadline } from "./reveal";
import { useReducedMotion } from "./use-reduced-motion";

/** Four numbered stages, each with what we do and what you receive. A red line fills as you scroll. */
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

  const reached = (i: number) => reduce || i <= active;

  return (
    <section id="process" ref={ref} className="border-t border-hairline bg-canvas py-[var(--space-section)]">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>How we work</Eyebrow>
          </div>
          <div className="lg:col-span-8">
            <ScrubHeadline
              text="From first study to switch-on, in four clear stages."
              className="font-display text-headline text-graphite-950"
            />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-graphite-600">
                Each stage builds on the last and ends with something you can review.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="relative mt-16 md:mt-24">
          {/* Horizontal rail (desktop) */}
          <div className="absolute left-0 right-0 top-[15px] hidden h-px bg-hairline lg:block" aria-hidden="true">
            <motion.div className="h-full origin-left bg-signal" style={{ scaleX: reduce ? 1 : line }} />
          </div>
          {/* Vertical rail (mobile) */}
          <div className="absolute bottom-0 left-[15px] top-0 w-px bg-hairline lg:hidden" aria-hidden="true">
            <motion.div className="h-full origin-top bg-signal" style={{ scaleY: reduce ? 1 : line }} />
          </div>

          <ol className="grid gap-12 lg:grid-cols-4 lg:gap-8">
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} as="li" delay={i * 0.06} className="relative pl-14 lg:pl-0 lg:pt-16">
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute left-0 top-0 flex h-[31px] w-[31px] items-center justify-center border text-[12px] font-semibold tabular-nums transition-colors duration-[500ms] ease-signature",
                    reached(i) ? "border-signal bg-signal text-white" : "border-graphite-600/40 bg-canvas text-steel"
                  )}
                >
                  {i + 1}
                </span>

                <p className="text-eyebrow font-semibold uppercase text-steel">Step {p.step}</p>
                <h3 className="mt-3 font-display text-title font-medium text-graphite-950">{p.title}</h3>
                <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-graphite-600">{p.does}</p>

                <div className="mt-6 max-w-xs border-t border-hairline pt-4">
                  <p className="text-eyebrow font-semibold uppercase text-signal">You receive</p>
                  <ul className="mt-3 space-y-2">
                    {p.gets.map((g) => (
                      <li key={g} className="flex items-center gap-3 text-[14px] text-graphite-800">
                        <span className="h-1.5 w-1.5 shrink-0 bg-graphite-600/50" />
                        {g}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
