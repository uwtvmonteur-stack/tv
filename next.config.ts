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
      // Next genereert het pictogram op /icon.svg, maar browsers en crawlers
      // vragen daarnaast nog altijd /favicon.ico op. Zonder deze regel is dat
      // een 404 bij elke eerste paginaweergave.
      {
        source: "/favicon.ico",
        destination: "/icon.svg",
        statusCode: 301,
      },
      // De losse testlandingspagina's zijn opgegaan in de dienstpagina's zelf.
      // Deze redirects blijven staan zolang er advertenties, bookmarks of
      // externe links naar de oude URL's kunnen wijzen — zonder dit levert zo'n
      // klik een 404 op en keurt Google de advertentie af.
      // De 32 stadpagina's stonden onder /tv-monteur/. In het Nederlands is
      // "tv monteur" vooral een reparatieterm — wie dat zoekt heeft een kapot
      // scherm, geen lege muur. De commerciële zoekopdracht is "tv ophangen
      // [stad]". De pagina's staan nu onder /tv-ophangen/[stad]; deze regel
      // houdt elke oude link, bladwijzer en advertentie heel.
      {
        source: "/tv-monteur/:stad",
        destination: "/tv-ophangen/:stad",
        statusCode: 301,
      },
      {
        source: "/tv-monteur",
        destination: "/werkgebied",
        statusCode: 301,
      },
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
