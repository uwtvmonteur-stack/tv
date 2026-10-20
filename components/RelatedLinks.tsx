import Link from "next/link";

/** Gedeelde "Ook interessant"-rij met interne links — één bron voor alle dienstpagina's. */
export default function RelatedLinks({
  items,
  label = "Ook interessant:",
}: {
  items: [string, string][];
  label?: string;
}) {
  return (
    <nav
      aria-label="Gerelateerde pagina's"
      className="mt-16 flex flex-wrap items-center gap-2.5 text-sm"
    >
      <span className="font-semibold">{label}</span>
      {items.map(([href, linkLabel]) => (
        <Link
          key={href}
          href={href}
          className="rounded-full bg-sunk px-4 py-2 font-medium border border-hairline transition-colors duration-300 ease-out hover:bg-sunk"
        >
          {linkLabel}
        </Link>
      ))}
    </nav>
  );
}
