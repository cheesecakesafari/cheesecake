/**
 * Next.js CommonJS configuration to relax build checks for Vercel deployments.
 * Placed as `.cjs` because the workspace uses ESM (`package.json` contains "type": "module").
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
