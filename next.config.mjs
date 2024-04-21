/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "*.pexels.com",
      },
      {
        protocol: "https",
        hostname: "*.istockphoto.com",
      },
      {
        protocol: "https",
        hostname: "*.yum.com",
      },
      {
        protocol: "https",
        hostname: "www.dominos.co.in",
      },
    ],
  },
};

export default nextConfig;
