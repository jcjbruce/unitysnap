/*
 * DESIGN: Institutional — Motion & Animation Page
 * Matches the main site: navy hero header, white background card grid.
 * Video thumbnails get a navy overlay tint on hover to match color scheme.
 * Green play button, green category tags, green accent bar.
 * Seamlessly integrated: same Navbar, Footer, typography, and spacing as the rest of the site.
 */
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "wouter";

const animations = [
  {
    title: '"Hidden Dangers at Home"',
    subtitle: "Toxic Mold",
    category: "Educational Explainer",
    src: "https://framerusercontent.com/assets/Se16mk9MPGfrkTYG8pq9icXU.mp4",
    poster: "https://framerusercontent.com/images/7uZGlCDhYgURUG3uYAnN1Pal8.png",
  },
  {
    title: '"Understanding Healthcare Models"',
    subtitle: "Health",
    category: "Educational Explainer",
    src: "https://framerusercontent.com/assets/UgUSjQvnTjMiH9snMPpKQQvXa7E.mp4",
    poster: "https://framerusercontent.com/images/qMI52TcyQ1aJg1OO64PsaZHytU.png",
  },
  {
    title: '"Smarter Coverage Explained"',
    subtitle: "Insurance",
    category: "Explainer Animation",
    src: "https://framerusercontent.com/assets/HL3lJzEvkSFnvRfapHfgXkikA.mp4",
    poster: "https://framerusercontent.com/images/0UeYoOsMxjfK0s6gUKkSP9eCY.png",
  },
  {
    title: '"Traveling with Your Pet"',
    subtitle: "Pet",
    category: "Character Animation",
    src: "https://framerusercontent.com/assets/TML6tlbuAR2Z89SilhGZVQR2Ck.mp4",
    poster: "https://framerusercontent.com/images/yNtoMwNEt9YDx3tHX5gC05VCnBQ.png",
  },
  {
    title: '"Water Park Safety Guide"',
    subtitle: "Swim",
    category: "Safety Animation",
    src: "https://framerusercontent.com/assets/6Je1k4Yqaa5X4DeXi7Cnbno9U0.mp4",
    poster: "https://framerusercontent.com/images/9pW2lzQpSx4BgtVquYtMKOfHAw.png",
  },
  {
    title: '"Delivering the Magic"',
    subtitle: "Christmas",
    category: "Brand Animation",
    src: "https://framerusercontent.com/assets/UpSn4MUym5AgS6q70xeasWc5g.mp4",
    poster: "https://framerusercontent.com/images/ktuPZR4cYN4bIb46xvJ8Ln21lwo.png",
  },
];

function VideoCard({ anim, index }: { anim: (typeof animations)[0]; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group bg-white dark:bg-[oklch(0.22_0.035_155)] rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-[oklch(0.30_0.03_155)] hover:shadow-md transition-shadow duration-300"
    >
      {/* Video container */}
      <div
        className="relative overflow-hidden cursor-pointer"
        style={{ aspectRatio: "16/9" }}
        onClick={togglePlay}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <video
          ref={videoRef}
          src={anim.src}
          poster={anim.poster}
          className="w-full h-full object-cover"
          onEnded={() => setPlaying(false)}
          preload="none"
          playsInline
        />

        {/* Navy color overlay — tints the thumbnail to match site palette */}
        <div
          className={`absolute inset-0 transition-opacity duration-400 ${
            playing && !hovered ? "opacity-0" : "opacity-100"
          }`}
          style={{
            background: playing && !hovered
              ? "transparent"
              : "linear-gradient(135deg, oklch(0.22 0.06 155 / 0.55) 0%, oklch(0.26 0.04 155 / 0.35) 100%)",
          }}
        />

        {/* Play/Pause button */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            playing && !hovered ? "opacity-0" : "opacity-100"
          }`}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg"
          >
            {playing ? (
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </motion.div>
        </div>

        {/* Category tag */}
        <div className="absolute top-3 left-3">
          <span className="text-[10px] uppercase tracking-[0.18em] font-semibold bg-primary text-white px-2.5 py-1 rounded-sm">
            {anim.category}
          </span>
        </div>

        {/* Green accent bar at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary md:scale-x-0 md:group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>

      {/* Caption */}
      <div className="px-5 py-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-[var(--font-display)] font-bold text-[oklch(0.22_0.02_75)] dark:text-white text-base leading-snug">
            {anim.title}
          </h3>
          <p className="text-muted-foreground text-xs uppercase tracking-[0.15em] mt-1">
            {anim.subtitle}
          </p>
        </div>
        <span className="text-muted-foreground/50 text-xs font-mono mt-0.5 flex-shrink-0">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </motion.div>
  );
}

export default function Animations() {
  return (
    <div className="min-h-screen flex flex-col bg-[oklch(0.97_0.01_80)] dark:bg-[oklch(0.15_0.04_155)] text-foreground">
      <Navbar />

      {/* Navy hero header — matches RFP page and institutional style */}
      <section
        className="pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, oklch(0.22 0.06 155) 0%, oklch(0.26 0.04 155) 100%)",
        }}
      >
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-12 h-px bg-primary" />
              <span className="text-primary text-xs uppercase tracking-[0.3em] font-semibold">
                Motion & Animation
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-[var(--font-display)] font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight text-white leading-[1.05] mb-6"
            >
              We bring ideas<br />
              <span className="text-primary">to life.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-white/70 text-base md:text-lg leading-relaxed max-w-2xl"
            >
              Our animation work spans educational explainers, character-driven stories, and curriculum-aligned media productions. Each project was developed by our team to demonstrate the range, quality, and versatility of what UnitySnap delivers — from concept and scripting through to final animated production.
            </motion.p>

            {/* Trust tags */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-2 mt-8"
            >
              {["Educational Explainers", "Character Animation", "Brand Stories", "Curriculum Media"].map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] uppercase tracking-[0.15em] font-medium text-white/60 border border-white/20 px-3 py-1.5 rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video grid */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {animations.map((anim, i) => (
              <VideoCard key={i} anim={anim} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA — navy background matching the compliance section */}
      <section
        className="py-16 md:py-24"
        style={{
          background: "linear-gradient(135deg, oklch(0.22 0.06 155) 0%, oklch(0.26 0.04 155) 100%)",
        }}
      >
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-primary" />
                <span className="text-primary text-xs uppercase tracking-[0.3em] font-semibold">Connect With Us</span>
              </div>
              <h2 className="font-[var(--font-display)] font-extrabold text-2xl md:text-4xl text-white tracking-tight leading-tight">
                Ready to animate your story?
              </h2>
              <p className="text-white/60 text-sm mt-3 max-w-md leading-relaxed">
                From concept to final delivery — we handle the full production pipeline. Educational, institutional, or brand storytelling.
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Link href="/contact">
                <a className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-[var(--font-display)] font-bold text-sm uppercase tracking-[0.08em] rounded-md hover:bg-primary/90 transition-colors">
                  Start a Project →
                </a>
              </Link>
              <Link href="/#work">
                <a className="inline-flex items-center gap-2 px-6 py-3 border border-white/25 text-white font-[var(--font-display)] font-bold text-sm uppercase tracking-[0.08em] rounded-md hover:border-white/50 transition-colors">
                  View All Work
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
