"use client";

import { motion, useReducedMotion } from "framer-motion";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import { SectionLabel } from "@/components/ui/section-label";

const NODES = [
  { key: "power", label: "Power Efficiency", x: 300, y: 110 },
  { key: "water", label: "Water Conservation", x: 110, y: 300 },
  { key: "energy", label: "Renewable Energy", x: 490, y: 300 },
  { key: "infra", label: "Responsible Infrastructure", x: 300, y: 490 },
];

const CENTER = { x: 300, y: 300 };

export function ESGSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-charcoal py-24 text-paper md:py-36">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(223,44,28,0.12), transparent 60%)",
        }}
      />

      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <RevealOnScroll direction="up" className="mx-auto max-w-3xl text-center">
          <SectionLabel light className="mx-auto mb-8 justify-center">
            Our ESG Philosophy
          </SectionLabel>
          <h2 className="text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            As a data center developer and operator, we are committed to
            integrating sustainable practices into every aspect of our
            operations.
          </h2>
        </RevealOnScroll>

        <RevealOnScroll direction="scale" delay={0.15} className="mx-auto mt-20 max-w-xl">
          <div className="relative mx-auto aspect-square w-full max-w-[560px]">
            <svg viewBox="0 0 600 600" className="h-full w-full overflow-visible">
              {NODES.map((node, i) => (
                <motion.line
                  key={node.key}
                  x1={CENTER.x}
                  y1={CENTER.y}
                  x2={node.x}
                  y2={node.y}
                  stroke="rgba(250,250,249,0.18)"
                  strokeWidth={1}
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 1, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                />
              ))}

              {!shouldReduceMotion &&
                NODES.map((node, i) => (
                  <motion.circle
                    key={`pulse-${node.key}`}
                    r={4}
                    fill="#DF2C1C"
                    initial={{ cx: CENTER.x, cy: CENTER.y, opacity: 0 }}
                    animate={{
                      cx: [CENTER.x, node.x],
                      cy: [CENTER.y, node.y],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      repeatDelay: 2.2,
                      delay: 1.4 + i * 0.5,
                      ease: "easeInOut",
                    }}
                  />
                ))}

              <motion.circle
                cx={CENTER.x}
                cy={CENTER.y}
                r={64}
                fill="rgba(223,44,28,0.08)"
                stroke="#DF2C1C"
                strokeWidth={1}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "300px 300px" }}
              />

              {NODES.map((node, i) => (
                <motion.circle
                  key={`node-${node.key}`}
                  cx={node.x}
                  cy={node.y}
                  r={5}
                  fill="#0a0a0b"
                  stroke="#DF2C1C"
                  strokeWidth={1.5}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.12 }}
                />
              ))}
            </svg>

            <div
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center"
              style={{ left: "50%", top: "50%" }}
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-paper">
                Sustainability
              </span>
            </div>

            {NODES.map((node) => (
              <div
                key={`label-${node.key}`}
                className="absolute w-32 -translate-x-1/2 text-center text-xs font-medium leading-snug text-graphite"
                style={{
                  left: `${(node.x / 600) * 100}%`,
                  top: `${(node.y / 600) * 100}%`,
                  transform: `translate(-50%, ${node.y < CENTER.y ? "-140%" : "40%"})`,
                }}
              >
                {node.label}
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
