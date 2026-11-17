"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { contactSchema, type ContactInput } from "./contact-schema";
import { CONTACT, ENQUIRY_TYPES } from "./data";

const field =
  "w-full rounded-sm border border-graphite-950/15 bg-canvas/60 px-3 py-2.5 text-[13px] text-graphite-950 outline-none transition-colors placeholder:text-steel/60 focus:border-brand focus:bg-white aria-[invalid=true]:border-brand";

function Field({ id, label, required, error, children, className }: { id: string; label: string; required?: boolean; error?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 flex justify-between text-[9px] font-semibold uppercase tracking-[0.14em] text-steel">
        {label}
        {required && <span aria-hidden className="text-brand">*</span>}
      </label>
      {children}
      <p id={`${id}-error`} role={error ? "alert" : undefined} className="mt-1 min-h-4 text-[11px] text-brand">
        {error}
      </p>
    </div>
  );
}

type Status = "idle" | "submitting" | "success" | "error";

/** Technical scoping request. Posts to /api/contact, which validates it again and forwards it. */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { enquiry: "" as ContactInput["enquiry"], name: "", email: "", organisation: "", phone: "", rating: "", targetDate: "", message: "", website: "" },
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
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand">Request received</span>
          <h3 className="font-display mt-3 text-2xl font-bold tracking-tight text-balance">Thank you. We have your scoping request.</h3>
          <p className="mt-3 max-w-md text-[13px] leading-relaxed text-graphite-600">An engineer will review your request and reply to the email address you gave.</p>
          <button type="button" onClick={() => setStatus("idle")} className="mt-6 text-[11px] font-bold uppercase tracking-[0.12em] text-brand underline-offset-4 hover:underline">
            Submit another request
          </button>
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={handleSubmit(onSubmit)} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative">
          <div className="grid gap-x-4 sm:grid-cols-2">
            <Field id="name" label="Full name" required error={errors.name?.message}>
              <input id="name" autoComplete="name" className={field} placeholder="e.g. Dr. Arthur Vance" {...aria("name")} {...register("name")} />
            </Field>
            <Field id="organisation" label="Company / enterprise" required error={errors.organisation?.message}>
              <input id="organisation" autoComplete="organization" className={field} placeholder="e.g. Global Power Transmission Ltd" {...aria("organisation")} {...register("organisation")} />
            </Field>
            <Field id="email" label="Corporate email" required error={errors.email?.message}>
              <input id="email" type="email" autoComplete="email" className={field} placeholder="a.vance@powergroup.com" {...aria("email")} {...register("email")} />
            </Field>
            <Field id="phone" label="Direct telephone" error={errors.phone?.message}>
              <input id="phone" type="tel" autoComplete="tel" className={field} placeholder="+91 98765 43210" {...aria("phone")} {...register("phone")} />
            </Field>
          </div>
          <Field id="enquiry" label="Primary engineering discipline" required error={errors.enquiry?.message}>
            <select id="enquiry" className={cn(field, "cursor-pointer")} {...aria("enquiry")} {...register("enquiry")}>
              <option value="" disabled>Select core domain...</option>
              {ENQUIRY_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </Field>
          <div className="grid gap-x-4 sm:grid-cols-2">
            <Field id="rating" label="Estimated rating / voltage" error={errors.rating?.message}>
              <input id="rating" className={field} placeholder="e.g. 150MW / 275kV / 48MW LV" {...aria("rating")} {...register("rating")} />
            </Field>
            <Field id="targetDate" label="Target commissioning / FEED date" error={errors.targetDate?.message}>
              <input id="targetDate" className={field} placeholder="e.g. Q4 2026 or immediate feasibility" {...aria("targetDate")} {...register("targetDate")} />
            </Field>
          </div>
          <Field id="message" label="Technical scope description & objectives" required error={errors.message?.message}>
            <textarea id="message" rows={5} className={cn(field, "resize-none")} placeholder="Outline your technical parameters: point of common coupling (PCC), code compliance requirements (NERC / National Grid / IEC), switchgear configurations, or study boundaries..." {...aria("message")} {...register("message")} />
          </Field>

          {/* Honeypot, hidden from people and assistive tech */}
          <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label>Website<input tabIndex={-1} autoComplete="off" {...register("website")} /></label>
          </div>

          {status === "error" && (
            <p role="alert" className="mb-3 rounded-sm border border-brand/40 bg-brand/5 px-3 py-2.5 text-[12px] text-signal-deep">
              {serverError} You can also email us at{" "}
              <a href={`mailto:${CONTACT.email}`} className="font-semibold underline">{CONTACT.email}</a>.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="mt-1 inline-flex w-full items-center justify-center gap-3 rounded-sm bg-brand px-6 py-4 text-[11px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-brand-dim disabled:cursor-not-allowed disabled:bg-graphite-600"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Sending…
              </>
            ) : (
              <>
                Submit technical enquiry <ArrowRight className="h-4 w-4" aria-hidden />
              </>
            )}
          </button>
          <p className="mt-3 text-[10px] leading-relaxed text-steel">Your information is used only to respond to this request.</p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
