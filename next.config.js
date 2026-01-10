/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: process.env.NEXT_OUTPUT || undefined,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "saleor-5f11a4761db9.herokuapp.com",
      },
      {
        protocol: "https",
        hostname: "saleor-cms.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "saleor-cms.s3.us-east-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "pub-1de25a6a3db9483aa103360222346a62.r2.dev",
      },
    ],
  },
  experimental: {
    scrollRestoration: true,
  },
};

module.exports = nextConfig;
