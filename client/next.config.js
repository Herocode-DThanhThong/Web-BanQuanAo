/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    BASE_URL: "YOUR_BASE_URL",
    BASE_URL_BACKEND: "YOUR_BASE_URL_BACKEND",
    MONGODB_URL: "YOUR_MONGODB_URL",
    TOKEN_NAME: "YOUR_TOKEN_NAME",
    ACCESS_TOKEN_SECRET: `123123321313`,
    REFRESH_TOKEN_SECRET: `1231312321321311`,
    CLOUD_UPLOAD_PRESET: "YOUR_CLOUD_UPLOAD_PRESET",
    CLOUD_NAME: "YOUR_CLOUD_NAME",
    CLOUD_API: "YOUR_CLOUD_API",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
