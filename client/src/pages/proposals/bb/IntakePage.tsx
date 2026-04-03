import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ChevronRight, ChevronLeft, Check, Download } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ==========================================
// ZOD SCHEMA & TYPES
// ==========================================
const intakeSchema = z.object({
  contact: z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    organization: z.string().optional(),
    role: z.string().optional(),
  }),
  brand: z.object({
    background: z.string().min(10, "Please provide some background"),
    values: z.string().optional(),
    marketPosition: z.string().optional(),
    audience: z.string().optional(),
  }),
  design: z.object({
    aesthetic: z.string().min(10, "Please describe your vision"),
    competitors: z.string().optional(),
    mustHaves: z.string().optional(),
    dontWants: z.string().optional(),
  }),
  technical: z.object({
    currentCms: z.string().optional(),
    bookingSystem: z.string().optional(),
    integrations: z.string().optional(),
    accessibility: z.string().optional(),
  }),
  content: z.object({
    hasGuidelines: z.string().optional(),
    hasPhotography: z.string().optional(),
    migrationScope: z.string().optional(),
  }),
  timeline: z.object({
    targetLaunch: z.string().optional(),
    budgetRange: z.string().optional(),
    otherNotes: z.string().optional(),
  }),
});

type IntakeFormValues = z.infer<typeof intakeSchema>;

const steps = [
  { id: "contact", title: "Business & Contact", desc: "Tell us who you are" },
  { id: "brand", title: "Brand & Heritage", desc: "Your story and essence" },
  { id: "design", title: "Design Vision", desc: "Aesthetic goals" },
  { id: "technical", title: "Technical & Booking", desc: "Under the hood" },
  { id: "content", title: "Content & Assets", desc: "What you have ready" },
  { id: "timeline", title: "Timeline & Budget", desc: "Project parameters" },
];

// ==========================================
// REUSABLE FIELD WRAPPERS
// ==========================================
const FormField = ({ label, name, type = "text", placeholder = "", required = false, isTextArea = false }: any) => {
  const { register, formState: { errors } } = useFormContext();
  // We use name properly for nested fields (e.g. contact.firstName)
  const pathParts = name.split(".");
  const errorObj = pathParts.reduce((acc: any, part: string) => acc?.[part], errors);

  return (
    <div className="mb-6">
      <label className="block text-[oklch(0.35_0.02_155)] text-xs uppercase tracking-widest font-semibold mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {isTextArea ? (
        <textarea
          {...register(name)}
          placeholder={placeholder}
          rows={4}
          className={`w-full bg-transparent border-b ${errorObj ? "border-red-400" : "border-[oklch(0.85_0.02_80)] focus:border-[oklch(0.50_0.16_150)]"} text-[oklch(0.20_0.02_75)] py-3 px-1 text-base placeholder-[oklch(0.70_0.01_80)] focus:outline-none transition-colors resize-none`}
        />
      ) : (
        <input
          type={type}
          {...register(name)}
          placeholder={placeholder}
          className={`w-full bg-transparent border-b ${errorObj ? "border-red-400" : "border-[oklch(0.85_0.02_80)] focus:border-[oklch(0.50_0.16_150)]"} text-[oklch(0.20_0.02_75)] py-3 px-1 text-base placeholder-[oklch(0.70_0.01_80)] focus:outline-none transition-colors`}
        />
      )}
      {errorObj && (
        <p className="text-red-500 text-xs mt-2 italic">{errorObj.message?.toString()}</p>
      )}
    </div>
  );
};

// ==========================================
// STEP COMPONENTS
// ==========================================
const StepContact = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
      <FormField name="contact.firstName" label="First Name" required />
      <FormField name="contact.lastName" label="Last Name" required />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
      <FormField name="contact.email" type="email" label="Email Address" required />
      <FormField name="contact.phone" type="tel" label="Phone Number" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
      <FormField name="contact.organization" label="Organization / Boutique Name" placeholder="e.g. Becker's Bridal" />
      <FormField name="contact.role" label="Your Role" />
    </div>
  </div>
);

const StepBrand = () => (
  <div className="space-y-4">
    <FormField name="brand.background" label="Brand Background" placeholder="Briefly describe the history and ethos..." required isTextArea />
    <FormField name="brand.values" label="Core Values" placeholder="What are the non-negotiables of your brand?" isTextArea />
    <FormField name="brand.marketPosition" label="Market Position" placeholder="How do you sit in the competitive landscape?" />
    <FormField name="brand.audience" label="Target Audience" placeholder="Who is your ideal bride?" />
  </div>
);

const StepDesign = () => (
  <div className="space-y-4">
    <FormField name="design.aesthetic" label="Aesthetic Vision" placeholder="Elegant, minimal, warm, editorial..." required isTextArea />
    <FormField name="design.competitors" label="Inspiration & Competitors" placeholder="Any websites or brands you admire?" isTextArea />
    <FormField name="design.mustHaves" label="Must-Haves" placeholder="Any specific design elements required?" />
    <FormField name="design.dontWants" label="Avoid" placeholder="Anything you definitely do not want?" />
  </div>
);

