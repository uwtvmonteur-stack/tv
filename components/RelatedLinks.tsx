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
      className="mt-16 flex flex-wrap items-center gap-x-3 gap-y-2"
    >
      <span className="font-display font-bold text-ink-950">{label}</span>
      {items.map(([href, linkLabel]) => (
        <Link
          key={href}
          href={href}
          // Pil van 44px hoog: dit is op een telefoon een rij kleine
          // doelen naast elkaar, en die moeten elk met een duim te raken zijn.
          className="inline-flex min-h-11 items-center rounded-full bg-white px-4 text-sm font-semibold text-ink-800 ring-1 ring-ink-200 transition duration-200 hover:bg-accent-50 hover:text-accent-800 hover:ring-accent-200"
        >
          {linkLabel}
        </Link>
      ))}
    </nav>
  );
}
