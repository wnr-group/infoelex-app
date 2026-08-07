"use client";

import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import { ArrowLink } from "@/components/ui/arrow-link";
import { cn } from "@/lib/utils";

const HEADLINE_SLIDES = [
  { text: "Thinking Beyond." },
  { text: "Thinking Future.", className: "text-brand" },
];

const VALUES = [
  {
    index: "01",
    title: "Scalable",
    description:
      "We empower the development of transformative solutions at scale, enabling rapid innovation and growth to meet your evolving needs.",
  },
  {
    index: "02",
    title: "Future Ready",
    description:
      "Our state-of-the-art data centers are built to transform the future of digital infrastructure, embracing adaptability and cutting-edge technologies.",
  },
  {
    index: "03",
    title: "Sustainable",
    description:
      "We focus on sustainability with renewable power sources, power efficiency, and water-saving measures for an eco-friendly and resource-efficient data center environment.",
  },
];

export function ValuesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const gridY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -50]);

  const { scrollYProgress: enterProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.95", "start 0.35"],
  });
  const headingOpacity = useTransform(enterProgress, [0, 1], [0, 1]);
  const headingScale = useTransform(enterProgress, [0, 1], [0.96, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-black/10 bg-white py-28 text-ink md:py-40"
    >
      {/* TECHNICAL GRID BACKDROP */}
      <motion.div
        style={{ y: gridY }}
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.14]"
      >
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(8,8,10,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(8,8,10,0.6) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </motion.div>
      <div className="pointer-events-none absolute right-[-12%] top-[-15%] -z-10 h-[520px] w-[520px] rounded-full bg-brand/15 blur-[180px]" />

      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <motion.div style={{ opacity: headingOpacity, scale: headingScale }}>
            <span className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-ink/60">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              Our Philosophy
            </span>
            <h2 className="font-sans text-[13vw] font-bold uppercase leading-[0.94] tracking-tight sm:text-[9vw] md:text-[5.2vw] lg:text-[4.4rem]">
              <RotatingHeadline />
            </h2>
          </motion.div>

          <RevealOnScroll
            direction="left"
            delay={0.25}
            className="max-w-sm text-balance leading-relaxed text-graphite md:pb-3"
          >
            Three principles guide how Infoelex designs, builds and operates
            digital infrastructure for what comes next.
          </RevealOnScroll>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {VALUES.map((value) => (
            <ValueCard key={value.index} value={value} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RotatingHeadline() {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { amount: 0.6 });
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!isInView || shouldReduceMotion) return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % HEADLINE_SLIDES.length);
    }, 2600);
    return () => clearInterval(id);
  }, [isInView, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return (
      <>
        {HEADLINE_SLIDES.map((slide) => (
          <span key={slide.text} className={cn("block", slide.className)}>
            {slide.text}
          </span>
        ))}
      </>
    );
  }

  const current = HEADLINE_SLIDES[active];

  return (
    <span
      ref={ref}
      className="relative grid h-[1.35em] w-full items-center overflow-hidden"
    >
      <span className="sr-only">
        {HEADLINE_SLIDES.map((slide) => slide.text).join(" ")}
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={current.text}
          aria-hidden="true"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "col-start-1 row-start-1 block w-max leading-none",
            current.className
          )}
        >
          {current.text}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function ValueCard({ value }: { value: (typeof VALUES)[number] }) {
  const [coords, setCoords] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [`${shouldReduceMotion ? 0 : 100}vw`, "0vw", `${shouldReduceMotion ? 0 : -100}vw`]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [shouldReduceMotion ? 1 : 0.9, 1, shouldReduceMotion ? 1 : 0.9]
  );

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const ghostStyle: CSSProperties = {
    WebkitTextStroke: "1px rgba(8,8,10,0.15)",
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMove}
      style={{ opacity, x, scale }}
      className="group relative flex h-full flex-col justify-between gap-8 rounded-xl border border-black/10 bg-white p-7 shadow-[0_1px_2px_rgba(8,8,10,0.04)] transition-shadow duration-500 hover:shadow-[0_16px_40px_-16px_rgba(8,8,10,0.16)] md:p-8"
    >
      {/* MOUSE-FOLLOW SPOTLIGHT */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          backgroundImage: `radial-gradient(320px circle at ${coords.x}% ${coords.y}%, rgba(223,44,28,0.14), transparent 70%)`,
        }}
      />

      {/* TOP ACCENT LINE */}
      <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-brand transition-transform duration-500 ease-out group-hover:scale-x-100" />

      <div className="relative flex items-start justify-between">
        <div className="relative">
          <span
            className="block text-transparent text-[2.75rem] font-bold leading-none md:text-[3.25rem]"
            style={ghostStyle}
          >
            {value.index}
          </span>
          <span
            aria-hidden="true"
            className="absolute inset-0 block text-[2.75rem] font-bold leading-none text-brand opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:text-[3.25rem]"
          >
            {value.index}
          </span>
        </div>
        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black/10 transition-colors duration-500 group-hover:bg-brand" />
      </div>

      <div className="relative">
        <h3 className="text-xl font-bold tracking-tight transition-transform duration-500 ease-out group-hover:translate-x-1.5 sm:text-2xl">
          {value.title}
        </h3>
        <p className="mt-3 max-w-xs text-balance text-sm leading-relaxed text-graphite">
          {value.description}
        </p>
        <ArrowLink href="#services" className="mt-6 text-ink">
          Read More
        </ArrowLink>
      </div>
    </motion.div>
  );
}
