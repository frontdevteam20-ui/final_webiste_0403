/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  trailingSlash: true,
  
  // Enable static export for Firebase Hosting
  output: 'export',
  distDir: 'out',
  
  // Image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Production optimizations
  poweredByHeader: false,
  generateEtags: true,
};

export default config;