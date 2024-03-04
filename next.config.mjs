/** @type {import('next').NextConfig} */

// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// });
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bikzxtxhkpzavgevuqmb.supabase.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};
export default nextConfig;

// module.exports = withBundleAnalyzer(nextConfig);
