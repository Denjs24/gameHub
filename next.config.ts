import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.rawg.io',
      },
      {
        protocol: 'https',
        hostname: 'images.igdb.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ]
  }
};

export default nextConfig;
