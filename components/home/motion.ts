/** Single signature easing + shared durations for the homepage. */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const DUR = {
  hover: 0.24,
  reveal: 0.8,
  wipe: 0.65,
} as const;

export type RevealFrom = "up" | "down" | "left" | "right" | "scale";

/** Direction for the i-th card of a `cols`-column grid: edge columns slide in from their own side, the middle rises. */
export function fromCol(i: number, cols: number): RevealFrom {
  if (cols <= 1) return "up";
  const c = i % cols;
  if (c === 0) return "left";
  if (c === cols - 1) return "right";
  return "up";
}
