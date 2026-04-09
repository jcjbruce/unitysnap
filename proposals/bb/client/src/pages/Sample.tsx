/*
 * SAMPLE HOMEPAGE for Becker's Bridal Boutique
 * Inspired by Lea-Ann Belter's clean, photography-forward aesthetic.
 * This is a demonstration of what the final site could look and feel like.
 * Includes a floating banner to return to the proposal.
 */

import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronDown,
  Clock,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Star,
  X,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0, 0, 0.2, 1] as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

/* CDN images */
const HERO_BRIDE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/Dh4Sf2Q7EBA8Vubfgk38fD/beckers-hero-bride-VGi3hP37XyjN3sxmo3JxZL.webp";
const BOUTIQUE_INTERIOR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/Dh4Sf2Q7EBA8Vubfgk38fD/beckers-boutique-interior-c9xTZPkaBq3EUrSKBwhbf3.webp";
const GOWN_DETAIL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/Dh4Sf2Q7EBA8Vubfgk38fD/beckers-gown-detail-U22m4NHAJdJHUS72Gg6pBQ.webp";
const COLLECTION_DISPLAY = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/Dh4Sf2Q7EBA8Vubfgk38fD/beckers-collection-display-ntGAAgYL4ZazLVKM3WPJbJ.webp";
const HERITAGE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/Dh4Sf2Q7EBA8Vubfgk38fD/heritage-storefront-VcZy7sBCoDfYHaxRsuqqBg.webp";

