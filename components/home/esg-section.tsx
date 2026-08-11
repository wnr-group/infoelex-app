"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, Landmark, Leaf, Users } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import { SectionLabel } from "@/components/ui/section-label";
import { cn } from "@/lib/utils";

const PILLARS = [
  {
    index: "01",
    key: "environment",
    title: "Environment",
    icon: Leaf,
    description:
      "Reducing our footprint through renewable power sourcing, water-efficient cooling and energy-conscious design at every site we build.",
    points: [
      "Renewable energy sourcing",
      "Water-efficient cooling systems",
      "Carbon-conscious construction",
    ],
  },
  {
    index: "02",
    key: "social",
    title: "Social",
    icon: Users,
    description:
      "Investing in the people and communities around our facilities, from workforce safety to long-term local partnerships.",
    points: [
      "Workforce health & safety",
      "Community engagement",
      "Diversity & inclusion",
    ],
  },
  {
    index: "03",
    key: "governance",
    title: "Governance",
    icon: Landmark,
    description:
      "Operating with transparency and accountability, guided by rigorous compliance and ethical standards across every deployment.",
    points: [
      "Regulatory compliance",
      "Ethical business conduct",
      "Transparent reporting",
    ],
  },
];

const AUTOPLAY_MS = 5500;

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 64 : -64,
    opacity: 0,
    scale: 0.97,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -64 : 64,
    opacity: 0,
    scale: 0.97,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function ESGSection() {
  return (
    <section className="relative overflow-hidden border-t border-black/10 bg-white py-16 text-ink md:py-24">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(223,44,28,0.08), transparent 60%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(8,8,10,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(8,8,10,0.06) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <RevealOnScroll direction="up" className="mx-auto max-w-3xl text-center">
          <SectionLabel className="mx-auto mb-8 justify-center">
            Our ESG Philosophy
          </SectionLabel>
          <h2 className="text-balance text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl md:text-5xl">
            As a data center developer and operator, we are committed to
            integrating sustainable practices into every aspect of our
            operations.
          </h2>
        </RevealOnScroll>

        <RevealOnScroll direction="scale" delay={0.15} className="mt-16 md:mt-20">
          <ESGCarousel />
        </RevealOnScroll>
      </div>
    </section>
  );
}

function ESGCarousel() {
  const shouldReduceMotion = useReducedMotion();
  const [[active, direction], setActive] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);

  const go = (nextIndex: number) => {
    setActive(([current]) => {
      const dir = nextIndex > current ? 1 : -1;
      return [nextIndex, dir];
    });
  };

  const step = (delta: number) => {
    setActive(([current]) => [
      (current + delta + PILLARS.length) % PILLARS.length,
      delta,
    ]);
  };

  useEffect(() => {
    if (shouldReduceMotion || paused) return;
    const id = setInterval(() => step(1), AUTOPLAY_MS);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldReduceMotion, paused, active]);

  const pillar = PILLARS[active];
  const Icon = pillar.icon;

  return (
    <div
      className="mx-auto max-w-3xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white text-ink shadow-[0_24px_60px_-24px_rgba(0,0,0,0.35)]">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={pillar.key}
            custom={direction}
            variants={shouldReduceMotion ? undefined : slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex flex-col gap-8 p-8 md:flex-row md:items-start md:gap-12 md:p-12"
          >
            <div className="flex shrink-0 items-center gap-4 md:flex-col md:items-start md:gap-6">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-brand/30 bg-brand/10 text-brand">
                <Icon className="h-6 w-6" strokeWidth={1.75} />
              </span>
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-graphite">
                {pillar.index} / {String(PILLARS.length).padStart(2, "0")}
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {pillar.title}
              </h3>
              <p className="mt-4 max-w-lg text-balance leading-relaxed text-graphite">
                {pillar.description}
              </p>
              <ul className="mt-6 flex flex-col gap-3">
                {pillar.points.map((point) => (
                  <li key={point} className="flex items-center gap-3 text-sm text-ink/80">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {PILLARS.map((p, i) => (
            <button
              key={p.key}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to ${p.title}`}
              aria-current={i === active}
              className="group flex h-6 items-center px-0.5"
            >
              <span
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500 ease-out",
                  i === active ? "w-8 bg-brand" : "w-4 bg-black/15 group-hover:bg-black/30"
                )}
              />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous pillar"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 text-ink transition-colors duration-300 hover:border-brand hover:bg-brand hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next pillar"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 text-ink transition-colors duration-300 hover:border-brand hover:bg-brand hover:text-white"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
