"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { NavMegaMenu, type MegaMenuItem } from "@/components/layout/nav-mega-menu";

const EASE = [0.16, 1, 0.3, 1] as const;

const SECTORS_MENU: MegaMenuItem[] = [
  { title: "Power Generation", href: "/sectors/power-generation" },
  { title: "Renewables & Energy Storage", href: "/sectors/renewables-energy-storage" },
  { title: "Transmission & Distribution", href: "/sectors/transmission-distribution" },
  { title: "Oil, Gas & Petrochemical", href: "/sectors/oil-gas-petrochemical" },
  { title: "Industrial", href: "/sectors/industrial" },
  { title: "Data Centres", href: "/sectors/data-centres" },
  { title: "Building Services", href: "/sectors/building-services" },
  { title: "Water", href: "/sectors/water" },
];

const SERVICES_MENU: MegaMenuItem[] = [
  { title: "Power System Analysis", href: "/services/power-system-analysis" },
  { title: "Power Quality", href: "/services/power-quality" },
  { title: "Compliance Studies", href: "/services/compliance-studies" },
  { title: "Protection & Arc Flash", href: "/services/protection-arc-flash" },
  { title: "Dynamic & Transients (RMS)", href: "/services/dynamic-transients-rms" },
  { title: "Electromagnetic Transients (EMT)", href: "/services/electromagnetic-transients-emt" },
  { title: "Earthing & Grounding", href: "/services/earthing-grounding" },
  { title: "Specialist Studies", href: "/services/specialist-studies" },
];

type NavItem = {
  label: string;
  href: string;
  mega?: MegaMenuItem[];
};

const NAV_ITEMS: NavItem[] = [
  { label: "Sectors", href: "#sector", mega: SECTORS_MENU },
  { label: "Services", href: "#services", mega: SERVICES_MENU },
  { label: "About Us", href: "/about" },
  { label: "CSR", href: "/csr" },
];

