"use client";

import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import type * as THREE from "three";
import type { SceneKey } from "./content";
import { SCENE_3D } from "./scenes3d";

/** Re-centres the model and eases it in whenever the service changes. */
function Stage({ scene }: { scene: SceneKey }) {
  const group = useRef<THREE.Group>(null);
  const t = useRef(0);
  const { Comp, size } = SCENE_3D[scene];

  useEffect(() => {
    t.current = 0;
  }, [scene]);

  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    t.current = Math.min(1, t.current + dt * 2.4);
    const e = 1 - Math.pow(1 - t.current, 3);
    g.scale.setScalar(0.9 + 0.1 * e);
    g.position.y = -0.7 * (1 - e);
  });

  return (
    <group ref={group}>
      <group position={[-size[0] / 2, 0, -size[1] / 2]}>
        <Comp />
      </group>
    </group>
  );
}

/** Interactive architectural-model view of a service. Drag to rotate; idles in a slow turn. */
export default function ServiceViewer({
  scene,
  running,
  reduce,
}: {
  scene: SceneKey;
  running: boolean;
  reduce: boolean;
}) {
  return (
    <Canvas
      shadows
      flat
      dpr={[1, 1.75]}
      frameloop={running ? (reduce ? "demand" : "always") : "never"}
      gl={{ antialias: true, alpha: true }}
      style={{ cursor: "grab" }}
    >
      <PerspectiveCamera makeDefault position={[17.5, 18.5, 17.5]} fov={27} />
      <ambientLight intensity={0.85} />
      <hemisphereLight args={["#ffffff", "#d9d9d6", 0.6]} />
      <directionalLight
        position={[9, 15, 7]}
        intensity={2.1}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-14}
        shadow-camera-right={14}
        shadow-camera-top={14}
        shadow-camera-bottom={-14}
        shadow-camera-near={1}
        shadow-camera-far={50}
        shadow-bias={-0.0004}
      />
      <Stage key={scene} scene={scene} />
      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={false}
        enableDamping
        dampingFactor={0.08}
        autoRotate={!reduce}
        autoRotateSpeed={0.55}
        minPolarAngle={0.75}
        maxPolarAngle={1.22}
        target={[0, 0.6, 0]}
      />
    </Canvas>
  );
}
