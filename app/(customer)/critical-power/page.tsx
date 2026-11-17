import type { Metadata } from "next";
import { CriticalPower } from "@/components/site/critical-power";

const title = "Critical Power | High-Availability Power Engineering — INFOELEX";
const description =
  "High-availability power engineering for hyperscale data centres, semiconductor fabs and mission-critical facilities: 2N and N+1 topologies, static transfer, UPS design, SPOF elimination and Level 5 commissioning.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/critical-power" },
  openGraph: { title, description, url: "/critical-power", siteName: "INFOELEX", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function Page() {
  return <CriticalPower />;
}
