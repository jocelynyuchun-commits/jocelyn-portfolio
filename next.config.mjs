/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        has: [{ type: 'host', value: 'untuckit-dls-productcard.vercel.app' }],
        destination: '/product-card',
        permanent: false,
      },
    ]
  },
}
export default nextConfig
