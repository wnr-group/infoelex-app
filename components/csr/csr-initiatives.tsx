"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { HeartPulse, Monitor, TreePine, type LucideIcon } from "lucide-react";
import { SectionLabel } from "@/components/ui/section-label";

interface Initiative {
  index: string;
  icon: LucideIcon;
  title: string;
  cadence: string;
  description: string;
  highlights: string[];
}

const INITIATIVES: Initiative[] = [
  {
    index: "01",
    icon: HeartPulse,
    title: "Blood Donation Drives",
    cadence: "Every quarter",
    description:
      "Our teams organise and take part in blood donation camps once every quarter, supporting local hospitals and blood banks with a steady, reliable supply.",
    highlights: [
      "Held four times a year, without fail",
      "Open to employees across all our offices",
      "Run in partnership with local hospitals and blood banks",
    ],
  },
  {
    index: "02",
    icon: TreePine,
    title: "Tree Plantation",
    cadence: "Ongoing",
    description:
      "We have planted hundreds of trees as part of our commitment to greener, more liveable communities — and we keep adding to that count each year.",
    highlights: [
      "Hundreds of saplings planted to date",
      "Native species chosen for long-term survival",
      "Planting supported by ongoing upkeep",
    ],
  },
  {
    index: "03",
    icon: Monitor,
    title: "Computers for Government Schools",
    cadence: "Ongoing",
    description:
      "We donate computers to government schools so that students get hands-on access to digital learning, regardless of what their school can afford.",
    highlights: [
      "Working PCs donated directly to government schools",
      "Aimed at students with limited access to computers",
      "Supporting practical, hands-on digital learning",
    ],
  },
];

function InitiativeCard({
  initiative,
  index,
}: {
  initiative: Initiative;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const shouldReduceMotion = useReducedMotion();
  const Icon = initiative.icon;

  return (
    <motion.div
      ref={ref}
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: shouldReduceMotion ? 0 : index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-black/5 bg-white p-7 shadow-[0_1px_3px_rgba(8,8,10,0.02)] transition-all duration-500 hover:-translate-y-1 hover:border-brand/35 hover:shadow-[0_20px_40px_-15px_rgba(223,44,28,0.08)]"
    >
      {/* Accent top border */}
      <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" />

      <div className="flex items-center justify-between gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-brand/30 bg-brand/10 text-brand">
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <span className="font-mono text-xs font-semibold text-brand/60">
          {initiative.index}
        </span>
      </div>

      <h3 className="mt-6 text-xl font-bold tracking-tight text-ink">
        {initiative.title}
      </h3>

      <span className="mt-2 inline-flex w-fit rounded-full bg-offwhite px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-graphite">
        {initiative.cadence}
      </span>

      <p className="mt-4 text-sm leading-relaxed text-graphite">
        {initiative.description}
      </p>

      <ul className="mt-6 flex flex-col gap-2.5 border-t border-black/5 pt-5">
        {initiative.highlights.map((highlight) => (
          <li key={highlight} className="flex items-start gap-2.5 text-sm text-graphite">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
            {highlight}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function CsrInitiatives() {
  return (
    <section className="relative border-t border-black/5 bg-offwhite py-24 md:py-28">
      <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand/0 via-brand/40 to-brand/0" />

      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16">
        <div className="max-w-2xl">
          <SectionLabel>What We Do</SectionLabel>
          <h2 className="mt-6 text-balance text-3xl font-bold leading-[1.1] tracking-tight text-ink sm:text-4xl">
            Our community initiatives
          </h2>
          <p className="mt-5 max-w-xl text-balance leading-relaxed text-graphite">
            Three programmes we run consistently, alongside the engineering work
            that pays for them.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {INITIATIVES.map((initiative, i) => (
            <InitiativeCard
              key={initiative.index}
              initiative={initiative}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
