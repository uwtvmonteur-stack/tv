import Link from "next/link";
import JsonLd from "./JsonLd";
import { absUrl } from "@/lib/seo";

export type Crumb = { name: string; href: string };

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
      <nav aria-label="Kruimelpad" className="text-xs text-ink-soft">
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((crumb, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={crumb.href} className="flex items-center gap-1.5">
                {i > 0 && <span aria-hidden>/</span>}
                {isLast ? (
                  <span aria-current="page" className="font-medium text-ink">
                    {crumb.name}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="transition-colors duration-300 ease-fluid hover:text-ink"
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
