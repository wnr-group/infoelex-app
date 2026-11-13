import Image from "next/image";
import Link from "next/link";
import { Eyebrow, Reveal } from "@/components/home/reveal";
import { DIFFERENTIATORS, PRESENCE, SECTORS, STATS } from "./data";
import { Cta, CtaBand, ParallaxImage, SectionMark } from "./primitives";

/** Our Edge: editorial. A full-width photographic stage with floating glass panels. */
export function OurEdge() {
  return (
    <>
      <section className="relative bg-canvas pb-6 pt-24 text-graphite-950 md:pt-28">
        <div className="mx-auto w-full max-w-[1440px] px-3 sm:px-5">
          <div className="relative isolate overflow-hidden rounded-[2rem] md:rounded-[3rem]">
            <ParallaxImage
              src="/about-hero-bg.png"
              alt="Engineers reviewing a single-line diagram on a tablet beside high-voltage switchgear at dusk"
              sizes="100vw"
              priority
              strength={5}
              className="h-[min(86svh,50rem)] min-h-[34rem] w-full"
              imgClassName="object-[65%_center]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/45 via-transparent to-white/10" />

            {/* Glass headline panel */}
            <div className="absolute inset-x-3 bottom-3 sm:inset-x-6 sm:bottom-6 lg:inset-x-10 lg:bottom-10 lg:right-auto lg:max-w-[34rem]">
              <Reveal>
                <div className="rounded-[1.75rem] border border-white/70 bg-white/80 p-6 shadow-lift backdrop-blur-xl md:p-8">
                  <SectionMark index="01" label="Our Edge" />
                  <h1 className="font-display mt-5 text-page text-balance">
                    Engineering the electrical backbone of critical <span className="text-signal">infrastructure.</span>
                  </h1>
                  <p className="mt-4 text-[15px] leading-relaxed text-graphite-600 md:text-base">
                    Independent power system studies, electrical design and automation, from first model to energisation.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Cta href="/capabilities">Explore capabilities</Cta>
                    <Cta href="/contact" variant="ghost-dark">Talk to us</Cta>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Floating stat chips */}
            <dl className="absolute right-6 top-6 hidden w-56 flex-col gap-3 lg:flex xl:right-10 xl:top-10">
              {STATS.map((s, i) => (
                <Reveal key={s.label} delay={0.2 + i * 0.08}>
                  <div className="rounded-2xl border border-white/70 bg-white/80 px-5 py-3.5 shadow-hair backdrop-blur-xl">
                    <dd className="font-display text-xl leading-none">{s.value}</dd>
                    <dt className="mt-1.5 text-xs text-steel">{s.label}</dt>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>

          {/* Stats for small screens */}
          <dl className="mt-3 grid grid-cols-2 gap-3 lg:hidden">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-2xl border border-hairline bg-white px-4 py-4">
                <dd className="font-display text-lg leading-none">{s.value}</dd>
                <dt className="mt-1.5 text-xs text-steel">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Who we are: arch image + text */}
      <section className="bg-canvas py-[calc(var(--space-section)*0.6)] text-graphite-950">
        <div className="wrap grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-5">
            <Eyebrow>Who we are</Eyebrow>
            <Reveal>
              <h2 className="font-display mt-5 text-section text-balance">An electrical consulting company that proves the design before it is built.</h2>
              <p className="mt-6 max-w-lg leading-relaxed text-graphite-600 md:text-lg">
                Infoelex is based in Coimbatore, India, and specialises in power system studies, electrical design and engineering, automation, and power solutions for data centers, working across the GCC and India.
              </p>
              <p className="mt-4 max-w-lg leading-relaxed text-steel">
                We are the engineers behind the single-line diagram: modelling the network, testing it against faults and grid codes, and carrying the result through to drawings, settings and site support.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="relative lg:col-span-6 lg:col-start-7">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-t-[999px] rounded-b-[2rem] shadow-lift ring-1 ring-graphite-950/10">
              <Image src="/photos/substation.jpg" alt="Outdoor substation framework backlit by the setting sun" fill sizes="(min-width: 1024px) 28rem, 100vw" quality={90} className="object-cover object-[58%_center]" />
            </div>
            <div aria-hidden className="absolute -left-6 bottom-10 hidden h-28 w-28 rounded-full bg-signal/10 blur-2xl md:block" />
          </Reveal>
        </div>
      </section>

      {/* Experience and presence: soft gradient stage */}
      <section className="bg-canvas py-[calc(var(--space-section)*0.4)] text-graphite-950">
        <div className="wrap">
          <Reveal className="relative overflow-hidden rounded-[2.5rem] border border-hairline bg-gradient-to-br from-warm via-white to-mist-blue p-8 shadow-hair md:p-14">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-6">
                <Eyebrow>Our experience</Eyebrow>
                <p className="font-display mt-5 text-[clamp(2.5rem,2rem+2.2vw,3.75rem)] leading-none tracking-[-0.03em]">500 MW+</p>
                <p className="mt-4 max-w-md leading-relaxed text-graphite-600">
                  of project experience across eight sectors, from transmission networks and renewables to industrial plant and data centers.
                </p>
              </div>
              <div className="lg:col-span-5 lg:col-start-8">
                <p className="text-eyebrow font-semibold uppercase text-steel">Global presence</p>
                <ul className="mt-5 space-y-3">
                  {PRESENCE.map((r) => (
                    <li key={r.region} className="flex gap-4 rounded-2xl bg-white/80 p-4 backdrop-blur">
                      <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-signal" />
                      <div>
                        <p className="font-display text-card">{r.region}</p>
                        <p className="mt-0.5 text-sm leading-relaxed text-graphite-600">{r.detail}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What sets us apart: open editorial columns, no cards */}
      <section className="bg-canvas py-[calc(var(--space-section)*0.6)] text-graphite-950">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <Eyebrow>What sets us apart</Eyebrow>
            <h2 className="font-display mt-5 text-section text-balance">Four habits that separate us from the rest of the field.</h2>
          </Reveal>
          <ol className="mt-14 grid gap-y-12 md:grid-cols-2 lg:grid-cols-4">
            {DIFFERENTIATORS.map((d, i) => (
              <Reveal as="li" key={d.title} delay={i * 0.08} className="relative md:pr-8 lg:border-l lg:border-hairline lg:px-8 lg:first:border-l-0 lg:first:pl-0">
                <span className="font-display text-sm tabular-nums text-signal">0{i + 1}</span>
                <h3 className="font-display mt-4 text-card">{d.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-graphite-600">{d.copy}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Sectors: pill cloud */}
      <section className="bg-canvas py-[calc(var(--space-section)*0.4)] text-graphite-950">
        <div className="wrap">
          <Reveal className="rounded-[2.5rem] bg-canvas-2 p-8 md:p-14">
            <Eyebrow>Sectors we serve</Eyebrow>
            <h2 className="font-display mt-5 max-w-xl text-section text-balance">Eight sectors, one standard of engineering.</h2>
            <ul className="mt-10 flex flex-wrap gap-3">
              {SECTORS.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="group inline-flex items-center gap-2.5 rounded-full border border-hairline bg-white px-5 py-3 text-[15px] font-medium shadow-hair transition-all duration-300 hover:-translate-y-0.5 hover:border-signal/40 hover:shadow-lift">
                    {s.label}
                    <span aria-hidden className="text-steel transition-colors group-hover:text-signal">↗</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <div className="bg-canvas pt-[calc(var(--space-section)*0.4)]">
        <CtaBand eyebrow="Next" title="See the full range of engineering work we deliver." href="/capabilities" label="Capabilities" />
      </div>
    </>
  );
}
