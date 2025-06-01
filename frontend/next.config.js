/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      // ⚠️ ignore ESLint errors during production builds
      ignoreDuringBuilds: true,
    },
    typescript: {
      // ⚠️ ignore type‐checking errors during production builds
      ignoreBuildErrors: true,
    },
  };
  
  module.exports = nextConfig;
  