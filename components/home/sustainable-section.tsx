"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";

export function SustainableSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const floatY = useTransform(scrollYProgress, [0, 1], ["0px", "-30px"]);

  return (
    <section
      id="sustainable"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-black/10"
      style={{ minHeight: "80vh" }}
    >
      {/* ── FULL-BLEED BACKGROUND IMAGE (parallax) ── */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 z-0 scale-110"
      >
        <img
          src="/sustainable-bg.jpg"
          alt=""
          className="h-full w-full object-cover object-center"
          aria-hidden="true"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-[#0a0c2e]/50" />
      </motion.div>

      {/* ── CONTENT ── */}
      <div className="relative z-10 mx-auto flex min-h-[80vh] w-full max-w-[1440px] flex-col justify-center px-6 py-24 md:px-12 lg:px-16 lg:py-28">

        {/* ── FLOATING CITY CARD (top-left) ── */}
        <RevealOnScroll direction="up" delay={0.1}>
          <motion.div
            style={{ y: floatY }}
            className="mb-10 w-fit overflow-hidden rounded-2xl border border-white/20 shadow-2xl shadow-black/40 lg:mb-12"
          >
            <img
              src="/sustainable-thumb.jpg"
              alt="Smart City Infrastructure"
              className="h-32 w-44 object-cover sm:h-36 sm:w-52"
            />
          </motion.div>
        </RevealOnScroll>

        {/* ── TWO-COLUMN LAYOUT ── */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">

          {/* LEFT — Heading */}
          <RevealOnScroll direction="up" delay={0.15} className="max-w-xl">
            {/* Eyebrow */}
            <p className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-white/70">
              <span className="h-px w-6 bg-brand" />
              Committed to a Sustainable Future
            </p>

            {/* Heading */}
            <h2 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-[3.25rem]">
              Ensuring sustainable
              <br />
              <span className="text-[#ef4444]">digital growth</span>
            </h2>
          </RevealOnScroll>

          {/* RIGHT — Body text card */}
          <RevealOnScroll direction="up" delay={0.3} className="max-w-md">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-7 backdrop-blur-md">
              <p className="text-sm font-medium leading-relaxed text-white/90 sm:text-[15px]">
                We satisfy the increasing need for digital infrastructure while
                minimising its environmental impact.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/60">
                With our exceptional portfolio of companies in our group, spanning
                Power, Multi, and Cooling, we help impact infrastructure companies
                speed to market, connectivity, high performance, and reliability.
                We efficiently serve the growing needs of the digital landscape,
                creating eco-friendly data centers while keeping sustainability at
                the core.
              </p>
            </div>
          </RevealOnScroll>

        </div>
      </div>
    </section>
  );
}
