import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/service-page-template";

export const metadata: Metadata = {
  title: "Protection & Arc Flash — INFOELEX",
  description:
    "Protection coordination and arc flash risk assessments engineered around personnel and asset safety.",
};

const SECTORS = [
  { title: "Oil, Gas & Petrochemical", href: "/sectors/oil-gas-petrochemical" },
  { title: "Industrial", href: "/sectors/industrial" },
  { title: "Data Centres", href: "/sectors/data-centres" },
  { title: "Water", href: "/sectors/water" },
];

export default function ProtectionArcFlashPage() {
  return (
    <ServicePageTemplate
      icon={ShieldCheck}
      title="Protection & Arc Flash"
      intro="Protection coordination and arc flash risk assessments engineered around personnel and asset safety."
      overviewHeading="Coordinated protection, safer work environments"
      overviewBody="We design and coordinate protection schemes and quantify arc flash incident energy across switchgear and distribution equipment — limiting fault damage and downtime while keeping personnel safe around energised systems."
      sectors={SECTORS}
    />
  );
}
