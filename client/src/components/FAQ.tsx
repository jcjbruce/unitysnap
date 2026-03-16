/*
 * DESIGN: Kinetic Brutalism — FAQ Section (Procurement-Focused)
 * Accordion style. Theme-aware borders.
 * Questions target institutional decision-makers and project stakeholders.
 */
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const faqs = [
  {
    q: "Do your websites meet WCAG 2.1 AA and ADA Title II requirements?",
    a: "Yes. Accessibility is built into our process from the start — not added as an afterthought. Every site we deliver meets WCAG 2.1 Level AA standards and satisfies ADA Title II requirements for public entities. We conduct accessibility audits before launch and provide documentation of compliance.",
  },
  {
    q: "Can you handle .gov domain transitions?",
    a: "Absolutely. We have experience managing the technical and DNS-level work required for transitioning from .com or .org domains to .gov, including coordinating with registrars, updating all internal links, and ensuring no disruption to existing traffic or services.",
  },
  {
    q: "What CMS platforms do you build on?",
    a: "We work with WordPress (including Elementor, ACF, and custom themes), Webflow, and custom CMS implementations. We select the platform based on your team's technical capacity, budget, and long-term maintenance needs. All builds include staff training and full documentation.",
  },
  {
    q: "Do you provide post-launch support and maintenance?",
    a: "Yes. We offer ongoing maintenance contracts that cover security updates, plugin/module updates, accessibility audits, content updates, and technical support. We can structure these as monthly retainers or annual contracts depending on your procurement requirements.",
  },
  {
    q: "Can you handle content migration from our existing site?",
    a: "Yes. Content migration is a standard part of our project scope. We audit your existing content, develop a migration plan, and handle the transfer of all pages, documents, images, and media — ensuring nothing is lost and all URLs are properly redirected.",
  },
  {
    q: "Do you build bilingual or multilingual websites?",
    a: "Yes. We build multilingual sites with proper language switching, RTL language support where needed, and localization-ready CMS structures. We've built bilingual sites for Canadian organizations (English/French), US housing authorities (English/Spanish), and international bodies.",
  },
  {
    q: "What does it cost to work with Civic Firm?",
    a: "Our institutional projects typically start at $15,000 for smaller engagements (nonprofit refreshes, small municipal sites) and scale based on scope, complexity, and compliance requirements. We provide detailed, itemized proposals so procurement committees can evaluate costs transparently.",
  },
  {
    q: "How do you handle project timelines and milestones?",
    a: "Every project includes a milestone-based timeline with defined deliverables, review periods, and approval gates. We use project management tools to keep all stakeholders informed, and we build buffer time into our schedules to account for stakeholder review cycles.",
  },
];

function FAQItem({ faq, index }: { faq: (typeof faqs)[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="border-b border-border"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 md:py-6 text-left group"
      >
        <span className="font-[var(--font-display)] font-semibold text-sm sm:text-base md:text-lg text-foreground group-hover:text-primary transition-colors pr-4 md:pr-8">
          {faq.q}
        </span>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-6 h-6 flex items-center justify-center flex-shrink-0"
        >
          <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-muted-foreground text-sm leading-relaxed pb-5 md:pb-6 pr-8 md:pr-12">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-100px" });

  return (
    <section className="py-20 md:py-32">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-20 items-start">

          {/* Left: heading */}
          <div ref={headRef}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={headInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-4 md:mb-6"
            >
              <div className="w-12 h-px bg-primary" />
              <span className="text-primary text-xs uppercase tracking-[0.3em] font-semibold">
                FAQs
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={headInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-[var(--font-display)] font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-foreground leading-[1.1] mb-6"
            >
              Questions from<br />
              <span className="text-primary">procurement.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={headInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-muted-foreground text-sm leading-relaxed"
            >
              Answers to the questions that matter most to institutional decision-makers and project stakeholders.
            </motion.p>
          </div>

          {/* Right: accordion */}
          <div className="border-t border-border">
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
