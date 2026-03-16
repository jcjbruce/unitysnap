/*
 * DESIGN: Institutional — Hero Section
 * Full-viewport photo background (civic building at golden hour).
 * Deep navy overlay for legibility. White text. Left-aligned.
 * Dual CTAs: "Work With Us" (green filled) + "Our Approach" (white outlined).
 * Trust badges row.
 */
import { motion } from "framer-motion";
import { Link } from "wouter";

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

      {/* Navy gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.15_0.04_155/0.93)] via-[oklch(0.15_0.04_155/0.78)] to-[oklch(0.15_0.04_155/0.45)]" />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[oklch(0.18_0.04_155/0.7)] to-transparent" />

      {/* Content */}
      <div className="container relative z-10 pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="max-w-3xl">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-8 h-0.5 bg-primary" />
            <span className="text-primary text-xs font-semibold uppercase tracking-[0.2em]">
              Accessible Web Design for Public Organizations
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-[var(--font-display)] font-bold text-white leading-[1.08] tracking-tight mb-6"
            style={{ fontSize: "clamp(2.4rem, 5.5vw, 5.5rem)" }}
          >
            Built for organizations{" "}
            <span className="text-primary">that serve</span>{" "}
            the public.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/80 text-base sm:text-lg md:text-xl leading-relaxed mb-8 max-w-2xl"
          >
            Civic Firm builds accessible, compliant, and beautifully designed websites for governments, school districts, nonprofits, and public institutions — on time, on budget, and built to last.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex flex-wrap gap-3 mb-10"
          >
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 bg-primary text-white font-semibold text-sm px-6 py-3.5 rounded-md hover:bg-[oklch(0.40_0.14_150)] transition-all shadow-lg shadow-primary/30"
            >
              Work With Us
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="/rfp"
              className="inline-flex items-center gap-2 border-2 border-white/50 text-white font-semibold text-sm px-6 py-3.5 rounded-md hover:bg-white/10 hover:border-white/70 transition-all"
            >
              Our Approach
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap gap-2"
          >
            {trustBadges.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-medium px-3 py-1.5 rounded-full"
              >
                <svg className="w-3 h-3 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
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
