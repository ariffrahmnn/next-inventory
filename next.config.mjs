/** @type {import('next').NextjsConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true, // Gunakan true jika ingin redirect permanen (308)
      },
    ];
  },
};

export default nextConfig;