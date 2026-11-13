import type { Metadata } from "next";
import { Beyond } from "@/components/site/beyond";

export const metadata: Metadata = {
  title: "Beyond Engineering — INFOELEX",
  description: "Infoelex community work: quarterly blood donation drives, computers for government schools and tree plantation.",
};

export default function Page() {
  return <Beyond />;
}
