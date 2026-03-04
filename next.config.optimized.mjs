/** @type {import('next').NextConfig} */
const optimizedConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  
  // Fast build optimizations
  compress: false, // Disable compression during build
  swcMinify: true, // Use SWC instead of Terser (faster)
  
  // Simplified image optimization for faster builds
  images: {
    unoptimized: true, // Disable image optimization for faster builds
    // Remove heavy optimizations for build speed
  },
  
  // Disable webpack optimizations for faster builds
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        minimize: false, // Disable minification for faster builds
        splitChunks: false, // Disable code splitting for faster builds
      };
    }
    
    // Reduce webpack processing
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname),
    };
    
    return config;
  },
  
  // Disable experimental features for stability
  experimental: {
    optimizeCss: false,
    optimizePackageImports: [],
  },
  
  // Production optimizations (can be enabled later)
  poweredByHeader: false,
  generateEtags: true,
};

export default optimizedConfig;
