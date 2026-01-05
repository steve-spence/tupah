import type { NextConfig } from "next";
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['next-mdx-remote', 'three'],

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },

  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'tupah.me',
          },
        ],
        destination: 'https://www.tupah.me/:path*',
        permanent: true,
      },
    ]
  },
};


export default nextConfig;
