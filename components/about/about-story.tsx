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
  const lineH = useTransform(scrollYProgress, [0.05, 0.75], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-black/10 bg-white py-28 text-ink md:py-40"
    >
      {/* GRID BACKDROP */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(8,8,10,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(8,8,10,0.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div className="pointer-events-none absolute left-[-8%] top-[-10%] -z-10 h-[500px] w-[500px] rounded-full bg-brand/10 blur-[200px]" />

      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        {/* HEADER */}
        <div className="mb-20 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-20">
          <RevealOnScroll direction="up">
            <SectionLabel>Our Story</SectionLabel>
            <h2 className="mt-6 text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-[3.4rem]">
              A decade of building what&apos;s next.
            </h2>
          </RevealOnScroll>
          <RevealOnScroll direction="up" delay={0.15} className="flex items-end">
            <p className="max-w-lg text-balance text-lg leading-relaxed text-graphite">
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
          <div className="absolute left-[11px] top-0 hidden h-full w-px bg-black/8 md:block">
            <motion.span
              style={{ height: lineH }}
              className="absolute left-0 top-0 block w-full bg-brand"
            />
          </div>

          <div className="flex flex-col gap-14 md:gap-16">
            {TIMELINE.map((item, i) => (
              <RevealOnScroll key={item.year} direction="up" delay={i * 0.08}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-[180px_1fr]">
                  {/* LEFT YEAR */}
                  <div className="flex items-start gap-5">
                    {/* dot */}
                    <span className="relative z-10 mt-1 hidden h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-brand bg-white md:flex">
                      <span className="h-2 w-2 rounded-full bg-brand" />
                    </span>
                    <span className="font-mono text-2xl font-bold text-brand">{item.year}</span>
                  </div>

                  {/* RIGHT CONTENT */}
                  <div className="group rounded-2xl border border-black/8 bg-white p-8 shadow-[0_1px_3px_rgba(8,8,10,0.04)] transition-shadow duration-500 hover:shadow-[0_20px_60px_-20px_rgba(8,8,10,0.14)]">
                    {/* top accent */}
                    <span className="mb-4 block h-px w-0 bg-brand transition-all duration-700 ease-out group-hover:w-12" />
                    <h3 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-balance leading-relaxed text-graphite">
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
