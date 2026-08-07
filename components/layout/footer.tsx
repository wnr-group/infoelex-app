"use client";

import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Sector", href: "#sector" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms", href: "#" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink text-paper">
      <div className="mx-auto max-w-[1440px] px-6 pt-20 md:px-10">
        <div className="grid grid-cols-1 gap-12 pb-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <span className="text-lg font-bold tracking-[0.2em]">INFOELEX</span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-graphite">
              Thinking Beyond.
              <br />
              Thinking Future.
            </p>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-graphite">
              Navigation
            </span>
            <nav className="mt-5 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="w-fit text-sm text-paper/80 transition-colors hover:text-brand"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="md:col-span-3">
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-graphite">
              Legal
            </span>
            <nav className="mt-5 flex flex-col gap-3">
              {LEGAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="w-fit text-sm text-paper/80 transition-colors hover:text-brand"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-xs text-graphite md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Infoelex. All rights reserved.</span>
          <span>Digital infrastructure for the connected world.</span>
        </div>
      </div>

      <RevealOnScroll direction="up" amount={0.4}>
        <div className="select-none overflow-hidden px-6 md:px-10">
          <span
            className="block translate-y-[0.08em] text-center font-bold leading-none tracking-tight text-transparent"
            style={{
              fontSize: "clamp(3.5rem, 16vw, 13rem)",
              WebkitTextStroke: "1px rgba(250,250,249,0.14)",
            }}
          >
            INFOELEX
          </span>
        </div>
      </RevealOnScroll>
    </footer>
  );
}
