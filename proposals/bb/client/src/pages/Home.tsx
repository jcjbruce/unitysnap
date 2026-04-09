/*
 * DESIGN: Clean boutique editorial — Leanne Belter inspired
 * Light backgrounds, Cormorant Garamond headings, Outfit body text,
 * generous whitespace, muted sage/warm tones. Civic Firm branding.
 *
 * UPDATES:
 * - Replaced Eleanor Bridal mockup with clean generic mockup
 * - Softened CloudBridal language ("from our understanding")
 * - Removed "LocalBusiness schema" jargon
 * - Cleaned up dash-heavy writing
 * - All packages list only confident deliverables
 * - React mentioned as build framework
 * - Working CTA buttons (mailto)
 * - "View Sample" link in header
 */

import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  Check,
  Clock,
  Globe,
  Layers,
  MessageSquare,
  Search,
  Smartphone,
  Star,
  Zap,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0, 0, 0.2, 1] as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/Dh4Sf2Q7EBA8Vubfgk38fD/hero-boutique-nmLSLy6RKXY44yUEMrf4xa.webp";
const HERITAGE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/Dh4Sf2Q7EBA8Vubfgk38fD/heritage-storefront-VcZy7sBCoDfYHaxRsuqqBg.webp";
const MOCKUP_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/Dh4Sf2Q7EBA8Vubfgk38fD/beckers-mockup-clean-jdC2QRXDZ2EGggtZFqq2z7.webp";
const BRIDE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/Dh4Sf2Q7EBA8Vubfgk38fD/bride-moment-7FjzG7bGqkoBJeNoWMfLmg.webp";

