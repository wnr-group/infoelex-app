"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Eyebrow, Reveal } from "@/components/home/reveal";
import { PROJECTS, type Project } from "./data";
import { HeroArt } from "./hero-art";
import { CtaBand, SectionMark } from "./primitives";

function Meta({ project }: { project: Project }) {
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
      <div>
        <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-steel">Industry</dt>
        <dd className="mt-1 text-graphite-950">{project.industry}</dd>
      </div>
      {project.location && (
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-steel">Location</dt>
          <dd className="mt-1 text-graphite-950">{project.location}</dd>
        </div>
      )}
    </dl>
  );
}

function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  return (
    <Dialog.Root open={!!project} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-graphite-950/40 backdrop-blur-sm" />
        <Dialog.Content className="fixed inset-x-4 top-1/2 z-[71] max-h-[90svh] -translate-y-1/2 overflow-y-auto rounded-[2rem] bg-canvas text-graphite-950 shadow-2xl sm:inset-x-auto sm:left-1/2 sm:w-full sm:max-w-4xl sm:-translate-x-1/2">
          {project && (
            <div className="grid md:grid-cols-2">
              <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[26rem]">
                <Image src={project.image} alt={project.imageAlt} fill sizes="(min-width: 768px) 448px, 100vw" quality={90} className="object-cover" />
              </div>
              <div className="p-7 md:p-10">
                <Dialog.Title className="font-display text-card">{project.title}</Dialog.Title>
                <div className="mt-5"><Meta project={project} /></div>
                <Dialog.Description className="mt-6 leading-relaxed text-graphite-600">{project.detail}</Dialog.Description>
                <div className="mt-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-steel">Engineering scope</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {project.scope.map((s) => (
                      <li key={s} className="rounded-full border border-graphite-950/15 px-3 py-1.5 text-[13px]">{s}</li>
                    ))}
                  </ul>
                </div>
                <Link href={project.href} className="mt-8 inline-block text-[12.5px] font-bold uppercase tracking-[0.1em] text-signal underline-offset-4 hover:underline">
                  Related sector →
                </Link>
              </div>
            </div>
          )}
          <Dialog.Close aria-label="Close" className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-graphite-950 transition-colors hover:text-signal">
            <X className="h-5 w-5" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/** Projects: a gallery. Full-bleed swipeable track of tall image cards with glass captions. */
export function Projects() {
  const [open, setOpen] = useState<Project | null>(null);
  const track = useRef<HTMLUListElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = (card?.getBoundingClientRect().width ?? 360) + 24;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-warm/60 via-canvas to-canvas pt-32 text-graphite-950 md:pt-40">
        <div aria-hidden className="pointer-events-none absolute -left-24 top-10 h-96 w-96 rounded-full bg-signal/[0.07] blur-3xl" />
        <div className="wrap relative">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-2xl">
              <Reveal>
                <SectionMark index="04" label="Projects" />
              </Reveal>
              <Reveal delay={0.06}>
                <h1 className="font-display mt-6 text-page text-balance">Selected engineering scopes.</h1>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-graphite-600 md:text-lg">
                  The kinds of networks and facilities we study, design and support, by industry and engineering scope.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.16} className="flex items-center gap-3">
              <span className="mr-2 hidden text-sm tabular-nums text-steel sm:block">0{PROJECTS.length} scopes</span>
              {([-1, 1] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => scroll(d)}
                  aria-label={d === 1 ? "Next projects" : "Previous projects"}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-hairline bg-white text-lg shadow-hair transition-colors hover:border-signal hover:bg-signal hover:text-white"
                >
                  {d === 1 ? "→" : "←"}
                </button>
              ))}
            </Reveal>
          </div>
        </div>

        {/* Swipeable gallery track */}
        <ul
          ref={track}
          className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-[var(--space-gutter)] pb-14 [scrollbar-width:none] md:px-[max(var(--space-gutter),calc((100vw-1280px)/2+var(--space-gutter)))] [&::-webkit-scrollbar]:hidden"
          aria-label="Project scopes"
        >
          {PROJECTS.map((p, i) => (
            <li key={p.slug} className="w-[min(82vw,24rem)] shrink-0 snap-start">
              <button
                type="button"
                onClick={() => setOpen(p)}
                aria-label={`View details: ${p.title}`}
                className="group relative block aspect-[4/5] w-full overflow-hidden rounded-[2rem] text-left shadow-lift ring-1 ring-graphite-950/10"
              >
                <Image
                  src={p.image}
                  alt={p.imageAlt}
                  fill
                  sizes="(min-width: 640px) 24rem, 82vw"
                  quality={90}
                  className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-signature)] group-hover:scale-[1.05]"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold tabular-nums shadow-hair backdrop-blur">
                  0{i + 1} / 0{PROJECTS.length}
                </span>
                <span className="absolute inset-x-3 bottom-3 rounded-[1.5rem] border border-white/70 bg-white/85 p-5 shadow-hair backdrop-blur-xl">
                  <span className="block text-eyebrow font-semibold uppercase text-signal">{p.industry}</span>
                  <span className="font-display mt-2 block text-card text-balance">{p.title}</span>
                  <span className="mt-3 flex items-center justify-between gap-3">
                    <span className="flex flex-wrap gap-1.5">
                      {p.scope.slice(0, 2).map((s) => (
                        <span key={s} className="rounded-full bg-canvas-2 px-2.5 py-0.5 text-[11.5px] text-graphite-800">{s}</span>
                      ))}
                    </span>
                    <span aria-hidden className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-hairline bg-white transition-colors duration-300 group-hover:border-signal group-hover:bg-signal group-hover:text-white">→</span>
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Network map */}
      <section className="bg-canvas py-[calc(var(--space-section)*0.5)] text-graphite-950">
        <div className="wrap grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <Eyebrow>Across the network</Eyebrow>
            <h2 className="font-display mt-5 text-section text-balance">From grid connection to the plant floor.</h2>
            <p className="mt-5 max-w-md leading-relaxed text-graphite-600">
              Our project areas span transmission, renewables, storage and industrial plant. Move across the route to see each scope.
            </p>
            <dl className="mt-8 grid grid-cols-3 gap-3">
              {[
                { v: String(PROJECTS.length), l: "Project areas" },
                { v: "500 MW+", l: "Experience" },
                { v: "GCC & India", l: "Regions" },
              ].map((x) => (
                <div key={x.l} className="rounded-2xl border border-hairline bg-white px-4 py-4 shadow-hair">
                  <dd className="font-display text-lg leading-none">{x.v}</dd>
                  <dt className="mt-1.5 text-xs text-steel">{x.l}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <HeroArt kind="projects" className="mx-auto max-w-[36rem]" />
          </Reveal>
        </div>
      </section>

      <div className="bg-canvas pt-[calc(var(--space-section)*0.3)]">
        <CtaBand tone="warm" eyebrow="Have a similar scope?" title="Tell us about your network or facility." href="/contact" label="Contact us" />
      </div>

      <ProjectDialog project={open} onClose={() => setOpen(null)} />
    </>
  );
}
