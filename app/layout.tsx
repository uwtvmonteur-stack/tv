import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import StickyCta from "@/components/StickyCta";
import Analytics from "@/components/Analytics";
import JsonLd from "@/components/JsonLd";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE } from "@/lib/site";
import { provincies } from "@/lib/steden";
import { addons, priceCards } from "@/lib/content";
import { offerCatalogJsonLd } from "@/lib/seo";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Uw TV Monteur — Tv Ophangen & Installatie aan Huis",
    template: "%s | Uw TV Monteur",
  },
  description:
    "Uw TV Monteur is dé tv monteur aan huis: tv ophangen, complete tv installatie, kabels wegwerken en tv hulp. Vaste prijzen inclusief voorrijkosten en btw, vaak binnen 24 uur.",
  openGraph: {
    siteName: SITE.name,
    locale: "nl_NL",
    type: "website",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Wandgemonteerde tv in een moderne woonkamer",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#191512",
};

const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
      "@id": `${SITE.url}/#bedrijf`,
      name: SITE.name,
      url: SITE.url,
      telephone: SITE.phone,
      email: SITE.email,
      image: `${SITE.url}/og.jpg`,
      // Google gebruikt `logo` voor merkweergave en het kennispaneel; zonder
      // dit veld valt het terug op een willekeurige afbeelding van de pagina.
      logo: `${SITE.url}/logo.svg`,
      vatID: SITE.btw,
      identifier: {
        "@type": "PropertyValue",
        propertyID: "KvK",
        value: SITE.kvk,
      },
      address: {
        "@type": "PostalAddress",
        addressCountry: "NL",
      },
      description:
        "Tv monteur aan huis: tv ophangen, tv installatie, kabels wegwerken, soundbar-installatie en tv hulp in Zuid-Holland, Noord-Holland, Utrecht en Noord-Brabant.",
      // Concreet in plaats van "€€": de laagste losse dienst (kabelgoot, vanaf
      // €39) tot de hoogste (tv vanaf 65 inch ophangen, €159). Google toont dit
      // in het bedrijfspaneel, en een bereik dat de prijslijst volgt is
      // controleerbaar — "€€" zegt een bezoeker niets.
      priceRange: "€39–€159",
      // Bewust alleen de vier provincies waar we daadwerkelijk rijden. De
      // eerdere `Country: Nederland` sprak dat tegen: twee tegenstrijdige
      // gebieden in één schema laten Google geen servicegebied bepalen, en het
      // klopte niet meer met de site, waar "heel Nederland" overal weg is.
      areaServed: provincies.map((provincie) => ({
        "@type": "State",
        name: provincie.naam,
      })),
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "21:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Saturday", "Sunday"],
          opens: "09:00",
          closes: "17:00",
        },
      ],
      // Los van `telephone` hierboven: Google gebruikt het losse veld voor de
      // belknop en dit object voor het kennispaneel, inclusief de taal waarin
      // we te woord staan.
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: SITE.phone,
        email: SITE.email,
        areaServed: "NL",
        availableLanguage: "nl",
      },
      // Precies wat de FAQ op /prijzen belooft, niet meer.
      paymentAccepted: "Pin, Tikkie, betaalverzoek, factuur (zakelijk)",
      currenciesAccepted: "EUR",
      // Het volledige aanbod met prijzen, op élke pagina. Tot nu toe stonden de
      // tarieven alleen in het Service-schema van /prijzen, waardoor Google de
      // diensten aan die ene pagina koppelde in plaats van aan het bedrijf.
      hasOfferCatalog: offerCatalogJsonLd([
        ...priceCards.map((card) => ({
          naam: `Tv ophangen ${card.size.replace(/^Voor tv's /, "")}`,
          prijs: card.price,
        })),
        ...addons,
      ]),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      inLanguage: "nl-NL",
      publisher: { "@id": `${SITE.url}/#bedrijf` },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="nl"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="grain min-h-full flex flex-col">
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('reveal-on')",
          }}
        />
        <a href="#hoofdinhoud" className="skip-link">
          Direct naar inhoud
        </a>
        <JsonLd data={graph} />
        <Nav />
        <div id="hoofdinhoud" tabIndex={-1}>
          {children}
        </div>
        <Footer />
        <StickyCta />
        <Analytics />
        {/* Vercel Web Analytics (paginaweergaven) en Speed Insights (Core Web Vitals) */}
        <VercelAnalytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
