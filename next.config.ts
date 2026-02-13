import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      { source: "/day-tours", destination: "/tours", permanent: true },
      { source: "/day-tours/:path*", destination: "/tours", permanent: true },
    ];
  },
};

export default nextConfig;
