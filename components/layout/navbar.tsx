"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

type NavItem = { label: string; href: string };

const NAV_ITEMS: NavItem[] = [
  { label: "Our Edge", href: "/our-edge" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Critical Power", href: "/critical-power" },
  { label: "Projects", href: "/projects" },
  { label: "Our Signature", href: "/our-signature" },
  { label: "Beyond Engineering", href: "/beyond-engineering" },
];

/** Routes whose first screen is a dark image, so the transparent header needs the light logo and light text. */
const DARK_TOP = ["/about"];

export function Logo({ floating = false, isDarkBg = false }: { floating?: boolean; isDarkBg?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={isDarkBg ? "/logo-light.svg" : "/logo.svg"}
      alt="Infoelex Private Limited"
      className={cn(
        "h-10 w-auto sm:h-11 md:h-[52px]",
        floating && isDarkBg && "drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
      )}
    />
  );
}

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const isDarkBg = !scrolled && DARK_TOP.includes(pathname);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled
            ? isHome
              ? "border-b border-hairline bg-canvas/75 shadow-none backdrop-blur-xl"
              : "bg-white shadow-md"
            : "bg-transparent shadow-none"
        )}
      >
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 md:px-10 lg:px-14 xl:px-16">
          {/* LOGO */}
          <Link href="/" className="flex-shrink-0" aria-label="Infoelex home">
            <Logo floating={!scrolled} isDarkBg={isDarkBg} />
          </Link>

          {/* DESKTOP NAV */}
          <nav
            aria-label="Primary"
            className={cn("hidden items-center xl:flex", isDarkBg && "[filter:drop-shadow(0_2px_4px_rgba(0,0,0,0.3))]")}
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "relative px-3 py-2 text-[12px] font-semibold uppercase tracking-[0.08em] transition-colors duration-200 2xl:px-4",
                  isActive(item.href) ? "text-brand" : isDarkBg ? "text-white/90 hover:text-white" : "text-gray-700 hover:text-brand"
                )}
              >
                {item.label}
                {isActive(item.href) && (
                  <motion.span layoutId="nav-active" className="absolute inset-x-3 -bottom-0.5 h-0.5 bg-brand 2xl:inset-x-4" transition={{ duration: 0.35, ease: EASE }} />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA BUTTON */}
          <div className="hidden xl:block">
            <Link
              href="/contact"
              aria-current={isActive("/contact") ? "page" : undefined}
              className="inline-flex items-center gap-2 bg-brand px-5 py-2.5 text-[12.5px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-brand-dim"
            >
              Contact
              <span className="text-base leading-none">→</span>
            </Link>
          </div>

          {/* MOBILE HAMBURGER */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className={cn(
              "relative z-[60] flex h-10 w-10 items-center justify-center transition-colors duration-200 xl:hidden",
              mobileOpen ? "text-gray-800" : isDarkBg ? "text-white hover:text-brand" : "text-gray-800 hover:text-brand",
              isDarkBg && !mobileOpen && "[filter:drop-shadow(0_2px_4px_rgba(0,0,0,0.5))]"
            )}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.25 }}>
                  <X className="h-6 w-6" />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.25 }}>
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
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-white xl:hidden"
          >
            <div className="relative flex h-20 items-center justify-between border-b border-gray-100 px-6">
              <Link href="/" onClick={() => setMobileOpen(false)} aria-label="Infoelex home">
                <Logo />
              </Link>
              <button type="button" aria-label="Close menu" onClick={() => setMobileOpen(false)} className="flex h-10 w-10 flex-shrink-0 items-center justify-center text-gray-800">
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav aria-label="Mobile" className="relative flex flex-1 flex-col justify-center px-6 py-8">
              {[{ label: "Home", href: "/" }, ...NAV_ITEMS].map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.55, delay: 0.12 + i * 0.05, ease: EASE }}
                  className="border-b border-gray-100"
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn("flex items-center justify-between py-4 text-lg font-semibold transition-colors active:text-brand sm:text-xl", isActive(item.href) ? "text-brand" : "text-gray-900")}
                  >
                    {item.label}
                    <span aria-hidden className="text-gray-300">→</span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.55, delay: 0.55, ease: EASE }} className="relative px-6 pb-10">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="flex w-full items-center justify-center gap-2 border border-brand bg-brand px-6 py-4 text-base font-semibold text-white"
              >
                Contact
                <span>→</span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
