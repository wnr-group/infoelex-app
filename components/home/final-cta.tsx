"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AnimatedText } from "@/components/ui/animated-text";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";

export function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const gridY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -80]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.1, 0.85]);

  return (
    <section
      id="contact"
      ref={ref}
      className="relative isolate overflow-hidden bg-ink py-32 text-paper md:py-48"
    >
      <motion.div
        style={{ y: gridY }}
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12]"
      >
        <div
          className="h-[120%] w-full"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(250,250,249,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(250,250,249,0.6) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </motion.div>

      <motion.div
        style={{ scale: glowScale }}
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/25 blur-[180px]"
      />

      <div className="relative mx-auto max-w-[1440px] px-6 text-center md:px-10">
        <h2 className="mx-auto max-w-4xl text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl md:text-8xl">
          <AnimatedText text="Let's build the future." />
        </h2>

        <RevealOnScroll direction="up" delay={0.2}>
          <p className="mx-auto mt-8 max-w-lg text-balance text-lg text-paper/70">
            Connect with Infoelex and discover infrastructure built for what
            comes next.
          </p>
        </RevealOnScroll>

        <RevealOnScroll direction="up" delay={0.3} className="mt-12 flex justify-center">
          <MagneticButton
            as="a"
            href="mailto:hello@infoelex.com"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-brand px-9 py-5 text-base font-semibold text-white transition-shadow duration-300 hover:shadow-[0_0_44px_var(--color-brand-glow)]"
          >
            <span>Talk to Infoelex</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">
              →
            </span>
          </MagneticButton>
        </RevealOnScroll>
      </div>
    </section>
  );
}
