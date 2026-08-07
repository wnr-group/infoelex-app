import type { Metadata } from "next";
import { AboutHero } from "@/components/about/about-hero";
import { AboutStory } from "@/components/about/about-story";
import { AboutStats } from "@/components/about/about-stats";
import { AboutMission } from "@/components/about/about-mission";
import { AboutOffice } from "@/components/about/about-office";
import { AboutCta } from "@/components/about/about-cta";

export const metadata: Metadata = {
  title: "About Us — INFOELEX",
  description:
    "Learn about Infoelex — the team, mission and vision behind next-generation data center infrastructure in India and beyond.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStats />
      <AboutStory />
      <AboutMission />
      <AboutOffice />
      <AboutCta />
    </>
  );
}
