"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, useSyncExternalStore } from "react";
import { EASE } from "./motion";

type Mode = "default" | "link" | "view";

const MQ = "(hover: hover) and (pointer: fine)";
const RM = "(prefers-reduced-motion: reduce)";
const subscribe = (cb: () => void) => {
  const a = window.matchMedia(MQ);
  const b = window.matchMedia(RM);
  a.addEventListener("change", cb);
  b.addEventListener("change", cb);
  return () => {
    a.removeEventListener("change", cb);
    b.removeEventListener("change", cb);
  };
};
const snapshot = () => window.matchMedia(MQ).matches && !window.matchMedia(RM).matches;

/**
 * Dot that grows into a ring over interactive elements and into a "View" disc
 * over `[data-cursor="view"]`. Fine pointers only; off for reduced motion.
 */
export function Cursor() {
  const enabled = useSyncExternalStore(subscribe, snapshot, () => false);
  const [mode, setMode] = useState<Mode>("default");
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 260, damping: 28, mass: 0.5 });

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-custom-cursor");

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = e.target as Element | null;
      if (t?.closest('[data-cursor="view"]')) setMode("view");
      else if (t?.closest("a, button, [role='button'], [data-cursor]")) setMode("link");
      else setMode("default");
    };
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = mode === "view" ? 84 : mode === "link" ? 46 : 8;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[200] h-2 w-2 -ml-1 -mt-1 rounded-full bg-signal"
        style={{ x, y, opacity: visible && mode !== "view" ? 1 : 0 }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[199] flex items-center justify-center rounded-full border text-[11px] font-semibold uppercase tracking-[0.14em] text-white"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: size,
          height: size,
          opacity: visible ? (mode === "default" ? 0 : 1) : 0,
          backgroundColor: mode === "view" ? "rgba(200,40,26,0.96)" : "rgba(200,40,26,0)",
          borderColor: mode === "view" ? "rgba(200,40,26,0)" : "rgba(200,40,26,0.9)",
        }}
        transition={{ duration: 0.3, ease: EASE }}
      >
        {mode === "view" && "View"}
      </motion.div>
    </>
  );
}
