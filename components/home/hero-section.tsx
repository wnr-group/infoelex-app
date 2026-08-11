"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { HeroHotspots } from "@/components/home/hero-hotspots";
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
  BarChart3,
} from "lucide-react";

const HERO_SERVICE_ICONS = [
  { icon: Activity, label: "Power System Studies" },
  { icon: ShieldCheck, label: "Electrical Design" },
  { icon: BarChart3, label: "Smart Grid Solutions" },
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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const hotspotOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <>
      {/* ─── HERO ─── */}
      <section
        id="home"
        ref={sectionRef}
        className="relative h-screen w-full overflow-hidden bg-white"
      >
        {/* ── RIGHT: Full-bleed video — anchored top-right, natural aspect ratio, nothing cropped ── */}
        <div className="absolute right-0 top-16 z-0 h-[calc(100vh-4rem)] pointer-events-none">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            style={{ height: "100%", width: "auto" }}
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>

          {/* Left fade: blend video into white text area */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white via-white/40 to-transparent" />

          {/* INTERACTIVE HOTSPOT LAYER */}
          <motion.div
            style={{ opacity: hotspotOpacity }}
            className="absolute inset-0 z-10 pointer-events-auto"
          >
            <HeroHotspots />
          </motion.div>
        </div>

        {/* ── LEFT: Text content ── */}
        <div className="relative z-10 w-full max-w-[480px] px-6 md:px-12 lg:px-16">
          <div className="flex h-full flex-col justify-center pt-24 pb-10">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-[400px]"
            >
              {/* ── HEADING ── */}
              <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-gray-900 sm:text-[3.5rem] md:text-[4rem]">
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
                      <div className="mx-3 mt-1 h-9 w-px self-start bg-gray-200" />
                    )}
                    <div className="flex flex-col items-center gap-2 text-center">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm">
                        <Icon className="h-4 w-4 text-gray-600" strokeWidth={1.6} />
                      </div>
                      <span className="w-[56px] text-[9.5px] font-medium leading-tight text-gray-500">
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
                  className="inline-flex h-11 items-center gap-3 bg-[#b91c1c] px-6 text-[13px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-red-800"
                >
                  Explore Solutions
                  <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
                </MagneticButton>
              </div>
            </motion.div>
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
              className="flex w-full flex-shrink-0 items-stretch justify-between rounded-2xl border border-gray-100 bg-white p-8 shadow-xl shadow-black/5 xl:w-[420px] relative z-30 -mt-10 xl:-mt-12"
            >
              {STATS.map(({ icon: Icon, value, label }, index) => (
                <div key={value} className="flex flex-1 items-stretch">
                  {index > 0 && (
                    <div className="mx-4 w-px bg-gray-100 self-center h-12" />
                  )}
                  <div className="flex flex-1 flex-col items-center gap-1 text-center justify-center">
                    <Icon className="h-5 w-5 text-gray-600" strokeWidth={1.5} />
                    <span className="text-lg font-extrabold leading-none text-gray-900 tracking-tight">
                      {value}
                    </span>
                    <span className="whitespace-pre-line text-[9px] font-bold uppercase leading-tight tracking-wider text-gray-400">
                      {label}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CORE SERVICES */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
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
                {CORE_SERVICES.map(({ icon: Icon, title, desc, href }) => (
                  <a
                    key={title}
                    href={href}
                    className="group flex flex-col gap-2.5 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:border-red-100 hover:bg-red-50/30 hover:shadow-md"
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
                  </a>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </>
  );
}