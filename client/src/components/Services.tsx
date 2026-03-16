/*
 * DESIGN: Institutional — Services Section
 * White background. Clean horizontal service rows.
 * Large number + icon accent, description, and capability tags.
 * Structured, professional, easy to scan for procurement officers.
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    num: "01",
    title: "Web Design & Development",
    desc: "We design and build custom websites that are accessible, mobile-first, and built to the standards your organization requires — WCAG 2.1 AA, ADA Title II, and beyond. Every site includes a fully trained CMS so your team can manage content from day one.",
    tags: ["WCAG 2.1 AA", "ADA Compliant", "CMS Training", "Mobile-First", "Content Migration"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Brand & Content Strategy",
    desc: "Before a single pixel is placed, we sharpen your message. We develop the voice, visual language, and content architecture that makes your organization's mission clear to every audience — residents, students, donors, or board members.",
    tags: ["Brand Identity", "Content Strategy", "Multilingual", "Stakeholder Alignment"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Motion, Media & Educational Content",
    desc: "We produce animations, explainer videos, and multimedia content for training modules, public education campaigns, and digital communications — from school district orientation videos to nonprofit awareness campaigns.",
    tags: ["Animation", "Explainer Video", "Educational Media", "Motion Graphics"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Ongoing Support & Maintenance",
    desc: "Our relationship doesn't end at launch. We offer maintenance contracts, security updates, accessibility audits, and ongoing development support — so your digital presence stays current, compliant, and performing.",
    tags: ["Maintenance Contracts", "Security Updates", "Accessibility Audits", "Hosting"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
];

export default function Services() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-20 md:py-28 bg-background">
      <div className="container">
        {/* Section header */}
        <div ref={headRef} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={headInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-8 h-0.5 bg-primary" />
              <span className="section-label">What We Do</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={headInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-[var(--font-display)] font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground"
            >
              Everything your organization{" "}
              <span className="text-primary">needs.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-sm"
          >
            From initial discovery through post-launch support, we handle every aspect of your digital project.
          </motion.p>
        </div>

        {/* Services list — horizontal rows */}
        <div className="divide-y divide-border">
          {services.map((service, i) => (
            <motion.div
              key={service.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group py-8 md:py-10 grid grid-cols-1 md:grid-cols-[80px_1fr_auto] gap-4 md:gap-8 items-start hover:bg-secondary/50 -mx-4 px-4 md:-mx-6 md:px-6 rounded-lg transition-colors duration-300"
            >
              {/* Number + icon */}
              <div className="flex md:flex-col items-center md:items-start gap-3 md:gap-2">
                <span className="font-[var(--font-display)] font-bold text-3xl md:text-4xl text-[oklch(0.78_0.14_75)]/40 group-hover:text-[oklch(0.78_0.14_75)]/70 transition-colors leading-none">
                  {service.num}
                </span>
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 flex-shrink-0">
                  {service.icon}
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className="font-[var(--font-display)] font-semibold text-xl md:text-2xl text-foreground mb-3 tracking-tight">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-4 max-w-2xl">
                  {service.desc}
                </p>
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground border border-border px-2.5 py-1 rounded hover:border-primary hover:text-primary transition-colors duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-border group-hover:border-primary group-hover:bg-primary transition-all duration-300 mt-1">
                <svg className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
