import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import Reviews from "@/components/Reviews";
import { Icon } from "@/components/Icon";
import {
  CtaBand,
  HeroActions,
  PageHero,
  Section,
  SectionHeading,
  TrustBar,
} from "@/components/sections";
import { provincies, stedenInProvincie } from "@/lib/steden";
import { absUrl, itemListJsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Ons werkgebied — waar wij tv's ophangen",
  description:
    "Onze tv monteurs zijn actief in Zuid-Holland, Noord-Holland, Utrecht en Noord-Brabant. Bekijk alle steden waar we aan huis komen.",
  path: "/werkgebied",
});

export default function WerkgebiedPage() {
  const itemList = itemListJsonLd(
    provincies.map((provincie) => ({
      name: `Tv monteur ${provincie.naam}`,
      url: absUrl(`/werkgebied/${provincie.slug}`),
    })),
  );

  return (
    <>
      <JsonLd data={itemList} />

      <PageHero
        breadcrumbs={
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Werkgebied", href: "/werkgebied" },
            ]}
          />
        }
        eyebrow="Werkgebied"
        title="Wij hangen uw tv op bij u in de buurt"
        lead="Onze monteurs zijn dagelijks onderweg in Zuid-Holland, Noord-Holland, Utrecht en Noord-Brabant — daar helpen we u vaak al binnen 24 uur."
      >
        {/* Deze pagina draagt zelf geen formulier, dus wijst de knop naar
            /contact en niet naar #offerte. */}
        <HeroActions href="/contact" />
      </PageHero>

      <Section tone="surface">
        <TrustBar />
      </Section>

      <Section labelledBy="provincies">
        <SectionHeading
          id="provincies"
          eyebrow="Vier provincies"
          title="Kies uw provincie of uw plaats"
          lead="Elke plaats heeft zijn eigen pagina, met wat de bebouwing daar betekent voor het ophangen van uw tv."
        />

        {/* Dit is de spilpagina naar alle 32 plaatspagina's: de volledige
            lijst staat hier dus uitgeschreven en niet achter "bekijk meer".
            De ankertekst is de titel van de doelpagina ("Tv ophangen in
            <plaats>"), want een link die alleen de plaatsnaam draagt zegt
            Google niet waarvoor die plaats staat. */}
        <ul className="mt-12 grid gap-4 lg:grid-cols-2">
          {provincies.map((provincie) => (
            <li key={provincie.slug} className="card flex flex-col p-6 sm:p-8">
              {/* De provincienaam is geen link, de regel onderaan wel: twee
                  links naar dezelfde pagina in één kaart verdelen de waarde
                  van die link over twee ankerteksten. */}
              <h3 className="text-h3">{provincie.naam}</h3>
              <p className="mt-3 text-ink-600">{provincie.intro}</p>
              <ul className="mt-5 grid gap-x-8 sm:grid-cols-2">
                {stedenInProvincie(provincie.slug).map((stad) => (
                  <li key={stad.slug}>
                    <Link
                      href={`/tv-ophangen/${stad.slug}`}
                      className="link inline-flex min-h-11 items-center"
                    >
                      Tv ophangen in {stad.naam}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={`/werkgebied/${provincie.slug}`}
                className="mt-auto flex min-h-11 items-center gap-1.5 pt-6 font-semibold text-accent-700 hover:text-accent-800"
              >
                Tv ophangen in {provincie.naam}
                <Icon name="arrow-right" className="size-4" />
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-12 max-w-2xl text-ink-600">
          Staat uw woonplaats er niet tussen? Ons werkgebied groeit
          voortdurend en voor grotere klussen rijden we graag een stukje
          verder.{" "}
          <Link href="/contact" className="link">
            Neem contact op
          </Link>{" "}
          en we kijken wat er mogelijk is.
        </p>
      </Section>

      {/* Brengt zijn eigen surface-sectie mee; de secties ervoor en erna zijn
          daarom wit. */}
      <Reviews />

      <CtaBand tone="white" href="/contact" />
    </>
  );
}
