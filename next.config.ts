import type { NextConfig } from 'next';

const serverActionOrigins = [
  'localhost:3000',
  process.env.APP_ORIGIN?.replace(/^https?:\/\//, ''),
  process.env.VERCEL_PROJECT_PRODUCTION_URL,
  process.env.VERCEL_URL,
].filter((origin): origin is string => Boolean(origin));

const nextConfig: NextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '*.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.ggpht.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: '**.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'familiainternacional.cl',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    serverActions: {
      allowedOrigins: serverActionOrigins,
    },
  },
};

export default nextConfig;
