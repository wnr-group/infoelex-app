"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import {
  ArrowUpRight,
  Atom,
  BatteryCharging,
  Building2,
  Cable,
  Droplets,
  Factory,
  Flame,
  Server,
  Ship,
  Sun,
  Waves,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "./use-reduced-motion";
import { SERVICES } from "./content";
import { IsoScene } from "./iso";
import { EASE } from "./motion";
import { Eyebrow, Reveal, ScrubHeadline } from "./reveal";

const ICONS: LucideIcon[] = [Cable, Sun, BatteryCharging, Server, Waves, Factory, Flame, Droplets, Atom, Ship, Building2];

/** All 11 service lines as an editorial index with a cursor-following preview. */
export function ServicesSection() {
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const px = useSpring(useMotionValue(0), { stiffness: 140, damping: 22, mass: 0.6 });
  const py = useSpring(useMotionValue(0), { stiffness: 140, damping: 22, mass: 0.6 });

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || reduce) return;
    // Sit to the right of the cursor so the hovered row's copy stays readable.
    px.set(Math.min(e.clientX + 240, window.innerWidth - 320));
    py.set(e.clientY - 110);
  };

  return (
    <section id="services" className="bg-canvas py-[var(--space-section)]">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>Services</Eyebrow>
          </div>
          <div className="lg:col-span-8">
            <ScrubHeadline
              text="Eleven disciplines, one engineering standard: from the first load-flow study to the day the system energises."
              className="font-display text-headline text-graphite-950"
            />
          </div>
        </div>

        <ul
          ref={listRef}
          className="mt-16 border-t border-hairline md:mt-24"
          onPointerMove={onMove}
          onPointerLeave={() => setActive(null)}
        >
          {SERVICES.map((s, i) => {
            const Icon = ICONS[i];
            const open = active === i;
            return (
              <Reveal key={s.title} as="li" clip delay={Math.min(i, 4) * 0.04} className="border-b border-hairline">
                <Link
                  href={s.href}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  className="group grid grid-cols-[auto_1fr_auto] items-start gap-x-5 gap-y-1 py-5 md:grid-cols-[4rem_2.5rem_1fr_auto] md:gap-x-7 md:py-6 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-signal"
                >
                  <span className="pt-1.5 text-[13px] tabular-nums text-steel md:pt-3">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Icon
                    aria-hidden="true"
                    strokeWidth={1.2}
                    className="hidden h-8 w-8 text-graphite-600 transition-[color,transform] duration-[300ms] ease-signature group-hover:-translate-y-0.5 group-hover:scale-110 group-hover:text-signal md:mt-1.5 md:block"
                  />
                  <div className="min-w-0">
                    <h3 className="font-display text-title font-medium text-graphite-950 transition-transform duration-[300ms] ease-signature group-hover:translate-x-1.5">
                      {s.title}
                    </h3>
                    <div
                      className={cn(
                        "grid transition-[grid-template-rows,opacity] duration-[360ms] ease-signature md:grid-rows-[0fr] md:opacity-0",
                        open && "md:grid-rows-[1fr] md:opacity-100"
                      )}
                    >
                      <p className="overflow-hidden text-[15px] leading-relaxed text-graphite-600 md:max-w-xl">
                        <span className="block pt-3">{s.blurb}</span>
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="mt-1.5 h-6 w-6 text-signal transition-[transform,opacity] duration-[300ms] ease-signature md:mt-2 md:-translate-x-3 md:opacity-0 md:group-hover:translate-x-0 md:group-hover:opacity-100"
                  />
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>

      {/* Cursor-following preview (fine pointers only) */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-30 hidden h-[220px] w-[300px] overflow-hidden border border-hairline bg-canvas-2 md:block"
        style={{ x: px, y: py }}
        animate={{ opacity: active === null ? 0 : 1, scale: active === null ? 0.94 : 1 }}
        transition={{ duration: 0.3, ease: EASE }}
      >
        <AnimatePresence mode="wait">
          {active !== null && (
            <motion.div
              key={active}
              className="h-full w-full p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: EASE }}
            >
              <IsoScene scene={SERVICES[active].scene} className="h-full w-full" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
