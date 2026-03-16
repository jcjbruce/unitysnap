/*
 * DESIGN: Warm Institutional — Home Page
 * Assembles all sections in order.
 * Purpose section sits between Marquee and Portfolio.
 * Green Results banner is the single stats section.
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
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Team from "@/components/Team";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const clientNames = [
  "Municipal Government",
  "K–12 Education",
  "Nonprofit",
  "Indigenous Organizations",
  "Housing Authorities",
  "Arts & Culture",
  "Associations",
  "Public Health",
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
      <Process />
      <Testimonials />
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
