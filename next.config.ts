import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Images are pre-compressed WebP in /public; skip Vercel's metered optimizer (402 on quota).
    unoptimized: true,
  },
};

export default nextConfig;
