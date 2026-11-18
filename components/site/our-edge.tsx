import Link from "next/link";
import { Activity, ArrowUpRight, Cpu, Crosshair, Gauge, Layers, ShieldCheck, Zap, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/home/reveal";
import { fromCol } from "@/components/home/motion";
import { ParallaxImage } from "./primitives";
import { ScrollProgress } from "./scroll-progress";
import { CountUp } from "./count-up";
import { cn } from "@/lib/utils";

const HERO_STATS = [
  { label: "Grid stability index", value: "99.999% Sync" },
  { label: "Operational capacity", value: "24.8 GW Validated" },
  { label: "Standards alignment", value: "IEEE / IEC / CIGRE" },
];

const METRICS = [
  { n: "24+", label: "Gigawatts Analyzed", copy: "Bulk grid interconnected capacity studied across North America and EMEA transmission networks." },
  { n: "99.999%", label: "Availability Threshold", copy: "Mission-critical system engineering for high-density compute, emergency hospital nodes and defense infrastructure." },
  { n: "18+", label: "Global Jurisdictions", copy: "Complete regulatory, environmental and legal grid code compliance across multiple jurisdictions." },
  { n: "40+", label: "Chartered Principals", copy: "Lead PhDs, C.Eng fellows and senior IEEE working group members directly authoring documentation." },
];

const HUBS = [
  {
    city: "London, UK",
    badge: "Primary HQ",
    role: "Great Engineering Center",
    copy: "Transmission interconnection, HVDC commissioning and ENTSO-E compliance framework governance.",
    rows: [
      ["Grid Codes", "NESO / ENTSO-E / G99"],
      ["Direct Laboratory", "Hardware-in-the-Loop Lab"],
      ["Core Expertise", "HVDC & Subsynchronous"],
    ],
  },
  {
    city: "Houston, USA",
    badge: "Americas Hub",
    role: "Americas Engineering Center",
    copy: "NERC CIP compliance verification, ERCOT market stability reviews and grid-tied data center power.",
    rows: [
      ["Grid Codes", "NERC / FERC / ERCOT"],
      ["Direct Laboratory", "Hardware-in-the-Loop Lab"],
      ["Core Expertise", "Hyperscale Datacenter Design"],
    ],
  },
  {
    city: "Singapore",
    badge: "APAC",
    role: "Asia-Pacific Central",
    copy: "Subsea power cables, island electrical architectures, cross-regional dynamics and microgrid stability design.",
    rows: [
      ["Grid Codes", "EMA Transmission Code, IEC"],
      ["Direct Laboratory", "Thermal Cable Testing"],
      ["Core Expertise", "Island Grids & Subsea HV"],
    ],
  },
];

const PRINCIPLES: { tag: string; title: string; copy: string; stack: string; icon: LucideIcon }[] = [
  { tag: "01 / First Principles", title: "Technical Mastery", icon: Cpu, stack: "PSCAD • DIgSILENT • MATLAB", copy: "We resolve power-based issues through fundamental electromagnetic physics, high-fidelity numerical evaluation and transient dynamics, never relying on generalized models." },
  { tag: "02 / Sub-Millisecond", title: "Engineering Precision", icon: Crosshair, stack: "IEC 61850 • LEGACY TELEMETRY • SYNCHROPHASOR", copy: "Sub-millisecond protection discrimination and selective fault clearing. We calibrate relay settings to eliminate false tripping while guaranteeing absolute asset protection." },
  { tag: "03 / Peer Audited", title: "Quality Assurance", icon: ShieldCheck, stack: "ISO 9001:2015 • PEER AUDIT TRAILS", copy: "Every deliverable passes through a mandatory dual-blind peer review. Independent chartered directors audit all line constants, transmission saturation curves and design reasoning." },
  { tag: "04 / Zero SPOF", title: "Absolute Reliability", icon: Zap, stack: "7,100 BENCHMARKS • N+2 ARCHITECTURES", copy: "Zero single-point-of-failure topologies. We engineer redundant N+2 critical power configurations, isolated bus arrangements and optimized breaker failure schemes." },
  { tag: "05 / Operational Immersion", title: "Deep Client Collaboration", icon: Layers, stack: "CO-LOCATED PRINCIPALS • PLUG-IN INTEGRATION", copy: "We seamlessly integrate into our clients' dispatch control rooms and infrastructure teams, acting as their in-house technical defense during high-stakes regulatory arbitrations." },
  { tag: "06 / Hardware in the Loop", title: "Verified Computational Results", icon: Gauge, stack: "RTDS SIMULATION • DIGITAL TWINS", copy: "We close the loop between software assumptions and real hardware through physical controller injection testing, objectively validating all behavioral dynamics." },
];

function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] sm:text-[12px]", className)}>{children}</span>;
}

