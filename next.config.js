const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? {
            exclude: ['error', 'warn'],
          }
        : false,
  },
  swcMinify: true,
  productionBrowserSourceMaps: false,
  experimental: {
    optimizePackageImports: ['date-fns'],
  },
  webpack: (config, { dev, isServer }) => {
    if (!isServer) {
      // Next always `require`s polyfill-module into the client bundle.
      // Replace it with a no-op when shipping modern-only browserslist targets.
      const polyfillModule = require.resolve(
        'next/dist/build/polyfills/polyfill-module'
      )
      config.resolve.alias = {
        ...config.resolve.alias,
        [polyfillModule]: path.resolve(__dirname, 'lib/empty-polyfill.js'),
      }
    }

    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        minimize: true,
        usedExports: true,
        moduleIds: 'deterministic',
        chunkIds: 'deterministic',
      }
    }

    return config
  },
}

module.exports = nextConfig
