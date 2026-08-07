import type { Metadata } from "next";
import {
  BatteryCharging,
  Gauge,
  Network,
  ShieldCheck,
  Sun,
  Zap,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/section-label";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import { ArrowLink } from "@/components/ui/arrow-link";

export const metadata: Metadata = {
  title: "Renewables & Energy Storage — INFOELEX",
  description:
    "Engineering studies and specialist analysis for solar, wind and battery energy storage assets, from interconnection through to commissioning.",
};

const STATS = [
  { value: "500+ MW", label: "Capacity delivered across power & energy projects" },
  { value: "99.999%", label: "Reliability engineered into every study" },
  { value: "08", label: "Sectors served across power & infrastructure" },
];

const CAPABILITIES = [
  {
    index: "01",
    icon: Network,
    title: "Grid Interconnection",
    description:
      "Interconnection studies and grid code compliance for solar, wind and battery storage assets.",
  },
  {
    index: "02",
    icon: Gauge,
    title: "Power Quality",
    description:
      "Harmonics, flicker and voltage-quality assessments for inverter-based generation.",
  },
  {
    index: "03",
    icon: Zap,
    title: "Dynamic & Transients (RMS/EMT)",
    description:
      "RMS and electromagnetic transient modelling to characterise inverter response under fault and switching events.",
  },
  {
    index: "04",
    icon: BatteryCharging,
    title: "Battery Energy Storage",
    description:
      "System design and integration studies for battery storage across generation and grid-support applications.",
  },
  {
    index: "05",
    icon: Sun,
    title: "Solar & Wind Plant Studies",
    description:
      "Plant-level modelling and performance studies for utility-scale solar and wind assets.",
  },
  {
    index: "06",
    icon: ShieldCheck,
    title: "Protection & Compliance",
    description:
      "Protection coordination and regulatory compliance studies aligned to renewable connection codes.",
  },
];

export default function RenewablesEnergyStoragePage() {
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
              <span className="text-ink/80">Renewables &amp; Energy Storage</span>
            </div>

            <SectionLabel className="mt-8 mb-6">Sectors</SectionLabel>
            <h1 className="max-w-3xl text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-[3.6rem]">
              Renewables &amp; Energy Storage
            </h1>
            <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-graphite">
              From utility-scale solar and wind to battery energy storage,
              Infoelex engineers the studies that get inverter-based
              generation safely and reliably onto the grid.
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
                  Engineering studies built for inverter-based generation
                </h2>
              </RevealOnScroll>
              <RevealOnScroll
                direction="up"
                delay={0.15}
                className="mt-6 max-w-md text-balance leading-relaxed text-graphite"
              >
                As renewables and storage reshape the grid, our engineers
                validate performance against evolving code requirements —
                from interconnection studies through to commissioning of
                solar, wind and battery assets.
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
