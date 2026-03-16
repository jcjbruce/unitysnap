/*
 * DESIGN: Services — Clean two-column list layout
 * No cards, no boxes. Left column has heading, right has a stacked list
 * with divider lines between items. Minimal, text-forward.
 * Breaks up the card-heavy page with a different visual rhythm.
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    title: "Web Design & Development",
    desc: "Custom, accessible websites built to WCAG 2.1 AA and ADA Title II standards. Every site ships with a fully trained CMS so your team owns their content from day one.",
  },
  {
    title: "Brand & Content Strategy",
    desc: "We develop the voice, visual language, and content architecture that makes your mission clear to every audience — before a single pixel is placed.",
  },
  {
    title: "Motion & Media Production",
    desc: "Animations, explainer videos, and multimedia for training modules, public education campaigns, and digital communications.",
  },
  {
    title: "Ongoing Support & Maintenance",
    desc: "Maintenance contracts, security updates, accessibility audits, and ongoing development support to keep you current and compliant.",
  },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-20 md:py-28 bg-background">
      <div className="container">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left column — heading */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-8 h-0.5 bg-[oklch(0.72_0.12_75)]" />
              <span className="section-label">What We Do</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-[var(--font-display)] font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground leading-tight"
            >
              Everything your organization{" "}
              <span className="text-primary">needs.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-muted-foreground text-sm md:text-base leading-relaxed mt-5 max-w-sm"
            >
              From initial discovery through post-launch support, we handle every aspect of your digital project.
            </motion.p>
          </div>

          {/* Right column — stacked list with dividers */}
          <div className="lg:col-span-8">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={`group py-8 ${i > 0 ? "border-t border-border" : ""}`}
              >
                <div className="flex items-start gap-6">
                  {/* Number */}
                  <span className="text-primary/30 font-bold text-5xl md:text-6xl leading-none select-none group-hover:text-primary/60 transition-colors duration-300 flex-shrink-0 w-16 text-right">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg md:text-xl text-foreground mb-2 tracking-tight group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-xl">
                      {service.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
