/*
 * DESIGN: Hero — Maximum readability
 * Full-viewport photo background with stronger, more uniform overlay.
 * Larger headline, higher contrast subtext.
 * Clear about what Civic Firm does. Extremely readable.
 */
import { motion } from "framer-motion";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/CU5JQUQHP3FutNoS5xA4np/hero-gov-1-6P3667TTpmnuzabATGBuBS.webp";

const trustBadges = [
  "WCAG 2.1 AA",
  "ADA Title II",
  "Section 508",
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background photo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      />

      {/* Stronger overlay for maximum readability */}
      <div className="absolute inset-0 bg-[oklch(0.12_0.04_155/0.88)]" />
      {/* Subtle gradient for depth — lighter on right to let photo peek through */}
      <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.10_0.04_155/0.50)] to-transparent" />

      {/* Content */}
      <div className="container relative z-10 pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="max-w-4xl">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-10 h-0.5 bg-[oklch(0.78_0.14_75)]" />
            <span className="text-[oklch(0.78_0.14_75)] text-xs font-semibold uppercase tracking-[0.25em]">
              Accessible Web Design for Public Organizations
            </span>
          </motion.div>

          {/* Headline — larger, bolder, maximum contrast */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-[var(--font-display)] font-extrabold text-white leading-[1.05] tracking-tight mb-8"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}
          >
            Built for organizations<br />
            <span className="text-[oklch(0.55_0.16_150)]">that serve</span> the public.
          </motion.h1>

          {/* Subheadline — brighter, more readable */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/90 text-lg sm:text-xl md:text-2xl leading-relaxed mb-10 max-w-2xl font-light"
          >
            Accessible, compliant, and beautifully designed websites for governments, school districts, nonprofits, and public institutions.
          </motion.p>

          {/* CTAs — larger, more prominent */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 bg-primary text-white font-semibold text-base px-8 py-4 rounded-md hover:bg-[oklch(0.40_0.14_150)] transition-all shadow-lg shadow-primary/25"
            >
              Work With Us
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="/rfp"
              className="inline-flex items-center gap-2 border-2 border-white/40 text-white font-semibold text-base px-8 py-4 rounded-md hover:bg-white/10 hover:border-white/60 transition-all"
            >
              Our Approach
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap gap-3"
          >
            {trustBadges.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 text-white text-xs font-medium px-4 py-2 rounded-full"
              >
                <svg className="w-3.5 h-3.5 text-[oklch(0.55_0.16_150)] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {badge}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-28 right-8 hidden lg:flex flex-col items-center gap-2 z-10"
      >
        <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>
    </section>
  );
}
