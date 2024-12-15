/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei', '@react-three/rapier'],
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
