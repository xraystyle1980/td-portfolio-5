/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: 'asset/resource'
    })
    config.module.rules.push({
      test: /gsap-trial\/.*\.js$/,
      use: ['script-loader']
    })
    return config
  }
}

module.exports = nextConfig
