import type { Metadata } from "next";
import { FlaskConical } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/service-page-template";

export const metadata: Metadata = {
  title: "Specialist Studies — INFOELEX",
  description:
    "Bespoke engineering studies and analysis tailored to project-specific technical and regulatory requirements.",
};

const SECTORS = [
  { title: "Power Generation", href: "/sectors/power-generation" },
  { title: "Renewables & Energy Storage", href: "/sectors/renewables-energy-storage" },
  { title: "Transmission & Distribution", href: "/sectors/transmission-distribution" },
  { title: "Oil, Gas & Petrochemical", href: "/sectors/oil-gas-petrochemical" },
  { title: "Industrial", href: "/sectors/industrial" },
  { title: "Data Centres", href: "/sectors/data-centres" },
  { title: "Building Services", href: "/sectors/building-services" },
  { title: "Water", href: "/sectors/water" },
];

export default function SpecialistStudiesPage() {
  return (
    <ServicePageTemplate
      icon={FlaskConical}
      title="Specialist Studies"
      intro="Bespoke engineering studies and analysis tailored to project-specific technical and regulatory requirements."
      overviewHeading="Rigorous analysis for non-standard problems"
      overviewBody="Beyond our core study types, we undertake specialist analysis scoped around your project's unique requirements — closing the gap complex projects often raise outside a standard study scope."
      sectors={SECTORS}
    />
  );
}
