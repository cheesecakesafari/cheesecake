/**
 * Next.js configuration to relax build checks for Vercel deployments.
 * This disables ESLint and TypeScript checks during build.
 * Use with caution — it's safer to fix issues than to ignore them.
 */
/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};
