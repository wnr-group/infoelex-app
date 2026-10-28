"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "./use-reduced-motion";
import { HeroHotspots } from "./hero-hotspots";
import { useIntro } from "./intro";
import { EASE } from "./motion";

const STATS = [
  { value: "10+", label: "Data center projects" },
  { value: "500 MW+", label: "Project experience" },
  { value: "GCC & India", label: "Regional presence" },
  { value: "Global", label: "Trusted by partners" },
];

export function HeroSection() {
  const { ready } = useIntro();
  const reduce = useReducedMotion();
  const show = ready || !!reduce;
  const rise = reduce ? 0 : 16;
  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: rise },
    animate: { opacity: show ? 1 : 0, y: show ? 0 : rise },
    transition: { duration: 0.8, delay, ease: EASE },
  });

  return (
    <section
      id="home"
      className="bg-blueprint relative w-full overflow-hidden bg-canvas text-graphite-950"
    >
      {/* ─── Existing hero video: untouched (same file, attributes, hotspots) ─── */}
      <div className="border-b border-hairline bg-white pt-20 md:pt-0">
        <div className="relative w-full pointer-events-none">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            tabIndex={-1}
            className="block h-auto w-full border-none outline-none"
          >
            <source src="/homepage-hero-section-video.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0">
            <HeroHotspots />
          </div>
        </div>
      </div>

      {/* ─── Credibility stats ─── */}
      <motion.dl className="wrap grid grid-cols-2 lg:grid-cols-4" {...fadeUp(0.7)}>
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`flex flex-col-reverse justify-end py-7 pr-4 ${i > 0 ? "lg:border-l lg:border-hairline lg:pl-8" : ""} ${
              i % 2 === 1 ? "border-l border-hairline pl-5 lg:pl-8" : ""
            } ${i >= 2 ? "border-t border-hairline lg:border-t-0" : ""}`}
          >
            <dt className="mt-2.5 text-[13px] leading-snug text-steel">{s.label}</dt>
            <dd className="font-display text-3xl leading-none text-graphite-950 md:text-4xl">{s.value}</dd>
          </div>
        ))}
      </motion.dl>
    </section>
  );
}
