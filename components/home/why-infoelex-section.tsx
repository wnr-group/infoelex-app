"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { SectionLabel } from "@/components/ui/section-label";
import { AnimatedText } from "@/components/ui/animated-text";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";

const BODY_PARAGRAPHS = [
  {
    index: "01",
    text: "Digital transformation, as evidenced particularly by proliferation of Artificial Intelligence and Machine Learning, rapid deployment of 5G networks and increased adoption of Internet of Things, necessitates a rethink of the data center design.",
  },
  {
    index: "02",
    text: "Infoelex is pioneering the development and operations of next-generation data centers that allow for high density and accelerated computing and other innovations, with a strong focus on water, power and space efficient cooling technologies.",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export function WhyInfoelexSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const gridY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -60]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-black/10 bg-white py-16 text-ink md:py-24"
    >
      {/* TECHNICAL GRID BACKDROP */}
      <motion.div
        style={{ y: gridY }}
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12]"
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
      <div className="pointer-events-none absolute left-[-14%] top-[8%] -z-10 h-[560px] w-[560px] rounded-full bg-brand/10 blur-[200px]" />

      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-x-10">
          {/* LEFT — LABEL / HEADING / INTRO */}
          <div className="md:col-span-5 md:pt-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              variants={fadeUp}
            >
              <SectionLabel>Why Infoelex</SectionLabel>
            </motion.div>

            <h2 className="mt-8 text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-[3.4rem] md:leading-[1.06]">
              <AnimatedText
                text="Transforming the data center landscape"
                trigger="inView"
                stagger={0.035}
              />
            </h2>

            <RevealOnScroll
              direction="up"
              delay={0.2}
              className="mt-8 max-w-md text-balance text-lg leading-relaxed text-graphite"
            >
              Infoelex develops &amp; operates cutting-edge, environmentally
              conscious data centers for the connected world.
            </RevealOnScroll>
          </div>

          {/* RIGHT — TECHNICAL VISUAL */}
          <div className="md:col-span-7">
            <InfrastructureFlowVisual />
          </div>
        </div>

        {/* BODY CONTENT */}
        <div className="mt-24 border-t border-black/10 pt-16 md:mt-32 md:pt-20">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
            {BODY_PARAGRAPHS.map((p, i) => (
              <RevealOnScroll
                key={p.index}
                direction="up"
                delay={i * 0.15}
                className="flex gap-6"
              >
                <span className="shrink-0 font-mono text-sm font-semibold text-brand">
                  {p.index}
                </span>
                <p className="text-balance leading-relaxed text-graphite">
                  {p.text}
                </p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const INPUT_NODES = [
  { key: "ai", label: "AI + ML", x: 260, y: 40 },
  { key: "5g", label: "5G", x: 70, y: 200 },
  { key: "iot", label: "IoT", x: 450, y: 200 },
];

const OUTPUT_NODES = [
  { key: "power", label: "POWER", x: 110, y: 400 },
  { key: "water", label: "WATER", x: 260, y: 420 },
  { key: "cooling", label: "COOLING", x: 410, y: 400 },
];

const CORE = { x: 260, y: 200, r: 46 };

function InfrastructureFlowVisual() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      variants={fadeUp}
      className="relative overflow-hidden rounded-2xl border border-black/10 bg-offwhite"
    >
      {/* PANEL DOT GRID */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.6]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(8,8,10,0.12) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* PANEL HEADER */}
      <div className="relative flex items-center justify-between border-b border-black/10 px-6 py-4 md:px-8">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-graphite">
          Fig. 01 — Infrastructure Flow
        </span>
        <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-graphite">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-brand"
            animate={
              shouldReduceMotion
                ? undefined
                : { opacity: [1, 0.3, 1] }
            }
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          System Active
        </span>
      </div>

      {/* DIAGRAM */}
      <div className="relative px-4 py-10 md:px-8 md:py-14">
        <svg
          viewBox="0 0 520 460"
          className="mx-auto h-auto w-full max-w-[460px] overflow-visible"
        >
          {/* CONNECTING LINES — inputs to core */}
          {INPUT_NODES.map((node, i) => (
            <motion.line
              key={`in-line-${node.key}`}
              x1={node.x}
              y1={node.y}
              x2={CORE.x}
              y2={CORE.y}
              stroke="rgba(8,8,10,0.22)"
              strokeWidth={1}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}

          {/* CONNECTING LINES — core to outputs */}
          {OUTPUT_NODES.map((node, i) => (
            <motion.line
              key={`out-line-${node.key}`}
              x1={CORE.x}
              y1={CORE.y}
              x2={node.x}
              y2={node.y}
              stroke="rgba(8,8,10,0.22)"
              strokeWidth={1}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.9, delay: 0.55 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}

          {/* TRAVELING PULSES — input flow */}
          {!shouldReduceMotion &&
            INPUT_NODES.map((node, i) => (
              <motion.circle
                key={`in-pulse-${node.key}`}
                r={3}
                fill="#DF2C1C"
                initial={{ opacity: 0 }}
                animate={{
                  cx: [node.x, CORE.x],
                  cy: [node.y, CORE.y],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  repeatDelay: 2.6,
                  delay: 1.1 + i * 0.4,
                  ease: "easeInOut",
                }}
              />
            ))}

          {/* TRAVELING PULSES — output flow */}
          {!shouldReduceMotion &&
            OUTPUT_NODES.map((node, i) => (
              <motion.circle
                key={`out-pulse-${node.key}`}
                r={3}
                fill="#DF2C1C"
                initial={{ opacity: 0 }}
                animate={{
                  cx: [CORE.x, node.x],
                  cy: [CORE.y, node.y],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  repeatDelay: 2.6,
                  delay: 2.2 + i * 0.4,
                  ease: "easeInOut",
                }}
              />
            ))}

          {/* CORE RING */}
          <motion.circle
            cx={CORE.x}
            cy={CORE.y}
            r={CORE.r + 16}
            fill="none"
            stroke="rgba(223,44,28,0.25)"
            strokeWidth={1}
            strokeDasharray="2 6"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: `${CORE.x}px ${CORE.y}px` }}
          />

          {/* CORE NODE */}
          <motion.circle
            cx={CORE.x}
            cy={CORE.y}
            r={CORE.r}
            fill="rgba(223,44,28,0.08)"
            stroke="#DF2C1C"
            strokeWidth={1.5}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: `${CORE.x}px ${CORE.y}px` }}
          />

          {/* INPUT NODES */}
          {INPUT_NODES.map((node, i) => (
            <motion.circle
              key={`node-${node.key}`}
              cx={node.x}
              cy={node.y}
              r={4}
              fill="#08080a"
              stroke="#DF2C1C"
              strokeWidth={1.5}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.12 }}
            />
          ))}

          {/* OUTPUT NODES */}
          {OUTPUT_NODES.map((node, i) => (
            <motion.circle
              key={`node-${node.key}`}
              cx={node.x}
              cy={node.y}
              r={4}
              fill="#08080a"
              stroke="rgba(8,8,10,0.35)"
              strokeWidth={1.5}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.12 }}
            />
          ))}
        </svg>

        {/* CORE LABEL */}
        <div
          className="pointer-events-none absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center"
          style={{
            left: `${(CORE.x / 520) * 100}%`,
            top: `${(CORE.y / 460) * 100}%`,
          }}
        >
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-ink">
            Compute
          </span>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-ink">
            Core
          </span>
        </div>

        {/* INPUT NODE LABELS */}
        {INPUT_NODES.map((node) => (
          <div
            key={`label-${node.key}`}
            className="pointer-events-none absolute w-24 -translate-x-1/2 text-center font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-graphite"
            style={{
              left: `${(node.x / 520) * 100}%`,
              top: `${(node.y / 460) * 100}%`,
              transform: "translate(-50%, -170%)",
            }}
          >
            {node.label}
          </div>
        ))}

        {/* OUTPUT NODE LABELS */}
        {OUTPUT_NODES.map((node) => (
          <div
            key={`label-${node.key}`}
            className="pointer-events-none absolute w-24 -translate-x-1/2 text-center font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-graphite"
            style={{
              left: `${(node.x / 520) * 100}%`,
              top: `${(node.y / 460) * 100}%`,
              transform: "translate(-50%, 60%)",
            }}
          >
            {node.label}
          </div>
        ))}
      </div>

      {/* PANEL FOOTER */}
      <div className="relative flex items-center justify-between border-t border-black/10 px-6 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-graphite md:px-8">
        <span>Digital Transformation</span>
        <span className="text-brand">High-Density Compute</span>
      </div>
    </motion.div>
  );
}
