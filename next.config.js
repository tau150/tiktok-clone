/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["yt3.ggpht.com", "images.pexels.com", "lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
