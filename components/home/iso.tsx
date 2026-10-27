import type { SceneKey } from "./content";

/* ─── Isometric projection ──────────────────────────────────────
   x runs down-right, y runs down-left, z is up. One unit = U px. */
const U = 28;
const OX = 500;
const OY = 215;
const K = 0.866;
const P = (x: number, y: number, z = 0): [number, number] => [
  OX + (x - y) * U * K,
  OY + (x + y) * U * 0.5 - z * U,
];
const pts = (list: [number, number, number][]) =>
  list.map(([x, y, z]) => P(x, y, z).join(",")).join(" ");

export const C = {
  top: "#F5F5F3",
  left: "#D8D9DB",
  right: "#BEC0C4",
  edge: "#8C9097",
  ground: "#EBEBE8",
  road: "#D6D7D9",
  water: "#C9D1D9",
  waterEdge: "#A9B4BF",
  glass: "#E3E7EB",
  panel: "#9AA6B3",
  panelDark: "#7C8A99",
  red: "#C8281A",
  redLeft: "#A8210F",
  redRight: "#8C1B0C",
};

const EDGE = { stroke: C.edge, strokeWidth: 0.7, strokeLinejoin: "round" as const };

type Dim = { x: number; y: number; z?: number; w: number; d: number; h: number };

function Box({
  x, y, z = 0, w, d, h,
  top = C.top, left = C.left, right = C.right, children,
}: Dim & { top?: string; left?: string; right?: string; children?: React.ReactNode }) {
  return (
    <g>
      <polygon points={pts([[x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + h], [x, y + d, z + h]])} fill={left} {...EDGE} />
      <polygon points={pts([[x + w, y, z], [x + w, y + d, z], [x + w, y + d, z + h], [x + w, y, z + h]])} fill={right} {...EDGE} />
      <polygon points={pts([[x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]])} fill={top} {...EDGE} />
      {children}
    </g>
  );
}

const RED = { top: C.red, left: C.redLeft, right: C.redRight };

/** Line on a box's left (y+d) face; u runs along x, v runs up. */
function LF({ b, u0, v0, u1, v1, stroke = C.edge, width = 0.6, opacity = 1 }: {
  b: Dim; u0: number; v0: number; u1: number; v1: number; stroke?: string; width?: number; opacity?: number;
}) {
  const z = b.z ?? 0;
  const [ax, ay] = P(b.x + u0 * b.w, b.y + b.d, z + v0 * b.h);
  const [bx, by] = P(b.x + u1 * b.w, b.y + b.d, z + v1 * b.h);
  return <line x1={ax} y1={ay} x2={bx} y2={by} stroke={stroke} strokeWidth={width} opacity={opacity} />;
}

/** Line on a box's right (x+w) face; u runs along y, v runs up. */
function RF({ b, u0, v0, u1, v1, stroke = C.edge, width = 0.6, opacity = 1 }: {
  b: Dim; u0: number; v0: number; u1: number; v1: number; stroke?: string; width?: number; opacity?: number;
}) {
  const z = b.z ?? 0;
  const [ax, ay] = P(b.x + b.w, b.y + u0 * b.d, z + v0 * b.h);
  const [bx, by] = P(b.x + b.w, b.y + u1 * b.d, z + v1 * b.h);
  return <line x1={ax} y1={ay} x2={bx} y2={by} stroke={stroke} strokeWidth={width} opacity={opacity} />;
}

/** Vertical cylinder standing on the ground plane. */
function Cyl({ x, y, z = 0, r, h, top = C.top, side = C.left, accent }: {
  x: number; y: number; z?: number; r: number; h: number; top?: string; side?: string; accent?: string;
}) {
  const [cx, cyTop] = P(x, y, z + h);
  const [, cyBot] = P(x, y, z);
  const rx = r * U * 1.2247;
  const ry = r * U * 0.7071;
  return (
    <g>
      <path d={`M${cx - rx},${cyTop} L${cx - rx},${cyBot} A${rx},${ry} 0 0 0 ${cx + rx},${cyBot} L${cx + rx},${cyTop} Z`} fill={side} {...EDGE} />
      {accent && (
        <path
          d={`M${cx - rx},${cyTop + (cyBot - cyTop) * 0.2} A${rx},${ry} 0 0 0 ${cx + rx},${cyTop + (cyBot - cyTop) * 0.2}`}
          fill="none"
          stroke={accent}
          strokeWidth={1.6}
        />
      )}
      <ellipse cx={cx} cy={cyTop} rx={rx} ry={ry} fill={top} {...EDGE} />
    </g>
  );
}

