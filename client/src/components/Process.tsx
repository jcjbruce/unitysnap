/*
 * DESIGN: Institutional — Process Section
 * Light gray background. Clean numbered steps with connecting line.
 * Professional, structured, reassures procurement committees.
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    num: "01",
    title: "Discovery",
    desc: "Structured stakeholder interviews, audience research, content audit, and technical requirements gathering. Nothing is assumed.",
  },
  {
    num: "02",
    title: "Strategy",
    desc: "Detailed project plan: information architecture, sitemap, content strategy, compliance checklist, and milestone-based timeline.",
  },
  {
    num: "03",
    title: "Design",
    desc: "Wireframes, then high-fidelity mockups for stakeholder review. Design is iterative — you approve every major decision before development begins.",
  },
  {
    num: "04",
    title: "Build",
    desc: "Accessibility baked in from the start — not added as an afterthought. Code is clean, documented, and built for long-term maintainability.",
  },
  {
    num: "05",
    title: "Launch",
    desc: "Thorough QA testing, accessibility audits, cross-browser and device testing, and content migration before a carefully managed go-live.",
  },
  {
    num: "06",
    title: "Support",
    desc: "Staff training, documentation, and ongoing maintenance options — ensuring your team is confident and your site stays current.",
  },
];

export default function Process() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-100px" });

  return (
    <section id="process" className="py-20 md:py-28 bg-secondary dark:bg-[oklch(0.22_0.035_155)]">
      <div className="container">
        {/* Header */}
        <div ref={headRef} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={headInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-8 h-0.5 bg-primary" />
              <span className="section-label">Our Process</span>
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
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-muted-foreground text-sm leading-relaxed max-w-sm"
          >
            Every project follows a structured, milestone-based delivery process with clear checkpoints and documented deliverables at every stage.
          </motion.p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="bg-background dark:bg-[oklch(0.26_0.03_155)] rounded-lg p-6 border border-border hover:border-primary/30 hover:shadow-sm transition-all duration-300 group"
            >
              {/* Step number */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full bg-[oklch(0.78_0.14_75)]/10 flex items-center justify-center group-hover:bg-[oklch(0.78_0.14_75)] transition-all duration-300">
                  <span className="text-[oklch(0.72_0.14_75)] group-hover:text-white font-[var(--font-display)] font-bold text-sm transition-colors">
                    {step.num}
                  </span>
                </div>
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="flex-1 h-px bg-border hidden lg:block" />
                )}
              </div>

              <h3 className="font-[var(--font-display)] font-semibold text-base md:text-lg text-foreground mb-2 tracking-tight">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 text-center"
        >
          <p className="text-muted-foreground text-sm mb-4">
            Want to learn how we approach institutional projects? See our full methodology and capabilities.
          </p>
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
