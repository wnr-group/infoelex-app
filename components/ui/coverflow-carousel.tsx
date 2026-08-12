"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ComponentType,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Tunable coverflow geometry — change these to reshape the whole effect ───
const OFFSET_STEP = 40; // translateX(%) applied per index step away from active
const SCALE_STEP = 0.13; // scale reduction per index step away from active
const MAX_VISIBLE_OFFSET = 2; // beyond this |offset|, a slide is fully hidden
const OPACITY_STEP = 0.3; // opacity reduction per index step away from active
const Z_BASE = 10; // zIndex of the active slide; falls off with distance

const MOBILE_OFFSET_STEP = 46;
const MOBILE_SCALE_STEP = 0.08;
const MOBILE_MAX_VISIBLE_OFFSET = 1;

const SLIDE_WIDTH_RATIO = 0.62; // matches the sm:w-[62%] slide width class
const MOBILE_SLIDE_WIDTH_RATIO = 0.82; // matches the w-[82%] slide width class

const MOBILE_BREAKPOINT_QUERY = "(max-width: 639px)";
const DRAG_IGNORE_PX = 40; // drags shorter than this are treated as a tap/click
const TRANSFORM_TRANSITION = "transform 620ms cubic-bezier(0.22, 1, 0.36, 1)";
const OPACITY_TRANSITION = "opacity 500ms ease";

export interface CoverflowSlide {
  id: string;
  image?: string;
  alt?: string;
  eyebrow?: string;
  title: string;
  caption: string;
  icon?: ComponentType<{ className?: string }>;
}

interface CoverflowCarouselProps {
  slides: CoverflowSlide[];
  autoplayMs?: number;
  className?: string;
  /** "dark" (default) expects photographic slides with a dark overlay; "light" renders plain text/icon cards. */
  theme?: "dark" | "light";
  /** Overrides the stage's default aspect-[16/10] sizing, e.g. "h-64 sm:h-72" for compact text cards. */
  stageClassName?: string;
}

function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query]
  );
  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  const getServerSnapshot = useCallback(() => false, []);
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

// Shortest signed distance from `active` to `index` around a circular track.
function circularOffset(index: number, active: number, length: number) {
  let diff = index - active;
  const half = length / 2;
  if (diff > half) diff -= length;
  if (diff < -half) diff += length;
  return diff;
}

