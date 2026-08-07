import type { LucideIcon } from "lucide-react";
import {
  CheckCircle2,
  FileSearch,
  FileText,
  ScanLine,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/section-label";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import { ArrowLink } from "@/components/ui/arrow-link";

const STATS = [
  { value: "500+ MW", label: "Capacity delivered across power & energy projects" },
  { value: "99.999%", label: "Reliability engineered into every study" },
  { value: "08", label: "Sectors served across power & infrastructure" },
];

const APPROACH = [
  {
    index: "01",
    icon: FileSearch,
    title: "Scope & Data Collection",
    description:
      "Gathering system data, single-line diagrams and site parameters to define study scope.",
  },
  {
    index: "02",
    icon: ScanLine,
    title: "Modelling & Simulation",
    description:
      "Building calibrated models and running simulations against relevant standards and codes.",
  },
  {
    index: "03",
    icon: FileText,
    title: "Analysis & Reporting",
    description:
      "Interpreting results into clear, actionable findings with supporting documentation.",
  },
  {
    index: "04",
    icon: CheckCircle2,
    title: "Recommendations & Handover",
    description:
      "Delivering practical recommendations and supporting your team through implementation.",
  },
];

export interface SectorLink {
  title: string;
  href: string;
}

export function ServicePageTemplate({
  icon: Icon,
  title,
  intro,
  overviewHeading,
  overviewBody,
  sectors,
}: {
  icon: LucideIcon;
  title: string;
  intro: string;
  overviewHeading: string;
  overviewBody: string;
  sectors: SectorLink[];
}) {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-white py-28 text-ink md:py-36">
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(8,8,10,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(8,8,10,0.6) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div className="pointer-events-none absolute right-[-10%] top-[-10%] -z-10 h-[560px] w-[560px] rounded-full bg-brand/15 blur-[200px]" />

        <div className="mx-auto max-w-[1440px] px-6 md:px-10">
          <RevealOnScroll direction="up">
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-graphite">
              <span>Services</span>
              <span className="text-graphite/50">/</span>
              <span className="text-ink/80">{title}</span>
            </div>

            <SectionLabel className="mt-8 mb-6">Services</SectionLabel>
            <div className="flex items-center gap-5">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-brand/30 bg-brand/10 text-brand">
                <Icon className="h-6 w-6" strokeWidth={1.75} />
              </span>
              <h1 className="max-w-3xl text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-[3.2rem]">
                {title}
              </h1>
            </div>
            <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-graphite">
              {intro}
            </p>
          </RevealOnScroll>

          <RevealOnScroll
            direction="up"
            delay={0.15}
            className="mt-16 grid grid-cols-1 gap-8 border-t border-black/10 pt-10 sm:grid-cols-3 md:mt-20"
          >
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                  {stat.value}
                </div>
                <p className="mt-2 max-w-[26ch] text-sm leading-relaxed text-graphite">
                  {stat.label}
                </p>
              </div>
            ))}
          </RevealOnScroll>
        </div>
      </section>

      {/* OVERVIEW + APPROACH */}
      <section className="relative border-t border-black/10 bg-white py-24 text-ink md:py-32">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-x-10">
            <div className="md:col-span-5 md:pt-2">
              <RevealOnScroll direction="up">
                <SectionLabel>Overview</SectionLabel>
                <h2 className="mt-6 text-balance text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl">
                  {overviewHeading}
                </h2>
              </RevealOnScroll>
              <RevealOnScroll
                direction="up"
                delay={0.15}
                className="mt-6 max-w-md text-balance leading-relaxed text-graphite"
              >
                {overviewBody}
              </RevealOnScroll>
              <RevealOnScroll direction="up" delay={0.25} className="mt-8">
                <ArrowLink href="/#contact">Discuss your project</ArrowLink>
              </RevealOnScroll>
            </div>

            <div className="md:col-span-7">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-graphite">
                Our Approach
              </span>
              <div className="mt-6 flex flex-col">
                {APPROACH.map((step, i) => (
                  <RevealOnScroll
                    key={step.index}
                    direction="up"
                    delay={i * 0.08}
                    className={
                      i > 0 ? "flex gap-5 border-t border-black/10 py-6" : "flex gap-5 py-6"
                    }
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brand/30 bg-brand/10 text-brand">
                      <step.icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <div>
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-xs font-semibold text-brand">
                          {step.index}
                        </span>
                        <h3 className="text-base font-bold tracking-tight">
                          {step.title}
                        </h3>
                      </div>
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-graphite">
                        {step.description}
                      </p>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* APPLICABLE SECTORS */}
      <section className="relative border-t border-black/10 bg-offwhite py-20 text-ink md:py-24">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10">
          <RevealOnScroll direction="up">
            <SectionLabel>Applied Across</SectionLabel>
            <h2 className="mt-6 max-w-lg text-balance text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
              Sectors where this study makes a difference
            </h2>
          </RevealOnScroll>

          <RevealOnScroll
            direction="up"
            delay={0.15}
            className="mt-10 flex flex-wrap gap-3"
          >
            {sectors.map((sector) => (
              <a
                key={sector.href}
                href={sector.href}
                className="group inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-medium text-ink transition-colors duration-300 hover:border-brand hover:text-brand"
              >
                {sector.title}
                <span className="h-1.5 w-1.5 rounded-full bg-black/15 transition-colors duration-300 group-hover:bg-brand" />
              </a>
            ))}
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
