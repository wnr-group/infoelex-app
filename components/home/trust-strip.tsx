import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SECTORS_STRIP } from "./content";
import { Eyebrow, Reveal } from "./reveal";

/** Credibility statement plus the eight sectors Infoelex serves, as a hairline index. */
export function TrustStrip() {
  return (
    <section aria-label="Credibility" className="border-b border-hairline bg-canvas py-20 md:py-28">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Eyebrow>Trusted across</Eyebrow>
          </Reveal>
          <Reveal className="lg:col-span-8" delay={0.05}>
            <p className="font-display text-title max-w-3xl text-graphite-600">
              Engineering the power systems behind{" "}
              <span className="text-graphite-950">data centers, utilities and heavy industry</span>{" "}
              across the <span className="text-graphite-950">GCC and India</span>, trusted by global partners.
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 grid grid-cols-2 border-t border-hairline md:mt-20 lg:grid-cols-4">
          {SECTORS_STRIP.map((s, i) => (
            <Reveal
              as="li"
              key={s.label}
              delay={Math.min(i, 7) * 0.05}
              className="relative border-b border-hairline max-lg:odd:border-r lg:[&:not(:nth-child(4n))]:border-r"
            >
              <Link
                href={s.href}
                className="group relative flex h-full min-h-[8.5rem] flex-col justify-between gap-8 p-5 transition-colors duration-[240ms] ease-signature hover:bg-canvas-2 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-signal md:min-h-[10rem] md:p-7"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-signal transition-transform duration-[500ms] ease-signature group-hover:scale-x-100"
                />
                <span className="flex items-start justify-between">
                  <span className="text-[12px] font-semibold tabular-nums tracking-[0.12em] text-steel">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-5 w-5 -translate-x-1 translate-y-1 text-signal opacity-0 transition-[transform,opacity] duration-[300ms] ease-signature group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                  />
                </span>
                <span className="text-[16px] font-medium leading-snug text-graphite-950 md:text-[18px]">
                  {s.label}
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
