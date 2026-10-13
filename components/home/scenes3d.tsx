"use client";

import { Edges, Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { SceneKey } from "./content";

/* Architectural-model style 3D scenes: pale clay materials, crisp edges, red accents.
   World axes: X right-down, Z left-down (towards the viewer), Y up, so the layouts
   match the 2D isometric illustrations used elsewhere on the page. */

export const COL = {
  ground: "#E9E9E6",
  plinth: "#CFD0D3",
  white: "#F5F5F3",
  concrete: "#DEDFE1",
  mid: "#C4C6CA",
  dark: "#2A2F36",
  glass: "#9DB0C0",
  metal: "#A9AFB7",
  red: "#C8281A",
  redDark: "#8C1B0C",
  water: "#B9CCDA",
  panel: "#27313D",
  edge: "#8C9097",
  road: "#CBCCCF",
};

/* ─── Textures (drawn once) ─────────────────────────────────── */

function drawFacade(cols: number, rows: number): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 512;
  const g = c.getContext("2d")!;
  g.fillStyle = "#F1F1EF";
  g.fillRect(0, 0, 512, 512);
  const cw = 512 / cols;
  const rh = 512 / rows;
  for (let r = 0; r < rows; r++) {
    for (let k = 0; k < cols; k++) {
      const x = k * cw + cw * 0.18;
      const y = r * rh + rh * 0.22;
      g.fillStyle = "#8FA3B4";
      g.fillRect(x, y, cw * 0.64, rh * 0.56);
      g.fillStyle = "rgba(255,255,255,0.35)";
      g.fillRect(x, y, cw * 0.64, rh * 0.18);
    }
    g.fillStyle = "#D5D6D8";
    g.fillRect(0, r * rh + rh * 0.9, 512, rh * 0.1);
  }
  return c;
}

function drawSolar(): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 256;
  const g = c.getContext("2d")!;
  g.fillStyle = "#1F2933";
  g.fillRect(0, 0, 512, 256);
  g.strokeStyle = "#5A6B7C";
  g.lineWidth = 1.5;
  for (let i = 0; i <= 12; i++) {
    g.beginPath();
    g.moveTo((i * 512) / 12, 0);
    g.lineTo((i * 512) / 12, 256);
    g.stroke();
  }
  for (let j = 0; j <= 5; j++) {
    g.beginPath();
    g.moveTo(0, (j * 256) / 5);
    g.lineTo(512, (j * 256) / 5);
    g.stroke();
  }
  g.strokeStyle = "#CBD3DA";
  g.lineWidth = 6;
  g.strokeRect(0, 0, 512, 256);
  return c;
}