const path = (...p: [number, number][]) =>
  p.map(([x, y], i) => `${i ? "L" : "M"}${P(x, y, 0.03).join(" ")}`).join(" ");

function Cable({ d }: { d: string }) {
  return <path d={d} fill="none" stroke={C.red} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />;
}

/** Ground plate with blueprint grid. */
function Slab({ w, d, children }: { w: number; d: number; children?: React.ReactNode }) {
  const grid: React.ReactNode[] = [];
  for (let i = 2; i < w; i += 2) {
    const a = P(i, 0), b = P(i, d);
    grid.push(<line key={`x${i}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#15171A" strokeOpacity={0.06} strokeWidth={0.6} />);
  }
  for (let i = 2; i < d; i += 2) {
    const a = P(0, i), b = P(w, i);
    grid.push(<line key={`y${i}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#15171A" strokeOpacity={0.06} strokeWidth={0.6} />);
  }
  return (
    <g>
      <polygon points={pts([[0, d, 0], [w, d, 0], [w, d, -0.5], [0, d, -0.5]])} fill={C.left} stroke={C.edge} strokeWidth={0.7} />
      <polygon points={pts([[w, 0, 0], [w, d, 0], [w, d, -0.5], [w, 0, -0.5]])} fill={C.right} stroke={C.edge} strokeWidth={0.7} />
      <polygon points={pts([[0, 0, 0], [w, 0, 0], [w, d, 0], [0, d, 0]])} fill={C.ground} stroke={C.edge} strokeWidth={0.7} />
      {grid}
      {children}
    </g>
  );
}

/* ─── Reusable objects ──────────────────────────────────────── */

function Transformer({ x, y }: { x: number; y: number }) {
  const tank = { x: x + 0.3, y: y + 0.25, z: 0.12, w: 1.3, d: 1.0, h: 0.85 };
  return (
    <g>
      <Box x={x} y={y} w={1.9} d={1.5} h={0.12} top="#E2E2DF" />
      <Box {...tank}>
        {[0.15, 0.3, 0.45, 0.6, 0.75, 0.9].map((u) => (
          <RF key={u} b={tank} u0={u} v0={0.1} u1={u} v1={0.9} opacity={0.45} />
        ))}
        <Box x={tank.x + 0.45} y={tank.y + 0.3} z={tank.z + tank.h} w={0.4} d={0.4} h={0.3} {...RED} />
      </Box>
    </g>
  );
}

function Gantry({ x, y0, y1 }: { x: number; y0: number; y1: number }) {
  const a = P(x + 0.07, y0 + 0.07, 2);
  const b = P(x + 0.07, y1 + 0.07, 2);
  const mid = [(y0 + y1) / 2 - 0.6, (y0 + y1) / 2, (y0 + y1) / 2 + 0.6];
  return (
    <g>
      <Box x={x} y={y0} w={0.14} d={0.14} h={2} />
      <Box x={x} y={y1} w={0.14} d={0.14} h={2} />
      <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={C.edge} strokeWidth={1.6} />
      {mid.map((y) => {
        const t = P(x + 0.07, y, 2);
        const e = P(x + 0.07, y, 1.65);
        return <line key={y} x1={t[0]} y1={t[1]} x2={e[0]} y2={e[1]} stroke={C.red} strokeWidth={1.4} />;
      })}
    </g>
  );
}

function Pylon({ x, y }: { x: number; y: number }) {
  const apex = P(x, y, 5);
  const base = [P(x - 0.3, y - 0.3), P(x + 0.3, y - 0.3), P(x + 0.3, y + 0.3), P(x - 0.3, y + 0.3)];
  const arm = (z: number, half: number) => [P(x, y - half, z), P(x, y + half, z)];
  const a1 = arm(4.1, 1.4);
  const a2 = arm(3.1, 1.0);
  return (
    <g stroke={C.edge} strokeWidth={0.9} fill="none" strokeLinecap="round">
      {base.map(([bx, by], i) => (
        <line key={i} x1={bx} y1={by} x2={apex[0]} y2={apex[1]} />
      ))}
      <line x1={a1[0][0]} y1={a1[0][1]} x2={a1[1][0]} y2={a1[1][1]} strokeWidth={1.3} />
      <line x1={a2[0][0]} y1={a2[0][1]} x2={a2[1][0]} y2={a2[1][1]} strokeWidth={1.3} />
    </g>
  );
}

function BessUnit({ x, y, w = 2.2, d = 1.1, h = 1.05 }: { x: number; y: number; w?: number; d?: number; h?: number }) {
  const b = { x, y, z: 0, w, d, h };
  return (
    <Box {...b}>
      <LF b={b} u0={0.5} v0={0.06} u1={0.5} v1={0.94} />
      <LF b={b} u0={0.06} v0={0.14} u1={0.94} v1={0.14} stroke={C.red} width={1.8} />
      {[0.62, 0.7, 0.78, 0.86].map((u) => (
        <LF key={u} b={b} u0={u} v0={0.4} u1={u} v1={0.85} opacity={0.5} />
      ))}
      <RF b={b} u0={0.5} v0={0.06} u1={0.5} v1={0.94} opacity={0.6} />
    </Box>
  );
}

/** Tilted solar table: low edge at y, high edge at y+d. */
function SolarTable({ x, y, w = 2.4, d = 1.2 }: { x: number; y: number; w?: number; d?: number }) {
  const lo = 0.35;
  const hi = 0.85;
  const face = pts([[x, y, hi], [x + w, y, hi], [x + w, y + d, lo], [x, y + d, lo]]);
  const lines: React.ReactNode[] = [];
  for (let i = 1; i < 6; i++) {
    const u = (w * i) / 6;
    const a = P(x + u, y, hi), b = P(x + u, y + d, lo);
    lines.push(<line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#fff" strokeOpacity={0.55} strokeWidth={0.5} />);
  }
  const m1 = P(x, y + d / 2, (hi + lo) / 2), m2 = P(x + w, y + d / 2, (hi + lo) / 2);
  const leg = P(x + w / 2, y + d, 0);
  const legTop = P(x + w / 2, y + d, lo);
  return (
    <g>
      <line x1={leg[0]} y1={leg[1]} x2={legTop[0]} y2={legTop[1]} stroke={C.edge} strokeWidth={1} />
      <polygon points={face} fill={C.panel} stroke={C.edge} strokeWidth={0.7} />
      {lines}
      <line x1={m1[0]} y1={m1[1]} x2={m2[0]} y2={m2[1]} stroke="#fff" strokeOpacity={0.55} strokeWidth={0.5} />
    </g>
  );
}

/** Wind turbine with tapered blades that turn slowly (CSS-driven; stops for reduced motion). */
function Turbine({ x, y, duration = 8, offset = 0 }: { x: number; y: number; duration?: number; offset?: number }) {
  const [bx, by] = P(x, y, 0);
  const [hx, hy] = P(x, y, 5.2);
  return (
    <g>
      <polygon points={`${bx - 3.2},${by} ${bx + 3.2},${by} ${hx + 1.4},${hy} ${hx - 1.4},${hy}`} fill={C.top} stroke={C.edge} strokeWidth={0.7} />
      <g transform={`translate(${hx} ${hy})`}>
        <g className="turbine-rotor" style={{ animationDuration: `${duration}s`, animationDelay: `-${offset}s` }}>
          {/* invisible disc keeps the rotor's bounding box centred on the hub */}
          <circle r={64} fill="none" />
          {[0, 120, 240].map((a) => (
            <path
              key={a}
              transform={`rotate(${a})`}
              d="M-2.6 0 L-0.7 -62 L1 -62 L2.8 0 Z"
              fill={C.top}
              stroke={C.edge}
              strokeWidth={0.7}
              strokeLinejoin="round"
            />
          ))}
        </g>
        <circle r={3.6} fill={C.red} />
      </g>
    </g>
  );
}

/* ─── Scenes ────────────────────────────────────────────────── */

function DataCenter() {
  const hall = { x: 2.4, y: 1.2, z: 0, w: 6.4, d: 4, h: 2.2 };
  const chillers: [number, number][] = [[3.2, 1.9], [4.9, 1.9], [6.6, 1.9], [4.0, 3.3], [5.8, 3.3]];
  return (
    <>
      <Slab w={13} d={11}>
        <Cable d={path([4.5, 8], [4.5, 5.2])} />
        <Cable d={path([4.5, 8], [10.5, 8], [10.5, 5.0])} />
        <polygon points={pts([[0, 6.6, 0], [13, 6.6, 0], [13, 7.6, 0], [0, 7.6, 0]])} fill={C.road} />
      </Slab>
      <Box {...hall}>
        {[0.2, 0.42, 0.64].map((v) => (
          <LF key={v} b={hall} u0={0.04} v0={v} u1={0.96} v1={v} opacity={0.8} />
        ))}
        {[0.17, 0.33, 0.5, 0.67, 0.83].map((u) => (
          <LF key={u} b={hall} u0={u} v0={0.08} u1={u} v1={0.92} opacity={0.35} />
        ))}
        <LF b={hall} u0={0} v0={0.93} u1={1} v1={0.93} stroke={C.red} width={1.6} />
        {[0.25, 0.5, 0.75].map((u) => (
          <RF key={u} b={hall} u0={u} v0={0.08} u1={u} v1={0.92} opacity={0.4} />
        ))}
        {chillers
          .slice()
          .sort((a, c) => a[0] + a[1] - (c[0] + c[1]))
          .map(([x, y]) => (
            <Box key={`${x}-${y}`} x={x} y={y} z={hall.h} w={1.1} d={1.1} h={0.45} top="#FAFAF9" />
          ))}
      </Box>
      <Box x={9.6} y={1.6} w={2.4} d={2.2} h={1.3}>
        <Box x={9.8} y={1.8} z={1.3} w={0.8} d={0.8} h={0.3} {...RED} />
      </Box>
      {[0, 1, 2, 3].map((i) => (
        <Box key={i} x={2.2 + i * 1.7} y={8.2} w={1.3} d={1.2} h={0.9}>
          <Box x={2.6 + i * 1.7} y={8.5} z={0.9} w={0.4} d={0.4} h={0.25} {...RED} />
        </Box>
      ))}
      <Transformer x={9.6} y={8.0} />
    </>
  );
}

function Bess() {
  return (
    <>
      <Slab w={14} d={10}>
        <Cable d={path([2.4, 5.2], [12.2, 5.2])} />
        <Cable d={path([4, 5.2], [4, 3.6])} />
        <Cable d={path([8.4, 5.2], [8.4, 3.6])} />
        <Cable d={path([4, 5.2], [4, 6.6])} />
        <Cable d={path([8.4, 5.2], [8.4, 6.6])} />
      </Slab>
      {[0, 1, 2, 3].map((i) => (
        <BessUnit key={`a${i}`} x={1.6 + i * 2.8} y={1.4} w={2.4} />
      ))}
      <Box x={1.2} y={4.6} w={1.4} d={1.2} h={1.1} {...{ top: C.top }}>
        <Box x={1.5} y={4.8} z={1.1} w={0.5} d={0.5} h={0.25} {...RED} />
      </Box>
      {[0, 1, 2, 3].map((i) => (
        <BessUnit key={`b${i}`} x={1.6 + i * 2.8} y={6.6} w={2.4} />
      ))}
      <Transformer x={11.4} y={3.8} />
    </>
  );
}

function Renewable() {
  const tables: React.ReactNode[] = [];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 4; c++) {
      tables.push(<SolarTable key={`${r}-${c}`} x={1 + c * 2.7} y={4.6 + r * 2.2} />);
    }
  }
  return (
    <>
      <Slab w={14} d={11}>
        <Cable d={path([2, 4.2], [12.6, 4.2], [12.6, 1.8])} />
      </Slab>
      <Turbine x={3} y={1.4} duration={7} offset={0} />
      <Turbine x={7.4} y={1.4} duration={8.5} offset={3} />
      <Box x={11.4} y={0.6} w={2} d={1.8} h={1.2}>
        <Box x={11.7} y={0.9} z={1.2} w={0.6} d={0.6} h={0.3} {...RED} />
      </Box>
      {tables}
    </>
  );
}

function Substation() {
  return (
    <>
      <Slab w={13} d={11}>
        <Cable d={path([3.2, 5.6], [8, 5.6])} />
        <Cable d={path([3.2, 7.4], [8, 7.4])} />
      </Slab>
      <Pylon x={1.2} y={3.2} />
      <Pylon x={10.8} y={3.2} />
      <Transformer x={2.4} y={4.8} />
      <Transformer x={2.4} y={6.6} />
      <Gantry x={8} y0={4.4} y1={8.2} />
      <Box x={9.6} y={6} w={2.4} d={2} h={1.3}>
        <LF b={{ x: 9.6, y: 6, w: 2.4, d: 2, h: 1.3 }} u0={0} v0={0.94} u1={1} v1={0.94} stroke={C.red} width={1.5} />
      </Box>
    </>
  );
}

function Switchgear() {
  return (
    <>
      <Slab w={12} d={9}>
        <Cable d={path([2, 6], [10, 6])} />
      </Slab>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const b = { x: 1.6 + i * 1.5, y: 2.6, w: 1.2, d: 1.4, h: 1.7 };
        return (
          <Box key={i} {...b}>
            <LF b={b} u0={0.15} v0={0.1} u1={0.85} v1={0.1} opacity={0.6} />
            <LF b={b} u0={0.5} v0={0.1} u1={0.5} v1={0.9} opacity={0.5} />
            <LF b={b} u0={0.15} v0={0.72} u1={0.85} v1={0.72} stroke={i === 2 ? C.red : C.edge} width={i === 2 ? 1.8 : 0.6} />
          </Box>
        );
      })}
      <Box x={3.2} y={5.4} w={4.8} d={1.6} h={0.7} top={C.glass} />
    </>
  );
}

