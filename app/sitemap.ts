import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { provincies, steden } from "@/lib/steden";
import { diensten, dienstHref } from "@/lib/content";
import { artikelen } from "@/lib/kennisbank";

/**
 * Per inhoudsgroep de datum waarop die inhoud voor het laatst écht is gewijzigd.
 *
 * Bewust handmatig. Hiervoor stond hier `new Date()`, waardoor elke deploy aan
 * Google meldde dat alle 54 pagina's waren veranderd — ook als er één regel CSS
 * was aangepast. Google gebruikt `lastmod` alleen zolang die aantoonbaar klopt
 * en negeert het veld anders volledig, en dat is precies het signaal waarmee een
 * site met weinig crawlbudget kan sturen welke pagina's opnieuw worden opgehaald.
 *
 * Pas de datum van een groep aan wanneer je de inhoud van die groep wijzigt.
 */
const GEWIJZIGD = {
  /** Home, dienstenoverzicht, prijzen, contact, over ons. */
  kern: "2026-10-10",
  /** De dienstpagina's zelf, inclusief de gipswandpagina. */
  diensten: "2026-10-10",
  /** Stad-, provincie- en werkgebiedpagina's. */
  steden: "2026-10-10",
  kennisbank: "2026-10-10",
  privacy: "2026-09-16",
} as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (
    path: string,
    priority: number,
    gewijzigd: string,
    changeFrequency: "weekly" | "monthly" = "monthly",
  ): MetadataRoute.Sitemap[number] => ({
    url: path === "/" ? SITE.url : `${SITE.url}${path}`,
    lastModified: new Date(gewijzigd),
    changeFrequency,
    priority,
  });

  return [
    entry("/", 1, GEWIJZIGD.kern, "weekly"),
    entry("/diensten", 0.9, GEWIJZIGD.kern),
    ...diensten.map((dienst) =>
      entry(dienstHref(dienst), 0.9, GEWIJZIGD.diensten),
    ),
    entry("/tv-ophangen-gipswand", 0.9, GEWIJZIGD.diensten),
    entry("/prijzen", 0.9, GEWIJZIGD.kern),
    entry("/kennisbank", 0.7, GEWIJZIGD.kennisbank, "weekly"),
    // Per artikel de eigen publicatiedatum: die staat al in lib/kennisbank.ts
    // en is daarmee het enige deel van deze sitemap dat echt per pagina klopt.
    ...artikelen.map((artikel) =>
      entry(`/kennisbank/${artikel.slug}`, 0.6, artikel.datum),
    ),
    entry("/werkgebied", 0.8, GEWIJZIGD.steden, "weekly"),
    ...provincies.map((provincie) =>
      entry(`/werkgebied/${provincie.slug}`, 0.8, GEWIJZIGD.steden),
    ),
    ...steden.map((stad) =>
      entry(`/tv-monteur/${stad.slug}`, 0.7, GEWIJZIGD.steden),
    ),
    entry("/over-ons", 0.5, GEWIJZIGD.kern),
    entry("/contact", 0.8, GEWIJZIGD.kern),
    entry("/privacy", 0.2, GEWIJZIGD.privacy),
  ];
}
