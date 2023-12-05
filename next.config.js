/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  
}
module.exports = {
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }

    return config
  }
}
module.exports = nextConfig
let fs;
if (typeof window === 'undefined') {
  // This code will be executed in a Node.js environment
  fs = require('fs');
} else {
  // This code will be executed in a browser environment
  fs = null; // or provide a suitable alternative for browser-based file operations
}
