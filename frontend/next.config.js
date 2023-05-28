/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  //外部から画像取得用
  images: {
    // remotePatterns: [
    //   {
    //     hostname: "localhost",
    //     pathname: "/rails/active_storage/**",
    //     port: "3010",
    //     protocol: "http",
    //   },
    // ],
    domains: ["localhost"],
  },
  nextConfig,
};
