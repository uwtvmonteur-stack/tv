import { Icon, Stars } from "@/components/Icon";
import { Section, SectionHeading } from "@/components/sections";
import { reviews, type Review } from "@/lib/content";
import { SITE } from "@/lib/site";

/**
 * De beoordelingen, horizontaal te verschuiven — zonder plaatsnamen.
 * De score komt uit `SITE.reviews` (één bron) en wordt een link zodra
 * `SITE.reviews.url` is ingevuld, zodat bezoekers de beoordelingen zelf kunnen
 * controleren.
 *
 * Zonder `items` toont de sectie de gemengde set; dienstpagina's geven hun
 * eigen set mee uit `reviewsPerDienst`, zodat de beoordelingen over die dienst
 * gaan.
 *
 * Dit blok brengt zijn eigen `<Section>` mee: een pagina zet `<Reviews />`
 * tussen twee witte secties en wikkelt hem niet nog eens in een sectie.
 */
export default function Reviews({
  title = "Waarom klanten ons aanraden",
  items = reviews,
}: {
  title?: string;
  items?: Review[];
}) {
  return (
    <Section tone="surface" labelledBy="reviews-kop">
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-6">
        <SectionHeading id="reviews-kop" eyebrow="Reviews" title={title} />
        <div className="card flex shrink-0 items-center gap-4 px-5 py-4">
          <span className="font-display text-h2 font-bold text-ink-950 tabular">
            {SITE.reviews.score}
          </span>
          <span className="flex flex-col gap-1">
            <Stars className="size-4" />
            {SITE.reviews.url ? (
              <a
                href={SITE.reviews.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link text-sm"
              >
                {SITE.reviews.count} beoordelingen op Google
              </a>
            ) : (
              <span className="text-sm text-ink-600">
                {SITE.reviews.count} beoordelingen
              </span>
            )}
          </span>
        </div>
      </div>

      {/* `tabIndex` en `aria-label` zijn geen sierwerk: zonder die twee is een
          scrollbare rij met een toetsenbord niet te verschuiven en kondigt een
          schermlezer alleen een naamloze lijst aan. Niet weghalen. */}
      <ul
        tabIndex={0}
        aria-label="Reviews van klanten, horizontaal te verschuiven"
        // `pb-5`: een rij met `overflow-x` snijdt ook verticaal af, en zonder
        // die ruimte valt de schaduw onder de kaarten weg.
        className="mt-10 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-5 sm:mx-0 sm:px-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((review) => (
          // `w-64`/`w-72` (272 en 306px) in plaats van losse pixelmaten: een
          // kaart moet smal genoeg zijn dat de volgende er half naast staat,
          // anders ziet een bezoeker niet dat er meer is.
          <li key={review.name} className="w-64 shrink-0 snap-start sm:w-72">
            <article className="card flex h-full flex-col gap-4 p-6">
              <Stars className="size-4" />
              <p className="text-ink-700">&ldquo;{review.quote}&rdquo;</p>
              <p className="mt-auto font-display font-bold text-ink-950">
                {review.name}
              </p>
            </article>
          </li>
        ))}
      </ul>

      <p className="flex items-center gap-1.5 text-sm text-ink-500">
        Sleep of scroll voor meer beoordelingen
        <Icon name="arrow-right" className="size-4" />
      </p>
    </Section>
  );
}
