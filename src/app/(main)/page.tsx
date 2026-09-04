import Hero from "@/components/home/Hero";
import AppPreview from "@/components/home/AppPreview";
import HowItWorks from "@/components/home/HowItWorks";
import Features from "@/components/home/Features";
import AISpotlight from "@/components/home/AISpotlight";
import TechStack from "@/components/home/TechStack";
import ArchitectureDiagram from "@/components/home/ArchitectureDiagram";
import BeforeAfter from "@/components/home/BeforeAfter";
import Statistics from "@/components/home/Statistics";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import GitHubCTA from "@/components/home/GitHubCTA";
import FinalCTA from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AppPreview />
      <HowItWorks />
      <Features />
      <AISpotlight />
      <TechStack />
      <ArchitectureDiagram />
      <BeforeAfter />
      <Statistics />
      <Testimonials />
      <FAQ />
      <GitHubCTA />
      <FinalCTA />
    </>
  );
}
