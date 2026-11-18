"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/components/home/motion";
import { cn } from "@/lib/utils";
import { CAPABILITIES, CONTACT, METHOD, PRESENCE, PROJECTS } from "./data";

/**
 * Interactive hero diagrams for pages without a photograph.
 * Floats directly on the page (no panel): soft glows, orbit lines, glass nodes.
 * Hover, focus or tap a node to read about it; mouse movement adds depth; a slow
 * auto-tour runs until the visitor interacts.
 */
export type HeroArtKind = "capabilities" | "projects" | "signature" | "contact";

type Item = { x: number; y: number; glyph: string; label?: string; kicker: string; title: string; desc: string };

const ACCENT = "var(--color-signal)";
const CX = 300;
const CY = 260;

function polar(rx: number, ry: number, i: number, n: number, start = -90) {
  const a = (start + (360 / n) * i) * (Math.PI / 180);
  return { x: Math.round(CX + rx * Math.cos(a)), y: Math.round(CY + ry * Math.sin(a)) };
}

function smooth(pts: number[][]) {
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    d += `C${p1[0] + (p2[0] - p0[0]) / 6} ${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6} ${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]} ${p2[1]}`;
  }
  return d;
}

const ROUTE: number[][] = [[90, 390], [190, 292], [150, 176], [300, 150], [420, 242], [510, 130]];

function getItems(kind: HeroArtKind): Item[] {
  switch (kind) {
    case "capabilities":
      return CAPABILITIES.map((c, i) => ({
        ...polar(215, 170, i, CAPABILITIES.length),
        glyph: c.index,
        label: c.id.charAt(0).toUpperCase() + c.id.slice(1),
        kicker: `Discipline ${c.index}`,
        title: c.title,
        desc: c.lead,
      }));
    case "projects":
      return PROJECTS.slice(0, ROUTE.length).map((p, i) => ({
        x: ROUTE[i][0],
        y: ROUTE[i][1],
        glyph: `0${i + 1}`,
        kicker: p.industry,
        title: p.title,
        desc: p.summary,
      }));
    case "signature":
      return METHOD.map((m, i) => ({
        ...polar(170, 170, i, METHOD.length),
        glyph: m.step,
        label: m.title,
        kicker: `Stage ${m.step}`,
        title: m.title,
        desc: m.does,
      }));
    case "contact": {
      const india = PRESENCE.find((r) => r.region === "India");
      const gcc = PRESENCE.find((r) => r.region === "GCC");
      return [
        { x: 120, y: 120, glyph: "Email", kicker: "Write to us", title: CONTACT.email, desc: "Tell us what you are building or studying. We reply with the right engineer." },
        { x: 480, y: 120, glyph: "Call", kicker: "Speak to us", title: CONTACT.phone, desc: "Talk through a project, a study or a collaboration with our team." },
        { x: 480, y: 400, glyph: "India", kicker: "Headquarters", title: `${CONTACT.office[1]}`, desc: india?.detail ?? "" },
        { x: 120, y: 400, glyph: "GCC", kicker: "Regional presence", title: "Across the Gulf region", desc: gcc?.detail ?? "" },
      ];
    }
  }
}

function Node({ item, index, active, r, id, onSelect }: { item: Item; index: number; active: number; r: number; id: string; onSelect: (i: number) => void }) {
  const on = active === index;
  const t = "fill 0.35s, stroke 0.35s, opacity 0.35s";
  return (
    <g
      transform={`translate(${item.x} ${item.y})`}
      role="button"
      tabIndex={0}
      aria-pressed={on}
      aria-label={item.title}
      className="cursor-pointer outline-none"
      onMouseEnter={() => onSelect(index)}
      onFocus={() => onSelect(index)}
      onClick={() => onSelect(index)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(index);
        }
      }}
    >
      <circle r={r + 18} style={{ fill: ACCENT, opacity: on ? 0.12 : 0, transition: t }} />
      {on && <circle r={r + 6} fill="none" stroke={ACCENT} strokeWidth={1.5} className="pulse-ring" />}
      <circle
        r={r}
        style={{
          fill: on ? ACCENT : `url(#${id}-disc)`,
          stroke: on ? ACCENT : "rgba(21,23,26,0.16)",
          strokeWidth: 1.5,
          transition: t,
          filter: "drop-shadow(0 10px 16px rgba(21,23,26,0.14))",
        }}
      />
      <text textAnchor="middle" y={4.5} fontSize={r > 28 ? 12 : 13} fontWeight={600} style={{ fill: on ? "#fff" : "var(--color-graphite-950)", transition: t }}>
        {item.glyph}
      </text>
      {item.label && (
        <text textAnchor="middle" y={r + 22} fontSize={12} fontWeight={on ? 600 : 500} style={{ fill: on ? "var(--color-graphite-950)" : "var(--color-steel)", transition: t }}>
          {item.label}
        </text>
      )}
    </g>
  );
}

