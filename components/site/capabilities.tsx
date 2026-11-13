"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/home/reveal";
import { EASE } from "@/components/home/motion";
import { CAPABILITIES } from "./data";
import { CapabilityDrawing } from "./diagrams";
import { HeroArt } from "./hero-art";
import { CtaBand, SectionMark } from "./primitives";

/** Capabilities: a centred opener, then the orbit diagram doubles as the discipline selector. */
export function Capabilities() {
  const [active, setActive] = useState(0);
  const cap = CAPABILITIES[active];

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-mist-blue/70 via-canvas to-canvas pb-6 pt-32 text-graphite-950 md:pt-40">
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-24 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-signal/[0.06] blur-3xl" />
        <div className="wrap relative">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal className="flex justify-center">
              <SectionMark index="02" label="Capabilities" />
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="font-display mt-6 text-page text-balance">Six disciplines. One engineering team.</h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-graphite-600 md:text-lg">
                From the first network model to the last drawing issued, the same engineers carry the work. Pick a discipline on the diagram to see how we approach it.
              </p>
            </Reveal>
          </div>

          {/* Selector + detail */}
          <div className="mt-12 grid items-center gap-8 lg:mt-16 lg:grid-cols-12 lg:gap-6">
            <Reveal delay={0.1} className="lg:col-span-6">
              <HeroArt kind="capabilities" value={active} onValueChange={setActive} showReadout={false} className="mx-auto max-w-[34rem]" />
            </Reveal>

            <div className="lg:col-span-6" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.article
                  key={cap.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="rounded-[2rem] border border-hairline bg-white/90 p-7 shadow-lift backdrop-blur md:p-9"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className="flex items-center gap-3 text-eyebrow font-semibold uppercase text-signal">
                        <span className="h-px w-6 bg-signal" /> Discipline {cap.index}
                      </p>
                      <h2 className="font-display mt-3 text-section text-balance">{cap.title}</h2>
                    </div>
                    <div className="hidden aspect-[4/3] w-32 shrink-0 rounded-2xl bg-canvas p-2 sm:block">
                      <CapabilityDrawing id={cap.id} />
                    </div>
                  </div>
                  <p className="mt-5 leading-relaxed text-graphite-600">{cap.lead}</p>
                  <ul className="mt-6 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                    {cap.points.map((p) => (
                      <li key={p} className="flex gap-3 text-[15px] text-graphite-800">
                        <span aria-hidden className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7 flex flex-wrap items-center gap-2 border-t border-hairline pt-5">
                    <span className="mr-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-steel">Deliverables</span>
                    {cap.deliverables.map((d) => (
                      <span key={d} className="rounded-full bg-canvas-2 px-3 py-1 text-[13px] text-graphite-800">{d}</span>
                    ))}
                    <Link href={cap.href} className="ml-auto text-[12.5px] font-bold uppercase tracking-[0.1em] text-signal underline-offset-4 hover:underline">
                      Learn more →
                    </Link>
                  </div>
                </motion.article>
              </AnimatePresence>

              {/* Quick pills for keyboard / touch */}
              <div className="mt-4 flex flex-wrap gap-2">
                {CAPABILITIES.map((c, i) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={i === active}
                    className={`rounded-full border px-3.5 py-1.5 text-[13px] transition-colors ${i === active ? "border-signal bg-signal text-white" : "border-hairline bg-white text-graphite-600 hover:border-graphite-950/30 hover:text-graphite-950"}`}
                  >
                    {c.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-canvas pt-[calc(var(--space-section)*0.5)]">
        <CtaBand tone="slate" eyebrow="Where it matters most" title="Our deepest work is in mission-critical power." href="/critical-power" label="Critical Power" />
      </div>
    </>
  );
}
