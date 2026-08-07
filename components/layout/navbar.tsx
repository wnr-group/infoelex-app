"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { NavMegaMenu, type MegaMenuData } from "@/components/layout/nav-mega-menu";

const EASE = [0.16, 1, 0.3, 1] as const;

const SECTORS_MENU: MegaMenuData = {
  eyebrow: "Sectors",
  description:
    "Engineering expertise applied across the industries that power the modern world.",
  items: [
    { index: "01", title: "Power Generation", href: "/sectors/power-generation" },
    { index: "02", title: "Renewables & Energy Storage", href: "/sectors/renewables-energy-storage" },
    { index: "03", title: "Transmission & Distribution", href: "/sectors/transmission-distribution" },
    { index: "04", title: "Oil, Gas & Petrochemical", href: "/sectors/oil-gas-petrochemical" },
    { index: "05", title: "Industrial", href: "/sectors/industrial" },
    { index: "06", title: "Data Centres", href: "/sectors/data-centres" },
    { index: "07", title: "Building Services", href: "/sectors/building-services" },
    { index: "08", title: "Water", href: "/sectors/water" },
  ],
  featured: {
    label: "Capacity",
    value: "500+ MW",
    description: "Delivered across power, energy and infrastructure sectors.",
    href: "#sector",
  },
};

const SERVICES_MENU: MegaMenuData = {
  eyebrow: "Services",
  description:
    "Specialist studies and analysis across every stage of power system design and operation.",
  items: [
    { index: "01", title: "Power System Analysis", href: "#services" },
    { index: "02", title: "Power Quality", href: "#services" },
    { index: "03", title: "Compliance Studies", href: "#services" },
    { index: "04", title: "Protection & Arc Flash", href: "#services" },
    { index: "05", title: "Dynamic & Transients (RMS)", href: "#services" },
    { index: "06", title: "Electromagnetic Transients (EMT)", href: "#services" },
    { index: "07", title: "Earthing & Grounding", href: "#services" },
    { index: "08", title: "Specialist Studies", href: "#services" },
  ],
  featured: {
    label: "Reliability",
    value: "99.999%",
    description: "Engineered into every study and deployment.",
    href: "#services",
  },
};