function Layer({ d, children }: { d: number; children: React.ReactNode }) {
  return (
    <g className="px-layer" style={{ "--d": d } as React.CSSProperties}>
      {children}
    </g>
  );
}

export function HeroArt({
  kind,
  className,
  value,
  onValueChange,
  showReadout = true,
}: {
  kind: HeroArtKind;
  className?: string;
  /** Controlled active node (optional). */
  value?: number;
  onValueChange?: (i: number) => void;
  showReadout?: boolean;
}) {
  const uid = useId().replace(/:/g, "");
  const items = useMemo(() => getItems(kind), [kind]);
  const [inner, setInner] = useState(0);
  const active = value ?? inner;
  const activeRef = useRef(active);
  activeRef.current = active;
  const setActive = (n: number | ((a: number) => number)) => {
    const next = typeof n === "function" ? n(activeRef.current) : n;
    setInner(next);
    onValueChange?.(next);
  };
  const [touched, setTouched] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const hovering = useRef(false);

  const select = (i: number) => {
    setTouched(true);
    setActive(i);
  };

  useEffect(() => {
    if (touched || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      if (!hovering.current) setActive((a) => (a + 1) % items.length);
    }, 3800);
    return () => clearInterval(t);
  }, [touched, items.length]);

  const move = (e: React.PointerEvent) => {
    const el = wrap.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--px", (((e.clientX - r.left) / r.width - 0.5) * 2).toFixed(3));
    el.style.setProperty("--py", (((e.clientY - r.top) / r.height - 0.5) * 2).toFixed(3));
  };
  const leave = () => {
    hovering.current = false;
    wrap.current?.style.setProperty("--px", "0");
    wrap.current?.style.setProperty("--py", "0");
  };

  const cur = items[active];
  const line = `url(#${uid}-line)`;

  return (
    <div ref={wrap} className={cn("relative w-full select-none", className)} onPointerMove={move} onPointerLeave={leave} onMouseEnter={() => (hovering.current = true)}>
      <svg viewBox="0 0 600 520" className="h-auto w-full overflow-visible" role="group" aria-label="Interactive diagram. Hover, focus or tap a node to read more.">
        <defs>
          <radialGradient id={`${uid}-glow`}>
            <stop offset="0" stopColor="#c8281a" stopOpacity={0.16} />
            <stop offset="1" stopColor="#c8281a" stopOpacity={0} />
          </radialGradient>
          <radialGradient id={`${uid}-glow2`}>
            <stop offset="0" stopColor="#7c8a99" stopOpacity={0.26} />
            <stop offset="1" stopColor="#7c8a99" stopOpacity={0} />
          </radialGradient>
          <radialGradient id={`${uid}-disc`} cx="35%" cy="30%" r="80%">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#ecebe7" />
          </radialGradient>
          <linearGradient id={`${uid}-line`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#c8281a" />
            <stop offset="1" stopColor="#7c8a99" />
          </linearGradient>
        </defs>

        {/* Ambient glow */}
        <Layer d={4}>
          <circle cx={CX} cy={CY} r={250} fill={`url(#${uid}-glow)`} />
          <circle cx={120} cy={110} r={150} fill={`url(#${uid}-glow2)`} />
          <circle cx={500} cy={430} r={130} fill={`url(#${uid}-glow2)`} />
        </Layer>

        {/* Scene decoration and links */}
        <Layer d={10}>
          {kind === "capabilities" && (
            <>
              <ellipse cx={CX} cy={CY} rx={215} ry={170} fill="none" stroke="currentColor" strokeOpacity={0.14} strokeDasharray="2 8" strokeLinecap="round" />
              <ellipse cx={CX} cy={CY} rx={130} ry={104} fill="none" stroke="currentColor" strokeOpacity={0.08} />
              {items.map((it, i) => (
                <path key={i} d={`M${CX} ${CY}L${it.x} ${it.y}`} fill="none" stroke={active === i ? line : "currentColor"} strokeOpacity={active === i ? 1 : 0.12} strokeWidth={active === i ? 2 : 1.25} strokeDasharray={active === i ? "6 6" : undefined} className={active === i ? "flow" : undefined} style={{ transition: "stroke-opacity .35s" }} />
              ))}
            </>
          )}

          {kind === "projects" && (
            <>
              {[60, 105, 150, 195].map((r, i) => (
                <ellipse key={r} cx={CX} cy={CY} rx={r * 1.45} ry={r} transform={`rotate(-14 ${CX} ${CY})`} fill="none" stroke="currentColor" strokeOpacity={0.07 + i * 0.015} />
              ))}
              <path d={smooth(ROUTE)} fill="none" stroke={line} strokeWidth={2} strokeLinecap="round" strokeDasharray="2 9" className="flow" />
            </>
          )}

          {kind === "signature" && (
            <>
              <circle cx={CX} cy={CY} r={170} fill="none" stroke="currentColor" strokeOpacity={0.2} strokeDasharray="2 9" strokeLinecap="round" className="orbit-spin" />
              <circle cx={CX} cy={CY} r={104} fill="none" stroke="currentColor" strokeOpacity={0.08} />
              {items.map((it, i) => (
                <path key={i} d={`M${CX} ${CY}L${it.x} ${it.y}`} fill="none" stroke={active === i ? line : "currentColor"} strokeOpacity={active === i ? 1 : 0.1} strokeWidth={active === i ? 2 : 1.25} style={{ transition: "stroke-opacity .35s" }} />
              ))}
            </>
          )}

          {kind === "contact" && (
            <>
              {[80, 140, 200, 250].map((r, i) => (
                <circle key={r} cx={CX} cy={CY} r={r} fill="none" stroke="currentColor" strokeOpacity={0.2 - i * 0.035} strokeDasharray="2 9" strokeLinecap="round" />
              ))}
              {items.map((it, i) => (
                <path key={i} d={`M${CX} ${CY}L${it.x} ${it.y}`} fill="none" stroke={active === i ? line : "currentColor"} strokeOpacity={active === i ? 1 : 0.14} strokeWidth={active === i ? 2 : 1.25} strokeDasharray="6 6" className={active === i ? "flow" : undefined} style={{ transition: "stroke-opacity .35s" }} />
              ))}
            </>
          )}
        </Layer>

        {/* Centre piece */}
        <Layer d={14}>
          {kind !== "projects" && (
            <g style={{ filter: "drop-shadow(0 14px 22px rgba(21,23,26,0.16))" }}>
              <circle cx={CX} cy={CY} r={kind === "contact" ? 52 : 62} fill={`url(#${uid}-disc)`} stroke="rgba(21,23,26,0.14)" strokeWidth={1.5} />
              <circle cx={CX} cy={CY} r={kind === "contact" ? 38 : 46} fill={ACCENT} fillOpacity={0.08} />
              {kind === "capabilities" && <path d="M309 228L283 267H301L292 294L318 255H300Z" fill={ACCENT} />}
              {kind === "signature" && <path d="M276 262l18 18 34-42" fill="none" stroke={ACCENT} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />}
              {kind === "contact" && (
                <>
                  <rect x={274} y={244} width={52} height={36} rx={6} fill="none" stroke="var(--color-graphite-950)" strokeWidth={1.75} />
                  <path d="M277 249l23 18 23-18" fill="none" stroke={ACCENT} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </>
              )}
            </g>
          )}
        </Layer>

        {/* Interactive nodes */}
        <Layer d={20}>
          {items.map((it, i) => (
            <Node key={i} item={it} index={i} active={active} r={kind === "contact" ? 34 : kind === "projects" ? 22 : 27} id={uid} onSelect={select} />
          ))}
        </Layer>
      </svg>

      {showReadout && (
      <div className="mt-2" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={`${kind}-${active}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: EASE }} className="min-h-[8rem]">
            <p className="flex items-center gap-3 text-eyebrow font-semibold uppercase text-signal">
              <span className="h-px w-6 bg-signal" />
              {cur.kicker}
            </p>
            <p className="font-display mt-3 text-card">{cur.title}</p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-graphite-600">{cur.desc}</p>
          </motion.div>
        </AnimatePresence>
        <div className="mt-3 flex items-center gap-2">
          {items.map((it, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show ${it.title}`}
              onClick={() => select(i)}
              className={cn("h-1.5 rounded-full transition-all duration-300", active === i ? "w-7 bg-signal" : "w-1.5 bg-graphite-950/20 hover:bg-graphite-950/40")}
            />
          ))}
          <span className="ml-3 text-xs text-steel">Hover or tap to explore</span>
        </div>
      </div>
      )}
    </div>
  );
}
