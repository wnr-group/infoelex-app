"use client";

import { useReducedMotion } from "./use-reduced-motion";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { cn } from "@/lib/utils";

/** Button that leans toward the pointer; a fill wipes across on hover. */
export function MagneticLink({
  href,
  children,
  variant = "solid",
  onDark = false,
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "ghost" | "light";
  /** Solid buttons on dark sections wipe to a deeper red instead of graphite. */
  onDark?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 180, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 180, damping: 18, mass: 0.4 });

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.22);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.28);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    variant === "solid"
      ? "bg-signal text-white"
      : variant === "light"
        ? "border border-white/25 text-white"
        : "border border-graphite-950/25 text-graphite-950";
  const wipe = variant === "solid" ? (onDark ? "bg-signal-deep" : "bg-graphite-950") : variant === "light" ? "bg-signal" : "bg-signal";
  const hoverText = variant === "ghost" ? "group-hover:text-white" : "";

  return (
    <motion.div ref={ref} style={{ x, y }} onPointerMove={onMove} onPointerLeave={reset} className="inline-block">
      <Link
        href={href}
        className={cn(
          "group relative inline-flex items-center gap-3 overflow-hidden rounded-xs px-7 py-4 text-[14px] font-semibold transition-colors duration-[240ms] ease-signature focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal",
          base,
          hoverText,
          className
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-0 origin-left scale-x-0 transition-transform duration-[500ms] ease-signature group-hover:scale-x-100",
            wipe
          )}
        />
        <span className="relative">{children}</span>
        <ArrowRight
          aria-hidden="true"
          className="relative h-4 w-4 transition-transform duration-[240ms] ease-signature group-hover:translate-x-1"
        />
      </Link>
    </motion.div>
  );
}

/** Text link with an underline that draws in on hover, plus an arrow. */
export function ArrowUnderline({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex items-center gap-2.5 py-1 text-[14px] font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal",
        className
      )}
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-signal transition-transform duration-[300ms] ease-signature group-hover:scale-x-100" />
      </span>
      <ArrowRight
        aria-hidden="true"
        className="h-4 w-4 text-signal transition-transform duration-[240ms] ease-signature group-hover:translate-x-1.5"
      />
    </Link>
  );
}
