/**
 * Client Intake Form — Becker's Bridal Boutique
 * Submits to Vercel serverless function → Supabase + Resend.
 */

import { motion } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  Check,
  Plus,
  Trash2,
  Upload,
  X,
  Loader2,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────
interface StoreHours {
  day: string;
  open: string;
  close: string;
  closed: boolean;
}

interface Designer {
  name: string;
}

// ─── Constants ───────────────────────────────────────────────────────
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const FONT_PAIRINGS = [
  { heading: "'Cormorant Garamond', serif", body: "'Inter', sans-serif", label: "Cormorant Garamond + Inter" },
  { heading: "'Playfair Display', serif", body: "'DM Sans', sans-serif", label: "Playfair Display + DM Sans" },
  { heading: "'EB Garamond', serif", body: "'Jost', sans-serif", label: "EB Garamond + Jost" },
  { heading: "'Libre Baskerville', serif", body: "'Lato', sans-serif", label: "Libre Baskerville + Lato" },
];

const COLOR_MOODS = [
  { label: "Warm Ivory & Taupe", colors: ["#F5F0E8", "#D4C5A9", "#B8A88A", "#8B7D6B"] },
  { label: "Soft Blush & Champagne", colors: ["#F9F0ED", "#E8D5CC", "#D4A99A", "#C4918A"] },
  { label: "Cool Sage & Linen", colors: ["#EEF2ED", "#C5D1C0", "#9BAF94", "#6B8B6B"] },
  { label: "Deep Mauve & Cream", colors: ["#F2ECF0", "#C9B8C4", "#A08B98", "#7A6570"] },
  { label: "Let's develop this together", colors: ["#E8E8E8", "#CCCCCC", "#AAAAAA", "#888888"] },
];

// ─── Animation ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0, 0, 0.2, 1] as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

