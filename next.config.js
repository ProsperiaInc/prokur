/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api-dev.prosperia.com/v1/:path*' // Proxy to Backend
      }
    ]
  }
}

module.exports = nextConfig
