import type { Metadata } from "next";
import { Capabilities } from "@/components/site/capabilities";

const title = "Capabilities | Integrated Engineering, Comprehensive Expertise — INFOELEX";
const description =
  "Power system studies, electrical engineering, protection and control, automation systems, electrical design and technical consultancy for grids, industrial plant and hyperscale infrastructure.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/capabilities" },
  openGraph: { title, description, url: "/capabilities", siteName: "INFOELEX", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function Page() {
  return <Capabilities />;
}
