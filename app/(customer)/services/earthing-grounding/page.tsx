import type { Metadata } from "next";
import { Waypoints } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/service-page-template";

export const metadata: Metadata = {
  title: "Earthing & Grounding — INFOELEX",
  description:
    "Earthing grid design and step/touch potential analysis engineered for personnel and equipment safety.",
};

const SECTORS = [
  { title: "Transmission & Distribution", href: "/sectors/transmission-distribution" },
  { title: "Oil, Gas & Petrochemical", href: "/sectors/oil-gas-petrochemical" },
  { title: "Industrial", href: "/sectors/industrial" },
  { title: "Water", href: "/sectors/water" },
  { title: "Data Centres", href: "/sectors/data-centres" },
  { title: "Building Services", href: "/sectors/building-services" },
];

export default function EarthingGroundingPage() {
  return (
    <ServicePageTemplate
      icon={Waypoints}
      title="Earthing & Grounding"
      intro="Earthing grid design and step/touch potential analysis engineered for personnel and equipment safety."
      overviewHeading="Safe by design, validated by analysis"
      overviewBody="We design earthing and grounding systems for substations, plants and facilities, validating performance through step and touch potential analysis — protecting personnel and equipment while ensuring correct protection operation during fault conditions."
      sectors={SECTORS}
    />
  );
}
