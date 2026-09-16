import type { Metadata } from "next";
import { SITE } from "./site";
import { provincies } from "./steden";
import type { FaqItem } from "./content";

export function absUrl(path: string) {
  return path === "/" ? SITE.url : `${SITE.url}${path}`;
}

/** Uniforme metadata per pagina: title, description, canonical en Open Graph. */
export function pageMeta({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    twitter: { card: "summary_large_image" },
    openGraph: {
      title,
      description,
      url: absUrl(path),
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
  };
}

export function itemListJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function serviceJsonLd({
  name,
  description,
  path,
  areaServed,
  offers,
}: {
  name: string;
  description: string;
  path: string;
  areaServed?: object | object[];
  offers?: { name: string; price: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absUrl(path),
    provider: { "@id": `${SITE.url}/#bedrijf` },
    areaServed:
      areaServed ?? provincies.map((p) => ({ "@type": "State", name: p.naam })),
    ...(offers
      ? {
          offers: offers.map((offer) => ({
            "@type": "Offer",
            name: offer.name,
            price: offer.price,
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            url: absUrl("/prijzen"),
          })),
        }
      : {}),
  };
}
