import Link from "next/link";
import { Icon } from "@/components/Icon";

/**
 * De 404 staat binnen de layout, dus hij rendert al in de `<main>` daarvan en
 * krijgt hier geen eigen `<main>`.
 *
 * Drie uitwegen en niet meer: terug naar het begin, de dienst waar de meeste
 * bezoekers voor komen, en contact. Een zoekveld of een lijst met alle
 * pagina's zou hier eerlijker lijken, maar wie op een dood adres belandt wil
 * geen inventaris — hij wil één klik die werkt.
 */
export default function NotFound() {
  return (
    <div className="container-x flex min-h-[70svh] flex-col items-center justify-center py-20 text-center">
      <span
        aria-hidden="true"
        className="font-display text-hero font-bold text-ink-200"
      >
        404
      </span>
      <h1 className="mt-4 text-h2">Deze pagina hangt hier niet</h1>
      <p className="lead mt-4 max-w-md">
        De pagina die u zoekt bestaat niet meer. Via een van de knoppen
        hieronder bent u zo weer op weg.
      </p>
      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn-primary">
          Naar de homepage
          <Icon name="arrow-right" className="size-5" />
        </Link>
        <Link href="/tv-ophangen" className="btn-ghost">
          Tv laten ophangen
        </Link>
        <Link href="/contact" className="btn-ghost">
          Contact
        </Link>
      </div>
    </div>
  );
}
