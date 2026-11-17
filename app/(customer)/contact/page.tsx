import type { Metadata } from "next";
import { Contact } from "@/components/site/contact";

const title = "Contact & Advisory | Let's Build Something That Matters — INFOELEX";
const description =
  "Contact INFOELEX to discuss high-voltage infrastructure, critical power topology and engineering assignments. Submit a technical scoping request and speak directly with a principal engineer.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title, description, url: "/contact", siteName: "INFOELEX", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function ContactPage() {
  return <Contact />;
}
