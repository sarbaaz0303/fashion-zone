/** @type {import('next').NextConfig} */
const nextConfig = {
  // compiler: {
  //   removeConsole:
  //     process.env.NODE_ENV === 'production'
  //       ? {
  //           exclude: ['error'],
  //         }
  //       : false,
  // },
  experimental: {
    ppr: true,
  },
};

export default nextConfig;
