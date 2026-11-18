import type { Metadata } from "next";
import { Projects } from "@/components/site/projects";

const title = "Projects | Engineering Expertise, Real-World Impact — INFOELEX";
const description =
  "Selected engineering projects across HVDC interconnectors, hyperscale data campuses, bulk supply substations, semiconductor fabs and utility-scale energy storage.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/projects" },
  openGraph: { title, description, url: "/projects", siteName: "INFOELEX", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function Page() {
  return <Projects />;
}
