import Link from "next/link";
import { ArrowUpRight, BatteryCharging, Cpu, Factory, Gauge, Network, Radio, Repeat, Server, ShieldAlert, Thermometer, Zap, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/home/reveal";
import { fromCol } from "@/components/home/motion";
import { ParallaxImage } from "./primitives";
import { ScrollProgress } from "./scroll-progress";
import { cn } from "@/lib/utils";

const WRAP = "mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10";
const H2 = "font-display text-[clamp(1.75rem,1.35rem+1.7vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.025em] text-balance";

const HERO_STATS = [
  { label: "Topology standard", value: "N+1 / 2N / 3N/2", note: "Distributed redundant architectures" },
  { label: "Fault tolerance", value: "Concurrent", note: "100% maintainable without shutdown" },
  { label: "Static switching", value: "< 2.0 ms", note: "Dual-cycle transfer devices (STS)" },
  { label: "Target PUE metric", value: "≤ 1.15 Design", note: "Highly optimized cooling and distribution" },
];

const FACILITIES: { tag: string; title: string; copy: string; foot: string; icon: LucideIcon }[] = [
  { tag: "01 / Hyperscale", title: "Hyperscale AI & Cloud Campuses", icon: Server, copy: "Engineering high-density rack architectures for sustained GPU and training workloads, from medium-voltage intake to the rack.", foot: "Power Density & Scalability" },
  { tag: "02 / Fabrication", title: "Semiconductor Giga Fabs", icon: Factory, copy: "Voltage-sag immunity design, ride-through systems and ultra-clean power for continuous wafer processing lines.", foot: "Sag Immunity & Ride-through" },
  { tag: "03 / Command & Control", title: "Mission Command & ATC Enclaves", icon: Radio, copy: "Hardened, fully redundant power systems for defense, air traffic and emergency operations that cannot go dark.", foot: "Resilient Mission Continuity" },
  { tag: "04 / Transactional", title: "Tier IV Tiered Exchanges", icon: Network, copy: "Fault-tolerant power for financial exchanges and carrier hubs, built to Tier IV concurrent maintainability.", foot: "Tier IV Fault Tolerance" },
];

const ARCHITECTURES = [
  { title: "2N / 2(N+1) Concurrent", badge: "Tier IV", copy: "Complete dual-system isolation. Every critical component is duplicated, so any single failure or maintenance event leaves the load fully protected." },
  { title: "Distributed Redundant (3N/2, 4N/3)", badge: "High Efficiency", copy: "Load is shared across multiple active paths. Redundancy is achieved at a lower capital cost while maintaining fault tolerance." },
  { title: "Block Redundant / Reserve Bus", badge: "Hyperscale Grade", copy: "Dedicated reserve capacity backs every block of UPS modules. A simple, scalable approach to rapid deployment of large halls." },
  { title: "Medium Voltage (11.8kV - 33kV)", badge: "Substation Level", copy: "Utility-level redundant ring and radial distribution with automated transfer, protected by coordinated protection schemes." },
];

const PILLARS: { tag: string; title: string; copy: string; foot: [string, string]; icon: LucideIcon }[] = [
  { tag: "Pillar 01 / Generation", title: "Autonomous Black-Start & Paralleling", icon: Zap, copy: "Medium-voltage diesel and dual-fuel generators synchronize within seconds, with automated load acceptance and paralleling logic.", foot: ["Synchronize Speed", "< 10s Window"] },
  { tag: "Pillar 02 / Transfer", title: "Static Transfer Switches (STS)", icon: Repeat, copy: "Silicon-controlled transfer switches move load between independent sources with no perceptible interruption to sensitive equipment.", foot: ["Transfer Time", "< 2.0ms"] },
  { tag: "Pillar 03 / Storage", title: "Advanced UPS Architectures", icon: BatteryCharging, copy: "High-efficiency double-conversion systems with lithium-ion or VRLA storage, designed for ride-through and clean transitions.", foot: ["Double Conversion", "97%+ Efficiency"] },
  { tag: "Pillar 04 / Thermodynamics", title: "CFD Thermal & PUE Optimization", icon: Thermometer, copy: "Full computational fluid dynamics modeling of airflow, containment and cooling to minimize power usage effectiveness.", foot: ["Thermal Verified", "CFD Validated"] },
];

const TESTS = [
  { n: "01", title: "Factory & Site Acceptance Witnessing", copy: "Independent inspection of manufacturing quality for switchgear, generators, transformers and UPS equipment before shipping.", meta: "FAT / SAT" },
  { n: "02", title: "Hardware-in-the-Loop Fault Simulation", copy: "Real-time digital simulators connected to actual controllers to expose hidden failure modes before energization.", meta: "RTDS / HIL" },
  { n: "03", title: "Load Bank Thermal Saturation Testing", copy: "Sustained full-load runs verify thermal margins, breaker coordination and cooling behavior under worst-case conditions.", meta: "IST / Level 5" },
  { n: "04", title: "Integrated System Test (Black Building Pull)", copy: "The definitive critical facilities proof: utility power is removed from the entire building and every system must hold.", meta: "Level 5 / IST" },
];

const STAGES = [
  { stage: "Stage 01", title: "Steady-State & Transient Modeling", copy: "We execute dynamic transient model studies, including load flow, short-circuit and protection analysis, to find weak links early.", foot: "Software Suite", tool: "ETAP • PSCAD • ANSYS Fluent" },
  { stage: "Stage 02", title: "Root Cause Failure Mode Analysis (FMEA)", copy: "Systematic decomposition of every subsystem, every connection and every control path, ranking fault scenarios by consequence.", foot: "Standards", tool: "IEC 60812 • Uptime Institute Tier IV" },
  { stage: "Stage 03", title: "Live Micro-Grade & Spins Simulation", copy: "Engineering real-time Hardware Testing (EPHIT) hardware-in-the-loop validation of redundant control and switching sequences.", foot: "Telemetry Cycle", tool: "Sub-Cycle Waveform Disturbance" },
];

function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] sm:text-[12px]", className)}>{children}</span>;
}

