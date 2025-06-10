import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  eslint:{
    ignoreDuringBuilds: true, // Ignore ESLint errors during build
  },
  images: {
    unoptimized: true, // needed if using <Image> with static export
  },
};

export default nextConfig;
