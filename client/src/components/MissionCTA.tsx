/*
 * DESIGN: MissionCTA — Full-bleed photo with directional gradient
 * Same approach as the hero: photo visible, directional overlay for readability.
 * Library interior at dusk — people using technology in a warm civic space.
 * "Technology should serve the community" — the image literally shows that.
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const BG_IMAGE = "/images/mission-bg-v2.jpg";

export default function MissionCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-32 md:py-48 overflow-hidden">
      {/* Background photo — full bleed */}
      <div
        className="absolute inset-0 bg-cover bg-bottom bg-no-repeat"
        style={{ backgroundImage: `url(${BG_IMAGE})` }}
      />

      {/* Directional gradient: stronger center for text, lighter edges so photo shows */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            to bottom,
            oklch(0.10 0.04 155 / 0.65) 0%,
            oklch(0.10 0.04 155 / 0.70) 35%,
            oklch(0.10 0.04 155 / 0.60) 65%,
            oklch(0.10 0.04 155 / 0.25) 100%
          )`,
        }}
      />

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
            <span className="text-primary">community</span>,
            <br />not the other way around.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/80 text-base md:text-lg leading-relaxed mb-10 max-w-2xl mx-auto"
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
              className="inline-flex items-center gap-2 bg-primary text-white font-semibold text-sm px-7 py-3.5 rounded-md hover:bg-[oklch(0.40_0.14_150)] transition-all shadow-lg shadow-primary/25"
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