// ─── File Upload Component (local file names tracked for submission) ──
function FileUpload({
  onChange,
  dragDrop,
  accept,
}: {
  onChange: (urls: string[]) => void;
  dragDrop?: boolean;
  accept?: string;
}) {
  const [files, setFiles] = useState<{ name: string; url: string }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = useCallback(async (fileList: FileList) => {
    setUploading(true);
    const newFiles: { name: string; url: string }[] = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      try {
        // Convert file to base64
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve((reader.result as string).split(",")[1]);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        // Upload to server API → Supabase Storage
        const res = await fetch("/api/intake-upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileName: file.name,
            fileType: file.type,
            fileData: base64,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          newFiles.push({ name: file.name, url: data.url });
        } else {
          console.error(`Upload failed for ${file.name}`);
          newFiles.push({ name: `${file.name} (upload failed)`, url: "" });
        }
      } catch (err) {
        console.error(`Upload error for ${file.name}:`, err);
        newFiles.push({ name: `${file.name} (upload failed)`, url: "" });
      }
    }

    const updated = [...files, ...newFiles];
    setFiles(updated);
    onChange(updated.map((f) => f.url).filter(Boolean));
    setUploading(false);
  }, [files, onChange]);

  const removeFile = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    onChange(updated.map((f) => f.url));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  if (dragDrop) {
    return (
      <div className="space-y-3">
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={accept || "image/*,.pdf,.doc,.docx"}
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`flex flex-col items-center justify-center gap-3 px-6 py-10 border-2 border-dashed cursor-pointer transition-all ${
            dragOver
              ? "border-[#c9b99a] bg-[#c9b99a]/5"
              : "border-[#a8b8a8]/30 hover:border-[#a8b8a8]/60 hover:bg-[#f5f2ed]/30"
          }`}
        >
          {uploading ? (
            <Loader2 className="w-6 h-6 text-[#a8b8a8] animate-spin" />
          ) : (
            <Upload className="w-6 h-6 text-[#a8b8a8]" />
          )}
          <p className="font-body text-sm text-[#6b7b6b] text-center">
            {uploading ? "Uploading..." : "Drag and drop an image here, or click to browse"}
          </p>
          <p className="font-body text-xs text-[#a8b8a8]">
            Accepts images and PDFs
          </p>
        </div>

        {files.length > 0 && (
          <div className="space-y-2">
            {files.map((file, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-4 py-2 bg-[#f5f2ed]/50 text-sm font-body text-[#4a5a4a]"
              >
                <Check className="w-3.5 h-3.5 text-[#6b8b6b] shrink-0" />
                <span className="truncate flex-1">{file.name}</span>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                  className="text-[#a8b8a8] hover:text-[#6b7b6b] transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={accept || "image/*,.pdf,.doc,.docx"}
        className="hidden"
        onChange={(e) => e.target.files && handleFiles(e.target.files)}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="flex items-center gap-2 px-5 py-3 border border-dashed border-[#a8b8a8]/40 text-[#6b7b6b] text-sm font-body hover:border-[#a8b8a8]/70 hover:bg-[#f5f2ed]/50 transition-all"
      >
        {uploading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Upload className="w-4 h-4" />
        )}
        {uploading ? "Uploading..." : "Choose files"}
      </button>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-4 py-2 bg-[#f5f2ed]/50 text-sm font-body text-[#4a5a4a]"
            >
              <Check className="w-3.5 h-3.5 text-[#6b8b6b] shrink-0" />
              <span className="truncate flex-1">{file.name}</span>
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="text-[#a8b8a8] hover:text-[#6b7b6b] transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Section Wrapper ─────────────────────────────────────────────────
function Section({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="py-16 border-b border-[#a8b8a8]/15"
    >
      <div className="mb-10">
        <p className="font-body text-xs tracking-editorial uppercase text-[#a8b8a8] mb-3">
          {String(number).padStart(2, "0")}
        </p>
        <h2 className="font-heading text-3xl md:text-4xl font-light text-[#2a3a2a] leading-tight">
          {title}
        </h2>
      </div>
      <div className="space-y-8">{children}</div>
    </motion.section>
  );
}

// ─── Form Field Wrapper ──────────────────────────────────────────────
function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="block font-body text-sm font-normal text-[#4a5a4a]">
        {label}
      </label>
      {hint && (
        <p className="font-body text-xs text-[#a8b8a8]">{hint}</p>
      )}
      {children}
    </div>
  );
}

// ─── Input Styles ────────────────────────────────────────────────────
const inputClass =
  "w-full px-4 py-3 bg-white border border-[#a8b8a8]/20 font-body text-sm text-[#2a3a2a] placeholder:text-[#a8b8a8]/60 focus:outline-none focus:border-[#a8b8a8]/50 transition-colors";

const textareaClass =
  "w-full px-4 py-3 bg-white border border-[#a8b8a8]/20 font-body text-sm text-[#2a3a2a] placeholder:text-[#a8b8a8]/60 focus:outline-none focus:border-[#a8b8a8]/50 transition-colors resize-y min-h-[120px]";

// ─── Radio / Select Components ───────────────────────────────────────
function RadioGroup({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((opt) => (
        <label
          key={opt}
          className={`px-5 py-2.5 border font-body text-sm cursor-pointer transition-all ${
            value === opt
              ? "border-[#c9b99a] bg-[#c9b99a]/10 text-[#2a3a2a]"
              : "border-[#a8b8a8]/20 text-[#6b7b6b] hover:border-[#a8b8a8]/40"
          }`}
        >
          <input
            type="radio"
            name={name}
            value={opt}
            checked={value === opt}
            onChange={() => onChange(opt)}
            className="sr-only"
          />
          {opt}
        </label>
      ))}
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═════════════════════════════════════════════════════════════════════
export default function Intake() {
  // ─── Form State ──────────────────────────────────────────────────
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Section 1: Brand & Identity
  const [businessName, setBusinessName] = useState("Becker's Bridal Boutique");
  const [tagline, setTagline] = useState("");
  const [boutiqueFeeling, setBoutiqueFeeling] = useState("");
  const [brandWord1, setBrandWord1] = useState("");
  const [brandWord2, setBrandWord2] = useState("");
  const [brandWord3, setBrandWord3] = useState("");

  // Section 2: Typography
  const [hasExistingFonts, setHasExistingFonts] = useState("");
  const [existingFontDesc, setExistingFontDesc] = useState("");
  const [typographyFiles, setTypographyFiles] = useState<string[]>([]);
  const [preferredPairing, setPreferredPairing] = useState("");
  const [fontsToAvoid, setFontsToAvoid] = useState("");

  // Section 3: Color Palette
  const [hasColorPalette, setHasColorPalette] = useState("");
  const [colorReference, setColorReference] = useState("");
  const [colorReferenceFiles, setColorReferenceFiles] = useState<string[]>([]);
  const [colorMood, setColorMood] = useState("");
  const [colorsToAvoid, setColorsToAvoid] = useState("");

  // Section 4: Photography
  const [hasInteriorPhotos, setHasInteriorPhotos] = useState("");
  const [hasWeddingPhotos, setHasWeddingPhotos] = useState("");
  const [photoFiles, setPhotoFiles] = useState<string[]>([]);
  const [photographerContacts, setPhotographerContacts] = useState("");
  const [visualInspiration, setVisualInspiration] = useState("");

  // Section 5
  const [storeHours, setStoreHours] = useState<StoreHours[]>(
    DAYS.map((day) => ({ day, open: "10:00", close: "18:00", closed: false }))
  );
  const [phone, setPhone] = useState("(416) 463-6601");
  const [email, setEmail] = useState("beckersbridal@rogers.com");
  const [contactPreference, setContactPreference] = useState("");
  const [additionalPages, setAdditionalPages] = useState("");

  // Section 6: Designers
  const [designers, setDesigners] = useState<Designer[]>([{ name: "" }]);
  const [featuredDesigners, setFeaturedDesigners] = useState("");
  const [designerLogoFiles, setDesignerLogoFiles] = useState<string[]>([]);

  // Section 7: Real Brides
  const [hasBrideStories, setHasBrideStories] = useState("");
  const [brideStoriesApproach, setBrideStoriesApproach] = useState("");

  // Section 8: Hosting
  const [hostingPreference, setHostingPreference] = useState("");

  // Section 9: Inspiration
  const [inspirationUrl1, setInspirationUrl1] = useState("https://www.");
  const [inspirationUrl2, setInspirationUrl2] = useState("https://www.");
  const [inspirationUrl3, setInspirationUrl3] = useState("https://www.");
  const [nonBridalInspiration, setNonBridalInspiration] = useState("");
  const [socialInspiration, setSocialInspiration] = useState("");
  const [socialInspirationFiles, setSocialInspirationFiles] = useState<string[]>([]);
  const [dontWant, setDontWant] = useState("");

  // Section 10: Anything Else
  const [anythingElse, setAnythingElse] = useState("");
  const [questionsForUs, setQuestionsForUs] = useState("");

  // ─── Submit via serverless API ──────────────────────────────────

  // ─── Load extra fonts for the pairing preview ────────────────────
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=DM+Sans:wght@300;400;500&family=EB+Garamond:wght@400;500;600&family=Jost:wght@300;400;500&family=Libre+Baskerville:wght@400;700&family=Lato:wght@300;400;700&family=Inter:wght@300;400;500&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  // ─── Designer Row Helpers ────────────────────────────────────────
  const addDesigner = () => setDesigners([...designers, { name: "" }]);
  const removeDesigner = (i: number) => {
    if (designers.length > 1) setDesigners(designers.filter((_, idx) => idx !== i));
  };
  const updateDesigner = (i: number, name: string) => {
    const updated = [...designers];
    updated[i] = { name };
    setDesigners(updated);
  };

  // ─── Store Hours Helpers ─────────────────────────────────────────
  const updateHours = (i: number, field: keyof StoreHours, value: string | boolean) => {
    const updated = [...storeHours];
    updated[i] = { ...updated[i], [field]: value };
    setStoreHours(updated);
  };

  // ─── Collect all file URLs ──────────────────────────────────────
  const allFileUrls = [
    ...typographyFiles,
    ...colorReferenceFiles,
    ...photoFiles,
    ...designerLogoFiles,
    ...socialInspirationFiles,
  ];

  // ─── Submit Handler ──────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const formData = {
      // Section 1
      business_name: businessName,
      tagline,
      boutique_feeling: boutiqueFeeling,
      brand_words: [brandWord1, brandWord2, brandWord3].filter(Boolean).join(", "),
      // Section 2
      has_existing_fonts: hasExistingFonts,
      existing_font_description: existingFontDesc,
      typography_files: typographyFiles.join(", "),
      preferred_font_pairing: preferredPairing,
      fonts_to_avoid: fontsToAvoid,
      // Section 3
      has_color_palette: hasColorPalette,
      color_reference: colorReference,
      color_reference_files: colorReferenceFiles.join(", "),
      color_mood: colorMood,
      colors_to_avoid: colorsToAvoid,
      // Section 4
      has_interior_photos: hasInteriorPhotos,
      has_wedding_photos: hasWeddingPhotos,
      photo_files: photoFiles.join(", "),
      photographer_contacts: photographerContacts,
      visual_inspiration: visualInspiration,
      // Section 5
      store_hours: storeHours
        .map((h) => (h.closed ? `${h.day}: Closed` : `${h.day}: ${h.open} – ${h.close}`))
        .join(" | "),
      phone,
      email,
      contact_preference: contactPreference,
      additional_pages: additionalPages,
      // Section 6
      designers: designers.map((d) => d.name).filter(Boolean).join(", "),
      featured_designers: featuredDesigners,
      designer_logo_files: designerLogoFiles.join(", "),
      // Section 7
      has_bride_stories: hasBrideStories,
      bride_stories_approach: brideStoriesApproach,
      // Section 8
      hosting_preference: hostingPreference,
      // Section 9
      inspiration_urls: [inspirationUrl1, inspirationUrl2, inspirationUrl3].filter((u) => u && u !== "https://www.").join(", "),
      non_bridal_inspiration: nonBridalInspiration,
      social_inspiration: socialInspiration,
      social_inspiration_files: socialInspirationFiles.join(", "),
      dont_want: dontWant,
      // Section 10
      anything_else: anythingElse,
      questions_for_us: questionsForUs,
    };

    try {
      const response = await fetch("/api/intake-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName,
          contactName: businessName,
          contactEmail: email,
          contactPhone: phone,
          formData,
          fileUrls: allFileUrls.length > 0 ? allFileUrls : undefined,
        }),
      });

      if (!response.ok) throw new Error("Submission failed");

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Something went wrong. Your data is safe. Please try again or email us directly at info@civicfirm.com.");
    } finally {
      setSubmitting(false);
    }
  };

  // ─── Success State ───────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-lg"
        >
          <div className="w-16 h-16 mx-auto mb-8 rounded-full bg-[#6b8b6b]/10 flex items-center justify-center">
            <Check className="w-8 h-8 text-[#6b8b6b]" />
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-light text-[#2a3a2a] mb-4">
            Thank you.
          </h1>
          <p className="font-body text-base text-[#6b7b6b] leading-relaxed mb-8">
            We've received everything. We'll review your responses and be in touch shortly to kick off discovery. In the meantime, don't hesitate to reach us at{" "}
            <a href="mailto:info@civicfirm.com" className="text-[#4a5a4a] underline underline-offset-4">
              info@civicfirm.com
            </a>.
          </p>
        </motion.div>
      </div>
    );
  }

  // ─── Main Form ───────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* ─── Sticky Header ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-[#faf8f5]/95 backdrop-blur-sm border-b border-[#a8b8a8]/10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-body text-xs tracking-editorial uppercase text-[#a8b8a8]">
            Intake Form
          </span>
          <span className="font-body text-xs tracking-editorial uppercase text-[#a8b8a8]">
            Client Intake
          </span>
        </div>
      </header>

      {/* ─── Hero / Opening ────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-6 pt-20 pb-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.p
            variants={fadeUp}
            className="font-body text-xs tracking-editorial uppercase text-[#a8b8a8] mb-6"
          >
            Civic Firm
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-[#2a3a2a] leading-[1.1] mb-6"
          >
            Welcome, Anastasia<br />
            <span className="italic text-[#a8b8a8]">and Bruno.</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="font-body text-lg text-[#6b7b6b] leading-relaxed max-w-xl mb-12"
          >
            Let's build something beautiful together.
          </motion.p>

          {/* Intro to form */}
          <motion.p
            variants={fadeUp}
            className="font-body text-base text-[#6b7b6b] leading-relaxed max-w-xl"
          >
            The form below helps us understand your brand, your preferences, and your vision. Take your time with it. Nothing is final; everything here is a starting point for our conversation.
          </motion.p>
        </motion.div>
      </div>

      {/* ─── Form ──────────────────────────────────────────────────── */}
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto px-6 pb-32">

        {/* ── Section 1: Brand & Identity ──────────────────────────── */}
        <Section number={1} title="Brand & Identity">
          <Field label="Business name">
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field label="Tagline or motto, if any">
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g. Where family traditions continue"
              className={inputClass}
            />
          </Field>

          <Field label="How would you describe the feeling of walking into your boutique?">
            <textarea
              value={boutiqueFeeling}
              onChange={(e) => setBoutiqueFeeling(e.target.value)}
              placeholder="Think about the atmosphere, the lighting, the first impression..."
              className={textareaClass}
              rows={4}
            />
          </Field>

          <Field label="Three words that describe your brand">
            <div className="grid grid-cols-3 gap-4">
              <input
                type="text"
                value={brandWord1}
                onChange={(e) => setBrandWord1(e.target.value)}
                placeholder="First word"
                className={inputClass}
              />
              <input
                type="text"
                value={brandWord2}
                onChange={(e) => setBrandWord2(e.target.value)}
                placeholder="Second word"
                className={inputClass}
              />
              <input
                type="text"
                value={brandWord3}
                onChange={(e) => setBrandWord3(e.target.value)}
                placeholder="Third word"
                className={inputClass}
              />
            </div>
          </Field>
        </Section>

        {/* ── Section 2: Typography ────────────────────────────────── */}
        <Section number={2} title="Typography">
          <Field label="Do you have existing fonts you use?">
            <RadioGroup
              name="has_existing_fonts"
              options={["Yes", "No", "Not sure"]}
              value={hasExistingFonts}
              onChange={setHasExistingFonts}
            />
          </Field>

          {hasExistingFonts === "Yes" && (
            <motion.div variants={fadeUp} initial="hidden" animate="visible">
              <Field label="Please name or describe them">
                <input
                  type="text"
                  value={existingFontDesc}
                  onChange={(e) => setExistingFontDesc(e.target.value)}
                  placeholder="e.g. We use a script font on our signage..."
                  className={inputClass}
                />
              </Field>
            </motion.div>
          )}

          <Field label="Upload any printed materials or signage showing your current typography" hint="Accepts images and PDFs">
            <FileUpload onChange={setTypographyFiles} />
          </Field>

          <Field label="Which of these serif pairings feels most like Becker's?">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FONT_PAIRINGS.map((pair) => (
                <label
                  key={pair.label}
                  className={`p-6 border cursor-pointer transition-all ${
                    preferredPairing === pair.label
                      ? "border-[#c9b99a] bg-[#c9b99a]/5"
                      : "border-[#a8b8a8]/20 hover:border-[#a8b8a8]/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="preferred_font_pairing"
                    value={pair.label}
                    checked={preferredPairing === pair.label}
                    onChange={() => setPreferredPairing(pair.label)}
                    className="sr-only"
                  />
                  <p
                    style={{ fontFamily: pair.heading }}
                    className="text-2xl text-[#2a3a2a] mb-1"
                  >
                    Becker's Bridal
                  </p>
                  <p
                    style={{ fontFamily: pair.body }}
                    className="text-sm text-[#6b7b6b] mb-3"
                  >
                    Where family traditions continue since 1944
                  </p>
                  <p className="font-body text-xs text-[#a8b8a8] tracking-wide">
                    {pair.label}
                  </p>
                </label>
              ))}
            </div>
          </Field>

          <Field label="Any fonts you want to avoid?">
            <input
              type="text"
              value={fontsToAvoid}
              onChange={(e) => setFontsToAvoid(e.target.value)}
              placeholder="e.g. Nothing too modern or blocky"
              className={inputClass}
            />
          </Field>
        </Section>

        {/* ── Section 3: Color Palette ─────────────────────────────── */}
        <Section number={3} title="Color Palette">
          <Field label="Do you have an existing color palette?">
            <RadioGroup
              name="has_color_palette"
              options={["Yes, I have one", "I have something but it's not finalized", "No, I need help choosing"]}
              value={hasColorPalette}
              onChange={setHasColorPalette}
            />
          </Field>

          <Field
            label="Upload your color palette or style inspiration"
            hint="Drop a photo, screenshot, brand guide, or mood board that shows the colors you love. Optional."
          >
            <FileUpload onChange={setColorReferenceFiles} dragDrop accept="image/*,.pdf" />
          </Field>

          <Field
            label="Or describe your colors below"
            hint="Hex codes, color names, or general descriptions all work. Optional."
          >
            <input
              type="text"
              value={colorReference}
              onChange={(e) => setColorReference(e.target.value)}
              placeholder="e.g. soft gold, warm cream, muted sage..."
              className={inputClass}
            />
          </Field>

          {hasColorPalette === "No, I need help choosing" && (
            <Field label="Which mood feels closest to what you envision?">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {COLOR_MOODS.map((mood) => (
                  <label
                    key={mood.label}
                    className={`p-5 border cursor-pointer transition-all ${
                      colorMood === mood.label
                        ? "border-[#c9b99a] bg-[#c9b99a]/5"
                        : "border-[#a8b8a8]/20 hover:border-[#a8b8a8]/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="color_mood"
                      value={mood.label}
                      checked={colorMood === mood.label}
                      onChange={() => setColorMood(mood.label)}
                      className="sr-only"
                    />
                    <div className="flex gap-1.5 mb-3">
                      {mood.colors.map((c, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full border border-[#a8b8a8]/10"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                    <p className="font-body text-sm text-[#4a5a4a]">{mood.label}</p>
                  </label>
                ))}
              </div>
            </Field>
          )}

          <Field label="Any colors to avoid?">
            <input
              type="text"
              value={colorsToAvoid}
              onChange={(e) => setColorsToAvoid(e.target.value)}
              placeholder="e.g. No bright pink or neon"
              className={inputClass}
            />
          </Field>
        </Section>

        {/* ── Section 4: Photography & Visual Assets ───────────────── */}
        <Section number={4} title="Photography & Visual Assets">
          <Field label="Do you have professional photos of the boutique interior?">
            <RadioGroup
              name="has_interior_photos"
              options={["Yes", "No", "In progress"]}
              value={hasInteriorPhotos}
              onChange={setHasInteriorPhotos}
            />
          </Field>

          <Field label="Do you have professional wedding photos you have rights to use?">
            <RadioGroup
              name="has_wedding_photos"
              options={["Yes", "No"]}
              value={hasWeddingPhotos}
              onChange={setHasWeddingPhotos}
            />
          </Field>

          <Field label="Upload any photos for us to consider" hint="JPG, PNG accepted">
            <FileUpload onChange={setPhotoFiles} />
          </Field>

          <Field label="Any photographers who've worked with your brides we should contact for image rights?">
            <textarea
              value={photographerContacts}
              onChange={(e) => setPhotographerContacts(e.target.value)}
              placeholder="Names, Instagram handles, or websites..."
              className={textareaClass}
              rows={3}
            />
          </Field>

          <Field label="Any visual references or styles you love?">
            <textarea
              value={visualInspiration}
              onChange={(e) => setVisualInspiration(e.target.value)}
              placeholder="Descriptions or references..."
              className={textareaClass}
              rows={3}
            />
          </Field>
        </Section>

        {/* ── Section 5: Website Content ───────────────────────────── */}
        <Section number={5} title="Website Content">
          <Field label="Store hours">
            <div className="space-y-3">
              {storeHours.map((h, i) => (
                <div key={h.day} className="flex items-center gap-4">
                  <span className="font-body text-sm text-[#4a5a4a] w-24 shrink-0">{h.day}</span>
                  <label className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => updateHours(i, "closed", !h.closed)}
                      className={`w-10 h-5 rounded-full transition-colors relative ${
                        h.closed ? "bg-[#a8b8a8]/30" : "bg-[#6b8b6b]"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                          h.closed ? "left-0.5" : "left-5"
                        }`}
                      />
                    </button>
                    <span className="font-body text-xs text-[#a8b8a8]">
                      {h.closed ? "Closed" : "Open"}
                    </span>
                  </label>
                  {!h.closed && (
                    <div className="flex items-center gap-2">
                      <input
                        type="time"
                        value={h.open}
                        onChange={(e) => updateHours(i, "open", e.target.value)}
                        className="px-3 py-1.5 bg-white border border-[#a8b8a8]/20 font-body text-sm text-[#2a3a2a] focus:outline-none focus:border-[#a8b8a8]/50"
                      />
                      <span className="font-body text-sm text-[#a8b8a8]">to</span>
                      <input
                        type="time"
                        value={h.close}
                        onChange={(e) => updateHours(i, "close", e.target.value)}
                        className="px-3 py-1.5 bg-white border border-[#a8b8a8]/20 font-body text-sm text-[#2a3a2a] focus:outline-none focus:border-[#a8b8a8]/50"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Field>

          <Field label="Preferred phone number for the site">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field label="Preferred contact email for the site">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field label="Contact preference displayed on site">
            <RadioGroup
              name="contact_preference"
              options={["Phone number", "Contact form", "Both"]}
              value={contactPreference}
              onChange={setContactPreference}
            />
          </Field>

          <Field label="Any additional pages or menu items to include?" hint="e.g. Alterations, Accessories, FAQs">
            <textarea
              value={additionalPages}
              onChange={(e) => setAdditionalPages(e.target.value)}
              className={textareaClass}
              rows={3}
            />
          </Field>
        </Section>

        {/* ── Section 6: Designers & Collections ───────────────────── */}
        <Section number={6} title="Designers & Collections">
          <Field label="List the designers or collections currently carried">
            <div className="space-y-3">
              {designers.map((d, i) => (
                <div key={i} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={d.name}
                    onChange={(e) => updateDesigner(i, e.target.value)}
                    placeholder={`Designer ${i + 1}`}
                    className={`${inputClass} flex-1`}
                  />
                  {designers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeDesigner(i)}
                      className="p-2 text-[#a8b8a8] hover:text-[#6b7b6b] transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addDesigner}
                className="flex items-center gap-2 font-body text-sm text-[#6b7b6b] hover:text-[#2a3a2a] transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add another designer
              </button>
            </div>
          </Field>

          <Field label="Any you'd like featured prominently?">
            <input
              type="text"
              value={featuredDesigners}
              onChange={(e) => setFeaturedDesigners(e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field label="Upload any designer logos or brand assets">
            <FileUpload onChange={setDesignerLogoFiles} />
          </Field>
        </Section>

        {/* ── Section 7: Real Bride Stories ─────────────────────────── */}
        <Section number={7} title="Real Bride Stories">
          <Field label="Do you have past brides willing to share a quote or photo?">
            <RadioGroup
              name="has_bride_stories"
              options={["Yes", "No", "I'd need to ask"]}
              value={hasBrideStories}
              onChange={setHasBrideStories}
            />
          </Field>

          <Field label="Any thoughts on how you'd like to approach collecting these?">
            <textarea
              value={brideStoriesApproach}
              onChange={(e) => setBrideStoriesApproach(e.target.value)}
              placeholder="We can help with outreach templates if needed..."
              className={textareaClass}
              rows={3}
            />
          </Field>
        </Section>

        {/* ── Section 8: Hosting ───────────────────────────────────── */}
        <Section number={8} title="Hosting">
          <Field label="Would you like Civic Firm to manage your website hosting?">
            <p className="font-body text-sm text-[#6b7b6b] leading-relaxed mb-4">
              Secure, managed hosting at $125/month — includes SSL, CDN, infrastructure management, and ongoing technical support.
            </p>
            <RadioGroup
              name="hosting_preference"
              options={[
                "Yes",
                "No",
                "Not Sure Yet",
              ]}
              value={hostingPreference}
              onChange={setHostingPreference}
            />
          </Field>
        </Section>

        {/* ── Section 9: Inspiration ───────────────────────────────── */}
        <Section number={9} title="Inspiration">
          <Field label="Up to 3 websites you admire (any industry)">
            <div className="space-y-3">
              <input
                type="url"
                value={inspirationUrl1}
                onChange={(e) => setInspirationUrl1(e.target.value)}
                placeholder="https://"
                className={inputClass}
              />
              <input
                type="url"
                value={inspirationUrl2}
                onChange={(e) => setInspirationUrl2(e.target.value)}
                placeholder="https://"
                className={inputClass}
              />
              <input
                type="url"
                value={inspirationUrl3}
                onChange={(e) => setInspirationUrl3(e.target.value)}
                placeholder="https://"
                className={inputClass}
              />
            </div>
          </Field>

          <Field label="Any other sites or visual references whose look and feel you love?">
            <textarea
              value={nonBridalInspiration}
              onChange={(e) => setNonBridalInspiration(e.target.value)}
              placeholder="URLs or descriptions..."
              className={textareaClass}
              rows={3}
            />
          </Field>

          <Field label="Any social media accounts or posts that capture the vibe you want?">
            <textarea
              value={socialInspiration}
              onChange={(e) => setSocialInspiration(e.target.value)}
              placeholder="Links, handles, or descriptions..."
              className={textareaClass}
              rows={3}
            />
            <div className="mt-3">
              <FileUpload onChange={setSocialInspirationFiles} />
            </div>
          </Field>

          <Field label="Anything you definitely don't want the site to look or feel like?">
            <textarea
              value={dontWant}
              onChange={(e) => setDontWant(e.target.value)}
              placeholder="e.g. Nothing too busy or cluttered, no dark themes..."
              className={textareaClass}
              rows={3}
            />
          </Field>
        </Section>

        {/* ── Section 10: Anything Else ─────────────────────────────── */}
        <Section number={10} title="Anything Else">
          <Field label="Anything important about Becker's we should know before we start?">
            <textarea
              value={anythingElse}
              onChange={(e) => setAnythingElse(e.target.value)}
              placeholder="History, quirks, things that make Becker's special..."
              className={textareaClass}
              rows={5}
            />
          </Field>

          <Field label="Any questions for us?">
            <textarea
              value={questionsForUs}
              onChange={(e) => setQuestionsForUs(e.target.value)}
              placeholder="We're here to help..."
              className={textareaClass}
              rows={4}
            />
          </Field>
        </Section>

        {/* ── Payment Confirmation Block (moved to bottom) ─────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-16 bg-white border border-[#a8b8a8]/15 p-8 md:p-10"
        >
          <p className="font-body text-xs tracking-editorial uppercase text-[#c9b99a] mb-6">
            Payment Summary
          </p>
          <p className="font-body text-sm text-[#4a5a4a] leading-relaxed mb-6">
            You're confirmed on the <strong className="font-medium text-[#2a3a2a]">Launch Package</strong> at <strong className="font-medium text-[#2a3a2a]">$4,500</strong>, with payments structured as follows:
          </p>
          <div className="space-y-3 mb-6">
            {[
              { pct: "40%", amount: "$1,800", label: "Due now to kick off" },
              { pct: "30%", amount: "$1,350", label: "Due on first draft delivery" },
              { pct: "30%", amount: "$1,350", label: "Due on final handover" },
            ].map((item, i) => (
              <div key={i} className="flex items-baseline gap-4">
                <span className="font-body text-sm font-medium text-[#2a3a2a] w-10 shrink-0">{item.pct}</span>
                <span className="font-body text-sm text-[#c9b99a] w-16 shrink-0">{item.amount}</span>
                <span className="font-body text-sm text-[#6b7b6b]">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="pt-6 border-t border-[#a8b8a8]/10">
            <p className="font-body text-sm text-[#6b7b6b]">
              Please e-transfer your deposit to{" "}
              <strong className="font-medium text-[#2a3a2a]">rezaamari@gmail.com</strong>{" "}
              to get started.
            </p>
          </div>
        </motion.div>

        {/* ── Error Message ─────────────────────────────────────────── */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 bg-red-50 border border-red-200 text-red-700 font-body text-sm"
          >
            {error}
          </motion.div>
        )}

        {/* ── Submit ────────────────────────────────────────────────── */}
        <div className="mt-16 pt-12 border-t border-[#a8b8a8]/15">
          <button
            type="submit"
            disabled={submitting}
            className="w-full md:w-auto px-12 py-4 bg-[#2a3a2a] text-white font-body text-sm tracking-editorial uppercase hover:bg-[#3a4a3a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Intake Form"
            )}
          </button>
        </div>

        {/* ── Footer ────────────────────────────────────────────────── */}
        <div className="mt-16 pb-8">
          <p className="font-body text-sm text-[#a8b8a8] leading-relaxed">
            Thank you, Anastasia and Bruno. We're looking forward to this.
            <br />
            Reach us anytime at{" "}
            <a
              href="mailto:info@civicfirm.com"
              className="text-[#6b7b6b] underline underline-offset-4 hover:text-[#2a3a2a] transition-colors"
            >
              info@civicfirm.com
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
