import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { provincies, steden } from "@/lib/steden";
import { diensten, dienstHref } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const entry = (
    path: string,
    priority: number,
    changeFrequency: "weekly" | "monthly" = "monthly",
  ): MetadataRoute.Sitemap[number] => ({
    url: path === "/" ? SITE.url : `${SITE.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    entry("/", 1, "weekly"),
    entry("/diensten", 0.9),
    ...diensten.map((dienst) => entry(dienstHref(dienst), 0.9)),
    entry("/prijzen", 0.9),
    entry("/werkgebied", 0.8, "weekly"),
    ...provincies.map((provincie) =>
      entry(`/werkgebied/${provincie.slug}`, 0.8),
    ),
    ...steden.map((stad) => entry(`/tv-monteur/${stad.slug}`, 0.7)),
    entry("/over-ons", 0.5),
    entry("/contact", 0.8),
    entry("/privacy", 0.2),
  ];
}
