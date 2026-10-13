import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Terms of Use — INFOELEX",
  description: "The terms that apply to your use of the Infoelex website.",
};

const SECTIONS: LegalSection[] = [
  {
    heading: "Acceptance of these terms",
    paragraphs: [
      "By accessing or using this website you agree to these terms. If you do not agree, please do not use the website. These terms apply to the website only; engineering services are provided under separate written agreements.",
    ],
  },
  {
    heading: "Use of the website",
    paragraphs: ["You agree to use the website lawfully and not to:"],
    list: [
      "interfere with or disrupt the website, its servers or networks;",
      "attempt to gain unauthorised access to any part of the website or related systems;",
      "copy, scrape or reuse content in a way that breaches these terms or applicable law;",
      "submit false, misleading or unlawful information through our forms.",
    ],
  },
  {
    heading: "Intellectual property",
    paragraphs: [
      "The website, including its text, graphics, illustrations, video, logos and layout, belongs to Infoelex or its licensors and is protected by intellectual property laws. You may view and share links to the website for personal or internal business purposes, but may not reproduce or distribute its content without our written permission.",
    ],
  },
  {
    heading: "Information only, not professional advice",
    paragraphs: [
      "Content on this website is general information about our services and capabilities. It is not engineering, legal or other professional advice and should not be relied on for any specific project. Advice and deliverables are provided only under a signed agreement for the relevant engagement.",
    ],
  },
  {
    heading: "Enquiries and communications",
    paragraphs: [
      "Sending an enquiry through the website does not create a client relationship or any obligation on either side. We will respond as appropriate and may ask for more information before discussing a project.",
    ],
  },
  {
    heading: "Third-party links",
    paragraphs: [
      "The website may contain links to third-party websites. They are provided for convenience; we do not control them and are not responsible for their content, availability or practices.",
    ],
  },
  {
    heading: "Disclaimer",
    paragraphs: [
      "The website is provided “as is” and “as available”. We make reasonable efforts to keep it accurate and available but do not warrant that it will be error-free, uninterrupted or free of harmful components.",
    ],
  },
  {
    heading: "Limitation of liability",
    paragraphs: [
      "To the fullest extent permitted by law, Infoelex is not liable for any indirect, incidental or consequential loss arising from your use of, or inability to use, the website or from reliance on its content. Nothing in these terms limits liability that cannot be limited by law.",
    ],
  },
  {
    heading: "Governing law",
    paragraphs: [
      "These terms are governed by the laws of India, and the courts of India have jurisdiction over any dispute arising from them, subject to any mandatory rights you have under the law where you live.",
    ],
  },
  {
    heading: "Changes to these terms",
    paragraphs: [
      "We may update these terms from time to time. Continued use of the website after a change means you accept the updated terms. The “Last updated” date above shows the current version.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Use"
      updated="13 October 2026"
      intro="These terms set out the rules for using the Infoelex website. Please read them before you use it."
      sections={SECTIONS}
    />
  );
}
