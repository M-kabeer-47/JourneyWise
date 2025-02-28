import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows images from any domain
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // Set appropriate limit for your use case
    },
  },
};

export default nextConfig;
