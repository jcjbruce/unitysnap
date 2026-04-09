/*
 * DESIGN: Institutional — Portfolio / Work Section
 * Clean editorial layout. Image cards with solid dark text panel.
 * Images use object-contain on mobile to prevent cropping.
 * Text is always readable — solid dark panel, high contrast.
 * 5 projects: 2 featured + 3 standard. Non-Indigenous projects featured first.
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    name: "Tucson Tots",
    sector: "K–12 & Early Education",
    descriptor: "Family enrollment & outreach platform",
    summary:
      "A standards-compliant website for a licensed early learning institution — built to drive enrollment, communicate with families, and meet district accessibility requirements.",
    image: "/portfolio/tucsontots-hero.png",
    url: "https://tucsontots.com",
    accent: "#ffc83c",
    featured: true,
  },
  {
    name: "Kinship AI",
    sector: "Health Equity & AI Research",
    descriptor: "Indigenous-led health AI research hub",
    summary:
      "A research platform co-designing equitable AI-enabled healthcare systems through Indigenous-led, community-grounded participatory approaches and intercultural collaboration.",
    image: "/portfolio/kinshipai-hero.png",
    url: "https://kinshipai.org",
    accent: "#2dd4a8",
    featured: true,
  },
  {
    name: "Visio",
    sector: "Nonprofit & Community Media",
    descriptor: "Community media production hub",
    summary:
      "A multi-format media platform supporting public outreach, grant reporting, and community storytelling.",
    image: "/portfolio/visio-hero.png",
    url: "https://visio.ca",
    accent: "#dc5050",
    featured: false,
  },
  {
    name: "EagleFeather",
    sector: "Public Health & Wellness",
    descriptor: "National health resource directory",
    summary:
      "A searchable, WCAG-compliant health directory serving communities across all 13 provinces and territories.",
    image: "/portfolio/eaglefeather-hero.png",
    url: "https://eaglefeather.ca",
    accent: "#ffa03c",
    featured: false,
  },
  {
    name: "Research Circle",
    sector: "Research & Data Governance",
    descriptor: "Knowledge mobilization platform",
    summary:
      "Digital infrastructure for community-led research, data sovereignty, and accessible knowledge sharing.",
    image: "/portfolio/researchcircle-hero.png",
    url: "https://researchcircle.ca",
    accent: "#64a0ff",
    featured: false,
  },
];

function ProjectCard({
  project,
  index,
  featured,
}: {
  project: (typeof projects)[0];
  index: number;
  featured?: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.a
      ref={ref}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.65,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative block overflow-hidden rounded-xl bg-[oklch(0.14_0.03_155)]"
    >
      {/* Image — uses object-cover with center positioning so nothing important gets cut */}
      <div
        className={`relative w-full overflow-hidden ${
          featured
            ? "aspect-[16/9] sm:aspect-[2/1] md:aspect-[16/9]"
            : "aspect-[16/10]"
        }`}
      >
        <img
          src={project.image}
          alt={`${project.name} — ${project.descriptor}`}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
          loading="lazy"
        />

        {/* Subtle vignette at top for sector pill readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent pointer-events-none" />

        {/* Sector pill — top left */}
        <div className="absolute top-3 left-3 md:top-4 md:left-5">
          <span
            className="inline-block text-[10px] md:text-[11px] uppercase tracking-[0.14em] font-bold px-3 py-1.5 rounded-full"
            style={{
              background: `rgba(0,0,0,0.75)`,
              color: '#ffffff',
              border: `1px solid rgba(255,255,255,0.2)`,
              backdropFilter: 'blur(8px)',
            }}
          >
            {project.sector}
          </span>
        </div>

        {/* Arrow — top right, appears on hover */}
        <div className="absolute top-3 right-3 md:top-4 md:right-5 w-9 h-9 rounded-full border border-white/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm bg-white/10">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 17L17 7M17 7H7M17 7v10"
            />
          </svg>
        </div>
      </div>

      {/* Text panel — BELOW the image, not overlaid. Solid background, always readable. */}
      <div className="bg-[oklch(0.14_0.03_155)] px-4 py-4 md:px-5 md:py-5 lg:px-6 lg:py-5">
        <p
          className="text-[10px] md:text-[11px] uppercase tracking-[0.14em] font-semibold mb-1"
          style={{ color: project.accent }}
        >
          {project.descriptor}
        </p>
        <h3
          className={`font-[var(--font-display)] font-bold text-white tracking-tight leading-tight ${
            featured
              ? "text-xl md:text-2xl lg:text-[1.75rem]"
              : "text-lg md:text-xl"
          }`}
        >
          {project.name}
        </h3>
        <p
          className={`text-white/60 leading-relaxed mt-1.5 ${
            featured
              ? "text-sm md:text-[15px]"
              : "text-xs md:text-sm"
          }`}
        >
          {project.summary}
        </p>
      </div>

      {/* Accent bar — bottom edge, slides in on hover */}
      <div
        className="h-[3px] w-0 group-hover:w-full transition-all duration-500"
        style={{ background: project.accent }}
      />
    </motion.a>
  );
}

export default function Work() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-100px" });

  const featured = projects.filter((p) => p.featured);
  const standard = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="py-20 md:py-28 bg-[oklch(0.12_0.03_155)]">
      <div className="container">
        {/* Section header */}
        <div
          ref={headRef}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16"
        >
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={headInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-8 h-0.5 bg-[oklch(0.72_0.12_75)]" />
              <span className="section-label">
                Portfolio
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={headInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-[var(--font-display)] font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white"
            >
              Work that{" "}
              <span className="text-primary">speaks for itself.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={headInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="mt-4 md:mt-0 text-white/70 text-sm max-w-xs leading-relaxed"
          >
            Real projects for real organizations — built to meet compliance
            standards, serve communities, and deliver measurable results.
          </motion.p>
        </div>

        {/* Featured row — 2 cards side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {featured.map((project, i) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={i}
              featured
            />
          ))}
        </div>

        {/* Standard row — 3 equal cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {standard.map((project, i) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={i + 2}
            />
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-[oklch(0.24_0.03_155)] pt-8 gap-4"
        >
          <p className="text-white/55 text-xs">
            All projects built to WCAG 2.1 AA accessibility standards.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-primary text-sm font-semibold hover:underline underline-offset-4"
          >
            Start a project
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
