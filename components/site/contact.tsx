import Image from "next/image";
import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/home/reveal";
import { cn } from "@/lib/utils";
import { ContactForm } from "./contact-form";
import { FaqAccordion } from "./faq-accordion";
import { CONTACT } from "./data";

const WRAP = "mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10";

const HUBS = [
  {
    code: "HQ-01",
    name: `${CONTACT.office[1]}`,
    lines: [CONTACT.office[0], "Power system studies, electrical design, automation and data center power for India and the GCC."],
  },
];

const FAQ = [
  { q: "How quickly can an NDA be executed?", a: "Standard mutual NDAs can be executed on request using our standard template or your corporate paper. Scoping calls can be convened immediately after signing." },
  { q: "What is the initial feasibility review timeline?", a: "On receipt of technical specifications and single-line diagrams, our principal engineers provide a preliminary scope and proposal memorandum within a few business days." },
  { q: "Who leads client technical evaluations?", a: "Every mandate is directly led by a chartered or licensed professional engineer with extensive experience in utility transmission, generation and critical facilities." },
  { q: "Can INFOELEX assist with emergency power failures?", a: "Contact us with the details of the incident. We can support forensic root-cause analysis, transient modelling and emergency recovery coordination." },
];

function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] sm:text-[12px]", className)}>{children}</span>;
}

/** Contact: advisory hero, direct channels beside a technical scoping form, then consultation guidelines. */
export function Contact() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white pt-28 text-graphite-950 md:pt-36">
        <div className={WRAP}>
          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-steel">
            <span>Home / Contact &amp; Advisory</span>
            <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-brand" /> Telecommunication dispatch • Node secure</span>
          </div>
          <div className="mt-10 grid gap-8 pb-12 lg:grid-cols-12 lg:items-end md:pb-20">
            <Reveal className="lg:col-span-8">
              <Tag className="rounded-sm border border-brand/30 bg-white px-3 py-1.5 text-brand">Technical engagement protocol</Tag>
              <h1 className="font-display mt-5 text-[clamp(2.25rem,1.5rem+4vw,4.25rem)] font-bold leading-[1.02] tracking-[-0.03em] text-balance">
                Let&apos;s Build Something That <span className="text-brand">Matters.</span>
              </h1>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-graphite-600">
                Connect with INFOELEX to discuss your high-voltage infrastructure, critical power topology, or cross-border engineering assignments.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-4">
              <div className="rounded-sm border-l-2 border-brand bg-[#232a32] p-5 text-paper">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">Advisory commitment</p>
                <p className="mt-2 text-[13px] leading-relaxed text-paper/80">Direct access to principal electrical engineers • Confidential scoping • Prompt response from an engineer</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Channels + form */}
      <section className="bg-white py-12 text-graphite-950 md:py-20">
        <div className={cn(WRAP, "grid gap-8 lg:grid-cols-12 lg:gap-10")}>
          <div className="space-y-8 lg:col-span-5">
            <Reveal className="rounded-md bg-[#232a32] p-6 text-paper">
              <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-paper/55">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" /> Official direct channels
              </p>
              <h2 className="font-display mt-3 text-xl font-bold tracking-tight">Engineering Command Desk</h2>
              <dl className="mt-5 space-y-4">
                <div className="flex gap-3">
                  <Phone className="mt-1 h-4 w-4 shrink-0 text-brand" aria-hidden />
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-paper/45">Technical hotline</dt>
                    <dd className="mt-1"><a href={CONTACT.phoneHref} className="font-display text-lg font-bold tracking-tight hover:text-brand">{CONTACT.phone}</a></dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Mail className="mt-1 h-4 w-4 shrink-0 text-brand" aria-hidden />
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-paper/45">Direct scoping advisory</dt>
                    <dd className="mt-1"><a href={`mailto:${CONTACT.email}`} className="font-display text-lg font-bold tracking-tight hover:text-brand">{CONTACT.email}</a></dd>
                  </div>
                </div>
              </dl>
              <div className="mt-5 rounded-sm bg-white/5 p-4 text-[12px] leading-relaxed text-paper/65">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-paper/45">Operating protocol</p>
                <p className="mt-1.5">Monday to Friday, business hours (IST). Urgent critical-power enquiries are triaged first.</p>
              </div>
              <p className="mt-3 flex gap-2.5 rounded-sm bg-white/5 p-4 text-[12px] leading-relaxed text-paper/65">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
                <span><strong className="text-paper">Mutual NDA standard:</strong> we execute bilateral non-disclosure instruments before ingesting single-line diagrams, load-flow files or confidential network schematics.</span>
              </p>
            </Reveal>

            <div>
              <p className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em]">
                <span className="h-2 w-2 bg-brand" /> Regional operation hubs
              </p>
              <ul className="mt-4 space-y-3">
                {HUBS.map((h) => (
                  <Reveal as="li" key={h.code} className="card-lift rounded-md border border-hairline bg-mist-blue/60 p-4">
                    <p className="flex items-center gap-2 text-[13px] font-bold"><span className="text-brand">{h.code}</span> <MapPin className="h-3.5 w-3.5 text-steel" aria-hidden /> {h.name}</p>
                    {h.lines.map((l) => (
                      <p key={l} className="mt-1.5 text-[12px] leading-relaxed text-graphite-600">{l}</p>
                    ))}
                  </Reveal>
                ))}
              </ul>
            </div>

            <Reveal>
              <figure className="relative aspect-[16/9] overflow-hidden rounded-md ring-1 ring-graphite-950/10">
                <Image src="/photos/contact-office.png" alt="A receptionist welcoming two visiting engineers in a bright office lobby with a world map on the wall" fill sizes="(min-width: 1024px) 480px, 100vw" quality={75} className="object-cover object-center" />
              </figure>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-steel">Global offices | Reception</p>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="rounded-md border border-hairline border-t-2 border-t-brand bg-white p-6 shadow-lift sm:p-8">
              <div className="flex items-center justify-between gap-3 text-[11px] font-semibold uppercase tracking-[0.16em]">
                <span className="text-brand">Protocol ENQ-2025</span>
                <span className="text-steel">Encrypted in transit</span>
              </div>
              <h2 className="font-display mt-3 text-[clamp(1.5rem,1.2rem+1.1vw,2rem)] font-bold tracking-[-0.02em]">Submit Technical Scoping Request</h2>
              <p className="mt-2 mb-6 text-[13px] leading-relaxed text-graphite-600">
                Direct submission to the INFOELEX engineering partner panel. Complete the technical fields below to facilitate immediate assignment to the appropriate discipline lead.
              </p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Guidelines */}
      <section className="bg-[#232a32] py-14 text-paper md:py-20">
        <div className={WRAP}>
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-[clamp(1.4rem,1.1rem+1.2vw,2rem)] font-bold tracking-[-0.02em]">Consultation &amp; Feasibility Guidelines</h2>
            <span className="hidden text-[11px] font-semibold uppercase tracking-[0.16em] text-paper/45 sm:block">FAQ index</span>
          </div>
          <FaqAccordion items={FAQ} className="mx-auto mt-8 max-w-4xl" />
        </div>
      </section>
    </>
  );
}