const StepTechnical = () => (
  <div className="space-y-4">
    <FormField name="technical.currentCms" label="Current CMS" placeholder="e.g. WordPress, Squarespace (if any)" />
    <FormField name="technical.bookingSystem" label="Booking/Appointment System" placeholder="e.g. Calendly, Acuity, custom..." />
    <FormField name="technical.integrations" label="Other Integrations" placeholder="e.g. Mailchimp, Shopify, inventory..." isTextArea />
    <FormField name="technical.accessibility" label="Accessibility Requirements" placeholder="e.g. WCAG 2.1 AA Standard" />
  </div>
);

const StepContent = () => (
  <div className="space-y-8">
    <div>
      <label className="block text-[oklch(0.35_0.02_155)] text-xs uppercase tracking-widest font-semibold mb-4">Do you have established brand guidelines?</label>
      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer text-sm">
          <input type="radio" value="yes" {...useFormContext().register("content.hasGuidelines")} className="accent-[oklch(0.45_0.14_150)]" /> Yes
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-sm">
          <input type="radio" value="no" {...useFormContext().register("content.hasGuidelines")} className="accent-[oklch(0.45_0.14_150)]" /> No
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-sm">
          <input type="radio" value="partial" {...useFormContext().register("content.hasGuidelines")} className="accent-[oklch(0.45_0.14_150)]" /> Partial / Needs refresh
        </label>
      </div>
    </div>
    <div>
      <label className="block text-[oklch(0.35_0.02_155)] text-xs uppercase tracking-widest font-semibold mb-4">Is high-quality brand photography ready?</label>
      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer text-sm">
          <input type="radio" value="yes" {...useFormContext().register("content.hasPhotography")} className="accent-[oklch(0.45_0.14_150)]" /> Yes
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-sm">
          <input type="radio" value="no" {...useFormContext().register("content.hasPhotography")} className="accent-[oklch(0.45_0.14_150)]" /> No
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-sm">
          <input type="radio" value="organizing" {...useFormContext().register("content.hasPhotography")} className="accent-[oklch(0.45_0.14_150)]" /> Currently organizing
        </label>
      </div>
    </div>
    <FormField name="content.migrationScope" label="Content Migration Scope" placeholder="How many pages/galleries need to be migrated?" isTextArea />
  </div>
);

const StepTimeline = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
      <FormField name="timeline.targetLaunch" label="Target Launch Date" placeholder="e.g. Q4 2026" />
      <FormField name="timeline.budgetRange" label="Estimated Budget Range" placeholder="e.g. $10k - $20k" />
    </div>
    <FormField name="timeline.otherNotes" label="Any other notes or questions?" isTextArea />
  </div>
);

