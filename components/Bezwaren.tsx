import { Section, SectionHeading } from "./sections";
import { bezwaren } from "@/lib/content";

/**
 * De vier bezwaren, open en uitgeschreven vlak vóór de prijs.
 *
 * Bewust géén accordeon zoals de FAQ onderaan de pagina: wie twijfelt klikt
 * niets open, hij gaat weg. En bewust op deze plek, want een bezwaar dat pas
 * onder de reviews wordt weggenomen komt te laat voor wie al besloten had het
 * niet te doen.
 */
export default function Bezwaren() {
  return (
    <Section labelledBy="bezwaren-kop">
      <SectionHeading
        id="bezwaren-kop"
        eyebrow="Voordat u aanvraagt"
        title="Vier dingen die u misschien tegenhouden"
      />
      <ul className="mt-12 grid gap-4 sm:grid-cols-2">
        {bezwaren.map((bezwaar) => (
          <li key={bezwaar.vraag} className="h-full">
            <div className="card flex h-full flex-col p-7 md:p-8">
              {/* De vraag in de woorden van de bezoeker, tussen
                  aanhalingstekens: dan leest hij zijn eigen gedachte terug en
                  weet hij dat het antwoord eronder voor hem bedoeld is. */}
              <h3 className="text-h3">&ldquo;{bezwaar.vraag}&rdquo;</h3>
              <p className="mt-3 text-ink-600">{bezwaar.antwoord}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
