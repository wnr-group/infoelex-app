import { IsoScene } from "./iso";
import { ArrowUnderline } from "./magnetic-link";
import { Eyebrow, Reveal, ScrubHeadline } from "./reveal";

const S = { stroke: "currentColor", strokeWidth: 1.25, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" } as const;

const REASONS = [
  {
    title: "Study-first engineering",
    copy: "Every recommendation is backed by simulation: load flow, short-circuit, arc flash and transients. Risk is found on screen, not on site.",
    proof: "ETAP-based studies",
    icon: (
      <svg viewBox="0 0 48 48" className="h-11 w-11" aria-hidden="true">
        <path d="M6 6v36h36" {...S} />
        <path d="M11 30c5-18 8-18 12 0s7 18 12 0 5-10 8-4" {...S} />
      </svg>
    ),
  },
  {
    title: "Built for critical infrastructure",
    copy: "Data centers and high-availability facilities are where we go deepest: redundancy, selectivity and fault ride-through designed in from day one.",
    proof: "10+ data center projects",
    icon: (
      <svg viewBox="0 0 48 48" className="h-11 w-11" aria-hidden="true">
        <rect x="7" y="9" width="34" height="12" rx="1" {...S} />
        <rect x="7" y="27" width="34" height="12" rx="1" {...S} />
        <path d="M13 15h.01M13 33h.01M20 15h14M20 33h14" {...S} />
      </svg>
    ),
  },
  {
    title: "Rooted in the GCC and India",
    copy: "Local standards, utilities and approval routes are familiar ground, with delivery that works the same way across both regions.",
    proof: "GCC & India",
    icon: (
      <svg viewBox="0 0 48 48" className="h-11 w-11" aria-hidden="true">
        <circle cx="24" cy="24" r="17" {...S} />
        <path d="M7 24h34M24 7c-6 5-6 29 0 34M24 7c6 5 6 29 0 34" {...S} />
      </svg>
    ),
  },
  {
    title: "One team, study to switch-on",
    copy: "The same engineers carry a project from first study through design, validation and commissioning support. Nothing is lost in hand-offs.",
    proof: "4-stage delivery",
    icon: (
      <svg viewBox="0 0 48 48" className="h-11 w-11" aria-hidden="true">
        <rect x="5" y="17" width="12" height="14" {...S} />
        <rect x="31" y="17" width="12" height="14" {...S} />
        <path d="M17 24h14M27 20l4 4-4 4" {...S} />
      </svg>
    ),
  },
];

/** Why Infoelex: sticky editorial intro on the left, four proof-backed reasons on the right. */
export function WhySection() {
  return (
    <section id="why" className="border-t border-hairline bg-canvas py-[var(--space-section)]">
      <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-x-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Eyebrow>Why Infoelex</Eyebrow>
            <ScrubHeadline
              text="Engineers who treat every study as if the system were already live."
              className="mt-8 font-display text-headline text-graphite-950"
            />
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-md text-[17px] leading-relaxed text-graphite-600">
                Thinking beyond. Thinking future. Our work starts where templates stop: with
                your network, your loads and the standards your project must meet.
              </p>
              <ArrowUnderline href="/about" className="mt-8 text-graphite-950">
                About Infoelex
              </ArrowUnderline>

              <div
                aria-hidden="true"
                className="bg-blueprint mt-12 hidden aspect-[4/3] max-w-md overflow-hidden border border-hairline bg-canvas-2 lg:block"
              >
                <IsoScene scene="switchgear" className="h-full w-full p-8" />
              </div>
            </Reveal>
          </div>
        </div>

        <ol className="group/list border-t border-hairline lg:col-span-7">
          {REASONS.map((r, i) => (
            <Reveal
              as="li"
              key={r.title}
              clip
              delay={Math.min(i, 3) * 0.05}
              className="border-b border-hairline"
            >
              <div className="group relative grid gap-x-8 gap-y-5 py-9 transition-opacity duration-[300ms] ease-signature md:grid-cols-[auto_1fr] md:py-12 lg:group-hover/list:opacity-45 lg:group-hover/list:hover:opacity-100">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-signal transition-transform duration-[600ms] ease-signature group-hover:scale-x-100"
                />
                <div className="flex items-start gap-5 text-graphite-600 transition-colors duration-[300ms] ease-signature group-hover:text-signal md:w-28 md:flex-col md:gap-8">
                  <span className="pt-1 text-[12px] font-semibold tabular-nums tracking-[0.14em] text-steel">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {r.icon}
                </div>
                <div>
                  <h3 className="font-display text-title font-medium text-graphite-950">{r.title}</h3>
                  <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-graphite-600">{r.copy}</p>
                  <p className="mt-6 inline-flex items-center gap-3 border border-hairline px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-graphite-800">
                    <span className="h-1.5 w-1.5 bg-signal" />
                    {r.proof}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
