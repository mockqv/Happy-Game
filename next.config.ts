// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.rawg.io', // Domínio das imagens da API RAWG
      },
      {
        protocol: 'https',
        hostname: 'cdn.pandascore.co', // Domínio das imagens da API PandaScore
      },
    ],
  },
};

export default nextConfig;