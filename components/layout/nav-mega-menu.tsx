"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export interface MegaMenuItem {
  title: string;
  href: string;
}

export function NavMegaMenu({
  items,
  onNavigate,
}: {
  items: MegaMenuItem[];
  onNavigate: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ duration: 0.22, ease: EASE }}
      className="absolute left-0 top-full z-50 mt-3 w-72 origin-top overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.18)]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/80 to-transparent" />

      <div className="py-2">
        {items.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            onClick={onNavigate}
            className="group flex items-center justify-between gap-3 px-5 py-3 text-[13.5px] font-medium leading-snug text-gray-700 transition-colors duration-200 hover:bg-gray-50 hover:text-gray-950"
          >
            {item.title}
            <ArrowUpRight className="h-3.5 w-3.5 shrink-0 -translate-x-1 text-brand opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
