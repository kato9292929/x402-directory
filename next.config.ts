import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverExternalPackages: ["x402"],
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, OPTIONS" },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, X-Payment, Accept",
          },
          {
            key: "Access-Control-Expose-Headers",
            value: "X-Payment-Requirements, X-Payment-Response",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
