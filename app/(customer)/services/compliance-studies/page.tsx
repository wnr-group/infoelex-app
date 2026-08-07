import type { Metadata } from "next";
import { ClipboardCheck } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/service-page-template";

export const metadata: Metadata = {
  title: "Compliance Studies — INFOELEX",
  description:
    "Grid connection and regulatory compliance studies aligned to network operator and jurisdictional requirements.",
};

const SECTORS = [
  { title: "Power Generation", href: "/sectors/power-generation" },
  { title: "Renewables & Energy Storage", href: "/sectors/renewables-energy-storage" },
  { title: "Transmission & Distribution", href: "/sectors/transmission-distribution" },
];

export default function ComplianceStudiesPage() {
  return (
    <ServicePageTemplate
      icon={ClipboardCheck}
      title="Compliance Studies"
      intro="Grid connection and regulatory compliance studies aligned to network operator and jurisdictional requirements."
      overviewHeading="Built to withstand network operator scrutiny"
      overviewBody="Compliance studies demonstrate that generation, storage or load connections meet the technical requirements set by network operators and regulators — giving your connection application a clear path to approval."
      sectors={SECTORS}
    />
  );
}
