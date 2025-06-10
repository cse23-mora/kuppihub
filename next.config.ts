import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true, // needed if using <Image> with static export
  },
};

export default nextConfig;
