"use client";


import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "./use-reduced-motion";
import { INSIGHTS } from "./content";
import { IsoScene } from "./iso";
import { Eyebrow, Reveal, ScrubHeadline } from "./reveal";

type Insight = (typeof INSIGHTS)[number];

function Card({ item, index }: { item: Insight; index: number }) {
  return (
    <Link
      href={item.href}
      className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
    >
      <div
        data-cursor="view"
        className="bg-blueprint relative aspect-[4/3] overflow-hidden border border-hairline bg-canvas-2"
      >
        <div className="h-full w-full origin-center grayscale transition-[transform,filter] duration-[900ms] ease-signature group-hover:scale-[1.04] group-hover:grayscale-0">
          <IsoScene scene={item.scene} className="h-full w-full p-6 md:p-8" />
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between gap-4 text-eyebrow font-semibold uppercase text-steel">
        <span className="flex items-center gap-3">
          <span className="tabular-nums text-signal">{String(index + 1).padStart(2, "0")}</span>
          {item.tag}
        </span>
        <ArrowUpRight
          aria-hidden="true"
          className="h-5 w-5 text-signal transition-transform duration-[300ms] ease-signature group-hover:translate-x-1 group-hover:-translate-y-1"
        />
      </div>
      <h3 className="mt-3 max-w-[28rem] font-display text-title text-graphite-950">{item.title}</h3>
    </Link>
  );
}

/** Three insight cards. Desktop: pinned, scrolls sideways. Elsewhere: a plain grid. */
export function CasesSection() {
  const reduce = useReducedMotion();
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce || !pinRef.current || !trackRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const track = trackRef.current!;
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.5,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    });

    return () => mm.revert();
  }, [reduce]);

  return (
    <section id="insights" className="border-t border-hairline bg-canvas">
      <div className="wrap pt-[var(--space-section)] pb-14 md:pb-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>Insights</Eyebrow>
          </div>
          <div className="lg:col-span-8">
            <ScrubHeadline
              text="Field notes from the studies that shape how power systems are built."
              className="font-display text-headline text-graphite-950"
            />
          </div>
        </div>
      </div>

      <div ref={pinRef} className="pin-only h-screen overflow-hidden">
        <div className="flex h-full items-center">
          <div
            ref={trackRef}
            className="flex w-max items-center gap-12 pr-[12vw]"
            style={{ paddingLeft: "max(var(--space-gutter), calc((100vw - 1280px) / 2 + var(--space-gutter)))" }}
          >
            {INSIGHTS.map((item, i) => (
              <div key={item.title} className="w-[min(44vw,620px)] shrink-0">
                <Card item={item} index={i} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="stack-only wrap pb-[var(--space-section)]">
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-3">
          {INSIGHTS.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <Card item={item} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
