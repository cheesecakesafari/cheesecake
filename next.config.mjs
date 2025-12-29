/**
 * ESM Next.js configuration for Vercel.
 * Exported as ESM so it loads when package.json uses "type": "module".
 */
/** @type {import('next').NextConfig} */
const config = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default config;
