import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  // Build sırasında hata kontrolünü gevşetelim
  typescript: {
    ignoreBuildErrors: true,
  },
  // reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dribbble.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/locations',
        destination: '/subeler',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/iletisim',
        permanent: true,
      },
      {
        source: '/story',
        destination: '/hikayemiz',
        permanent: true,
      },
      {
        source: '/highlights',
        destination: '/blog',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
