<<<<<<< HEAD
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
=======
/** @type {import('next').NextConfig} */
const nextConfig = {
>>>>>>> 7b26177c17c569e716ed3729973e94faf7210b97
  images: {
    remotePatterns: [
      {
        protocol: 'https',
<<<<<<< HEAD
        hostname: 'ik.imagekit.io', // This allows ImageKit
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // This allows Unsplash
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
=======
        hostname: 'ik.imagekit.io',
        port: '',
        pathname: '/qetpsnccs/**',
      },
    ],
  },
}

module.exports = nextConfig
>>>>>>> 7b26177c17c569e716ed3729973e94faf7210b97