function Industrial() {
  return (
    <>
      <Slab w={13} d={11}>
        <Cable d={path([2, 8], [11, 8])} />
      </Slab>
      <Box x={1.2} y={1.2} w={6} d={3.6} h={1.6}>
        <LF b={{ x: 1.2, y: 1.2, w: 6, d: 3.6, h: 1.6 }} u0={0} v0={0.92} u1={1} v1={0.92} stroke={C.red} width={1.5} />
      </Box>
      <Box x={1.2} y={5.2} w={4} d={2.4} h={1.2} />
      <Cyl x={9} y={2} r={0.5} h={5} accent={C.red} />
      <Cyl x={10.4} y={3} r={0.4} h={3.6} />
      <Box x={7.6} y={4.6} w={3.4} d={1.4} h={0.5} />
      <Box x={8.4} y={7.4} w={2.6} d={1.8} h={1.2} />
    </>
  );
}

function Water() {
  return (
    <>
      <Slab w={12} d={10}>
        <polygon points={pts([[0, 6.8, 0], [12, 6.8, 0], [12, 8.2, 0], [0, 8.2, 0]])} fill={C.water} />
        <Cable d={path([3, 4.4], [9.6, 4.4])} />
      </Slab>
      <Cyl x={3} y={3} r={1.4} h={1.2} top={C.water} />
      <Cyl x={6.2} y={3} r={1.4} h={1.2} top={C.water} />
      <Cyl x={9.4} y={3} r={1.2} h={2.4} accent={C.red} />
      <Box x={2} y={5.4} w={3.4} d={1.2} h={1} />
      <Box x={6.4} y={5.4} w={2} d={1.2} h={1}>
        <Box x={6.7} y={5.6} z={1} w={0.5} d={0.5} h={0.25} {...RED} />
      </Box>
    </>
  );
}

