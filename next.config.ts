import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Дозволяємо SVG, оскільки DiceBear працює з ними
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**', 
      },
      {
        protocol: 'https',
        hostname: 'ftp.goit.study', 
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        pathname: '/9.x/**', 
      },
    ],
  },
};

export default nextConfig;