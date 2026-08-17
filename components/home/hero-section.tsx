"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import {
  Users,
  Zap,
  Globe,
  ShieldCheck,
  ChevronRight,
  Activity,
  Monitor,
  MessagesSquare,
} from "lucide-react";

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
        className="relative w-full overflow-hidden bg-white"
      >
        <div className="relative w-full pointer-events-none">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            tabIndex={-1}
            className="block h-auto w-full border-none outline-none"
          >
            <source src="/homepage-hero-section-video.mp4" type="video/mp4" />
          </video>
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
              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand via-red-400 to-brand/20" />

              {STATS.map(({ icon: Icon, value, label }, index) => (
                <div key={value} className="flex flex-1 items-stretch">
                  {index > 0 && (
                    <div className="mx-1.5 w-[1.5px] self-center h-16 rounded-full bg-gray-200 sm:mx-3 sm:h-20 md:mx-4" />
                  )}
                  <div className="flex flex-1 flex-col items-center gap-1.5 text-center justify-start sm:gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 sm:h-11 sm:w-11">
                      <Icon className="h-4 w-4 text-brand sm:h-5 sm:w-5" strokeWidth={1.75} />
                    </div>
                    <div className="flex h-8 items-center justify-center px-0.5 sm:h-9">
                      <span className="text-[13px] font-black leading-tight text-gray-900 tracking-tight sm:text-base">
                        {value}
                      </span>
                    </div>
                    <span className="whitespace-pre-line text-[10.5px] font-semibold leading-tight tracking-wide text-gray-500 sm:text-xs">
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
              <div className="mb-5">
                <h3 className="text-base font-bold text-gray-900">
                  Our Core Services
                </h3>
                <div className="mt-2 flex items-center gap-4">
                  <div className="h-[2px] w-8 rounded-full bg-brand" />
                  <span className="h-px flex-grow bg-gray-100" />
                </div>
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
                        className="h-[18px] w-[18px] flex-shrink-0 text-gray-500 transition-colors group-hover:text-brand"
                        strokeWidth={1.6}
                      />
                      <h4 className="text-[15px] font-semibold leading-tight text-gray-900">
                        {title}
                      </h4>
                    </div>
                    <p className="text-[13px] leading-relaxed text-gray-700">{desc}</p>
                    <div className="mt-auto flex justify-end pt-1">
                      <ChevronRight
                        className="h-4 w-4 text-brand opacity-0 transition-opacity group-hover:opacity-100"
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