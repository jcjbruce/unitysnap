/*
 * DESIGN: Our Approach Page — UNIQUE layouts, not homepage clones
 *
 * Homepage uses:        This page uses instead:
 * ─────────────────────────────────────────────────
 * Hero: left-aligned    → Hero: centered, shorter, solid bg (no photo)
 * Process: timeline     → How We Work: accordion/expandable rows
 * Compliance: 2-col     → Credentials: horizontal scrolling badges
 * Services: numbered    → Sectors: flowing tag cloud / pill grid
 * Contact: photo+left   → CTA: centered, photo, different composition
 *
 * Same color palette, same typography, same quality — different structure.
 */
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "wouter";

const CTA_BG = "/images/mission-community.jpg";

const howWeWork = [
  {
    num: "01",
    title: "We Understand Your Mission",
    desc: "Every engagement starts with listening. We learn your organization's goals, stakeholders, compliance requirements, and community context before proposing a single solution.",
    detail: "We conduct stakeholder interviews, review existing materials, and map your community's needs to ensure our approach is grounded in your reality — not assumptions.",
  },
  {
    num: "02",
    title: "We Analyze the Requirements",
    desc: "Whether it's a formal procurement process or a direct engagement, we study every requirement — compliance standards, evaluation criteria, scope, timeline, and budget.",
    detail: "We break down RFPs line by line, cross-reference with industry standards, and identify opportunities to exceed expectations while staying within scope.",
  },
  {
    num: "03",
    title: "We Build a Tailored Plan",
    desc: "Our proposals are not templates. Each plan is written specifically for the issuing organization — addressing stated goals, compliance requirements, and success criteria.",
    detail: "Every deliverable is mapped to a milestone. Every milestone has a review gate. Your team has full visibility into progress at every stage.",
  },
  {
    num: "04",
    title: "We Demonstrate Compliance",
    desc: "Government and institutional projects require documented proof of standards — WCAG 2.1 AA, ADA Title II, Section 508, mobile-first design, CMS training.",
    detail: "We include accessibility audits, compliance documentation, and testing reports as standard deliverables — not add-ons.",
  },
  {
    num: "05",
    title: "We Deliver — On Time, On Spec",
    desc: "We execute with rigor: milestone-based delivery, stakeholder review gates, documented deliverables, and proactive communication throughout.",
    detail: "No surprises, no scope creep. If something changes, we communicate it immediately and adjust the plan together.",
  },
  {
    num: "06",
    title: "We Stay After Launch",
    desc: "Our engagements include post-launch support, staff training, documentation, and ongoing maintenance options.",
    detail: "We build long-term relationships, not one-off deliveries. Your team will be fully trained and confident managing your new platform.",
  },
];

const credentials = [
  { title: "WCAG 2.1 AA", desc: "Full accessibility compliance on every build" },
  { title: "ADA Title II", desc: "Federal compliance for public entities" },
  { title: "Section 508", desc: "Federal technology accessibility standards" },
  { title: "Mobile-First", desc: "Responsive design tested across all devices" },
  { title: "CMS Training", desc: "Full staff training and documentation included" },
  { title: "Content Migration", desc: "Seamless transition from legacy systems" },
  { title: "Bilingual / Multilingual", desc: "Language access and localization-ready builds" },
  { title: "Post-Launch Support", desc: "Ongoing maintenance contracts available" },
];

const sectors = [
  "Small Business & Local Enterprise",
  "Municipal / City Government",
  "County Government",
  "State / Provincial Agency",
  "K–12 School District",
  "Post-Secondary Institution",
  "Nonprofit Organization",
  "Indigenous / First Nations Organization",
  "Housing Authority",
  "Healthcare / Public Health",
  "Arts, Culture & Heritage",
  "Professional Association",
];