function Hydrogen() {
  return (
    <>
      <Slab w={13} d={10}>
        <Cable d={path([3.4, 4.6], [10.6, 4.6])} />
      </Slab>
      <Box x={1.2} y={1.2} w={4.4} d={3} h={1.6} top={C.top}>
        <LF b={{ x: 1.2, y: 1.2, w: 4.4, d: 3, h: 1.6 }} u0={0} v0={0.9} u1={1} v1={0.9} stroke={C.red} width={1.6} />
      </Box>
      <Cyl x={8} y={2.2} r={0.9} h={2.6} />
      <Cyl x={10.4} y={2.2} r={0.9} h={2.6} />
      <Cyl x={8} y={5.6} r={0.9} h={2.6} accent={C.red} />
      <Cyl x={10.4} y={5.6} r={0.9} h={2.6} />
      <Box x={1.6} y={5.6} w={4} d={1.4} h={0.5} />
    </>
  );
}

function Shipping() {
  const stacks: React.ReactNode[] = [];
  const spec: [number, number, number][] = [[1.4, 1.6, 3], [1.4, 3.0, 2], [3.8, 1.6, 2], [3.8, 3.0, 3], [6.2, 1.6, 1], [6.2, 3.0, 2]];
  spec.forEach(([x, y, n], i) => {
    for (let k = 0; k < n; k++) {
      stacks.push(
        <Box key={`${i}-${k}`} x={x} y={y} z={k * 0.9} w={2.2} d={1.2} h={0.9} left={k === 1 && i === 3 ? C.redLeft : C.left} right={k === 1 && i === 3 ? C.redRight : C.right} top={k === 1 && i === 3 ? C.red : C.top} />
      );
    }
  });
  return (
    <>
      <Slab w={12} d={9}>
        <polygon points={pts([[9.2, 0, 0], [12, 0, 0], [12, 9, 0], [9.2, 9, 0]])} fill={C.water} />
        <polygon points={pts([[0, 5.4, 0], [9.2, 5.4, 0], [9.2, 6.6, 0], [0, 6.6, 0]])} fill={C.road} />
      </Slab>
      {stacks}
      <Box x={8.2} y={2.4} w={0.18} d={0.18} h={3.6} />
      <Box x={8.2} y={5.2} w={0.18} d={0.18} h={3.6} />
      <Box x={8.2} y={2.4} z={3.6} w={0.18} d={2.98} h={0.18} />
    </>
  );
}

