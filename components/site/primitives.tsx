"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Eyebrow, Reveal } from "@/components/home/reveal";
import { cn } from "@/lib/utils";
import { HeroArt, type HeroArtKind } from "./hero-art";

/** Image that drifts slightly against the scroll. Container must be sized; the image overscans by 12%. */
export function ParallaxImage({
  src,
  alt,
  sizes,
  priority = false,
  className,
  imgClassName,
  strength = 8,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div className="absolute -inset-y-[12%] inset-x-0" style={reduce ? undefined : { y }}>
        <Image src={src} alt={alt} fill sizes={sizes} quality={90} priority={priority} className={cn("object-cover", imgClassName)} />
      </motion.div>
    </div>
  );
}

/** Primary / ghost call-to-action with an arrow that slides on hover. */
export function Cta({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "ghost-dark";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex w-fit items-center gap-3 rounded-full px-7 py-3.5 text-[12.5px] font-bold uppercase tracking-[0.1em] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal",
        variant === "primary" && "bg-brand text-white hover:bg-brand-dim",
        variant === "ghost" && "border border-paper/35 text-paper hover:border-paper hover:bg-paper hover:text-graphite-950",
        variant === "ghost-dark" && "border border-graphite-950/25 text-graphite-950 hover:border-graphite-950 hover:bg-graphite-950 hover:text-paper",
        className
      )}
    >
      {children}
      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/** Section index marker: "01 — Our Edge", used as the section's technical label. */
export function SectionMark({ index, label, dark = false, className }: { index: string; label: string; dark?: boolean; className?: string }) {
  return (
    <div className={cn("flex items-center gap-4 text-eyebrow font-semibold uppercase", dark ? "text-paper/70" : "text-steel", className)}>
      <span className="tabular-nums text-signal">{index}</span>
      <span className="h-px w-10 bg-current opacity-40" />
      {label}
    </div>
  );
}

/** Consistent page opener: label, calm headline, lead copy and actions; optional framed image on the right. */
export function PageHero({
  index,
  label,
  title,
  lead,
  actions,
  image,
  art,
  children,
  className,
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  actions?: React.ReactNode;
  image?: { src: string; alt: string; position?: string; caption?: string };
  /** Themed line-art shown in the image slot when the page has no photograph. */
  art?: HeroArtKind;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden bg-canvas pb-10 pt-32 text-graphite-950 md:pb-16 md:pt-40", className)}>
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-signal/[0.07] blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -left-32 top-1/2 h-[24rem] w-[24rem] rounded-full bg-slate-blue/[0.12] blur-3xl" />
      <div className="wrap relative">
        <div className={cn("grid gap-12 lg:gap-16", (image || art) && "lg:grid-cols-12 lg:items-center")}>
          <div className={cn(image || art ? "lg:col-span-6" : "max-w-3xl")}>
            <Reveal>
              <SectionMark index={index} label={label} />
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="font-display mt-6 text-page text-balance">{title}</h1>
            </Reveal>
            {lead && (
              <Reveal delay={0.12}>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-graphite-600 md:text-lg">{lead}</p>
              </Reveal>
            )}
            {actions && (
              <Reveal delay={0.18}>
                <div className="mt-8 flex flex-wrap gap-3">{actions}</div>
              </Reveal>
            )}
          </div>
          {art && !image && (
            <Reveal delay={0.12} className="lg:col-span-6">
              <HeroArt kind={art} />
            </Reveal>
          )}
          {image && (
            <Reveal delay={0.12} className="lg:col-span-6">
              <figure>
                <ParallaxImage
                  src={image.src}
                  alt={image.alt}
                  sizes="(min-width: 1024px) 560px, 100vw"
                  priority
                  strength={5}
                  className="aspect-[5/4] rounded-2xl shadow-lift ring-1 ring-graphite-950/10"
                  imgClassName={image.position}
                />
                {image.caption && (
                  <figcaption className="mt-3 flex items-center gap-3 text-[12px] uppercase tracking-[0.14em] text-steel">
                    <span className="h-px w-6 bg-signal" /> {image.caption}
                  </figcaption>
                )}
              </figure>
            </Reveal>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

/** Centered-left section heading used across pages. */
export function SectionHead({ eyebrow, title, lead, className }: { eyebrow: string; title: React.ReactNode; lead?: React.ReactNode; className?: string }) {
  return (
    <Reveal className={cn("max-w-2xl", className)}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="font-display mt-5 text-section text-balance">{title}</h2>
      {lead && <p className="mt-4 leading-relaxed text-graphite-600">{lead}</p>}
    </Reveal>
  );
}

/** Closing call-to-action: a soft rounded panel; tone changes the page's atmosphere. */
export function CtaBand({
  eyebrow,
  title,
  href,
  label,
  tone = "white",
}: {
  eyebrow: string;
  title: string;
  href: string;
  label: string;
  tone?: "white" | "warm" | "slate" | "sage";
}) {
  const tones = {
    white: "from-white to-canvas-2",
    warm: "from-warm to-warm-deep/70",
    slate: "from-white to-mist-blue",
    sage: "from-white to-sage",
  } as const;
  return (
    <section className="bg-canvas pb-[calc(var(--space-section)*0.55)] text-graphite-950">
      <div className="wrap">
        <Reveal className={cn("relative flex flex-wrap items-center justify-between gap-8 overflow-hidden rounded-[2.5rem] border border-hairline bg-gradient-to-br p-8 shadow-lift md:p-14", tones[tone])}>
          <div aria-hidden className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-signal/10 blur-3xl" />
          <div className="relative">
            <Eyebrow>{eyebrow}</Eyebrow>
            <p className="font-display mt-4 max-w-xl text-section text-balance">{title}</p>
          </div>
          <Cta href={href} className="relative">{label}</Cta>
        </Reveal>
      </div>
    </section>
  );
}
