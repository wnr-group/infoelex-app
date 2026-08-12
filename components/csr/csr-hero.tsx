"use client";

import { motion } from "framer-motion";

export function CsrHero() {
  return (
    <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-white pt-32 pb-16">
      {/* Grid backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Decorative Glows */}
      <div className="pointer-events-none absolute -left-1/4 top-1/4 h-[350px] w-[350px] rounded-full bg-brand/5 blur-[120px]" />
      <div className="pointer-events-none absolute -right-1/4 bottom-0 h-[400px] w-[400px] rounded-full bg-brand/8 blur-[160px]" />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 text-center md:px-12 lg:px-16">
        <div className="mx-auto max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 flex items-center justify-center gap-3"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand" />
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-brand">
              Corporate Social Responsibility
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-balance text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl md:text-6xl"
          >
            Engineering for people, not just{" "}
            <span className="relative inline-block text-brand">
              power
              <span className="absolute bottom-1 left-0 h-[3px] w-full rounded bg-brand/35" />
            </span>
            .
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-6 max-w-xl text-balance text-base leading-relaxed text-charcoal/80 sm:text-lg"
          >
            Giving back is part of how we work. From quarterly blood donation
            drives to reforestation and digital access for government schools,
            our teams invest in the communities we operate in.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
