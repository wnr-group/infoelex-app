import type { Metadata } from "next";
import { Projects } from "@/components/site/projects";

export const metadata: Metadata = {
  title: "Projects — INFOELEX",
  description: "Selected engineering scopes by industry: transmission and distribution, renewables, energy storage, power generation and industrial plant.",
};

export default function Page() {
  return <Projects />;
}
