import type { Metadata } from "next";
import { Contact } from "@/components/site/contact";

export const metadata: Metadata = {
  title: "Contact Us — INFOELEX",
  description:
    "Get in touch with Infoelex, an electrical consulting company based in Coimbatore. Power system studies, electrical design and engineering, automation and data center solutions.",
};

export default function ContactPage() {
  return <Contact />;
}
