import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
    // AVIF voor wie het kan, webp als terugval. Gemeten op de hero: de
    // webp van 1200px is 36,8 kB; AVIF zit daar volgens de Next-documentatie
    // circa 20% onder. Op een trage 4G-verbinding is dat tientallen
    // milliseconden LCP, en LCP is onderdeel van de kwaliteitsscore in Ads.
    // De eerste aanvraag per variant duurt wel langer, want AVIF-encoding
    // kost meer rekentijd; daarna komt alles uit de cache.
    formats: ["image/avif", "image/webp"],
  },
  /*
   * Drie headers die iets beschermen en niets kosten. Geen volledige CSP:
   * die is op Next met inline scripts bewerkelijk en levert weinig op zolang
   * er geen inhoud van bezoekers wordt getoond. `Permissions-Policy` is hier
   * ceremonie. Deze drie niet: `nosniff` voorkomt dat een browser een
   * geupload bestand als script uitvoert, `Referrer-Policy` houdt het volle
   * pad binnen bij een klik naar buiten, en `frame-ancestors` voorkomt dat
   * iemand het afspraakformulier in zijn eigen pagina inlijst.
   */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
        ],
      },
    ];
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
      // De provincie heet in de data `utrecht-provincie`, omdat de stad Utrecht
      // de slug `utrecht` al bezet. Wie /werkgebied/utrecht intypt of uit een
      // oude link komt, kreeg daardoor een 404 op een adres dat logisch lijkt.
      {
        source: "/werkgebied/utrecht",
        destination: "/werkgebied/utrecht-provincie",
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
