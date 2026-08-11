"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import {
  Users,
  Zap,
  Globe,
  ShieldCheck,
  ChevronRight,
  Activity,
  Monitor,
  MessagesSquare,
  CircuitBoard,
  Network,
} from "lucide-react";

const HERO_SERVICE_ICONS = [
  { icon: Activity, label: "Power System Studies" },
  { icon: CircuitBoard, label: "Electrical Design" },
  { icon: Network, label: "Smart Grid Solutions" },
  { icon: MessagesSquare, label: "Energy Consulting" },
];

const STATS = [
  { icon: Users, value: "10+", label: "Data Center\nProjects" },
  { icon: Zap, value: "500MW+", label: "Project\nExperience" },
  { icon: Globe, value: "GCC & India", label: "Presence" },
  { icon: ShieldCheck, value: "Trusted by", label: "Global\nPartners" },
];

const CORE_SERVICES = [
  {
    icon: Activity,
    title: "Power System Studies",
    desc: "Load Flow, Short Circuit, Protection Coordination, Arc Flash & more.",
    href: "/services/power-system-analysis",
  },
  {
    icon: ShieldCheck,
    title: "Electrical Design",
    desc: "LV/MV Design, SLD, Calculations, BOQ & Estimation.",
    href: "/services/protection-arc-flash",
  },
  {
    icon: Monitor,
    title: "Software & Tools",
    desc: "ETAP Studies, Automation Solutions & Engineering Software.",
    href: "/services/specialist-studies",
  },
  {
    icon: MessagesSquare,
    title: "Consulting",
    desc: "Energy Audit, Power Quality, Harmonic Analysis & Technical Advisory.",
    href: "/contact",
  },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <>
      {/* ─── HERO ─── */}
      <section
        id="home"
        ref={sectionRef}
        className="relative w-full overflow-hidden bg-white lg:h-screen"
      >
        <div className="flex flex-col lg:block">
          {/* ── VIDEO: full-width banner on mobile/tablet, anchored top-right overlay on desktop ── */}
          <div className="relative h-64 w-full overflow-hidden pointer-events-none sm:h-80 md:h-[26rem] lg:absolute lg:right-0 lg:top-16 lg:z-0 lg:h-[calc(100vh-4rem)] lg:w-auto lg:overflow-visible">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="h-full w-full object-cover lg:w-auto lg:object-contain"
            >
              <source src="/hero-video.mp4" type="video/mp4" />
            </video>

            {/* Left fade: blend video into white text area (desktop overlay only) */}
            <div className="hidden lg:block absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white via-white/40 to-transparent" />

            {/* Bottom fade: blend video into text below (mobile/tablet stack only) */}
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent lg:hidden" />
          </div>

          {/* ── TEXT CONTENT ── */}
          <div className="relative z-10 w-full px-6 md:px-12 lg:max-w-[480px] lg:px-16">
            <div className="flex flex-col justify-center py-10 lg:h-full lg:pt-24 lg:pb-10">
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-[400px]"
              >
                {/* ── HEADING ── */}
                <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-gray-900 sm:text-5xl md:text-[3.5rem] lg:text-[4rem]">
                  Powering a
                  <br />
                  <em className="not-italic font-extrabold text-[#b91c1c] italic">
                    Smarter
                    <br />
                    Tomorrow
                  </em>
                </h1>

                {/* Red accent rule */}
                <div className="mt-4 h-[3px] w-10 rounded-full bg-[#b91c1c]" />

                {/* ── SUBTITLE ── */}
                <p className="mt-5 text-sm font-medium leading-snug text-gray-600 sm:text-[15px]">
                  Intelligent Power System Solutions
                  <br />
                  for a Sustainable World.
                </p>

                {/* ── SERVICE ICON ROW WITH VERTICAL DIVIDERS ── */}
                <div className="mt-8 flex items-start">
                  {HERO_SERVICE_ICONS.map(({ icon: Icon, label }, index) => (
                    <div key={label} className="flex items-start">
                      {/* Vertical divider between items */}
                      {index > 0 && (
                        <div className="mx-2 mt-2 h-10 w-px self-start bg-gradient-to-b from-gray-200 to-transparent sm:mx-3" />
                      )}
                      <div className="group flex flex-col items-center gap-2.5 text-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 ring-1 ring-inset ring-red-100 transition-colors group-hover:bg-red-100 sm:h-11 sm:w-11">
                          <Icon className="h-4 w-4 text-[#b91c1c] sm:h-[18px] sm:w-[18px]" strokeWidth={1.75} />
                        </div>
                        <span className="w-[52px] text-[9px] font-semibold leading-tight tracking-wide text-gray-600 sm:w-[60px] sm:text-[9.5px]">
                          {label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* ── CTA ── */}
                <div className="mt-8">
                  <MagneticButton
                    as="a"
                    href="#solutions"
                    className="inline-flex h-11 items-center gap-3 rounded-full bg-[#b91c1c] px-6 text-[13px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-red-800"
                  >
                    Explore Solutions
                    <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
                  </MagneticButton>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BOTTOM CARDS STRIP ─── */}
      <div className="relative z-20 bg-white px-6 pb-16 pt-0 md:px-12 lg:px-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col gap-5 xl:flex-row">

            {/* STATS CARD (Overlapping Hero) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="relative z-30 -mt-4 flex w-full flex-shrink-0 items-stretch justify-between overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.12)] ring-1 ring-black/[0.02] sm:p-6 md:p-8 xl:-mt-6 xl:w-[420px]"
            >
              {/* Top accent bar */}
              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#b91c1c] via-red-400 to-[#b91c1c]/20" />

              {STATS.map(({ icon: Icon, value, label }, index) => (
                <div key={value} className="flex flex-1 items-stretch">
                  {index > 0 && (
                    <div className="mx-1.5 w-[1.5px] self-center h-16 rounded-full bg-gray-200 sm:mx-3 sm:h-20 md:mx-4" />
                  )}
                  <div className="flex flex-1 flex-col items-center gap-1.5 text-center justify-start sm:gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 sm:h-11 sm:w-11">
                      <Icon className="h-4 w-4 text-[#b91c1c] sm:h-5 sm:w-5" strokeWidth={1.75} />
                    </div>
                    <div className="flex h-7 items-center justify-center px-0.5 sm:h-8">
                      <span className="text-[11px] font-black leading-tight text-gray-900 tracking-tight sm:text-[13px]">
                        {value}
                      </span>
                    </div>
                    <span className="whitespace-pre-line text-[8.5px] font-semibold leading-tight tracking-wide text-gray-500 sm:text-[10px]">
                      {label}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CORE SERVICES */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="flex-grow py-2"
            >
              {/* Card header */}
              <div className="mb-5 flex items-center gap-4">
                <h3 className="text-base font-bold text-gray-900">
                  Our Core Services
                </h3>
                <div className="h-[2px] w-8 rounded-full bg-[#b91c1c]" />
                <span className="h-px flex-grow bg-gray-100" />
              </div>

              {/* 4-column service grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {CORE_SERVICES.map(({ icon: Icon, title, desc, href }, index) => (
                  <motion.a
                    key={title}
                    href={href}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.12,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ y: -4 }}
                    className="group flex flex-col gap-2.5 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-[border-color,background-color,box-shadow] hover:border-red-100 hover:bg-red-50/30 hover:shadow-lg hover:shadow-black/5"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className="h-[18px] w-[18px] flex-shrink-0 text-gray-500 transition-colors group-hover:text-[#b91c1c]"
                        strokeWidth={1.6}
                      />
                      <h4 className="text-[15px] font-semibold leading-tight text-gray-900">
                        {title}
                      </h4>
                    </div>
                    <p className="text-[13px] leading-relaxed text-gray-700">{desc}</p>
                    <div className="mt-auto flex justify-end pt-1">
                      <ChevronRight
                        className="h-4 w-4 text-[#b91c1c] opacity-0 transition-opacity group-hover:opacity-100"
                        strokeWidth={2}
                      />
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </>
  );
}