"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Reveal } from "@/components/home/reveal";
import { PROJECTS, type Project } from "./data";
import { CtaBand, PageHero } from "./primitives";

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
        <Dialog.Content className="fixed inset-x-4 top-1/2 z-[71] max-h-[90svh] -translate-y-1/2 overflow-y-auto rounded-2xl bg-canvas text-graphite-950 shadow-2xl sm:inset-x-auto sm:left-1/2 sm:w-full sm:max-w-4xl sm:-translate-x-1/2">
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
                      <li key={s} className="border border-graphite-950/20 px-3 py-1.5 text-[13px]">{s}</li>
                    ))}
                  </ul>
                </div>
                <Link href={project.href} className="mt-8 inline-block text-[12.5px] font-bold uppercase tracking-[0.1em] text-signal underline-offset-4 hover:underline">
                  Related sector →
                </Link>
              </div>
            </div>
          )}
          <Dialog.Close aria-label="Close" className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center bg-canvas/90 text-graphite-950 transition-colors hover:text-signal">
            <X className="h-5 w-5" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <>
      <PageHero
        index="04"
        label="Projects"
        title="Selected engineering scopes."
        lead="The kinds of networks and facilities we study, design and support, by industry and engineering scope."
      />

      {/* Portfolio at a glance: industries, experience, regions */}
      <section className="bg-canvas pb-16 text-graphite-950 md:pb-20">
        <div className="wrap">
          <Reveal>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline shadow-hair lg:grid-cols-4">
              {[
                { v: String(PROJECTS.length), l: "Featured project areas" },
                { v: String(new Set(PROJECTS.map((p) => p.industry)).size), l: "Industries shown" },
                { v: "500 MW+", l: "Project experience" },
                { v: "GCC & India", l: "Regions served" },
              ].map((x) => (
                <div key={x.l} className="flex flex-col-reverse justify-end bg-white p-6">
                  <dt className="mt-2 text-sm text-steel">{x.l}</dt>
                  <dd className="font-display text-2xl leading-none md:text-3xl">{x.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="bg-canvas py-[calc(var(--space-section)*0.55)] text-graphite-950">
        <div className="wrap grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.08}>
              <article className="group flex h-full flex-col rounded-2xl border border-hairline bg-white p-2.5 shadow-hair transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <button type="button" onClick={() => setOpen(p)} aria-label={`View details: ${p.title}`} className="relative block aspect-[16/10] w-full overflow-hidden rounded-xl text-left">
                  <Image
                    src={p.image}
                    alt={p.imageAlt}
                    fill
                    sizes="(min-width: 1280px) 400px, (min-width: 640px) 50vw, 100vw"
                    quality={90}
                    className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-signature)] group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold tabular-nums text-graphite-950 shadow-hair">
                    0{i + 1} / 0{PROJECTS.length}
                  </span>
                </button>
                <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
                  <p className="text-eyebrow font-semibold uppercase text-signal">{p.industry}</p>
                  <h2 className="font-display mt-3 text-card text-balance">{p.title}</h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-graphite-600">{p.summary}</p>
                  {p.location && <p className="mt-3 text-sm text-steel">{p.location}</p>}
                  <ul className="mb-5 mt-4 flex flex-wrap gap-2">
                    {p.scope.map((s) => (
                      <li key={s} className="rounded-full border border-hairline bg-canvas px-2.5 py-0.5 text-[12px] text-graphite-800">{s}</li>
                    ))}
                  </ul>
                  <div className="mt-auto flex items-center justify-between border-t border-hairline pt-4">
                    <span className="text-[12.5px] font-bold uppercase tracking-[0.1em] text-graphite-950">View scope</span>
                    <button
                      type="button"
                      onClick={() => setOpen(p)}
                      aria-label={`Open scope: ${p.title}`}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-graphite-950 transition-colors duration-300 group-hover:border-signal group-hover:bg-signal group-hover:text-white"
                    >
                      <span aria-hidden>→</span>
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="bg-canvas">
        <CtaBand eyebrow="Have a similar scope?" title="Tell us about your network or facility." href="/contact" label="Contact us" />
      </div>

      <ProjectDialog project={open} onClose={() => setOpen(null)} />
    </>
  );
}
