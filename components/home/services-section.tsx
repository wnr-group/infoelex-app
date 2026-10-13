"use client";

import { AnimatePresence, motion } from "framer-motion";
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
import { useState } from "react";
import { cn } from "@/lib/utils";
import { SERVICES } from "./content";
import { IsoScene } from "./iso";
import { ArrowUnderline } from "./magnetic-link";
import { EASE } from "./motion";
import { Eyebrow, Reveal, ScrubHeadline } from "./reveal";

const ICONS: LucideIcon[] = [Cable, Sun, BatteryCharging, Server, Waves, Factory, Flame, Droplets, Atom, Ship, Building2];

const pad = (n: number) => String(n).padStart(2, "0");

/** Corner crop marks, like the edge of an engineering drawing. */
function Corners() {
  const c = "absolute h-3 w-3 border-graphite-950/40";
  return (
    <>
      <span aria-hidden="true" className={cn(c, "left-3 top-3 border-l border-t")} />
      <span aria-hidden="true" className={cn(c, "right-3 top-3 border-r border-t")} />
      <span aria-hidden="true" className={cn(c, "bottom-3 left-3 border-b border-l")} />
      <span aria-hidden="true" className={cn(c, "bottom-3 right-3 border-b border-r")} />
    </>
  );
}

/** All 11 service lines: a live illustrated preview on the left, a clean index on the right. */
export function ServicesSection() {
  const [active, setActive] = useState(0);
  const current = SERVICES[active];

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

        <div className="mt-16 grid gap-x-16 gap-y-12 md:mt-24 lg:grid-cols-12">
          {/* Live preview (desktop) */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <div className="bg-blueprint relative aspect-[4/3] overflow-hidden border border-hairline bg-canvas-2">
                <Corners />
                <div className="absolute left-6 top-5 z-10 text-[11px] font-semibold uppercase tracking-[0.16em] text-steel">
                  Fig. {pad(active + 1)}
                </div>
                <div className="absolute bottom-5 right-6 z-10 text-[11px] font-semibold tabular-nums tracking-[0.16em] text-steel">
                  {pad(active + 1)} / {pad(SERVICES.length)}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    className="absolute inset-0 p-10"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <IsoScene scene={current.scene} className="h-full w-full" />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-8 min-h-[11rem]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    <p className="text-eyebrow font-semibold uppercase text-signal">Service {pad(active + 1)}</p>
                    <h3 className="mt-3 font-display text-title font-medium text-graphite-950">{current.title}</h3>
                    <p className="mt-3 max-w-md text-[15px] leading-relaxed text-graphite-600">{current.blurb}</p>
                    <ArrowUnderline href={current.href} className="mt-5 text-graphite-950">
                      Explore this service
                    </ArrowUnderline>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Index */}
          <ol className="border-t border-hairline lg:col-span-7">
            {SERVICES.map((s, i) => {
              const Icon = ICONS[i];
              const on = active === i;
              return (
                <Reveal key={s.title} as="li" clip delay={Math.min(i, 4) * 0.04} className="border-b border-hairline">
                  <Link
                    href={s.href}
                    onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group relative grid grid-cols-[auto_1fr_auto] items-start gap-x-5 gap-y-1 py-5 pl-5 pr-2 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-signal md:grid-cols-[3rem_2rem_1fr_auto] md:gap-x-6 md:py-6"
                  >
                    {/* active marker */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute bottom-0 left-0 top-0 w-[2px] origin-top bg-signal transition-transform duration-[400ms] ease-signature",
                        on ? "scale-y-100" : "scale-y-0"
                      )}
                    />
                    <span
                      className={cn(
                        "pt-1.5 text-[12px] font-semibold tabular-nums tracking-[0.12em] transition-colors duration-[300ms] ease-signature md:pt-2",
                        on ? "text-signal" : "text-steel"
                      )}
                    >
                      {pad(i + 1)}
                    </span>
                    <Icon
                      aria-hidden="true"
                      strokeWidth={1.2}
                      className={cn(
                        "hidden h-6 w-6 transition-colors duration-[300ms] ease-signature md:mt-1 md:block",
                        on ? "text-signal" : "text-graphite-600/70"
                      )}
                    />
                    <div className="min-w-0">
                      <h3
                        className={cn(
                          "font-display text-title font-medium transition-[color,transform] duration-[300ms] ease-signature",
                          on ? "translate-x-1 text-graphite-950" : "text-graphite-600 lg:text-graphite-800"
                        )}
                      >
                        {s.title}
                      </h3>
                      {/* Mobile and touch: description always visible */}
                      <p className="mt-2 max-w-md text-[14px] leading-relaxed text-graphite-600 lg:hidden">{s.blurb}</p>
                    </div>
                    <ArrowUpRight
                      aria-hidden="true"
                      className={cn(
                        "mt-1.5 h-5 w-5 text-signal transition-[transform,opacity] duration-[300ms] ease-signature md:mt-2",
                        on ? "translate-x-0 opacity-100" : "opacity-100 lg:-translate-x-2 lg:opacity-0"
                      )}
                    />
                  </Link>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
