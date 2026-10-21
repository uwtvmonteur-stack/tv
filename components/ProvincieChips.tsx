import Link from "next/link";
import { provincies } from "@/lib/steden";

/**
 * Gedeelde rij provincie-links als chips. `prefix` bepaalt het label
 * (bijvoorbeeld "Tv ophangen" wordt "Tv ophangen Zuid-Holland").
 *
 * `min-h-11` is hier geen detail: dit zijn tien tot twaalf links naast en
 * onder elkaar, en dat is precies de situatie waarin een duim ernaast mikt.
 */
export default function ProvincieChips({
  prefix,
  withOverview = false,
}: {
  prefix: string;
  withOverview?: boolean;
}) {
  const chip =
    "inline-flex min-h-11 items-center rounded-full bg-white px-4 font-medium ring-1 ring-ink-300 transition hover:bg-accent-50 hover:ring-accent-300";
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
