/*
 * DESIGN: Institutional — Navbar
 * Civic Firm branding. Clean horizontal nav, dual CTA.
 * "Our Approach" links to /rfp page (no special highlight).
 * Primary CTA: "Work With Us" → contact section.
 * Transparent on hero, solid white on scroll.
 * Mobile: hamburger menu with full-screen overlay.
 * Cross-page nav: links like /#work navigate correctly from any page.
 */
import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";

const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Sectors", href: "/#sectors" },
  { label: "Our Approach", href: "/rfp" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [location, setLocation] = useLocation();

  const isRFPPage = location === "/rfp";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  /* Handle navigation: if we're on another page and clicking a /#section link,
     navigate to / first, then scroll to the section after the page loads. */
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMenuOpen(false);

    // If it's a hash link to the home page
    if (href.startsWith("/#")) {
      const sectionId = href.replace("/#", "");

      if (location === "/") {
        // Already on home page — just scroll to section
        e.preventDefault();
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // On another page — navigate to home, then scroll after load
        e.preventDefault();
        setLocation("/");
        // Wait for the page to render, then scroll
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }, 150);
      }
    }
    // For non-hash links (like /rfp), let the default behavior work
  }, [location, setLocation]);

  const navBg = scrolled || isRFPPage || menuOpen
    ? "bg-[oklch(0.985_0.008_85)] dark:bg-[oklch(0.18_0.04_155)] shadow-sm border-b border-[oklch(0.92_0.012_80)] dark:border-[oklch(0.30_0.03_155)]"
    : "bg-transparent";

  const linkBaseClass = (isScrolledOrRFP: boolean) =>
    isScrolledOrRFP
      ? "text-[oklch(0.35_0.02_75)] hover:text-[oklch(0.22_0.02_75)] dark:text-[oklch(0.7_0.01_80)] dark:hover:text-white"
      : "text-white/80 hover:text-white";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <Link href="/">
              <a className="flex items-center gap-2.5 flex-shrink-0">
                <img
                  src={scrolled || isRFPPage || menuOpen ? "/logo-light.png" : "/logo-dark.png"}
                  alt="Civic Firm"
                  className="h-8 w-auto object-contain"
                  style={{ maxWidth: '200px' }}
                />
              </a>
            </Link>

            {/* Desktop Nav — all links styled the same, no bold highlight */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${linkBaseClass(scrolled || isRFPPage)}`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-3">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                  scrolled || isRFPPage
                    ? "hover:bg-gray-100 dark:hover:bg-[oklch(0.26_0.03_155)] text-[oklch(0.35_0.02_75)] dark:text-[oklch(0.7_0.01_80)]"
                    : "hover:bg-white/10 text-white/80"
                }`}
              >
                {theme === "dark" ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              {/* Primary green CTA */}
              <a
                href="/#contact"
                onClick={(e) => handleNavClick(e, "/#contact")}
                className="text-sm font-semibold px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition-all shadow-sm"
              >
                Work With Us
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className={`md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 transition-colors ${
                scrolled || isRFPPage || menuOpen ? "text-[oklch(0.22_0.02_75)] dark:text-white" : "text-white"
              }`}
            >
              <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? "w-5 rotate-45 translate-y-2" : "w-5"}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? "opacity-0 w-0" : "w-4"}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? "w-5 -rotate-45 -translate-y-2" : "w-5"}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-white dark:bg-[oklch(0.18_0.04_155)] transition-all duration-300 flex flex-col ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="h-16 md:h-18" />
        <div className="flex flex-col flex-1 container py-8 gap-2">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-2xl font-bold py-3 border-b border-gray-100 dark:border-[oklch(0.30_0.03_155)] transition-all text-[oklch(0.22_0.02_75)] dark:text-white"
              style={{ transitionDelay: menuOpen ? `${i * 40}ms` : "0ms" }}
            >
              {link.label}
            </a>
          ))}
          <div className="mt-6 flex flex-col gap-3">
            <a
              href="/#contact"
              onClick={(e) => handleNavClick(e, "/#contact")}
              className="w-full text-center py-3 rounded-md bg-primary text-white font-semibold text-base"
            >
              Work With Us
            </a>
          </div>
          <div className="mt-auto pt-6 flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              {theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
