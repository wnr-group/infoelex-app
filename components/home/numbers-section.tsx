"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "./use-reduced-motion";
import { NUMBERS } from "./content";
import { EASE } from "./motion";
import { Eyebrow, Reveal } from "./reveal";

function CountUp({ to, suffix, unit }: { to: number; suffix: string; unit?: string }) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(wrapRef, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView || reduce || !numRef.current) return;
    const el = numRef.current;
    el.textContent = "0";
    const controls = animate(0, to, {
      duration: 1.8,
      ease: EASE,
      onUpdate: (v) => {
        el.textContent = String(Math.round(v));
      },
    });
    return () => {
      controls.stop();
      el.textContent = String(to);
    };
  }, [inView, reduce, to]);

  return (
    <span ref={wrapRef} className="whitespace-nowrap tabular-nums">
      {/* The number is written imperatively, so React must not own its text node. */}
      <span ref={numRef} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: String(to) }} />
      <span className="text-signal">{suffix}</span>
      {unit && <span className="ml-2 text-[0.36em] font-medium uppercase tracking-[0.08em] text-steel">{unit}</span>}
    </span>
  );
}

/** Oversized figures that count up when they enter the viewport. */
export function NumbersSection() {
  return (
    <section aria-label="Infoelex in numbers" className="border-t border-hairline bg-canvas-2 py-[var(--space-section)]">
      <div className="wrap">
        <Eyebrow>In numbers</Eyebrow>
        <dl className="mt-14 grid grid-cols-1 gap-y-14 sm:grid-cols-2 lg:mt-20 xl:grid-cols-4">
          {NUMBERS.map((n, i) => (
            <Reveal
              key={n.label}
              delay={i * 0.08}
              className={`flex min-w-0 flex-col-reverse justify-end ${i > 0 ? "xl:border-l xl:border-hairline xl:pl-8" : ""} ${i % 2 ? "sm:border-l sm:border-hairline sm:pl-8" : ""}`}
            >
              <dt className="mt-4 max-w-[15rem] text-[14px] leading-snug text-steel">{n.label}</dt>
              <dd className="font-display text-[clamp(3.25rem,2.2rem+2.6vw,4.75rem)] leading-none text-graphite-950">
                <CountUp to={n.value} suffix={n.suffix} unit={n.unit} />
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
