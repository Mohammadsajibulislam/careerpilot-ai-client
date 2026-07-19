import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import Features from "@/components/home/Features";
import AISpotlight from "@/components/home/AISpotlight";
import Statistics from "@/components/home/Statistics";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import FinalCTA from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Features />
      <AISpotlight />
      <Statistics />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}