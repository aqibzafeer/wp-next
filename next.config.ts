import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ambalafoods.crea8ive.solutions',
      },
    ],
  },
};

export default nextConfig;
