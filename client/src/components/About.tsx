/*
 * DESIGN: Institutional — About Section
 * Clean two-column layout. Community photo left. Institutional positioning right.
 * White background. Navy text. Green accent.
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ABOUT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/CU5JQUQHP3FutNoS5xA4np/hero-community-2_ceaeeeb0.jpg";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 md:py-28 bg-background">
      <div className="container">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <img
                src={ABOUT_IMG}
                alt="Community meeting — Civic Firm institutional digital partner"
                className="w-full h-full object-cover"
              />
              {/* Overlay badge */}
              <div className="absolute bottom-4 left-4 bg-white/95 dark:bg-[oklch(0.26_0.03_155)] rounded-md px-4 py-3 shadow-lg">
                <div className="text-xs text-muted-foreground uppercase tracking-[0.1em] mb-0.5">Serving communities since</div>
                <div className="font-[var(--font-display)] font-bold text-foreground text-lg">2019</div>
              </div>
            </div>
            {/* Green accent line */}
            <div className="absolute -bottom-2 -right-2 w-24 h-1 bg-[oklch(0.72_0.12_75)] rounded" />
          </motion.div>

          {/* Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-8 h-0.5 bg-[oklch(0.72_0.12_75)]" />
              <span className="section-label">Who We Are</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-[var(--font-display)] font-bold text-3xl md:text-4xl tracking-tight text-foreground mb-6 leading-tight"
            >
              Serious design.<br />
              Honest <span className="text-primary">partnership.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="space-y-4"
            >
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                Civic Firm was built on a straightforward belief — that every organization deserves a website that truly reflects the quality of what they do. We work with governments, nonprofits, small businesses, and community organizations that take what they do seriously and want a digital presence to match.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                Whether it's navigating procurement cycles, meeting compliance requirements, or simply building something that respects the community an organization serves — our process is designed to be transparent, accountable, and built for stakeholder review at every stage.
              </p>
              <p className="text-foreground font-medium leading-relaxed text-sm md:text-base">
                What stays constant across all of it: thoughtful, compliant work delivered with integrity, on time, and without the runaround.
              </p>
            </motion.div>

            {/* Credential row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="mt-8 grid grid-cols-3 gap-4 pt-8 border-t border-border"
            >
              {[
                { value: "50+", label: "Projects delivered" },
                { value: "100%", label: "On-time delivery" },
                { value: "12", label: "Sectors served" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-[var(--font-display)] font-bold text-2xl text-primary">{stat.value}</div>
                  <div className="text-muted-foreground text-xs mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-6"
            >
              <a
                href="/rfp"
                className="inline-flex items-center gap-2 text-primary text-sm font-semibold hover:opacity-80 transition-opacity"
              >
                Our Approach
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
