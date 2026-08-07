"use client";

import { motion, useReducedMotion } from "framer-motion";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import { ArrowLink } from "@/components/ui/arrow-link";

export function AboutCta() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-ink py-28 text-paper md:py-40">
      {/* BRAND GLOW */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/12 blur-[250px]"
        />
      </div>

      {/* ANIMATED RING */}
      {!shouldReduceMotion && (
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          <div
            className="h-[500px] w-[500px] rounded-full border border-dashed border-brand/15"
          />
        </motion.div>
      )}
      {!shouldReduceMotion && (
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <div
            className="h-[720px] w-[720px] rounded-full border border-dashed border-white/5"
          />
        </motion.div>
      )}

      {/* GRID BACKDROP */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(250,250,249,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(250,250,249,0.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto max-w-[1440px] px-6 text-center md:px-10">
        <RevealOnScroll direction="up">
          <span className="mb-8 inline-flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.28em] text-paper/50">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Let&apos;s Build Together
          </span>
          <h2 className="mx-auto max-w-3xl text-balance text-4xl font-bold leading-[1.04] tracking-tight sm:text-5xl md:text-[3.75rem]">
            Ready to power your next{" "}
            <span className="text-brand">data center</span> journey?
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-balance text-lg leading-relaxed text-paper/55">
            Whether you need colocation, a build-to-suit campus or a powered shell — our
            team is ready to engineer a solution around your requirements.
          </p>
        </RevealOnScroll>

        <RevealOnScroll direction="up" delay={0.2} className="mt-12 flex flex-wrap items-center justify-center gap-5">
          <a
            href="/contact"
            id="about-cta-contact"
            className="inline-flex items-center gap-3 rounded-full bg-brand px-9 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white shadow-[0_0_40px_rgba(223,44,28,0.35)] transition-all duration-300 hover:scale-[1.03] hover:bg-brand-dim hover:shadow-[0_0_60px_rgba(223,44,28,0.5)] active:scale-[0.98]"
          >
            Get in Touch
          </a>
          <ArrowLink href="/solutions" className="text-paper/70 hover:text-paper">
            Explore Solutions
          </ArrowLink>
        </RevealOnScroll>
      </div>
    </section>
  );
}
