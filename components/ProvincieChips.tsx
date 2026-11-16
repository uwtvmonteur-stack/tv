import Link from "next/link";
import { provincies } from "@/lib/steden";

/**
 * Gedeelde rij provincie-links. `prefix` bepaalt het label (bijvoorbeeld
 * "Tv ophangen" wordt "Tv ophangen Zuid-Holland").
 *
 * De vorm staat in `pil-klik` en niet hier. Hierboven stond een klassenreeks
 * met daarbovenop een commentaar dat beweerde dat dit rechthoekig met een
 * echte rand was — terwijl de code al een afgeronde pil met een ring
 * tekende. Dat commentaar beschreef de vorige generatie en sprak de regel
 * eronder tegen.
 *
 * `min-h-11` (uit `pil`) is hier geen detail: dit zijn vier tot vijf links
 * naast en onder elkaar, en dat is precies de situatie waarin een duim
 * ernaast mikt.
 */
export default function ProvincieChips({
  prefix,
  withOverview = false,
}: {
  prefix: string;
  withOverview?: boolean;
}) {
  return (
    <div className="mt-6 flex flex-wrap gap-2.5">
      {provincies.map((provincie) => (
        <Link
          key={provincie.slug}
          href={`/werkgebied/${provincie.slug}`}
          className="pil-klik"
        >
          {prefix} {provincie.naam}
        </Link>
      ))}
      {withOverview && (
        <Link href="/werkgebied" className="pil-klik">
          Volledig werkgebied
        </Link>
      )}
    </div>
  );
}
