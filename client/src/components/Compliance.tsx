/*
 * DESIGN: Compliance — Confident statement with checklist
 * Dark forest green background. No cards. 
 * Bold headline + a two-column checklist of standards.
 * Clean, confident, scannable. Breaks up the card-heavy page.
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const standards = [
  { title: "WCAG 2.1 AA", desc: "Every build meets or exceeds Level AA" },
  { title: "ADA Title II", desc: "Full compliance for public entities" },
  { title: "Section 508", desc: "Federal accessibility standards" },
  { title: "Mobile-First", desc: "Responsive across all devices" },
  { title: "CMS Training", desc: "Your team manages content independently" },
  { title: "Bilingual / Multilingual", desc: "Language switching and RTL support" },
  { title: "Content Migration", desc: "Seamless transition from legacy systems" },
  { title: "On-Time Delivery", desc: "Milestone-based, no surprise scope changes" },
];

export default function Compliance() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 md:py-28 bg-[oklch(0.18_0.04_155)]">
      <div className="container" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left — bold statement */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-8 h-0.5 bg-[oklch(0.72_0.12_75)]" />
              <span className="text-[oklch(0.78_0.14_75)] text-xs font-semibold uppercase tracking-[0.2em]">
                Standards & Compliance
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-[var(--font-display)] font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white leading-tight"
            >
              Built to meet{" "}
              <span className="text-[oklch(0.60_0.16_150)]">every</span>{" "}
              requirement.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-white/60 text-sm md:text-base leading-relaxed mt-5 max-w-md"
            >
              We speak the language of procurement. Every deliverable is documented, every standard is met, and every deadline is honored.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8"
            >
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 bg-[oklch(0.45_0.14_150)] text-white font-semibold text-sm px-6 py-3 rounded-md hover:bg-[oklch(0.40_0.14_150)] transition-all"
              >
                Work With Us
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          </div>

          {/* Right — checklist */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
              {standards.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex items-start gap-3 py-5 border-b border-white/10"
                >
                  {/* Checkmark */}
                  <div className="w-5 h-5 rounded-full bg-[oklch(0.45_0.14_150)] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">
                      {item.title}
                    </div>
                    <div className="text-white/50 text-xs mt-0.5">
                      {item.desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
