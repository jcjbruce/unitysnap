/*
 * DESIGN: Contact — Full-bleed photo with directional gradient
 * Same approach as the hero: photo visible, directional overlay for readability.
 * Community park at golden hour — warm, inviting, community-focused.
 * Text left-aligned on the darker left side, photo breathes on the right.
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const CTA_BG = "/images/mission-community.jpg";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="relative py-24 md:py-36 overflow-hidden">
      {/* Background photo — full bleed */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${CTA_BG})` }}
      />

      {/* Directional gradient: strong left → transparent right (same as hero) */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            to right,
            oklch(0.10 0.04 155 / 0.92) 0%,
            oklch(0.10 0.04 155 / 0.85) 35%,
            oklch(0.10 0.04 155 / 0.50) 65%,
            oklch(0.10 0.04 155 / 0.20) 100%
          )`,
        }}
      />

      <div className="container relative z-10">
        <div ref={ref} className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-8 h-0.5 bg-[oklch(0.72_0.12_75)]" />
            <span className="text-primary text-xs font-semibold uppercase tracking-[0.2em]">
              Contact
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-[var(--font-display)] font-bold text-white leading-tight tracking-tight mb-6"
            style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
          >
            Let's build something{" "}
            <span className="text-primary">that matters.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white/80 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl"
          >
            Whether you need an accessible website, a digital strategy partner, or a team that understands public-sector compliance — we're ready to help. Let's talk about your project.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 items-start flex-wrap"
          >
            <a
              href="mailto:info@civicfirm.com"
              className="inline-flex items-center gap-2 bg-primary text-white font-semibold text-sm px-7 py-4 rounded-md hover:bg-[oklch(0.40_0.14_150)] transition-all shadow-lg shadow-primary/30"
            >
              Get In Touch
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>

            <a
              href="mailto:info@civicfirm.com"
              className="inline-flex items-center gap-2 border-2 border-white/40 text-white font-semibold text-sm px-7 py-4 rounded-md hover:bg-white/10 hover:border-white/60 transition-all"
            >
              Email Us Directly
            </a>
          </motion.div>

          {/* Contact info row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-10 flex flex-wrap gap-8"
          >
            <div>
              <div className="text-white/40 text-[10px] uppercase tracking-[0.15em] mb-1">Email</div>
              <a href="mailto:info@civicfirm.com" className="text-white/80 text-sm hover:text-white transition-colors">
                info@civicfirm.com
              </a>
            </div>
            <div>
              <div className="text-white/40 text-[10px] uppercase tracking-[0.15em] mb-1">Response Time</div>
              <span className="text-white/80 text-sm">Within 2 business days</span>
            </div>
            <div>
              <div className="text-white/40 text-[10px] uppercase tracking-[0.15em] mb-1">Location</div>
              <span className="text-white/80 text-sm">Remote-First, North America</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
