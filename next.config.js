/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  compiler: {
    // Remove unnecessary polyfills for modern browsers
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // SWC minification is enabled by default in Next.js 13+
  // This ensures maximum compression for JS and CSS
  swcMinify: true,
  // Optimize production builds (disable source maps to reduce size)
  productionBrowserSourceMaps: false,
  // Webpack optimizations for better compression
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Production optimizations for maximum compression
      config.optimization = {
        ...config.optimization,
        minimize: true,
        usedExports: true,
        sideEffects: false,
        // Tree shaking
        moduleIds: 'deterministic',
        chunkIds: 'deterministic',
      }
    }
    return config
  },
}

module.exports = nextConfig

