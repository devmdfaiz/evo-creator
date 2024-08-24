/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  // transpilePackages: ['lucide-react'],
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
      {
        protocol: "https",
        hostname: "cloud.appwrite.io",
      },
    ],
  },
};

export default nextConfig;