function Building() {
  return (
    <>
      <Slab w={12} d={10}>
        <Cable d={path([3.4, 5.4], [9, 5.4])} />
      </Slab>
      <Box x={1.2} y={1.2} w={2.6} d={2.4} h={4.2}>
        <LF b={{ x: 1.2, y: 1.2, w: 2.6, d: 2.4, h: 4.2 }} u0={0.05} v0={0.96} u1={0.95} v1={0.96} stroke={C.red} width={1.5} />
        {[0.2, 0.35, 0.5, 0.65, 0.8].map((v) => (
          <LF key={v} b={{ x: 1.2, y: 1.2, w: 2.6, d: 2.4, h: 4.2 }} u0={0.08} v0={v} u1={0.92} v1={v} opacity={0.5} />
        ))}
      </Box>
      <Box x={5} y={1.2} w={2.4} d={2.4} h={2.8} />
      <Box x={8.6} y={1.6} w={2.4} d={2} h={1.8} />
      <Box x={2} y={6} w={3} d={2.2} h={1.2} />
      <Box x={6.4} y={6.4} w={3.6} d={1.8} h={0.9} />
    </>
  );
}

function GridCampus() {
  const hall = { x: 8.2, y: 5.4, z: 0, w: 3.6, d: 3, h: 2 };
  const ctrl = { x: 8, y: 1.2, z: 0, w: 3, d: 2.4, h: 1.6 };
  return (
    <>
      <Slab w={13} d={11}>
        <Cable d={path([4.1, 5.35], [5.3, 5.35])} />
        <Cable d={path([4.1, 7.15], [5.3, 7.15])} />
        <Cable d={path([5.3, 4.4], [9.5, 4.4], [9.5, 3.6])} />
        <Cable d={path([5.3, 6.2], [8.2, 6.2])} />
        <Cable d={path([5.3, 7.8], [5.3, 9])} />
      </Slab>
      <Pylon x={1.2} y={2.4} />
      <Transformer x={2.2} y={4.6} />
      <Box {...ctrl}>
        <Box x={8.4} y={1.5} z={1.6} w={0.9} d={0.9} h={0.3} {...RED} />
        <LF b={ctrl} u0={0.12} v0={0.4} u1={0.88} v1={0.4} opacity={0.6} />
        <LF b={ctrl} u0={0.12} v0={0.7} u1={0.88} v1={0.7} opacity={0.6} />
        <LF b={ctrl} u0={0} v0={0.94} u1={1} v1={0.94} stroke={C.red} width={1.5} />
      </Box>
      <Transformer x={2.2} y={6.4} />
      <Gantry x={5.2} y0={4.2} y1={7.8} />
      {[1.8, 4.2, 6.6].map((x) => (
        <BessUnit key={x} x={x} y={9} w={2.2} />
      ))}
      <Box {...hall}>
        {[0.2, 0.42, 0.64].map((v) => (
          <LF key={v} b={hall} u0={0.04} v0={v} u1={0.96} v1={v} opacity={0.8} />
        ))}
        {[0.2, 0.4, 0.6, 0.8].map((u) => (
          <LF key={u} b={hall} u0={u} v0={0.08} u1={u} v1={0.92} opacity={0.35} />
        ))}
        <LF b={hall} u0={0} v0={0.93} u1={1} v1={0.93} stroke={C.red} width={1.6} />
        <Box x={8.7} y={5.9} z={2} w={1} d={1} h={0.4} top="#FAFAF9" />
        <Box x={10.2} y={5.9} z={2} w={1} d={1} h={0.4} top="#FAFAF9" />
      </Box>
    </>
  );
}

