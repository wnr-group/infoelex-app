import Link from "next/link";
import { ArrowUpRight, Atom, Scale, ScanSearch, ShieldCheck, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/home/reveal";
import { fromCol } from "@/components/home/motion";
import { ParallaxImage } from "./primitives";
import { ScrollProgress } from "./scroll-progress";
import { cn } from "@/lib/utils";

const WRAP = "mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10";
const H2 = "font-display text-[clamp(1.75rem,1.35rem+1.7vw,2.5rem)] font-bold uppercase leading-[1.08] tracking-[-0.025em] text-balance";

const MANIFEST = [
  ["Primary topology", "Dual-ring redundant"],
  ["Protective response", "< 40ms clearing"],
  ["Mini-LOI requirement", "LOD 400 fabricated"],
  ["Arc-flash category", "Controlled at 0.8"],
];

const DOCTRINES: { tag: string; title: string; copy: string; foot: [string, string]; icon: LucideIcon }[] = [
  { tag: "Doctrine 1/04", title: "First-Principles Physics", icon: Atom, copy: "We do not extrapolate from generic rules of thumb. System harmonics, harmonic impedance locus, and short-circuit dynamics are derived from fundamental electromagnetic theory and verified numerically.", foot: ["Validation", "Mathematical Derivation"] },
  { tag: "Doctrine 2/04", title: "Fiduciary Independence", icon: Scale, copy: "Free from vendor incentives, our equipment specifications prioritize physical integrity and operational longevity over branded proprietary hardware.", foot: ["Status", "Zero Vendor Royalties"] },
  { tag: "Doctrine 3/04", title: "Empirical Verification", icon: ScanSearch, copy: "Computational models must be corroborated against real-world field data and, where possible, tested on hardware-in-the-loop platforms before project sign-off.", foot: ["Method", "HIL & Open-Loop Benchmarking"] },
  { tag: "Doctrine 4/04", title: "Uncompromising Reliability", icon: ShieldCheck, copy: "We engineer systems intended to survive a specific N-1/N-2 contingency standard, so that single failures cannot cascade into catastrophic, wider systemic outages.", foot: ["Standard", "Deterministic Resilience"] },
];

const STAGES = [
  { n: "01", gate: "Gate 1", title: "Understand", copy: "Exhaustive stakeholder data capture: load forecasting, network constraint definitions, operational constraint mapping and regulatory mandate registration.", tags: ["Grid Interconnect Rules", "Site Constraint Audit", "Boundary Envelope Signoff"] },
  { n: "02", gate: "Gate 2", title: "Analyse", copy: "Computationally steady-state, dynamic stability and electromagnetic transient modeling utilizing PSCAD, DIgSILENT, PowerFactory for rigorous validation.", tags: ["Harmonic Spectral Studies", "Transient Overvoltage (TOV)", "Short-Circuit Withstand"] },
  { n: "03", gate: "Gate 3", title: "Engineer", copy: "Front-end engineering design (FEED), detailed drawings, relay coordination curves, procurement-grade specifications and cable and equipment sizing.", tags: ["Single-Line Schematics", "BOQ Hardware Tagging", "Relay Coordinate Pairs"] },
  { n: "04", gate: "Gate 4", title: "Verify", copy: "Multi-tier peer scrutiny, independent line-by-line calculation checking, boundary validation and strict safety compliance audits.", tags: ["Chartered PE Final Signoff", "NFPA 70E Arc Boundaries"] },
  { n: "05", gate: "Final", title: "Deliver", copy: "On-site factory acceptance testing (FAT) oversight, energization sequencing, interconnection compliance sign-off, and commissioning support.", tags: ["FAT/SAT Verification", "Energization Sequencing", "As-Built Specification Package"] },
];

const STANDARDS = [
  { name: "IEEE (Institute of Electrical and Electronics Engineers)", copy: "IEEE 1584 Arc Flash, IEEE 399 Power Systems, IEEE 519 Harmonics.", badge: "Mandatory core" },
  { name: "IEC (International Electrotechnical Commission)", copy: "IEC 60909 Short-Circuit Currents, IEC 61850 Substation Communication.", badge: "Global compliance" },
  { name: "CIGRE (Council on Large Electric Systems)", copy: "High-voltage transmission line modelling, insulation coordination and transient guidelines.", badge: "Best practice" },
  { name: "NERC (North American Electric Reliability Corp.)", copy: "Bulk power system reliability standards, including PRC and MOD series.", badge: "ERO enforcement" },
  { name: "NFPA (National Fire Protection Association)", copy: "NFPA 70E Standard for Electrical Safety in the Workplace; NFPA 70 National Electrical Code.", badge: "Life safety audit" },
];

const TIERS: [string, string][] = [
  ["Tier 1: Computational Authoring", "Lead Modeller"],
  ["Tier 2: Peer Sensitivity Challenge", "Senior Specialist"],
  ["Tier 3: Statutory Stamp & Sealing", "Chartered PE / CEng"],
];

const TOOLS = [
  { tag: "Simtec Engine", sub: "Transient", title: "PSCAD / EMTDC", copy: "Electromagnetic transient simulation platform. Resolves non-linear switching surges, ferroresonance and synchronous machine dynamics.", row: ["Standard", "IPC Validation Environment"] },
  { tag: "Power System Design", sub: "Analysis", title: "ETAP Enterprise", copy: "Comprehensive load flow, short calculations (IEC & ANSI), arc flash hazard assessment and DC control system modelling.", row: ["Output", "Substation & Facility Power"] },
  { tag: "RMS Dynamics", sub: "Stability", title: "DIgSILENT PowerFactory", copy: "Works with network stability, renewable-energy source integration and grid-code compliance in time-domain studies.", row: ["Focus", "Root Locus & Dynamic RMS"] },
  { tag: "Electromagnetic Engineering", sub: "Safety Field", title: "CDEGS Suite", copy: "Earthing design, soil-layer resistivity modelling, GPR touch and step potential and interference analysis.", row: ["Standard", "IEEE Std 80 / Std 81"] },
  { tag: "Thermal Modeling", sub: "Ampacity", title: "CYMCAP Ampacity", copy: "Underground cable current-carrying capacity and thermal rating, including soil and ambient temperature effects.", row: ["Reference", "IEC 60287 & Neher-McGrath"] },
  { tag: "Spatial Coordination", sub: "BIM", title: "Autodesk Revit LOD 400", copy: "Fabrication-ready spatial clash detection. Generates cable routing, equipment clearance volumes and HVAC clearance validation.", row: ["Tolerance", "Millimeter Clash Zero"] },
];

function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] sm:text-[12px]", className)}>{children}</span>;
}

