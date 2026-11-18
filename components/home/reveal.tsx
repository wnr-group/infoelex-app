"use client";

import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "./use-reduced-motion";
import { EASE, type RevealFrom } from "./motion";

const FROM_OFFSET: Record<RevealFrom, { x?: number; y?: number; scale?: number }> = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: -64 },
  right: { x: 64 },
  scale: { scale: 0.94, y: 20 },
};

/** Fade-in reveal, once, as the element enters the viewport. Plain fade-up by default; `from` picks a direction, `clip` a wipe. */
export function Reveal({
  children,
  className,
  delay = 0,
  clip = false,
  from,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  clip?: boolean;
  from?: RevealFrom;
  as?: "div" | "li" | "section" | "p" | "h2" | "h3";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[Tag] as typeof motion.div;
  const offset = from ? FROM_OFFSET[from] : { y: 24 };
  return (
    <Comp
      className={className}
      initial={reduce ? false : clip ? { clipPath: "inset(0 0 100% 0)", opacity: 0, ...offset } : { opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, ...(clip ? { clipPath: "inset(0 0 0% 0)" } : null) }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: from ? 1 : 0.8, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}

/** Headline whose words scrub from grey to graphite as it scrolls through the viewport. */
export function ScrubHeadline({
  text,
  as: Tag = "h2",
  className,
}: {
  text: string;
  as?: "h2" | "p";
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const words = text.split(" ");

  useEffect(() => {
    if (reduce || !ref.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".scrub-word",
        { opacity: 0.18 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 82%",
            end: "bottom 48%",
            scrub: 0.4,
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <Tag ref={ref as React.RefObject<never>} className={cn(className)}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="scrub-word inline-block">
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center gap-3 text-eyebrow font-semibold uppercase text-steel", className)}>
      <span className="h-px w-8 bg-signal" />
      {children}
    </div>
  );
}
