import type { Metadata } from "next";
import { Beyond } from "@/components/site/beyond";

const title = "Beyond Engineering | Making a Difference in Our Communities — INFOELEX";
const description =
  "INFOELEX community and social responsibility programs: blood donation drives, STEM education access, food relief, pro-bono electrical safety audits and youth mentorship.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/beyond-engineering" },
  openGraph: { title, description, url: "/beyond-engineering", siteName: "INFOELEX", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function Page() {
  return <Beyond />;
}
