import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy — INFOELEX",
  description: "How Infoelex collects, uses and protects personal information submitted through this website.",
};

const SECTIONS: LegalSection[] = [
  {
    heading: "Who we are",
    paragraphs: [
      "Infoelex (Information Electrical Technologies, “Infoelex”, “we”, “us”) is an electrical consulting company providing power system studies, electrical design and engineering, automation and energy management solutions. This policy applies to this website and to enquiries made through it.",
    ],
  },
  {
    heading: "Information we collect",
    paragraphs: ["We collect only what we need to respond to you and to run the website."],
    list: [
      "Information you give us: your name, email address, organisation, the service you are interested in and your message, when you use the contact form or email us.",
      "Technical information: basic device and usage data such as browser type, pages visited and approximate location, collected automatically through standard web server logs and, where enabled, analytics tools.",
    ],
  },
  {
    heading: "How we use your information",
    list: [
      "To reply to your enquiry and provide the information or services you ask about.",
      "To prepare proposals and manage the working relationship if you become a client.",
      "To keep the website secure, understand how it is used and improve it.",
      "To meet legal and regulatory obligations.",
    ],
  },
  {
    heading: "Cookies and analytics",
    paragraphs: [
      "The website may use cookies and similar technologies that are necessary for it to work, and, where enabled, to measure how visitors use it. You can block or delete cookies in your browser settings; some parts of the site may then work less well.",
    ],
  },
  {
    heading: "Sharing your information",
    paragraphs: [
      "We do not sell your personal information. We share it only with service providers who help us run the website and handle enquiries (for example hosting and email providers), under obligations to protect it, and with authorities where the law requires us to.",
    ],
  },
  {
    heading: "How long we keep it",
    paragraphs: [
      "We keep enquiry details for as long as needed to respond and to maintain a reasonable record of our dealings with you, and delete or anonymise them when they are no longer needed.",
    ],
  },
  {
    heading: "Security",
    paragraphs: [
      "We use reasonable technical and organisational measures to protect personal information. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.",
    ],
  },
  {
    heading: "Your rights",
    paragraphs: [
      "Depending on where you live, you may have the right to access, correct or delete the personal information we hold about you, to object to or restrict certain uses, and to withdraw consent. To exercise these rights, contact us using the details below.",
    ],
  },
  {
    heading: "Links to other sites",
    paragraphs: [
      "This website may link to other websites, including that of our technology partner. We are not responsible for their content or privacy practices and encourage you to read their policies.",
    ],
  },
  {
    heading: "Changes to this policy",
    paragraphs: [
      "We may update this policy from time to time. The “Last updated” date above shows when it last changed, and the current version is always available on this page.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      updated="13 October 2026"
      intro="We respect your privacy. This policy explains what information we collect through this website, how we use it, and the choices you have."
      sections={SECTIONS}
    />
  );
}
