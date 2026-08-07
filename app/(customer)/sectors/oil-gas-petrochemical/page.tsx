import type { Metadata } from "next";
import {
  ClipboardCheck,
  Flame,
  Network,
  ShieldCheck,
  Waypoints,
  Zap,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/section-label";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import { ArrowLink } from "@/components/ui/arrow-link";

export const metadata: Metadata = {
  title: "Oil, Gas & Petrochemical — INFOELEX",
  description:
    "Engineering studies and specialist analysis for upstream, midstream and downstream oil, gas and petrochemical facilities.",
};

const STATS = [
  { value: "500+ MW", label: "Capacity delivered across power & energy projects" },
  { value: "99.999%", label: "Reliability engineered into every study" },
  { value: "08", label: "Sectors served across power & infrastructure" },
];

const CAPABILITIES = [
  {
    index: "01",
    icon: Flame,
    title: "Hazardous Area Classification",
    description:
      "Area classification and equipment certification studies for explosive atmospheres.",
  },
  {
    index: "02",
    icon: Network,
    title: "Power System Analysis",
    description:
      "Load flow, short circuit and stability studies across process and utility power systems.",
  },
  {
    index: "03",
    icon: ShieldCheck,
    title: "Protection & Arc Flash",
    description:
      "Protection coordination and arc flash risk assessments for process-critical switchgear.",
  },
  {
    index: "04",
    icon: Waypoints,
    title: "Earthing & Grounding",
    description:
      "Earthing and lightning protection design for process plant and storage facilities.",
  },
  {
    index: "05",
    icon: Zap,
    title: "Dynamic & Transients (RMS/EMT)",
    description:
      "Transient modelling for motor starting, switching and fault events across plant power systems.",
  },
  {
    index: "06",
    icon: ClipboardCheck,
    title: "Specialist Studies",
    description:
      "Compliance and specialist studies aligned to industry and regulatory standards.",
  },
];

export default function OilGasPetrochemicalPage() {
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
              <span>Sectors</span>
              <span className="text-graphite/50">/</span>
              <span className="text-ink/80">Oil, Gas &amp; Petrochemical</span>
            </div>

            <SectionLabel className="mt-8 mb-6">Sectors</SectionLabel>
            <h1 className="max-w-3xl text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-[3.6rem]">
              Oil, Gas &amp; Petrochemical
            </h1>
            <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-graphite">
              From upstream facilities to petrochemical processing plants,
              Infoelex delivers the electrical engineering studies that
              keep hazardous-area operations safe and compliant.
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

      {/* OVERVIEW */}
      <section className="relative border-t border-black/10 bg-white py-24 text-ink md:py-32">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-x-10">
            <div className="md:col-span-5 md:pt-2">
              <RevealOnScroll direction="up">
                <SectionLabel>Overview</SectionLabel>
                <h2 className="mt-6 text-balance text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl">
                  Engineering studies built for hazardous-area operations
                </h2>
              </RevealOnScroll>
              <RevealOnScroll
                direction="up"
                delay={0.15}
                className="mt-6 max-w-md text-balance leading-relaxed text-graphite"
              >
                Working across upstream, midstream and downstream
                facilities, our engineers validate electrical systems
                against the safety and reliability demands of
                process-critical environments.
              </RevealOnScroll>
              <RevealOnScroll direction="up" delay={0.25} className="mt-8">
                <ArrowLink href="/#contact">Discuss your project</ArrowLink>
              </RevealOnScroll>
            </div>

            <div className="md:col-span-7">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {CAPABILITIES.map((capability, i) => (
                  <RevealOnScroll
                    key={capability.index}
                    direction="up"
                    delay={i * 0.08}
                  >
                    <CapabilityCard capability={capability} />
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-black/10 bg-charcoal py-20 text-paper md:py-28">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, rgba(223,44,28,0.16), transparent 60%)",
          }}
        />
        <RevealOnScroll
          direction="up"
          className="mx-auto flex max-w-[1440px] flex-col gap-8 px-6 text-center md:px-10"
        >
          <h2 className="mx-auto max-w-2xl text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Ready to bring your next process facility project to Infoelex?
          </h2>
          <a
            href="/#contact"
            className="group relative mx-auto inline-flex w-fit items-center gap-2.5 overflow-hidden rounded-[4px] border border-brand bg-brand px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-transparent hover:text-brand"
          >
            <span className="relative z-10">Let&apos;s Talk</span>
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </RevealOnScroll>
      </section>
    </>
  );
}

function CapabilityCard({
  capability,
}: {
  capability: (typeof CAPABILITIES)[number];
}) {
  const Icon = capability.icon;
  return (
    <div className="group relative flex h-full flex-col gap-5 rounded-xl border border-black/10 bg-white p-6 shadow-[0_1px_2px_rgba(8,8,10,0.04)] transition-shadow duration-500 hover:shadow-[0_16px_40px_-16px_rgba(8,8,10,0.16)]">
      <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-brand transition-transform duration-500 ease-out group-hover:scale-x-100" />
      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-brand/30 bg-brand/10 text-brand">
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </span>
      <div>
        <h3 className="text-base font-bold tracking-tight">{capability.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-graphite">
          {capability.description}
        </p>
      </div>
    </div>
  );
}