type NavItem = {
  label: string;
  href: string;
  mega?: MegaMenuData;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Sectors", href: "#sector", mega: SECTORS_MENU },
  { label: "Services", href: "#services", mega: SERVICES_MENU },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function LogoMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="0.75" y="0.75" width="18.5" height="18.5" stroke="#DF2C1C" strokeWidth="1" />
      <rect x="6.5" y="6.5" width="7" height="7" fill="#DF2C1C" />
    </svg>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [active, setActive] = useState("#home");
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.querySelector(item.href)
    ).filter((el): el is Element => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!openMenu) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    const onPointerDown = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [openMenu]);

  const chrome = !isHome || scrolled || openMenu !== null;
  const activeMega = NAV_ITEMS.find((item) => item.label === openMenu)?.mega;

  return (
    <>
      <header
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4"
        onMouseLeave={() => setOpenMenu(null)}
      >
        <div className="relative mx-auto max-w-[1440px]">
          <div
            className={cn(
              "flex h-[68px] items-center justify-between rounded-2xl border px-5 transition-all duration-500 md:h-20 md:px-7",
              chrome
                ? "border-white/10 bg-ink/85 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl"
                : "border-white/10 bg-white/[0.04] backdrop-blur-md"
            )}
          >
            <a
              href="#home"
              className="flex items-center gap-2.5 text-[15px] font-bold tracking-[0.22em] text-paper"
            >
              <LogoMark />
              INFOELEX
            </a>

            <nav className="hidden items-center gap-1 md:flex">
              {NAV_ITEMS.map((item) =>
                item.mega ? (
                  <div key={item.label} className="relative">
                    <button
                      type="button"
                      aria-haspopup="true"
                      aria-expanded={openMenu === item.label}
                      onMouseEnter={() => setOpenMenu(item.label)}
                      onClick={() =>
                        setOpenMenu((current) =>
                          current === item.label ? null : item.label
                        )
                      }
                      className="group relative flex items-center gap-1.5 rounded-lg px-4 py-2 text-[13px] font-medium uppercase tracking-[0.12em] text-paper/80 transition-colors duration-300 hover:text-paper"
                    >
                      <span className="relative inline-flex items-center gap-2">
                        {active === item.href && (
                          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                        )}
                        {item.label}
                      </span>
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 text-graphite transition-transform duration-300",
                          openMenu === item.label && "rotate-180 text-brand"
                        )}
                      />
                    </button>
                  </div>
                ) : (
                  <a
                    key={item.href}
                    href={item.href}
                    onMouseEnter={() => setOpenMenu(null)}
                    className="group relative rounded-lg px-4 py-2 text-[13px] font-medium uppercase tracking-[0.12em] text-paper/80 transition-colors duration-300 hover:text-paper"
                  >
                    <span className="relative inline-flex items-center gap-2">
                      {active === item.href && (
                        <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                      )}
                      {item.label}
                    </span>
                    <span
                      className={cn(
                        "absolute inset-x-4 -bottom-0.5 h-px bg-brand transition-transform duration-300 ease-out",
                        active === item.href
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      )}
                    />
                  </a>
                )
              )}
            </nav>

            <div className="hidden md:block">
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-[4px] border border-brand bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-transparent hover:text-brand"
              >
                <span className="relative z-10">Let&apos;s Talk</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>

            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="relative z-[60] flex h-10 w-10 items-center justify-center text-paper md:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          <AnimatePresence>
            {activeMega && (
              <NavMegaMenu data={activeMega} onNavigate={() => setOpenMenu(null)} />
            )}
          </AnimatePresence>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-ink md:hidden"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.15]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(250,250,249,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(250,250,249,0.6) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />

            <div className="relative flex h-[68px] items-center justify-between px-6">
              <span className="flex items-center gap-2.5 text-[15px] font-bold tracking-[0.22em] text-paper">
                <LogoMark />
                INFOELEX
              </span>
            </div>

            <nav className="relative flex flex-1 flex-col justify-center gap-1 px-6 py-8">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.55,
                    delay: 0.12 + i * 0.06,
                    ease: EASE,
                  }}
                  className="border-b border-white/10"
                >
                  {item.mega ? (
                    <>
                      <button
                        type="button"
                        aria-expanded={mobileExpanded === item.label}
                        onClick={() =>
                          setMobileExpanded((current) =>
                            current === item.label ? null : item.label
                          )
                        }
                        className="flex w-full items-center justify-between gap-4 py-5 text-left"
                      >
                        <span className="flex items-baseline gap-3">
                          <span className="font-mono text-xs font-semibold text-brand">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="text-3xl font-semibold text-paper/90">
                            {item.label}
                          </span>
                        </span>
                        <ChevronDown
                          className={cn(
                            "h-5 w-5 shrink-0 text-graphite transition-transform duration-300",
                            mobileExpanded === item.label && "rotate-180 text-brand"
                          )}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {mobileExpanded === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: EASE }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-4 pb-6 pl-9">
                              {item.mega.items.map((sub) => (
                                <a
                                  key={sub.title}
                                  href={sub.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="text-base font-medium text-paper/70 transition-colors active:text-brand"
                                >
                                  {sub.title}
                                </a>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <a
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-baseline gap-3 py-5 text-3xl font-semibold text-paper/90 transition-colors active:text-brand"
                    >
                      <span className="font-mono text-xs font-semibold text-brand">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item.label}
                    </a>
                  )}
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.55, ease: EASE }}
              className="relative px-6 pb-10"
            >
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-[4px] border border-brand bg-brand px-6 py-4 text-base font-semibold text-white"
              >
                Let&apos;s Talk
                <span>→</span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
