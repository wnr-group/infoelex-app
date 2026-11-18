"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import type { DiagramKey } from "./data";

/* ───────────────────────── Capability drawings ───────────────────────── */

const L = { fill: "none", stroke: "currentColor", strokeWidth: 1.25, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const ACCENT = "var(--color-signal)";

function Grid({ w = 480, h = 360, step = 40 }: { w?: number; h?: number; step?: number }) {
  const lines = [];
  for (let x = step; x < w; x += step) lines.push(<path key={`x${x}`} d={`M${x} 0V${h}`} />);
  for (let y = step; y < h; y += step) lines.push(<path key={`y${y}`} d={`M0 ${y}H${w}`} />);
  return <g stroke="currentColor" strokeOpacity={0.09} strokeWidth={1}>{lines}</g>;
}

function Label({ x, y, children, anchor = "start" }: { x: number; y: number; children: React.ReactNode; anchor?: "start" | "middle" | "end" }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={9.5} letterSpacing={1.2} fill="currentColor" fillOpacity={0.6} style={{ textTransform: "uppercase" }}>
      {children}
    </text>
  );
}

const DRAWINGS: Record<DiagramKey, () => React.ReactNode> = {
  /* Waveform with a fault transient */
  studies: () => (
    <>
      <Grid />
      <path d="M40 40V300H440" {...L} />
      <path className="draw" pathLength={1} d="M40 170 C70 110 100 110 130 170 S190 230 220 170 S250 112 262 140 L270 70 L282 270 L292 120 L300 215 C312 245 330 120 345 170 S400 225 440 170" {...L} stroke={ACCENT} strokeWidth={1.75} />
      <path className="draw" pathLength={1} d="M40 215 C100 215 180 214 262 214 L270 190 L282 236 C320 226 380 218 440 216" {...L} strokeOpacity={0.55} />
      <path d="M270 40V300" {...L} strokeDasharray="3 5" strokeOpacity={0.5} />
      <Label x={278} y={52}>Fault inception</Label>
      <Label x={48} y={54}>Voltage / current</Label>
      <Label x={440} y={322} anchor="end">Time (ms)</Label>
      <Label x={48} y={322}>Load flow · short-circuit · stability</Label>
    </>
  ),
  /* Single-line diagram */
  electrical: () => (
    <>
      <Grid />
      <g {...L}>
        <circle cx="240" cy="50" r="14" />
        <path d="M232 50c4-6 8 6 16 0" />
        <path d="M240 64V92" />
        <circle cx="240" cy="104" r="12" />
        <circle cx="240" cy="122" r="12" />
        <path d="M240 134V160" />
        <rect x="232" y="160" width="16" height="16" />
        <path d="M240 176V200" />
        <path d="M70 200H410" strokeWidth={3} />
        {[100, 240, 380].map((x) => (
          <g key={x}>
            <path d={`M${x} 200V236`} />
            <rect x={x - 8} y="236" width="16" height="16" />
            <path d={`M${x} 252V282`} />
          </g>
        ))}
        <circle cx="100" cy="296" r="14" />
        <path d="M92 296l16 0M100 288v16" />
        <path d="M240 282l-10 14h20z" />
        <path d="M380 282v10M366 292h28l-14 18z" />
      </g>
      <path className="draw" pathLength={1} d="M240 64V92M240 134V160M240 176V200M100 200V236M100 252V282M240 200V236M240 252V282M380 200V236M380 252V282" {...L} stroke={ACCENT} strokeWidth={1.75} />
      <Label x={262} y={54}>Grid</Label>
      <Label x={262} y={116}>Transformer</Label>
      <Label x={262} y={172}>Breaker</Label>
      <Label x={70} y={190}>Bus</Label>
      <Label x={48} y={344}>Single-line diagram · calculations · sizing</Label>
    </>
  ),
  /* Time–current coordination curves */
  protection: () => (
    <>
      <Grid />
      <path d="M50 40V300H440" {...L} />
      <path className="draw" pathLength={1} d="M110 40C112 170 130 230 200 256S330 276 430 280" {...L} strokeOpacity={0.55} />
      <path className="draw" pathLength={1} d="M190 40C192 150 215 205 270 226S370 240 430 244" {...L} stroke={ACCENT} strokeWidth={1.75} />
      <path className="draw" pathLength={1} d="M270 40C272 120 295 165 340 184S410 196 430 198" {...L} strokeOpacity={0.55} />
      <path d="M50 300L50 306M170 300V306M290 300V306M410 300V306" {...L} />
      <Label x={116} y={52}>Downstream</Label>
      <Label x={196} y={52}>Feeder</Label>
      <Label x={276} y={52}>Incomer</Label>
      <Label x={440} y={322} anchor="end">Current (A, log)</Label>
      <Label x={46} y={32}>Time (s, log)</Label>
      <Label x={48} y={344}>Coordination · arc flash · selectivity</Label>
    </>
  ),
  /* Control loop block diagram */
  automation: () => (
    <>
      <Grid />
      <g {...L}>
        <circle cx="70" cy="150" r="14" />
        <path d="M60 150h20M70 140v20" strokeOpacity={0} />
        <path d="M30 150H56M84 150H120" />
        <rect x="120" y="120" width="100" height="60" />
        <path d="M220 150H270" />
        <rect x="270" y="120" width="110" height="60" />
        <path d="M380 150H440" />
        <path d="M410 150V250H70V164" />
        <path d="M66 164l4-8 4 8" />
      </g>
      <path className="draw" pathLength={1} d="M30 150H56M84 150H120M220 150H270M380 150H440M410 150V250H70V164" {...L} stroke={ACCENT} strokeWidth={1.75} />
      <Label x={170} y={154} anchor="middle">Controller</Label>
      <Label x={325} y={154} anchor="middle">Plant</Label>
      <Label x={30} y={136}>Setpoint</Label>
      <Label x={440} y={136} anchor="end">Output</Label>
      <Label x={240} y={270} anchor="middle">Feedback</Label>
      <Label x={48} y={344}>Control logic · supervision · integration</Label>
    </>
  ),
  /* Plan layout with dimensions */
  design: () => (
    <>
      <Grid />
      <g {...L}>
        <rect x="60" y="60" width="360" height="220" />
        <rect x="84" y="84" width="60" height="120" />
        <rect x="160" y="84" width="60" height="120" />
        <rect x="236" y="84" width="60" height="120" />
        <rect x="330" y="84" width="70" height="50" />
        <rect x="330" y="150" width="70" height="54" />
        <path d="M60 240H420" strokeDasharray="4 4" strokeOpacity={0.5} />
        <path d="M60 304H420M60 296v16M420 296v16" />
        <path d="M440 60V280M432 60h16M432 280h16" />
      </g>
      <path className="draw" pathLength={1} d="M84 224C200 224 280 224 365 224V204" {...L} stroke={ACCENT} strokeWidth={1.75} />
      <Label x={240} y={322} anchor="middle">Overall length</Label>
      <Label x={72} y={74}>Switchroom</Label>
      <Label x={48} y={344}>Layouts · specifications · BOQ</Label>
    </>
  ),
  /* Review document with check marks */
  consultancy: () => (
    <>
      <Grid />
      <g {...L}>
        <path d="M120 40h180l60 60v220H120z" />
        <path d="M300 40v60h60" />
        {[130, 176, 222, 268].map((y) => (
          <g key={y}>
            <rect x="148" y={y - 9} width="16" height="16" />
            <path d={`M184 ${y}H330`} strokeOpacity={0.55} />
            <path d={`M184 ${y + 12}H290`} strokeOpacity={0.3} />
          </g>
        ))}
      </g>
      <path className="draw" pathLength={1} d="M151 130l5 6 9-12M151 176l5 6 9-12M151 222l5 6 9-12M151 268l5 6 9-12" {...L} stroke={ACCENT} strokeWidth={1.9} />
      <Label x={148} y={60}>Review record</Label>
      <Label x={48} y={344}>Independent review · compliance · advice</Label>
    </>
  ),
};

