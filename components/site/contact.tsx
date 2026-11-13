"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Reveal } from "@/components/home/reveal";
import { cn } from "@/lib/utils";
import { contactSchema, type ContactInput } from "./contact-schema";
import { CONTACT, ENQUIRY_TYPES } from "./data";
import { PageHero } from "./primitives";

const field =
  "peer w-full border-0 border-b border-graphite-950/30 bg-transparent px-0 py-3 text-base text-graphite-950 outline-none transition-colors placeholder:text-steel/70 focus:border-signal aria-[invalid=true]:border-signal";

function Field({ id, label, error, children, className }: { id: string; label: string; error?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-steel">
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
        <motion.form key="form" onSubmit={handleSubmit(onSubmit)} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
          <div className="grid gap-x-8 sm:grid-cols-2">
            <Field id="name" label="Name *" error={errors.name?.message}>
              <input id="name" autoComplete="name" className={field} placeholder="Your full name" {...aria("name")} {...register("name")} />
            </Field>
            <Field id="email" label="Email *" error={errors.email?.message}>
              <input id="email" type="email" autoComplete="email" className={field} placeholder="you@company.com" {...aria("email")} {...register("email")} />
            </Field>
          </div>
          <div className="grid gap-x-8 sm:grid-cols-2">
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
            <p role="alert" className="border border-signal/40 bg-signal/5 px-4 py-3 text-sm text-signal-deep">
              {serverError} You can also email us at{" "}
              <a href={`mailto:${CONTACT.email}`} className="font-semibold underline">{CONTACT.email}</a>.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="group mt-4 inline-flex w-full items-center justify-center gap-3 bg-brand px-8 py-4 text-[12.5px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-brand-dim disabled:cursor-not-allowed disabled:bg-graphite-600 sm:w-auto"
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

export function Contact() {
  return (
    <>
      <PageHero
        index="07"
        label="Contact"
        title={
          <>
            Let&apos;s engineer what comes <span className="text-signal">next.</span>
          </>
        }
        lead="Tell us what you are building or studying. We reply with the right engineer, not a sales sequence."
      />
      <section className="bg-canvas-2 py-[var(--space-section)] text-graphite-950">
        <div className="wrap grid gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal className="rounded-2xl border border-hairline bg-white p-8 shadow-hair sm:p-10 lg:col-span-5">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-steel">Get in touch</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {["Enquiries", "Business collaborations", "Project discussions"].map((t) => (
                <li key={t} className="rounded-full bg-canvas-2 px-3 py-1 text-[13px] text-graphite-800">{t}</li>
              ))}
            </ul>
            <dl className="mt-8 space-y-7">
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-steel">Email</dt>
                <dd className="mt-2"><a href={`mailto:${CONTACT.email}`} className="font-display text-card underline-offset-4 hover:text-signal hover:underline">{CONTACT.email}</a></dd>
              </div>
              <div className="border-t border-hairline pt-7">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-steel">Phone</dt>
                <dd className="mt-2"><a href={CONTACT.phoneHref} className="font-display text-card underline-offset-4 hover:text-signal hover:underline">{CONTACT.phone}</a></dd>
              </div>
              <div className="border-t border-hairline pt-7">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-steel">Office</dt>
                <dd className="mt-2 leading-relaxed text-graphite-600">
                  {CONTACT.office[0]}
                  <br />
                  {CONTACT.office[1]}
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.1} className="rounded-2xl border border-hairline bg-white p-8 shadow-lift sm:p-10 lg:col-span-7 lg:p-12">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
