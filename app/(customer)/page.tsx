import { HeroSection } from "@/components/home/hero-section";
import { IntroSection } from "@/components/home/intro-section";
import { ValuesSection } from "@/components/home/values-section";
import { WhyInfoelexSection } from "@/components/home/why-infoelex-section";
import { InfrastructureVisual } from "@/components/home/infrastructure-visual";
import { ServicesSection } from "@/components/home/services-section";
import { ESGSection } from "@/components/home/esg-section";
import { FinalCTA } from "@/components/home/final-cta";

export default function CustomerPage() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <ValuesSection />
      <WhyInfoelexSection />
      <InfrastructureVisual />
      <ServicesSection />
      <ESGSection />
      <FinalCTA />
    </>
  );
}
