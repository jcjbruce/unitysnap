/*
 * DESIGN: Process — Vertical timeline stepper
 * No cards. Clean vertical line with numbered steps.
 * Alternating left/right on desktop, stacked on mobile.
 * Gives a sense of linear progression, not a grid of boxes.
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    num: "01",
    title: "Discovery",
    desc: "Stakeholder interviews, audience research, content audit, and technical requirements gathering. Nothing is assumed.",
  },
  {
    num: "02",
    title: "Strategy",
    desc: "Information architecture, sitemap, content strategy, compliance checklist, and milestone-based timeline.",
  },
  {
    num: "03",
    title: "Design",
    desc: "Wireframes, then high-fidelity mockups. Design is iterative — you approve every major decision before development begins.",
  },
  {
    num: "04",
    title: "Build",
    desc: "Accessibility baked in from the start. Code is clean, documented, and built for long-term maintainability.",
  },
  {
    num: "05",
    title: "Launch",
    desc: "QA testing, accessibility audits, cross-browser testing, and content migration before a carefully managed go-live.",
  },
  {
    num: "06",
    title: "Support",
    desc: "Staff training, documentation, and ongoing maintenance — ensuring your team is confident and your site stays current.",
  },
];

export default function Process() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-100px" });

  return (
    <section id="process" className="py-20 md:py-28 bg-secondary dark:bg-[oklch(0.22_0.035_155)]">
      <div className="container">
        {/* Header */}
        <div ref={headRef} className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="w-8 h-0.5 bg-[oklch(0.72_0.12_75)]" />
            <span className="section-label">Our Process</span>
            <div className="w-8 h-0.5 bg-[oklch(0.72_0.12_75)]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-[var(--font-display)] font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground"
          >
            Six steps.{" "}
            <span className="text-primary">No surprises.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-muted-foreground text-sm md:text-base leading-relaxed mt-4"
          >
            Every project follows a structured, milestone-based delivery process with clear checkpoints at every stage.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          {steps.map((step, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex items-start gap-6 mb-12 last:mb-0 ${
                  /* Desktop: alternate sides */
                  ""
                }`}
              >
                {/* Mobile layout: dot + content */}
                <div className="md:hidden flex items-start gap-5 w-full">
                  {/* Dot */}
                  <div className="relative z-10 w-12 h-12 rounded-full bg-background dark:bg-[oklch(0.22_0.035_155)] border-2 border-primary flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold text-sm">{step.num}</span>
                  </div>
                  <div className="pt-2">
                    <h3 className="font-semibold text-base text-foreground tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mt-1">
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* Desktop layout: alternating sides */}
                <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8 md:items-start w-full">
                  {/* Left content */}
                  <div className={`${isLeft ? "text-right" : ""}`}>
                    {isLeft && (
                      <>
                        <h3 className="font-semibold text-lg text-foreground tracking-tight">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mt-1">
                          {step.desc}
                        </p>
                      </>
                    )}
                  </div>

                  {/* Center dot */}
                  <div className="relative z-10 w-12 h-12 rounded-full bg-background dark:bg-[oklch(0.22_0.035_155)] border-2 border-primary flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold text-sm">{step.num}</span>
                  </div>

                  {/* Right content */}
                  <div>
                    {!isLeft && (
                      <>
                        <h3 className="font-semibold text-lg text-foreground tracking-tight">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mt-1">
                          {step.desc}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <a
            href="/rfp"
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold text-sm px-6 py-3 rounded-md hover:bg-[oklch(0.40_0.14_150)] transition-all"
          >
            Our Approach
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
