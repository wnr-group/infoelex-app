"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Eyebrow, Reveal } from "@/components/home/reveal";
import { cn } from "@/lib/utils";
import { contactSchema, type ContactInput } from "./contact-schema";
import { CONTACT, ENQUIRY_TYPES } from "./data";
import { HeroArt } from "./hero-art";
import { SectionMark } from "./primitives";

const field =
  "peer w-full rounded-xl border border-graphite-950/15 bg-canvas/60 px-4 py-3 text-base text-graphite-950 outline-none transition-colors placeholder:text-steel/70 focus:border-signal focus:bg-white aria-[invalid=true]:border-signal";

function Field({ id, label, error, children, className }: { id: string; label: string; error?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-steel">
        {label}
      </label>
      {children}
      <p id={`${id}-error`} role={error ? "alert" : undefined} className="mt-1.5 min-h-5 text-[13px] text-signal">
        {error}
      </p>
    </div>
  );
}

type Status = "idle" | "submitting" | "success" | "error";

function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { enquiry: ENQUIRY_TYPES[0], name: "", email: "", organisation: "", message: "", website: "" },
  });

  const onSubmit = async (data: ContactInput) => {
    setStatus("submitting");
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error ?? "Something went wrong.");
      }
      reset();
      setStatus("success");
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  const aria = (k: keyof ContactInput) => ({ "aria-invalid": !!errors[k], "aria-describedby": `${k}-error` }) as const;

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "success" ? (
        <motion.div key="ok" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="status" className="py-10">
          <span className="font-display text-sm tabular-nums text-signal">Sent</span>
          <h2 className="font-display mt-4 text-section text-balance">Thank you. We have your message.</h2>
          <p className="mt-5 max-w-md leading-relaxed text-graphite-600">An engineer will review your enquiry and reply to the email address you gave.</p>
          <button type="button" onClick={() => setStatus("idle")} className="mt-8 text-[12.5px] font-bold uppercase tracking-[0.1em] text-signal underline-offset-4 hover:underline">
            Send another enquiry
          </button>
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={handleSubmit(onSubmit)} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative space-y-1">
          <div className="grid gap-x-5 sm:grid-cols-2">
            <Field id="name" label="Name *" error={errors.name?.message}>
              <input id="name" autoComplete="name" className={field} placeholder="Your full name" {...aria("name")} {...register("name")} />
            </Field>
            <Field id="email" label="Email *" error={errors.email?.message}>
              <input id="email" type="email" autoComplete="email" className={field} placeholder="you@company.com" {...aria("email")} {...register("email")} />
            </Field>
          </div>
          <div className="grid gap-x-5 sm:grid-cols-2">
            <Field id="organisation" label="Organisation" error={errors.organisation?.message}>
              <input id="organisation" autoComplete="organization" className={field} placeholder="Company name" {...aria("organisation")} {...register("organisation")} />
            </Field>
            <Field id="enquiry" label="Enquiry type" error={errors.enquiry?.message}>
              <select id="enquiry" className={cn(field, "cursor-pointer")} {...aria("enquiry")} {...register("enquiry")}>
                {ENQUIRY_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </Field>
          </div>
          <Field id="message" label="Project or message *" error={errors.message?.message}>
            <textarea id="message" rows={5} className={cn(field, "resize-none")} placeholder="Tell us about the network, facility or study you need." {...aria("message")} {...register("message")} />
          </Field>

          {/* Honeypot, hidden from people and assistive tech */}
          <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label>Website<input tabIndex={-1} autoComplete="off" {...register("website")} /></label>
          </div>

          {status === "error" && (
            <p role="alert" className="rounded-xl border border-signal/40 bg-signal/5 px-4 py-3 text-sm text-signal-deep">
              {serverError} You can also email us at{" "}
              <a href={`mailto:${CONTACT.email}`} className="font-semibold underline">{CONTACT.email}</a>.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="group mt-3 inline-flex w-full items-center justify-center gap-3 rounded-full bg-brand px-8 py-4 text-[12.5px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-brand-dim disabled:cursor-not-allowed disabled:bg-graphite-600 sm:w-auto"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Sending…
              </>
            ) : (
              <>
                Send enquiry <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </>
            )}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

/** Contact: form first. Details on the left, an overlapping form card on the right, then the interactive map of ways to reach us. */
export function Contact() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-canvas to-warm/70 pb-16 pt-32 text-graphite-950 md:pb-24 md:pt-40">
        <div aria-hidden className="pointer-events-none absolute -left-24 bottom-0 h-96 w-96 rounded-full bg-signal/[0.06] blur-3xl" />
        <div className="wrap relative grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5 lg:pt-6">
            <Reveal>
              <SectionMark index="07" label="Contact" />
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="font-display mt-6 text-page text-balance">
                Let&apos;s engineer what comes <span className="text-signal">next.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 max-w-md text-base leading-relaxed text-graphite-600 md:text-lg">
                Tell us what you are building or studying. We reply with the right engineer, not a sales sequence.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {["Enquiries", "Business collaborations", "Project discussions"].map((t) => (
                  <li key={t} className="rounded-full bg-white px-3.5 py-1.5 text-[13px] text-graphite-800 shadow-hair">{t}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.18}>
              <dl className="mt-10 space-y-5">
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-sm shadow-hair">@</span>
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-steel">Email</dt>
                    <dd className="mt-1"><a href={`mailto:${CONTACT.email}`} className="font-display text-card underline-offset-4 hover:text-signal hover:underline">{CONTACT.email}</a></dd>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-sm shadow-hair">☎</span>
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-steel">Phone</dt>
                    <dd className="mt-1"><a href={CONTACT.phoneHref} className="font-display text-card underline-offset-4 hover:text-signal hover:underline">{CONTACT.phone}</a></dd>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-sm shadow-hair">⌖</span>
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-steel">Office</dt>
                    <dd className="mt-1 leading-relaxed text-graphite-600">{CONTACT.office[0]}<br />{CONTACT.office[1]}</dd>
                  </div>
                </div>
              </dl>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="rounded-[2.5rem] border border-hairline bg-white p-7 shadow-lift sm:p-10 lg:p-12">
              <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-steel">Send an enquiry</p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Ways to reach us: interactive */}
      <section className="bg-canvas py-[calc(var(--space-section)*0.5)] text-graphite-950">
        <div className="wrap grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="order-2 lg:order-1 lg:col-span-7">
            <HeroArt kind="contact" className="mx-auto max-w-[36rem]" />
          </Reveal>
          <Reveal delay={0.1} className="order-1 lg:order-2 lg:col-span-5">
            <Eyebrow>Where to find us</Eyebrow>
            <h2 className="font-display mt-5 text-section text-balance">Based in Coimbatore, working across India and the GCC.</h2>
            <p className="mt-5 max-w-md leading-relaxed text-graphite-600">
              Choose the way that suits you. Every enquiry is read by an engineer who can help with the study, design or support you describe.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
