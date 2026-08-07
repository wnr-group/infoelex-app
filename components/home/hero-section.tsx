"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { HeroHotspots } from "@/components/home/hero-hotspots";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const hotspotOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full bg-ink"
    >
      {/* VIDEO — full, uncropped, natural aspect ratio. If taller than the
          viewport, the rest is revealed by scrolling rather than clipped. */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="block h-auto w-full"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* MINIMAL GRADIENT (top only, protects navbar legibility over bright video) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/55 to-transparent" />

      {/* INTERACTIVE HOTSPOT LAYER */}
      <motion.div
        style={{ opacity: hotspotOpacity }}
        className="absolute inset-0 z-10"
      >
        <HeroHotspots />
      </motion.div>
    </section>
  );
}
