import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // One address for search engines: afridev.io → www.afridev.io (the canonical host)
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "afridev.io" }],
        destination: "https://www.afridev.io/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    // Intro video thumbnail
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" }],
  },
};

export default nextConfig;