function SectionLabel({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <Tag className={dark ? "text-paper/60" : "text-steel"}>
      <span aria-hidden className="h-px w-8 bg-current opacity-40" /> {children}
    </Tag>
  );
}

/** Simplified dual-feed (2N) single-line diagram, drawn in SVG so it scales to any width. */
function TopologyDiagram() {
  const line = "stroke-white/40";
  const box = "fill-[#1b2027] stroke-white/25";
  return (
    <svg viewBox="0 0 520 300" role="img" aria-label="Single-line diagram of a 2N dual-feed power topology with two utility feeds, generators, UPS systems and a dual-corded critical load" className="h-auto w-full">
      <text x="14" y="22" className="fill-white/50 text-[9px] font-semibold tracking-[0.14em]">2N CONCURRENT SINGLE LINE DIAGRAM (SLD)</text>
      {[0, 1].map((i) => {
        const x = 90 + i * 240;
        return (
          <g key={i}>
            <rect x={x - 45} y="42" width="90" height="26" rx="2" className={box} />
            <text x={x} y="59" textAnchor="middle" className="fill-white/80 text-[9px] font-bold">{i ? "UTILITY B" : "UTILITY A"}</text>
            <path d={`M${x} 68V96`} className={line} fill="none" />
            <rect x={x - 45} y="96" width="90" height="26" rx="2" className={box} />
            <text x={x} y="113" textAnchor="middle" className="fill-white/80 text-[9px] font-bold">{i ? "GEN B" : "GEN A"}</text>
            <path d={`M${x} 122V150`} className={line} fill="none" />
            <rect x={x - 45} y="150" width="90" height="26" rx="2" className="fill-brand/20 stroke-brand" />
            <text x={x} y="167" textAnchor="middle" className="fill-white text-[9px] font-bold">{i ? "UPS B" : "UPS A"}</text>
            <path d={`M${x} 176V206H${260}`} className="stroke-brand" fill="none" />
          </g>
        );
      })}
      <path d="M260 206V224" className="stroke-brand" fill="none" />
      <rect x="150" y="224" width="220" height="30" rx="2" className="fill-brand stroke-brand" />
      <text x="260" y="243" textAnchor="middle" className="fill-white text-[9px] font-bold tracking-[0.04em]">DUAL-CORDED CRITICAL LOAD</text>
      <g className="fill-white/50 text-[8px] font-semibold tracking-[0.1em]">
        <text x="14" y="288">● AUTONOMOUS PATH</text>
        <text x="160" y="288">— REDUNDANT PATH</text>
      </g>
    </svg>
  );
}

