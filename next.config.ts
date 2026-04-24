import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // If your repo is NOT <username>.github.io, uncomment the line below and replace 'repo-name'
  // basePath: '/repo-name',
};

export default nextConfig;
