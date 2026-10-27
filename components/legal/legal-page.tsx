import Link from "next/link";

export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
};

/** Shared layout for long-form legal pages: sticky contents on the left, numbered sections on the right. */
export function LegalPage({
  eyebrow,
  title,
  updated,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  const id = (i: number) => `section-${i + 1}`;
  return (
    <div className="bg-canvas text-graphite-950">
      <header className="bg-blueprint border-b border-hairline pt-36 pb-14 md:pt-44 md:pb-20">
        <div className="wrap">
          <p className="flex items-center gap-3 text-eyebrow font-semibold uppercase text-steel">
            <span className="h-px w-8 bg-signal" />
            {eyebrow}
          </p>
          <h1 className="mt-6 font-display text-[clamp(2.25rem,1.4rem+3.6vw,4rem)] leading-[1.05] tracking-[-0.02em]">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-graphite-600">{intro}</p>
          <p className="mt-6 text-[13px] text-steel">Last updated: {updated}</p>
        </div>
      </header>

      <div className="wrap grid gap-12 py-16 md:py-24 lg:grid-cols-12 lg:gap-16">
        <nav aria-label="On this page" className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="text-eyebrow font-semibold uppercase text-steel">On this page</p>
            <ol className="mt-5 space-y-1 border-l border-hairline">
              {sections.map((s, i) => (
                <li key={s.heading}>
                  <a
                    href={`#${id(i)}`}
                    className="-ml-px block border-l border-transparent py-1.5 pl-4 text-[14px] text-graphite-600 transition-colors duration-[240ms] ease-signature hover:border-signal hover:text-graphite-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
                  >
                    <span className="mr-2 tabular-nums text-steel">{String(i + 1).padStart(2, "0")}</span>
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <article className="lg:col-span-8">
          {sections.map((s, i) => (
            <section key={s.heading} id={id(i)} className="scroll-mt-28 border-t border-hairline py-10 first:border-t-0 first:pt-0">
              <h2 className="font-display text-title font-medium">
                <span className="mr-3 text-[14px] tabular-nums text-signal">{String(i + 1).padStart(2, "0")}</span>
                {s.heading}
              </h2>
              {s.paragraphs?.map((p) => (
                <p key={p} className="mt-4 max-w-2xl text-[16px] leading-relaxed text-graphite-600">
                  {p}
                </p>
              ))}
              {s.list && (
                <ul className="mt-4 max-w-2xl space-y-2.5">
                  {s.list.map((item) => (
                    <li key={item} className="flex gap-3 text-[16px] leading-relaxed text-graphite-600">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-signal" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <div className="mt-6 border-t border-hairline pt-10 text-[15px] text-graphite-600">
            Questions about this page? Email{" "}
            <a
              href="mailto:contact@infoelex.com"
              className="font-medium text-graphite-950 underline decoration-signal underline-offset-4 hover:text-signal"
            >
              contact@infoelex.com
            </a>{" "}
            or use our{" "}
            <Link
              href="/contact"
              className="font-medium text-graphite-950 underline decoration-signal underline-offset-4 hover:text-signal"
            >
              contact page
            </Link>
            .
          </div>
        </article>
      </div>
    </div>
  );
}
