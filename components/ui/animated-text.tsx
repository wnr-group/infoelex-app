"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ElementType } from "react";

type Trigger = "mount" | "inView";

export function AnimatedText({
  text,
  as: Component = "span",
  className,
  delay = 0,
  stagger = 0.055,
  trigger = "inView",
  once = true,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  trigger?: Trigger;
  once?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  const lines = text.split("\n");

  const viewportProps =
    trigger === "inView"
      ? { initial: "hidden", whileInView: "visible", viewport: { once, amount: 0.6 } }
      : { initial: "hidden", animate: "visible" };

  if (shouldReduceMotion) {
    const MotionComponent = motion.create(Component);
    return (
      <MotionComponent
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {text}
      </MotionComponent>
    );
  }

  const MotionComponent = motion.create(Component);
  let wordIndex = 0;

  return (
    <MotionComponent className={className} {...viewportProps}>
      {lines.map((line, lineIdx) => (
        <span
          key={lineIdx}
          className="block overflow-hidden py-[0.08em]"
          aria-hidden={lineIdx > 0 ? undefined : undefined}
        >
          {line.split(" ").map((word, i) => {
            const currentIndex = wordIndex++;
            return (
              <span key={i} className="inline-block overflow-hidden align-top">
                <motion.span
                  className="inline-block will-change-transform"
                  variants={{
                    hidden: { y: "110%", opacity: 0, rotate: 3 },
                    visible: {
                      y: "0%",
                      opacity: 1,
                      rotate: 0,
                      transition: {
                        duration: 0.85,
                        ease: [0.16, 1, 0.3, 1],
                        delay: delay + currentIndex * stagger,
                      },
                    },
                  }}
                >
                  {word}
                  {i < line.split(" ").length - 1 ? " " : ""}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
      <span className="sr-only"> </span>
    </MotionComponent>
  );
}
