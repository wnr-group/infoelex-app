import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/home/reveal";
import { cn } from "@/lib/utils";

const WRAP = "mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10";
const H2 = "font-display text-[clamp(1.75rem,1.35rem+1.7vw,2.5rem)] font-bold uppercase leading-[1.08] tracking-[-0.025em] text-balance";

const PILLARS = [
  { tag: "Pillar 01 / Corporate Governance", title: "Ethical Stewardship & Integrity", copy: "We operate an uncompromising code of conduct. Every supplier, partner and community program is held to the same transparent standard we apply to our engineering work.", metric: ["Accountability metric", "100% Audited"], note: "Zero adverse compliance actions across all regional supply chains." },
  { tag: "Pillar 02 / Environmental Responsibility", title: "Sustainable Power Decarbonization", copy: "True ecological regeneration demands rigorous engineering. In parallel with commercial grid modelling, our teams advise civic utilities on decarbonization roadmaps, reducing carbon at the source.", metric: ["Decarbonization data", "~380k Metric Tons"], note: "Emissions offset through advised low-carbon grid programs." },
  { tag: "Pillar 03 / Hyper-Local Capital", title: "Grassroots Direct Investment", copy: "We allocate discretionary funds directly to local civic boards and grassroots agencies surrounding major installations, so the benefit stays with the neighbouring community.", metric: ["Capital grant deployment", "£2.4M Directly Funded"], note: "Awarded to registered local charities and civic organisations." },
];

const FOCUS = [
  { n: "01", tag: "Healthcare support", title: "Blood Donation Initiatives", copy: "Bi-annual corporate donor drives hosted across our regional offices, in partnership with national blood services to support acute local medical demands.", stats: [["Community partner", "NHS Blood & Transplant"], ["Annual coordination", "1,200+ Pints"]], image: "/about-office-bg.png" },
  { n: "02", tag: "STEM equity", title: "Education Support & STEM Access", copy: "Underwriting modern computational laboratory hardware and sponsoring full-tuition scholarships for underrepresented female and first-generation students.", stats: [["Partner institution", "STEM Trust & Universities"], ["Scholarships funded", "40 Full Rides"]], image: "/about-hero-bg.png" },
  { n: "03", tag: "Direct relief", title: "Food Distribution & Relief", copy: "Logistical coordination, regular food-voucher packing drives, and annual funding for civic organizations to relieve neighbourhood food insecurity.", stats: [["Regional food banks", "City Harvest & Trussell"], ["Meals provided", "50,000+ Meals Equivalent"]], image: "/photos/solar-farm.jpg" },
  { n: "04", tag: "Power safety", title: "Sustainable Power & Safety", copy: "Pro-bono electrical safety audits for non-profit shelters, rural clinics and community centres, including solar solutions where grid supply is unreliable.", stats: [["Focus sector", "Shelters & Rural Clinics"], ["Safety audits completed", "250+ Non-Profit Sites"]], image: "/sustainable-bg.jpg" },
  { n: "05", tag: "Youth mentorship", title: "Mentorship & Youth Development", copy: "Structured workshops, school visits and mentoring cycles. Competitive robotics club sponsorships, and full-immersion shadow programming for local young people.", stats: [["Active programs", "Mentors & STEM Meet"], ["Youth impacted", "1,500+ Students"]], image: "/photos/wind-turbines.jpg" },
];

const GALLERY = [
  { src: "/photos/pylon-sunset.jpg", alt: "Volunteers restoring a canal towpath at dusk", title: "Urban Ecology Restoration", sub: "Canal Corridor Project", tag: "Est. 2024", pos: "object-center", big: true },
  { src: "/about-hero-bg.png", alt: "Volunteer engineers running a school physics outreach session", title: "Primary Physics Outreach", sub: "Classroom Demos", pos: "object-[70%_center]" },
  { src: "/about-office-bg.png", alt: "Engineers at a community emergency power readiness clinic", title: "Emergency Power Readiness Clinic", sub: "Tyne & Wear", pos: "object-center" },
  { src: "/photos/substation.jpg", alt: "Engineers advising a community group on electrical safety", title: "Pro Bono Energy Efficiency Audit", sub: "", pos: "object-[60%_center]" },
  { src: "/photos/solar-farm.jpg", alt: "Young people at an electrical systems camp", title: "Young Women in Electrical Systems Camp", sub: "", pos: "object-center" },
  { src: "/sustainable-thumb.jpg", alt: "Laboratory hardware donated to a school", title: "Laboratory Hardware Donate Distribution", sub: "", pos: "object-center" },
];

function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] sm:text-[12px]", className)}>{children}</span>;
}

