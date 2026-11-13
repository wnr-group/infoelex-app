import type { Metadata } from "next";
import { OurEdge } from "@/components/site/our-edge";

export const metadata: Metadata = {
  title: "Our Edge — INFOELEX",
  description: "Infoelex is an electrical consulting company in Coimbatore, India: power system studies, electrical design, automation and data center power for the GCC and India.",
};

export default function Page() {
  return <OurEdge />;
}
