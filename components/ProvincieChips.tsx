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
    "rounded-full bg-sunk px-4 py-2 font-medium border border-hairline transition-colors duration-300 ease-out hover:bg-sunk";
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
