"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useReducedMotion } from "./use-reduced-motion";
import { useIntro } from "./intro";
import { DUR, EASE } from "./motion";

const SEEN_KEY = "infoelex:intro-seen";

type Phase = "draw" | "exit" | "done";

const subscribe = () => () => {};
const readSeen = () => {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
};

/**
 * Under 1.5s: the existing Infoelex wordmark strokes itself in, then the
 * curtain lifts and the hero choreography starts. Shown once per session.
 */
export function Preloader() {
  const { setReady } = useIntro();
  const reduce = useReducedMotion();
  const seen = useSyncExternalStore(subscribe, readSeen, () => false);
  const skip = seen || !!reduce;
  const [phase, setPhase] = useState<Phase>("draw");

  useEffect(() => {
    if (skip) {
      setReady(true);
      return;
    }

    document.documentElement.style.overflow = "hidden";

    const exitAt = 900;
    const toExit = setTimeout(() => setPhase("exit"), exitAt);
    const toReady = setTimeout(() => setReady(true), exitAt + 100);
    const toDone = setTimeout(() => {
      setPhase("done");
      document.documentElement.style.overflow = "";
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {}
    }, exitAt + DUR.wipe * 1000 + 40);

    return () => {
      clearTimeout(toExit);
      clearTimeout(toReady);
      clearTimeout(toDone);
      document.documentElement.style.overflow = "";
    };
  }, [skip, setReady]);

  if (skip) return null;

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="curtain"
          aria-hidden="true"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-graphite-950"
          initial={{ y: 0 }}
          animate={{ y: phase === "exit" ? "-100%" : 0 }}
          transition={{ duration: DUR.wipe, ease: EASE }}
        >
          <div className="flex flex-col items-center gap-3">
              <svg viewBox="0 0 300 70" className="h-14 w-auto sm:h-16" fill="none">
                <motion.text
                  x="150"
                  y="52"
                  textAnchor="middle"
                  fontFamily="var(--font-geist-sans), Arial, sans-serif"
                  fontSize="58"
                  fontWeight="800"
                  fontStyle="italic"
                  letterSpacing="-2"
                  stroke="#df2c1c"
                  strokeWidth="1.4"
                  strokeDasharray="420"
                  initial={{ strokeDashoffset: 420, fill: "rgba(223,44,28,0)" }}
                  animate={{ strokeDashoffset: 0, fill: "rgba(223,44,28,1)" }}
                  transition={{
                    strokeDashoffset: { duration: 0.7, ease: EASE },
                    fill: { duration: 0.35, delay: 0.55, ease: EASE },
                  }}
                >
                  Infoelex
                </motion.text>
              </svg>
              <motion.span
                className="text-[10px] font-medium tracking-[0.22em] text-white/50 uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === "exit" ? 0 : 1 }}
                transition={{ duration: 0.4, delay: phase === "exit" ? 0 : 0.5, ease: EASE }}
              >
                Information Electrical Technologies
              </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
