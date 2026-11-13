import Image from "next/image";
import { Eyebrow, Reveal } from "@/components/home/reveal";
import { CRITICAL_AREAS, CRITICAL_CONCEPTS } from "./data";
import { RedundancyDiagram } from "./diagrams";
import { Cta, CtaBand, ParallaxImage, SectionMark } from "./primitives";

/** Critical Power: a precise, technical page. Arch-framed photo, a diagram stage, ruled columns. */
export function CriticalPower() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-canvas to-mist-blue/60 pb-16 pt-32 text-graphite-950 md:pb-24 md:pt-40">
        <div aria-hidden className="pointer-events-none absolute -right-20 top-10 h-[30rem] w-[30rem] rounded-full bg-signal/[0.07] blur-3xl" />
        <div className="wrap relative grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionMark index="03" label="Critical Power" />
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="font-display mt-6 text-page text-balance">
                When downtime is not an <span className="text-signal">option.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-graphite-600 md:text-lg">
                A specialist engineering partner for data centers and mission-critical infrastructure: power architectures designed, studied and proven before the first rack is energised.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Cta href="#architecture">See the architecture</Cta>
                <Cta href="/contact" variant="ghost-dark">Discuss a facility</Cta>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <ul className="mt-10 flex flex-wrap gap-2">
                {["Reliability", "Redundancy", "Resilience"].map((w) => (
                  <li key={w} className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white px-4 py-2 text-sm font-medium shadow-hair">
                    <span className="h-1.5 w-1.5 rounded-full bg-signal" /> {w}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
            <ParallaxImage
              src="/colocation-bg.png"
              alt="Technician with a tablet walking a dark data hall between server racks"
              sizes="(min-width: 1024px) 28rem, 90vw"
              priority
              strength={5}
              className="mx-auto aspect-[3/4] w-full max-w-md rounded-t-[999px] rounded-b-[2rem] shadow-lift ring-1 ring-graphite-950/10"
              imgClassName="object-[30%_center]"
            />
            <div className="absolute -left-2 bottom-10 rounded-2xl border border-white/70 bg-white/85 px-5 py-3.5 shadow-lift backdrop-blur-xl sm:-left-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-steel">Topology</p>
              <p className="font-display mt-1 text-card">N+1 · 2N · Distributed</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Architecture: the diagram on a soft rounded stage */}
      <section id="architecture" className="scroll-mt-24 bg-canvas py-[calc(var(--space-section)*0.5)] text-graphite-950">
        <div className="wrap">
          <Reveal className="rounded-[2.5rem] border border-hairline bg-gradient-to-br from-white via-white to-mist-blue p-6 shadow-lift sm:p-10 md:p-14">
            <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <Eyebrow>Power architecture</Eyebrow>
                <h2 className="font-display mt-5 text-section text-balance">See what redundancy actually buys.</h2>
              </div>
              <p className="leading-relaxed text-graphite-600 lg:col-span-5">
                Switch topology, then fail a component. The diagram traces which paths still feed the load, the same question our resilience studies answer on the real network.
              </p>
            </div>
            <div className="mt-10">
              <RedundancyDiagram />
            </div>
            <p className="mt-5 text-[12px] text-steel">Illustrative single-path schematic; real facilities add generators, static transfer switches and multiple distribution tiers.</p>
          </Reveal>
        </div>
      </section>

      {/* Three ideas: open columns split by hairlines */}
      <section className="bg-canvas py-[calc(var(--space-section)*0.6)] text-graphite-950">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <Eyebrow>Three ideas, often confused</Eyebrow>
            <h2 className="font-display mt-5 text-section text-balance">Reliability, redundancy and resilience are not the same thing.</h2>
          </Reveal>
          <div className="mt-14 grid md:grid-cols-3">
            {CRITICAL_CONCEPTS.map((c, i) => (
              <Reveal key={c.word} delay={i * 0.08} className="border-t border-graphite-950/20 py-8 md:border-l md:border-t-0 md:px-8 md:py-2 md:first:border-l-0 md:first:pl-0">
                <p className="font-display text-[3.25rem] leading-none tracking-[-0.04em] text-transparent [-webkit-text-stroke:1.5px_var(--color-graphite-950)] opacity-25">0{i + 1}</p>
                <h3 className="font-display mt-5 text-section">{c.word}</h3>
                <p className="mt-3 font-semibold">{c.line}</p>
                <p className="mt-3 max-w-xs leading-relaxed text-graphite-600">{c.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Six areas: ruled list beside an image */}
      <section className="bg-canvas py-[calc(var(--space-section)*0.5)] text-graphite-950">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>Focus areas</Eyebrow>
              <h2 className="font-display mt-5 text-section text-balance">Six areas where we engineer for continuity.</h2>
            </Reveal>
            <ol className="mt-10">
              {CRITICAL_AREAS.map((a, i) => (
                <Reveal as="li" key={a.title} className="group grid grid-cols-[2.5rem_1fr_auto] items-start gap-4 border-t border-hairline py-6 last:border-b">
                  <span className="pt-1 text-sm font-semibold tabular-nums text-steel transition-colors group-hover:text-signal">0{i + 1}</span>
                  <div>
                    <h3 className="font-display text-card">{a.title}</h3>
                    <p className="mt-1.5 max-w-lg text-[15px] leading-relaxed text-graphite-600">{a.copy}</p>
                  </div>
                  <span aria-hidden className="pt-1 text-steel transition-all duration-300 group-hover:translate-x-1 group-hover:text-signal">→</span>
                </Reveal>
              ))}
            </ol>
            <div className="mt-10">
              <Cta href="/sectors/data-centres">Data centre sector</Cta>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-lift ring-1 ring-graphite-950/10 lg:rounded-b-[999px] lg:rounded-t-[2rem]">
                  <Image src="/build-to-suit-bg.png" alt="Data center under construction with the electrical layout drawn over the site" fill sizes="(min-width: 1024px) 30rem, 100vw" quality={90} className="object-cover object-[55%_center]" />
                </div>
                <p className="mt-3 flex items-center gap-3 text-[12px] uppercase tracking-[0.14em] text-steel">
                  <span className="h-px w-6 bg-signal" /> Design drawn over the build
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-canvas pt-[calc(var(--space-section)*0.4)]">
        <CtaBand tone="slate" eyebrow="Mission-critical" title="Planning a data centre or critical facility?" href="/contact" label="Discuss a facility" />
      </div>
    </>
  );
}
