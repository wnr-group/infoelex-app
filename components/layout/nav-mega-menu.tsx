"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export interface MegaMenuItem {
  index: string;
  title: string;
  href: string;
}

export interface MegaMenuData {
  eyebrow: string;
  description: string;
  items: MegaMenuItem[];
  featured: {
    label: string;
    value: string;
    description: string;
    href: string;
  };
}

export function NavMegaMenu({
  data,
  onNavigate,
}: {
  data: MegaMenuData;
  onNavigate: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.99 }}
      transition={{ duration: 0.28, ease: EASE }}
      className="absolute inset-x-0 top-full mt-2 overflow-hidden rounded-2xl border border-white/10 bg-ink/95 shadow-[0_30px_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/80 to-transparent" />

      <div className="grid grid-cols-1 gap-10 px-8 py-10 md:grid-cols-12 md:gap-8 md:px-10 md:py-11">
        <div className="md:col-span-3">
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand">
            {data.eyebrow}
          </span>
          <p className="mt-4 max-w-[200px] text-balance text-sm leading-relaxed text-graphite">
            {data.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 md:col-span-6">
          {data.items.map((item) => (
            <a
              key={item.title}
              href={item.href}
              onClick={onNavigate}
              className="group flex items-center gap-3 border-b border-white/5 py-3.5"
            >
              <span className="font-mono text-[11px] font-semibold text-brand/60 transition-colors duration-300 group-hover:text-brand">
                {item.index}
              </span>
              <span className="text-sm font-medium leading-snug text-paper/85 transition-colors duration-300 group-hover:text-paper">
                {item.title}
              </span>
              <ArrowUpRight className="ml-auto h-3.5 w-3.5 shrink-0 text-graphite opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand group-hover:opacity-100" />
            </a>
          ))}
        </div>

        <div className="md:col-span-3 md:border-l md:border-white/10 md:pl-8">
          <a href={data.featured.href} onClick={onNavigate} className="group block">
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-graphite">
              {data.featured.label}
            </span>
            <div className="mt-3 text-4xl font-bold tracking-tight text-paper">
              {data.featured.value}
            </div>
            <p className="mt-3 max-w-[180px] text-sm leading-relaxed text-graphite">
              {data.featured.description}
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
              Learn more
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