/** Beyond Engineering: community and social-responsibility programs on a light page. */
export function Beyond() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white pt-28 text-graphite-950 md:pt-36">
        <div className={WRAP}>
          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-steel">
            <span>Home / Beyond Engineering</span>
            <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-brand" /> CSR mandate ref: CL-2025</span>
          </div>
          <div className="mt-10 grid gap-8 pb-12 lg:grid-cols-12 lg:items-center md:pb-20">
            <Reveal className="lg:col-span-6">
              <Tag className="text-brand">Societal commitment &amp; stewardship</Tag>
              <h1 className="font-display mt-4 text-[clamp(2.25rem,1.5rem+4vw,4.25rem)] font-bold uppercase leading-[1.02] tracking-[-0.03em] text-balance">
                Making a difference <span className="text-brand">beyond</span> engineering.
              </h1>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-graphite-600">
                Building stronger communities through meaningful initiatives, shared responsibility, and positive social impact across our global operating territories.
              </p>
              <figure className="mt-6 rounded-sm border-l-2 border-brand bg-white p-4">
                <blockquote className="text-[13px] italic leading-relaxed text-graphite-600">
                  &ldquo;True corporate leadership extends past technical blueprints. We devote 2% of corporate engineering hours annually to community resilience, STEM access, and emergency relief.&rdquo;
                </blockquote>
                <figcaption className="mt-3 flex items-center justify-between gap-3 text-[11px] font-semibold uppercase tracking-[0.14em]">
                  <span className="text-steel">Infoelex Global CSR Protocol</span>
                  <span className="text-brand">1,200+ Pro-Bono Hours</span>
                </figcaption>
              </figure>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-6">
              <figure className="relative aspect-[4/3] card-lift overflow-hidden rounded-md ring-1 ring-graphite-950/10">
                <Image src="/about-office-bg.png" alt="Volunteer engineers working with local students" fill priority sizes="(min-width: 1024px) 620px, 100vw" quality={85} className="object-cover" />
                <figcaption className="absolute bottom-3 left-3 max-w-[70%] rounded-sm bg-brand p-3 text-white">
                  <p className="text-[12px] font-bold">100% Employee-Led</p>
                  <p className="mt-1 text-[11px] leading-snug text-white/85">Every field program is directed by practising engineers and volunteered on company time.</p>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Charter */}
      <section className="bg-white py-14 text-graphite-950 md:py-24">
        <div className={WRAP}>
          <Tag className="text-steel">Ethical foundation</Tag>
          <div className="mt-5 grid gap-5 md:grid-cols-2 md:items-end md:gap-16">
            <Reveal as="h2" className={H2}>
              Our social responsibility charter
            </Reveal>
            <p className="text-[14px] leading-relaxed text-graphite-600 md:max-w-md md:justify-self-end">
              Bridging high-integrity power engineering with humanitarian duty. Our charter formalizes our approach to social responsibility.
            </p>
          </div>
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {PILLARS.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.07} className="flex flex-col card-lift rounded-md border border-hairline bg-mist-blue/60 p-5 lg:p-6">
                <Tag className="text-brand">{p.tag}</Tag>
                <h3 className="font-display mt-4 text-lg font-bold tracking-tight">{p.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-graphite-600">{p.copy}</p>
                <div className="mt-auto border-t border-hairline pt-4">
                  <p className="flex items-center justify-between gap-3 text-[11px] font-semibold uppercase tracking-[0.1em]">
                    <span className="text-steel">{p.metric[0]}</span>
                    <span className="text-right">{p.metric[1]}</span>
                  </p>
                  <p className="mt-2 text-[12px] leading-snug text-steel">{p.note}</p>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-6 grid overflow-hidden card-lift rounded-md border border-hairline bg-mist-blue/60 md:grid-cols-[1fr_1.1fr]">
            <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[16rem]">
              <Image src="/about-hero-bg.png" alt="A volunteer engineer talking with community members" fill sizes="(min-width: 768px) 520px, 100vw" quality={80} className="object-cover object-[70%_center]" />
            </div>
            <figure className="flex flex-col justify-center p-6 md:p-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">Community engagement spotlight</p>
              <blockquote className="font-display mt-3 text-[clamp(1.25rem,1.05rem+0.9vw,1.75rem)] font-medium leading-snug tracking-[-0.01em] text-balance">
                &ldquo;Engineering with people, not just for them.&rdquo;
              </blockquote>
              <p className="mt-3 text-[13px] leading-relaxed text-graphite-600">
                Our teams don&apos;t wait behind closed boardroom doors. From organizing town hall safety clinics to mentoring future apprentice electricians, our chartered staff bring clarity and care.
              </p>
              <figcaption className="mt-4 text-[12px]"><span className="font-bold">Marcus Vance, CEng</span> <span className="text-steel">· Director of Social Stewardship</span></figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Focus areas */}
      <section className="bg-white py-14 text-graphite-950 md:py-24">
        <div className={WRAP}>
          <Tag className="text-brand">Core initiatives</Tag>
          <Reveal className="mt-5 max-w-2xl">
            <h2 className={H2}>Dedicated focus areas</h2>
            <p className="mt-4 text-[14px] leading-relaxed text-graphite-600">
              Targeted social initiatives executed through enduring regional partnerships, technical leadership, and direct physical involvement.
            </p>
          </Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FOCUS.map((f, i) => (
              <Reveal as="li" key={f.title} delay={(i % 3) * 0.06} className="flex flex-col overflow-hidden card-lift rounded-md border border-hairline bg-white">
                <div className="relative aspect-[16/10]">
                  <Image src={f.image} alt="" fill sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" quality={75} className="object-cover" />
                  <span className="absolute left-3 top-3 rounded-sm bg-brand px-2 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white">#{f.n} · {f.tag}</span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-base font-bold tracking-tight">{f.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-graphite-600">{f.copy}</p>
                  <dl className="mt-auto space-y-1.5 border-t border-hairline pt-4 text-[11px]">
                    {f.stats.map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-3">
                        <dt className="font-semibold uppercase tracking-[0.08em] text-steel">{k}</dt>
                        <dd className="text-right font-bold">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            ))}
            <Reveal as="li" delay={0.1} className="flex flex-col justify-center rounded-md bg-[#232a32] p-6 text-paper">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">Our operating commitment</p>
              <h3 className="font-display mt-3 text-xl font-bold tracking-tight">Measurable Social Responsibility</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-paper/65">
                We monitor social impact metrics with the same rigorous instrumentation applied to high-voltage grid topologies. Every hour logged and pound disbursed is subject to annual independent audit.
              </p>
              <p className="font-display mt-6 text-5xl font-bold leading-none tracking-[-0.03em]">3.0<span className="text-brand">%</span></p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-paper/55">Annual corporate engineering hours pledged</p>
              <p className="mt-4 border-t border-white/10 pt-3 text-[11px] text-paper/45">Audited under ISAE standards</p>
            </Reveal>
          </ul>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-white py-14 text-graphite-950 md:py-24">
        <div className={WRAP}>
          <Tag className="text-brand">Field engagements</Tag>
          <div className="mt-5 grid gap-5 md:grid-cols-2 md:items-end md:gap-16">
            <Reveal as="h2" className={H2}>
              Engineers in the community
            </Reveal>
            <p className="text-[14px] leading-relaxed text-graphite-600 md:max-w-md md:justify-self-end">
              Unfiltered moments from our volunteer days, classroom demonstrations, and local power safety clinics across the United Kingdom and global branch networks.
            </p>
          </div>
          <ul className="mt-10 grid auto-rows-[7rem] grid-cols-6 gap-2 sm:auto-rows-[10rem] sm:gap-3 md:auto-rows-[15rem]">
            {GALLERY.map((g) => (
              <Reveal as="li" key={g.title} className={cn("relative card-lift overflow-hidden rounded-md ring-1 ring-graphite-950/10", g.big ? "col-span-4 row-span-2" : "col-span-2")}>
                <Image src={g.src} alt={g.alt} fill sizes={g.big ? "66vw" : "33vw"} quality={75} className={cn("object-cover", g.pos)} />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-2 text-white sm:p-3">
                  <p className={cn("font-bold uppercase leading-tight tracking-[0.04em]", g.big ? "text-[12px] sm:text-sm" : "text-[10px] sm:text-[11px]")}>{g.title}</p>
                  {g.sub && <p className="mt-1 text-[11px] text-white/70">{g.sub}</p>}
                </div>
                {g.tag && <span className="absolute right-3 top-3 rounded-sm bg-black/60 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white">{g.tag}</span>}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Partner */}
      <section className="bg-white py-14 text-graphite-950 md:py-24">
        <div className={cn(WRAP, "grid gap-8 lg:grid-cols-12 lg:items-center")}>
          <Reveal className="lg:col-span-7">
            <Tag className="text-brand">Organization &amp; third-party collaboration</Tag>
            <h2 className={cn(H2, "mt-4")}>Partner with our community initiatives</h2>
            <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-graphite-600">
              We welcome partnerships with verified non-profits, educational institutions, healthcare trusts, and regional civic authorities seeking pro-bono engineering assistance, STEM sponsorships, or emergency power support.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                ["01 / Eligibility", "Registered charities & state schools"],
                ["02 / Review cycle", "Quarterly advisory allocation"],
                ["03 / Support", "Direct charity & engineering"],
              ].map(([k, v]) => (
                <li key={k} className="rounded-sm border border-hairline bg-white p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">{k}</p>
                  <p className="mt-1.5 text-[12px] font-semibold leading-snug">{v}</p>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <Link href="/contact" className="inline-flex w-full items-center justify-between gap-3 rounded-sm bg-brand px-6 py-4 text-[13px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-brand-dim focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
              Connect with Infoelex <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
            <p className="mt-3 text-[12px] text-steel">Get in touch through our contact page to start a conversation.</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
