"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { value: "500+", label: "MW of Power Capacity", suffix: "" },
  { value: "3", label: "Countries Operational", suffix: "+" },
  { value: "99.999", label: "Uptime SLA", suffix: "%" },
  { value: "2012", label: "Founded", suffix: "" },
];

function StatItem({ stat, index }: { stat: (typeof STATS)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col border-l-2 border-brand/30 pl-6 transition-all duration-500 hover:border-brand"
    >
      <span className="text-4xl font-bold tabular-nums tracking-tight text-ink sm:text-5xl md:text-[3.25rem]">
        {stat.value}
        <span className="text-brand">{stat.suffix}</span>
      </span>
      <span className="mt-2 text-sm font-medium leading-snug text-graphite">{stat.label}</span>
    </motion.div>
  );
}

export function AboutStats() {
  return (
    <section className="relative border-t border-black/10 bg-offwhite py-16 md:py-20">
      {/* thin brand top accent */}
      <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand/0 via-brand/60 to-brand/0" />

      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="grid grid-cols-2 gap-10 sm:gap-12 md:grid-cols-4 md:gap-16">
          {STATS.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
