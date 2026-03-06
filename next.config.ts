import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuración para exportación estática
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