export function Logo({ floating = false, isDarkBg = false }: { floating?: boolean; isDarkBg?: boolean }) {
  return (
    <div
      className={cn(
        "flex max-w-[180px] flex-col leading-none sm:max-w-none",
        floating && !isDarkBg &&
          "[text-shadow:-1px_-1px_2px_#fff,1px_-1px_2px_#fff,-1px_1px_2px_#fff,1px_1px_2px_#fff,0_0_10px_rgba(255,255,255,0.95)]",
        floating && isDarkBg &&
          "[text-shadow:0_2px_4px_rgba(0,0,0,0.5)]"
      )}
    >
      <span className="text-[21px] font-extrabold italic tracking-tight text-brand sm:text-[26px] md:text-[29px]">
        Infoelex
      </span>
      <span
        className={cn(
          "truncate text-[8px] font-medium tracking-wide sm:text-[10px] md:text-[11px]",
          isDarkBg ? "text-gray-400" : "text-gray-500"
        )}
      >
        Information Electrical Technologies (IET)
      </span>
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const isDarkBg = !scrolled && pathname === "/about";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [active, setActive] = useState("#home");
  const headerRef = useRef<HTMLElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => setOpenMenu(null), 200);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.filter((item) => item.href.startsWith("#"))
      .map((item) => document.querySelector(item.href))
      .filter((el): el is Element => el !== null);

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

  useEffect(() => {
    return () => clearCloseTimeout();
  }, []);

  // Pipe-separated links: show | before "About Us" and "CSR"
  const PIPE_BEFORE = ["About Us", "CSR"];

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300",
          scrolled
            ? "bg-white shadow-md"
            : "bg-transparent shadow-none"
        )}
        onMouseEnter={clearCloseTimeout}
        onMouseLeave={scheduleClose}
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 md:px-10 lg:px-14 xl:px-16">

          {/* LOGO */}
          <a
            href={isHome ? "#home" : "/"}
            className="flex-shrink-0"
            aria-label="Infoelex home"
          >
            <Logo floating={!scrolled} isDarkBg={isDarkBg} />
          </a>

          {/* DESKTOP NAV */}
          <nav
            className={cn(
              "hidden items-center md:flex",
              !scrolled && !isDarkBg &&
                "[filter:drop-shadow(1px_1px_1px_#fff)_drop-shadow(-1px_-1px_1px_#fff)_drop-shadow(0_0_8px_rgba(255,255,255,0.9))]",
              !scrolled && isDarkBg &&
                "[filter:drop-shadow(0_2px_4px_rgba(0,0,0,0.3))]"
            )}
          >
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="flex items-center">
                {/* Pipe separator before certain items */}
                {PIPE_BEFORE.includes(item.label) && (
                  <span
                    className={cn(
                      "mx-2 h-4 w-px transition-colors duration-200",
                      isDarkBg ? "bg-white/20" : "bg-gray-300"
                    )}
                    aria-hidden="true"
                  />
                )}

                {item.mega ? (
                  <div className="relative">
                    <button
                      type="button"
                      aria-haspopup="true"
                      aria-expanded={openMenu === item.label}
                      onMouseEnter={() => {
                        clearCloseTimeout();
                        setOpenMenu(item.label);
                      }}
                      onClick={() =>
                        setOpenMenu((current) =>
                          current === item.label ? null : item.label
                        )
                      }
                      className={cn(
                        "flex items-center gap-1 px-3 py-1.5 text-[12.5px] font-semibold uppercase tracking-[0.08em] transition-colors duration-200",
                        (active === item.href || pathname === item.href)
                          ? "text-brand"
                          : isDarkBg
                          ? "text-white/90 hover:text-brand"
                          : "text-gray-700 hover:text-brand"
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "h-3 w-3 transition-transform duration-200",
                          openMenu === item.label
                            ? "rotate-180 text-brand"
                            : isDarkBg
                            ? "text-white/60"
                            : "text-gray-500"
                        )}
                      />
                    </button>

                    <AnimatePresence>
                      {openMenu === item.label && (
                        <NavMegaMenu items={item.mega} onNavigate={() => setOpenMenu(null)} />
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <a
                    href={item.href.startsWith("#") ? (isHome ? item.href : `/${item.href}`) : item.href}
                    onMouseEnter={() => {
                      clearCloseTimeout();
                      setOpenMenu(null);
                    }}
                    className={cn(
                      "relative px-3 py-1.5 text-[12.5px] font-semibold uppercase tracking-[0.08em] transition-colors duration-200",
                      (active === item.href || pathname === item.href)
                        ? "text-brand"
                        : isDarkBg
                        ? "text-white/90 hover:text-brand"
                        : "text-gray-700 hover:text-brand"
                    )}
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
          </nav>

          {/* CTA BUTTON */}
          <div className="hidden md:block">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-brand px-5 py-2.5 text-[12.5px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-red-800"
            >
              Get in Touch
              <span className="text-base leading-none">→</span>
            </a>
          </div>

          {/* MOBILE HAMBURGER */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className={cn(
              "relative z-[60] flex h-10 w-10 items-center justify-center md:hidden transition-colors duration-200",
              mobileOpen
                ? "text-gray-800"
                : isDarkBg
                ? "text-white hover:text-brand"
                : "text-gray-800 hover:text-brand",
              !scrolled &&
                !mobileOpen &&
                !isDarkBg &&
                "[filter:drop-shadow(1px_1px_1px_#fff)_drop-shadow(-1px_-1px_1px_#fff)_drop-shadow(0_0_8px_rgba(255,255,255,0.9))]",
              !scrolled &&
                !mobileOpen &&
                isDarkBg &&
                "[filter:drop-shadow(0_2px_4px_rgba(0,0,0,0.5))]"
            )}
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
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-white md:hidden"
          >
            <div className="relative flex h-16 items-center justify-between border-b border-gray-100 px-6">
              <a
                href={isHome ? "#home" : "/"}
                onClick={() => setMobileOpen(false)}
                aria-label="Infoelex home"
              >
                <Logo />
              </a>

              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center text-gray-800"
              >
                <X className="h-6 w-6" />
              </button>
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
                  className="border-b border-gray-100"
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
                        className="flex w-full items-center justify-between gap-4 py-4 text-left"
                      >
                        <span className="text-base font-semibold text-gray-900 sm:text-xl">
                          {item.label}
                        </span>
                        <ChevronDown
                          className={cn(
                            "h-5 w-5 shrink-0 text-gray-400 transition-transform duration-300",
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
                              {item.mega.map((sub) => (
                                <a
                                  key={sub.title}
                                  href={sub.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="text-base font-medium text-gray-600 transition-colors active:text-brand"
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
                      href={item.href.startsWith("#") ? (isHome ? item.href : `/${item.href}`) : item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-4 text-base font-semibold text-gray-900 transition-colors active:text-brand sm:text-xl"
                    >
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
                href="/contact"
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
