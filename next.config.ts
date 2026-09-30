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
      // De losse testlandingspagina's zijn opgegaan in de dienstpagina's zelf.
      // Deze redirects blijven staan zolang er advertenties, bookmarks of
      // externe links naar de oude URL's kunnen wijzen — zonder dit levert zo'n
      // klik een 404 op en keurt Google de advertentie af.
      {
        source: "/tv-ophangen-plannen",
        destination: "/tv-ophangen",
        statusCode: 301,
      },
      {
        source: "/tv-installatie-plannen",
        destination: "/diensten/tv-installatie",
        statusCode: 301,
      },
      {
        source: "/soundbar-installatie-plannen",
        destination: "/diensten/soundbar-installatie",
        statusCode: 301,
      },
      {
        source: "/tv-hulp-plannen",
        destination: "/diensten/tv-instellen",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
