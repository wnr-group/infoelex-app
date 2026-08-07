import type { Metadata } from "next";
import { Waves } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/service-page-template";

export const metadata: Metadata = {
  title: "Electromagnetic Transients (EMT) — INFOELEX",
  description:
    "High-fidelity EMT modelling for lightning, switching and fast transient events across power system equipment.",
};

const SECTORS = [
  { title: "Transmission & Distribution", href: "/sectors/transmission-distribution" },
  { title: "Renewables & Energy Storage", href: "/sectors/renewables-energy-storage" },
  { title: "Power Generation", href: "/sectors/power-generation" },
];

export default function ElectromagneticTransientsEMTPage() {
  return (
    <ServicePageTemplate
      icon={Waves}
      title="Electromagnetic Transients (EMT)"
      intro="High-fidelity EMT modelling for lightning, switching and fast transient events across power system equipment."
      overviewHeading="Microsecond-scale insight into fast transients"
      overviewBody="EMT studies model power system behaviour at microsecond timescales, capturing transient overvoltages, switching surges and lightning response — essential for insulation coordination and equipment ratings."
      sectors={SECTORS}
    />
  );
}
