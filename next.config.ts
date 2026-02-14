import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: { root: process.cwd() },
  async redirects() {
    return [
      { source: "/day-tours", destination: "/tours", permanent: true },
      { source: "/day-tours/:path*", destination: "/tours", permanent: true },
    ];
  },
};

export default nextConfig;
