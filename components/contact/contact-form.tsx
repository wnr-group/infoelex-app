"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Send, Loader2 } from "lucide-react";

export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    org: "",
    service: "Power System Studies",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setIsSubmitting(true);
    // Simulate premium submission experience
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setForm({ name: "", email: "", org: "", service: "Power System Studies", message: "" });
    }, 1800);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/50 p-8 shadow-sm">
      <div className="absolute left-0 bottom-0 -z-10 h-32 w-32 rounded-full bg-brand/5 blur-2xl" />

      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div>
              <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2 font-semibold">
                Your Name *
              </label>
              <input
                id="name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-ink placeholder-slate-400 outline-none transition-all duration-300 focus:border-brand focus:ring-1 focus:ring-brand"
                placeholder="John Doe"
              />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2 font-semibold">
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-ink placeholder-slate-400 outline-none transition-all duration-300 focus:border-brand focus:ring-1 focus:ring-brand"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <label htmlFor="org" className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2 font-semibold">
                  Organization
                </label>
                <input
                  id="org"
                  type="text"
                  value={form.org}
                  onChange={(e) => setForm({ ...form, org: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-ink placeholder-slate-400 outline-none transition-all duration-300 focus:border-brand focus:ring-1 focus:ring-brand"
                  placeholder="Company name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="service" className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2 font-semibold">
                Specialized Area
              </label>
              <div className="relative">
                <select
                  id="service"
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-ink outline-none transition-all duration-300 focus:border-brand focus:ring-1 focus:ring-brand appearance-none"
                >
                  <option value="Power System Studies" className="text-ink">Power System Studies</option>
                  <option value="Electrical Design & Engineering" className="text-ink">Electrical Design & Engineering</option>
                  <option value="Automation Solutions" className="text-ink">Automation Solutions</option>
                  <option value="Energy Management" className="text-ink">Energy Management Solutions</option>
                  <option value="Data Center Project" className="text-ink">Data Center Consulting</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2 font-semibold">
                Project Requirements or Message *
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-ink placeholder-slate-400 outline-none transition-all duration-300 focus:border-brand focus:ring-1 focus:ring-brand resize-none"
                placeholder="Tell us about your project or system specifications..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative flex w-full items-center justify-center gap-2 rounded-lg border border-brand bg-brand px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-transparent hover:text-brand disabled:border-slate-100 disabled:bg-slate-200 disabled:text-slate-400 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Configuring transmission...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            className="flex flex-col items-center justify-center py-12 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <CheckCircle2 className="h-16 w-16 text-brand mb-6 animate-bounce" />
            <h3 className="text-2xl font-bold text-ink mb-3">Message Dispatched</h3>
            <p className="text-sm text-slate-600 max-w-sm leading-relaxed mb-8 font-medium">
              Thank you for reaching out. An electrical consulting engineering specialist will review your parameters and follow up within 24 hours.
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              className="text-xs font-mono uppercase tracking-wider text-brand hover:text-brand-dim transition-colors font-semibold"
            >
              ← Submit another request
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