export function CapabilityDrawing({ id, className }: { id: DiagramKey; className?: string }) {
  return (
    <svg viewBox="0 0 480 360" role="img" aria-label={`${id} engineering drawing`} className={cn("h-full w-full text-graphite-950", className)}>
      {DRAWINGS[id]()}
    </svg>
  );
}

/* ───────────────────── Power redundancy explorer ───────────────────── */

type NodeDef = { id: string; label: string; x: number; y: number; kind: "source" | "gear" | "ups" | "load" };
type Topology = {
  key: string;
  name: string;
  blurb: string;
  nodes: NodeDef[];
  edges: [string, string][];
  failTarget: string;
  failLabel: string;
};

const TOPOLOGIES: Topology[] = [
  {
    key: "n",
    name: "N",
    blurb: "One path sized for the load. Simplest and lowest cost, but every component is a single point of failure.",
    nodes: [
      { id: "src", label: "Utility", x: 20, y: 150, kind: "source" },
      { id: "sw", label: "Switchboard", x: 215, y: 150, kind: "gear" },
      { id: "ups", label: "UPS", x: 410, y: 150, kind: "ups" },
      { id: "load", label: "IT load", x: 605, y: 150, kind: "load" },
    ],
    edges: [["src", "sw"], ["sw", "ups"], ["ups", "load"]],
    failTarget: "ups",
    failLabel: "UPS",
  },
  {
    key: "n1",
    name: "N+1",
    blurb: "One spare module beyond what the load needs. A single module can fail or be maintained without interruption.",
    nodes: [
      { id: "src", label: "Utility", x: 20, y: 150, kind: "source" },
      { id: "sw", label: "Switchboard", x: 215, y: 150, kind: "gear" },
      { id: "ups1", label: "UPS 1", x: 410, y: 70, kind: "ups" },
      { id: "ups2", label: "UPS 2", x: 410, y: 230, kind: "ups" },
      { id: "load", label: "IT load", x: 605, y: 150, kind: "load" },
    ],
    edges: [["src", "sw"], ["sw", "ups1"], ["sw", "ups2"], ["ups1", "load"], ["ups2", "load"]],
    failTarget: "ups1",
    failLabel: "UPS 1",
  },
  {
    key: "2n",
    name: "2N",
    blurb: "Two fully independent paths, each able to carry the whole load. A whole path can be lost or taken out for maintenance.",
    nodes: [
      { id: "srcA", label: "Utility A", x: 20, y: 70, kind: "source" },
      { id: "swA", label: "Switchboard A", x: 215, y: 70, kind: "gear" },
      { id: "upsA", label: "UPS A", x: 410, y: 70, kind: "ups" },
      { id: "srcB", label: "Utility B", x: 20, y: 230, kind: "source" },
      { id: "swB", label: "Switchboard B", x: 215, y: 230, kind: "gear" },
      { id: "upsB", label: "UPS B", x: 410, y: 230, kind: "ups" },
      { id: "load", label: "Dual-corded load", x: 605, y: 150, kind: "load" },
    ],
    edges: [["srcA", "swA"], ["swA", "upsA"], ["upsA", "load"], ["srcB", "swB"], ["swB", "upsB"], ["upsB", "load"]],
    failTarget: "swA",
    failLabel: "Switchboard A",
  },
];

