"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { Landmark, Leaf, Users } from "lucide-react";
import { SectionLabel } from "@/components/ui/section-label";
import { CoverflowCarousel, type CoverflowSlide } from "@/components/ui/coverflow-carousel";

const PILLARS: CoverflowSlide[] = [
  {
    id: "environment",
    eyebrow: "01 / 03",
    title: "Environment",
    icon: Leaf,
    caption:
      "Reducing our footprint through renewable power sourcing, water-efficient cooling and energy-conscious design at every site we build.",
  },
  {
    id: "social",
    eyebrow: "02 / 03",
    title: "Social",
    icon: Users,
    caption:
      "Investing in the people and communities around our facilities, from workforce safety to long-term local partnerships.",
  },
  {
    id: "governance",
    eyebrow: "03 / 03",
    title: "Governance",
    icon: Landmark,
    caption:
      "Operating with transparency and accountability, guided by rigorous compliance and ethical standards across every deployment.",
  },
];

const AUTOPLAY_MS = 5000;

// Premium, cinematic ease-out curve used across the site's scroll reveals.
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

// Heading group: eyebrow label leads, sentence-heading follows with a slight stagger delay.
const headingGroupVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const labelRevealVariants: Variants = {
  hidden: { opacity: 0, y: 30, transition: { duration: 0.8, ease: EASE_OUT } },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
};

const descriptionRevealVariants: Variants = {
  hidden: { opacity: 0, y: 20, transition: { duration: 0.9, ease: EASE_OUT } },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_OUT } },
};

// Visual elements group: carousel card frame + controls row, staggered in.
const visualGroupVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const visualItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, transition: { duration: 0.8, ease: EASE_OUT } },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: EASE_OUT } },
};

export function ESGSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgParallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-30, 30]
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-black/10 bg-white py-16 text-ink md:py-24"
    >
      <motion.div
        style={{ y: bgParallaxY }}
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, rgba(223,44,28,0.08), transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(8,8,10,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(8,8,10,0.06) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </motion.div>

      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
          variants={shouldReduceMotion ? undefined : headingGroupVariants}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div variants={shouldReduceMotion ? undefined : labelRevealVariants}>
            <SectionLabel className="mx-auto mb-8 justify-center">
              Our ESG Philosophy
            </SectionLabel>
          </motion.div>
          <motion.h2
            variants={shouldReduceMotion ? undefined : descriptionRevealVariants}
            className="text-balance text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl md:text-5xl"
          >
            As a data center developer and operator, we are committed to
            integrating sustainable practices into every aspect of our
            operations.
          </motion.h2>
        </motion.div>

        <motion.div
          className="mt-16 md:mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={shouldReduceMotion ? undefined : visualGroupVariants}
        >
          <motion.div
            variants={shouldReduceMotion ? undefined : visualItemVariants}
            className="mx-auto max-w-3xl"
          >
            <CoverflowCarousel
              slides={PILLARS}
              autoplayMs={AUTOPLAY_MS}
              theme="light"
              stageClassName="h-64 sm:h-72"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
