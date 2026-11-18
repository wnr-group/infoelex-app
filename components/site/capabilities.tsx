import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/home/reveal";
import { cn } from "@/lib/utils";
import { DeliverablesTable } from "./capabilities-table";

const WRAP = "mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10";
const H2 = "font-display text-[clamp(1.75rem,1.35rem+1.7vw,2.5rem)] font-bold leading-[1.12] tracking-[-0.025em] text-balance";

const HERO_SPECS = [
  { label: "Active compliance standards", value: "IEEE 1547 • IEC 60909 • ETAP / PSCAD • DIgSILENT", note: "Applied across every study and design" },
  { label: "Deliverable standards", value: "Chartered review • Peer audited", note: "Every package independently checked" },
  { label: "Computational scope", value: "0.4 MW to multi-GW architectures", note: "From LV boards to transmission networks" },
];

type Visual =
  | { kind: "telemetry"; image: string; alt: string; caption: [string, string]; telemetry: { label: string; value: string; note: string; series: number[] } }
  | { kind: "spec"; image: string; alt: string; caption: [string, string]; anchor?: "right"; spec: { tag: string; headline: string; rows: [string, string][]; foot: string } }
  | { kind: "table"; image?: string; alt?: string; caption?: [string, string]; title: string; head: string[]; rows: string[][]; note: string }
  | { kind: "metrics"; title: string; items: [string, string][]; bars: number[]; note: string };

type Discipline = {
  id: string;
  index: string;
  tag: string;
  title: string;
  lead: string;
  points: { title: string; copy: string }[];
  deliverables: string[];
  href: string;
  visual: Visual;
};

