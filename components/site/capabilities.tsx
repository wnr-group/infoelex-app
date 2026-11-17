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
  { label: "Computational scope", value: "0.4 MW to multi-GW", note: "Architectures from LV boards to transmission" },
];

type Discipline = {
  id: string;
  index: string;
  tag: string;
  title: string;
  lead: string;
  points: { title: string; copy: string }[];
  deliverables: string[];
  href: string;
  image: string;
  imageAlt: string;
  panel: { label: string; rows: [string, string][] };
  tone: "white" | "tint";
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
    image: "/photos/substation.jpg",
    imageAlt: "Outdoor substation at sunset",
    panel: { label: "Simulation readout", rows: [["Network model", "Validated"], ["Contingencies", "N-1 / N-2"], ["Fault clearing", "< 100 ms"]] },
    tone: "white",
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
    image: "/photos/pylon-sunset.jpg",
    imageAlt: "Transmission pylon against the evening sky",
    panel: { label: "Design envelope", rows: [["Voltage range", "LV to 400kV"], ["Calculation set", "IEC 60364"], ["Review", "Chartered"]] },
    tone: "tint",
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
    image: "/about-hero-bg.png",
    imageAlt: "Engineers reviewing protection settings",
    panel: { label: "Trip coordination", rows: [["Selectivity", "Verified"], ["Fastest trip", "< 2 cycles"], ["Standard", "IEC 61850"]] },
    tone: "white",
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
    image: "/photos/solar-farm.jpg",
    imageAlt: "Solar farm connected to a control system",
    panel: { label: "Control layer", rows: [["Protocols", "IEC 61850 / 60870"], ["Cyber", "IEC 62443"], ["Availability", "99.99%"]] },
    tone: "tint",
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
    image: "/photos/wind-turbines.jpg",
    imageAlt: "Wind turbines on a ridge",
    panel: { label: "Design delivery", rows: [["Model detail", "LOD 300-400"], ["Clash checks", "Automated"], ["Output", "IFC / DWG"]] },
    tone: "white",
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
    image: "/photos/substation.jpg",
    imageAlt: "High-voltage substation equipment",
    panel: { label: "Advisory scope", rows: [["Independence", "Conflict-free"], ["Reviewer", "Chartered"], ["Turnaround", "Agreed up front"]] },
    tone: "tint",
  },
];

function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] sm:text-[12px]", className)}>{children}</span>;
}

function DisciplineBlock({ d, flip }: { d: Discipline; flip: boolean }) {
  return (
    <section id={d.id} className={cn("scroll-mt-20 py-12 text-graphite-950 md:py-20", d.tone === "white" ? "bg-white" : "bg-mist-blue/70")}>
      <div className={cn(WRAP, "grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-14")}>
        <Reveal className={cn("lg:col-span-7", flip && "lg:order-2")}>
          <div className="flex items-center gap-3">
            <span className="rounded-sm bg-brand px-2 py-1 text-[11px] font-bold tabular-nums text-white">Discipline {d.index}</span>
            <Tag className="text-steel">{d.tag}</Tag>
          </div>
          <h2 className={cn(H2, "mt-5")}>{d.title}</h2>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-graphite-600">{d.lead}</p>

          <ul className="mt-6 space-y-4">
            {d.points.map((p) => (
              <li key={p.title} className="flex gap-3">
                <span aria-hidden className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                <div>
                  <p className="text-[14px] font-bold leading-snug">{p.title}</p>
                  <p className="mt-0.5 text-[13px] leading-relaxed text-graphite-600">{p.copy}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t border-hairline pt-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-steel">Key engineering deliverables</p>
            <div className="mt-2.5 flex flex-wrap items-center gap-2">
              {d.deliverables.map((x) => (
                <span key={x} className="rounded-sm border border-hairline bg-white px-2.5 py-1 text-[12px] text-graphite-800">{x}</span>
              ))}
              <Link href={d.href} className="ml-auto inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.12em] text-brand hover:underline">
                Learn more <ArrowUpRight className="h-3 w-3" aria-hidden />
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className={cn("lg:col-span-5", flip && "lg:order-1")}>
          <figure className="relative aspect-[4/3] card-lift overflow-hidden rounded-md ring-1 ring-graphite-950/10">
            <Image src={d.image} alt={d.imageAlt} fill sizes="(min-width: 1024px) 480px, 100vw" quality={80} className="object-cover" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#1b2027]/85 via-[#1b2027]/20 to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-4 text-white">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">{d.panel.label}</p>
              <dl className="mt-2 grid grid-cols-3 gap-3">
                {d.panel.rows.map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-[11px] uppercase tracking-[0.1em] text-white/55">{k}</dt>
                    <dd className="mt-0.5 text-[12px] font-bold leading-tight sm:text-xs">{v}</dd>
                  </div>
                ))}
              </dl>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

/** Capabilities: dark technical hero, six discipline sections, a filterable deliverables register and a closing call to action. */
export function Capabilities() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[#1b2027] text-paper">
        <Image src="/photos/pylon-sunset.jpg" alt="" fill priority sizes="100vw" quality={75} className="-z-20 object-cover opacity-30" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-[#1b2027]/75 to-[#1b2027]" />
        <div className={cn(WRAP, "pb-12 pt-28 md:pb-16 md:pt-32")}>
          <div className="w-fit rounded-sm border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-paper/70 sm:text-[12px]">
            Home | Capabilities
          </div>
          <div className="mt-12 grid gap-8 md:mt-16 lg:grid-cols-12 lg:items-end">
            <Reveal className="lg:col-span-7">
              <Tag className="text-brand">Core engineering services</Tag>
              <h1 className="font-display mt-4 text-[clamp(2.25rem,1.5rem+4vw,4.25rem)] font-bold leading-[1.04] tracking-[-0.03em] text-balance">
                Integrated Engineering. Comprehensive Expertise.
              </h1>
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-5">
              <p className="text-[15px] leading-relaxed text-paper/70">
                Engineering knowledge and technical capabilities to support complex electrical and power systems requirements across sovereign grids, industrial mega-plants and hyperscale digital architecture.
              </p>
            </Reveal>
          </div>

          <dl className="mt-12 grid gap-px overflow-hidden rounded-md bg-white/10 md:grid-cols-3">
            {HERO_SPECS.map((s) => (
              <div key={s.label} className="bg-[#232a32] p-5 transition-colors duration-300 hover:bg-[#2a323b]">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-paper/50">{s.label}</dt>
                <dd className="mt-2 text-[14px] font-bold leading-snug">{s.value}</dd>
                <dd className="mt-1.5 text-[12px] text-paper/50">{s.note}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {DISCIPLINES.map((d, i) => (
        <DisciplineBlock key={d.id} d={d} flip={i % 2 === 1} />
      ))}

      {/* Deliverables register */}
      <section className="bg-canvas py-14 text-graphite-950 md:py-24">
        <div className={WRAP}>
          <Tag className="text-steel">Technical deliverables register</Tag>
          <Reveal className="mt-5 max-w-2xl">
            <h2 className={H2}>Standard Deliverable Specifications</h2>
            <p className="mt-3 text-[14px] leading-relaxed text-graphite-600">
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
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-paper/70">
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
