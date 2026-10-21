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

/**
 * Article-schema voor een kennisbankartikel. `headline` is de vraag zoals een
 * bezoeker die stelt; dat is ook het fragment waarop Google het artikel toont.
 */
export function artikelJsonLd({
  titel,
  beschrijving,
  path,
  datum,
}: {
  titel: string;
  beschrijving: string;
  path: string;
  datum: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: titel,
    description: beschrijving,
    url: absUrl(path),
    datePublished: datum,
    dateModified: datum,
    inLanguage: "nl-NL",
    author: { "@id": `${SITE.url}/#bedrijf` },
    publisher: { "@id": `${SITE.url}/#bedrijf` },
    mainEntityOfPage: { "@type": "WebPage", "@id": absUrl(path) },
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
          // Door dezelfde `prijsSpec` als de aanbodcatalogus: "vanaf €89"
          // wordt `minPrice` en niet `price`. Een hard bedrag in een rich
          // result dat afwijkt van de offerte is een reden voor afkeuring,
          // en bovendien een belofte die we niet doen.
          offers: offers.map((offer) => ({
            "@type": "Offer",
            name: offer.name,
            ...prijsSpec(offer.price),
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            url: absUrl("/prijzen"),
          })),
        }
      : {}),
  };
}

/**
 * Prijsnotaties uit `content.ts` ("vanaf €89", "op offerte") omgezet naar
 * een schema.org PriceSpecification.
 *
 * Een "vanaf"-prijs wordt `minPrice` en niet `price`: een platte `price` zou
 * Google een vaste prijs laten tonen die we voor die dienst niet garanderen, en
 * een prijs in een rich result die afwijkt van de pagina is een reden voor
 * afkeuring. Staat er geen bedrag in ("op maat", "op aanvraag"), dan volgt er
 * géén prijsveld — liever geen prijs dan een verzonnen prijs.
 */
function prijsSpec(prijs: string) {
  // Zowel "vanaf €89" en "€49" als een kaal "39" uit een dienstpagina.
  const bedrag = (prijs.match(/€\s*([\d.,]+)/) ?? prijs.match(/^\s*([\d.,]+)\s*$/))?.[1]?.replace(",", ".");
  if (!bedrag) return {};
  return {
    priceSpecification: {
      "@type": "PriceSpecification",
      [/vanaf/i.test(prijs) ? "minPrice" : "price"]: bedrag,
      priceCurrency: "EUR",
      // Sitebreed staat "inclusief voorrijkosten en btw" bij elk tarief.
      valueAddedTaxIncluded: true,
    },
  };
}

/**
 * Dienstencatalogus voor het bedrijfsschema. Hangt onder `hasOfferCatalog` in
 * de layout, zodat élke pagina het volledige aanbod met prijzen meegeeft in
 * plaats van alleen /prijzen — dat is wat Google nodig heeft om de diensten aan
 * het bedrijf te koppelen in plaats van aan losse pagina's.
 */
export function offerCatalogJsonLd(items: { naam: string; prijs: string }[]) {
  return {
    "@type": "OfferCatalog",
    name: "Tv ophangen, installeren en instellen",
    itemListElement: items.map((item) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: item.naam },
      ...prijsSpec(item.prijs),
      availability: "https://schema.org/InStock",
      url: absUrl("/prijzen"),
    })),
  };
}
