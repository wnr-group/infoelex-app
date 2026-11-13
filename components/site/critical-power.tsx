import Image from "next/image";
import { Reveal } from "@/components/home/reveal";
import { CRITICAL_AREAS, CRITICAL_CONCEPTS } from "./data";
import { RedundancyDiagram } from "./diagrams";
import { Cta, CtaBand, PageHero, SectionHead } from "./primitives";

export function CriticalPower() {
  return (
    <>
      <PageHero
        index="03"
        label="Critical Power"
        title={
          <>
            When downtime is not an <span className="text-signal">option.</span>
          </>
        }
        lead="We are a specialist engineering partner for data centers and mission-critical infrastructure: power architectures designed, studied and proven before the first rack is energised."
        actions={
          <>
            <Cta href="#architecture">See the architecture</Cta>
            <Cta href="/contact" variant="ghost-dark">Discuss a facility</Cta>
          </>
        }
        image={{
          src: "/colocation-bg.png",
          alt: "Technician with a tablet walking a dark data hall between server racks",
          position: "object-[30%_center]",
          caption: "Data hall, commissioning walk-down",
        }}
      />

      {/* Power architecture: interactive explanation */}
      <section id="architecture" className="scroll-mt-24 bg-canvas-2 py-[var(--space-section)] text-graphite-950">
        <div className="wrap">
          <SectionHead
            eyebrow="Power architecture"
            title="See what redundancy actually buys."
            lead="Switch topology, then fail a component. The diagram traces which paths still feed the load, the same question our resilience studies answer on the real network."
          />
          <Reveal className="mt-12">
            <RedundancyDiagram />
          </Reveal>
          <p className="mt-6 text-[12px] text-steel">Illustrative single-path schematic; real facilities add generators, static transfer switches and multiple distribution tiers.</p>
        </div>
      </section>

      {/* Three distinct concepts */}
      <section className="bg-canvas py-[var(--space-section)] text-graphite-950">
        <div className="wrap">
          <SectionHead eyebrow="Three ideas, often confused" title="Availability, redundancy and resilience are not the same thing." />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {CRITICAL_CONCEPTS.map((c, i) => (
              <Reveal key={c.word} delay={i * 0.08} className="rounded-2xl border border-hairline bg-white p-7 shadow-hair md:p-8">
                <span className="text-sm font-semibold tabular-nums text-signal">0{i + 1}</span>
                <h3 className="font-display mt-4 text-section">{c.word}</h3>
                <p className="mt-4 font-semibold">{c.line}</p>
                <p className="mt-3 leading-relaxed text-graphite-600">{c.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Six focus areas */}
      <section className="border-t border-hairline bg-canvas-2 py-[var(--space-section)] text-graphite-950">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-lift ring-1 ring-graphite-950/10">
                  <Image
                    src="/build-to-suit-bg.png"
                    alt="Data center under construction with the electrical layout drawn over the site"
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    quality={90}
                    className="object-cover object-[55%_center]"
                  />
                </div>
                <p className="mt-3 flex items-center gap-3 text-[12px] uppercase tracking-[0.14em] text-steel">
                  <span className="h-px w-6 bg-signal" /> Design drawn over the build
                </p>
              </Reveal>
            </div>
          </div>
          <div className="lg:col-span-7">
            <SectionHead eyebrow="Focus areas" title="Six areas where we engineer for continuity." />
            <ol className="mt-10 grid gap-4 sm:grid-cols-2">
              {CRITICAL_AREAS.map((a, i) => (
                <Reveal as="li" key={a.title} delay={(i % 2) * 0.06} className="rounded-xl border border-hairline bg-white p-6 shadow-hair">
                  <span className="text-sm font-semibold tabular-nums text-signal">0{i + 1}</span>
                  <h3 className="font-display mt-3 text-card">{a.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-graphite-600">{a.copy}</p>
                </Reveal>
              ))}
            </ol>
            <div className="mt-10">
              <Cta href="/sectors/data-centres">Data centre sector</Cta>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-canvas pt-[var(--space-section)]">
        <CtaBand eyebrow="Mission-critical" title="Planning a data centre or critical facility?" href="/contact" label="Discuss a facility" />
      </div>
    </>
  );
}