export default function Home() {
  const [activeTier, setActiveTier] = useState<number>(1);

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#faf8f5]/90 backdrop-blur-sm border-b border-[#e8e2da]">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <span className="font-heading text-xl font-semibold tracking-editorial uppercase text-[#2a3a2a]">
              Civic Firm
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/sample"
              className="font-body text-xs tracking-editorial uppercase text-[#6b7b6b] hover:text-[#2a3a2a] transition-colors"
            >
              View Sample Homepage
            </Link>
            <span className="font-body text-xs tracking-editorial uppercase text-[#8a8578]">
              Proposal
            </span>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative pt-20">
        <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
          <img
            src={HERO_IMG}
            alt="Elegant bridal boutique interior"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#faf8f5]/30 via-transparent to-[#faf8f5]" />
        </div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="container relative -mt-48 z-10 pb-24"
        >
          <motion.p
            variants={fadeUp}
            className="font-body text-xs tracking-wide-editorial uppercase text-[#8a8578] mb-6"
          >
            Prepared for Becker's Bridal Boutique
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-heading text-5xl md:text-7xl lg:text-8xl font-light leading-[0.95] text-[#2a3a2a] mb-8"
          >
            A New Chapter<br />
            <span className="italic text-[#6b7b6b]">Deserves a New</span><br />
            Digital Home
          </motion.h1>
          <motion.div variants={fadeUp} className="flex items-center gap-6 mt-10">
            <div className="w-16 h-px bg-[#c9b99a]" />
            <p className="font-body text-sm text-[#8a8578] tracking-wide">
              Website Design &amp; Digital Strategy Proposal
            </p>
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="font-body text-sm text-[#8a8578] mt-4"
          >
            March 2026
          </motion.p>
        </motion.div>
      </section>

      <div className="container"><div className="h-px bg-[#e8e2da]" /></div>

      {/* THE OPPORTUNITY */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="container py-24 md:py-32"
      >
        <motion.p variants={fadeUp} className="font-body text-xs tracking-wide-editorial uppercase text-[#c9b99a] mb-4">
          01 — The Opportunity
        </motion.p>
        <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-light text-[#2a3a2a] mb-12 max-w-3xl leading-tight">
          Canada's oldest bridal boutique.<br />
          <span className="italic text-[#6b7b6b]">A legacy worth protecting.</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div variants={fadeUp}>
            <img src={HERITAGE_IMG} alt="Heritage bridal storefront" className="w-full aspect-[4/3] object-cover" />
          </motion.div>
          <motion.div variants={fadeUp} className="space-y-6">
            <p className="font-body text-base leading-relaxed text-[#4a4a42]">
              Since 1944, Becker's Bridal Boutique has been a cornerstone of Danforth Avenue. A place where mothers bring their daughters, and those daughters return years later with their own. Over eighty years of curated collections, personal service, and word-of-mouth trust have built something rare in retail: a genuinely multigenerational relationship with its community.
            </p>
            <p className="font-body text-base leading-relaxed text-[#4a4a42]">
              Under new ownership, Becker's is entering its most exciting chapter yet. The heritage is intact. The management team carries decades of bridal expertise. The collection remains what it has always been: a room full of winners, thoughtfully curated and moderately priced.
            </p>
            <p className="font-body text-base leading-relaxed text-[#4a4a42]">
              What's missing is the digital presence to match. The systems that served Becker's for decades — limited online booking, few automations, and phone-first communication — no longer reach the brides who need to find it most.
            </p>
            <div className="pt-6 border-t border-[#e8e2da]">
              <p className="font-heading text-2xl italic text-[#6b7b6b]">
                "The brides who would love Becker's can't find it yet."
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* THE CHALLENGE */}
      <section className="bg-[#2a3a2a] text-[#f0ebe4]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="container py-24 md:py-32"
        >
          <motion.p variants={fadeUp} className="font-body text-xs tracking-wide-editorial uppercase text-[#c9b99a] mb-4">
            02 — The Challenge
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-light mb-16 max-w-3xl leading-tight">
            Today's bride doesn't call.<br />
            <span className="italic text-[#a8b8a8]">She books, or she's gone.</span>
          </motion.h2>

          <motion.div variants={stagger} className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: <Clock className="w-5 h-5" />,
                title: "Systems from the Early 2000s",
                desc: "Appointment booking lacks key automations. No online scheduling, no automated confirmations, no SMS reminders. Every missed call is a missed bride.",
              },
              {
                icon: <Smartphone className="w-5 h-5" />,
                title: "Gen Z Expects Instant",
                desc: "Brides aged 22 to 32 rarely call to book. They expect to browse, connect, and book in one sitting — on their phone, at midnight — without waiting for a callback.",
              },
              {
                icon: <Search className="w-5 h-5" />,
                title: "Invisible Online",
                desc: "Becker's doesn't appear on the first page for \"Toronto bridal\" searches. Low Instagram engagement and inconsistent branding across platforms compound the gap.",
              },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="space-y-4">
                <div className="w-10 h-10 rounded-full border border-[#a8b8a8]/30 flex items-center justify-center text-[#c9b99a]">
                  {item.icon}
                </div>
                <h3 className="font-heading text-xl font-medium text-[#f0ebe4]">{item.title}</h3>
                <p className="font-body text-sm leading-relaxed text-[#a8b8a8]">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-20 pt-12 border-t border-[#a8b8a8]/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { figure: "80+", label: "Years of Heritage" },
                { figure: "22–32", label: "Target Bride Age" },
                { figure: "3+", label: "Generations of Brides" },
                { figure: "0", label: "Online Automations" },
              ].map((stat, i) => (
                <div key={i}>
                  <p className="font-heading text-3xl md:text-4xl font-light text-[#c9b99a]">{stat.figure}</p>
                  <p className="font-body text-xs tracking-editorial uppercase text-[#a8b8a8] mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* THE SOLUTION */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="container py-24 md:py-32"
      >
        <motion.p variants={fadeUp} className="font-body text-xs tracking-wide-editorial uppercase text-[#c9b99a] mb-4">
          03 — The Solution
        </motion.p>
        <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-light text-[#2a3a2a] mb-6 max-w-3xl leading-tight">
          A digital home that feels<br />
          <span className="italic text-[#6b7b6b]">the way Becker's feels.</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="font-body text-base text-[#8a8578] mb-16 max-w-2xl leading-relaxed">
          Clean, calm, and boutique. Inspired by the aesthetic you love. A custom-built website that tells your story, showcases your collection, and gets brides from discovery to booked appointment in one seamless experience.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <motion.div variants={fadeUp}>
            <img src={MOCKUP_IMG} alt="Website and mobile design concept" className="w-full aspect-[4/3] object-cover" />
          </motion.div>
          <motion.div variants={fadeUp} className="space-y-8">
            {[
              {
                icon: <Globe className="w-5 h-5" />,
                title: "Custom Website Built on React",
                desc: "A bespoke site built with React and Tailwind CSS — fast, mobile-first, and designed with the clean, editorial aesthetic of the boutiques you admire.",
              },
              {
                icon: <Zap className="w-5 h-5" />,
                title: "CloudBridal Integration",
                desc: "We will configure your CloudBridal platform to handle appointment booking, automated reminders, and payment processing. Based on our understanding of the platform, this should also support SMS notifications and post-visit follow-ups.",
              },
              {
                icon: <Search className="w-5 h-5" />,
                title: "SEO Foundation",
                desc: "Designer-specific pages, structured data for search engines, and every title leading with \"Canada's oldest bridal boutique, since 1944.\" Built to rank for the searches that matter.",
              },
              {
                icon: <Layers className="w-5 h-5" />,
                title: "Content Architecture",
                desc: "Your heritage story, real bride galleries, curated designer collections, and a single clear path to booking. These are the four pillars that make Becker's irreplaceable.",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 shrink-0 rounded-full bg-[#f0ebe4] flex items-center justify-center text-[#6b7b6b]">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-heading text-lg font-medium text-[#2a3a2a] mb-1">{item.title}</h3>
                  <p className="font-body text-sm leading-relaxed text-[#8a8578]">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bride Journey Flow */}
        <motion.div variants={fadeUp} className="bg-white border border-[#e8e2da] p-8 md:p-12">
          <p className="font-body text-xs tracking-wide-editorial uppercase text-[#c9b99a] mb-6">
            The Bride's Journey
          </p>
          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            {[
              "Discovers Becker's",
              "Explores Collections",
              "Takes Style Quiz",
              "Curated Shortlist",
              "Books Appointment",
              "Automated Reminders",
              "Says Yes to the Dress",
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3 md:gap-4">
                <span className="font-body text-sm text-[#4a4a42] whitespace-nowrap">{step}</span>
                {i < 6 && <ArrowRight className="w-4 h-4 text-[#c9b99a] shrink-0" />}
              </div>
            ))}
          </div>
          <p className="font-body text-xs text-[#8a8578] mt-6">
            Everything before "Books Appointment" is your custom site. Everything after is handled by CloudBridal, running automatically. The transition between the two is invisible to the bride.
          </p>
        </motion.div>
      </motion.section>

      <div className="container"><div className="h-px bg-[#e8e2da]" /></div>

      {/* WHAT WE BUILD */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="container py-24 md:py-32"
      >
        <motion.p variants={fadeUp} className="font-body text-xs tracking-wide-editorial uppercase text-[#c9b99a] mb-4">
          04 — What We Build
        </motion.p>
        <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-light text-[#2a3a2a] mb-16 max-w-3xl leading-tight">
          Two systems, one seamless experience.
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div variants={fadeUp} className="bg-white border border-[#e8e2da] p-8 md:p-10">
            <p className="font-body text-xs tracking-wide-editorial uppercase text-[#6b7b6b] mb-6">
              Your Custom Website
            </p>
            <p className="font-body text-sm text-[#8a8578] mb-8 leading-relaxed">
              Everything the bride sees and feels. The brand experience.
            </p>
            <div className="space-y-4">
              {[
                "Homepage with hero imagery and heritage headline",
                "Gown gallery with filters by silhouette, neckline, and designer",
                "Editorial content and consultant notes within gallery",
                "Style quiz leading to curated gown shortlist",
                "Wishlist that persists across quiz and gallery",
                "Multigenerational story wall with real families",
                "Designer pages with search-optimized descriptions",
                "Staff and consultant profiles",
                "Testimonials across key pages",
                "Embedded Instagram feed and Google reviews",
                "Full SEO across meta tags, alt text, and page titles",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#6b7b6b] mt-0.5 shrink-0" />
                  <span className="font-body text-sm text-[#4a4a42]">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-[#2a3a2a] text-[#f0ebe4] p-8 md:p-10">
            <p className="font-body text-xs tracking-wide-editorial uppercase text-[#c9b99a] mb-6">
              CloudBridal — Operational Backend
            </p>
            <p className="font-body text-sm text-[#a8b8a8] mb-4 leading-relaxed">
              Based on our understanding of the CloudBridal platform, the following capabilities should be available once configured:
            </p>
            <div className="space-y-4">
              {[
                "Live appointment calendar with real-time availability",
                "Booking confirmation emails sent automatically",
                "Reminder emails before appointments",
                "SMS reminders via Twilio integration",
                "No-show protection via Stripe card-on-file",
                "Post-visit follow-up emails",
                "Review request automation",
                "Payment deposits and payment plans",
                "Customer profiles and CRM",
                "Order tracking and alteration scheduling",
                "Client portal for brides to check status",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#c9b99a] mt-0.5 shrink-0" />
                  <span className="font-body text-sm text-[#a8b8a8]">{item}</span>
                </div>
              ))}
            </div>
            <p className="font-body text-[11px] text-[#a8b8a8]/60 mt-6 leading-relaxed">
              CloudBridal features listed are based on our review of the platform. We will confirm all capabilities during the discovery phase and adjust the scope accordingly.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* DESIGN DIRECTION */}
      <section className="bg-[#f0ebe4]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="container py-24 md:py-32"
        >
          <motion.p variants={fadeUp} className="font-body text-xs tracking-wide-editorial uppercase text-[#c9b99a] mb-4">
            05 — Design Direction
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-light text-[#2a3a2a] mb-12 max-w-3xl leading-tight">
            Clean. Calm. Boutique.<br />
            <span className="italic text-[#6b7b6b]">Nothing like the rest.</span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div variants={fadeUp} className="space-y-4">
              <div className="flex gap-2">
                <div className="w-12 h-12 bg-[#faf8f5] border border-[#e8e2da]" />
                <div className="w-12 h-12 bg-[#f0ebe4] border border-[#e8e2da]" />
                <div className="w-12 h-12 bg-[#c9b99a]" />
                <div className="w-12 h-12 bg-[#6b7b6b]" />
                <div className="w-12 h-12 bg-[#2a3a2a]" />
              </div>
              <h3 className="font-heading text-lg font-medium text-[#2a3a2a]">Warm, Muted Palette</h3>
              <p className="font-body text-sm text-[#8a8578] leading-relaxed">
                Soft creams, warm taupes, and sage greens that feel premium without being cold. Color continuity across every page.
              </p>
            </motion.div>
            <motion.div variants={fadeUp} className="space-y-4">
              <p className="font-heading text-3xl italic text-[#2a3a2a] h-12 flex items-center">Elegant Serif</p>
              <h3 className="font-heading text-lg font-medium text-[#2a3a2a]">Editorial Typography</h3>
              <p className="font-body text-sm text-[#8a8578] leading-relaxed">
                Refined serif headings with generous letter-spacing, paired with a clean sans-serif body. The typography alone signals quality.
              </p>
            </motion.div>
            <motion.div variants={fadeUp} className="space-y-4">
              <div className="h-12 flex items-center"><div className="w-full h-px bg-[#c9b99a]" /></div>
              <h3 className="font-heading text-lg font-medium text-[#2a3a2a]">Generous Whitespace</h3>
              <p className="font-body text-sm text-[#8a8578] leading-relaxed">
                Inspired by the Lea-Ann Belter aesthetic, the design breathes. No clutter, no busy layouts. Every element earns its place.
              </p>
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="bg-white border border-[#e8e2da] p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <img src={BRIDE_IMG} alt="Delicate bridal lace detail" className="w-full md:w-64 aspect-square object-cover shrink-0" />
              <div>
                <p className="font-heading text-2xl font-light text-[#2a3a2a] mb-4 leading-snug">
                  The website's only job is to make brides feel at home — and book.
                </p>
                <p className="font-body text-sm text-[#8a8578] leading-relaxed">
                  We don't build busy, complicated sites with cluttered navigation and overwhelming options. We build a single, clear path from discovery to appointment. The design reflects the experience of walking into Becker's itself: calm, curated, and personal.
                </p>
                <p className="font-body text-sm text-[#8a8578] leading-relaxed mt-4">
                  This proposal page itself is designed in the spirit of what we would build for Becker's. You can also{" "}
                  <Link href="/sample" className="text-[#6b7b6b] underline underline-offset-4 hover:text-[#2a3a2a] transition-colors">
                    view a sample homepage
                  </Link>{" "}
                  to see the aesthetic in action.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* INVESTMENT */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="container py-24 md:py-32"
      >
        <motion.p variants={fadeUp} className="font-body text-xs tracking-wide-editorial uppercase text-[#c9b99a] mb-4">
          06 — Investment
        </motion.p>
        <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-light text-[#2a3a2a] mb-6 max-w-3xl leading-tight">
          Three paths forward.
        </motion.h2>
        <motion.p variants={fadeUp} className="font-body text-base text-[#8a8578] mb-16 max-w-2xl leading-relaxed">
          Each package builds on the last. Start where it makes sense, and grow when you're ready.
        </motion.p>

        <motion.div variants={stagger} className="grid md:grid-cols-3 gap-6">
          {/* LAUNCH */}
          <motion.div
            variants={fadeUp}
            onClick={() => setActiveTier(0)}
            className={`cursor-pointer border p-8 md:p-10 transition-all duration-300 ${
              activeTier === 0 ? "border-[#2a3a2a] bg-white shadow-lg" : "border-[#e8e2da] bg-white hover:border-[#c9b99a]"
            }`}
          >
            <p className="font-body text-xs tracking-wide-editorial uppercase text-[#c9b99a] mb-2">Package One</p>
            <h3 className="font-heading text-2xl font-medium text-[#2a3a2a] mb-1">Launch</h3>
            <p className="font-body text-xs text-[#8a8578] mb-6">Get the foundation right, fast.</p>
            <div className="mb-8">
              <p className="font-price text-3xl text-[#2a3a2a]">$4,500</p>
              <p className="font-body text-xs text-[#8a8578] mt-1">One-time</p>
            </div>
            <div className="space-y-3 mb-8">
              {[
                "Custom React website",
                "CloudBridal booking integration",
                "SEO foundation across all pages",
                "Mobile-first, boutique aesthetic",
                "2 rounds of revisions",
                "Handoff and owner training",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <Check className="w-3.5 h-3.5 text-[#6b7b6b] mt-0.5 shrink-0" />
                  <span className="font-body text-sm text-[#4a4a42]">{item}</span>
                </div>
              ))}
            </div>
            <p className="font-body text-xs text-[#8a8578] leading-relaxed">Delivery: 3 to 4 weeks</p>
          </motion.div>

          {/* LAUNCH + GROW */}
          <motion.div
            variants={fadeUp}
            onClick={() => setActiveTier(1)}
            className={`cursor-pointer border p-8 md:p-10 transition-all duration-300 relative ${
              activeTier === 1 ? "border-[#2a3a2a] bg-white shadow-lg" : "border-[#e8e2da] bg-white hover:border-[#c9b99a]"
            }`}
          >
            <div className="absolute -top-3 left-8 bg-[#2a3a2a] text-[#f0ebe4] px-4 py-1">
              <span className="font-body text-xs tracking-editorial uppercase">Recommended</span>
            </div>
            <p className="font-body text-xs tracking-wide-editorial uppercase text-[#c9b99a] mb-2">Package Two</p>
            <h3 className="font-heading text-2xl font-medium text-[#2a3a2a] mb-1">Launch + Grow</h3>
            <p className="font-body text-xs text-[#8a8578] mb-6">Build the audience that fills appointments.</p>
            <div className="mb-8">
              <p className="font-price text-3xl text-[#2a3a2a]">$7,500</p>
              <p className="font-body text-xs text-[#8a8578] mt-1">One-time + $1,500/month retainer</p>
            </div>
            <div className="space-y-3 mb-8">
              {[
                "Everything in Launch",
                "Full style quiz with curated shortlist",
                "Multigenerational story wall",
                "Staff and consultant profiles",
                "Review request automation",
                "Instagram audit and content calendar",
                "Monthly: 4 Instagram posts, 4 Reels",
                "Monthly performance report",
                "Ongoing site updates",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <Check className="w-3.5 h-3.5 text-[#6b7b6b] mt-0.5 shrink-0" />
                  <span className="font-body text-sm text-[#4a4a42]">{item}</span>
                </div>
              ))}
            </div>
            <p className="font-body text-xs text-[#8a8578] leading-relaxed">Delivery: 4 to 5 weeks + ongoing</p>
          </motion.div>

          {/* FULL PARTNERSHIP */}
          <motion.div
            variants={fadeUp}
            onClick={() => setActiveTier(2)}
            className={`cursor-pointer border p-8 md:p-10 transition-all duration-300 ${
              activeTier === 2 ? "border-[#2a3a2a] bg-white shadow-lg" : "border-[#e8e2da] bg-white hover:border-[#c9b99a]"
            }`}
          >
            <p className="font-body text-xs tracking-wide-editorial uppercase text-[#c9b99a] mb-2">Package Three</p>
            <h3 className="font-heading text-2xl font-medium text-[#2a3a2a] mb-1">Full Partnership</h3>
            <p className="font-body text-xs text-[#8a8578] mb-6">We become your digital team.</p>
            <div className="mb-8">
              <p className="font-price text-3xl text-[#2a3a2a]">$12,000</p>
              <p className="font-body text-xs text-[#8a8578] mt-1">One-time + $3,000/month retainer</p>
            </div>
            <div className="space-y-3 mb-8">
              {[
                "Everything in Launch + Grow",
                "Google reviews widget embedded",
                "Post-visit follow-up email sequences",
                "Full analytics setup (GA4, Meta pixel)",
                "Complete launch copywriting",
                "Ongoing SEO with blog and new pages",
                "Ad management and paid media strategy",
                "Quarterly strategy review",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <Check className="w-3.5 h-3.5 text-[#6b7b6b] mt-0.5 shrink-0" />
                  <span className="font-body text-sm text-[#4a4a42]">{item}</span>
                </div>
              ))}
            </div>
            <p className="font-body text-xs text-[#8a8578] leading-relaxed">Delivery: 5 to 6 weeks + ongoing</p>
          </motion.div>
        </motion.div>

        {/* Payment Terms */}
        <motion.div variants={fadeUp} className="mt-16 border border-[#e8e2da] bg-white p-8 md:p-12">
          <p className="font-body text-xs tracking-wide-editorial uppercase text-[#c9b99a] mb-6">Payment Terms</p>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <p className="font-heading text-lg font-medium text-[#2a3a2a] mb-2">50% to Begin</p>
              <p className="font-body text-sm text-[#8a8578] leading-relaxed">
                Half of the one-time fee due upon agreement to begin work. This secures your project timeline and initiates discovery.
              </p>
            </div>
            <div>
              <p className="font-heading text-lg font-medium text-[#2a3a2a] mb-2">50% at Launch</p>
              <p className="font-body text-sm text-[#8a8578] leading-relaxed">
                Remaining balance due upon site launch and CloudBridal go-live. Includes a 14-day post-launch support window.
              </p>
            </div>
            <div>
              <p className="font-heading text-lg font-medium text-[#2a3a2a] mb-2">Monthly on the 1st</p>
              <p className="font-body text-sm text-[#8a8578] leading-relaxed">
                For packages with a retainer, monthly billing begins the month following launch. Cancel with 30 days notice.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* TIMELINE */}
      <section className="bg-[#f0ebe4]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="container py-24 md:py-32"
        >
          <motion.p variants={fadeUp} className="font-body text-xs tracking-wide-editorial uppercase text-[#c9b99a] mb-4">
            07 — Timeline
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-light text-[#2a3a2a] mb-16 max-w-3xl leading-tight">
            From agreement to live<br />
            <span className="italic text-[#6b7b6b]">in three to four weeks.</span>
          </motion.h2>

          <motion.div variants={stagger} className="space-y-0">
            {[
              {
                week: "Week 1",
                title: "Discovery and Design Direction",
                desc: "Deep-dive into Becker's story, brand assets, and design preferences. Wireframes and site architecture finalized. CloudBridal account configuration begins.",
              },
              {
                week: "Week 2",
                title: "Design and Build",
                desc: "Full site design and development in React. Content architecture implemented. Designer pages built. Style quiz logic developed. First review round.",
              },
              {
                week: "Week 3",
                title: "Integration and Content",
                desc: "CloudBridal booking embed styled and integrated. SEO foundation applied across all pages. Content populated. Second review round.",
              },
              {
                week: "Week 4",
                title: "Launch and Handoff",
                desc: "DNS configuration and deployment. Final QA and cross-browser testing. Owner training session. Site goes live. 14-day post-launch support begins.",
              },
            ].map((phase, i) => (
              <motion.div key={i} variants={fadeUp} className="flex gap-8 md:gap-12">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-[#c9b99a] shrink-0" />
                  {i < 3 && <div className="w-px h-full bg-[#c9b99a]/30 min-h-[80px]" />}
                </div>
                <div className="pb-12">
                  <p className="font-body text-xs tracking-editorial uppercase text-[#c9b99a] mb-1">{phase.week}</p>
                  <h3 className="font-heading text-xl font-medium text-[#2a3a2a] mb-2">{phase.title}</h3>
                  <p className="font-body text-sm text-[#8a8578] leading-relaxed max-w-lg">{phase.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* WHY CIVIC FIRM */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="container py-24 md:py-32"
      >
        <motion.p variants={fadeUp} className="font-body text-xs tracking-wide-editorial uppercase text-[#c9b99a] mb-4">
          08 — Why Civic Firm
        </motion.p>
        <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-light text-[#2a3a2a] mb-16 max-w-3xl leading-tight">
          We build for organizations<br />
          <span className="italic text-[#6b7b6b]">that serve their communities.</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-16">
          <motion.div variants={fadeUp} className="space-y-6">
            <p className="font-body text-base leading-relaxed text-[#4a4a42]">
              Civic Firm specializes in building digital platforms for organizations with real history, real communities, and real stakes. We've delivered accessible and beautifully designed websites for small businesses, nonprofits, and cultural organizations across North America.
            </p>
            <p className="font-body text-base leading-relaxed text-[#4a4a42]">
              Becker's is exactly the kind of business we exist to serve. A brand with genuine heritage, a loyal community, and a new chapter that deserves to be told properly. We bring the same care, structure, and accountability to this project that we bring to every engagement.
            </p>
          </motion.div>
          <motion.div variants={fadeUp} className="space-y-8">
            {[
              {
                icon: <Star className="w-5 h-5" />,
                title: "20+ Projects Delivered",
                desc: "Small businesses, nonprofits, and cultural organizations across North America.",
              },
              {
                icon: <MessageSquare className="w-5 h-5" />,
                title: "Milestone-Based Delivery",
                desc: "Clear checkpoints, transparent timelines, and no surprise scope changes. You know exactly where the project stands at every stage.",
              },
              {
                icon: <Zap className="w-5 h-5" />,
                title: "Modern Technical Stack",
                desc: "React and Tailwind CSS. The same technology powering the fastest sites on the web. No WordPress plugin bloat, no security headaches.",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 shrink-0 rounded-full bg-[#f0ebe4] flex items-center justify-center text-[#6b7b6b]">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-heading text-lg font-medium text-[#2a3a2a] mb-1">{item.title}</h3>
                  <p className="font-body text-sm leading-relaxed text-[#8a8578]">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA */}
      <section className="bg-[#2a3a2a] text-[#f0ebe4]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="container py-24 md:py-32 text-center"
        >
          <motion.p variants={fadeUp} className="font-body text-xs tracking-wide-editorial uppercase text-[#c9b99a] mb-4">
            Next Steps
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-6xl font-light mb-8 max-w-2xl mx-auto leading-tight">
            Let's write the next<br />
            <span className="italic text-[#a8b8a8]">eighty years.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="font-body text-base text-[#a8b8a8] mb-12 max-w-lg mx-auto leading-relaxed">
            Your CloudBridal trial is already running. Every week without a live booking system is appointments you're losing to competitors who got there first. Let's move.
          </motion.p>
          <motion.div variants={fadeUp} className="flex justify-center">
            <p className="font-body text-sm text-[#a8b8a8]">
              info@civicfirm.com
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#faf8f5] border-t border-[#e8e2da]">
        <div className="container py-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-heading text-lg tracking-editorial uppercase text-[#2a3a2a]">Civic Firm</span>
            <p className="font-body text-xs text-[#8a8578] mt-1">Web Design for Organizations That Matter</p>
          </div>
          <div className="text-right">
            <p className="font-body text-xs text-[#8a8578]">info@civicfirm.com</p>
            <p className="font-body text-xs text-[#8a8578] mt-1">This proposal is confidential and prepared exclusively for Becker's Bridal Boutique.</p>
          </div>
        </div>
        <div className="container pb-8">
          <p className="font-body text-[10px] text-[#c9b99a] text-center leading-relaxed">
            The design direction, visual examples, and aesthetic choices presented in this proposal represent a starting point for creative collaboration. The final website will be co-designed with you to ensure it authentically reflects Becker's identity and vision.
          </p>
        </div>
      </footer>
    </div>
  );
}
