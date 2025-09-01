/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Enable if you're using Next.js 15
    // ppr: false,
  },
  // Ensure API routes are properly handled during build
  generateBuildId: async () => {
    return "build-" + Date.now();
  },
  // Handle edge cases during build
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  // Optimize for Vercel deployment
  output: process.env.NODE_ENV === "production" ? "standalone" : undefined,
};

module.exports = nextConfig;
