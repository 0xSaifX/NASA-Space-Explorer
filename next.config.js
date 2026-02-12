/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['apod.nasa.gov', 'api.nasa.gov', 'mars.nasa.gov', 'epic.gsfc.nasa.gov'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.nasa.gov',
      },
    ],
  },
}

module.exports = nextConfig
