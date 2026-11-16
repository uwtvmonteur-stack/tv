import { Stars } from "@/components/Icon";
import { Kop, Vlak } from "@/components/sections";
import { SITE } from "@/lib/site";

/**
 * Het beoordelingscijfer. Eén bron: `SITE.reviews`.
 *
 * Hier stonden negen beoordelingen als citaatkaarten. Die zijn er op
 * 16-11-2026 uit gehaald op verzoek van de eigenaar, en dat is de juiste kant
 * op: ze waren verzonnen, inclusief de namen, en stonden op tien tot twaalf
 * pagina's. Verzonnen klantervaringen zijn in strijd met het Google
 * Ads-beleid rond misleiding, en er loopt een Ads-account. Bovendien droeg
 * elke kaart vijf sterren terwijl het gemiddelde 4,9 is — negen keer vijf
 * sterren kan dat cijfer niet opleveren, en zo'n rekenfout is precies het
 * detail waaraan een bezoeker ziet dat iets niet echt is.
 *
 * Wat blijft is het cijfer, met de vindplaats ernaast. Vul
 * `SITE.reviews.url` met de link naar het Google-bedrijfsprofiel: dan is het
 * cijfer na te kijken, en één controleerbaar cijfer weegt zwaarder dan negen
 * citaten die nergens te vinden zijn.
 *
 * Komen er echte beoordelingen, dan horen de kaarten hier terug — met per
 * beoordeling een eigen waardering in plaats van vijf sterren voor iedereen.
 * `Stars` heeft daar de `label`-prop nog voor, en die is er nu niet voor
 * niets blijven staan.
 *
 * Dit blok brengt zijn eigen `<Vlak>` mee: een pagina zet `<Reviews />`
 * tussen twee secties en wikkelt hem niet nog eens in een sectie.
 */
export default function Reviews({
  toon = "oppervlak",
}: {
  /**
   * Dit blok brengt zijn eigen sectie mee, dus moet de pagina kunnen zeggen
   * welke achtergrond er past. Zonder dat stonden er op de homepage twee
   * witte secties tegen elkaar en verdween de scheiding ertussen.
   */
  toon?: "oppervlak" | "wit";
}) {
  return (
    <Vlak toon={toon} labelledBy="reviews-kop">
      <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-8">
        <Kop
          id="reviews-kop"
          bovenkop="Beoordelingen"
          titel="Hoe klanten ons beoordelen"
          tekst={
            SITE.reviews.url
              ? "Dit is het gemiddelde van de beoordelingen op ons Google-bedrijfsprofiel. Via de link leest u ze allemaal na."
              : "Dit is het gemiddelde van de beoordelingen op ons Google-bedrijfsprofiel."
          }
        />
        <div className="paneel flex shrink-0 items-center gap-4 px-5 py-4">
          <span className="cijfers font-display text-prijs font-extrabold text-ink-950">
            {SITE.reviews.score}
          </span>
          <span className="flex flex-col gap-1.5">
            {/* Geen naam: het cijfer staat er links van. */}
            <Stars className="size-4" />
            {SITE.reviews.url ? (
              <a
                href={SITE.reviews.url}
                target="_blank"
                rel="noopener noreferrer"
                className="verwijzing text-sm"
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
    </Vlak>
  );
}
