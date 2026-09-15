"use client";

import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import { SectionLabel } from "@/components/ui/section-label";
import { Logo } from "@/components/layout/navbar";

import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Sector", href: "#sector" },
  { label: "Services", href: "#services" },
  { label: "About", href: "/about" },
  { label: "CSR", href: "/csr" },
  { label: "Contact", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms", href: "#" },
];

function FooterLink({ label, href, isHome }: { label: string; href: string; isHome: boolean }) {
  const resolvedHref = href.startsWith("#") ? (isHome ? href : `/${href}`) : href;
  return (
    <a
      href={resolvedHref}
      className="group inline-flex w-fit items-center gap-2.5 text-sm text-paper/75 transition-colors duration-300 hover:text-paper"
    >
      <span className="h-px w-3 bg-white/20 transition-all duration-300 ease-out group-hover:w-5 group-hover:bg-brand" />
      {label}
    </a>
  );
}

export function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink text-paper">
      {/* TECHNICAL GRID BACKDROP */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(250,250,249,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(250,250,249,0.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[420px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-[180px]" />

      <div className="mx-auto max-w-[1440px] px-6 pt-20 md:px-10">
        {/* CTA ROW */}
        <RevealOnScroll
          direction="up"
          className="flex flex-col gap-8 border-b border-white/10 pb-14 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <SectionLabel light>Let&apos;s build together</SectionLabel>
            <h2 className="mt-5 max-w-lg text-balance text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl">
              Ready to power your next deployment?
            </h2>
          </div>
          <a
            href="/contact"
            className="group relative inline-flex w-fit items-center gap-2.5 overflow-hidden rounded-[4px] border border-brand bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-transparent hover:text-brand"
          >
            <span className="relative z-10">Let&apos;s Talk</span>
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-12 py-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <a href={isHome ? "#home" : "/"} className="inline-block" aria-label="Infoelex home">
              <Logo isDarkBg />
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-graphite">
              Thinking Beyond.
              <br />
              Thinking Future.
            </p>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <SectionLabel light>Navigation</SectionLabel>
            <nav className="mt-6 flex flex-col gap-3.5">
              {NAV_LINKS.map((link) => (
                <FooterLink key={link.href} {...link} isHome={isHome} />
              ))}
            </nav>
          </div>

          <div className="md:col-span-3">
            <SectionLabel light>Legal</SectionLabel>
            <nav className="mt-6 flex flex-col gap-3.5">
              {LEGAL_LINKS.map((link) => (
                <FooterLink key={link.label} {...link} isHome={isHome} />
              ))}
            </nav>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="mt-8 border-t border-white/10 py-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-sm text-graphite">
            <p className="order-2 md:order-1 opacity-80">
              © {new Date().getFullYear()} Infoelex. All rights reserved.
            </p>
            <div className="order-1 md:order-2 flex items-center gap-2">
              <span className="opacity-60">Powered by</span>
              <a
                href="https://www.wnradvisory.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-1.5 font-bold tracking-wider text-paper/90 transition-colors duration-300 hover:text-brand"
              >
                <span>WnR Groups</span>
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand/65 opacity-75 duration-1000" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
