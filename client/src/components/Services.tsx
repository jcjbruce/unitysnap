/*
 * DESIGN: Card-based Services Section
 * Visual card grid with images, inspired by mentee.ca.
 * Each card has a full-bleed image on top, title, description, and tags.
 * 2x2 grid on desktop, stacked on mobile.
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    title: "Web Design & Development",
    desc: "Custom, accessible websites built to WCAG 2.1 AA and ADA Title II standards. Every site ships with a fully trained CMS so your team owns their content from day one.",
    tags: ["WCAG 2.1 AA", "ADA Compliant", "CMS Training", "Mobile-First"],
    image: "/images/service-webdev.jpg",
  },
  {
    title: "Brand & Content Strategy",
    desc: "We sharpen your message before a single pixel is placed — developing the voice, visual language, and content architecture that makes your mission clear to every audience.",
    tags: ["Brand Identity", "Content Strategy", "Multilingual"],
    image: "/images/service-brand.jpg",
  },
  {
    title: "Motion, Media & Educational Content",
    desc: "Animations, explainer videos, and multimedia for training modules, public education campaigns, and digital communications — from orientation videos to awareness campaigns.",
    tags: ["Animation", "Explainer Video", "Educational Media"],
    image: "/images/service-media.jpg",
  },
  {
    title: "Ongoing Support & Maintenance",
    desc: "Our relationship doesn't end at launch. Maintenance contracts, security updates, accessibility audits, and ongoing development support to keep you current and compliant.",
    tags: ["Maintenance", "Security Updates", "Accessibility Audits"],
    image: "/images/service-support.jpg",
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
              <div className="w-8 h-0.5 bg-[oklch(0.72_0.12_75)]" />
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

        {/* Services card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-background rounded-xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all duration-400"
            >
              {/* Image */}
              <div className="relative h-52 md:h-60 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Subtle gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 md:p-7">
                <h3 className="font-[var(--font-display)] font-semibold text-lg md:text-xl text-foreground mb-3 tracking-tight group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  {service.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground border border-border px-2.5 py-1 rounded-full group-hover:border-primary/30 transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
