"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

interface Hotspot {
  id: string;
  top: number;
  left: number;
  title: string;
  description: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: "distribution-shipping",
    top: 31,
    left: 15,
    title: "Distribution & Shipping",
    description:
      "End-to-end distribution and shipping solutions moving power and industrial assets efficiently across regions.",
  },
  {
    id: "building-infrastructure",
    top: 50,
    left: 91,
    title: "Building Infrastructure",
    description:
      "Engineering robust infrastructure that forms the backbone of modern buildings and facilities.",
  },
  {
    id: "steel-cement",
    top: 70,
    left: 11,
    title: "Steel & Cement",
    description:
      "Power and automation solutions tailored for heavy steel and cement manufacturing operations.",
  },
  {
    id: "pq-solution",
    top: 30,
    left: 41,
    title: "PQ Solution",
    description:
      "Power Quality solutions that protect critical loads from harmonics, sags, and disturbances.",
  },
  {
    id: "water-treatment",
    top: 64,
    left: 35,
    title: "Water Treatment",
    description:
      "Reliable electrical and control systems powering water and wastewater treatment plants.",
  },
  {
    id: "green-hydrogen-ammonia",
    top: 84,
    left: 49,
    title: "Green Hydrogen & Green Ammonia",
    description:
      "Enabling the next generation of clean fuel production through green hydrogen and ammonia infrastructure.",
  },
  {
    id: "industrial-infrastructure",
    top: 52,
    left: 48,
    title: "Industrial Infrastructure",
    description:
      "Comprehensive electrical infrastructure engineered for demanding industrial environments.",
  },
  {
    id: "data-centers-critical-infrastructure",
    top: 28,
    left: 88,
    title: "Data Centers & Critical Infrastructure",
    description:
      "Resilient power systems safeguarding uptime for data centers and mission-critical facilities.",
  },
  {
    id: "bess",
    top: 48,
    left: 27,
    title: "Battery Energy Storage Systems (BESS)",
    description:
      "Advanced energy storage systems that balance supply and demand for a stable grid.",
  },
  {
    id: "renewable-energy-integration",
    top: 15,
    left: 29,
    title: "Renewable Energy Integration",
    description:
      "Seamless integration of solar, wind, and other renewables into the power network.",
  },
  {
    id: "power-generation-transmission-distribution",
    top: 15,
    left: 75,
    title: "Power Generation, Transmission & Distribution",
    description:
      "Full lifecycle expertise across generation, transmission, and distribution networks.",
  },
];

function getPlacement(hotspot: Hotspot) {
  const horizontal: "left" | "right" = hotspot.left > 55 ? "left" : "right";
  const vertical: "top" | "center" | "bottom" =
    hotspot.top < 22 ? "top" : hotspot.top > 78 ? "bottom" : "center";
  return { horizontal, vertical };
}

export function HeroHotspots() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative h-full w-full">
      {HOTSPOTS.map((hotspot) => {
        const isActive = activeId === hotspot.id;
        const { horizontal, vertical } = getPlacement(hotspot);

        return (
          <div
            key={hotspot.id}
            className="pointer-events-none absolute"
            style={{ top: `${hotspot.top}%`, left: `${hotspot.left}%` }}
          >
            <div className="relative -translate-x-1/2 -translate-y-1/2">
              {/* MARKER */}
              <button
                type="button"
                aria-label={hotspot.title}
                aria-expanded={isActive}
                aria-describedby={`hotspot-panel-${hotspot.id}`}
                onMouseEnter={() => setActiveId(hotspot.id)}
                onMouseLeave={() => setActiveId(null)}
                onFocus={() => setActiveId(hotspot.id)}
                onBlur={() => setActiveId(null)}
                onClick={() =>
                  setActiveId((current) => (current === hotspot.id ? null : hotspot.id))
                }
                className="pointer-events-auto relative flex h-11 w-11 items-center justify-center focus:outline-none"
              >
                {/* idle pulse ring */}
                {!shouldReduceMotion && (
                  <motion.span
                    className="absolute h-9 w-9 rounded-full border border-brand/50"
                    animate={{
                      scale: [1, 1.6, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: (hotspot.top + hotspot.left) % 5 * 0.3,
                    }}
                  />
                )}

                {/* glow */}
                <motion.span
                  className="absolute h-10 w-10 rounded-full bg-brand blur-md"
                  animate={{ opacity: isActive ? 0.55 : 0.2 }}
                  transition={{ duration: 0.4, ease: EASE }}
                />

                {/* outer thin ring */}
                <motion.span
                  className="absolute rounded-full border border-brand/60"
                  animate={{
                    width: isActive ? 36 : 28,
                    height: isActive ? 36 : 28,
                    borderColor: isActive
                      ? "rgba(223,44,28,0.9)"
                      : "rgba(223,44,28,0.55)",
                  }}
                  transition={{ duration: 0.35, ease: EASE }}
                />

                {/* dark translucent center */}
                <motion.span
                  className="absolute rounded-full bg-ink/70 backdrop-blur-[2px]"
                  animate={{
                    width: isActive ? 26 : 20,
                    height: isActive ? 26 : 20,
                  }}
                  transition={{ duration: 0.35, ease: EASE }}
                />

                {/* small concentric ring */}
                <motion.span
                  className="absolute rounded-full border border-brand/70"
                  animate={{ width: isActive ? 16 : 12, height: isActive ? 16 : 12 }}
                  transition={{ duration: 0.35, ease: EASE }}
                />

                {/* center dot */}
                <motion.span
                  className="absolute h-1.5 w-1.5 rounded-full bg-brand"
                  animate={{ scale: isActive ? 1.3 : 1 }}
                  transition={{ duration: 0.35, ease: EASE }}
                />
              </button>

              {/* CONNECTOR + PANEL */}
              <AnimatePresence>
                {isActive && (
                  <>
                    <motion.span
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      exit={{ scaleX: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className={cn(
                        "pointer-events-none absolute top-1/2 h-px w-6 -translate-y-1/2 bg-gradient-to-r from-brand/80 to-brand/10",
                        horizontal === "right"
                          ? "left-full origin-left"
                          : "right-full origin-right rotate-180"
                      )}
                    />

                    <motion.div
                      id={`hotspot-panel-${hotspot.id}`}
                      role="tooltip"
                      initial={{
                        opacity: 0,
                        scale: 0.94,
                        x: horizontal === "right" ? -8 : 8,
                      }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{
                        opacity: 0,
                        scale: 0.94,
                        x: horizontal === "right" ? -8 : 8,
                      }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className={cn(
                        "pointer-events-none absolute z-20 w-[240px] rounded-xl border border-brand/25 bg-ink/80 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:w-[280px]",
                        horizontal === "right" ? "left-full ml-6" : "right-full mr-6",
                        vertical === "center" && "top-1/2 -translate-y-1/2",
                        vertical === "top" && "top-0",
                        vertical === "bottom" && "bottom-0"
                      )}
                    >
                      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
                        {hotspot.title}
                      </span>
                      <p className="text-sm leading-relaxed text-paper/85">
                        {hotspot.description}
                      </p>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        );
      })}
    </div>
  );
}
