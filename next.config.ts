import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Loại bỏ output: "export" để support dynamicParams
  // output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    formats: ["image/webp", "image/avif"],
    domains: ["api.escuelajs.co", "picsum.photos"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