function useCanvasTexture(make: () => HTMLCanvasElement) {
  return useMemo(() => {
    const t = new THREE.CanvasTexture(make());
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    return t;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/* ─── Primitives ────────────────────────────────────────────── */

type BoxProps = {
  x: number;
  z: number;
  w: number;
  d: number;
  h: number;
  y?: number;
  color?: string;
  edges?: boolean;
  metalness?: number;
  roughness?: number;
};

export function Box({ x, z, w, d, h, y = 0, color = COL.white, edges = true, metalness = 0.05, roughness = 0.85 }: BoxProps) {
  return (
    <mesh position={[x + w / 2, y + h / 2, z + d / 2]} castShadow receiveShadow>
      <boxGeometry args={[w, h, d]} />
      <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      {edges && <Edges color={COL.edge} threshold={20} />}
    </mesh>
  );
}

/** A box whose four sides carry a window-grid facade. */
function Tower({ x, z, w, d, h, y = 0, cols, rows }: BoxProps & { cols: number; rows: number }) {
  const tex = useCanvasTexture(() => drawFacade(cols, rows));
  const mats = useMemo(() => {
    const side = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.7, metalness: 0.05 });
    const top = new THREE.MeshStandardMaterial({ color: COL.concrete, roughness: 0.9 });
    return [side, side, top, top, side, side];
  }, [tex]);
  return (
    <mesh position={[x + w / 2, y + h / 2, z + d / 2]} castShadow receiveShadow material={mats}>
      <boxGeometry args={[w, h, d]} />
      <Edges color={COL.edge} threshold={20} />
    </mesh>
  );
}

function Cyl({
  x, z, r, h, y = 0, color = COL.white, rTop,
}: { x: number; z: number; r: number; h: number; y?: number; color?: string; rTop?: number }) {
  return (
    <mesh position={[x, y + h / 2, z]} castShadow receiveShadow>
      <cylinderGeometry args={[rTop ?? r, r, h, 48]} />
      <meshStandardMaterial color={color} metalness={0.1} roughness={0.7} />
    </mesh>
  );
}

function Ring({ x, z, y, r, color = COL.red }: { x: number; z: number; y: number; r: number; color?: string }) {
  return (
    <mesh position={[x, y, z]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[r + 0.005, 0.045, 12, 64]} />
      <meshStandardMaterial color={color} roughness={0.5} />
    </mesh>
  );
}

function Plane({ x, z, w, d, y = 0.012, color }: { x: number; z: number; w: number; d: number; y?: number; color: string }) {
  return (
    <mesh position={[x + w / 2, y, z + d / 2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[w, d]} />
      <meshStandardMaterial color={color} roughness={0.9} />
    </mesh>
  );
}

function Cable({ pts }: { pts: [number, number][] }) {
  return <Line points={pts.map(([x, z]) => new THREE.Vector3(x, 0.05, z))} color={COL.red} lineWidth={2} />;
}

/** Horizontal slats / louvres on the +Z face and +X face of a box. */
function Slats({ x, z, w, d, h, y = 0, rows = 6, color = COL.mid }: { x: number; z: number; w: number; d: number; h: number; y?: number; rows?: number; color?: string }) {
  const items = [];
  for (let i = 0; i < rows; i++) {
    const yy = y + h * 0.18 + ((h * 0.6) / Math.max(1, rows - 1)) * i;
    items.push(
      <mesh key={`z${i}`} position={[x + w / 2, yy, z + d + 0.02]}>
        <boxGeometry args={[w * 0.92, 0.045, 0.05]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>,
      <mesh key={`x${i}`} position={[x + w + 0.02, yy, z + d / 2]}>
        <boxGeometry args={[0.05, 0.045, d * 0.92]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
    );
  }
  return <>{items}</>;
}

/** Thin red band running around the top of a box. */
function RedBand({ x, z, w, d, h, y = 0, t = 0.09 }: { x: number; z: number; w: number; d: number; h: number; y?: number; t?: number }) {
  const yy = y + h - t / 2 - 0.04;
  return (
    <>
      <mesh position={[x + w / 2, yy, z + d + 0.015]}>
        <boxGeometry args={[w + 0.02, t, 0.03]} />
        <meshStandardMaterial color={COL.red} roughness={0.5} />
      </mesh>
      <mesh position={[x + w + 0.015, yy, z + d / 2]}>
        <boxGeometry args={[0.03, t, d + 0.02]} />
        <meshStandardMaterial color={COL.red} roughness={0.5} />
      </mesh>
    </>
  );
}

function Glass({ x, z, w, d, y, h, face = "z" }: { x: number; z: number; w: number; d: number; y: number; h: number; face?: "z" | "x" }) {
  return face === "z" ? (
    <mesh position={[x + w / 2, y + h / 2, z + d + 0.02]}>
      <boxGeometry args={[w, h, 0.04]} />
      <meshStandardMaterial color={COL.glass} metalness={0.5} roughness={0.15} />
    </mesh>
  ) : (
    <mesh position={[x + w + 0.02, y + h / 2, z + d / 2]}>
      <boxGeometry args={[0.04, h, d]} />
      <meshStandardMaterial color={COL.glass} metalness={0.5} roughness={0.15} />
    </mesh>
  );
}

function Slab({ w, d, children }: { w: number; d: number; children?: React.ReactNode }) {
  return (
    <group>
      <mesh position={[w / 2, -0.25, d / 2]} receiveShadow castShadow>
        <boxGeometry args={[w, 0.5, d]} />
        <meshStandardMaterial color={COL.plinth} roughness={0.9} />
      </mesh>
      <mesh position={[w / 2, 0.003, d / 2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[w, d]} />
        <meshStandardMaterial color={COL.ground} roughness={0.95} />
      </mesh>
      <gridHelper args={[Math.max(w, d), Math.max(w, d) / 2, "#C9CACD", "#DADBDD"]} position={[w / 2, 0.012, d / 2]} scale={[w / Math.max(w, d), 1, d / Math.max(w, d)]} />
      {children}
    </group>
  );
}

/* ─── Equipment ─────────────────────────────────────────────── */

function Transformer({ x, z }: { x: number; z: number }) {
  return (
    <group>
      <Box x={x} z={z} w={1.9} d={1.5} h={0.12} color="#D9DADC" />
      <Box x={x + 0.3} z={z + 0.25} w={1.3} d={1.0} h={0.9} y={0.12} color={COL.concrete} metalness={0.2} roughness={0.55} />
      {[0.15, 0.3, 0.45, 0.6, 0.75, 0.9].map((u) => (
        <mesh key={u} position={[x + 1.62, 0.55, z + 0.25 + u]}>
          <boxGeometry args={[0.08, 0.7, 0.06]} />
          <meshStandardMaterial color={COL.mid} roughness={0.6} />
        </mesh>
      ))}
      {[0.25, 0.55, 0.85].map((u) => (
        <Cyl key={u} x={x + 0.3 + u * 1.3} z={z + 0.75} r={0.07} h={0.4} y={1.02} color={COL.white} />
      ))}
      <Box x={x + 0.6} z={z + 0.45} w={0.5} d={0.5} h={0.2} y={1.02} color={COL.red} edges={false} />
    </group>
  );
}

function Gantry({ x, z0, z1 }: { x: number; z0: number; z1: number }) {
  const h = 2;
  return (
    <group>
      <Cyl x={x} z={z0} r={0.07} h={h} color={COL.metal} />
      <Cyl x={x} z={z1} r={0.07} h={h} color={COL.metal} />
      <mesh position={[x, h, (z0 + z1) / 2]}>
        <boxGeometry args={[0.1, 0.1, z1 - z0]} />
        <meshStandardMaterial color={COL.metal} metalness={0.4} roughness={0.4} />
      </mesh>
      {[0.25, 0.5, 0.75].map((u) => (
        <Cyl key={u} x={x} z={z0 + (z1 - z0) * u} r={0.06} h={0.35} y={h - 0.35} color={COL.red} />
      ))}
    </group>
  );
}

function Pylon({ x, z, h = 5 }: { x: number; z: number; h?: number }) {
  const b = 0.45;
  const legs: [number, number][] = [[-b, -b], [b, -b], [b, b], [-b, b]];
  const col = COL.metal;
  const segs: [number, number, number][][] = [];
  legs.forEach(([lx, lz]) => segs.push([[x + lx, 0, z + lz], [x, h, z]]));
  [0.25, 0.5, 0.72].forEach((t) => {
    const s = b * (1 - t);
    const yy = h * t;
    const ring: [number, number, number][] = [[-s, yy, -s], [s, yy, -s], [s, yy, s], [-s, yy, s], [-s, yy, -s]].map(([a, bb, c]) => [x + a, bb, z + c]);
    segs.push(ring);
  });
  const arm = (yy: number, half: number): [number, number, number][] => [[x, yy, z - half], [x, yy, z + half]];
  segs.push(arm(h * 0.82, 1.5), arm(h * 0.62, 1.1));
  return (
    <group>
      {segs.map((pts, i) => (
        <Line key={i} points={pts.map((p) => new THREE.Vector3(...p))} color={col} lineWidth={1.4} />
      ))}
    </group>
  );
}

function BessUnit({ x, z, w = 2.2 }: { x: number; z: number; w?: number }) {
  const d = 1.1;
  const h = 1.05;
  return (
    <group>
      <Box x={x} z={z} w={w} d={d} h={h} color={COL.white} metalness={0.15} roughness={0.55} />
      <RedBand x={x} z={z} w={w} d={d} h={0.3} y={0.1} t={0.07} />
      {[0.6, 0.68, 0.76, 0.84].map((u) => (
        <mesh key={u} position={[x + w * u, h * 0.62, z + d + 0.02]}>
          <boxGeometry args={[0.025, h * 0.4, 0.03]} />
          <meshStandardMaterial color={COL.mid} />
        </mesh>
      ))}
      <mesh position={[x + w * 0.5, h * 0.5, z + d + 0.02]}>
        <boxGeometry args={[0.025, h * 0.86, 0.03]} />
        <meshStandardMaterial color={COL.mid} />
      </mesh>
      <Box x={x + w * 0.1} z={z + 0.25} w={0.5} d={0.5} h={0.14} y={h} color={COL.mid} edges={false} />
    </group>
  );
}

function SolarTable({ x, z, w = 2.4, d = 1.2 }: { x: number; z: number; w?: number; d?: number }) {
  const tex = useCanvasTexture(drawSolar);
  const tilt = 0.45;
  return (
    <group position={[x + w / 2, 0.35, z + d / 2]}>
      <mesh rotation={[-tilt, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[w, 0.06, d]} />
        <meshStandardMaterial map={tex} metalness={0.5} roughness={0.28} />
      </mesh>
      <Cyl x={-w * 0.3} z={d * 0.3} r={0.04} h={0.4} y={-0.38} color={COL.metal} />
      <Cyl x={w * 0.3} z={d * 0.3} r={0.04} h={0.4} y={-0.38} color={COL.metal} />
    </group>
  );
}

function Turbine({ x, z, speed = 0.7, phase = 0 }: { x: number; z: number; speed?: number; phase?: number }) {
  const rotor = useRef<THREE.Group>(null);
  const hubY = 5.4;
  useFrame((_, dt) => {
    if (rotor.current) rotor.current.rotation.z += dt * speed;
  });
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, hubY / 2, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.16, hubY, 24]} />
        <meshStandardMaterial color={COL.white} roughness={0.5} />
      </mesh>
      <mesh position={[0, hubY, 0.12]} castShadow>
        <boxGeometry args={[0.22, 0.24, 0.6]} />
        <meshStandardMaterial color={COL.white} roughness={0.5} />
      </mesh>
      <group position={[0, hubY, 0.5]} rotation={[0, 0, phase]} ref={rotor}>
        <mesh>
          <sphereGeometry args={[0.13, 20, 20]} />
          <meshStandardMaterial color={COL.red} roughness={0.4} />
        </mesh>
        {[0, 120, 240].map((a) => (
          <group key={a} rotation={[0, 0, (a * Math.PI) / 180]}>
            <mesh position={[0, 1.15, 0]} castShadow>
              <boxGeometry args={[0.16, 2.3, 0.025]} />
              <meshStandardMaterial color={COL.white} roughness={0.4} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

/* ─── Scenes ────────────────────────────────────────────────── */

function DataCenter() {
  return (
    <>
      <Slab w={13} d={11}>
        <Plane x={0} z={6.6} w={13} d={1} color={COL.road} />
        <Cable pts={[[4.5, 8], [4.5, 5.2]]} />
        <Cable pts={[[4.5, 8], [10.5, 8], [10.5, 5]]} />
      </Slab>
      <Box x={2.4} z={1.2} w={6.4} d={4} h={2.2} />
      <Slats x={2.4} z={1.2} w={6.4} d={4} h={2.2} rows={5} />
      <RedBand x={2.4} z={1.2} w={6.4} d={4} h={2.2} />
      {[[3.2, 1.9], [4.9, 1.9], [6.6, 1.9], [4.0, 3.3], [5.8, 3.3]].map(([x, z]) => (
        <group key={`${x}-${z}`}>
          <Box x={x} z={z} w={1.1} d={1.1} h={0.45} y={2.2} color={COL.white} />
          <Cyl x={x + 0.55} z={z + 0.55} r={0.4} h={0.03} y={2.65} color={COL.dark} />
        </group>
      ))}
      <Box x={9.6} z={1.6} w={2.4} d={2.2} h={1.3} />
      <Glass x={9.8} z={1.6} w={2} d={2.2} y={0.5} h={0.5} />
      {[0, 1, 2, 3].map((i) => (
        <group key={i}>
          <Box x={2.2 + i * 1.7} z={8.2} w={1.3} d={1.2} h={0.9} />
          <Box x={2.6 + i * 1.7} z={8.5} w={0.4} d={0.4} h={0.25} y={0.9} color={COL.red} edges={false} />
        </group>
      ))}
      <Transformer x={9.6} z={8} />
    </>
  );
}

function Bess() {
  return (
    <>
      <Slab w={14} d={10}>
        <Cable pts={[[2.4, 5.2], [12.2, 5.2]]} />
        <Cable pts={[[4, 5.2], [4, 3.6]]} />
        <Cable pts={[[8.4, 5.2], [8.4, 3.6]]} />
        <Cable pts={[[4, 5.2], [4, 6.6]]} />
        <Cable pts={[[8.4, 5.2], [8.4, 6.6]]} />
      </Slab>
      {[0, 1, 2, 3].map((i) => (
        <BessUnit key={`a${i}`} x={1.6 + i * 2.8} z={1.4} w={2.4} />
      ))}
      <Box x={1.2} z={4.6} w={1.4} d={1.2} h={1.1} />
      <Box x={1.5} z={4.8} w={0.5} d={0.5} h={0.25} y={1.1} color={COL.red} edges={false} />
      {[0, 1, 2, 3].map((i) => (
        <BessUnit key={`b${i}`} x={1.6 + i * 2.8} z={6.6} w={2.4} />
      ))}
      <Transformer x={11.4} z={3.8} />
    </>
  );
}

function Renewable() {
  const tables = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) tables.push(<SolarTable key={`${r}-${c}`} x={1 + c * 2.7} z={4.6 + r * 2.2} />);
  return (
    <>
      <Slab w={14} d={11}>
        <Cable pts={[[2, 4.2], [12.6, 4.2], [12.6, 1.8]]} />
      </Slab>
      <Turbine x={3} z={1.4} speed={0.7} />
      <Turbine x={7.4} z={1.4} speed={0.55} phase={1} />
      <Box x={11.4} z={0.6} w={2} d={1.8} h={1.2} />
      <Box x={11.7} z={0.9} w={0.6} d={0.6} h={0.3} y={1.2} color={COL.red} edges={false} />
      {tables}
    </>
  );
}

function Substation() {
  return (
    <>
      <Slab w={13} d={11}>
        <Cable pts={[[3.2, 5.6], [8, 5.6]]} />
        <Cable pts={[[3.2, 7.4], [8, 7.4]]} />
      </Slab>
      <Pylon x={1.2} z={3.2} />
      <Pylon x={10.8} z={3.2} />
      <Transformer x={2.4} z={4.8} />
      <Transformer x={2.4} z={6.6} />
      <Gantry x={8} z0={4.4} z1={8.2} />
      <Box x={9.6} z={6} w={2.4} d={2} h={1.3} />
      <Glass x={9.8} z={6} w={2} d={2} y={0.5} h={0.5} />
      <RedBand x={9.6} z={6} w={2.4} d={2} h={1.3} />
    </>
  );
}

function Switchgear() {
  return (
    <>
      <Slab w={12} d={9}>
        <Cable pts={[[2, 6], [10, 6]]} />
      </Slab>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <group key={i}>
          <Box x={1.6 + i * 1.5} z={2.6} w={1.2} d={1.4} h={1.7} metalness={0.2} roughness={0.5} />
          <mesh position={[1.6 + i * 1.5 + 0.6, 0.85, 4.02]}>
            <boxGeometry args={[0.03, 1.4, 0.03]} />
            <meshStandardMaterial color={COL.mid} />
          </mesh>
          <mesh position={[1.6 + i * 1.5 + 0.6, 1.25, 4.03]}>
            <boxGeometry args={[0.9, 0.05, 0.03]} />
            <meshStandardMaterial color={i === 2 ? COL.red : COL.mid} />
          </mesh>
        </group>
      ))}
      <Box x={3.2} z={5.4} w={4.8} d={1.6} h={0.7} color={COL.glass} metalness={0.4} roughness={0.2} />
    </>
  );
}

function Industrial() {
  return (
    <>
      <Slab w={13} d={11}>
        <Cable pts={[[2, 8], [11, 8]]} />
      </Slab>
      <Box x={1.2} z={1.2} w={6} d={3.6} h={1.6} />
      <Slats x={1.2} z={1.2} w={6} d={3.6} h={1.6} rows={4} />
      <RedBand x={1.2} z={1.2} w={6} d={3.6} h={1.6} />
      <Box x={1.2} z={5.2} w={4} d={2.4} h={1.2} />
      <Cyl x={9} z={2} r={0.5} h={5} />
      <Ring x={9} z={2} y={4.4} r={0.5} />
      <Cyl x={10.4} z={3} r={0.4} h={3.6} />
      <Ring x={10.4} z={3} y={3.1} r={0.4} />
      <Box x={7.6} z={4.6} w={3.4} d={1.4} h={0.5} />
      <Box x={8.4} z={7.4} w={2.6} d={1.8} h={1.2} />
    </>
  );
}

function Water() {
  return (
    <>
      <Slab w={12} d={10}>
        <Plane x={0} z={6.8} w={12} d={1.4} color={COL.water} />
        <Cable pts={[[3, 4.4], [9.6, 4.4]]} />
      </Slab>
      {[[3, 3, 1.4, 1.2], [6.2, 3, 1.4, 1.2]].map(([x, z, r, h]) => (
        <group key={x}>
          <Cyl x={x} z={z} r={r} h={h} />
          <mesh position={[x, h + 0.005, z]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[r - 0.12, 48]} />
            <meshStandardMaterial color={COL.water} roughness={0.15} metalness={0.2} />
          </mesh>
        </group>
      ))}
      <Cyl x={9.4} z={3} r={1.2} h={2.4} />
      <Ring x={9.4} z={3} y={2.0} r={1.2} />
      <Box x={2} z={5.4} w={3.4} d={1.2} h={1} />
      <Box x={6.4} z={5.4} w={2} d={1.2} h={1} />
      <Box x={6.7} z={5.6} w={0.5} d={0.5} h={0.25} y={1} color={COL.red} edges={false} />
    </>
  );
}

function Hydrogen() {
  const spheres: [number, number][] = [[8, 2.2], [10.4, 2.2], [8, 5.6], [10.4, 5.6]];
  return (
    <>
      <Slab w={13} d={10}>
        <Cable pts={[[3.4, 4.6], [10.6, 4.6]]} />
      </Slab>
      <Box x={1.2} z={1.2} w={4.4} d={3} h={1.6} />
      <RedBand x={1.2} z={1.2} w={4.4} d={3} h={1.6} />
      <Slats x={1.2} z={1.2} w={4.4} d={3} h={1.6} rows={3} />
      {spheres.map(([x, z], i) => (
        <group key={`${x}-${z}`}>
          <mesh position={[x, 1.75, z]} castShadow receiveShadow>
            <sphereGeometry args={[0.9, 40, 40]} />
            <meshStandardMaterial color={COL.white} metalness={0.25} roughness={0.35} />
          </mesh>
          {i === 2 && <Ring x={x} z={z} y={1.75} r={0.9} />}
          {[0, 90, 180, 270].map((a) => (
            <Cyl key={a} x={x + Math.cos((a * Math.PI) / 180) * 0.6} z={z + Math.sin((a * Math.PI) / 180) * 0.6} r={0.05} h={1} color={COL.metal} />
          ))}
        </group>
      ))}
      <Box x={1.6} z={5.6} w={4} d={1.4} h={0.5} />
    </>
  );
}

function Shipping() {
  const spec: [number, number, number][] = [[1.4, 1.6, 3], [1.4, 3.0, 2], [3.8, 1.6, 2], [3.8, 3.0, 3], [6.2, 1.6, 1], [6.2, 3.0, 2]];
  const stacks: React.ReactNode[] = [];
  spec.forEach(([x, z, n], i) => {
    for (let k = 0; k < n; k++) {
      const red = i === 3 && k === 1;
      stacks.push(<Box key={`${i}-${k}`} x={x} z={z} w={2.2} d={1.2} h={0.9} y={k * 0.9} color={red ? COL.red : k % 2 ? COL.white : COL.concrete} metalness={0.2} roughness={0.5} />);
    }
  });
  return (
    <>
      <Slab w={12} d={9}>
        <Plane x={9.2} z={0} w={2.8} d={9} color={COL.water} />
        <Plane x={0} z={5.4} w={9.2} d={1.2} color={COL.road} />
      </Slab>
      {stacks}
      <Cyl x={8.3} z={2.5} r={0.09} h={3.6} color={COL.metal} />
      <Cyl x={8.3} z={5.3} r={0.09} h={3.6} color={COL.metal} />
      <Box x={8.2} z={2.4} w={0.2} d={3} h={0.18} y={3.6} color={COL.metal} />
      <Box x={8.2} z={2.4} w={1.6} d={0.14} h={0.14} y={3.7} color={COL.red} edges={false} />
    </>
  );
}

function BuildingScene() {
  return (
    <>
      <Slab w={12} d={10}>
        <Cable pts={[[3.4, 5.4], [9, 5.4]]} />
      </Slab>
      <Tower x={1.2} z={1.2} w={2.6} d={2.4} h={4.2} cols={4} rows={9} />
      <Tower x={5} z={1.2} w={2.4} d={2.4} h={2.8} cols={4} rows={6} />
      <Tower x={8.6} z={1.6} w={2.4} d={2} h={1.8} cols={4} rows={4} />
      <Box x={2} z={6} w={3} d={2.2} h={1.2} />
      <Box x={6.4} z={6.4} w={3.6} d={1.8} h={0.9} />
      <Box x={1.2} z={1.2} w={2.6} d={2.4} h={0.12} y={4.2} color={COL.red} edges={false} />
    </>
  );
}

function GridCampus() {
  return <Substation />;
}

export const SCENE_3D: Record<SceneKey, { Comp: () => React.JSX.Element; size: [number, number] }> = {
  datacenter: { Comp: DataCenter, size: [13, 11] },
  bess: { Comp: Bess, size: [14, 10] },
  renewable: { Comp: Renewable, size: [14, 11] },
  substation: { Comp: Substation, size: [13, 11] },
  switchgear: { Comp: Switchgear, size: [12, 9] },
  industrial: { Comp: Industrial, size: [13, 11] },
  water: { Comp: Water, size: [12, 10] },
  hydrogen: { Comp: Hydrogen, size: [13, 10] },
  shipping: { Comp: Shipping, size: [12, 9] },
  building: { Comp: BuildingScene, size: [12, 10] },
  grid: { Comp: GridCampus, size: [13, 11] },
};
