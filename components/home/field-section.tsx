"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "./use-reduced-motion";
import { Reveal } from "./reveal";

const TILES = [
  {
    src: "/photos/substation.jpg",
    alt: "Air-insulated substation at sunset with switchgear and busbars",
    tag: "Substations",
    title: "Protection, coordination and arc-flash studies for live networks.",
    wrapClass: "lg:col-span-7",
    aspect: "aspect-[4/3] lg:aspect-auto lg:h-[460px]",
    position: "object-center",
  },
  {
    src: "/photos/wind-turbines.jpg",
    alt: "Wind turbines on a hillside at sunrise",
    tag: "Renewables",
    title: "Grid-code compliance for wind, solar and hybrid plants.",
    wrapClass: "lg:col-span-5",
    aspect: "aspect-[4/3] lg:aspect-auto lg:h-[460px]",
    position: "object-[70%_50%]",
  },
  {
    src: "/photos/solar-farm.jpg",
    alt: "Aerial view of rows of solar panels",
    tag: "Utility-scale solar",
    title: "Plant modelling and connection studies, from yield to point of interconnection.",
    wrapClass: "lg:col-span-12",
    aspect: "aspect-[16/10] sm:aspect-[21/9]",
    position: "object-center",
  },
];

/** Full-bleed photographic section: parallax hero image, then a bento of field imagery. */
export function FieldSection() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="field" className="border-t border-hairline bg-canvas text-graphite-950">
      <div ref={heroRef} className="relative h-[62vh] min-h-[380px] overflow-hidden">
        <motion.div className="absolute inset-x-0 -inset-y-[10%]" style={reduce ? undefined : { y }}>
          <Image
            src="/photos/pylon-sunset.jpg"
            alt="High-voltage transmission tower against a dusk sky"
            fill
            sizes="100vw"
            quality={85}
            className="object-cover object-[65%_50%]"
          />
        </motion.div>
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-canvas to-transparent" />
      </div>

      <div className="wrap pb-14 pt-10 md:pb-20 md:pt-14">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <div className="flex items-center gap-3 text-eyebrow font-semibold uppercase text-steel">
              <span className="h-px w-8 bg-signal" />
              In the field
            </div>
          </Reveal>
          <div className="lg:col-span-8">
            <Reveal delay={0.08}>
              <h2 className="max-w-[20ch] font-display text-headline text-graphite-950">
                Engineered where the grid meets the real world.
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-graphite-600">
                From transmission corridors to substations and utility-scale renewables, our studies are built around
                how networks actually behave on site, not how they look on a drawing.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="wrap pb-[var(--space-section)]">
        <div className="grid gap-x-6 gap-y-12 lg:grid-cols-12">
          {TILES.map((t, i) => (
            <Reveal key={t.src} delay={i * 0.06} className={cn("group", t.wrapClass)}>
              <div className={cn("relative overflow-hidden border border-hairline bg-canvas-2", t.aspect)}>
                <Image
                  src={t.src}
                  alt={t.alt}
                  fill
                  sizes={t.wrapClass.includes("col-span-12") ? "(min-width: 1280px) 1280px, 100vw" : "(min-width: 1024px) 55vw, 100vw"}
                  className={cn(
                    "object-cover transition-transform duration-[1200ms] ease-signature group-hover:scale-[1.04]",
                    t.position
                  )}
                />
              </div>
              <p className="mt-5 flex items-center gap-3 text-eyebrow font-semibold uppercase text-steel">
                <span className="h-px w-6 bg-signal" />
                {t.tag}
              </p>
              <p className="mt-3 max-w-lg font-display text-title text-graphite-950">{t.title}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
