import { SERVICES } from "./content";
import { MagneticLink } from "./magnetic-link";
import { Reveal } from "./reveal";

/** Dark closing band: oversized headline over a slow marquee of service names. */
export function ClosingCta() {
  const names = SERVICES.map((s) => s.title);
  return (
    <section
      aria-labelledby="closing-heading"
      className="bg-blueprint-dark relative isolate overflow-hidden bg-graphite-950 py-[var(--space-section)] text-canvas"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 select-none overflow-hidden"
      >
        <div className="flex w-max animate-[marquee_90s_linear_infinite] whitespace-nowrap motion-reduce:animate-none">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center">
              {names.map((n) => (
                <span
                  key={`${dup}-${n}`}
                  className="flex items-center font-display text-[clamp(5rem,12vw,11rem)] leading-none text-transparent [-webkit-text-stroke:1px_rgba(246,246,244,0.12)]"
                >
                  {n}
                  <span className="mx-10 h-3 w-3 shrink-0 bg-signal/40" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="wrap relative">
        <Reveal className="max-w-5xl">
          <p className="mb-8 flex items-center gap-3 text-eyebrow font-semibold uppercase text-canvas/60">
            <span className="h-px w-8 bg-signal" />
            Start a conversation
          </p>
          <h2 id="closing-heading" className="font-display text-[clamp(3.25rem,1.5rem+7vw,8.5rem)] leading-[0.96] tracking-[-0.025em]">
            Let&apos;s engineer
            <br />
            <span className="text-canvas/60">what&apos;s next.</span>
          </h2>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5">
            <MagneticLink href="/contact" onDark>
              Get in touch
            </MagneticLink>
            <p className="max-w-xs text-[15px] leading-relaxed text-canvas/60">
              Tell us about your project and we will take it from there.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
