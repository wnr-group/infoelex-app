"use client";

import { motion, useReducedMotion } from "framer-motion";

export function CsrCta() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-t border-black/5 bg-white py-24 md:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="pointer-events-none absolute -right-1/4 top-0 h-[400px] w-[400px] rounded-full bg-brand/8 blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 text-center md:px-12 lg:px-16">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl"
        >
          <h2 className="text-balance text-3xl font-bold leading-[1.1] tracking-tight text-ink sm:text-4xl">
            Want to work with us on an initiative?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-balance leading-relaxed text-graphite">
            If you run a school, hospital, or community programme that our teams
            could support, we would like to hear from you.
          </p>
          <a
            href="/contact"
            className="mt-9 inline-flex items-center gap-2 bg-[#b91c1c] px-6 py-3.5 text-[12.5px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-red-800"
          >
            Get in Touch
            <span className="text-base leading-none">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
