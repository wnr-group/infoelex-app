import type { Metadata } from "next";
import { Capabilities } from "@/components/site/capabilities";

export const metadata: Metadata = {
  title: "Capabilities — INFOELEX",
  description: "Power system studies, electrical engineering, protection, automation and control, electrical design and technical consultancy from Infoelex.",
};

export default function Page() {
  return <Capabilities />;
}
