import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyBar from "@/components/StickyBar";
import Analytics from "@/components/Analytics";
import JsonLd from "@/components/JsonLd";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE } from "@/lib/site";
import { provincies } from "@/lib/steden";
import { tarieven } from "@/lib/content";
import { offerCatalogJsonLd } from "@/lib/seo";
import "./globals.css";

/**
 * Inter voor de lopende tekst, Plus Jakarta Sans voor de koppen.
 *
 * Dezelfde twee letters als op computerhulpzh.nl, icthulpteam.nl, muaz-it en
 * mahmud. Dat is geen gemakzucht: die sites zijn de maatstaf waar deze site
 * naast komt te staan, en één letterpaar over alle vijf maakt ze herkenbaar
 * als werk van dezelfde hand.
 *
 * Beide zijn variabele fonts met alleen de latijnse subset, en `next/font`
 * host ze zelf — dus geen verbinding naar Google op het kritieke pad en geen
 * layout shift, want de maten worden met een fallback-metriek gelijkgetrokken.
 *
 * Geen `weight`-lijst bij Jakarta: dan haalt Next per gewicht een los
 * bestand op in plaats van het variabele font, en dat is hier zowel zwaarder
 * als een bron van buildfouten gebleken ("queries have exactly one entry").
 * Eén variabel bestand dekt alle gewichten die de koppen gebruiken.
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Uw TV Monteur — tv monteur aan huis",
    template: "%s | Uw TV Monteur",
  },
  description:
    "Tv ophangen, installeren, soundbar aansluiten, kabels wegwerken en tv instellen — aan huis door onze eigen monteurs. Tv ophangen vanaf €99, vaste prijs per formaat, ook 's avonds en in het weekend zonder toeslag.",
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
  themeColor: "#0b0d11",
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
      // Concreet in plaats van "€€": van de laagste losse dienst (kabelgoot,
      // vanaf €39) tot het hoogste vaste tarief (€159 vanaf 65 inch). Hier
      // stond €250. Dat bedrag komt nergens op de site voor, en een bereik dat
      // de prijslijst niet volgt is niet controleerbaar — precies wat dit veld
      // moest oplossen.
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
          opens: SITE.openingstijden.weekdagen.van,
          closes: SITE.openingstijden.weekdagen.tot,
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Saturday", "Sunday"],
          opens: SITE.openingstijden.weekend.van,
          closes: SITE.openingstijden.weekend.tot,
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
      hasOfferCatalog: offerCatalogJsonLd(
        tarieven.map((tarief) => ({
          naam: tarief.naam,
          prijs: tarief.prijs,
        })),
      ),
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
      className={`${inter.variable} ${jakarta.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        <a
          href="#hoofdinhoud"
          // Bijna-zwart met witte letters, niet amber met donkere letters:
          // deze link verschijnt alleen bij toetsenbordfocus, en dan moet hij
          // in één oogopslag van de pagina te onderscheiden zijn. Op een witte
          // pagina is een amberen vlakje dat niet; een donker vlak wel.
          className="sr-only rounded-lg bg-ink-950 px-4 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50"
        >
          Direct naar de inhoud
        </a>
        <JsonLd data={graph} />
        <Header />
        <main id="hoofdinhoud" tabIndex={-1} className="flex-1">
          {children}
        </main>
        <Footer />
        <StickyBar />
        <Analytics />
        {/* Vercel Web Analytics (paginaweergaven) en Speed Insights (Core Web Vitals) */}
        <VercelAnalytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
