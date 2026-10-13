import Link from "next/link";
import { SECTORS_STRIP } from "./content";
import { Reveal } from "./reveal";

/** One-line credibility statement + the sectors Infoelex serves. */
export function TrustStrip() {
  return (
    <section aria-label="Credibility" className="border-b border-hairline bg-canvas">
      <div className="wrap py-14 md:py-16">
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <p className="max-w-xl text-[17px] leading-relaxed text-graphite-600 lg:col-span-5">
            Engineering the power systems behind data centers, utilities and heavy
            industry across the <span className="text-graphite-950">GCC and India</span>,
            trusted by global partners.
          </p>
          <ul className="flex flex-wrap gap-x-7 gap-y-3 lg:col-span-7 lg:justify-end">
            {SECTORS_STRIP.map((s) => (
              <li key={s.label}>
                <Link
                  href={s.href}
                  className="text-[13px] font-medium uppercase tracking-[0.1em] text-steel transition-colors duration-[240ms] ease-signature hover:text-graphite-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
