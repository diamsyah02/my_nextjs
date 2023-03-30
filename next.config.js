/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['tailwindui.com','images.unsplash.com']
  },
  publicRuntimeConfig: {
    apiURL: `http://localhost:3000/api`
  }
}

module.exports = nextConfig
