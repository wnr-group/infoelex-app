import { Eyebrow, Reveal } from "@/components/home/reveal";
import { CSR_STORIES } from "./data";
import { CtaBand, ParallaxImage, SectionMark } from "./primitives";

type Story = (typeof CSR_STORIES)[number];
const byTitle = (t: string) => CSR_STORIES.find((s) => s.title === t) as Story;
const figureOf = (s: Story) => ("figure" in s ? s.figure : undefined);
const labelOf = (s: Story) => ("figureLabel" in s ? s.figureLabel : undefined);

/** Four quarterly dots: the cadence of the blood donation drives. */
function Quarters() {
  return (
    <div className="mt-6 flex items-center gap-2" aria-label="Four drives a year, one each quarter">
      {["Q1", "Q2", "Q3", "Q4"].map((q) => (
        <span key={q} className="flex h-10 w-10 items-center justify-center rounded-full bg-signal text-[11px] font-semibold text-white shadow-hair">
          {q}
        </span>
      ))}
    </div>
  );
}

function Tile({ story, className, children }: { story: Story; className: string; children?: React.ReactNode }) {
  const figure = figureOf(story);
  return (
    <Reveal className={`relative flex flex-col overflow-hidden rounded-[2rem] border border-white/70 p-7 shadow-hair transition-shadow duration-300 hover:shadow-lift md:p-9 ${className}`}>
      <div className="flex items-center justify-between">
        <Eyebrow>{story.tag}</Eyebrow>
        <span className="text-sm font-semibold tabular-nums text-graphite-950/40">{story.index}</span>
      </div>
      {figure && (
        <div className="mt-8">
          <p className="font-display text-[clamp(2.75rem,2rem+2.5vw,4.25rem)] leading-none tracking-[-0.03em] text-signal">{figure}</p>
          <p className="mt-2 text-sm text-graphite-600">{labelOf(story)}</p>
        </div>
      )}
      {children}
      <div className="mt-auto pt-8">
        <h3 className="font-display text-card">{story.title}</h3>
        <p className="mt-2.5 max-w-md text-[15px] leading-relaxed text-graphite-600">{story.copy}</p>
      </div>
    </Reveal>
  );
}

/** Beyond Engineering: warm and human. Organic image shape, soft tints, a bento of programmes. */
export function Beyond() {
  const blood = byTitle("Blood donation drives");
  const schools = byTitle("Computers for government schools");
  const trees = byTitle("Tree plantation");
  const food = byTitle("Food distribution");
  const youth = byTitle("Youth development");

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-warm via-warm/40 to-canvas pb-16 pt-32 text-graphite-950 md:pb-24 md:pt-40">
        <div aria-hidden className="pointer-events-none absolute -left-20 top-24 h-80 w-80 rounded-full bg-warm-deep/70 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-signal/[0.06] blur-3xl" />
        <div className="wrap relative grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <Reveal>
              <SectionMark index="06" label="Beyond Engineering" />
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="font-display mt-6 text-page text-balance">
                Engineering for people, not just <span className="text-signal">power.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-graphite-600 md:text-lg">
                Giving back is part of how we work. Our teams invest in the communities we work in, with programmes we run consistently, alongside the engineering that pays for them.
              </p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {["Health", "Education", "Environment", "Food", "Youth"].map((t) => (
                  <li key={t} className="rounded-full bg-white/80 px-4 py-1.5 text-sm text-graphite-800 shadow-hair backdrop-blur">{t}</li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="relative lg:col-span-6">
            <ParallaxImage
              src="/sustainable-bg.jpg"
              alt="Wind turbines and solar panels in the evening light"
              sizes="(min-width: 1024px) 42vw, 100vw"
              priority
              strength={5}
              className="mx-auto aspect-[6/5] w-full max-w-xl rounded-[58%_42%_55%_45%/52%_48%_52%_48%] shadow-lift ring-1 ring-graphite-950/10"
              imgClassName="object-[center_45%]"
            />
            <div className="absolute bottom-4 left-2 rounded-full border border-white/70 bg-white/90 px-5 py-3 shadow-lift backdrop-blur-xl sm:left-10">
              <p className="text-sm">
                <span className="font-display mr-1.5 text-lg text-signal">4×</span> blood drives every year
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Bento of programmes */}
      <section className="bg-canvas pb-[calc(var(--space-section)*0.5)] text-graphite-950">
        <div className="wrap">
          <Reveal className="mb-10 max-w-2xl">
            <Eyebrow>Our programmes</Eyebrow>
            <h2 className="font-display mt-5 text-section text-balance">Community programmes we keep, year after year.</h2>
          </Reveal>
          <div className="grid gap-4 lg:grid-cols-6 lg:gap-5">
            <Tile story={blood} className="bg-gradient-to-br from-warm to-warm-deep/80 lg:col-span-3 lg:row-span-2 lg:min-h-[28rem]">
              <Quarters />
            </Tile>
            <Tile story={schools} className="bg-white lg:col-span-3" />
            <Tile story={trees} className="bg-gradient-to-br from-sage to-white lg:col-span-3" />
            <Tile story={food} className="bg-gradient-to-br from-warm to-white lg:col-span-3" />
            <Tile story={youth} className="bg-gradient-to-br from-mist-blue to-white lg:col-span-3" />
          </div>
        </div>
      </section>

      <div className="bg-canvas">
        <CtaBand tone="warm" eyebrow="Work with us" title="Run a school, hospital or community programme we could support?" href="/contact" label="Get in touch" />
      </div>
    </>
  );
}
