import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/market/will-:team-win-the-2026-fifa-world-cup',
        destination: '/teams/:team',
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
