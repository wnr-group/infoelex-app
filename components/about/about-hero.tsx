"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export function AboutHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.55, 0.8]);

  return (
    <section ref={ref} className="relative flex h-[90vh] min-h-[600px] items-end overflow-hidden bg-ink">
      {/* PARALLAX IMAGE */}
      <motion.div style={{ y: imgY }} className="absolute inset-0 scale-110">
        <Image
          src="/about-hero-bg.png"
          alt="Infoelex data center campus"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      {/* DARK OVERLAY */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/20"
      />

      {/* SIDE LABEL */}
      <span className="absolute right-8 top-1/2 hidden -translate-y-1/2 -rotate-90 font-mono text-[10px] uppercase tracking-[0.4em] text-paper/40 md:block">
        Infoelex — About Us
      </span>

      {/* CONTENT */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-20 md:px-10 md:pb-28">
        {/* EYEBROW */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-7 flex items-center gap-3"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-paper/60">
            Who We Are
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl text-balance text-5xl font-bold leading-[1.04] tracking-tight text-paper sm:text-6xl md:text-[5rem] lg:text-[5.5rem]"
        >
          Building the{" "}
          <span className="text-brand">infrastructure</span>{" "}
          of tomorrow.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-xl text-balance text-lg leading-relaxed text-paper/65"
        >
          Infoelex pioneers next-generation data centers designed for the demands
          of AI, 5G and the connected world — built with sustainability at the core.
        </motion.p>

        {/* SCROLL INDICATOR */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="absolute bottom-10 left-6 flex items-center gap-3 md:left-10"
        >
          <span className="h-8 w-px animate-pulse bg-brand/50" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper/40">Scroll</span>
        </motion.div>
      </div>
    </section>
  );
}