export default function Sample() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);

  return (
    <div className="min-h-screen bg-[#faf8f5] font-body">
      {/* PROPOSAL RETURN BANNER */}
      {bannerVisible && (
        <div className="fixed top-0 left-0 right-0 z-[60] bg-[#2a3a2a] text-[#f0ebe4]">
          <div className="container flex items-center justify-between py-2.5 gap-2">
            <span className="font-body text-[11px] tracking-wide uppercase text-[#c9b99a] shrink-0">
              Sample Preview
            </span>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 font-body text-[11px] tracking-wide uppercase text-[#c9b99a] hover:text-[#f0ebe4] transition-colors"
              >
                <ArrowLeft className="w-3 h-3" />
                <span className="hidden sm:inline">Back to Proposal</span>
                <span className="sm:hidden">Proposal</span>
              </Link>
              <button
                onClick={() => setBannerVisible(false)}
                className="text-[#a8b8a8] hover:text-[#f0ebe4] transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NAVIGATION */}
      <header className={`fixed left-0 right-0 z-50 bg-[#faf8f5]/95 backdrop-blur-sm border-b border-[#e8e2da]/60 transition-all ${bannerVisible ? 'top-[38px]' : 'top-0'}`}>
        <div className="container">
          {/* Top bar */}
          <div className="flex items-center justify-between py-5">
            <div className="flex items-center gap-8">
              <button
                className="md:hidden text-[#2a3a2a]"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <div className="space-y-1.5">
                  <div className="w-5 h-px bg-[#2a3a2a]" />
                  <div className="w-5 h-px bg-[#2a3a2a]" />
                </div>
              </button>
            </div>

            {/* Center logo */}
            <div className="absolute left-1/2 -translate-x-1/2 text-center">
              <h1 className="font-heading text-2xl md:text-3xl tracking-[0.15em] uppercase text-[#2a3a2a]">
                Becker's
              </h1>
              <p className="font-body text-[9px] tracking-[0.3em] uppercase text-[#8a8578] mt-0.5">
                Bridal Boutique · Est. 1944
              </p>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-4">
              <a href="#book" className="hidden md:inline-flex items-center gap-2 bg-[#2a3a2a] text-[#f0ebe4] px-5 py-2.5 font-body text-[11px] tracking-[0.15em] uppercase hover:bg-[#3a4a3a] transition-colors">
                Book Appointment
              </a>
              <a href="tel:4164636601" className="md:hidden text-[#2a3a2a]">
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center justify-center gap-10 pb-4">
            {["Collections", "Our Story", "Designers", "Real Brides", "Visit Us"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
                className="font-body text-[11px] tracking-[0.15em] uppercase text-[#8a8578] hover:text-[#2a3a2a] transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#faf8f5] border-t border-[#e8e2da]/60 py-6">
            <nav className="container space-y-4">
              {["Collections", "Our Story", "Designers", "Real Brides", "Visit Us"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
                  className="block font-body text-sm tracking-[0.1em] uppercase text-[#8a8578] hover:text-[#2a3a2a] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <a href="#book" className="block font-body text-sm tracking-[0.1em] uppercase text-[#2a3a2a] font-medium pt-2 border-t border-[#e8e2da]">
                Book Appointment
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className={`relative ${bannerVisible ? 'pt-[140px] md:pt-[130px]' : 'pt-[100px] md:pt-[90px]'}`}>
        <div className="relative h-[85vh] min-h-[600px] overflow-hidden">
          <img
            src={HERO_BRIDE}
            alt="Bride in elegant wedding gown at Becker's Bridal"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2a3a2a]/60 via-transparent to-transparent" />

          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="absolute bottom-0 left-0 right-0 p-8 md:p-16"
          >
            <motion.p
              variants={fadeUp}
              className="font-body text-[10px] tracking-[0.3em] uppercase text-white/80 mb-4"
              style={{ textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}
            >
              Canada's Oldest Bridal Boutique
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-heading text-4xl md:text-6xl lg:text-7xl font-light text-white leading-[1] mb-6"
            >
              Where Family<br />
              Traditions Continue
            </motion.h2>
            <motion.div variants={fadeUp} className="flex items-center gap-4">
              <a
                href="#book"
                className="inline-flex items-center gap-2 bg-[#c9b99a] text-[#2a3a2a] px-6 py-3 font-body text-[11px] tracking-[0.15em] uppercase hover:bg-[#d4c9b0] transition-colors"
              >
                Book Your Visit
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="#collections"
                className="inline-flex items-center gap-2 border border-white/40 text-white px-6 py-3 font-body text-[11px] tracking-[0.15em] uppercase hover:border-white/70 transition-colors"
              >
                View Collections
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/50">
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>
      </section>

      {/* INTRO STATEMENT */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="container py-24 md:py-32 text-center"
      >
        <motion.div variants={fadeUp} className="max-w-3xl mx-auto">
          <p className="font-body text-[10px] tracking-[0.3em] uppercase text-[#c9b99a] mb-8">
            Since 1944
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-light text-[#2a3a2a] leading-tight mb-8">
            A woman should feel beautiful<br />
            <span className="italic text-[#6b7b6b]">the moment she walks through our doors.</span>
          </h2>
          <p className="font-body text-base text-[#8a8578] leading-relaxed max-w-2xl mx-auto">
            For over eighty years, Becker's has been Toronto's destination for brides seeking a curated, personal experience. Our collection is thoughtfully handpicked each season, highlighting the latest trends while staying true to the timeless elegance we've become known for.
          </p>
        </motion.div>
      </motion.section>

      {/* TAGLINE BAR */}
      <div className="border-y border-[#e8e2da] py-5">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-8 text-center">
          <span className="font-body text-[10px] tracking-[0.3em] uppercase text-[#c9b99a]">
            Personalized Service
          </span>
          <span className="text-[#e8e2da] hidden sm:inline">·</span>
          <span className="font-body text-[10px] tracking-[0.3em] uppercase text-[#c9b99a]">
            Curated Collections
          </span>
          <span className="text-[#e8e2da] hidden sm:inline">·</span>
          <span className="font-body text-[10px] tracking-[0.3em] uppercase text-[#c9b99a]">
            Danforth Avenue, Toronto
          </span>
        </div>
      </div>

      {/* COLLECTIONS */}
      <motion.section
        id="collections"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="container py-24 md:py-32"
      >
        <motion.div variants={fadeUp} className="text-center mb-16">
          <p className="font-body text-[10px] tracking-[0.3em] uppercase text-[#c9b99a] mb-4">
            The Collection
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-light text-[#2a3a2a]">
            A Room Full of Winners
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <motion.div variants={fadeUp} className="group cursor-pointer">
            <div className="relative overflow-hidden aspect-[3/4]">
              <img
                src={GOWN_DETAIL}
                alt="Bridal gown lace detail"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#2a3a2a]/0 group-hover:bg-[#2a3a2a]/20 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="font-body text-[10px] tracking-[0.3em] uppercase text-white/80 mb-2">
                  Explore
                </p>
                <h3 className="font-heading text-2xl md:text-3xl text-white font-light">
                  Wedding Gowns
                </h3>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="group cursor-pointer">
            <div className="relative overflow-hidden aspect-[3/4]">
              <img
                src={COLLECTION_DISPLAY}
                alt="Becker's curated collection display"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#2a3a2a]/0 group-hover:bg-[#2a3a2a]/20 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="font-body text-[10px] tracking-[0.3em] uppercase text-white/80 mb-2">
                  Browse by
                </p>
                <h3 className="font-heading text-2xl md:text-3xl text-white font-light">
                  Designer
                </h3>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* OUR STORY */}
      <section id="our-story" className="bg-[#f0ebe4]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="container py-24 md:py-32"
        >
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <motion.div variants={fadeUp}>
              <img
                src={HERITAGE_IMG}
                alt="Becker's Bridal heritage storefront"
                className="w-full aspect-[4/5] object-cover"
              />
            </motion.div>
            <motion.div variants={fadeUp} className="space-y-6">
              <p className="font-body text-[10px] tracking-[0.3em] uppercase text-[#c9b99a]">
                Our Story
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-light text-[#2a3a2a] leading-tight">
                Eighty Years of<br />
                <span className="italic text-[#6b7b6b]">Saying Yes</span>
              </h2>
              <p className="font-body text-base text-[#4a4a42] leading-relaxed">
                When Becker's first opened its doors on Danforth Avenue in 1944, the neighbourhood was a different world. But some things haven't changed. Mothers still bring their daughters here, and those daughters return years later with their own. Three, sometimes four generations of the same family have found their dress in this room.
              </p>
              <p className="font-body text-base text-[#4a4a42] leading-relaxed">
                Under new ownership, we're preserving everything that made Becker's what it is while bringing the experience into a new era. The same personal service. The same curated collection. The same feeling of walking into a place that was made for this moment.
              </p>
              <div className="pt-6 border-t border-[#d4c9b0]/50">
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <p className="font-heading text-2xl font-light text-[#2a3a2a]">1944</p>
                    <p className="font-body text-[10px] tracking-[0.2em] uppercase text-[#8a8578] mt-1">Founded</p>
                  </div>
                  <div>
                    <p className="font-heading text-2xl font-light text-[#2a3a2a]">80+</p>
                    <p className="font-body text-[10px] tracking-[0.2em] uppercase text-[#8a8578] mt-1">Years</p>
                  </div>
                  <div>
                    <p className="font-heading text-2xl font-light text-[#2a3a2a]">3 Gen</p>
                    <p className="font-body text-[10px] tracking-[0.2em] uppercase text-[#8a8578] mt-1">Families</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* THE EXPERIENCE */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="container py-24 md:py-32"
      >
        <motion.div variants={fadeUp} className="text-center mb-16">
          <p className="font-body text-[10px] tracking-[0.3em] uppercase text-[#c9b99a] mb-4">
            The Experience
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-light text-[#2a3a2a]">
            Your Visit, Your Way
          </h2>
        </motion.div>

        <motion.div variants={stagger} className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Take the Style Quiz",
              desc: "Tell us about your vision, your style, and what makes you feel beautiful. Our consultants will curate a shortlist of gowns before you even walk in.",
            },
            {
              step: "02",
              title: "Book Your Appointment",
              desc: "Choose a time that works for you. Your dedicated consultant will have everything ready, so every minute of your visit is spent on what matters.",
            },
            {
              step: "03",
              title: "Say Yes",
              desc: "In a calm, private setting with the people who matter most, try on gowns selected just for you. No rush, no pressure, just the moment you've been imagining.",
            },
          ].map((item) => (
            <motion.div key={item.step} variants={fadeUp} className="text-center space-y-4">
              <p className="font-heading text-4xl font-light text-[#e8e2da]">{item.step}</p>
              <h3 className="font-heading text-xl font-medium text-[#2a3a2a]">{item.title}</h3>
              <p className="font-body text-sm text-[#8a8578] leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* BOUTIQUE IMAGE BREAK */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img
          src={BOUTIQUE_INTERIOR}
          alt="Becker's Bridal boutique interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#2a3a2a]/10" />
      </div>

      {/* TESTIMONIALS */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="container py-24 md:py-32"
      >
        <motion.div variants={fadeUp} className="text-center mb-16">
          <p className="font-body text-[10px] tracking-[0.3em] uppercase text-[#c9b99a] mb-4">
            Real Brides
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-light text-[#2a3a2a]">
            In Their Words
          </h2>
        </motion.div>

        <motion.div variants={stagger} className="grid md:grid-cols-3 gap-8">
          {[
            {
              quote: "My mom found her dress at Becker's in 1987. Walking through those same doors thirty years later was the most special part of my wedding journey.",
              name: "Sarah M.",
              detail: "Bride, 2024",
            },
            {
              quote: "The consultants knew exactly what would work for my body type. I tried on four dresses and said yes to the second one. It was that easy.",
              name: "Priya K.",
              detail: "Bride, 2023",
            },
            {
              quote: "No pressure, no upselling, just genuine care. Becker's feels like a secret that Toronto brides pass down to each other.",
              name: "Emma L.",
              detail: "Bride, 2024",
            },
          ].map((t, i) => (
            <motion.div key={i} variants={fadeUp} className="border border-[#e8e2da] p-8 space-y-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-[#c9b99a] text-[#c9b99a]" />
                ))}
              </div>
              <p className="font-body text-sm text-[#4a4a42] leading-relaxed italic">
                "{t.quote}"
              </p>
              <div>
                <p className="font-body text-sm font-medium text-[#2a3a2a]">{t.name}</p>
                <p className="font-body text-xs text-[#8a8578]">{t.detail}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* BOOK APPOINTMENT CTA */}
      <section id="book" className="bg-[#2a3a2a] text-[#f0ebe4]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="container py-24 md:py-32"
        >
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp} className="space-y-6">
              <p className="font-body text-[10px] tracking-[0.3em] uppercase text-[#c9b99a]">
                Visit Us
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-light leading-tight">
                Begin Your<br />
                <span className="italic text-[#a8b8a8]">Becker's Experience</span>
              </h2>
              <p className="font-body text-base text-[#a8b8a8] leading-relaxed">
                Book a private appointment with one of our experienced consultants. We'll prepare a curated selection based on your style preferences, so every moment of your visit is spent finding the one.
              </p>
              <a
                href="#book"
                className="inline-flex items-center gap-2 bg-[#c9b99a] text-[#2a3a2a] px-8 py-4 font-body text-[11px] tracking-[0.15em] uppercase hover:bg-[#d4c9b0] transition-colors"
              >
                <Calendar className="w-4 h-4" />
                Book Your Appointment
              </a>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="w-4 h-4 text-[#c9b99a] mt-1 shrink-0" />
                  <div>
                    <p className="font-body text-sm text-[#f0ebe4]">Danforth Avenue, Toronto</p>
                    <p className="font-body text-xs text-[#a8b8a8] mt-0.5">Subway accessible · Easy parking nearby</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-4 h-4 text-[#c9b99a] mt-1 shrink-0" />
                  <div>
                    <p className="font-body text-sm text-[#f0ebe4]">(416) 463-6601</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-4 h-4 text-[#c9b99a] mt-1 shrink-0" />
                  <div>
                    <p className="font-body text-sm text-[#f0ebe4]">beckersbridal@rogers.com</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#a8b8a8]/20 pt-6">
                <p className="font-body text-[10px] tracking-[0.2em] uppercase text-[#c9b99a] mb-4">
                  Hours · By Appointment
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { day: "Monday", hours: "10am – 6pm" },
                    { day: "Tuesday", hours: "11am – 7pm" },
                    { day: "Wednesday", hours: "10am – 3pm" },
                    { day: "Thursday", hours: "Closed" },
                    { day: "Friday", hours: "11am – 7pm" },
                    { day: "Saturday", hours: "10am – 6pm" },
                    { day: "Sunday", hours: "11am – 5pm" },
                  ].map((h) => (
                    <div key={h.day} className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-[#a8b8a8]/50" />
                      <span className="font-body text-xs text-[#a8b8a8]">
                        {h.day}: <span className={h.hours === "Closed" ? "text-[#a8b8a8]/50" : "text-[#f0ebe4]"}>{h.hours}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* INSTAGRAM TEASER */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="container py-24 md:py-32 text-center"
      >
        <motion.div variants={fadeUp} className="mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Instagram className="w-4 h-4 text-[#8a8578]" />
            <p className="font-body text-[10px] tracking-[0.3em] uppercase text-[#8a8578]">
              @beckersbridaltoronto
            </p>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-light text-[#2a3a2a]">
            Follow Along
          </h2>
        </motion.div>

        <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[HERO_BRIDE, GOWN_DETAIL, BOUTIQUE_INTERIOR, COLLECTION_DISPLAY].map((img, i) => (
            <div key={i} className="aspect-square overflow-hidden cursor-pointer group">
              <img
                src={img}
                alt={`Instagram post ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </motion.div>
      </motion.section>

      {/* FOOTER */}
      <footer className="bg-[#f0ebe4] border-t border-[#e8e2da]">
        <div className="container py-16">
          <div className="grid md:grid-cols-4 gap-10">
            <div className="md:col-span-2">
              <h3 className="font-heading text-2xl tracking-[0.1em] uppercase text-[#2a3a2a] mb-2">
                Becker's
              </h3>
              <p className="font-body text-[9px] tracking-[0.3em] uppercase text-[#8a8578] mb-4">
                Bridal Boutique · Est. 1944
              </p>
              <p className="font-body text-sm text-[#8a8578] leading-relaxed max-w-sm">
                Canada's oldest bridal boutique. Personalized shopping experiences for over eighty years on Danforth Avenue, Toronto.
              </p>
            </div>
            <div>
              <p className="font-body text-[10px] tracking-[0.2em] uppercase text-[#c9b99a] mb-4">Explore</p>
              <nav className="space-y-2">
                {["Collections", "Our Story", "Designers", "Real Brides", "FAQs"].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="block font-body text-sm text-[#8a8578] hover:text-[#2a3a2a] transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>
            <div>
              <p className="font-body text-[10px] tracking-[0.2em] uppercase text-[#c9b99a] mb-4">Connect</p>
              <div className="space-y-2">
                <a href="tel:4164636601" className="block font-body text-sm text-[#8a8578] hover:text-[#2a3a2a] transition-colors">
                  (416) 463-6601
                </a>
                <a href="mailto:beckersbridal@rogers.com" className="block font-body text-sm text-[#8a8578] hover:text-[#2a3a2a] transition-colors">
                  beckersbridal@rogers.com
                </a>
                <p className="font-body text-sm text-[#8a8578]">Danforth Ave, Toronto</p>
              </div>
              <div className="flex gap-4 mt-4">
                {["Instagram", "Facebook", "Pinterest"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="font-body text-xs text-[#8a8578] hover:text-[#2a3a2a] transition-colors"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-[#e8e2da] py-6">
          <div className="container flex flex-col md:flex-row items-center justify-between gap-2">
            <p className="font-body text-[10px] text-[#c9b99a]">
              © 2026 Becker's Bridal Boutique. All rights reserved.
            </p>
            <p className="font-body text-[10px] text-[#c9b99a]">
              Sample design by Civic Firm
            </p>
          </div>
        </div>
      </footer>

      {/* FLOATING RETURN TO PROPOSAL (if banner dismissed) */}
      {!bannerVisible && (
        <Link
          href="/"
          className="fixed bottom-6 right-6 z-50 bg-[#2a3a2a] text-[#f0ebe4] px-5 py-3 shadow-lg flex items-center gap-2 font-body text-[11px] tracking-[0.1em] uppercase hover:bg-[#3a4a3a] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Proposal
        </Link>
      )}
    </div>
  );
}
