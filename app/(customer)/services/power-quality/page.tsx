import type { Metadata } from "next";
import { Gauge } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/service-page-template";

export const metadata: Metadata = {
  title: "Power Quality — INFOELEX",
  description:
    "Harmonics, flicker and voltage-quality assessments that keep sensitive equipment and grid connections within compliant limits.",
};

const SECTORS = [
  { title: "Renewables & Energy Storage", href: "/sectors/renewables-energy-storage" },
  { title: "Data Centres", href: "/sectors/data-centres" },
  { title: "Industrial", href: "/sectors/industrial" },
  { title: "Building Services", href: "/sectors/building-services" },
];

export default function PowerQualityPage() {
  return (
    <ServicePageTemplate
      icon={Gauge}
      title="Power Quality"
      intro="Harmonics, flicker and voltage-quality assessments that keep sensitive equipment and grid connections within compliant limits."
      overviewHeading="Keeping disturbances out of your network"
      overviewBody="Power quality studies quantify harmonic distortion, voltage flicker and other disturbances introduced by non-linear loads, inverters and switching equipment — surfacing issues before they degrade equipment or breach connection agreements."
      sectors={SECTORS}
    />
  );
}
