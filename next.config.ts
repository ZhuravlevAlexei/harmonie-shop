import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  // reactStrictMode: false,
  images: {
    // domains: ['images.prom.ua', 'example.com', 'another-site.org'],
    //или
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.prom.ua',
      },
      // {
      //   protocol: 'https',
      //   hostname: 'example.com',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'another-site.org',
      // },
    ],
  },
};

export default nextConfig;
