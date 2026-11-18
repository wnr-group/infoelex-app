"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Gauge, ShieldCheck, Zap } from "lucide-react";
import { Reveal } from "@/components/home/reveal";
import { ParallaxImage } from "./primitives";
import { ScrollProgress } from "./scroll-progress";
import { CountUp } from "./count-up";
import { cn } from "@/lib/utils";

const WRAP = "mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10";

const FILTERS = ["All Projects", "Power Infrastructure", "Electrical Engineering", "Data Centres", "Industrial Infrastructure"] as const;
type Filter = (typeof FILTERS)[number];

const HERO_STATS = [
  { label: "Advised valuation", value: "$4.2B+", note: "Capital infrastructure managed under peer review" },
  { label: "Transmission interconnect", value: "24+ GW", note: "Grid synchronized across multijurisdictional links" },
  { label: "Arc safety audit", value: "ZERO", note: "Lost-time incidents across all high-hazard site works" },
  { label: "Schedule reliability", value: "100%", note: "On-time milestone delivery across sovereign contracts" },
];

type Case = {
  id: string;
  code: string;
  tag: string;
  title: string;
  copy: string;
  specLabel: string;
  specs: [string, string][];
  place: string;
  image: string;
  imageAlt: string;
  groups: Exclude<Filter, "All Projects">[];
};

const CASES: Case[] = [
  {
    id: "north-sea",
    code: "PROJECT ID // 03-HVDC",
    tag: "Power Infrastructure | Renewable Transmission",
    title: "North Sea Offshore Wind HVDC Interconnector",
    copy: "Formally harmonic resonance analysis, grid code compliance validation, and dynamic reactive power sizing for an offshore multi-terminal HVDC link feeding directly into sovereign onshore transmission systems.",
    specLabel: "System metric",
    specs: [
      ["Transmission capacity", "1,400 MW Continuous"],
      ["Voltage standard", "±525 kV VSC-HVDC"],
      ["Modelling scope", "EMT Stability & Active Filtering"],
    ],
    place: "Northern Europe • Sovereign Grid",
    image: "/photos/project-hvdc.png",
    imageAlt: "Offshore HVDC converter platform with a service vessel in a rough North Sea",
    groups: ["Power Infrastructure"],
  },
  {
    id: "helix",
    code: "PROJECT ID // 05-HLX",
    tag: "Data Centres | Critical Infrastructure",
    title: "Project Helix Hyperscale Data Campus (120MW)",
    copy: "Complete front-end engineering design (FEED): 2N concurrent redundancy distribution, arc flash study, and dedicated 115kV dual-bus on-site utility substation for Tier IV hyperscale cloud infrastructure.",
    specLabel: "Infrastructure parameter",
    specs: [
      ["Critical IT load", "120 MW Solid Load"],
      ["Topology", "2N Redundant UPS Architecture"],
      ["Substation design", "Gas-Insulated (GIS) 115kV"],
    ],
    place: "Frankfurt Metro • Federal Republic of Germany",
    image: "/photos/project-helix.png",
    imageAlt: "Aerial view of a hyperscale data campus with a substation compound at dusk",
    groups: ["Data Centres", "Electrical Engineering"],
  },
  {
    id: "national-grid",
    code: "PROJECT ID // 03-NGR",
    tag: "Electrical Engineering | Utility Infrastructure",
    title: "National Grid Bulk Supply Substation Modernization",
    copy: "Full digital transformation to IEC 61850 protocol across 400kV/132kV bulk supply points. Migration from electro-mechanical relays to dual-redundant numerical protection without live feeder interruption.",
    specLabel: "Standard & topology",
    specs: [
      ["Operational voltage", "400kV / 132kV Transformation"],
      ["Automation standard", "IEC 61850 Process Bus"],
      ["Circuit continuity", "Zero Unplanned Outages"],
    ],
    place: "South East Region • United Kingdom",
    image: "/photos/project-grid.png",
    imageAlt: "Engineer in a substation control building beside rows of numerical protection panels",
    groups: ["Power Infrastructure", "Electrical Engineering"],
  },
  {
    id: "semiconductor",
    code: "PROJECT ID // 04-SMC",
    tag: "Industrial Infrastructure | Advanced Manufacturing",
    title: "Trans-Continental Semiconductor Fabrication Facility",
    copy: "Ultra-resilient microgrid design with active harmonic elimination and Dynamic Voltage Restorer (DVR) integration protecting EUV lithography lines against grid micro-sags and duration shifts.",
    specLabel: "Power quality standard operational result",
    specs: [
      ["Energy demand", "85 MW Dominated Supply"],
      ["Power factor / THD", "Class A (THD < 1.5%)"],
      ["Voltage sag ride-through", "0 ms Interruption Window"],
    ],
    place: "Silicon Saxony • Federal Europe",
    image: "/photos/project-fab.png",
    imageAlt: "Semiconductor fab at night with cooling towers and a medium-voltage switchyard",
    groups: ["Industrial Infrastructure", "Electrical Engineering"],
  },
  {
    id: "storage",
    code: "PROJECT ID // 06-BESS",
    tag: "Power Systems | Grid Stability",
    title: "Sovereign Energy Storage & Peaker Plant Integration",
    copy: "Dynamic system impact studies, transient recovery voltage assessment, and black-start coordination for a 200MW / 800MWh utility-scale Battery Energy Storage System bolstering desert regional grid resiliency.",
    specLabel: "Storage metric / system performance",
    specs: [
      ["Energy volume", "200 MW / 800 MWh (4h)"],
      ["Frequency regulation", "Sub-Second Fast Frequency"],
      ["Dynamic mode", "Synthetic Virtual Inertia"],
    ],
    place: "GCC Grid Interconnection • Middle East",
    image: "/photos/project-bess.png",
    imageAlt: "Containerised battery storage site and transformer in a desert",
    groups: ["Power Infrastructure"],
  },
];

