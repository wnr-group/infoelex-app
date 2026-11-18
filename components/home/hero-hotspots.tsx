"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "./use-reduced-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

interface Hotspot {
  id: string;
  top: number;
  left: number;
  /** Short name shown on the tag; the full title appears on hover or tap. */
  label: string;
  title: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: "distribution-shipping",
    label: "Distribution",
    top: 35.8,
    left: 12.9,
    title: "Distribution & Shipping",
  },
  {
    id: "building-infrastructure",
    label: "Building",
    top: 63.5,
    left: 82.8,
    title: "Building Infrastructure",
  },
  {
    id: "residential-infrastructure",
    label: "Residential",
    top: 29.6,
    left: 47.6,
    title: "Residential Infrastructure",
  },
  {
    id: "steel-cement",
    label: "PQ Solution",
    top: 72.3,
    left: 14.9,
    title: "PQ Solution",
  },
  {
    id: "pq-solution",
    label: "End-to-End Power",
    top: 52.9,
    left: 21.3,
    title: "End-to-End Power Generation, Transmission & Distribution",
  },
  {
    id: "water-treatment",
    label: "Water Treatment",
    top: 76.7,
    left: 44.6,
    title: "Water Treatment",
  },
  {
    id: "industrial-infrastructure",
    label: "Industrial",
    top: 53.8,
    left: 51.6,
    title: "Industrial Infrastructure",
  },
  {
    id: "data-centers-critical-infrastructure",
    label: "Data Centers",
    top: 45.5,
    left: 85.3,
    title: "Data Centers & Critical Infrastructure",
  },
  {
    id: "bess",
    label: "BESS",
    top: 40.9,
    left: 33.5,
    title: "Battery Energy Storage Systems (BESS)",
  },
  {
    id: "renewable-energy-integration",
    label: "Renewables",
    top: 20.8,
    left: 32.2,
    title: "Renewable Energy Integration",
  },
  {
    id: "power-generation-transmission-distribution",
    label: "Hydropower",
    top: 16.8,
    left: 78.4,
    title: "Hydropower & Dams",
  },
];

export function HeroHotspots() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative h-full w-full">
      {HOTSPOTS.map((hotspot) => {
        const isActive = activeId === hotspot.id;

        return (
          <div
            key={hotspot.id}
            className={cn("pointer-events-none absolute", isActive ? "z-30" : "z-10")}
            style={{ top: `${hotspot.top}%`, left: `${hotspot.left}%` }}
          >
            {/* the red dot under the tag sits on the hotspot coordinate */}
            <div className="relative -translate-x-1/2 -translate-y-[calc(100%-5px)]">
              <button
                type="button"
                aria-label={hotspot.title}
                aria-expanded={isActive}
                onMouseEnter={() => setActiveId(hotspot.id)}
                onMouseLeave={() => setActiveId(null)}
                onFocus={() => setActiveId(hotspot.id)}
                onBlur={() => setActiveId(null)}
                onClick={() =>
                  setActiveId((current) => (current === hotspot.id ? null : hotspot.id))
                }
                className="pointer-events-auto group flex flex-col items-center focus:outline-none"
              >
                {/* TAG */}
                <motion.span
                  animate={{ scale: isActive ? 1.06 : 1 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className={cn(
                    "block origin-bottom rounded-md bg-white text-center font-semibold leading-snug text-gray-950 shadow-[0_6px_16px_rgba(0,0,0,0.28)] ring-1 ring-black/5 group-focus-visible:ring-2 group-focus-visible:ring-brand",
                    "px-1.5 py-0.5 text-[8px] sm:px-2.5 sm:py-1 sm:text-[11px]",
                    isActive
                      ? "max-w-[130px] whitespace-normal sm:max-w-[220px]"
                      : "whitespace-nowrap"
                  )}
                >
                  {isActive ? hotspot.title : hotspot.label}
                </motion.span>

                {/* LEAD LINE from the tag down to the dot */}
                <span
                  aria-hidden
                  className={cn(
                    "block w-px bg-white shadow-[0_0_3px_rgba(0,0,0,0.5)] transition-[height] duration-300",
                    isActive ? "h-4 sm:h-6" : "h-3 sm:h-5"
                  )}
                />

                {/* DOT */}
                <span className="relative flex h-2 w-2 items-center justify-center sm:h-2.5 sm:w-2.5">
                  {!shouldReduceMotion && (
                    <motion.span
                      className="absolute inset-0 rounded-full bg-brand"
                      animate={{ scale: [1, 2.6], opacity: [0.55, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: (hotspot.top + hotspot.left) % 5 * 0.25,
                      }}
                    />
                  )}
                  <span className="relative h-full w-full rounded-full bg-brand shadow-[0_0_0_1.5px_rgba(255,255,255,0.9)]" />
                </span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
