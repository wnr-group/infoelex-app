import { CasesSection } from "@/components/home/cases-section";
import { ClosingCta } from "@/components/home/closing-cta";
import { ExpertiseSection } from "@/components/home/expertise-section";
import { HeroSection } from "@/components/home/hero-section";
import { HomeShell } from "@/components/home/home-shell";
import { NumbersSection } from "@/components/home/numbers-section";
import { ProcessSection } from "@/components/home/process-section";
import { ServicesSection } from "@/components/home/services-section";
import { TrustStrip } from "@/components/home/trust-strip";
import { WhySection } from "@/components/home/why-section";

export default function CustomerPage() {
  return (
    <HomeShell>
      <HeroSection />
      <TrustStrip />
      <ServicesSection />
      <ExpertiseSection />
      <ProcessSection />
      <WhySection />
      <NumbersSection />
      <CasesSection />
      <ClosingCta />
    </HomeShell>
  );
}