const DISCIPLINES: Discipline[] = [
  {
    id: "studies",
    index: "01",
    tag: "Analysis & Planning",
    title: "Power System Studies",
    lead: "We model the network, then stress it: normal operation, faults, switching and grid-code events, before anything is built or energised.",
    points: [
      { title: "Steady-State Load Flow & Contingency Analysis (N-1, N-2)", copy: "Voltage profile, loading and losses under normal and outage conditions." },
      { title: "Short-Circuit & Dynamic Fault Clearing", copy: "Fault levels and clearing times verified against equipment ratings." },
      { title: "Arc-Flash Risk Assessment & Mitigation (IEEE 1584)", copy: "Incident energy mapped, labelled and reduced where it matters." },
      { title: "Harmonic Distortion Analysis & Active Filter Design", copy: "Compliance with IEEE 519 and utility limits, with filter sizing." },
    ],
    deliverables: ["Study reports", "Network models", "Risk register"],
    href: "/services/power-system-analysis",
    visual: {
      kind: "telemetry",
      image: "/photos/edge-control-room.png",
      alt: "Engineers reviewing network simulation waveforms",
      caption: ["Real-time simulation | Study room", "RTDS • PSCAD"],
      telemetry: { label: "Fault clearing time", value: "0.54 s", note: "Verified against relay and breaker ratings", series: [8, 10, 9, 14, 24, 40, 30, 18, 12, 10, 9, 9] },
    },
  },
  {
    id: "electrical",
    index: "02",
    tag: "Core Discipline",
    title: "Electrical Engineering",
    lead: "One of our engineering skill-sets from initial feasibility and FEED packages through detailed design for generation, distribution and industrial facilities.",
    points: [
      { title: "Front-End Engineering Design (FEED) & Executive Packages", copy: "Concept through approved design basis for investment decisions." },
      { title: "HV & EHV Substation Layouts (Up to 400kV)", copy: "Air- and gas-insulated arrangements with clearances and earthing." },
      { title: "Transformer & Shunt Reactor Sizing", copy: "Ratings, impedance and loss evaluation for each application." },
      { title: "Cable Thermal Ampacity Analysis", copy: "Derating for installation, grouping and soil conditions." },
    ],
    deliverables: ["Design basis", "Calculations", "Single-line diagrams"],
    href: "/services/earthing-grounding",
    visual: {
      kind: "spec",
      image: "/photos/cap-electrical.png",
      alt: "Engineer walking along a row of gas-insulated switchgear in an indoor substation hall",
      caption: ["GIS | Electrical | Balanced plant", "Substation design"],
      spec: { tag: "Design envelope", headline: "LV to 400kV", rows: [["System voltage", "Up to 400 kV"], ["Calculation set", "IEC 60364 / IEEE 80"], ["Review", "Chartered engineer"]], foot: "Balanced plant arrangement verified" },
    },
  },
  {
    id: "protection",
    index: "03",
    tag: "Protection Engineering",
    title: "Protection and Control",
    lead: "Protection that clears the fault and nothing else: settings, coordination and arc-flash assessment worked out against the real network.",
    points: [
      { title: "Protection Philosophy & Relay Coordination", copy: "Discrimination across the full network, from source to load." },
      { title: "Digital Substation Integration & IEC 61850 Process/Station Bus", copy: "GOOSE and sampled-value design, tested and documented." },
      { title: "Differential, Distance & Breaker Failure Logic", copy: "Settings that are fast, secure and verified on site." },
      { title: "Low Current Differential & Teleprotection", copy: "Communication-assisted schemes for long lines and cables." },
    ],
    deliverables: ["Protection settings", "Coordination curves", "Test plans"],
    href: "/services/protection-arc-flash",
    visual: {
      kind: "table",
      image: "/photos/cap-protection.png",
      alt: "Gloved technician connecting test leads to the test block of a numerical protection relay",
      caption: ["Relay testing | Secondary injection", "Numerical relay"],
      title: "Relay coordination | Trip schedule",
      head: ["Device", "Pickup", "Time", "Curve"],
      rows: [
        ["F1 Feeder", "400 A", "0.30 s", "IEC VI"],
        ["T1 Incomer", "800 A", "0.60 s", "IEC VI"],
        ["Bus Diff", "—", "< 30 ms", "87B"],
        ["Grid Tie", "1.2 kA", "0.90 s", "IEC EI"],
      ],
      note: "Selectivity margin 0.3 s verified on all stages",
    },
  },
  {
    id: "automation",
    index: "04",
    tag: "Integrated Controls",
    title: "Automation Systems",
    lead: "High-integrity supervisory control, process automation and cyber-resilient operational systems engineered for complex infrastructure.",
    points: [
      { title: "SCADA & Energy Management Systems (EMS)", copy: "Operator-focused supervision of the whole network." },
      { title: "Distributed Control (DCS) & Process Automation", copy: "Reliable sequencing and interlocks for power and plant." },
      { title: "OT Cyber-Security Compliance (IEC 62443)", copy: "Zoning, hardening and monitoring of control networks." },
      { title: "PMU & Wide-Area Monitoring Systems (WAMS)", copy: "Synchrophasor data for stability and event analysis." },
    ],
    deliverables: ["Control specifications", "I/O schedules", "Integration support"],
    href: "/services/dynamic-transients-rms",
    visual: {
      kind: "spec",
      image: "/photos/edge-control-room.png",
      alt: "Control room supervising a power network",
      caption: ["IEC 62443 | Control layer", "SCADA • EMS"],
      spec: { tag: "Control layer", headline: "99.99% availability", rows: [["Protocols", "IEC 61850 / 60870"], ["Cyber zoning", "IEC 62443"], ["Data points", "Synchrophasor ready"]], foot: "Supervision and control in one system" },
    },
  },
  {
    id: "design",
    index: "05",
    tag: "Detailed Design",
    title: "Electrical Design Engineering",
    lead: "Buildable drawings and documents: the single-line diagrams, layouts, specifications and bill of quantities a contractor can price and install.",
    points: [
      { title: "Precision 3D BIM Modelling (LOD 300-400) & Clash Detection", copy: "Coordinated models that remove rework on site." },
      { title: "Detailed Cable Scheduling, Routing & Cable Tray Design", copy: "Complete, installable cable documentation." },
      { title: "Lighting, Small Power and Containment Design", copy: "Compliant layouts with calculations behind them." },
      { title: "Modular Switchgear & Prefabricated E-House Packaging", copy: "Specifications written for factory-built delivery." },
    ],
    deliverables: ["Drawing set", "Specifications", "BOQ"],
    href: "/sectors/building-services",
    visual: {
      kind: "metrics",
      title: "Design delivery | Model status",
      items: [["Model detail", "LOD 300-400"], ["Clash checks", "Automated"], ["Drawing output", "IFC / DWG"], ["Cable schedule", "Complete"]],
      bars: [62, 78, 54, 88, 70, 95],
      note: "Coordinated model released for construction",
    },
  },
  {
    id: "consultancy",
    index: "06",
    tag: "Independent Advisory",
    title: "Technical Consultancy",
    lead: "Independent technical judgement for owners and developers: design reviews, compliance checks and specialist advice at the decisions that matter.",
    points: [
      { title: "Grid Interconnection Compliance & Grid Code Negotiation", copy: "Connection studies and engagement with the network operator." },
      { title: "Premium Failure Analysis & Root Cause Investigation (RCA)", copy: "Forensic review of incidents and recurring faults." },
      { title: "Technical Due Diligence (TDD) for Infrastructure M&A", copy: "Independent assessment of assets before commitment." },
      { title: "Expert Witness & Regulatory Support", copy: "Clear technical evidence for disputes and approvals." },
    ],
    deliverables: ["Review report", "Compliance statement", "Expert opinion"],
    href: "/services/specialist-studies",
    visual: {
      kind: "spec",
      image: "/photos/cap-consultancy.png",
      alt: "Two consulting engineers reviewing drawings beside a 132 kV substation at sunset",
      caption: ["Independent advisory | Site review", "Design review"],
      anchor: "right",
      spec: { tag: "Advisory scope", headline: "Conflict-free", rows: [["Independence", "No vendor ties"], ["Reviewer", "Chartered"], ["Turnaround", "Agreed up front"]], foot: "Opinions you can rely on in negotiation" },
    },
  },
];

