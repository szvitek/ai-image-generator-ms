/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'aiimagegeneratorap415453.blob.core.windows.net',
        port: '',
        pathname: '/images/*',
      },
    ],
  },
};

module.exports = nextConfig;
