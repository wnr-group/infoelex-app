import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactInfo } from "@/components/contact/contact-info";

export const metadata: Metadata = {
  title: "Contact Us — INFOELEX",
  description:
    "Get in touch with Infoelex, an electrical consulting company based in Coimbatore. Specializing in Power System Studies, Electrical Design & Engineering, Automation, and international Data Center solutions.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <section className="relative bg-white pb-24">
        <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Contact details and international footprint info */}
            <div className="lg:col-span-5">
              <ContactInfo />
            </div>

            {/* Premium interactive contact form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
