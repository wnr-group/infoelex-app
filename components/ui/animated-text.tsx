"use client";

import { motion, useReducedMotion } from "framer-motion";

type Trigger = "mount" | "inView";

const MOTION_TAGS = {
  span: motion.span,
  div: motion.div,
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
} as const;

export function AnimatedText({
  text,
  as: tag = "span",
  className,
  delay = 0,
  stagger = 0.055,
  trigger = "inView",
  once = true,
}: {
  text: string;
  as?: keyof typeof MOTION_TAGS;
  className?: string;
  delay?: number;
  stagger?: number;
  trigger?: Trigger;
  once?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  const MotionComponent = MOTION_TAGS[tag];
  const lines = text.split("\n");

  const viewportProps =
    trigger === "inView"
      ? { initial: "hidden", whileInView: "visible", viewport: { once, amount: 0.6 } }
      : { initial: "hidden", animate: "visible" };

  if (shouldReduceMotion) {
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
