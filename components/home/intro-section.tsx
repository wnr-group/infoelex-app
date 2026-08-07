"use client";

import { motion } from "framer-motion";
import { AnimatedText } from "@/components/ui/animated-text";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import { SectionLabel } from "@/components/ui/section-label";

const EASE = [0.16, 1, 0.3, 1] as const;

export function IntroSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-paper py-28 text-ink md:py-40"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <SectionLabel className="mb-8">Introduction</SectionLabel>

        <h2 className="max-w-4xl font-sans text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-7xl">
          <AnimatedText text={"Building what\ncomes next."} />
        </h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1, delay: 0.5, ease: EASE }}
          className="mt-10 h-px w-28 origin-left bg-brand"
        />

        <RevealOnScroll direction="up" delay={0.15}>
          <p className="mt-10 max-w-2xl text-balance text-lg leading-relaxed text-graphite md:text-xl">
            Infoelex designs, builds and operates the digital infrastructure
            that powers tomorrow&apos;s economy — engineered for scale,
            resilient by design, and built with a long view on
            sustainability. We exist at the intersection of engineering
            precision and future-facing ambition.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
