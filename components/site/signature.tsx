import { Eyebrow, Reveal } from "@/components/home/reveal";
import { APPROACH, METHOD, PHILOSOPHY, PRINCIPLES, TOOLS } from "./data";
import { HeroArt } from "./hero-art";
import { Cta, CtaBand, SectionMark } from "./primitives";

/** A calculation-sheet: the IEC 60909 initial symmetrical short-circuit current, as an engineer would write it. */
function CalcSheet() {
  return (
    <figure className="-rotate-1 overflow-hidden rounded-[1.75rem] border border-hairline bg-white font-mono text-[13px] leading-relaxed text-graphite-800 shadow-lift">
      <figcaption className="flex items-center justify-between border-b border-hairline px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-steel">
        <span>Calculation sheet</span>
        <span className="rounded-full bg-signal/10 px-2.5 py-0.5 text-signal">Rev. B · Checked</span>
      </figcaption>
      <div className="space-y-4 px-6 py-7">
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
      <div className="border-t border-hairline px-6 py-3 text-[11px] uppercase tracking-[0.14em] text-steel">Input → assumption → standard → result</div>
    </figure>
  );
}

/** Our Signature: methodical. A centred ring opener, a zig-zag timeline, a spec sheet, circular principles. */
export function Signature() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-sage/70 via-canvas to-canvas pb-10 pt-32 text-graphite-950 md:pt-40">
        <div className="wrap relative">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal className="flex justify-center">
              <SectionMark index="05" label="Our Signature" />
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="font-display mt-6 text-page text-balance">Every result, checked twice.</h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-graphite-600 md:text-lg">
                Our signature is a method: six stages, each producing a document you can audit, so every number in a design can be traced and defended.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="mx-auto mt-10 max-w-[32rem]">
            <HeroArt kind="signature" />
          </Reveal>
        </div>
      </section>

      {/* Zig-zag method timeline */}
      <section className="bg-canvas py-[calc(var(--space-section)*0.5)] text-graphite-950">
        <div className="wrap">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow className="justify-center">The method</Eyebrow>
            <h2 className="font-display mt-5 text-section text-balance">Six stages, each with a document you can audit.</h2>
          </Reveal>
          <ol className="relative mt-16">
            <span aria-hidden className="absolute bottom-0 left-5 top-0 w-px bg-gradient-to-b from-transparent via-graphite-950/20 to-transparent lg:left-1/2" />
            {METHOD.map((m, i) => {
              const left = i % 2 === 0;
              return (
                <Reveal as="li" key={m.step} className="relative grid pb-12 last:pb-0 lg:grid-cols-2 lg:gap-16">
                  <span className="absolute left-5 top-6 z-10 flex h-3.5 w-3.5 -translate-x-1/2 items-center justify-center rounded-full border-2 border-signal bg-canvas lg:left-1/2" />
                  <div className={`pl-14 lg:pl-0 ${left ? "lg:col-start-1 lg:pr-4 lg:text-right" : "lg:col-start-2 lg:pl-4"}`}>
                    <p className="font-display text-[3rem] leading-none tracking-[-0.04em] text-transparent opacity-30 [-webkit-text-stroke:1.5px_var(--color-graphite-950)]">{m.step}</p>
                    <h3 className="font-display mt-2 text-card">{m.title}</h3>
                    <p className={`mt-2 max-w-md text-[15px] leading-relaxed text-graphite-600 ${left ? "lg:ml-auto" : ""}`}>{m.does}</p>
                    <ul className={`mt-4 flex flex-wrap gap-2 ${left ? "lg:justify-end" : ""}`}>
                      {m.gets.map((g) => (
                        <li key={g} className="rounded-full border border-hairline bg-white px-3 py-1 text-[13px] shadow-hair">{g}</li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Philosophy + approach + calc sheet on a warm stage */}
      <section className="bg-canvas py-[calc(var(--space-section)*0.3)] text-graphite-950">
        <div className="wrap">
          <Reveal className="grid gap-12 overflow-hidden rounded-[2.5rem] border border-hairline bg-gradient-to-br from-white via-white to-sage p-8 shadow-hair md:p-14 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <Eyebrow>Engineering philosophy</Eyebrow>
              <h2 className="font-display mt-5 text-section text-balance">{PHILOSOPHY.quote}</h2>
              <p className="mt-5 max-w-md leading-relaxed text-graphite-600">{PHILOSOPHY.copy}</p>
              <ul className="mt-8 grid gap-x-6 gap-y-5 sm:grid-cols-2">
                {APPROACH.map((a) => (
                  <li key={a.title}>
                    <p className="flex items-center gap-2.5 font-display text-card"><span className="h-1.5 w-1.5 rounded-full bg-signal" />{a.title}</p>
                    <p className="mt-1.5 pl-4 text-sm leading-relaxed text-graphite-600">{a.copy}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-center lg:col-span-6">
              <CalcSheet />
              <p className="mt-5 max-w-sm text-[13px] leading-relaxed text-steel">
                Illustrative calculation: every figure in our reports traces back through an input, an assumption and a standard.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Engineering tools: spec-sheet rows */}
      <section className="bg-canvas py-[calc(var(--space-section)*0.5)] text-graphite-950">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-4">
            <Eyebrow>Engineering tools</Eyebrow>
            <h2 className="font-display mt-5 text-section text-balance">The analysis behind every result.</h2>
            <p className="mt-4 leading-relaxed text-graphite-600">Industry-standard simulation and analysis, used by engineers who understand what the model is telling them.</p>
          </Reveal>
          <dl className="lg:col-span-8">
            {TOOLS.map((t, i) => (
              <Reveal key={t.title} delay={i * 0.05} className="grid gap-2 border-t border-hairline py-6 last:border-b sm:grid-cols-[14rem_1fr] sm:gap-8">
                <dt className="font-display text-card">{t.title}</dt>
                <dd className="leading-relaxed text-graphite-600">{t.copy}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Principles: three round badges */}
      <section className="bg-canvas py-[calc(var(--space-section)*0.4)] text-graphite-950">
        <div className="wrap">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow className="justify-center">Quality standards and verified results</Eyebrow>
            <h2 className="font-display mt-5 text-section text-balance">Three rules we do not bend.</h2>
            <p className="mt-4 leading-relaxed text-graphite-600">Our commitment: nothing is issued until the result has been checked, validated and documented.</p>
          </Reveal>
          <div className="mt-14 grid justify-items-center gap-8 md:grid-cols-3">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.word} delay={i * 0.1} className="flex aspect-square w-full max-w-[19rem] flex-col items-center justify-center rounded-full border border-hairline bg-gradient-to-b from-white to-canvas-2 p-10 text-center shadow-lift">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-signal text-white">✓</span>
                <h3 className="font-display mt-4 text-section">{p.word}</h3>
                <p className="mt-2 max-w-[13rem] text-sm leading-relaxed text-graphite-600">{p.copy}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Cta href="/contact">Talk to an engineer</Cta>
          </div>
        </div>
      </section>

      <div className="bg-canvas pt-[calc(var(--space-section)*0.3)]">
        <CtaBand tone="sage" eyebrow="Work with us" title="Want to see how a study is documented?" href="/contact" label="Get in touch" />
      </div>
    </>
  );
}
