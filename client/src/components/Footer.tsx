/*
 * DESIGN: Institutional — Footer
 * Deep navy background. Clean 4-column grid.
 * Logo, tagline, compliance badges, nav links, contact, social.
 */
import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[oklch(0.18_0.04_155)] border-t border-[oklch(0.26_0.03_155)]">
      <div className="container py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Logo + tagline */}
          <div className="md:col-span-4">
            <Link href="/">
              <a className="flex items-center gap-2.5 mb-4">
                <img
                  src="/logo-dark.png"
                  alt="Civic Firm"
                  className="h-8 w-auto object-contain"
                  style={{ maxWidth: '200px' }}
                />
              </a>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-5">
              Institutional digital partner for governments, school districts, nonprofits, and public organizations across North America.
            </p>
            <div className="flex flex-wrap gap-2">
              {["WCAG 2.1 AA", "ADA Compliant", "Mobile-First"].map((badge) => (
                <span key={badge} className="text-[9px] uppercase tracking-[0.12em] text-primary border border-primary/30 px-2 py-1 rounded">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div className="md:col-span-2">
            <h5 className="text-white text-xs uppercase tracking-[0.18em] font-semibold mb-4">
              Navigate
            </h5>
            <div className="flex flex-col gap-3">
              {[
                { label: "Work", href: "/#work" },
                { label: "Services", href: "/#services" },
                { label: "Sectors", href: "/#sectors" },
                { label: "Process", href: "/#process" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-white/50 text-sm hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <Link href="/rfp">
                <a className="text-primary text-sm hover:text-primary/80 transition-colors font-semibold mt-1">
                  Our Approach →
                </a>
              </Link>
            </div>
          </div>

          {/* Sectors */}
          <div className="md:col-span-3">
            <h5 className="text-white text-xs uppercase tracking-[0.18em] font-semibold mb-4">
              Sectors
            </h5>
            <div className="flex flex-col gap-3">
              {[
                "Municipal Government",
                "K–12 Education",
                "Nonprofit & Social Impact",
                "Indigenous Organizations",
                "Housing & Community",
              ].map((sector) => (
                <a
                  key={sector}
                  href="/#sectors"
                  className="text-white/50 text-sm hover:text-white transition-colors"
                >
                  {sector}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h5 className="text-white text-xs uppercase tracking-[0.18em] font-semibold mb-4">
              Contact
            </h5>
            <div className="flex flex-col gap-3">
              <a
                href="/contact"
                className="text-white/50 text-sm hover:text-white transition-colors"
              >
                Contact Us
              </a>
              <span className="text-white/50 text-sm">
                Remote-First, North America
              </span>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary text-white font-semibold text-xs px-4 py-2.5 rounded-md hover:bg-[oklch(0.40_0.14_150)] transition-all mt-2 w-fit"
              >
                Work With Us
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-12 pt-8 border-t border-[oklch(0.26_0.03_155)]">
          <span className="text-white/30 text-xs">
            &copy; {currentYear} Civic Firm. All rights reserved.
          </span>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-white/30 text-xs hover:text-white/60 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-white/30 text-xs hover:text-white/60 transition-colors">
              Terms & Conditions
            </a>
            <a href="#" className="text-white/30 text-xs hover:text-white/60 transition-colors">
              Accessibility Statement
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
