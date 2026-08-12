import type { Metadata } from "next";
import { CsrHero } from "@/components/csr/csr-hero";
import { CsrInitiatives } from "@/components/csr/csr-initiatives";
import { CsrCta } from "@/components/csr/csr-cta";

export const metadata: Metadata = {
  title: "CSR — INFOELEX",
  description:
    "Infoelex corporate social responsibility — quarterly blood donation drives, tree plantation and computer donations to government schools.",
};

export default function CsrPage() {
  return (
    <>
      <CsrHero />
      <CsrInitiatives />
      <CsrCta />
    </>
  );
}
