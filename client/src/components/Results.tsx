/*
 * DESIGN: Kinetic Brutalism — Results Banner (Institutional Metrics)
 * Full-width primary section with large metrics.
 * Metrics now speak to institutional clients: compliance, delivery, support.
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const metrics = [
  { value: "WCAG 2.1 AA", label: "Every Build Compliant" },
  { value: "100%", label: "On-Time Delivery" },
  { value: "8", label: "Sectors Served" },
  { value: "15+", label: "Institutional Projects" },
];

export default function Results() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(oklch(0.1 0.005 155) 1px, transparent 1px), linear-gradient(90deg, oklch(0.1 0.005 155) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container relative z-10" ref={ref}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`text-center ${
                i < metrics.length - 1 ? "md:border-r md:border-primary-foreground/15" : ""
              }`}
            >
              <div className="font-[var(--font-display)] font-extrabold text-xl sm:text-3xl md:text-4xl lg:text-5xl text-primary-foreground tracking-tight leading-tight">
                {metric.value}
              </div>
              <div className="text-primary-foreground/60 text-xs uppercase tracking-[0.2em] mt-2">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
