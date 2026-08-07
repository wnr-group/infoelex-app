import { HeroSection } from "@/components/home/hero-section";
import { ValuesSection } from "@/components/home/values-section";
import { WhyInfoelexSection } from "@/components/home/why-infoelex-section";
import { SolutionsSection } from "@/components/home/solutions-section";
import { ESGSection } from "@/components/home/esg-section";

export default function CustomerPage() {
  return (
    <>
      <HeroSection />
      <ValuesSection />
      <WhyInfoelexSection />
      <SolutionsSection />
      <ESGSection />
    </>
  );
}