// ==========================================
// MAIN INTAKE PAGE
// ==========================================
export default function IntakePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");

  const methods = useForm<IntakeFormValues>({
    resolver: zodResolver(intakeSchema),
    mode: "onTouched",
  });


  const onSubmit = async (data: IntakeFormValues) => {
    setIsSubmitting(true);
    setSubmitState("idle");
    try {
      // In a real scenario, this would post to our serverless API
      // Wait, let's actually point to our local/Vercel serverless API!
      const res = await fetch("/api/submit-intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      // If backend throws a 500 or network fails, we fall back to file download.
      if (!res.ok) {
        throw new Error("Server response was not ok");
      }
      setSubmitState("success");
    } catch (err) {
      console.error("Submission failed.", err);
      setSubmitState("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = async () => {
    // Validate current step fields before progressing
    const fieldsForStep: (keyof IntakeFormValues)[] = [steps[currentStep].id as keyof IntakeFormValues];
    const isValid = await methods.trigger(fieldsForStep);
    
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: return <StepContact />;
      case 1: return <StepBrand />;
      case 2: return <StepDesign />;
      case 3: return <StepTechnical />;
      case 4: return <StepContent />;
      case 5: return <StepTimeline />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[oklch(0.985_0.008_85)] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 container pt-32 pb-24 md:pt-40 max-w-4xl mx-auto px-6">
        
        {submitState === "success" ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 mx-auto bg-green-50 rounded-full flex flex-col items-center justify-center mb-8 border border-green-100">
               <Check className="text-green-600 w-10 h-10" />
            </div>
            <h1 className="text-4xl font-[var(--font-display)] text-[oklch(0.20_0.05_155)] tracking-tight mb-4">Proposal Received</h1>
            <p className="text-[oklch(0.40_0.02_75)] max-w-xl mx-auto text-lg leading-relaxed font-light">
              Thank you. Your proposal intake has been successfully submitted to the Civic Firm team. We will review your vision and follow up within 24–48 hours to discuss the next steps for Becker's Bridal.
            </p>
          </motion.div>
        ) : submitState === "error" ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-10 md:p-14 border border-red-100 shadow-xl rounded-xl text-center md:text-left"
          >
            <h1 className="text-3xl font-[var(--font-display)] text-[oklch(0.20_0.05_155)] mb-4">Submission Unsuccessful</h1>
            <p className="text-[oklch(0.40_0.02_75)] mb-8 font-light">
              We encountered a network or server issue submitting your intake form. Please try returning to the form to submit again, or reach out to us at <a href="mailto:info@civicfirm.ca" className="underline text-[oklch(0.45_0.14_150)]">info@civicfirm.ca</a> with your requirements.
            </p>
            <div className="mt-8 pt-8 border-t border-[oklch(0.90_0.01_80)]">
              <button 
                onClick={() => setSubmitState("idle")} 
                className="bg-[oklch(0.20_0.05_155)] text-white px-6 py-3 tracking-widest text-sm uppercase font-semibold hover:bg-black transition-colors rounded-sm"
              >
                Return to form
              </button>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Header / Intro */}
            <div className="mb-14 md:text-center">
              <span className="text-[oklch(0.72_0.12_75)] text-xs uppercase tracking-[0.2em] font-semibold block mb-4">Project Intake</span>
              <h1 className="text-4xl md:text-6xl font-[var(--font-display)] tracking-tight text-[oklch(0.20_0.05_155)] font-normal leading-none">
                Becker's Bridal <span className="italic font-light text-[oklch(0.40_0.02_75)]">&</span> Civic Firm
              </h1>
            </div>

            <div className="bg-white/60 p-8 md:p-14 shadow-sm border border-[oklch(0.95_0.01_80)] relative overflow-hidden backdrop-blur-sm">
              
              {/* Progress Indicator */}
              <div className="flex flex-wrap items-center justify-between mb-12 gap-y-4">
                {steps.map((s, i) => (
                  <div key={s.id} className="flex items-center">
                    <div className="flex flex-col items-center md:items-start group">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors ${
                          i < currentStep ? "bg-[oklch(0.45_0.14_150)] text-white" : 
                          i === currentStep ? "border-2 border-[oklch(0.45_0.14_150)] text-[oklch(0.45_0.14_150)]" : 
                          "border border-[oklch(0.85_0.02_80)] text-[oklch(0.60_0.01_80)]"
                        }`}>
                          {i < currentStep ? <Check className="w-3 h-3" /> : (i + 1)}
                        </div>
                        <span className={`hidden md:block text-xs uppercase tracking-widest font-semibold transition-colors ${i <= currentStep ? "text-[oklch(0.20_0.05_155)]" : "text-[oklch(0.60_0.01_80)]"}`}>
                          {s.title}
                        </span>
                      </div>
                    </div>
                    {i < steps.length - 1 && (
                      <div className={`hidden md:block w-8 h-px mx-4 transition-colors ${i < currentStep ? "bg-[oklch(0.45_0.14_150)]" : "bg-[oklch(0.85_0.02_80)]"}`} />
                    )}
                  </div>
                ))}
              </div>

              {/* Form Content */}
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="min-h-[400px] flex flex-col justify-between">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="mb-8 flex-1"
                    >
                      <div className="mb-8">
                        <h2 className="text-2xl font-[var(--font-display)] text-[oklch(0.20_0.05_155)] border-b border-[oklch(0.90_0.01_80)] pb-4 inline-block mb-2 pr-12">
                          {steps[currentStep].title}
                        </h2>
                        <p className="text-[oklch(0.45_0.02_75)] text-sm italic">{steps[currentStep].desc}</p>
                      </div>
                      
                      {renderStepContent()}
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Footer */}
                  <div className="pt-8 border-t border-[oklch(0.90_0.01_80)] flex justify-between items-center mt-12">
                     <button
                        type="button"
                        onClick={prevStep}
                        className={`text-sm tracking-widest uppercase font-semibold text-[oklch(0.40_0.02_75)] hover:text-black transition-colors flex items-center gap-1 ${currentStep === 0 ? "opacity-0 pointer-events-none" : ""}`}
                     >
                       <ChevronLeft className="w-4 h-4" /> Back
                     </button>
                     
                     {currentStep === steps.length - 1 ? (
                       <button
                         type="submit"
                         disabled={isSubmitting}
                         className="bg-[oklch(0.20_0.05_155)] text-white px-8 py-4 tracking-widest text-sm uppercase font-semibold hover:bg-black transition-all disabled:opacity-50 flex items-center gap-2 rounded-sm"
                       >
                         {isSubmitting ? "Submitting..." : "Submit Proposal"}
                       </button>
                     ) : (
                       <button
                         type="button"
                         onClick={nextStep}
                         className="bg-[oklch(0.95_0.01_85)] border border-[oklch(0.85_0.02_80)] text-[oklch(0.20_0.05_155)] px-8 py-3 tracking-widest text-sm uppercase font-bold hover:bg-white transition-all flex items-center gap-2 rounded-sm"
                       >
                         Next Step <ChevronRight className="w-4 h-4" />
                       </button>
                     )}
                  </div>
                </form>
              </FormProvider>

            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
