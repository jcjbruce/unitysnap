/*
 * DESIGN: Warm — Home Page
 * Assembles all sections in order.
 * Purpose statement after marquee. MissionCTA break between About and Process.
 * Results section uses warm cream design.
 */
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Purpose from "@/components/Purpose";
import Work from "@/components/Work";
import Services from "@/components/Services";
import Sectors from "@/components/Sectors";
import Compliance from "@/components/Compliance";
import Results from "@/components/Results";
import About from "@/components/About";
import MissionCTA from "@/components/MissionCTA";
import Process from "@/components/Process";

import Team from "@/components/Team";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const clientNames = [
  "Municipal Government",
  "K–12 Education",
  "Nonprofit",
  "Indigenous Organizations",
  "Small Business",
  "Arts & Culture",
  "Associations",
  "Public Health",
  "Local Enterprise",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Marquee items={clientNames} speed={35} />
      <Purpose />
      <Work />
      <Sectors />
      <Services />
      <Compliance />
      <Results />
      <About />
      <MissionCTA />
      <Process />

      {/* Visual divider between two dark-adjacent sections */}
      <div className="relative py-16 bg-background">
        <div className="container">
          <div className="flex items-center gap-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary/40" />
              <div className="w-2 h-2 rounded-full bg-primary/60" />
              <div className="w-2 h-2 rounded-full bg-primary/40" />
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>
        </div>
      </div>

      <Team />
      <FAQ />
      <Contact />
      <Marquee
        items={["WCAG 2.1 AA Compliant", "On-Time Delivery", "ADA Title II", "Section 508", "CMS Training Included", "Accessible by Default"]}
        speed={25}
        separator="·"
      />
      <Footer />
    </div>
  );
}
