"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "./use-reduced-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

interface Hotspot {
  id: string;
  top: number;
  left: number;
  title: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: "distribution-shipping",
    top: 35.8,
    left: 12.9,
    title: "Distribution & Shipping",
  },
  {
    id: "building-infrastructure",
    top: 63.5,
    left: 82.8,
    title: "Building Infrastructure",
  },
  {
    id: "residential-infrastructure",
    top: 29.6,
    left: 47.6,
    title: "Residential Infrastructure",
  },
  {
    id: "steel-cement",
    top: 72.3,
    left: 14.9,
    title: "PQ Solution",
  },
  {
    id: "pq-solution",
    top: 52.9,
    left: 21.3,
    title: "End-to-End Power Generation, Transmission & Distribution",
  },
  {
    id: "water-treatment",
    top: 76.7,
    left: 44.6,
    title: "Water Treatment",
  },
  {
    id: "industrial-infrastructure",
    top: 53.8,
    left: 51.6,
    title: "Industrial Infrastructure",
  },
  {
    id: "data-centers-critical-infrastructure",
    top: 45.5,
    left: 85.3,
    title: "Data Centers & Critical Infrastructure",
  },
  {
    id: "bess",
    top: 40.9,
    left: 33.5,
    title: "Battery Energy Storage Systems (BESS)",
  },
  {
    id: "renewable-energy-integration",
    top: 20.8,
    left: 32.2,
    title: "Renewable Energy Integration",
  },
  {
    id: "power-generation-transmission-distribution",
    top: 16.8,
    left: 78.4,
    title: "Hydropower & Dams",
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
                    className="absolute h-9 w-9 rounded-full border border-white/70"
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
                  className="absolute h-10 w-10 rounded-full bg-white blur-md"
                  animate={{ opacity: isActive ? 0.5 : 0.25 }}
                  transition={{ duration: 0.4, ease: EASE }}
                />

                {/* outer white ring */}
                <motion.span
                  className="absolute rounded-full border-2 border-white shadow-[0_0_10px_rgba(223,44,28,0.6)]"
                  animate={{
                    width: isActive ? 42 : 36,
                    height: isActive ? 42 : 36,
                    opacity: isActive ? 1 : 0.9,
                  }}
                  transition={{ duration: 0.35, ease: EASE }}
                />

                {/* solid brand-red core, framed by the white ring */}
                <motion.span
                  className="absolute rounded-full border-2 border-white bg-brand"
                  animate={{
                    width: isActive ? 32 : 28,
                    height: isActive ? 32 : 28,
                  }}
                  transition={{ duration: 0.35, ease: EASE }}
                />

                {/* white center dot */}
                <motion.span
                  className="absolute h-3 w-3 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]"
                  animate={{ scale: isActive ? 1.25 : 1 }}
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
                        "pointer-events-none absolute z-20 w-max max-w-[220px] rounded-lg border border-black/10 bg-white/95 px-4 py-2.5 shadow-[0_12px_32px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:max-w-[260px]",
                        horizontal === "right" ? "left-full ml-6" : "right-full mr-6",
                        vertical === "center" && "top-1/2 -translate-y-1/2",
                        vertical === "top" && "top-0",
                        vertical === "bottom" && "bottom-0"
                      )}
                    >
                      <span className="block text-[12px] font-semibold uppercase leading-snug tracking-[0.12em] text-gray-950">
                        {hotspot.title}
                      </span>
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