export function CoverflowCarousel({
  slides,
  autoplayMs = 5000,
  className,
  theme = "dark",
  stageClassName = "aspect-[16/10]",
}: CoverflowCarouselProps) {
  const isLight = theme === "light";
  const length = slides.length;
  const stageRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);
  const draggedPastThreshold = useRef(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragDeltaPercent, setDragDeltaPercent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacted, setInteracted] = useState(false);

  const isMobile = useMediaQuery(MOBILE_BREAKPOINT_QUERY);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const offsetStep = isMobile ? MOBILE_OFFSET_STEP : OFFSET_STEP;
  const scaleStep = isMobile ? MOBILE_SCALE_STEP : SCALE_STEP;
  const maxVisibleOffset = isMobile ? MOBILE_MAX_VISIBLE_OFFSET : MAX_VISIBLE_OFFSET;
  const slideWidthRatio = isMobile ? MOBILE_SLIDE_WIDTH_RATIO : SLIDE_WIDTH_RATIO;

  const goTo = useCallback(
    (index: number, markInteracted = false) => {
      const wrapped = ((index % length) + length) % length;
      setActiveIndex(wrapped);
      if (markInteracted) setInteracted(true);
    },
    [length]
  );

  // Autoplay: runs until the first manual interaction, then stops for good.
  useEffect(() => {
    if (reducedMotion || interacted || paused) return;
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % length);
    }, autoplayMs);
    return () => clearInterval(id);
  }, [reducedMotion, interacted, paused, autoplayMs, length]);

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(activeIndex - 1, true);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(activeIndex + 1, true);
    }
  }

  function onPointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    if (reducedMotion) return;
    dragStartX.current = e.clientX;
    draggedPastThreshold.current = false;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (!isDragging || dragStartX.current === null) return;
    const deltaPx = e.clientX - dragStartX.current;
    if (Math.abs(deltaPx) >= DRAG_IGNORE_PX) draggedPastThreshold.current = true;
    const stageWidth = stageRef.current?.offsetWidth ?? 1;
    const slideWidthPx = stageWidth * slideWidthRatio;
    setDragDeltaPercent((deltaPx / slideWidthPx) * 100);
  }

  function endDrag() {
    if (!isDragging) return;
    setIsDragging(false);

    if (draggedPastThreshold.current) {
      const stepDelta = Math.round(dragDeltaPercent / offsetStep);
      if (stepDelta !== 0) goTo(activeIndex - stepDelta, true);
    }

    setDragDeltaPercent(0);
    dragStartX.current = null;
  }

  function onSlideClick(index: number) {
    if (draggedPastThreshold.current) {
      // Suppress the click that follows a real drag release.
      draggedPastThreshold.current = false;
      return;
    }
    if (index !== activeIndex) goTo(index, true);
  }

  const activeSlide = slides[activeIndex];
  const transition = isDragging || reducedMotion ? "none" : `${TRANSFORM_TRANSITION}, ${OPACITY_TRANSITION}`;

  return (
    <div className={cn("select-none", className)}>
      <div
        ref={stageRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Coverflow carousel"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={cn("relative w-full touch-pan-y overflow-visible outline-none", stageClassName)}
      >
        {slides.map((slide, index) => {
          const rawOffset = circularOffset(index, activeIndex, length);
          const abs = Math.abs(rawOffset);
          const isActive = rawOffset === 0;
          const hidden = abs > maxVisibleOffset;

          const translateXPercent = rawOffset * offsetStep + (isDragging ? dragDeltaPercent : 0);
          const scale = Math.max(0, 1 - abs * scaleStep);
          const opacity = hidden ? 0 : 1 - abs * OPACITY_STEP;
          const zIndex = Z_BASE - abs;
          const Icon = slide.icon;

          return (
            <button
              key={slide.id}
              type="button"
              tabIndex={-1}
              aria-hidden={!isActive}
              aria-label={slide.title}
              onClick={() => onSlideClick(index)}
              style={{
                width: `${slideWidthRatio * 100}%`,
                transform: `translateX(${translateXPercent}%) scale(${scale})`,
                opacity,
                zIndex,
                transition,
                pointerEvents: hidden ? "none" : "auto",
              }}
              className={cn(
                "absolute inset-0 m-auto cursor-pointer overflow-hidden rounded-xl text-left",
                isLight
                  ? "border border-black/10 bg-white shadow-[0_16px_40px_-20px_rgba(0,0,0,0.25)]"
                  : "bg-ink"
              )}
            >
              {!isLight && slide.image && (
                <>
                  <div
                    className="absolute inset-0 transition-transform duration-700 ease-out"
                    style={{ transform: isActive ? "scale(1.08)" : "scale(1)" }}
                  >
                    <Image
                      src={slide.image}
                      alt={slide.alt ?? ""}
                      fill
                      sizes="(max-width: 639px) 82vw, 62vw"
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
                </>
              )}

              <div
                className={cn(
                  "relative flex h-full flex-col gap-2 p-6 md:p-8",
                  isLight ? "justify-center text-center items-center" : "justify-end"
                )}
              >
                <div className={cn("flex items-center gap-3", isLight && "flex-col gap-3")}>
                  {Icon && (
                    <span
                      className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brand/30 bg-brand/10 text-brand",
                        !isLight && "h-9 w-9"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                  )}
                  {slide.eyebrow && (
                    <span
                      className={cn(
                        "font-mono text-xs font-semibold uppercase tracking-[0.24em]",
                        isLight ? "text-graphite" : "text-paper/60"
                      )}
                    >
                      {slide.eyebrow}
                    </span>
                  )}
                </div>
                <h3
                  className={cn(
                    "text-balance text-xl font-bold tracking-tight sm:text-2xl",
                    isLight ? "text-ink" : "text-paper"
                  )}
                >
                  {slide.title}
                </h3>
                <p
                  className={cn(
                    "max-w-[38ch] text-balance text-sm leading-relaxed",
                    isLight ? "text-graphite" : "text-paper/75"
                  )}
                >
                  {slide.caption}
                </p>
              </div>
            </button>
          );
        })}

        {!isLight && (
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-5 right-5 z-20 select-none font-mono text-2xl font-bold tabular-nums text-paper drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] sm:text-3xl"
          >
            {String(activeIndex + 1).padStart(2, "0")}{" "}
            <span className="text-paper/50">/ {String(length).padStart(2, "0")}</span>
          </div>
        )}

        <span className="sr-only" aria-live="polite">
          Showing slide {activeIndex + 1} of {length}: {activeSlide.title}
        </span>
      </div>

      {/* Progress line: fills over the autoplay duration, paused on hover/focus. */}
      <div className="mt-5 h-[2px] w-full overflow-hidden rounded-full bg-black/10">
        {!reducedMotion && !interacted && (
          <div
            key={activeIndex}
            className="h-full w-0 origin-left rounded-full bg-brand"
            style={{
              animation: `coverflow-progress ${autoplayMs}ms linear forwards`,
              animationPlayState: paused ? "paused" : "running",
            }}
          />
        )}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goTo(i, true)}
              aria-label={`Go to ${slide.title}`}
              aria-current={i === activeIndex}
              className="group flex h-6 items-center px-0.5"
            >
              <span
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500 ease-out",
                  i === activeIndex ? "w-8 bg-brand" : "w-4 bg-black/15 group-hover:bg-black/30"
                )}
              />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {isLight && (
            <span className="font-mono text-sm font-bold tabular-nums text-ink/70">
              {String(activeIndex + 1).padStart(2, "0")} / {String(length).padStart(2, "0")}
            </span>
          )}
          <button
            type="button"
            onClick={() => goTo(activeIndex - 1, true)}
            aria-label="Previous slide"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 text-ink transition-colors duration-300 hover:border-brand hover:bg-brand hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => goTo(activeIndex + 1, true)}
            aria-label="Next slide"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 text-ink transition-colors duration-300 hover:border-brand hover:bg-brand hover:text-white"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