const SCENES: Record<SceneKey, { Comp: () => React.JSX.Element; vb: string }> = {
  datacenter: { Comp: () => <DataCenter />, vb: "205 130 640 450" },
  bess: { Comp: () => <Bess />, vb: "235 170 630 420" },
  renewable: { Comp: () => <Renewable />, vb: "205 100 650 490" },
  substation: { Comp: () => <Substation />, vb: "205 110 630 470" },
  switchgear: { Comp: () => <Switchgear />, vb: "262 150 550 380" },
  industrial: { Comp: () => <Industrial />, vb: "205 170 630 420" },
  water: { Comp: () => <Water />, vb: "235 190 580 370" },
  hydrogen: { Comp: () => <Hydrogen />, vb: "235 180 600 390" },
  shipping: { Comp: () => <Shipping />, vb: "258 170 560 370" },
  building: { Comp: () => <Building />, vb: "232 105 580 450" },
  grid: { Comp: () => <GridCampus />, vb: "205 105 630 475" },
};

/** Isometric grey/white infrastructure illustration with red accents. */
export function IsoScene({
  scene,
  className,
  label,
}: {
  scene: SceneKey;
  className?: string;
  label?: string;
}) {
  const { Comp, vb } = SCENES[scene];
  return (
    <svg
      viewBox={vb}
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      preserveAspectRatio="xMidYMid meet"
    >
      <Comp />
    </svg>
  );
}