const NW = 140;
const NH = 52;

function useEnergised(t: Topology, failed: boolean) {
  return useMemo(() => {
    const dead = new Set(failed ? [t.failTarget] : []);
    const live = new Set<string>();
    t.nodes.filter((n) => n.kind === "source" && !dead.has(n.id)).forEach((n) => live.add(n.id));
    let changed = true;
    while (changed) {
      changed = false;
      for (const [a, b] of t.edges) {
        if (live.has(a) && !dead.has(b) && !live.has(b)) {
          live.add(b);
          changed = true;
        }
      }
    }
    return { live, dead };
  }, [t, failed]);
}

export function RedundancyDiagram() {
  const [mode, setMode] = useState(1);
  const [failed, setFailed] = useState(false);
  const t = TOPOLOGIES[mode];
  const { live, dead } = useEnergised(t, failed);
  const byId = Object.fromEntries(t.nodes.map((n) => [n.id, n]));
  const loadLive = live.has("load");

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div role="tablist" aria-label="Redundancy topology" className="inline-flex border border-graphite-950/20">
          {TOPOLOGIES.map((x, i) => (
            <button
              key={x.key}
              role="tab"
              aria-selected={mode === i}
              onClick={() => {
                setMode(i);
                setFailed(false);
              }}
              className={cn(
                "min-w-16 px-5 py-2.5 text-sm font-semibold tracking-wide transition-colors",
                mode === i ? "bg-graphite-950 text-white" : "text-graphite-600 hover:text-graphite-950"
              )}
            >
              {x.name}
            </button>
          ))}
        </div>
        <button
          onClick={() => setFailed((v) => !v)}
          aria-pressed={failed}
          className={cn(
            "inline-flex items-center gap-2.5 border px-4 py-2.5 text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors",
            failed ? "border-signal bg-signal text-white" : "border-graphite-950/25 text-graphite-950 hover:border-graphite-950"
          )}
        >
          <span className={cn("h-1.5 w-1.5 rounded-full", failed ? "bg-white" : "bg-signal")} />
          {failed ? `Restore ${t.failLabel}` : `Fail ${t.failLabel}`}
        </button>
      </div>

      <div className="relative mt-8 overflow-x-auto rounded-xl border border-hairline bg-white shadow-hair">
        <svg viewBox="0 0 765 300" className="block min-w-[640px] w-full text-graphite-950" role="img" aria-label={`${t.name} power architecture. IT load is ${loadLive ? "supplied" : "interrupted"}.`}>
          <g stroke="currentColor" strokeOpacity={0.05}>
            {Array.from({ length: 19 }, (_, i) => <path key={`v${i}`} d={`M${i * 40} 0V300`} />)}
            {Array.from({ length: 8 }, (_, i) => <path key={`h${i}`} d={`M0 ${i * 40}H765`} />)}
          </g>
          {t.edges.map(([a, b]) => {
            const A = byId[a];
            const B = byId[b];
            const x1 = A.x + NW;
            const y1 = A.y + NH / 2;
            const x2 = B.x;
            const y2 = B.y + NH / 2;
            const mx = (x1 + x2) / 2;
            const on = live.has(a) && !dead.has(b);
            return (
              <path
                key={`${a}-${b}`}
                d={`M${x1} ${y1}H${mx}V${y2}H${x2}`}
                fill="none"
                stroke={on ? "currentColor" : "currentColor"}
                strokeOpacity={on ? 0.95 : 0.2}
                strokeWidth={on ? 1.75 : 1.25}
                strokeDasharray={on ? "6 6" : "2 6"}
                className={on ? "flow" : undefined}
              />
            );
          })}
          {t.nodes.map((n) => {
            const isDead = dead.has(n.id);
            const isLive = live.has(n.id);
            const isLoad = n.kind === "load";
            return (
              <g key={n.id} transform={`translate(${n.x} ${n.y})`}>
                <rect
                  width={NW}
                  height={NH}
                  fill={isDead ? "var(--color-signal)" : isLoad && isLive ? "rgba(200,40,26,0.08)" : "rgba(21,23,26,0.03)"}
                  stroke={isDead ? "var(--color-signal)" : "currentColor"}
                  strokeOpacity={isDead ? 1 : isLive ? 0.9 : 0.25}
                  strokeWidth={1.25}
                />
                <text x={NW / 2} y={NH / 2 + 4} textAnchor="middle" fontSize={12} fontWeight={600} fill="currentColor" fillOpacity={isLive || isDead ? 1 : 0.4}>
                  {n.label}
                </text>
                {isDead && (
                  <text x={NW / 2} y={-8} textAnchor="middle" fontSize={9.5} letterSpacing={1.4} fill="var(--color-signal)">FAULT</text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
        <p className="max-w-xl text-[15px] leading-relaxed text-graphite-600">{t.blurb}</p>
        <p
          role="status"
          aria-live="polite"
          className={cn(
            "inline-flex items-center gap-2.5 border px-4 py-2.5 text-[12px] font-semibold uppercase tracking-[0.12em]",
            loadLive ? "border-graphite-950/25 text-graphite-950" : "border-signal bg-signal text-white"
          )}
        >
          <span className={cn("h-2 w-2 rounded-full", loadLive ? "bg-signal" : "bg-white")} />
          Load {loadLive ? "supplied" : "interrupted"}
        </p>
      </div>
    </div>
  );
}
