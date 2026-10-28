"use client";


import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "./use-reduced-motion";
import { EXPERTISE } from "./content";
import { IsoScene } from "./iso";
import { ArrowUnderline } from "./magnetic-link";
import { Eyebrow, Reveal, ScrubHeadline } from "./reveal";

type Item = (typeof EXPERTISE)[number];

function Copy({ item, total }: { item: Item; total: number }) {
  return (
    <>
      <div className="flex items-center gap-4 text-eyebrow font-semibold uppercase text-steel">
        <span className="tabular-nums text-signal">{item.index}</span>
        <span className="h-px w-10 bg-hairline" />
        <span className="tabular-nums">/ {String(total).padStart(2, "0")}</span>
      </div>
      <p className="mt-6 text-[13px] font-semibold uppercase tracking-[0.12em] text-steel">{item.tag}</p>
      <h3 className="mt-3 font-display text-headline text-graphite-950">{item.title}</h3>
      <p className="mt-6 max-w-md text-[17px] leading-relaxed text-graphite-600">{item.copy}</p>
      <ul className="mt-8 max-w-md divide-y divide-hairline border-y border-hairline">
        {item.points.map((p) => (
          <li key={p} className="flex items-center gap-3 py-3 text-[14px] text-graphite-800">
            <span className="h-1.5 w-1.5 shrink-0 bg-signal" />
            {p}
          </li>
        ))}
      </ul>
      <ArrowUnderline href={item.href} className="mt-8 text-graphite-950">
        Explore {item.tag}
      </ArrowUnderline>
    </>
  );
}

function Visual({ item, className }: { item: Item; className?: string }) {
  return (
    <div
      data-cursor="view"
      className={`relative overflow-hidden border border-hairline bg-canvas-2 bg-blueprint ${className ?? ""}`}
    >
      <IsoScene scene={item.scene} label={`Isometric illustration: ${item.tag}`} className="h-full w-full p-6 md:p-10" />
    </div>
  );
}

/**
 * Data Centers / BESS / Renewables. Desktop: pinned, text steps and the visual
 * cross-fades as you scroll. Mobile and reduced motion: stacked editorial blocks.
 */
export function ExpertiseSection() {
  const reduce = useReducedMotion();
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce || !pinRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const root = pinRef.current!;
      const texts = gsap.utils.toArray<HTMLElement>(".exp-text", root);
      const visuals = gsap.utils.toArray<HTMLElement>(".exp-visual", root);
      const dots = gsap.utils.toArray<HTMLElement>(".exp-dot", root);
      const n = texts.length;

      gsap.set(texts.slice(1), { opacity: 0, y: 40 });
      gsap.set(visuals.slice(1), { opacity: 0, y: 40 });
      gsap.set(dots.slice(1), { opacity: 0.25 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: `+=${(n - 1) * 90}%`,
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
        },
      });

      for (let i = 1; i < n; i++) {
        const at = (i - 1) * 1.2;
        tl.to(texts[i - 1], { opacity: 0, y: -40, duration: 0.4 }, at + 0.3)
          .to(visuals[i - 1], { opacity: 0, y: -40, duration: 0.4 }, at + 0.3)
          .to(dots[i - 1], { opacity: 0.25, duration: 0.2 }, at + 0.3)
          .to(texts[i], { opacity: 1, y: 0, duration: 0.5 }, at + 0.55)
          .to(visuals[i], { opacity: 1, y: 0, duration: 0.5 }, at + 0.55)
          .to(dots[i], { opacity: 1, duration: 0.2 }, at + 0.55);
        tl.to({}, { duration: 0.35 }, at + 1.05);
      }
    });

    return () => mm.revert();
  }, [reduce]);

  const total = EXPERTISE.length;

  return (
    <section id="sector" className="border-t border-hairline bg-canvas">
      <div className="wrap pt-[var(--space-section)] pb-16 md:pb-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>Featured expertise</Eyebrow>
          </div>
          <div className="lg:col-span-8">
            <ScrubHeadline
              text="Where the stakes are highest, the engineering has to be right first time."
              className="font-display text-headline text-graphite-950"
            />
          </div>
        </div>
      </div>

      {/* Desktop: pinned storytelling */}
      <div ref={pinRef} className="pin-only relative h-screen overflow-hidden">
          <div className="wrap relative grid h-full grid-cols-12 items-center gap-x-10">
            <div className="relative col-span-5 h-[min(34rem,78vh)]">
              {EXPERTISE.map((item) => (
                <div key={item.index} className="exp-text absolute inset-0 flex flex-col justify-center">
                  <Copy item={item} total={total} />
                </div>
              ))}
            </div>
            <div className="relative col-span-7 h-[min(34rem,72vh)]">
              {EXPERTISE.map((item) => (
                <div key={item.index} className="exp-visual absolute inset-0">
                  <Visual item={item} className="h-full w-full" />
                </div>
              ))}
              <div className="absolute -left-6 top-1/2 flex -translate-y-1/2 flex-col gap-3" aria-hidden="true">
                {EXPERTISE.map((item) => (
                  <span key={item.index} className="exp-dot block h-8 w-px bg-signal" />
                ))}
              </div>
            </div>
          </div>
        </div>

      {/* Mobile / reduced motion: stacked editorial blocks */}
      <div className="stack-only wrap pb-[var(--space-section)]">
        <div className="space-y-20 md:space-y-28">
          {EXPERTISE.map((item, i) => (
            <Reveal key={item.index} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
              <div className={`lg:col-span-7 ${i % 2 ? "lg:order-2" : ""}`}>
                <Visual item={item} className="aspect-[4/3] w-full" />
              </div>
              <div className="lg:col-span-5">
                <Copy item={item} total={total} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
