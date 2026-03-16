/*
 * DESIGN: Institutional — Testimonials
 * Dark background. Single-card carousel with auto-advance.
 * Professional, one-at-a-time display. No stereotypical names.
 * Navigation dots + arrows for manual control.
 */
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

const testimonials = [
  {
    quote:
      "From strategy to launch, every step was transparent and collaborative. The final product exceeded our expectations — our enrollment inquiries doubled within the first month.",
    author: "Maria Gonzalez",
    title: "Director",
    org: "Tucson Tots",
    sector: "Early Education",
    accent: "#ffc83c",
  },
  {
    quote:
      "Civic Firm understood what we needed before we could articulate it ourselves. They built us a platform that our community is genuinely proud to use every day.",
    author: "David Clearwater",
    title: "Executive Director",
    org: "EagleFeather",
    sector: "Public Health",
    accent: "#ffa03c",
  },
  {
    quote:
      "The team brought a level of care and professionalism we hadn't experienced with other agencies. Our researchers finally have a digital home that reflects the quality of their work.",
    author: "Dr. Sarah Whitfield",
    title: "Research Lead",
    org: "Research Circle",
    sector: "Research & Governance",
    accent: "#64a0ff",
  },
  {
    quote:
      "Working with Civic Firm was seamless. They challenged our assumptions, refined our vision, and delivered something we're proud to show at every screening and festival.",
    author: "Priya Mehta",
    title: "Program Director",
    org: "Visio",
    sector: "Community Media",
    accent: "#dc5050",
  },
  {
    quote:
      "The accessibility compliance work alone was worth every dollar. We now meet WCAG 2.1 AA and Section 508 — and our students can actually use the platform on any device.",
    author: "James Okafor",
    title: "Head of Partnerships",
    org: "UnitySnap",
    sector: "Education & Animation",
    accent: "#a064ff",
  },
];

const AUTO_INTERVAL = 6000;

export default function Testimonials() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, AUTO_INTERVAL);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
    resetTimer();
  };

  const goNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
    resetTimer();
  };

  const goPrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    resetTimer();
  };

  const t = testimonials[current];

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <section className="py-20 md:py-28 bg-[oklch(0.16_0.04_155)]">
      <div className="container" ref={sectionRef}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="w-8 h-0.5 bg-[oklch(0.78_0.14_75)]" />
          <span className="section-label" style={{ color: "oklch(0.78 0.14 75)" }}>
            What Clients Say
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-[var(--font-display)] font-bold text-3xl sm:text-4xl tracking-tight text-white mb-12 md:mb-16"
        >
          Trusted by the{" "}
          <span className="text-primary">organizations we serve.</span>
        </motion.h2>

        {/* Carousel card */}
        <div className="max-w-3xl mx-auto">
          <div className="relative min-h-[260px] sm:min-h-[220px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="bg-white border border-[oklch(0.89_0.015_80)] rounded-xl p-6 sm:p-8 md:p-10 shadow-sm"
              >
                {/* Quote */}
                <div className="mb-6">
                  <svg
                    className="w-8 h-8 mb-4 opacity-30"
                    style={{ color: t.accent }}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <blockquote className="text-foreground text-base sm:text-lg md:text-xl leading-relaxed font-light">
                    {t.quote}
                  </blockquote>
                </div>

                {/* Author */}
                <div className="flex items-center gap-4 pt-5 border-t border-[oklch(0.90_0.015_80)]">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                    style={{ background: `${t.accent}22`, color: t.accent }}
                  >
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-foreground font-semibold text-sm">
                      {t.author}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      {t.title}, {t.org}
                    </div>
                  </div>
                  <span
                    className="ml-auto hidden sm:inline-block text-[9px] uppercase tracking-[0.16em] font-bold px-2.5 py-1 rounded"
                    style={{ background: `${t.accent}15`, color: t.accent }}
                  >
                    {t.sector}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6">
            {/* Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={goPrev}
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all"
                aria-label="Previous testimonial"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={goNext}
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all"
                aria-label="Next testimonial"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-6 bg-primary"
                      : "w-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            {/* Counter */}
            <span className="text-white/30 text-xs font-mono">
              {String(current + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
