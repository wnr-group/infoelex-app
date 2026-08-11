"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { SectionLabel } from "@/components/ui/section-label";
import { AnimatedText } from "@/components/ui/animated-text";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import { ArrowLink } from "@/components/ui/arrow-link";
import { cn } from "@/lib/utils";

type SolutionKind = "colocation" | "build-to-suit" | "powered-shell";

interface Solution {
  index: string;
  title: string;
  description: string;
  href: string;
  kind: SolutionKind;
}

const SOLUTIONS: Solution[] = [
  {
    index: "01",
    title: "Wholesale Colocation",
    description:
      "Dedicated high-density suites for hyperscale and enterprise deployments, delivered on flexible capacity terms.",
    href: "#solutions",
    kind: "colocation",
  },
  {
    index: "02",
    title: "Build to Suit",
    description:
      "Purpose-engineered facilities designed around your load profile, timeline and long-term expansion roadmap.",
    href: "#solutions",
    kind: "build-to-suit",
  },
  {
    index: "03",
    title: "Powered Shell",
    description:
      "Turnkey power and structural shell infrastructure, ready for your own fit-out and critical systems.",
    href: "#solutions",
    kind: "powered-shell",
  },
];

export function SolutionsSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="solutions"
      className="relative border-t border-black/10 bg-white text-ink"
    >
      {/* MOBILE — simple stacked layout, no scroll-pin */}
      <div className="mx-auto max-w-[1440px] overflow-x-hidden px-6 py-14 md:hidden">
        <SectionHeader />
        <div className="mt-12 flex flex-col gap-5">
          {SOLUTIONS.map((solution, i) => (
            <RevealOnScroll key={solution.index} direction="up" delay={i * 0.1}>
              <SolutionCard solution={solution} className="h-[440px]" alwaysShowDescription />
            </RevealOnScroll>
          ))}
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden md:block">
        {shouldReduceMotion ? (
          <div className="mx-auto max-w-[1440px] px-10 py-20">
            <SectionHeader />
            <div className="mt-14 grid grid-cols-3 gap-6" style={{ height: "min(56vh, 620px)" }}>
              {SOLUTIONS.map((solution) => (
                <SolutionCard key={solution.index} solution={solution} className="h-full" />
              ))}
            </div>
          </div>
        ) : (
          <PinnedSolutions />
        )}
      </div>
    </section>
  );
}

function PinnedSolutions() {
  const pinRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end end"],
  });

  const headingOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const headingY = useTransform(scrollYProgress, [0, 0.15], [28, 0]);

  const leftX = useTransform(scrollYProgress, [0, 0.45], ["-62%", "0%"]);
  const leftOpacity = useTransform(scrollYProgress, [0, 0.18], [0, 1]);

  const rightX = useTransform(scrollYProgress, [0.04, 0.49], ["62%", "0%"]);
  const rightOpacity = useTransform(scrollYProgress, [0.04, 0.22], [0, 1]);

  const midScale = useTransform(scrollYProgress, [0, 0.3], [0.92, 1]);
  const midOpacity = useTransform(scrollYProgress, [0, 0.16], [0, 1]);

  return (
    <div ref={pinRef} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-x-hidden">
        {/* TECHNICAL GRID BACKDROP */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.1]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(8,8,10,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(8,8,10,0.6) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div className="pointer-events-none absolute right-[-10%] top-[-10%] -z-10 h-[520px] w-[520px] rounded-full bg-brand/10 blur-[200px]" />

        <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10">
          <motion.div style={{ opacity: headingOpacity, y: headingY }}>
            <SectionHeader />
          </motion.div>

          <div
            className="mt-10 grid grid-cols-3 gap-5 lg:gap-6"
            style={{ height: "min(54vh, 600px)" }}
          >
            <motion.div style={{ x: leftX, opacity: leftOpacity }} className="h-full">
              <SolutionCard solution={SOLUTIONS[0]} className="h-full" />
            </motion.div>

            <motion.div style={{ scale: midScale, opacity: midOpacity }} className="h-full">
              <SolutionCard solution={SOLUTIONS[1]} className="h-full" />
            </motion.div>

            <motion.div style={{ x: rightX, opacity: rightOpacity }} className="h-full">
              <SolutionCard solution={SOLUTIONS[2]} className="h-full" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeader() {
  return (
    <div>
      <SectionLabel>Infoelex Solutions</SectionLabel>
      <h2 className="mt-6 text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-[3.4rem]">
        <AnimatedText text="Adapting to your growth" trigger="inView" stagger={0.04} />
      </h2>
    </div>
  );
}

function SolutionCard({
  solution,
  className,
  alwaysShowDescription = false,
}: {
  solution: Solution;
  className?: string;
  alwaysShowDescription?: boolean;
}) {
  return (
    <a
      href={solution.href}
      className={cn(
        "group relative block w-full overflow-hidden rounded-3xl bg-ink",
        className
      )}
    >
      {/* IMAGE LAYER */}
      <div className="absolute inset-0 transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]">
        <SolutionVisual kind={solution.kind} />
      </div>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10 transition-all duration-500 ease-out group-hover:from-ink/95 group-hover:via-ink/55" />

      {/* CONTENT */}
      <div className="relative flex h-full flex-col justify-between p-7 md:p-9">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-paper/60">
            {solution.index}
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-brand opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>

        <div>
          <h3 className="text-balance text-2xl font-bold leading-tight tracking-tight text-paper transition-transform duration-500 ease-out group-hover:-translate-y-1 sm:text-3xl">
            {solution.title}
          </h3>
          <p
            className={cn(
              "mt-3 max-w-[28ch] text-balance text-sm leading-relaxed text-paper/70 transition-opacity duration-500",
              alwaysShowDescription ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            )}
          >
            {solution.description}
          </p>
          <ArrowLink as="span" className="mt-5 text-paper">
            Learn More
          </ArrowLink>
        </div>
      </div>
    </a>
  );
}

const SOLUTION_IMAGES: Record<SolutionKind, string> = {
  colocation: "/colocation-bg.png",
  "build-to-suit": "/build-to-suit-bg.png",
  "powered-shell": "/powered-shell-bg.png",
};

function SolutionVisual({ kind }: { kind: SolutionKind }) {
  return (
    <Image
      src={SOLUTION_IMAGES[kind]}
      alt=""
      fill
      sizes="(max-width: 768px) 100vw, 33vw"
      className="object-cover transition-transform duration-[900ms] ease-out"
      priority={kind === "colocation"}
    />
  );
}
