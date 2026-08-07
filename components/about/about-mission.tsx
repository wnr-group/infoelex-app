"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import { SectionLabel } from "@/components/ui/section-label";
import { Eye, Target, Zap } from "lucide-react";

const PILLARS = [
  {
    icon: Target,
    title: "Our Mission",
    body: "To develop and operate next-generation data centers that enable the digital economy to scale — reliably, sustainably and at pace with innovation.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    body: "A world where digital infrastructure is no longer a constraint — where any organisation, anywhere, can access the compute and connectivity they need to thrive.",
  },
  {
    icon: Zap,
    title: "Our Approach",
    body: "Engineering-first. We design for density, build for resilience and operate with an obsessive focus on uptime — while engineering out energy waste at every step.",
  },
];

export function AboutMission() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-ink py-28 text-paper md:py-40"
    >
      {/* ANIMATED NOISE / GRID */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-[-8%] -z-10 opacity-[0.07]"
        aria-hidden
      >
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(250,250,249,0.7) 1px, transparent 1px), linear-gradient(to bottom, rgba(250,250,249,0.7) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </motion.div>

      {/* BRAND GLOWS */}
      <div className="pointer-events-none absolute right-[-15%] top-[-10%] -z-10 h-[600px] w-[600px] rounded-full bg-brand/12 blur-[220px]" />
      <div className="pointer-events-none absolute bottom-[-15%] left-[-15%] -z-10 h-[500px] w-[500px] rounded-full bg-brand/8 blur-[200px]" />

      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        {/* SECTION HEADER */}
        <RevealOnScroll direction="up" className="mx-auto max-w-2xl text-center">
          <SectionLabel light className="mx-auto mb-8 justify-center">
            Mission &amp; Vision
          </SectionLabel>
          <h2 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-[3.4rem]">
            Driven by purpose,<br />
            <span className="text-brand">engineered</span> for impact.
          </h2>
        </RevealOnScroll>

        {/* PILLARS */}
        <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <RevealOnScroll key={pillar.title} direction="up" delay={i * 0.12}>
                <div className="group relative flex h-full flex-col rounded-2xl border border-white/8 bg-white/5 p-8 backdrop-blur-sm transition-all duration-500 hover:border-brand/40 hover:bg-white/8">
                  {/* HOVER GLOW */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: "radial-gradient(circle at 50% 0%, rgba(223,44,28,0.12), transparent 70%)" }}
                  />
                  {/* top accent */}
                  <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 rounded-t-2xl bg-brand transition-transform duration-500 group-hover:scale-x-100" />

                  <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-brand/10 text-brand transition-colors duration-300 group-hover:bg-brand/20">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="text-xl font-bold tracking-tight text-paper sm:text-2xl">
                    {pillar.title}
                  </h3>
                  <p className="mt-4 flex-1 text-balance leading-relaxed text-paper/60">
                    {pillar.body}
                  </p>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
