import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Intro video thumbnail
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" }],
  },
};

export default nextConfig;
