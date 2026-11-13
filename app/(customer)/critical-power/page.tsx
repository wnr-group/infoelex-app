import type { Metadata } from "next";
import { CriticalPower } from "@/components/site/critical-power";

export const metadata: Metadata = {
  title: "Critical Power — INFOELEX",
  description: "Power architecture, redundancy, reliability and resilience engineering for data centers and mission-critical infrastructure.",
};

export default function Page() {
  return <CriticalPower />;
}
