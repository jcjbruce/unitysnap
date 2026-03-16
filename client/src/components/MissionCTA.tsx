/*
 * DESIGN: MissionCTA — Bold statement break
 * No faded photo. Solid forest green background with subtle texture.
 * Large, confident typography. Simple and impactful.
 * Acts as a visual palate cleanser between content-heavy sections.
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function MissionCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-[oklch(0.18_0.04_155)]">
      {/* Subtle grid pattern for texture — same as hero */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="container relative z-10" ref={ref}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-[var(--font-display)] font-bold text-white leading-[1.15] tracking-tight mb-6"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)" }}
          >
            Technology should serve the{" "}
            <span className="text-primary italic">community</span>,
            <br />not the other way around.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/60 text-base md:text-lg leading-relaxed mb-8 max-w-2xl mx-auto"
          >
            We understand the procurement cycles, compliance requirements, and community expectations that come with institutional work. Our process is designed to be transparent, accountable, and built for stakeholder review at every stage.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a
              href="/rfp"
              className="inline-flex items-center gap-2 bg-primary text-white font-semibold text-sm px-7 py-3.5 rounded-md hover:bg-[oklch(0.40_0.14_150)] transition-all"
            >
              Learn More
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
