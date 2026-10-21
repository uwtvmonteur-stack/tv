import Link from "next/link";
import { Icon } from "./Icon";
import JsonLd from "./JsonLd";
import { absUrl } from "@/lib/seo";

export type Crumb = { name: string; href: string };

/**
 * Kruimelpad, inclusief BreadcrumbList-schema.
 *
 * Het pad staat altijd in de `PageHero`, en die is bijna-zwart — dus is dit
 * component licht van kleur en heeft het geen tooninstelling. Een variant
 * voor wit zou een tweede plek zijn waar hetzelfde pad kan afwijken.
 *
 * Het schema zit hier en niet in de pagina, zodat de zichtbare kruimels en
 * de kruimels die Google leest per definitie dezelfde zijn.
 */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absUrl(crumb.href),
    })),
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <nav aria-label="Kruimelpad" className="text-sm">
        <ol className="flex flex-wrap items-center gap-1.5 text-ink-300">
          {items.map((crumb, i) => {
            const laatste = i === items.length - 1;
            return (
              <li key={crumb.href} className="flex items-center gap-1.5">
                {i > 0 && (
                  <Icon
                    name="chevron-down"
                    className="size-3.5 -rotate-90 text-ink-400"
                  />
                )}
                {laatste ? (
                  <span aria-current="page" className="font-semibold text-white">
                    {crumb.name}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="underline-offset-4 transition-colors duration-200 hover:text-white hover:underline"
                  >
                    {crumb.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