export default function RFP() {
  const [openStep, setOpenStep] = useState<number | null>(0);
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const howRef = useRef(null);
  const howInView = useInView(howRef, { once: true, margin: "-100px" });
  const credRef = useRef(null);
  const credInView = useInView(credRef, { once: true, margin: "-100px" });
  const sectorsRef = useRef(null);
  const sectorsInView = useInView(sectorsRef, { once: true, margin: "-100px" });
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* ─── HERO — centered, solid dark bg, no photo (distinct from homepage left-aligned photo hero) ─── */}
      <section className="relative bg-[oklch(0.14_0.04_155)] overflow-hidden">
        {/* Subtle geometric accent */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full border border-white/[0.03]" />
          <div className="absolute -bottom-60 -left-60 w-[800px] h-[800px] rounded-full border border-white/[0.03]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/[0.03] blur-3xl" />
        </div>

        <div className="container relative z-10 pt-32 pb-24 md:pt-44 md:pb-32" ref={heroRef}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <Link href="/">
              <a className="text-white/40 text-xs uppercase tracking-[0.15em] hover:text-white/70 transition-colors inline-flex items-center gap-1.5">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
              </a>
            </Link>
          </motion.div>

          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center justify-center gap-3 mb-8"
            >
              <div className="w-10 h-0.5 bg-[oklch(0.78_0.14_75)]" />
              <span className="text-[oklch(0.78_0.14_75)] text-xs font-semibold uppercase tracking-[0.25em]">
                Our Approach
              </span>
              <div className="w-10 h-0.5 bg-[oklch(0.78_0.14_75)]" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-[var(--font-display)] font-extrabold text-white leading-[1.08] tracking-tight mb-8"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4.5rem)" }}
            >
              Structured process.{" "}
              <br className="hidden sm:block" />
              <span className="text-primary">Measurable results.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-white/70 text-base sm:text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto font-light"
            >
              Civic Firm partners with government, education, nonprofit, and Indigenous organizations across Canada and the United States. Our approach is built around accountability, compliance, and the standards your stakeholders expect.
            </motion.p>

            {/* Stats row — unique to this page */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="grid grid-cols-3 gap-8 max-w-lg mx-auto"
            >
              {[
                { number: "100%", label: "WCAG Compliant" },
                { number: "6", label: "Step Process" },
                { number: "12", label: "Sectors Served" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-primary font-bold text-2xl md:text-3xl tracking-tight">{stat.number}</div>
                  <div className="text-white/40 text-[10px] uppercase tracking-[0.15em] mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom fade into next section */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </section>

      {/* ─── HOW WE WORK — accordion/expandable rows (distinct from homepage timeline) ─── */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container" ref={howRef}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Left — sticky heading */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={howInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-4"
              >
                <div className="w-8 h-0.5 bg-[oklch(0.72_0.12_75)]" />
                <span className="section-label">How We Work</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={howInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-[var(--font-display)] font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground leading-tight"
              >
                Six steps to{" "}
                <span className="text-primary">exceptional</span> delivery.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={howInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-muted-foreground text-sm md:text-base leading-relaxed mt-5 max-w-sm"
              >
                Click any step to learn more about how we approach institutional projects with the rigor and accountability your organization requires.
              </motion.p>
            </div>

            {/* Right — accordion */}
            <div className="lg:col-span-8">
              {howWeWork.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className={`border-b border-border ${i === 0 ? "border-t" : ""}`}
                >
                  <button
                    onClick={() => setOpenStep(openStep === i ? null : i)}
                    className="w-full flex items-center gap-5 py-6 text-left group cursor-pointer"
                  >
                    <span className={`font-bold text-3xl md:text-4xl leading-none select-none flex-shrink-0 w-14 text-right transition-colors duration-300 ${openStep === i ? "text-primary" : "text-primary/25 group-hover:text-primary/50"}`}>
                      {step.num}
                    </span>
                    <h3 className={`font-semibold text-base md:text-lg tracking-tight flex-1 transition-colors duration-300 ${openStep === i ? "text-primary" : "text-foreground group-hover:text-primary"}`}>
                      {step.title}
                    </h3>
                    <svg
                      className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${openStep === i ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <AnimatePresence>
                    {openStep === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pl-[4.75rem] pb-6 pr-4 md:pr-12">
                          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                            {step.desc}
                          </p>
                          <p className="text-muted-foreground/70 text-sm leading-relaxed mt-3">
                            {step.detail}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CREDENTIALS — full-width horizontal rows (distinct from homepage 2-col checklist) ─── */}
      <section className="py-20 md:py-28 bg-[oklch(0.18_0.04_155)]">
        <div className="container" ref={credRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={credInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-[oklch(0.72_0.12_75)]" />
              <span className="text-[oklch(0.78_0.14_75)] text-xs font-semibold uppercase tracking-[0.2em]">
                Standards & Credentials
              </span>
              <div className="w-8 h-0.5 bg-[oklch(0.72_0.12_75)]" />
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={credInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-[var(--font-display)] font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white"
            >
              Built to meet <span className="text-[oklch(0.60_0.16_150)]">every</span> requirement.
            </motion.h2>
          </motion.div>

          {/* Large credential rows — each one is a full-width row */}
          <div className="max-w-4xl mx-auto">
            {credentials.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="flex items-center gap-4 md:gap-6 py-5 border-b border-white/8 group"
              >
                <div className="w-8 h-8 rounded-full bg-[oklch(0.45_0.14_150)] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-white font-semibold text-base md:text-lg tracking-tight flex-shrink-0 min-w-[160px]">
                  {item.title}
                </span>
                <span className="hidden sm:block w-px h-4 bg-white/15 flex-shrink-0" />
                <span className="text-white/45 text-sm md:text-base">
                  {item.desc}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-[oklch(0.45_0.14_150)] text-white font-semibold text-sm px-7 py-3.5 rounded-md hover:bg-[oklch(0.40_0.14_150)] transition-all"
            >
              Work With Us
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTORS — flowing pill/tag layout (distinct from homepage numbered list) ─── */}
      <section className="py-20 md:py-28 bg-secondary dark:bg-[oklch(0.22_0.035_155)]">
        <div className="container" ref={sectorsRef}>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={sectorsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <div className="w-8 h-0.5 bg-[oklch(0.72_0.12_75)]" />
              <span className="section-label">Sectors We Serve</span>
              <div className="w-8 h-0.5 bg-[oklch(0.72_0.12_75)]" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={sectorsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-[var(--font-display)] font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground"
            >
              Trusted across <span className="text-primary">12 sectors</span> in North America.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={sectorsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-muted-foreground text-sm md:text-base leading-relaxed mt-4"
            >
              From procurement cycles to community expectations — we tailor our approach to the unique needs of each organization we serve.
            </motion.p>
          </div>

          {/* Flowing pill layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={sectorsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto"
          >
            {sectors.map((sector, i) => (
              <motion.span
                key={sector}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="inline-flex items-center gap-2 bg-background dark:bg-[oklch(0.18_0.04_155)] border border-border text-foreground text-sm font-medium px-5 py-3 rounded-full hover:border-primary hover:text-primary transition-colors duration-300 cursor-default"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                {sector}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CTA — clean solid background, no image, fully readable ─── */}
      <section className="relative py-28 md:py-40 overflow-hidden bg-[oklch(0.14_0.04_155)]">
        {/* Subtle radial glow accent */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(
              ellipse at 50% 30%,
              oklch(0.35 0.14 150 / 0.08) 0%,
              transparent 60%
            )`,
          }}
        />

        <div className="container relative z-10" ref={ctaRef}>
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <div className="w-8 h-0.5 bg-primary" />
              <span className="text-primary text-xs font-semibold uppercase tracking-[0.2em]">
                Get Started
              </span>
              <div className="w-8 h-0.5 bg-primary" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-[var(--font-display)] font-bold text-white leading-tight tracking-tight mb-6"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)" }}
            >
              Ready to partner with{" "}
              <span className="text-primary">Civic Firm?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-white/75 text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto"
            >
              Whether you're issuing an RFP, evaluating vendors, or exploring a direct engagement — we'd love to hear from you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold text-sm px-8 py-4 rounded-md hover:bg-[oklch(0.40_0.14_150)] transition-all shadow-lg shadow-primary/30"
              >
                Email Us Directly
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>

              <Link href="/">
                <a className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white font-semibold text-sm px-8 py-4 rounded-md hover:bg-white/10 hover:border-white/60 transition-all">
                  View Our Work
                </a>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={ctaInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-12 flex flex-wrap justify-center gap-10"
            >
              <div className="text-center">
                <div className="text-white/35 text-[10px] uppercase tracking-[0.15em] mb-1">Response Time</div>
                <span className="text-white/80 text-sm">Within 24–48 hours</span>
              </div>
              <div className="text-center">
                <div className="text-white/35 text-[10px] uppercase tracking-[0.15em] mb-1">Location</div>
                <span className="text-white/80 text-sm">Remote-First, North America</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
