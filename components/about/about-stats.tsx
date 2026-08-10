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
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_3px_rgba(8,8,10,0.02)] transition-all duration-500 hover:-translate-y-1 hover:border-brand/35 hover:shadow-[0_20px_40px_-15px_rgba(223,44,28,0.08)]"
    >
      {/* Premium subtle glowing background on hover */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" 
        style={{
          background: "radial-gradient(circle at 50% 0%, rgba(223,44,28,0.04), transparent 75%)"
        }}
      />
      
      {/* Accent Top Border Line */}
      <span className="absolute inset-x-0 top-0 h-[2px] scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" />

      <span className="text-3xl font-bold tabular-nums tracking-tight text-ink sm:text-4xl md:text-5xl">
        {stat.value}
        <span className="text-brand font-medium">{stat.suffix}</span>
      </span>
      <span className="mt-2 block text-xs font-semibold uppercase tracking-wider text-graphite/90 group-hover:text-ink/80 transition-colors duration-300">
        {stat.label}
      </span>
    </motion.div>
  );
}

export function AboutStats() {
  return (
    <section className="relative border-t border-black/5 bg-offwhite py-20">
      {/* thin brand top accent */}
      <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand/0 via-brand/40 to-brand/0" />

      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4 lg:gap-10">
          {STATS.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
