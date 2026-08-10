"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import { SectionLabel } from "@/components/ui/section-label";

const CULTURE_POINTS = [
  { index: "01", text: "Engineering excellence over everything" },
  { index: "02", text: "Radical transparency with clients & partners" },
  { index: "03", text: "Sustainability as a design constraint, not an afterthought" },
  { index: "04", text: "Long-term thinking in every decision we make" },
];

export function AboutOffice() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.25], [0.7, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-black/5 bg-white py-24 text-ink md:py-32"
    >
      {/* GRID */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(8,8,10,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(8,8,10,0.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div className="pointer-events-none absolute right-[-10%] bottom-[-10%] -z-10 h-[500px] w-[500px] rounded-full bg-brand/8 blur-[180px]" />

      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* IMAGE */}
          <RevealOnScroll direction="left" amount={0.3}>
            <div
              ref={imgRef}
              className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-[0_30px_80px_-25px_rgba(8,8,10,0.15)] border border-black/5"
            >
              <motion.div style={{ scale: imgScale, opacity: imgOpacity }} className="absolute inset-0">
                <Image
                  src="/about-office-bg.png"
                  alt="Infoelex office"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
              {/* floating badge */}
              <div className="absolute bottom-6 left-6 flex items-center gap-3 rounded-xl border border-white/20 bg-ink/80 px-5 py-3.5 backdrop-blur-md">
                <span className="h-2 w-2 animate-pulse rounded-full bg-brand" />
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-paper">
                  HQ — India
                </span>
              </div>
            </div>
          </RevealOnScroll>

          {/* TEXT */}
          <div>
            <RevealOnScroll direction="up">
              <SectionLabel>Our Culture</SectionLabel>
              <h2 className="mt-4 text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                Principles that guide every build.
              </h2>
              <p className="mt-5 max-w-md text-balance text-sm leading-relaxed text-graphite/95">
                At Infoelex, culture is not a poster on the wall — it&apos;s encoded in how
                we design, deploy and operate every facility we run.
              </p>
            </RevealOnScroll>

            <div className="mt-8 flex flex-col gap-4">
              {CULTURE_POINTS.map((point, i) => (
                <RevealOnScroll key={point.index} direction="up" delay={i * 0.06} amount={0.1}>
                  <div className="group flex items-start gap-4 rounded-2xl border border-black/5 bg-white p-5 shadow-[0_1px_2px_rgba(8,8,10,0.02)] transition-all duration-400 hover:border-brand/25 hover:shadow-[0_12px_30px_-15px_rgba(223,44,28,0.08)] hover:-translate-y-0.5">
                    <span className="mt-0.5 shrink-0 font-mono text-xs font-bold text-brand">{point.index}</span>
                    <p className="text-sm font-semibold leading-relaxed text-ink/80 transition-colors duration-300 group-hover:text-ink">
                      {point.text}
                    </p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
