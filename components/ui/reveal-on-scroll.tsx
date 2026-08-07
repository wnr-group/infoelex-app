"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "scale" | "none";

const DISTANCE = 56;

function buildVariants(direction: Direction): Variants {
  const offset: Record<Direction, { x?: number; y?: number; scale?: number }> = {
    up: { y: DISTANCE },
    down: { y: -DISTANCE },
    left: { x: -DISTANCE },
    right: { x: DISTANCE },
    scale: { scale: 0.94 },
    none: {},
  };

  return {
    hidden: { opacity: 0, filter: "blur(6px)", ...offset[direction] },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };
}

export function RevealOnScroll({
  children,
  direction = "up",
  delay = 0,
  duration,
  className,
  once = true,
  amount = 0.25,
  as: Component = motion.div,
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
  as?: typeof motion.div;
}) {
  const shouldReduceMotion = useReducedMotion();
  const variants = buildVariants(shouldReduceMotion ? "none" : direction);

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
      transition={{
        duration: duration ?? 0.9,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </Component>
  );
}

export function RevealGroup({
  children,
  className,
  stagger = 0.12,
  delayChildren = 0,
  once = true,
  amount = 0.25,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  once?: boolean;
  amount?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: shouldReduceMotion ? 0 : stagger,
            delayChildren: shouldReduceMotion ? 0 : delayChildren,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  direction = "up",
  className,
  duration,
}: {
  children: ReactNode;
  direction?: Direction;
  className?: string;
  duration?: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const variants = buildVariants(shouldReduceMotion ? "none" : direction);

  return (
    <motion.div
      className={className}
      variants={variants}
      transition={{ duration: duration ?? 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
