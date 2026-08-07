"use client";

import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import { SectionLabel } from "@/components/ui/section-label";

const SERVICES = [
  {
    number: "01",
    title: "Wholesale Colocation",
    description:
      "Enterprise infrastructure designed for scalable and high-density computing.",
    direction: "left" as const,
  },
  {
    number: "02",
    title: "Build to Suit",
    description:
      "Purpose-built infrastructure designed around specific operational requirements.",
    direction: "right" as const,
  },
  {
    number: "03",
    title: "Powered Shell",
    description:
      "Flexible infrastructure solutions providing a strong foundation for rapid deployment.",
    direction: "up" as const,
  },
];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative bg-paper py-24 text-ink md:py-36"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <SectionLabel className="mb-6">Adapting To Your Growth</SectionLabel>
        <h2 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
          Solutions built around how you scale.
        </h2>

        <div className="mt-16 flex flex-col">
          {SERVICES.map((service) => (
            <RevealOnScroll
              key={service.number}
              direction={service.direction}
              className="group relative grid grid-cols-1 items-center gap-8 border-t border-ink/10 py-12 transition-colors duration-500 last:border-b md:grid-cols-12 md:gap-6 md:py-16"
            >
              <span className="pointer-events-none absolute left-0 top-0 h-full w-0 bg-brand/[0.04] transition-[width] duration-500 ease-out group-hover:w-full" />
              <span className="pointer-events-none absolute left-0 top-0 h-full w-0 bg-brand transition-[width] duration-500 ease-out group-hover:w-1" />

              <div className="relative md:col-span-1">
                <span className="font-mono text-sm font-semibold text-brand">
                  {service.number}
                </span>
              </div>

              <div className="relative md:col-span-5">
                <h3 className="text-3xl font-bold tracking-tight transition-transform duration-500 ease-out group-hover:translate-x-2 sm:text-4xl">
                  {service.title}
                </h3>
              </div>

              <div className="relative flex flex-col gap-5 md:col-span-4">
                <p className="max-w-sm text-balance leading-relaxed text-graphite">
                  {service.description}
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-ink"
                >
                  Learn More
                  <span className="transition-transform duration-300 ease-out group-hover:translate-x-1.5">
                    →
                  </span>
                </a>
              </div>

              <div className="relative hidden md:col-span-2 md:flex md:justify-end">
                <div className="relative h-20 w-20 overflow-hidden rounded-full border border-ink/10 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:border-brand/40">
                  <div
                    className="absolute inset-0 opacity-40"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, rgba(223,44,28,0.5) 0%, transparent 60%)",
                    }}
                  />
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
