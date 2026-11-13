import { Reveal } from "@/components/home/reveal";
import { APPROACH, METHOD, PHILOSOPHY, PRINCIPLES, TOOLS } from "./data";
import { CtaBand, PageHero, SectionHead } from "./primitives";

/** A calculation-sheet panel: the IEC 60909 initial symmetrical short-circuit current, as an engineer would write it. */
function CalcSheet() {
  return (
    <figure className="overflow-hidden rounded-2xl border border-hairline bg-white font-mono text-[13px] leading-relaxed text-graphite-800 shadow-lift">
      <figcaption className="flex items-center justify-between border-b border-hairline bg-canvas px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-steel">
        <span>Calculation sheet</span>
        <span>Rev. B · Checked</span>
      </figcaption>
      <div className="space-y-4 px-5 py-6">
        <p className="text-steel">Initial symmetrical short-circuit current, three-phase</p>
        <p className="text-lg text-graphite-950">
          I<sub>k</sub>″ = c · U<sub>n</sub> / (√3 · Z<sub>k</sub>)
        </p>
        <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 border-t border-hairline pt-4 text-steel">
          <span>c</span><span>voltage factor, from the standard</span>
          <span>U<sub>n</sub></span><span>nominal system voltage</span>
          <span>Z<sub>k</sub></span><span>short-circuit impedance at the fault point</span>
        </div>
      </div>
      <div className="border-t border-hairline bg-canvas px-5 py-3 text-[11px] uppercase tracking-[0.14em] text-steel">
        Input → assumption → standard → result
      </div>
    </figure>
  );
}

export function Signature() {
  return (
    <>
      <PageHero
        index="05"
        label="Our Signature"
        title="Every result, checked twice."
        lead="Our signature is a method: six stages, each producing a document you can audit, so every number in a design can be traced and defended."
      />

      {/* Philosophy and technical approach */}
      <section className="bg-canvas py-[calc(var(--space-section)*0.55)] text-graphite-950">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <SectionHead eyebrow="Engineering philosophy" title={PHILOSOPHY.quote} />
            <p className="mt-5 max-w-md leading-relaxed text-graphite-600">{PHILOSOPHY.copy}</p>
          </Reveal>
          <div className="lg:col-span-7">
            <p className="text-eyebrow font-semibold uppercase text-steel">Technical approach</p>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {APPROACH.map((a, i) => (
                <Reveal as="li" key={a.title} delay={(i % 2) * 0.06} className="rounded-xl border border-hairline bg-white p-6 shadow-hair">
                  <span className="text-sm font-semibold tabular-nums text-signal">0{i + 1}</span>
                  <h3 className="font-display mt-3 text-card">{a.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-graphite-600">{a.copy}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Methodology: sticky calc sheet beside a numbered timeline */}
      <section className="bg-canvas py-[calc(var(--space-section)*0.55)] text-graphite-950">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <SectionHead eyebrow="The method" title="Six stages, each with a document you can audit." />
            <ol className="relative mt-12 space-y-4">
              <span aria-hidden className="absolute bottom-6 left-[1.125rem] top-6 w-px bg-graphite-950/15" />
              {METHOD.map((m) => (
                <Reveal as="li" key={m.step} className="relative grid grid-cols-[2.25rem_1fr] gap-x-5">
                  <span className="relative z-10 mt-6 flex h-9 w-9 items-center justify-center rounded-full bg-graphite-950 text-[13px] font-semibold tabular-nums text-white">
                    {m.step}
                  </span>
                  <div className="rounded-xl border border-hairline bg-white p-6 shadow-hair">
                    <h3 className="font-display text-card">{m.title}</h3>
                    <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-graphite-600">{m.does}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {m.gets.map((g) => (
                        <li key={g} className="rounded-full bg-canvas-2 px-3 py-1 text-[13px] text-graphite-800">{g}</li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
          <div className="order-1 lg:order-2 lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <CalcSheet />
                <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-steel">
                  Illustrative calculation: every figure in our reports traces back through an input, an assumption and a standard.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering tools */}
      <section className="bg-canvas py-[calc(var(--space-section)*0.55)] text-graphite-950">
        <div className="wrap">
          <SectionHead eyebrow="Engineering tools" title="The analysis behind every result." lead="Industry-standard simulation and analysis, used by engineers who understand what the model is telling them." />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TOOLS.map((t, i) => (
              <Reveal as="li" key={t.title} delay={(i % 4) * 0.06} className="rounded-xl border border-hairline bg-white p-6 shadow-hair">
                <h3 className="font-display text-card">{t.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-graphite-600">{t.copy}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Principles */}
      <section className="bg-canvas py-[calc(var(--space-section)*0.55)] text-graphite-950">
        <div className="wrap">
          <SectionHead eyebrow="Quality standards and verified results" title="Three rules we do not bend." lead="Our commitment: nothing is issued until the result has been checked, validated and documented." />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.word} delay={i * 0.08} className="rounded-2xl border border-hairline bg-white p-7 shadow-hair md:p-8">
                <span className="text-sm font-semibold tabular-nums text-signal">0{i + 1}</span>
                <h3 className="font-display mt-4 text-section">{p.word}</h3>
                <p className="mt-3 leading-relaxed text-graphite-600">{p.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-canvas">
        <CtaBand eyebrow="Work with us" title="Want to see how a study is documented?" href="/contact" label="Talk to an engineer" />
      </div>
    </>
  );
}