function SectionLabel({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <Tag className={dark ? "text-paper/60" : "text-steel"}>{children}</Tag>;
}

const H2 = "font-display text-[clamp(1.75rem,1.35rem+1.7vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.025em] text-balance";
const WRAP = "mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10";

/** Our Edge: technical-authority layout. Dark hero and registry bands alternate with light content sections. */
export function OurEdge() {
  return (
    <>
      <ScrollProgress />
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[#1b2027] text-paper">
        <ParallaxImage src="/photos/edge-hero.webp" alt="" priority sizes="100vw" className="absolute inset-0 -z-20" imgClassName="object-[70%_center] opacity-90" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-[#1b2027]/55 via-[#1b2027]/35 to-[#1b2027]" />
        <div className={cn(WRAP, "pb-12 pt-28 md:pb-16 md:pt-32")}>
          <div className="flex flex-col gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-paper/70 sm:flex-row sm:items-center sm:justify-between sm:text-[12px]">
            <span className="w-fit rounded-sm border border-white/15 bg-white/5 px-3 py-1.5">Home | Our Edge</span>
            <span className="hidden sm:inline">Ref: SR-GR-OC-2025 &nbsp;|&nbsp; Lat 51.5074° N / Lng 0.1278° W</span>
          </div>

          <Reveal className="mt-16 max-w-3xl sm:mt-24 md:mt-32">
            <Tag className="rounded-sm border border-brand/50 bg-brand/15 px-3 py-1.5 text-[#ff8f84]">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" /> Institutional Technical Authority
            </Tag>
            <h1 className="font-display mt-5 text-[clamp(2.25rem,1.5rem+4vw,4.25rem)] font-bold leading-[1.04] tracking-[-0.03em] text-balance">
              Engineering Excellence Built on Experience.
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-paper/75 md:text-base">
              Combining engineering knowledge, technical insight and a commitment to quality to address complex power and infrastructure challenges across global grids.
            </p>
          </Reveal>

          <dl className="mt-12 grid gap-6 border-t border-white/10 pt-6 sm:grid-cols-2 lg:grid-cols-[repeat(3,1fr)_auto] lg:items-end">
            {HERO_STATS.map((s) => (
              <div key={s.label}>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-paper/50">{s.label}</dt>
                <dd className="mt-1.5 text-lg font-bold tracking-tight sm:text-xl">{s.value}</dd>
              </div>
            ))}
            <div className="sm:col-span-2 lg:col-span-1">
              <span className="inline-flex items-center gap-2 rounded-sm bg-brand px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" /> Telemetry stream live
              </span>
            </div>
          </dl>
        </div>
      </section>

      {/* 01 Identity & Mandate */}
      <section className="bg-white py-14 text-graphite-950 md:py-24">
        <div className={WRAP}>
          <SectionLabel>
            <span aria-hidden className="h-px w-8 bg-current opacity-40" /> Section 01 | Identity &amp; Mandate
          </SectionLabel>
          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal from="left" className="lg:col-span-5">
              <h2 className={H2}>Independent technical authority engineered for sovereign scale.</h2>
              <p className="mt-6 text-[15px] font-semibold leading-relaxed text-graphite-800">
                The modern power grid operates on razor-thin deterministic thresholds.
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-graphite-600">
                We bridge theoretical electromagnetics with real-world infrastructure delivery. As brokers of no generic templates, our chartered principals engage directly at the physical and mathematical boundaries of high-voltage transmission, generation interconnection and large-scale loads.
              </p>
              <div className="mt-8 flex items-start gap-3 border-t border-hairline pt-5">
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-sm bg-brand/10 text-brand">
                  <ShieldCheck className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-bold">Direct Fiduciary Autonomy</p>
                  <p className="mt-1 text-[14px] leading-relaxed text-steel">Zero conflict capture. Objective engineering judgment and rigorous code compliance.</p>
                </div>
              </div>
            </Reveal>

            <Reveal from="right" delay={0.1} className="lg:col-span-7">
              <figure className="relative aspect-[16/10] card-lift overflow-hidden rounded-md ring-1 ring-graphite-950/10">
                <ParallaxImage src="/photos/edge-control-room.webp" alt="Two power system engineers reviewing waveforms and a single-line diagram on a wall of monitors" sizes="(min-width: 1024px) 720px, 100vw" className="absolute inset-0" imgClassName="object-center" />
                <figcaption className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-2 bg-gradient-to-t from-black/75 to-transparent px-4 pb-3 pt-10 text-[11px] font-semibold uppercase tracking-[0.16em] text-white sm:text-[11px]">
                  <span>Real-Time Digital Simulator (RTDS) Facility | London HQ</span>
                  <span className="text-white/70">INFY-BY | Pegasus</span>
                </figcaption>
              </figure>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {[
                  { icon: Activity, title: "Transient Dynamics", copy: "Rigorous high-fidelity EMT analysis protecting synchronous and inverter-based assets against switching and fault transients." },
                  { icon: Layers, title: "Critical Topologies", copy: "Fault-tolerant electrical architecture constructed for zero unplanned downtime: utility substations, data centers and hospitals." },
                ].map((c) => (
                  <div key={c.title} className="card-lift rounded-md border border-hairline bg-canvas p-5">
                    <c.icon className="h-4 w-4 text-brand" aria-hidden />
                    <p className="mt-3 text-sm font-bold">{c.title}</p>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-graphite-600">{c.copy}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 02 Performance Registry */}
      <section className="bg-[#232a32] py-14 text-paper md:py-24">
        <div className={WRAP}>
          <SectionLabel dark>
            <span aria-hidden className="h-px w-8 bg-current opacity-40" /> Section 02 | Performance Registry
          </SectionLabel>
          <div className="mt-6 flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-16">
            <Reveal as="h2" className={H2}>
              Verified Operational Impact.
            </Reveal>
            <p className="max-w-md text-[14px] leading-relaxed text-paper/65">
              InfoElex delivers audited and certified sovereign power grids, independent system operators and Fortune 50 utility organizations.
            </p>
          </div>

          <ul className="mt-10 grid gap-px overflow-hidden rounded-md bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {METRICS.map((m, i) => (
              <Reveal as="li" key={m.label} from={fromCol(i, 4)} delay={i * 0.06} className="bg-[#2a323b] p-6 transition-colors duration-300 hover:bg-[#323b46] lg:p-7">
                <Tag className="text-brand">
                  <span className="h-1.5 w-1.5 bg-brand" /> Metric 0{i + 1}
                </Tag>
                <p className="font-display mt-5 text-[clamp(2.25rem,1.8rem+1.6vw,3rem)] font-bold leading-none tracking-[-0.03em]"><CountUp value={m.n} /></p>
                <p className="mt-3 text-[14px] font-bold">{m.label}</p>
                <p className="mt-2 text-[13px] leading-relaxed text-paper/60">{m.copy}</p>
              </Reveal>
            ))}
          </ul>

          <div className="mt-px flex flex-col gap-2 rounded-b-md bg-[#1b2027] px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-paper/70 sm:flex-row sm:items-center sm:justify-between sm:text-[12px]">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
              <span>
                Real-Time Simulation Throughput: <span className="text-paper">36 µs timestep execution via FPGA clusters</span>
              </span>
            </span>
            <span className="text-brand">Audited under ISO 9001:2015 quality management</span>
          </div>
        </div>
      </section>

      {/* 03 Global Execution Footprint */}
      <section className="bg-mist-blue py-14 text-graphite-950 md:py-24">
        <div className={WRAP}>
          <SectionLabel>
            <span aria-hidden className="h-px w-8 bg-current opacity-40" /> Section 03 | Global Execution Footprint
          </SectionLabel>
          <div className="mt-6 grid gap-5 md:grid-cols-2 md:items-end md:gap-16">
            <Reveal as="h2" className={H2}>
              Global perspective. Seamless localized precision.
            </Reveal>
            <p className="text-[14px] leading-relaxed text-graphite-600 md:max-w-md md:justify-self-end">
              Infrastructure operates across differing regulatory concerns, extreme climatic environments and asynchronous market structures. INFOELEX synchronizes regional delivery through three high-fire engineering centers.
            </p>
          </div>

          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {HUBS.map((h, i) => (
              <Reveal as="li" key={h.city} from={fromCol(i, 3)} delay={i * 0.07} className="flex flex-col card-lift rounded-md border border-hairline bg-white p-5 lg:p-6">
                <div className="flex items-center justify-between gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-steel sm:text-[11px]">
                  <span>{h.role}</span>
                  <span className="shrink-0 rounded-sm bg-brand/10 px-2 py-1 text-brand">{h.badge}</span>
                </div>
                <h3 className="font-display mt-4 text-xl font-bold tracking-tight">{h.city}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-graphite-600">{h.copy}</p>
                <dl className="mt-5 space-y-2 border-t border-hairline pt-4 text-[12px]">
                  {h.rows.map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4">
                      <dt className="text-steel">{k}</dt>
                      <dd className="text-right font-semibold">{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-auto flex items-center gap-2 pt-5 text-[11px] font-bold uppercase tracking-[0.14em] text-brand">
                  Operational hub online <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand" />
                </p>
              </Reveal>
            ))}
          </ul>

          <Reveal from="scale" className="mt-6 overflow-hidden rounded-md bg-[#232a32] text-paper">
            <div className="flex flex-col gap-2 px-5 pt-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-bold">Global Project Telemetry &amp; Field Coordination</p>
                <p className="mt-1 text-[12px] text-paper/55">Continuous coordination centers validated by &amp; synchronized remote monitoring.</p>
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">Data sync: every 250ms</span>
            </div>
            <div
              className="relative mt-5 h-52 sm:h-64 lg:h-72"
              style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.14) 1px, transparent 1px)", backgroundSize: "14px 14px" }}
            >
              {[
                { label: "North America: 12.4 GW monitored", pos: "left-[4%] top-[16%]" },
                { label: "EMEA Hub: 5.6 GW active EMT", pos: "left-[30%] top-[50%] sm:left-[42%]" },
                { label: "APAC: 6.8 GW interconnection", pos: "right-[4%] bottom-[10%]" },
              ].map((p) => (
                <span key={p.label} className={cn("absolute max-w-[46%] rounded-sm border border-brand/60 bg-[#1b2027]/90 px-2 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] sm:max-w-none sm:px-3 sm:text-[11px]", p.pos)}>
                  <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-brand align-middle" />
                  {p.label}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 04 Systematic Differentiation */}
      <section className="bg-white py-14 text-graphite-950 md:py-24">
        <div className={WRAP}>
          <SectionLabel>
            <span aria-hidden className="h-px w-8 bg-current opacity-40" /> Section 04 | Systematic Differentiation
          </SectionLabel>
          <div className="mt-6 grid gap-5 md:grid-cols-2 md:items-end md:gap-16">
            <Reveal as="h2" className={H2}>
              Engineering for certainty in a volatile energy landscape.
            </Reveal>
            <p className="text-[14px] leading-relaxed text-graphite-600 md:max-w-md md:justify-self-end">
              Six foundational standards that govern every design review, calculation model and on-site commission handled by our teams.
            </p>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PRINCIPLES.map((p, i) => (
              <Reveal as="li" key={p.title} from={fromCol(i, 3)} delay={(i % 3) * 0.07} className="flex flex-col card-lift rounded-md border border-hairline bg-mist-blue/60 p-5 lg:p-6">
                <div className="flex items-start justify-between gap-3">
                  <Tag className="text-brand">{p.tag}</Tag>
                  <p.icon className="h-4 w-4 shrink-0 text-steel" aria-hidden />
                </div>
                <h3 className="font-display mt-4 text-lg font-bold tracking-tight">{p.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-graphite-600">{p.copy}</p>
                <p className="mt-auto border-t border-hairline pt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-steel">{p.stack}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Closing mandate */}
      <section className="bg-[#232a32] py-16 text-paper md:py-24">
        <div className={cn(WRAP, "grid gap-10 lg:grid-cols-12 lg:items-center")}>
          <Reveal from="left" className="lg:col-span-7">
            <Tag className="rounded-sm border border-brand/50 bg-brand/15 px-3 py-1.5 text-[#ff8f84]">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" /> Institutional Mandate
            </Tag>
            <h2 className="font-display mt-5 text-[clamp(2rem,1.3rem+3.4vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.03em]">
              Engineering Without Compromise.
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-paper/70">
              When system failures carry multi-million-dollar consequences or jeopardize sovereign energy security, capital programs turn to INFOELEX for absolute technical certainty.
            </p>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-paper/55">
              {["Chartered Engineers", "Independent Authority", "ISO 9001:2015 Certified"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand" /> {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal from="right" delay={0.1} className="flex flex-col gap-4 lg:col-span-4 lg:col-start-9">
            <Link href="/capabilities" className="inline-flex items-center justify-between gap-3 rounded-sm bg-brand px-6 py-4 text-[13px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-brand-dim focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              Explore our capabilities <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-between gap-3 rounded-sm border border-white/20 px-6 py-4 text-[13px] font-bold uppercase tracking-[0.12em] transition-colors hover:border-white/50 hover:bg-white/5">
              Discuss a project <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
