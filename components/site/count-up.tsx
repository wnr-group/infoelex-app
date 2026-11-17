"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/** Counts the number inside a stat such as "24+", "99.999%" or "$4.2B+" up from zero when it scrolls into view. Text without digits renders as is. */
export function CountUp({ value, duration = 1.6 }: { value: string; duration?: number }) {
  const match = value.match(/^(\D*)(\d[\d,]*\.?\d*)(.*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState<string | null>(null);

  useEffect(() => {
    if (!match || !inView || reduce) return;
    const target = parseFloat(match[2].replace(/,/g, ""));
    const decimals = match[2].includes(".") ? match[2].split(".")[1].length : 0;
    const controls = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })),
      onComplete: () => setDisplay(null),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, value, duration]);

  if (!match) return <>{value}</>;
  return (
    <span ref={ref} className="tabular-nums">
      {match[1]}
      {display ?? match[2]}
      {match[3]}
    </span>
  );
}