const DISCIPLINES = [
  { icon: Zap, tag: "Discipline 01", title: "Transient & EMT Modeling", copy: "Detailed electromagnetic transient models that expose switching surges, resonance and control interactions before energization." },
  { icon: Gauge, tag: "Discipline 02", title: "Grid Code Certification", copy: "Full compliance evidence for ENTSO-E, NERC and regional grid codes, with integration standards and utility sign-off support." },
  { icon: ShieldCheck, tag: "Discipline 03", title: "Owner's Engineering & FEED", copy: "Independent owner's engineering support from feasibility through front-end design, procurement review and commissioning." },
];

function CaseRow({ c, flip }: { c: Case; flip: boolean }) {
  return (
    <Reveal as="li" from={flip ? "right" : "left"} className="grid overflow-hidden card-lift rounded-md border border-hairline bg-white lg:grid-cols-2">
      <div className={cn("relative aspect-[4/3] lg:aspect-auto lg:min-h-[26rem]", flip && "lg:order-2")}>
        <ParallaxImage src={c.image} alt={c.imageAlt} sizes="(min-width: 1024px) 620px, 100vw" className="absolute inset-0" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#1b2027]/70 via-transparent to-transparent" />
        <span className="absolute bottom-3 left-3 rounded-sm bg-black/70 px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">{c.code}</span>
        <span className="absolute bottom-3 right-3 max-w-[55%] rounded-sm bg-black/70 px-2.5 py-1.5 text-right text-[11px] font-semibold uppercase tracking-[0.1em] text-white/80">{c.place}</span>
      </div>
      <div className={cn("flex flex-col justify-center p-6 md:p-9", flip && "lg:order-1")}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">{c.tag}</p>
        <h2 className="font-display mt-3 text-[clamp(1.4rem,1.1rem+1.1vw,1.9rem)] font-bold leading-[1.15] tracking-[-0.02em] text-balance">{c.title}</h2>
        <p className="mt-3 text-[14px] leading-relaxed text-graphite-600">{c.copy}</p>

        <div className="mt-5 rounded-sm border border-hairline bg-canvas p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-steel">{c.specLabel}</p>
          <dl className="mt-2.5 space-y-2 text-[13px]">
            {c.specs.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-t border-hairline pt-2 first:border-0 first:pt-0">
                <dt className="text-steel">{k}</dt>
                <dd className="text-right font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-sm bg-graphite-950 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-brand">
            View case study &amp; specs <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
      </div>
    </Reveal>
  );
}

/** Projects: light technical hero, filterable case-study rows, discipline cards and a closing call to action. */
export function Projects() {
  const [filter, setFilter] = useState<Filter>("All Projects");
  const shown = filter === "All Projects" ? CASES : CASES.filter((c) => c.groups.includes(filter));

  return (
    <>
      <ScrollProgress />
      {/* Hero */}
      <section className="bg-white pt-28 text-graphite-950 md:pt-36">
        <div className={WRAP}>
          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-steel">
            <span>Home / Engineering Portfolio</span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" /> Registry dossier • Reference series 2025
            </span>
          </div>
          <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
            <Reveal from="left" className="lg:col-span-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">Commissioned capital programs</p>
              <h1 className="font-display mt-4 text-[clamp(2.25rem,1.5rem+4vw,4.25rem)] font-bold leading-[1.02] tracking-[-0.03em] text-balance">
                ENGINEERING EXPERTISE. <span className="text-brand">REAL-WORLD IMPACT.</span>
              </h1>
            </Reveal>
            <Reveal from="right" delay={0.08} className="lg:col-span-4">
              <p className="text-[14px] leading-relaxed text-graphite-600">
                Explore selected engineering projects, technical expertise, and the range of infrastructure challenges addressed by INFOELEX across high-voltage transmission, hyperscale compute, and mission-critical networks.
              </p>
            </Reveal>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-t-md bg-white/10 lg:grid-cols-4">
            {HERO_STATS.map((s) => (
              <div key={s.label} className="bg-[#232a32] p-5 text-paper">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-paper/50">{s.label}</dt>
                <dd className="font-display mt-2 text-[clamp(1.75rem,1.4rem+1.5vw,2.5rem)] font-bold leading-none tracking-[-0.02em]"><CountUp value={s.value} /></dd>
                <dd className="mt-2 text-[12px] leading-snug text-paper/55">{s.note}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Filters + cases */}
      <section className="bg-white pb-14 pt-6 text-graphite-950 md:pb-24">
        <div className={WRAP}>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div role="group" aria-label="Filter projects by sector" className="flex flex-wrap gap-1.5">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  aria-pressed={f === filter}
                  className={cn(
                    "rounded-sm border px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] transition-colors",
                    f === filter ? "border-brand bg-brand text-white" : "border-hairline bg-white text-graphite-600 hover:border-graphite-950/30"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
            <p aria-live="polite" className="text-[11px] font-semibold uppercase tracking-[0.12em] text-steel">
              Displaying {shown.length} of {CASES.length} verified case studies
            </p>
          </div>

          <ul className="mt-8 space-y-6 md:space-y-8">
            {shown.map((c, i) => (
              <CaseRow key={c.id} c={c} flip={i % 2 === 1} />
            ))}
          </ul>

          <ul className="mt-14 grid gap-4 md:grid-cols-3">
            {DISCIPLINES.map((d) => (
              <li key={d.title} className="card-lift rounded-md border border-hairline bg-white p-5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">{d.tag}</span>
                  <d.icon className="h-4 w-4 text-steel" aria-hidden />
                </div>
                <h3 className="font-display mt-3 text-lg font-bold tracking-tight">{d.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-graphite-600">{d.copy}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Closing */}
      <section className="bg-[#232a32] py-16 text-paper md:py-24">
        <div className={cn(WRAP, "grid gap-10 lg:grid-cols-12 lg:items-center")}>
          <Reveal from="left" className="lg:col-span-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">Advisory direct line • Institutional engagement</p>
            <h2 className="font-display mt-4 text-[clamp(2rem,1.3rem+3.4vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-balance">
              HAVE A COMPLEX ENGINEERING CHALLENGE?
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-paper/70">
              Our senior technical principals are available for confidential project scoping, peer-review audits, and utility-scale engineering feasibility assessments.
            </p>
          </Reveal>
          <Reveal from="right" delay={0.1} className="flex flex-col gap-3 lg:col-span-4 lg:col-start-9">
            <Link href="/contact" className="inline-flex items-center justify-between gap-3 rounded-sm bg-brand px-6 py-4 text-[13px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-brand-dim focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              Submit project RFP <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
            <p className="text-[12px] text-paper/50">Average executive response within 24 hours</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
