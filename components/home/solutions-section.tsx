"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { SectionLabel } from "@/components/ui/section-label";
import { AnimatedText } from "@/components/ui/animated-text";
import { ArrowLink } from "@/components/ui/arrow-link";
import { cn } from "@/lib/utils";

type SolutionKind = "colocation" | "build-to-suit" | "powered-shell";

interface Solution {
  index: string;
  title: string;
  description: string;
  href: string;
  kind: SolutionKind;
}

const SOLUTIONS: Solution[] = [
  {
    index: "01",
    title: "Wholesale Colocation",
    description:
      "Dedicated high-density suites for hyperscale and enterprise deployments, delivered on flexible capacity terms.",
    href: "#solutions",
    kind: "colocation",
  },
  {
    index: "02",
    title: "Build to Suit",
    description:
      "Purpose-engineered facilities designed around your load profile, timeline and long-term expansion roadmap.",
    href: "#solutions",
    kind: "build-to-suit",
  },
  {
    index: "03",
    title: "Powered Shell",
    description:
      "Turnkey power and structural shell infrastructure, ready for your own fit-out and critical systems.",
    href: "#solutions",
    kind: "powered-shell",
  },
];

const POSITIONS = ["left", "mid", "right"] as const;

const SOLUTION_IMAGES: Record<SolutionKind, string> = {
  colocation: "/colocation-bg.png",
  "build-to-suit": "/build-to-suit-bg.png",
  "powered-shell": "/powered-shell-bg.png",
};

export function SolutionsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Group-choreographed reveal: one observer on the section, not per-card.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("is-visible");
          observer.unobserve(section);
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Clear will-change once each card's own reveal animation finishes.
  useEffect(() => {
    const cards = cardRefs.current.filter(
      (card): card is HTMLAnchorElement => card !== null
    );

    const onAnimationEnd = (event: AnimationEvent) => {
      (event.currentTarget as HTMLElement).style.willChange = "auto";
    };

    cards.forEach((card) => card.addEventListener("animationend", onAnimationEnd));
    return () => {
      cards.forEach((card) => card.removeEventListener("animationend", onAnimationEnd));
    };
  }, []);

  return (
    <section
      id="solutions"
      ref={sectionRef}
      className="io-solutions relative border-t border-black/10 bg-white text-ink"
    >
      <div className="mx-auto max-w-[1440px] px-6 py-14 md:px-10 md:py-20">
        <div>
          <SectionLabel>Infoelex Solutions</SectionLabel>
          <h2 className="mt-6 text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-[3.4rem]">
            <AnimatedText text="Adapting to your growth" trigger="inView" stagger={0.04} />
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:mt-14 md:h-[360px] md:grid-cols-3 lg:h-[400px]">
          {SOLUTIONS.map((solution, i) => (
            <a
              key={solution.index}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              href={solution.href}
              data-pos={POSITIONS[i]}
              className="io-solutions-card group relative block h-[300px] w-full overflow-hidden rounded-2xl bg-ink md:h-full"
            >
              {/* IMAGE LAYER */}
              <div className="absolute inset-0 transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]">
                <Image
                  src={SOLUTION_IMAGES[solution.kind]}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                  priority={solution.kind === "colocation"}
                />
              </div>

              {/* DARK OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10 transition-all duration-500 ease-out group-hover:from-ink/95 group-hover:via-ink/55" />

              {/* CONTENT */}
              <div className="relative flex h-full flex-col justify-between p-5 md:p-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-paper/60">
                    {solution.index}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-brand opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>

                <div>
                  <h3 className="text-balance text-xl font-bold leading-tight tracking-tight text-paper transition-transform duration-500 ease-out group-hover:-translate-y-1">
                    {solution.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-2 max-w-[26ch] text-balance text-sm leading-relaxed text-paper/70 transition-opacity duration-500",
                      "opacity-100 md:opacity-0 md:group-hover:opacity-100"
                    )}
                  >
                    {solution.description}
                  </p>
                  <ArrowLink as="span" className="mt-4 text-paper">
                    Learn More
                  </ArrowLink>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