/** Critical Power: high-availability engineering layout with dark and light bands. */
export function CriticalPower() {
  return (
    <>
      <ScrollProgress />
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[#1b2027] text-paper">
        <ParallaxImage src="/photos/critical-power-hero.png" alt="" priority sizes="100vw" className="absolute inset-0 -z-20" imgClassName="object-center opacity-70" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-[#1b2027]/70 via-[#1b2027]/60 to-[#1b2027]" />
        <div className={cn(WRAP, "pb-12 pt-28 md:pb-16 md:pt-32")}>
          <div className="flex flex-col gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-paper/70 sm:flex-row sm:items-center sm:justify-between sm:text-[12px]">
            <span className="w-fit rounded-sm border border-white/15 bg-white/5 px-3 py-1.5">DSG_SPEC // Critical Infrastructure Group</span>
            <span className="hidden gap-4 sm:flex">
              <span>Latency budget: ≤ 2.0ms</span>
              <span>Tier III capable</span>
              <span>ISO 9001 sealed</span>
            </span>
          </div>

          <Reveal className="mt-16 max-w-3xl sm:mt-24 md:mt-28">
            <Tag className="rounded-sm border border-brand/50 bg-brand/15 px-3 py-1.5 text-[#ff8f84]">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" /> High-Availability Power Engineering
            </Tag>
            <h1 className="font-display mt-5 text-[clamp(2.25rem,1.5rem+4vw,4.25rem)] font-bold leading-[1.04] tracking-[-0.03em] text-balance">
              Reliability Is Not Optional. <span className="text-brand">It&apos;s Essential.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-paper/75 md:text-base">
              Specialist engineering solutions for hyperscale data centres, semiconductor fabrication, and mission-critical facilities where power interruption equals catastrophic systemic failure.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link href="#topologies" className="inline-flex items-center gap-3 rounded-sm bg-brand px-5 py-3 text-[12px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-brand-dim">
                Explore architectures <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
              <span className="text-[12px] text-paper/50">Verified across a 100%+ global deployment</span>
            </div>
          </Reveal>

          <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-white/10 pt-6 lg:grid-cols-4">
            {HERO_STATS.map((s) => (
              <div key={s.label}>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-paper/50">{s.label}</dt>
                <dd className="mt-1.5 text-base font-bold tracking-tight sm:text-xl">{s.value}</dd>
                <dd className="mt-1 text-[12px] text-paper/50">{s.note}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Liability */}
      <section className="bg-white py-14 text-graphite-950 md:py-24">
        <div className={WRAP}>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal from="left" className="lg:col-span-5">
              <SectionLabel>Domain history | Zero margin for failure</SectionLabel>
              <h2 className={cn(H2, "mt-6")}>Where Seconds Mean Billions in Systemic Liability.</h2>
              <p className="mt-5 text-[15px] leading-relaxed text-graphite-600">
                Modern digital civilization rests on continuous megawatt-scale power. Our critical power practice orchestrates the energy systems underpinning world-scale computation, defense and the confidential, mission-critical operations of tomorrow.
              </p>
              <figure className="mt-7 card-lift rounded-md border border-hairline bg-canvas p-5">
                <blockquote className="border-l-2 border-brand pl-4 text-[14px] italic leading-relaxed text-graphite-800">
                  &ldquo;In high-density compute environments, power quality is computational velocity. Voltage sags measured in microseconds can corrupt transactional blocks and damage multi-billion-dollar silicon.&rdquo;
                </blockquote>
                <figcaption className="mt-4 flex items-end justify-between gap-3 text-[12px]">
                  <span>
                    <span className="block font-bold">Dr. Aris Thorne</span>
                    <span className="text-steel">Director of Critical Facilities &amp; Resilience</span>
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">Infoelex Labs</span>
                </figcaption>
              </figure>
            </Reveal>

            <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              {FACILITIES.map((f, i) => (
                <Reveal as="li" key={f.title} from={fromCol(i, 2)} delay={(i % 2) * 0.07} className="flex flex-col card-lift rounded-md border border-hairline bg-canvas p-5">
                  <div className="flex items-start justify-between gap-3">
                    <Tag className="text-brand">{f.tag}</Tag>
                    <f.icon className="h-4 w-4 shrink-0 text-steel" aria-hidden />
                  </div>
                  <h3 className="font-display mt-4 text-lg font-bold tracking-tight">{f.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-graphite-600">{f.copy}</p>
                  <p className="mt-auto border-t border-hairline pt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-steel">{f.foot}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Topologies */}
      <section id="topologies" className="scroll-mt-20 bg-mist-blue py-14 text-graphite-950 md:py-24">
        <div className={WRAP}>
          <SectionLabel>System configurations</SectionLabel>
          <div className="mt-6 grid gap-5 md:grid-cols-2 md:items-end md:gap-16">
            <Reveal as="h2" className={H2}>
              Topology Topographies
            </Reveal>
            <p className="text-[14px] leading-relaxed text-graphite-600 md:max-w-md md:justify-self-end">
              INFOELEX designs and validates custom electrical distribution architectures tuned to each client&apos;s risk profile, load characteristics and site constraints.
            </p>
          </div>

          <Reveal from="scale" className="mt-10 grid overflow-hidden rounded-md bg-[#232a32] text-paper lg:grid-cols-[1.1fr_1fr]">
            <div className="border-b border-white/10 p-5 lg:border-b-0 lg:border-r lg:p-8">
              <TopologyDiagram />
            </div>
            <div className="p-5 lg:p-8">
              <Tag className="text-brand">Evaluated architectures</Tag>
              <ul className="mt-5 space-y-5">
                {ARCHITECTURES.map((a) => (
                  <li key={a.title} className="border-b border-white/10 pb-5 last:border-0 last:pb-0">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-[14px] font-bold">{a.title}</h3>
                      <span className="rounded-sm bg-white/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-paper/70">{a.badge}</span>
                    </div>
                    <p className="mt-2 text-[13px] leading-relaxed text-paper/60">{a.copy}</p>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="mt-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-brand hover:text-white">
                Request topology trade-off study matrix <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-white py-14 text-graphite-950 md:py-24">
        <div className={WRAP}>
          <SectionLabel>Engineered pillars</SectionLabel>
          <Reveal className="mt-6 max-w-2xl">
            <h2 className={H2}>Four Pillars of Unyielding Resilience</h2>
            <p className="mt-4 text-[14px] leading-relaxed text-graphite-600">
              True uptime is achieved through systematic electro-magnetic analysis, fault-transient coordination, and autonomous physical subsystems operating in synchronized unison.
            </p>
          </Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p, i) => (
              <Reveal as="li" key={p.title} from={fromCol(i, 4)} delay={(i % 4) * 0.06} className="flex flex-col card-lift rounded-md border border-hairline bg-mist-blue/60 p-5">
                <div className="flex items-start justify-between gap-3">
                  <Tag className="text-brand">{p.tag}</Tag>
                  <p.icon className="h-4 w-4 shrink-0 text-steel" aria-hidden />
                </div>
                <h3 className="font-display mt-4 text-lg font-bold tracking-tight">{p.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-graphite-600">{p.copy}</p>
                <p className="mt-auto flex justify-between gap-3 border-t border-hairline pt-4 text-[11px] font-semibold uppercase tracking-[0.1em]">
                  <span className="text-steel">{p.foot[0]}</span>
                  <span>{p.foot[1]}</span>
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Testing & commissioning */}
      <section className="bg-canvas py-14 text-graphite-950 md:py-24">
        <div className={cn(WRAP, "grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-14")}>
          <Reveal from="left" className="lg:col-span-5">
            <figure className="relative aspect-[4/5] card-lift overflow-hidden rounded-md ring-1 ring-graphite-950/10">
              <ParallaxImage src="/photos/critical-power-commissioning.png" alt="Engineer with a tablet beside load banks and generator paralleling switchgear during an integrated system test" sizes="(min-width: 1024px) 480px, 100vw" className="absolute inset-0" imgClassName="object-[70%_center]" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-4 pt-12 text-[11px] font-semibold uppercase tracking-[0.16em] text-white sm:text-[11px]">
                Protocol Level 5 Integrated System Commissioning Test
              </figcaption>
            </figure>
            <p className="mt-4 text-[13px] leading-relaxed text-steel">
              INFOELEX site engineers personally witness full-load and fault-injection tests from the first energization through to final sign-off.
            </p>
          </Reveal>
          <div className="lg:col-span-7">
            <Reveal>
              <SectionLabel>Testing &amp; commissioning rigor</SectionLabel>
              <h2 className={cn(H2, "mt-6")}>We Never Assume Operation. We Force Systemic Stress.</h2>
              <p className="mt-4 text-[14px] leading-relaxed text-graphite-600">
                A design is only as reliable as its first physical execution under stress. Our commissioning teams exercise failure modes on the real equipment, from factory test to black building pull.
              </p>
            </Reveal>
            <ol className="mt-8 divide-y divide-hairline border-y border-hairline">
              {TESTS.map((t, i) => (
                <Reveal as="li" key={t.n} from="left" delay={i * 0.05} className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 py-5 sm:grid-cols-[auto_1fr_auto]">
                  <span className="font-display text-sm font-bold tabular-nums text-brand">{t.n}</span>
                  <div>
                    <h3 className="text-sm font-bold">{t.title}</h3>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-graphite-600">{t.copy}</p>
                  </div>
                  <span className="col-start-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-steel sm:col-start-3 sm:text-right">{t.meta}</span>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* SPOF elimination */}
      <section className="bg-mist-blue py-14 text-graphite-950 md:py-24">
        <div className={WRAP}>
          <SectionLabel>Methodical scope</SectionLabel>
          <Reveal className="mt-6 max-w-3xl">
            <h2 className={H2}>Single Point of Failure (SPOF) Elimination</h2>
            <p className="mt-4 text-[14px] leading-relaxed text-graphite-600">
              From utility substation interconnection to the individual server power supply card, INFOELEX applies a ruthless computational audit process.
            </p>
          </Reveal>
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {STAGES.map((s, i) => (
              <Reveal as="li" key={s.stage} from={fromCol(i, 3)} delay={i * 0.07} className="flex flex-col card-lift rounded-md border border-hairline bg-white p-5 lg:p-6">
                <Tag className="text-brand">{s.stage}</Tag>
                <h3 className="font-display mt-4 text-lg font-bold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-graphite-600">{s.copy}</p>
                <div className="mt-auto border-t border-hairline pt-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-steel">{s.foot}</p>
                  <p className="mt-1 text-[12px] font-bold">{s.tool}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Closing consult */}
      <section className="bg-[#232a32] py-16 text-paper md:py-24">
        <div className={cn(WRAP, "grid gap-10 lg:grid-cols-12 lg:items-center")}>
          <Reveal from="left" className="lg:col-span-7">
            <Tag className="rounded-sm border border-brand/50 bg-brand/15 px-3 py-1.5 text-[#ff8f84]">
              <ShieldAlert className="h-3 w-3" aria-hidden /> Consultation &amp; Architectural Advisory
            </Tag>
            <h2 className="font-display mt-5 text-[clamp(2rem,1.3rem+3.4vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-balance">
              Let&apos;s Discuss Your Critical Power Requirements.
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-paper/70">
              Whether you are planning a 100MW AI campus, validating a mission-critical utility interconnect, or performing an urgent concurrent maintainability audit on an existing white space, our chartered consultants are ready to assist.
            </p>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-paper/55">
              {[
                { icon: Gauge, t: "Direct access to principal engineers" },
                { icon: Cpu, t: "NDA-ready engagement" },
              ].map((c) => (
                <li key={c.t} className="flex items-center gap-2">
                  <c.icon className="h-3.5 w-3.5 text-brand" aria-hidden /> {c.t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal from="right" delay={0.1} className="flex flex-col gap-3 lg:col-span-4 lg:col-start-9">
            <Link href="/contact" className="inline-flex items-center justify-between gap-3 rounded-sm bg-brand px-6 py-4 text-[13px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-brand-dim focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              Talk to engineering team <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
            <p className="text-[12px] text-paper/50">Response window: 24 business hours</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
