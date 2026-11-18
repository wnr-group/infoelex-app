import type { Metadata } from "next";
import { OurEdge } from "@/components/site/our-edge";

const title = "Our Edge | Engineering Excellence Built on Experience — INFOELEX";
const description =
  "Independent technical authority for power systems: transient and EMT analysis, grid code compliance, hardware-in-the-loop validation and critical power engineering across global grids.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/our-edge" },
  openGraph: { title, description, url: "/our-edge", siteName: "INFOELEX", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function Page() {
  return <OurEdge />;
}
