/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://hackaton.corpoeureka.net/:path*', // Reemplaza con tu URL de la API
      },
    ];
  },
};

export default nextConfig;