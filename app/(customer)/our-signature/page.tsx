import type { Metadata } from "next";
import { Signature } from "@/components/site/signature";

export const metadata: Metadata = {
  title: "Our Signature — INFOELEX",
  description: "Infoelex's engineering methodology: six verified stages from scope and data to commissioning, with every result traceable.",
};

export default function Page() {
  return <Signature />;
}
