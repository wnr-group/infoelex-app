import type { Metadata } from "next";
import { Zap } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/service-page-template";

export const metadata: Metadata = {
  title: "Dynamic & Transients (RMS) — INFOELEX",
  description:
    "RMS dynamic modelling that characterises how generation, storage and network assets respond to disturbances over seconds to minutes.",
};

const SECTORS = [
  { title: "Power Generation", href: "/sectors/power-generation" },
  { title: "Renewables & Energy Storage", href: "/sectors/renewables-energy-storage" },
  { title: "Transmission & Distribution", href: "/sectors/transmission-distribution" },
];

export default function DynamicTransientsRMSPage() {
  return (
    <ServicePageTemplate
      icon={Zap}
      title="Dynamic & Transients (RMS)"
      intro="RMS dynamic modelling that characterises how generation, storage and network assets respond to disturbances over seconds to minutes."
      overviewHeading="Validating stability before assets go live"
      overviewBody="RMS studies simulate the electromechanical response of generators, inverters and controls following faults, switching events and load changes — validating stability margins and control tuning long before commissioning."
      sectors={SECTORS}
    />
  );
}
