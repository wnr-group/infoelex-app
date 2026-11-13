import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/home/reveal";
import { DIFFERENTIATORS, PRESENCE, SECTORS, STATS } from "./data";
import { Cta, CtaBand, PageHero, SectionHead } from "./primitives";

export function OurEdge() {
  return (
    <>
      <PageHero
        index="01"
        label="Our Edge"
        title={
          <>
            Engineering the electrical backbone of critical <span className="text-signal">infrastructure.</span>
          </>
        }
        lead="Independent power system studies, electrical design and automation, from first model to energisation, for the facilities that cannot afford to fail."
        actions={
          <>
            <Cta href="/capabilities">Explore capabilities</Cta>
            <Cta href="/contact" variant="ghost-dark">Start a conversation</Cta>
          </>
        }
        image={{
          src: "/about-hero-bg.png",
          alt: "Engineers reviewing a single-line diagram on a tablet beside high-voltage switchgear at dusk",
          position: "object-[65%_center]",
          caption: "Design review at the switchgear",
        }}
      >
        <Reveal delay={0.2}>
          <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline shadow-hair md:mt-20 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col-reverse justify-end bg-white p-6 md:p-8">
                <dt className="mt-2 text-sm text-steel">{s.label}</dt>
                <dd className="font-display text-2xl leading-none text-graphite-950 md:text-3xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </PageHero>

      {/* Introduction */}
      <section className="bg-canvas py-[calc(var(--space-section)*0.55)] text-graphite-950">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-lift ring-1 ring-graphite-950/10">
              <Image
                src="/photos/substation.jpg"
                alt="Outdoor substation framework backlit by the setting sun"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                quality={90}
                className="object-cover object-[58%_center]"
              />
            </div>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <SectionHead eyebrow="Who we are" title="An electrical consulting company that proves the design before it is built." />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-graphite-600 md:text-lg">
                Infoelex is based in Coimbatore, India, and specialises in power system studies, electrical design and engineering, automation, and power solutions for data centers, working across the GCC and India.
              </p>
              <p className="mt-4 max-w-xl leading-relaxed text-steel">
                We are the engineers behind the single-line diagram: modelling the network, testing it against faults and grid codes, and carrying the result through to drawings, settings and site support.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Experience and global presence */}
      <section className="bg-canvas py-[calc(var(--space-section)*0.55)] text-graphite-950">
        <div className="wrap grid gap-5 lg:grid-cols-12">
          <Reveal className="rounded-2xl border border-hairline bg-white p-8 shadow-hair md:p-10 lg:col-span-7">
            <SectionHead eyebrow="Our experience" title="500 MW+ of project experience across eight sectors." lead="From transmission networks and renewables to industrial plant and data centers, the same study-first method carries across every sector we serve." />
          </Reveal>
          <Reveal delay={0.08} className="rounded-2xl border border-hairline bg-white p-8 shadow-hair md:p-10 lg:col-span-5">
            <p className="text-eyebrow font-semibold uppercase text-steel">Global presence</p>
            <ul className="mt-6 divide-y divide-hairline">
              {PRESENCE.map((r) => (
                <li key={r.region} className="py-4 first:pt-0 last:pb-0">
                  <p className="font-display text-card">{r.region}</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-graphite-600">{r.detail}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Differentiators: 2×2 card grid */}
      <section className="bg-canvas py-[calc(var(--space-section)*0.55)] text-graphite-950">
        <div className="wrap">
          <SectionHead eyebrow="What sets us apart" title="Four habits that separate us from the rest of the field." />
          <ol className="mt-12 grid gap-5 md:grid-cols-2">
            {DIFFERENTIATORS.map((d, i) => (
              <Reveal as="li" key={d.title} delay={(i % 2) * 0.08} className="group rounded-2xl border border-hairline bg-white p-7 shadow-hair transition-shadow duration-300 hover:shadow-lift md:p-9">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-signal/10 text-sm font-semibold tabular-nums text-signal">0{i + 1}</span>
                <h3 className="font-display mt-6 text-card">{d.title}</h3>
                <p className="mt-3 leading-relaxed text-graphite-600">{d.copy}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Sectors: tile grid */}
      <section className="bg-canvas py-[calc(var(--space-section)*0.55)] text-graphite-950">
        <div className="wrap">
          <SectionHead eyebrow="Sectors we serve" title="Eight sectors, one standard of engineering." lead="The full range of engineering work behind each of these sectors is on the capabilities page." />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SECTORS.map((s, i) => (
              <Reveal as="li" key={s.href} delay={(i % 4) * 0.05}>
                <Link
                  href={s.href}
                  className="group flex h-full min-h-32 flex-col justify-between rounded-xl border border-hairline bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-signal/40 hover:shadow-lift"
                >
                  <span className="text-sm tabular-nums text-steel">0{i + 1}</span>
                  <span className="mt-6 flex items-end justify-between gap-3">
                    <span className="font-display text-card">{s.label}</span>
                    <span aria-hidden className="text-steel transition-colors group-hover:text-signal">↗</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <div className="bg-canvas">
        <CtaBand eyebrow="Next" title="See the full range of engineering work we deliver." href="/capabilities" label="Capabilities" />
      </div>
    </>
  );
}
