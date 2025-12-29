/**
 * ESM Next.js configuration for Vercel.
 * Keep only supported options: disable TypeScript build error blocking.
 */
/** @type {import('next').NextConfig} */
const config = {
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default config;
