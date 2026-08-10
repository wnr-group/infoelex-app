"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export function AboutHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  
  // Premium subtle scroll transformations
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.6, 0.85]);

  return (
    <section ref={ref} className="relative flex h-screen min-h-[600px] items-center overflow-hidden bg-ink">
      {/* PARALLAX BG IMAGE WITH ELEGANT GRADIENT OVERLAY */}
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
        <Image
          src="/about-hero-bg.png"
          alt="Infoelex data center campus"
          fill
          priority
          className="object-cover object-center filter brightness-95 transition-all duration-700"
          sizes="100vw"
        />
      </motion.div>

      {/* LUXURIOUS MULTI-LAYER OVERLAYS */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-transparent"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/50 to-transparent" />

      {/* MODERN GLASSMORPHIC FLOATING DECORATIONS */}
      <div className="absolute right-[-10%] top-[-10%] -z-0 h-[450px] w-[450px] rounded-full bg-brand/8 blur-[180px] pointer-events-none" />

      {/* CONTENT WITH PARALLAX MOTION */}
      <motion.div 
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-16"
      >
        <div className="max-w-3xl">
          {/* EYEBROW */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-brand">
              Who We Are
            </span>
          </motion.div>

          {/* MAIN HEADER WITH OPTIMIZED PREMIUM FONT SIZE */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-balance text-4xl font-bold leading-[1.1] tracking-tight text-paper sm:text-5xl md:text-6xl lg:text-[4.25rem]"
          >
            Building the <span className="relative inline-block text-brand">
              infrastructure
              <span className="absolute left-0 bottom-1 h-[3px] w-full bg-brand/35 rounded" />
            </span> of tomorrow.
          </motion.h1>

          {/* SUBTITLE */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-xl text-balance text-base leading-relaxed text-paper/75 sm:text-lg"
          >
            Infoelex pioneers next-generation data centers designed for the demands
            of AI, 5G and the connected world — built with sustainability at the core.
          </motion.p>
        </div>
      </motion.div>

      {/* SCROLL INDICATOR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute bottom-8 left-6 flex items-center gap-3 md:left-12 lg:left-16"
      >
        <span className="relative flex h-8 w-[2px] overflow-hidden bg-brand/20">
          <motion.span 
            className="absolute top-0 left-0 h-1/2 w-full bg-brand"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-paper/40">Scroll to Explore</span>
      </motion.div>
    </section>
  );
}
