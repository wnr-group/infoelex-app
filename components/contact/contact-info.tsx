"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Globe, Database } from "lucide-react";

const COUNTRIES = [
  { name: "UAE", flag: "🇦🇪" },
  { name: "Saudi Arabia", flag: "🇸🇦" },
  { name: "Qatar", flag: "🇶🇦" },
  { name: "Turkey", flag: "🇹🇷" },
  { name: "Thailand", flag: "🇹🇭" },
  { name: "Indonesia", flag: "🇮🇩" },
  { name: "Norway", flag: "🇳🇴" },
];

export function ContactInfo() {
  return (
    <div className="space-y-8">
      {/* COIMBATORE OFFICE INFO CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/50 p-8 shadow-sm"
      >
        <div className="absolute right-0 top-0 -z-10 h-32 w-32 rounded-full bg-brand/5 blur-2xl" />
        
        <h3 className="text-xl font-bold text-ink mb-6 flex items-center gap-3">
          <MapPin className="h-5 w-5 text-brand" />
          Headquarters
        </h3>
        
        <div className="space-y-4 text-sm text-slate-600">
          <p className="text-ink leading-relaxed font-semibold">
            Infoelex Electrical Consulting
            <br />
            Coimbatore, Tamil Nadu, India
          </p>
          
          <div className="border-t border-slate-200 pt-4 space-y-3">
            <a
              href="mailto:contact@infoelex.com"
              className="flex items-center gap-3 hover:text-brand transition-colors font-medium"
            >
              <Mail className="h-4 w-4 text-brand" />
              <span>contact@infoelex.com</span>
            </a>
            
            <a
              href="tel:+914220000000"
              className="flex items-center gap-3 hover:text-brand transition-colors font-medium"
            >
              <Phone className="h-4 w-4 text-brand" />
              <span>+91 422 400 0000</span>
            </a>
          </div>

          <div className="mt-6 font-mono text-[10px] text-brand/60 tracking-wider">
            COORD: 11.0168° N, 76.9558° E
          </div>
        </div>
      </motion.div>

      {/* DATA CENTER EXCELLENCE CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/50 p-8 shadow-sm"
      >
        <div className="absolute right-0 bottom-0 -z-10 h-32 w-32 rounded-full bg-brand/5 blur-2xl" />
        
        <h3 className="text-xl font-bold text-ink mb-4 flex items-center gap-3">
          <Database className="h-5 w-5 text-brand" />
          Data Center Track Record
        </h3>

        <div className="mb-6">
          <div className="text-4xl font-extrabold text-brand">20+</div>
          <div className="text-xs uppercase tracking-wider text-slate-500 font-mono mt-1 font-semibold">
            Completed Assignments Globally
          </div>
        </div>
        
        <p className="text-sm text-slate-600 leading-relaxed mb-6 font-medium">
          Specialized electrical design, automation, and power system studies for hyperscale and enterprise digital infrastructure.
        </p>

        <div className="space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-2 font-semibold">
            <Globe className="h-3.5 w-3.5 text-brand" />
            Active Markets & Regions:
          </div>
          <div className="flex flex-wrap gap-2">
            {COUNTRIES.map((country) => (
              <span
                key={country.name}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white px-3 py-1 text-xs text-slate-700 font-semibold shadow-xs hover:border-brand/40 transition-colors"
              >
                <span>{country.flag}</span>
                <span>{country.name}</span>
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
