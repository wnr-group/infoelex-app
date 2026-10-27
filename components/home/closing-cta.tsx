import { SERVICES } from "./content";
import { MagneticLink } from "./magnetic-link";
import { Reveal } from "./reveal";

/** Closing band: headline over a slow marquee of service names, with one red CTA. */
export function ClosingCta() {
  const names = SERVICES.map((s) => s.title);
  return (
    <section
      aria-labelledby="closing-heading"
      className="bg-blueprint relative isolate overflow-hidden border-t border-hairline bg-canvas-2 pt-[var(--space-section)] pb-[calc(var(--space-section)+5rem)] text-graphite-950"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-8 -z-10 select-none overflow-hidden md:bottom-12"
      >
        <div className="flex w-max animate-[marquee_90s_linear_infinite] whitespace-nowrap motion-reduce:animate-none">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center">
              {names.map((n) => (
                <span
                  key={`${dup}-${n}`}
                  className="flex items-center font-display text-[clamp(4rem,9vw,8rem)] leading-none text-graphite-950/[0.06] [-webkit-text-stroke:1px_rgba(21,23,26,0.28)]"
                >
                  {n}
                  <span className="mx-10 h-2.5 w-2.5 shrink-0 bg-signal/70" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="wrap relative">
        <Reveal className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="mb-6 flex items-center gap-3 text-eyebrow font-semibold uppercase text-steel">
              <span className="h-px w-8 bg-signal" />
              Start a conversation
            </p>
            <h2
              id="closing-heading"
              className="font-display text-[clamp(2.25rem,1.2rem+4.2vw,4.75rem)] leading-[1.02] tracking-[-0.025em]"
            >
              Let&apos;s engineer
              <br />
              <span className="text-graphite-600">what&apos;s next.</span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:pb-2">
            <p className="max-w-xs text-[16px] leading-relaxed text-graphite-600">
              Tell us about your project and we will take it from there.
            </p>
            <div className="mt-7">
              <MagneticLink href="/contact">Get in touch</MagneticLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
