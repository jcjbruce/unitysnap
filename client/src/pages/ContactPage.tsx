/*
 * DESIGN: Contact Page — Standalone contact form for CivicFirm
 * Matches the dark green aesthetic of the rest of the site
 */
import { motion } from "framer-motion";
import { useState } from "react";
import { Send, CheckCircle, Clock, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const inquiryTypes = [
  "Website Design & Development",
  "Digital Strategy",
  "Accessibility & Compliance",
  "Small Business Project",
  "Partnership Inquiry",
  "General Inquiry",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    inquiryType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "f642c143-997e-4d9e-9be2-7b9917152700",
          subject: `[Civic Firm] ${formData.inquiryType || "General Inquiry"} from ${formData.name}`,
          name: formData.name,
          email: formData.email,
          organization: formData.organization || "N/A",
          "inquiry type": formData.inquiryType || "N/A",
          message: formData.message,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        toast.success("Message sent! We'll be in touch within 24–48 hours.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[oklch(0.97_0.01_155)]">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(/images/mission-community.jpg)` }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              to right,
              oklch(0.10 0.04 155 / 0.92) 0%,
              oklch(0.10 0.04 155 / 0.85) 35%,
              oklch(0.10 0.04 155 / 0.50) 65%,
              oklch(0.10 0.04 155 / 0.20) 100%
            )`,
          }}
        />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-8 h-0.5 bg-[oklch(0.72_0.12_75)]" />
            <span className="text-primary text-xs font-semibold uppercase tracking-[0.2em]">
              Contact
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-[var(--font-display)] font-bold text-white leading-tight tracking-tight mb-6 max-w-3xl"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            Let's build something{" "}
            <span className="text-primary">that matters.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white/80 text-base sm:text-lg leading-relaxed max-w-2xl"
          >
            Whether you need an accessible website, a digital strategy partner, or a team that understands compliance — we're ready to help.
          </motion.p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Sidebar Info */}
            <div className="lg:col-span-4">
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Send className="w-4 h-4 text-[oklch(0.45_0.12_155)]" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-[oklch(0.45_0.12_155)]">Get In Touch</span>
                  </div>
                  <p className="text-sm text-[oklch(0.40_0.02_155)] leading-relaxed">
                    Fill out the form and we'll get back to you within 24–48 hours. We're happy to discuss your project, answer questions, or provide a quote.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-[oklch(0.45_0.12_155)]" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-[oklch(0.45_0.12_155)]">Response Time</span>
                  </div>
                  <p className="text-sm text-[oklch(0.40_0.02_155)]">Within 24–48 hours</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-[oklch(0.45_0.12_155)]" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-[oklch(0.45_0.12_155)]">Location</span>
                  </div>
                  <p className="text-sm text-[oklch(0.40_0.02_155)]">Remote-First, North America</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-8">
              {submitted ? (
                <div className="bg-[oklch(0.45_0.12_155/0.08)] border border-[oklch(0.45_0.12_155/0.2)] rounded-lg p-10 text-center">
                  <CheckCircle className="w-12 h-12 text-[oklch(0.45_0.12_155)] mx-auto mb-4" />
                  <h3 className="font-[var(--font-display)] text-2xl font-bold text-[oklch(0.15_0.04_155)] mb-3">
                    Message received.
                  </h3>
                  <p className="text-[oklch(0.40_0.02_155)] mb-6">
                    Thank you for reaching out. We'll get back to you within 24–48 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", organization: "", inquiryType: "", message: "" }); }}
                    className="text-sm text-[oklch(0.45_0.12_155)] underline cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[oklch(0.40_0.02_155)] mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full border border-[oklch(0.88_0.02_155)] rounded-md px-4 py-3 text-sm bg-white text-[oklch(0.15_0.04_155)] placeholder:text-[oklch(0.60_0.01_155)] focus:outline-none focus:border-[oklch(0.45_0.12_155)] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[oklch(0.40_0.02_155)] mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full border border-[oklch(0.88_0.02_155)] rounded-md px-4 py-3 text-sm bg-white text-[oklch(0.15_0.04_155)] placeholder:text-[oklch(0.60_0.01_155)] focus:outline-none focus:border-[oklch(0.45_0.12_155)] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[oklch(0.40_0.02_155)] mb-2">
                        Organization
                      </label>
                      <input
                        type="text"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="Your organization (optional)"
                        className="w-full border border-[oklch(0.88_0.02_155)] rounded-md px-4 py-3 text-sm bg-white text-[oklch(0.15_0.04_155)] placeholder:text-[oklch(0.60_0.01_155)] focus:outline-none focus:border-[oklch(0.45_0.12_155)] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[oklch(0.40_0.02_155)] mb-2">
                        Inquiry Type
                      </label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                        className="w-full border border-[oklch(0.88_0.02_155)] rounded-md px-4 py-3 text-sm bg-white text-[oklch(0.15_0.04_155)] focus:outline-none focus:border-[oklch(0.45_0.12_155)] transition-colors appearance-none"
                      >
                        <option value="">Select inquiry type</option>
                        {inquiryTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[oklch(0.40_0.02_155)] mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your project..."
                      rows={6}
                      className="w-full border border-[oklch(0.88_0.02_155)] rounded-md px-4 py-3 text-sm bg-white text-[oklch(0.15_0.04_155)] placeholder:text-[oklch(0.60_0.01_155)] focus:outline-none focus:border-[oklch(0.45_0.12_155)] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex items-center gap-2 bg-[oklch(0.45_0.12_155)] text-white font-semibold text-sm px-8 py-4 rounded-md hover:bg-[oklch(0.40_0.14_150)] transition-all shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {sending ? "Sending..." : "Send Message"} <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
