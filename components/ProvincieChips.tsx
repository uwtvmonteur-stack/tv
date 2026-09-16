import Link from "next/link";
import { provincies } from "@/lib/steden";

/**
 * Gedeelde rij provincie-links als chips. `prefix` bepaalt het label
 * (bijv. "Tv ophangen" → "Tv ophangen Zuid-Holland").
 */
export default function ProvincieChips({
  prefix,
  withOverview = false,
}: {
  prefix: string;
  withOverview?: boolean;
}) {
  const chip =
    "rounded-full bg-ink/[0.04] px-4 py-2 font-medium ring-1 ring-ink/5 transition-colors duration-300 ease-fluid hover:bg-ink/10";
  return (
    <div className="mt-6 flex flex-wrap gap-2.5 text-sm">
      {provincies.map((provincie) => (
        <Link
          key={provincie.slug}
          href={`/werkgebied/${provincie.slug}`}
          className={chip}
        >
          {prefix} {provincie.naam}
        </Link>
      ))}
      {withOverview && (
        <Link href="/werkgebied" className={chip}>
          Volledig werkgebied
        </Link>
      )}
    </div>
  );
}
