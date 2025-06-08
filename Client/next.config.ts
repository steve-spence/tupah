import type { NextConfig } from "next";
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  /* config options here */
  // pageExtensions: ['mdx'],
  transpilePackages: ['next-mdx-remote'],
};

// Add markdown plugins here !!!! Turbopack does not support .md files yet !!!!!
const withMDX = createMDX({

})

// Combine MDX config and Next.js config
export default nextConfig;