/** Our Signature: engineering methodology and quality framework on a white page. */
export function Signature() {
  return (
    <>
      <ScrollProgress />
      {/* Hero */}
      <section className="relative overflow-hidden bg-white pt-28 text-graphite-950 md:pt-36">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]"
          style={{ backgroundImage: "linear-gradient(rgba(21,23,26,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(21,23,26,0.05) 1px, transparent 1px)", backgroundSize: "32px 32px" }}
        />
        <div className={cn(WRAP, "relative")}>
          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-steel">
            <span>Home / Our Signature</span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" /> Discipline: multi-system telemetry
            </span>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-start">
            <Reveal from="left" className="lg:col-span-7">
              <Tag className="rounded-sm border border-brand/30 bg-brand/5 px-3 py-1.5 text-brand">ISO 9001:2015 audited engineering quality framework</Tag>
              <h1 className="font-display mt-5 text-[clamp(2.25rem,1.5rem+4vw,4.25rem)] font-bold uppercase leading-[1.02] tracking-[-0.03em] text-balance">
                Precision in process. <span className="text-brand">Excellence in execution.</span>
              </h1>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-graphite-600">
                Our approach brings together engineering knowledge, structured methodologies, quality standards, and technical verification to mitigate thermodynamic and computational uncertainty across hyperscale power topologies.
              </p>
            </Reveal>
            <Reveal from="right" delay={0.1} className="lg:col-span-5">
              <div className="rounded-md bg-[#232a32] p-6 text-paper">
                <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.16em] text-paper/50">
                  <span>Telemetry rating</span>
                  <span className="rounded-sm bg-brand px-1.5 py-0.5 text-white">QA</span>
                </div>
                <p className="font-display mt-3 text-[clamp(2.75rem,2rem+3vw,4rem)] font-bold leading-none tracking-[-0.03em]">
                  0.00<span className="text-brand">%</span>
                </p>
                <p className="mt-3 text-[13px] leading-relaxed text-paper/60">Unsupervised downtime tolerance across energized single-line configurations under operational commission.</p>
                <dl className="mt-5 flex justify-between gap-4 border-t border-white/10 pt-3 text-[11px] font-semibold uppercase tracking-[0.12em]">
                  <div><dt className="text-paper/45">P&amp;C registries</dt></div>
                  <div><dd>100% Traceable</dd></div>
                </dl>
              </div>
            </Reveal>
          </div>

          <div className="mt-8 grid gap-4 pb-14 lg:grid-cols-12 md:pb-20">
            <Reveal from="left" className="lg:col-span-7">
              <figure className="relative aspect-[16/10] card-lift overflow-hidden rounded-md ring-1 ring-graphite-950/10">
                <ParallaxImage src="/photos/signature-analysis.png" alt="Analyst at a dual-monitor workstation running a transient waveform and harmonic spectrum study beside a network one-line diagram" priority sizes="(min-width: 1024px) 720px, 100vw" className="absolute inset-0" />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#1b2027]/85 via-transparent to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em]"><span className="mr-2 rounded-sm bg-brand px-1.5 py-0.5">REL 01</span>Electromagnetic Transient &amp; Harmonic Spectrum Analysis</p>
                  <p className="mt-1.5 text-[12px] text-white/70">Sub-millisecond transient stability verified prior to front-end hardware procurement for a 300kV interconnect terminal.</p>
                </figcaption>
              </figure>
            </Reveal>
            <Reveal from="right" delay={0.1} className="lg:col-span-5">
              <div className="h-full card-lift rounded-md border border-hairline bg-mist-blue/60 p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-steel">Protocol manifest</p>
                <dl className="mt-3 divide-y divide-hairline text-[13px]">
                  {MANIFEST.map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 py-2.5">
                      <dt className="text-steel">{k}</dt>
                      <dd className="text-right font-semibold">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-4 rounded-sm border-l-2 border-brand bg-white p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">Governance directive</p>
                  <p className="mt-2 text-[13px] italic leading-relaxed text-graphite-600">&ldquo;Every calculation is traceable to a physical principle and an independent reviewer, and no design is released without both.&rdquo;</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-white py-14 text-graphite-950 md:py-24">
        <div className={cn(WRAP, "grid gap-10 lg:grid-cols-12 lg:gap-14")}>
          <Reveal from="left" className="lg:col-span-5">
            <Tag className="text-steel">Foundational doctrine</Tag>
            <h2 className={cn(H2, "mt-5")}>Our engineering philosophy</h2>
            <p className="mt-5 text-[14px] leading-relaxed text-graphite-600">
              In modern mission-critical infrastructure, margin for error has diminished to zero. We maintain an uncompromising engineering ethos that rejects commercial expediency in favor of mathematical proof and empirical truth.
            </p>
            <div className="mt-6 rounded-sm border-l-2 border-brand bg-mist-blue/60 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">Unrestricted authority</p>
              <p className="mt-2 text-[13px] leading-relaxed text-graphite-600">
                INFOELEX maintains zero commission or affiliate ties with equipment manufacturers, switchgear vendors or software developers. Our engineers report only to the integrity of the model.
              </p>
            </div>
          </Reveal>
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {DOCTRINES.map((d, i) => (
              <Reveal as="li" key={d.title} from={fromCol(i, 2)} delay={(i % 2) * 0.07} className="flex flex-col card-lift rounded-md border border-hairline bg-mist-blue/60 p-5">
                <div className="flex items-start justify-between gap-3">
                  <Tag className="text-brand">{d.tag}</Tag>
                  <d.icon className="h-4 w-4 shrink-0 text-steel" aria-hidden />
                </div>
                <h3 className="font-display mt-4 text-lg font-bold uppercase tracking-tight">{d.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-graphite-600">{d.copy}</p>
                <p className="mt-auto flex justify-between gap-3 border-t border-hairline pt-4 text-[11px] font-semibold uppercase tracking-[0.1em]">
                  <span className="text-steel">{d.foot[0]}</span>
                  <span className="text-right">{d.foot[1]}</span>
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Methodology */}
      <section className="bg-white pb-14 text-graphite-950 md:pb-24">
        <div className={cn(WRAP, "border-t border-hairline pt-14 md:pt-20")}>
          <Tag className="text-steel">Engineering lifecycle</Tag>
          <div className="mt-5 grid gap-5 md:grid-cols-2 md:items-end md:gap-16">
            <Reveal as="h2" className={H2}>
              The 5-stage verification methodology
            </Reveal>
            <p className="text-[14px] leading-relaxed text-graphite-600 md:max-w-md md:justify-self-end">
              A sequential, gated quality protocol designed to de-risk high-capacity capital energy projects at every engineering milestone.
            </p>
          </div>
          <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {STAGES.map((s, i) => {
              const last = i === STAGES.length - 1;
              return (
                <Reveal as="li" key={s.n} from={fromCol(i, 5)} delay={i * 0.05} className={cn("flex flex-col rounded-md border p-5", last ? "border-graphite-950 bg-[#232a32] text-paper" : "border-hairline bg-mist-blue/60")}>
                  <div className="flex items-start justify-between">
                    <span className="font-display text-3xl font-bold leading-none text-brand">{s.n}</span>
                    <span className={cn("rounded-sm px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.12em]", last ? "bg-brand text-white" : "bg-white text-steel")}>{s.gate}</span>
                  </div>
                  <p className={cn("mt-4 text-[11px] font-semibold uppercase tracking-[0.16em]", last ? "text-paper/50" : "text-steel")}>Stage {s.n}</p>
                  <h3 className="font-display mt-1 text-lg font-bold uppercase tracking-tight">{s.title}</h3>
                  <p className={cn("mt-2 text-[13px] leading-relaxed", last ? "text-paper/65" : "text-graphite-600")}>{s.copy}</p>
                  <ul className={cn("mt-auto space-y-1 border-t pt-3 text-[11px] font-semibold", last ? "border-white/10 text-paper/80" : "border-hairline text-graphite-800")}>
                    {s.tags.map((t) => (
                      <li key={t} className="flex gap-2"><span aria-hidden className="mt-[0.5em] h-1 w-1 shrink-0 bg-brand" />{t}</li>
                    ))}
                  </ul>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Peer review + standards */}
      <section className="bg-white pb-14 text-graphite-950 md:pb-24">
        <div className={cn(WRAP, "grid gap-10 border-t border-hairline pt-14 md:pt-20 lg:grid-cols-12 lg:gap-14")}>
          <Reveal from="left" className="lg:col-span-5">
            <Tag className="text-steel">Quality assurance directive</Tag>
            <h2 className={cn(H2, "mt-5")}>Peer-review protocol &amp; standards adherence</h2>
            <p className="mt-5 text-[14px] leading-relaxed text-graphite-600">
              Calculations never leave INFOELEX as unverified individual output. Every model, calculation worksheet, single-line diagram, and protective device setting is subjected to our strict three-tier verification protocol before final release.
            </p>
            <div className="mt-6 card-lift rounded-md border border-hairline bg-mist-blue/60 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-steel">Three-tier sign-off mandate</p>
              <ul className="mt-3 divide-y divide-hairline text-[13px]">
                {TIERS.map(([k, v]) => (
                  <li key={k} className="flex justify-between gap-4 py-2.5">
                    <span>{k}</span>
                    <span className="text-right font-bold">{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal from="right" delay={0.1} className="lg:col-span-7">
            <div className="rounded-md border border-hairline">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline bg-canvas px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-steel">
                <span>Standards authority alignment</span>
                <span>Registry ref: QMS-9001-2025</span>
              </div>
              <ul className="divide-y divide-hairline">
                {STANDARDS.map((s) => (
                  <li key={s.name} className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                    <div>
                      <p className="text-[14px] font-bold">{s.name}</p>
                      <p className="mt-1 text-[13px] leading-relaxed text-graphite-600">{s.copy}</p>
                    </div>
                    <span className="w-fit shrink-0 rounded-sm bg-mist-blue px-2 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-graphite-800">{s.badge}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Simulation infrastructure */}
      <section className="bg-white pb-14 text-graphite-950 md:pb-24">
        <div className={cn(WRAP, "border-t border-hairline pt-14 md:pt-20")}>
          <Tag className="text-steel">Computational footprint</Tag>
          <div className="mt-5 grid gap-5 md:grid-cols-2 md:items-end md:gap-16">
            <Reveal as="h2" className={H2}>
              Simulation infrastructure
            </Reveal>
            <p className="text-[14px] leading-relaxed text-graphite-600 md:max-w-md md:justify-self-end">
              Industry-grade numerical modeling suites operated by dedicated simulation engineers to preempt hardware failures before installation.
            </p>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TOOLS.map((t, i) => (
              <Reveal as="li" key={t.title} from={fromCol(i, 3)} delay={(i % 3) * 0.06} className="flex flex-col card-lift rounded-md border border-hairline bg-mist-blue/60 p-5">
                <div className="flex items-center justify-between gap-3 text-[11px] font-semibold uppercase tracking-[0.14em]">
                  <span className="text-brand">{t.tag}</span>
                  <span className="text-steel">{t.sub}</span>
                </div>
                <h3 className="font-display mt-3 text-lg font-bold uppercase tracking-tight">{t.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-graphite-600">{t.copy}</p>
                <p className="mt-auto flex justify-between gap-3 border-t border-hairline pt-3 text-[11px] font-semibold">
                  <span className="text-steel">{t.row[0]}</span>
                  <span className="text-right">{t.row[1]}</span>
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Closing */}
      <section className="bg-[#232a32] py-16 text-paper md:py-24">
        <div className={cn(WRAP, "grid gap-10 lg:grid-cols-12 lg:items-center")}>
          <Reveal from="left" className="lg:col-span-7">
            <Tag className="text-brand">Accountability without exception</Tag>
            <h2 className="font-display mt-5 text-[clamp(2rem,1.3rem+3.4vw,3.5rem)] font-bold uppercase leading-[1.05] tracking-[-0.03em] text-balance">
              Commitment to verified results.
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-paper/70">
              We stand behind our deliverables with full chartered liability. Every project engineered through the INFOELEX Verification Methodology delivers zero unprogrammed operational downtime upon energization.
            </p>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-paper/55">
              {["Fully Indemnified Engineering", "Deterministic Protection Models", "Full Regulatory Sanction"].map((t) => (
                <li key={t} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-brand" /> {t}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal from="right" delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <div className="rounded-md border border-white/10 bg-white/5 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-paper/50">Schedule engineering review</p>
              <p className="mt-2 text-[13px] leading-relaxed text-paper/65">Engage our Senior Technical Principals for an independent audit of your high-voltage design or protection strategy.</p>
              <Link href="/contact" className="mt-4 inline-flex w-full items-center justify-between gap-3 rounded-sm bg-brand px-5 py-3.5 text-[12px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-brand-dim focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                Initiate consultation <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
