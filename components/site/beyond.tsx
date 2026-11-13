import { Eyebrow, Reveal } from "@/components/home/reveal";
import { CSR_STORIES } from "./data";
import { CtaBand, PageHero, SectionHead } from "./primitives";

/** Four quarterly dots: the cadence of the blood donation drives. */
function Quarters() {
  return (
    <div className="mt-6 flex items-center gap-2" aria-label="Four drives a year, one each quarter">
      {["Q1", "Q2", "Q3", "Q4"].map((q) => (
        <span key={q} className="flex h-9 w-9 items-center justify-center rounded-full bg-signal text-[11px] font-semibold text-white">
          {q}
        </span>
      ))}
    </div>
  );
}

type FigureStory = Extract<(typeof CSR_STORIES)[number], { figure: string }>;
const FIGURE_STORIES = CSR_STORIES.filter((s): s is FigureStory => "figure" in s);
const PLAIN_STORIES = CSR_STORIES.filter((s) => !("figure" in s));

export function Beyond() {
  return (
    <>
      <PageHero
        index="06"
        label="Beyond Engineering"
        title={
          <>
            Engineering for people, not just <span className="text-signal">power.</span>
          </>
        }
        lead="Giving back is part of how we work. Our teams invest in the communities we work in, with programmes we run consistently, alongside the engineering that pays for them."
        image={{
          src: "/sustainable-bg.jpg",
          alt: "Wind turbines and solar panels in the evening light",
          position: "object-[center_45%]",
          caption: "Building a greener grid, and community around it",
        }}
      />

      {/* Three programmes as an even card grid */}
      <section className="bg-canvas-2 py-[var(--space-section)] text-graphite-950">
        <div className="wrap">
          <SectionHead eyebrow="Our programmes" title="Community programmes we keep, year after year." lead="CSR and community engagement across health, education, environment, food and youth." />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {FIGURE_STORIES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08} className="flex flex-col rounded-2xl border border-hairline bg-white p-7 shadow-hair transition-shadow duration-300 hover:shadow-lift md:p-8">
                <div className="flex items-center justify-between">
                  <Eyebrow>{s.tag}</Eyebrow>
                  <span className="text-sm font-semibold tabular-nums text-steel">{s.index}</span>
                </div>
                <div className="mt-8 border-b border-hairline pb-6">
                  <p className="font-display text-[clamp(2.75rem,2rem+2.5vw,4rem)] leading-none tracking-[-0.03em] text-signal">{s.figure}</p>
                  <p className="mt-3 text-sm text-steel">{s.figureLabel}</p>
                  {i === 0 && <Quarters />}
                </div>
                <h3 className="font-display mt-6 text-card">{s.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-graphite-600">{s.copy}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {PLAIN_STORIES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08} className="rounded-2xl border border-hairline bg-white p-7 shadow-hair transition-shadow duration-300 hover:shadow-lift md:p-8">
                <div className="flex items-center justify-between">
                  <Eyebrow>{s.tag}</Eyebrow>
                  <span className="text-sm font-semibold tabular-nums text-steel">{s.index}</span>
                </div>
                <h3 className="font-display mt-6 text-card">{s.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-graphite-600">{s.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-canvas pt-[var(--space-section)]">
        <CtaBand eyebrow="Work with us" title="Run a school, hospital or community programme we could support?" href="/contact" label="Get in touch" />
      </div>
    </>
  );
}
