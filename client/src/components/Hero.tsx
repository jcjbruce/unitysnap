/*
 * DESIGN: Hero — Split layout
 * No faded photo behind text. Solid dark green background for text (left).
 * Portfolio screenshot on the right at full visibility — the image actually
 * serves a purpose (showing real work). Clean, readable, intentional.
 * Subtle grid pattern on the dark side for texture.
 */
import { motion } from "framer-motion";

const PORTFOLIO_IMG = "/portfolio/tucsontots-screenshot.webp";

const trustBadges = [
  "WCAG 2.1 AA",
  "ADA Title II",
  "Section 508",
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[oklch(0.14_0.04_155)]">
      {/* Subtle grid pattern for texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container relative z-10 flex-1 flex items-center pt-20 pb-12 md:pt-24 md:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          {/* Left — text content on solid background */}
          <div className="order-2 lg:order-1">
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-10 h-0.5 bg-[oklch(0.78_0.14_75)]" />
              <span className="text-[oklch(0.78_0.14_75)] text-xs font-semibold uppercase tracking-[0.25em]">
                Accessible Web Design
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-[var(--font-display)] font-extrabold text-white leading-[1.05] tracking-tight mb-6"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4.5rem)" }}
            >
              Built for<br />
              organizations{" "}
              <span className="text-primary">that serve</span>{" "}
              the public.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-white/75 text-base sm:text-lg md:text-xl leading-relaxed mb-8 max-w-lg"
            >
              Accessible, compliant, and beautifully designed websites for governments, school districts, nonprofits, and public institutions.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="flex flex-wrap gap-4 mb-10"
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
                className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-semibold text-base px-8 py-4 rounded-md hover:bg-white/10 hover:border-white/50 transition-all"
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
                  className="inline-flex items-center gap-2 bg-white/8 border border-white/10 text-white/80 text-xs font-medium px-4 py-2 rounded-full"
                >
                  <svg className="w-3.5 h-3.5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {badge}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right — portfolio mockup at full visibility */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2 relative"
          >
            {/* Browser frame mockup */}
            <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-black/40 border border-white/10">
              {/* Browser bar */}
              <div className="bg-[oklch(0.22_0.03_155)] px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-white/15" />
                  <div className="w-3 h-3 rounded-full bg-white/15" />
                  <div className="w-3 h-3 rounded-full bg-white/15" />
                </div>
                <div className="flex-1 mx-3">
                  <div className="bg-white/8 rounded-md px-3 py-1 text-white/40 text-xs text-center">
                    tucsontots.com
                  </div>
                </div>
              </div>
              {/* Screenshot */}
              <img
                src={PORTFOLIO_IMG}
                alt="Tucson Tots — a Civic Firm project"
                className="w-full h-auto block"
              />
            </div>

            {/* Floating accent — small second screenshot peeking */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute -bottom-6 -left-6 w-36 md:w-48 rounded-lg overflow-hidden shadow-xl shadow-black/30 border border-white/10 hidden md:block"
            >
              <img
                src="/portfolio/unitysnap-screenshot.webp"
                alt="UnitySnap — a Civic Firm project"
                className="w-full h-auto block"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
