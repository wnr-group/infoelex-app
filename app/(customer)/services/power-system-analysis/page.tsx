import type { Metadata } from "next";
import { Activity } from "lucide-react";
import { ServicePageTemplate } from "@/components/services/service-page-template";

export const metadata: Metadata = {
  title: "Power System Analysis — INFOELEX",
  description:
    "Load flow, short circuit and stability studies that validate power systems against operating limits and grid code requirements.",
};

const SECTORS = [
  { title: "Power Generation", href: "/sectors/power-generation" },
  { title: "Transmission & Distribution", href: "/sectors/transmission-distribution" },
  { title: "Industrial", href: "/sectors/industrial" },
  { title: "Data Centres", href: "/sectors/data-centres" },
];

export default function PowerSystemAnalysisPage() {
  return (
    <ServicePageTemplate
      icon={Activity}
      title="Power System Analysis"
      intro="Load flow, short circuit and stability studies that validate power systems against operating limits and grid code requirements."
      overviewHeading="Understanding how your system behaves under load"
      overviewBody="Power system analysis brings together load flow, short circuit and stability studies to characterise how a network performs under normal and abnormal operating conditions — the foundation every downstream engineering decision is built on."
      sectors={SECTORS}
    />
  );
}
