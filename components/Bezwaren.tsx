import Reveal from "./Reveal";
import { Eyebrow } from "./ui";
import { bezwaren } from "@/lib/content";

/**
 * De vier bezwaren, open en uitgeschreven vlak vóór de prijs.
 *
 * Bewust géén accordeon zoals de FAQ onderaan de pagina: wie twijfelt klikt
 * niets open, hij gaat weg. En bewust op deze plek, want een bezwaar dat pas
 * onder de reviews wordt weggenomen komt te laat voor wie al besloten had het
 * niet te doen.
 *
 * Dit blok heeft de merkenbalk vervangen die hier eerst stond. Die balk liet
 * tien merknamen voorbijrollen zonder iets te beantwoorden; de eerste vraag
 * hieronder doet hetzelfde werk ("elk merk, uit elke winkel") en neemt er nog
 * drie bezwaren bij mee.
 */
export default function Bezwaren() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-section md:px-8">
      <Reveal>
        <div className="max-w-2xl">
          <Eyebrow>Voordat u aanvraagt</Eyebrow>
          <h2 className="mt-6 font-display text-step-3 font-bold">
            Vier dingen die u misschien tegenhouden
          </h2>
        </div>
      </Reveal>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2">
        {bezwaren.map((bezwaar, i) => (
          <li key={bezwaar.vraag}>
            <Reveal delay={i * 80} className="h-full">
              <div className="flex h-full flex-col rounded-[1.5rem] bg-white p-7 ring-1 ring-line-strong md:p-8">
                {/* De vraag in de woorden van de bezoeker, tussen
                    aanhalingstekens: dan leest hij zijn eigen gedachte terug en
                    weet hij dat het antwoord eronder voor hem bedoeld is. */}
                <h3 className="font-display text-[1.125rem] leading-snug font-bold">
                  &ldquo;{bezwaar.vraag}&rdquo;
                </h3>
                <p className="mt-3 leading-relaxed text-ink-soft">
                  {bezwaar.antwoord}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
