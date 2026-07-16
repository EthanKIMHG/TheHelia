import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.pstatic.net",
      },
      {
        protocol: "https",
        hostname: "**.naver.com",
      },
      {
        protocol: "https",
        hostname: "**.naver.net",
      },
      {
        protocol: "https",
        hostname: "**.public.blob.vercel-storage.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/reservation",
        destination: "/ko/reservation",
        permanent: true,
      },
      {
        source: "/reservation/price",
        destination: "/ko/reservation/price",
        permanent: true,
      },
      {
        source: "/room-suites/prestige",
        destination: "/ko/room-suites/prestige",
        permanent: true,
      },
      {
        source: "/room-suites/vip",
        destination: "/ko/room-suites/vip",
        permanent: true,
      },
      {
        source: "/room-suites/vvip",
        destination: "/ko/room-suites/vvip",
        permanent: true,
      },
      {
        source: "/the-helia/about",
        destination: "/ko/the-helia/about",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
