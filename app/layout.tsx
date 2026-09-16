import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import StickyCta from "@/components/StickyCta";
import Analytics from "@/components/Analytics";
import JsonLd from "@/components/JsonLd";
import { SITE } from "@/lib/site";
import { provincies } from "@/lib/steden";
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
      address: {
        "@type": "PostalAddress",
        addressCountry: "NL",
      },
      description:
        "Tv monteur aan huis: tv ophangen, tv installatie, kabels wegwerken, soundbar-installatie en tv hulp — door heel Nederland.",
      priceRange: "€€",
      areaServed: [
        ...provincies.map((provincie) => ({
          "@type": "State",
          name: provincie.naam,
        })),
        { "@type": "Country", name: "Nederland" },
      ],
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
      </body>
    </html>
  );
}
