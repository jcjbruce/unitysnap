/*
 * DESIGN: Hero — Full-bleed photo with directional gradient
 * Photo covers the entire section. A left-to-right gradient overlay
 * keeps the left side (where text lives) dark and readable, while
 * the right side lets the photo come through visibly.
 * Best of both worlds: atmosphere + readability.
 */
import { motion } from "framer-motion";

const HERO_IMAGE = "/images/hero-diverse.jpg";

const trustBadges = [
  "WCAG 2.1 AA",
  "ADA Title II",
  "Section 508",
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background photo — full bleed, visible */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      />

      {/* Directional gradient: strong left → transparent right
          Left side is solid enough for text, right side shows the photo */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            to right,
            oklch(0.12 0.04 155 / 0.95) 0%,
            oklch(0.12 0.04 155 / 0.88) 30%,
            oklch(0.12 0.04 155 / 0.55) 60%,
            oklch(0.12 0.04 155 / 0.25) 80%,
            oklch(0.12 0.04 155 / 0.15) 100%
          )`,
        }}
      />

      {/* Subtle bottom gradient for scroll transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[oklch(0.12_0.04_155/0.6)] to-transparent" />

      {/* Content — left-aligned so it sits on the dark side */}
      <div className="container relative z-10 pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="max-w-2xl">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-10 h-0.5 bg-[oklch(0.78_0.14_75)]" />
            <span className="text-[oklch(0.78_0.14_75)] text-xs font-semibold uppercase tracking-[0.25em]">
              Accessible Web Design for Organizations That Matter
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-[var(--font-display)] font-extrabold text-white leading-[1.05] tracking-tight mb-8"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}
          >
            Built for organizations{" "}
            <span className="text-primary">that shape</span> their communities.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/85 text-lg sm:text-xl md:text-2xl leading-relaxed mb-10 max-w-xl font-light"
          >
            Accessible, compliant, and beautifully designed websites for governments, nonprofits, small businesses, and community organizations across North America.
          </motion.p>

          {/* CTAs */}
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
                <svg className="w-3.5 h-3.5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
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
