"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AnimatedText } from "@/components/ui/animated-text";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import { SectionLabel } from "@/components/ui/section-label";

export function WhyInfoelexSection() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.4"],
  });

  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="sector"
      ref={containerRef}
      className="relative bg-charcoal text-paper"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-12 py-24 md:grid-cols-12 md:gap-8 md:py-36">
          {/* Left: sticky heading */}
          <div className="md:col-span-5">
            <div className="md:sticky md:top-32">
              <SectionLabel light className="mb-8">
                Why Infoelex
              </SectionLabel>
              <h2 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                <AnimatedText text="Transforming the digital infrastructure landscape." />
              </h2>
            </div>
          </div>

          {/* Right: progress rail + content */}
          <div className="relative md:col-span-6 md:col-start-7">
            <div className="absolute left-0 top-0 hidden h-full w-px bg-white/10 md:block">
              <motion.div
                style={{ height: progressHeight }}
                className="w-px bg-brand"
              />
            </div>

            <div className="flex flex-col gap-10 md:pl-12">
              <RevealOnScroll direction="up">
                <p className="text-balance text-xl leading-relaxed text-paper/90 md:text-2xl">
                  Infoelex develops and operates cutting-edge,
                  environmentally conscious digital infrastructure for the
                  connected world.
                </p>
              </RevealOnScroll>

              <RevealOnScroll direction="up" delay={0.1}>
                <p className="max-w-xl text-balance leading-relaxed text-graphite">
                  Digital transformation, driven by the proliferation of
                  Artificial Intelligence and Machine Learning, rapid
                  deployment of 5G networks and increased adoption of the
                  Internet of Things, requires a rethink of infrastructure
                  design.
                </p>
              </RevealOnScroll>

              <RevealOnScroll direction="up" delay={0.2}>
                <p className="max-w-xl text-balance leading-relaxed text-graphite">
                  Infoelex is pioneering next-generation infrastructure
                  designed for high-density computing, accelerated workloads
                  and emerging technologies, with a strong focus on
                  efficient power, water and space utilization.
                </p>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
