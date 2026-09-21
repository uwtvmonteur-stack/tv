import Reveal from "@/components/Reveal";
import { BezelCard, Eyebrow, Stars } from "@/components/ui";
import { reviews, type Review } from "@/lib/content";
import { SITE } from "@/lib/site";

/**
 * Compacte, horizontaal scrollbare reviews-sectie voor alle pagina's — zonder plaatsnamen.
 * De score komt uit `SITE.reviews` (één bron) en wordt een link zodra `SITE.reviews.url`
 * is ingevuld, zodat bezoekers de beoordelingen zelf kunnen controleren.
 *
 * Zonder `items` toont de sectie de gemengde set; dienstpagina's geven hun eigen
 * set mee uit `reviewsPerDienst`, zodat de beoordelingen over die dienst gaan.
 */
export default function Reviews({
  title = "Waarom klanten ons aanraden",
  items = reviews,
}: {
  title?: string;
  items?: Review[];
}) {
  return (
    <section className="px-2 md:px-6">
      <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-cream-deep px-4 py-14 md:px-8 md:py-16">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
              <div className="max-w-md">
                <Eyebrow>Reviews</Eyebrow>
                <h2 className="mt-4 font-display text-2xl font-bold tracking-tight md:text-3xl">
                  {title}
                </h2>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                  {SITE.reviews.score}
                </span>
                <div className="flex flex-col gap-0.5">
                  <Stars className="h-3.5 w-3.5" />
                  {SITE.reviews.url ? (
                    <a
                      href={SITE.reviews.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-ink-soft underline decoration-amber-600/50 underline-offset-2 hover:text-ink"
                    >
                      {SITE.reviews.count} beoordelingen op Google
                    </a>
                  ) : (
                    <span className="text-xs text-ink-soft">
                      {SITE.reviews.count} beoordelingen
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <ul className="mt-8 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {items.map((review) => (
                <li
                  key={review.name}
                  className="w-[270px] shrink-0 snap-start md:w-[300px]"
                >
                  <BezelCard
                    className="h-full"
                    innerClassName="flex h-full flex-col gap-4 p-6"
                  >
                    <Stars className="h-3.5 w-3.5" />
                    <p className="text-sm leading-relaxed">
                      &ldquo;{review.quote}&rdquo;
                    </p>
                    <p className="mt-auto text-sm font-semibold">
                      {review.name}
                    </p>
                  </BezelCard>
                </li>
              ))}
            </ul>
          </Reveal>

          <p className="mt-3 text-xs text-ink-soft">
            Sleep of scroll voor meer beoordelingen →
          </p>
        </div>
      </div>
    </section>
  );
}
