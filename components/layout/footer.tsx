"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/layout/navbar";
import { CONTACT, SECTORS } from "@/components/site/data";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Our Edge", href: "/our-edge" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Critical Power", href: "/critical-power" },
  { label: "Projects", href: "/projects" },
  { label: "Our Signature", href: "/our-signature" },
  { label: "Beyond Engineering", href: "/beyond-engineering" },
  { label: "About", href: "/about" },
  { label: "CSR", href: "/csr" },
  { label: "Contact", href: "/contact" },
];

const SERVICES = [
  { label: "Power System Analysis", href: "/services/power-system-analysis" },
  { label: "Power Quality", href: "/services/power-quality" },
  { label: "Compliance Studies", href: "/services/compliance-studies" },
  { label: "Protection & Arc Flash", href: "/services/protection-arc-flash" },
  { label: "Dynamic & Transients", href: "/services/dynamic-transients-rms" },
  { label: "EMT Studies", href: "/services/electromagnetic-transients-emt" },
  { label: "Earthing & Grounding", href: "/services/earthing-grounding" },
  { label: "Specialist Studies", href: "/services/specialist-studies" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms" },
];

function Column({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  return (
    <nav aria-label={title}>
      <h2 className="text-eyebrow font-semibold uppercase text-steel">{title}</h2>
      <ul className="mt-5 space-y-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-[15px] text-graphite-600 transition-colors duration-200 hover:text-signal">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  const pathname = usePathname();
  const showCta = pathname !== "/" && pathname !== "/contact";

  return (
    <div className="bg-canvas pt-6">
    <footer className="rounded-t-[2rem] border border-b-0 border-hairline bg-canvas-2 text-graphite-950 md:rounded-t-[2.5rem]">
      <div className="wrap">
        {showCta && (
          <div className="flex flex-col gap-6 border-b border-hairline py-12 md:flex-row md:items-center md:justify-between">
            <p className="font-display max-w-lg text-section text-balance">Ready to power your next deployment?</p>
            <Link
              href="/contact"
              className="group inline-flex w-fit items-center gap-3 rounded-full bg-brand px-7 py-3.5 text-[12.5px] font-bold uppercase tracking-[0.1em] text-white transition-colors duration-300 hover:bg-brand-dim"
            >
              Let&apos;s talk
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        )}

        <div className="flex flex-col gap-5 pb-10 pt-14 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="inline-block" aria-label="Infoelex home">
            <Logo />
          </Link>
          <p className="text-sm font-medium text-graphite-600 sm:text-right">
            Thinking Beyond. Thinking Future.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-12 border-t border-hairline py-12 lg:grid-cols-4 lg:gap-x-10">
          <div className="col-span-2 lg:col-span-1">
            <h2 className="text-eyebrow font-semibold uppercase text-steel">Contact</h2>
            <address className="mt-5 space-y-3 text-[15px] not-italic leading-relaxed text-graphite-600">
              <p>
                {CONTACT.office[0]}
                <br />
                {CONTACT.office[1]}
              </p>
              <p>
                <a href={`mailto:${CONTACT.email}`} className="font-medium text-graphite-950 transition-colors hover:text-signal">{CONTACT.email}</a>
              </p>
              <p>
                <a href={CONTACT.phoneHref} className="transition-colors hover:text-signal">{CONTACT.phone}</a>
              </p>
            </address>
          </div>
          <Column title="Navigation" links={NAV_LINKS} />
          <Column title="Sectors" links={SECTORS} />
          <Column title="Services" links={SERVICES} />
        </div>

        <div className="flex flex-col gap-4 border-t border-hairline py-6 text-sm text-steel md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <p>© {new Date().getFullYear()} INFOELEX Private Limited. All rights reserved.</p>
            {LEGAL_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="transition-colors hover:text-graphite-950">{l.label}</Link>
            ))}
          </div>
          <p className="flex items-center gap-2">
            Powered by
            <a
              href="https://www.wnradvisory.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-bold tracking-wider text-graphite-950 transition-colors hover:text-signal"
            >
              WnR Groups
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-signal" />
            </a>
          </p>
        </div>
      </div>
    </footer>
    </div>
  );
}
