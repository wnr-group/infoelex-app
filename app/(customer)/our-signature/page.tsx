import type { Metadata } from "next";
import { Signature } from "@/components/site/signature";

const title = "Our Signature | Precision in Process, Excellence in Execution — INFOELEX";
const description =
  "The INFOELEX verification methodology: first-principles engineering, a five-stage gated process, three-tier peer review and standards adherence across IEEE, IEC, CIGRE, NERC and NFPA.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/our-signature" },
  openGraph: { title, description, url: "/our-signature", siteName: "INFOELEX", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function Page() {
  return <Signature />;
}