function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em]", className)}>{children}</span>;
}

/** Small filled line chart, drawn in SVG so it scales to its card. */
function Sparkline({ series }: { series: number[] }) {
  const w = 240;
  const h = 56;
  const max = Math.max(...series);
  const pts = series.map((v, i) => [(i / (series.length - 1)) * w, h - (v / max) * (h - 6) - 2] as const);
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-14 w-full" role="img" aria-label="Fault current decaying after clearing">
      <path d={`${line} L${w} ${h} L0 ${h} Z`} className="fill-brand/15" />
      <path d={line} className="fill-none stroke-brand" strokeWidth="1.75" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function PhotoFrame({ image, alt, caption, children }: { image: string; alt: string; caption: [string, string]; children?: React.ReactNode }) {
  return (
    <figure className="card-lift relative aspect-[4/3] overflow-hidden rounded-md ring-1 ring-graphite-950/10">
      <Image src={image} alt={alt} fill sizes="(min-width: 1024px) 480px, 100vw" quality={80} className="object-cover" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#1b2027]/85 via-transparent to-transparent" />
      {children}
      <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 px-4 pb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
        <span>{caption[0]}</span>
        <span className="hidden text-white/65 sm:inline">{caption[1]}</span>
      </figcaption>
    </figure>
  );
}

function VisualPanel({ v }: { v: Visual }) {
  if (v.kind === "telemetry") {
    return (
      <div className="space-y-3">
        <PhotoFrame image={v.image} alt={v.alt} caption={v.caption} />
        <div className="card-lift rounded-md bg-[#232a32] p-4 text-paper">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-paper/55">{v.telemetry.label}</p>
              <p className="font-display mt-1 text-3xl font-bold leading-none tracking-[-0.02em]">{v.telemetry.value}</p>
            </div>
            <div className="w-1/2 max-w-[11rem]"><Sparkline series={v.telemetry.series} /></div>
          </div>
          <p className="mt-3 border-t border-white/10 pt-3 text-xs text-paper/55">{v.telemetry.note}</p>
        </div>
      </div>
    );
  }
  if (v.kind === "spec") {
    return (
      <PhotoFrame image={v.image} alt={v.alt} caption={v.caption}>
        <div className={cn("absolute inset-x-3 top-3 rounded-sm bg-[#1b2027]/90 p-4 text-paper backdrop-blur sm:w-64", v.anchor === "right" ? "sm:left-auto" : "sm:right-auto")}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">{v.spec.tag}</p>
          <p className="font-display mt-1 text-xl font-bold tracking-tight">{v.spec.headline}</p>
          <dl className="mt-3 space-y-1.5 border-t border-white/10 pt-3 text-xs">
            {v.spec.rows.map(([k, val]) => (
              <div key={k} className="flex justify-between gap-3">
                <dt className="text-paper/55">{k}</dt>
                <dd className="text-right font-semibold">{val}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-[11px] text-paper/50">{v.spec.foot}</p>
        </div>
      </PhotoFrame>
    );
  }
  if (v.kind === "table") {
    return (
      <div className="card-lift overflow-hidden rounded-md bg-[#232a32] text-paper">
        {v.image && v.alt && v.caption && (
          <figure className="relative aspect-[16/9]">
            <Image src={v.image} alt={v.alt} fill sizes="(min-width: 1024px) 480px, 100vw" quality={80} className="object-cover" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#1b2027]/85 via-transparent to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 px-4 pb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
              <span>{v.caption[0]}</span>
              <span className="hidden text-white/65 sm:inline">{v.caption[1]}</span>
            </figcaption>
          </figure>
        )}
        <p className="border-b border-white/10 px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-paper/60">{v.title}</p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[20rem] text-left text-[13px]">
            <thead>
              <tr className="text-[11px] uppercase tracking-[0.1em] text-paper/45">
                {v.head.map((h) => (<th key={h} scope="col" className="px-5 py-2.5 font-semibold">{h}</th>))}
              </tr>
            </thead>
            <tbody>
              {v.rows.map((r) => (
                <tr key={r[0]} className="border-t border-white/10 transition-colors hover:bg-white/5">
                  {r.map((c, i) => (<td key={i} className={cn("px-5 py-3", i === 0 ? "font-semibold" : "text-paper/70")}>{c}</td>))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <svg viewBox="0 0 240 70" className="mx-5 mt-2 h-16 w-[calc(100%-2.5rem)]" role="img" aria-label="Time-current coordination curves">
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M0 ${58 - i * 4} C ${70 + i * 18} ${56 - i * 4}, ${120 + i * 14} ${30 - i * 10}, 240 ${6 + i * 6}`} className={i === 1 ? "fill-none stroke-brand" : "fill-none stroke-white/35"} strokeWidth="1.5" />
          ))}
        </svg>
        <p className="px-5 pb-4 pt-2 text-xs text-paper/55">{v.note}</p>
      </div>
    );
  }
  return (
    <div className="card-lift rounded-md bg-[#232a32] p-5 text-paper">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-paper/60">{v.title}</p>
      <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-white/10">
        {v.items.map(([k, val]) => (
          <div key={k} className="bg-[#2a323b] p-4">
            <dt className="text-[11px] uppercase tracking-[0.1em] text-paper/50">{k}</dt>
            <dd className="font-display mt-1.5 text-lg font-bold tracking-tight">{val}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-5 flex h-20 items-end gap-2" role="img" aria-label="Model completeness by package">
        {v.bars.map((b, i) => (
          <span key={i} style={{ height: `${b}%` }} className={cn("flex-1 rounded-t-sm", i === v.bars.length - 1 ? "bg-brand" : "bg-white/20")} />
        ))}
      </div>
      <p className="mt-4 border-t border-white/10 pt-3 text-xs text-paper/55">{v.note}</p>
    </div>
  );
}

function DisciplineBlock({ d, flip, tinted }: { d: Discipline; flip: boolean; tinted: boolean }) {
  return (
    <section id={d.id} className={cn("scroll-mt-20 py-12 text-graphite-950 md:py-20", tinted ? "bg-mist-blue/70" : "bg-white")}>
      <div className={cn(WRAP, "grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-14")}>
        <Reveal className={cn("lg:col-span-7", flip && "lg:order-2")}>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-sm bg-brand px-2 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-white">Discipline {d.index}</span>
            <Tag className="text-steel">{d.tag}</Tag>
          </div>
          <h2 className={cn(H2, "mt-5")}>{d.title}</h2>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-graphite-600">{d.lead}</p>

          <ul className="mt-6 space-y-4">
            {d.points.map((p) => (
              <li key={p.title} className="flex gap-3">
                <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                <div>
                  <p className="text-sm font-bold leading-snug">{p.title}</p>
                  <p className="mt-0.5 text-[13px] leading-relaxed text-graphite-600">{p.copy}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t border-hairline pt-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-steel">Key engineering deliverables</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {d.deliverables.map((x) => (
                <span key={x} className="rounded-sm border border-hairline bg-white px-2.5 py-1 text-xs text-graphite-800 transition-colors hover:border-brand/40">{x}</span>
              ))}
              <Link href={d.href} className="ml-auto inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-brand hover:underline">
                Learn more <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className={cn("lg:col-span-5", flip && "lg:order-1")}>
          <VisualPanel v={d.visual} />
        </Reveal>
      </div>
    </section>
  );
}

/** Capabilities: light technical hero, six discipline sections with instrument-style visuals, a filterable deliverables register and a closing call to action. */
export function Capabilities() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white pt-28 text-graphite-950 md:pt-36">
        <div className={WRAP}>
          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-steel">
            <span>Home / Capabilities</span>
            <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-brand" /> ISO 9001:2015 audited • Engineering services</span>
          </div>
          <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
            <Reveal className="lg:col-span-7">
              <Tag className="text-brand">Core engineering services</Tag>
              <h1 className="font-display mt-4 text-[clamp(2.25rem,1.5rem+4vw,4.25rem)] font-bold leading-[1.04] tracking-[-0.03em] text-balance">
                Integrated Engineering. <span className="text-brand">Comprehensive Expertise.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-5">
              <p className="text-[15px] leading-relaxed text-graphite-600">
                Engineering knowledge and technical capabilities to support complex electrical and power systems requirements across sovereign grids, industrial mega-plants and hyperscale digital architecture.
              </p>
            </Reveal>
          </div>

          <dl className="mt-10 grid gap-3 pb-12 md:grid-cols-3 md:pb-16">
            {HERO_SPECS.map((s) => (
              <div key={s.label} className="card-lift rounded-md border border-hairline bg-mist-blue/60 p-5">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-steel">{s.label}</dt>
                <dd className="mt-2 text-sm font-bold leading-snug">{s.value}</dd>
                <dd className="mt-1.5 text-xs text-graphite-600">{s.note}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {DISCIPLINES.map((d, i) => (
        <DisciplineBlock key={d.id} d={d} flip={i % 2 === 1} tinted={i % 2 === 1} />
      ))}

      {/* Deliverables register */}
      <section className="bg-white py-14 text-graphite-950 md:py-24">
        <div className={WRAP}>
          <Tag className="text-steel">Technical deliverables register</Tag>
          <Reveal className="mt-5 max-w-2xl">
            <h2 className={H2}>Standard Deliverable Specifications</h2>
            <p className="mt-3 text-sm leading-relaxed text-graphite-600">
              Select a project phase or engineering discipline to view the verified technical artifacts, governing standards and independent review level for each deliverable.
            </p>
          </Reveal>
          <div className="mt-8">
            <DeliverablesTable />
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="bg-[#232a32] py-16 text-paper md:py-24">
        <div className={cn(WRAP, "grid gap-10 lg:grid-cols-12 lg:items-center")}>
          <Reveal className="lg:col-span-7">
            <Tag className="text-brand">Direct engineering consultation</Tag>
            <h2 className="font-display mt-5 text-[clamp(2rem,1.3rem+3.4vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-balance">
              Discuss Your Engineering Requirements
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-paper/70">
              Speak directly with our chartered electrical engineering directors to scope system studies, FEED packages, substation designs, or regulatory compliance verification.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-3 lg:col-span-4 lg:col-start-9">
            <Link href="/contact" className="inline-flex items-center justify-between gap-3 rounded-sm bg-brand px-6 py-4 text-[13px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-brand-dim focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              Schedule technical consultation <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href="/critical-power" className="inline-flex items-center justify-between gap-3 rounded-sm border border-white/20 px-6 py-4 text-[13px] font-bold uppercase tracking-[0.12em] transition-colors hover:border-white/50 hover:bg-white/5">
              Explore critical power <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
