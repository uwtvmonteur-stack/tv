import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
  },
  async redirects() {
    return [
      {
        source: "/diensten/tv-ophangen",
        destination: "/tv-ophangen",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
