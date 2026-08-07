"use client";

import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import { ArrowLink } from "@/components/ui/arrow-link";
import { cn } from "@/lib/utils";

const VALUES = [
  {
    index: "01",
    title: "Scalable",
    description:
      "We empower the development of transformative solutions at scale, enabling rapid innovation and growth to meet your evolving needs.",
    direction: "left" as const,
  },
  {
    index: "02",
    title: "Future Ready",
    description:
      "Our state-of-the-art data centers are built to transform the future of digital infrastructure, embracing adaptability and cutting-edge technologies.",
    direction: "right" as const,
  },
  {
    index: "03",
    title: "Sustainable",
    description:
      "We focus on sustainability with renewable power sources, power efficiency, and water-saving measures for an eco-friendly and resource-efficient data center environment.",
    direction: "up" as const,
  },
];

export function ValuesSection() {
  return (
    <section className="relative border-t border-charcoal-light bg-ink text-paper">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        {VALUES.map((value, i) => (
          <RevealOnScroll
            key={value.index}
            direction={value.direction}
            className={cn(
              "grid grid-cols-1 gap-8 border-b border-white/10 py-16 md:grid-cols-12 md:gap-6 md:py-24",
              i === VALUES.length - 1 && "border-b-0"
            )}
          >
            <div
              className={cn(
                "md:col-span-5",
                value.direction === "right" ? "md:order-2" : "md:order-1"
              )}
            >
              <span className="block font-mono text-sm font-semibold text-brand">
                {value.index}
              </span>
              <h3 className="mt-4 text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
                {value.title}
              </h3>
            </div>

            <div
              className={cn(
                "flex flex-col justify-center gap-6 md:col-span-6",
                value.direction === "right" ? "md:order-1" : "md:order-2"
              )}
            >
              <p className="max-w-md text-balance text-lg leading-relaxed text-mist">
                {value.description}
              </p>
              <ArrowLink href="#services" className="text-paper">
                Read More
              </ArrowLink>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
