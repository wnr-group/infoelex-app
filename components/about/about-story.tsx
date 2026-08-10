"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import { SectionLabel } from "@/components/ui/section-label";

const TIMELINE = [
  {
    year: "2012",
    title: "Founded",
    body: "Infoelex was established with a singular vision: to develop data center infrastructure that anticipates the future needs of India's digital economy.",
  },
  {
    year: "2017",
    title: "First Hyperscale Campus",
    body: "We delivered our first hyperscale-grade campus, setting a new benchmark for power density and operational efficiency in the region.",
  },
  {
    year: "2021",
    title: "Renewable Energy Commitment",
    body: "Infoelex committed to 100% renewable energy sourcing across all facilities, pioneering green data center operations in South Asia.",
  },
  {
    year: "2024",
    title: "International Expansion",
    body: "Operations extended beyond India — establishing a presence across three countries with a combined pipeline exceeding 500 MW of planned capacity.",
  },
];

export function AboutStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineH = useTransform(scrollYProgress, [0.1, 0.8], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-black/5 bg-white py-24 text-ink md:py-32"
    >
      {/* GRID BACKDROP */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(8,8,10,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(8,8,10,0.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div className="pointer-events-none absolute left-[-8%] top-[-10%] -z-10 h-[500px] w-[500px] rounded-full bg-brand/8 blur-[200px]" />

      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16">
        {/* HEADER */}
        <div className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">
          <RevealOnScroll direction="up">
            <SectionLabel>Our Story</SectionLabel>
            <h2 className="mt-4 text-balance text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl md:text-5xl">
              A decade of building what&apos;s next.
            </h2>
          </RevealOnScroll>
          <RevealOnScroll direction="up" delay={0.15} className="flex items-end">
            <p className="max-w-lg text-balance text-base leading-relaxed text-graphite">
              From a single facility to a multi-country portfolio, Infoelex has
              consistently pushed the boundaries of what data center infrastructure
              can be — merging engineering excellence with an unwavering commitment
              to sustainability.
            </p>
          </RevealOnScroll>
        </div>

        {/* TIMELINE */}
        <div className="relative ml-0 md:ml-[10%]">
          {/* Animated vertical line */}
          <div className="absolute left-[11px] top-0 hidden h-full w-[2px] bg-black/5 md:block">
            <motion.span
              style={{ height: lineH }}
              className="absolute left-0 top-0 block w-full bg-brand origin-top"
            />
          </div>

          <div className="flex flex-col gap-12 md:gap-14">
            {TIMELINE.map((item, i) => (
              <RevealOnScroll key={item.year} direction="up" delay={i * 0.08} amount={0.2}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-[180px_1fr]">
                  {/* LEFT YEAR */}
                  <div className="flex items-start gap-5">
                    {/* dot */}
                    <span className="relative z-10 mt-1 hidden h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-brand/40 bg-white transition-colors duration-500 hover:border-brand md:flex">
                      <span className="h-2.5 w-2.5 rounded-full bg-brand" />
                    </span>
                    <span className="font-mono text-xl font-bold text-brand leading-none">{item.year}</span>
                  </div>

                  {/* RIGHT CONTENT */}
                  <div className="group relative rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_3px_rgba(8,8,10,0.02)] transition-all duration-500 hover:-translate-y-1 hover:border-brand/35 hover:shadow-[0_20px_50px_-20px_rgba(8,8,10,0.08)]">
                    {/* top accent */}
                    <span className="absolute inset-x-0 top-0 h-[2px] w-0 bg-brand transition-all duration-500 ease-out group-hover:w-full" />
                    <h3 className="text-lg font-bold tracking-tight text-ink sm:text-xl">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-balance text-sm leading-relaxed text-graphite/90">
                      {item.body}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
