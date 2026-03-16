/*
 * DESIGN: Warm — Purpose / Mission Statement Section
 * Inspired by the reference screenshot: warm cream background,
 * centered bold statement text, golden amber accent on key phrases.
 * Sits between the Marquee and the Portfolio to set the tone.
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Purpose() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="py-20 md:py-28"
      style={{
        background: "oklch(0.96 0.015 80)",
      }}
    >
      <div className="container">
        <div ref={ref} className="max-w-4xl mx-auto text-center">
          {/* Small label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span
              className="text-xs font-semibold tracking-[0.18em] uppercase"
              style={{ color: "oklch(0.55 0.10 75)" }}
            >
              Our Purpose
            </span>
          </motion.div>

          {/* Bold mission statement */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-[var(--font-display)] font-bold text-2xl sm:text-3xl md:text-[2.5rem] md:leading-[1.3] tracking-tight"
            style={{ color: "oklch(0.22 0.02 75)" }}
          >
            Too many public organizations are held back by{" "}
            <span
              className="underline decoration-2 underline-offset-4"
              style={{
                color: "oklch(0.72 0.14 75)",
                textDecorationColor: "oklch(0.72 0.14 75)",
              }}
            >
              outdated digital tools
            </span>
            . We build the websites, platforms, and digital
            experiences that help communities{" "}
            <span
              className="underline decoration-2 underline-offset-4"
              style={{
                color: "oklch(0.45 0.14 150)",
                textDecorationColor: "oklch(0.45 0.14 150)",
              }}
            >
              connect, grow, and thrive
            </span>{" "}
            — on their own terms.
          </motion.h2>

          {/* Subtle divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mx-auto mt-10 h-[2px] w-16 rounded-full"
            style={{ background: "oklch(0.72 0.14 75)" }}
          />
        </div>
      </div>
    </section>
  );
}
