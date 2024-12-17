/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: 'asset/resource'
    })
    return config
  },
  // Only generate the home page
  generateStaticParams: async () => {
    return [{ path: [''] }]
  }
}

module.exports = nextConfig
