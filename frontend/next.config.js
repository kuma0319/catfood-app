/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  //外部から画像取得用(環境変数でドメイン指定)
  images: {
    domains: [process.env.NEXT_PUBLIC_IMAGE_DOMAINS],
  },
};
