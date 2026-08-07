"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";

const STATS = [
  { value: "500+", label: "MW Capacity Under Development" },
  { value: "99.999%", label: "Network Uptime Reliability" },
  { value: "40+", label: "Markets Engineered For Scale" },
];

const LINES = [
  "M0,120 L280,120 L340,60 L720,60",
  "M0,260 L180,260 L240,320 L620,320 L680,260 L900,260",
  "M0,400 L420,400 L480,460 L900,460",
];

export function InfrastructureVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const gridY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -60]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 80]);

  return (
    <section className="relative overflow-hidden bg-ink py-24 text-paper md:py-32">
      <div
        ref={ref}
        className="relative mx-auto max-w-[1440px] px-6 md:px-10"
      >
        {/* Background grid */}
        <motion.div
          style={{ y: gridY }}
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.18]"
        >
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(250,250,249,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(250,250,249,0.6) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />
        </motion.div>

        <motion.div
          style={{ y: glowY }}
          className="pointer-events-none absolute right-[-10%] top-0 -z-10 h-[420px] w-[420px] rounded-full bg-brand/25 blur-[160px]"
        />

        <RevealOnScroll direction="up" className="max-w-2xl">
          <span className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-paper/70">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Infrastructure
          </span>
          <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            Engineered foundations for high-density, accelerated compute.
          </h2>
        </RevealOnScroll>

        {/* Schematic visual */}
        <RevealOnScroll direction="scale" delay={0.1} className="mt-16">
          <div className="relative w-full overflow-hidden rounded-md border border-white/10 bg-charcoal/60">
            <svg
              viewBox="0 0 900 520"
              fill="none"
              className="h-[300px] w-full md:h-[420px]"
              preserveAspectRatio="xMidYMid slice"
            >
              <rect width="900" height="520" fill="none" />
              {LINES.map((d, i) => (
                <motion.path
                  key={d}
                  d={d}
                  stroke="#DF2C1C"
                  strokeWidth="1.5"
                  strokeOpacity="0.7"
                  strokeDasharray="6 8"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 1.8, delay: i * 0.25, ease: [0.16, 1, 0.3, 1] }}
                />
              ))}
              {[
                [280, 120],
                [720, 60],
                [620, 320],
                [900, 460],
                [480, 460],
              ].map(([cx, cy], i) => (
                <motion.circle
                  key={`${cx}-${cy}`}
                  cx={cx}
                  cy={cy}
                  r={4}
                  fill="#DF2C1C"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: 0.8 + i * 0.15 }}
                />
              ))}
            </svg>
          </div>
        </RevealOnScroll>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 gap-10 border-t border-white/10 pt-12 sm:grid-cols-3">
          {STATS.map((stat, i) => (
            <RevealOnScroll key={stat.label} direction="up" delay={i * 0.1}>
              <div className="text-4xl font-bold tracking-tight text-brand md:text-5xl">
                {stat.value}
              </div>
              <div className="mt-3 text-sm text-graphite">{stat.label}</div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
