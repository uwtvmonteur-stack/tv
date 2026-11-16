import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import JsonLd from "@/components/JsonLd";
import Reviews from "@/components/Reviews";
import { Icon } from "@/components/Icon";
import {
  Aanvraagsectie,
  Bewijsrij,
  Hero,
  HeroKnoppen,
  Kop,
  Vlak,
} from "@/components/sections";
import { BELOFTE } from "@/lib/content";
import { provincies, stedenInProvincie } from "@/lib/steden";
import { absUrl, itemListJsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Ons werkgebied — waar wij tv's ophangen",
  description:
    "Onze tv monteurs zijn actief in Zuid-Holland, Noord-Holland, Utrecht en Noord-Brabant. Bekijk alle steden waar we aan huis komen.",
  path: "/werkgebied",
});

/**
 * De regels naast het formulier. Vier is genoeg: wie hier is aangekomen heeft
 * de pagina gelezen en hoeft niet nog zes keer overtuigd te worden.
 */
const aanvraagBelofte = [
  BELOFTE.vrijblijvend,
  BELOFTE.inclusief,
  BELOFTE.geenAanbetaling,
  BELOFTE.avondWeekend,
];

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

      <Hero
        kruimels={
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Werkgebied", href: "/werkgebied" },
            ]}
          />
        }
        bovenkop="Werkgebied"
        titel="Wij hangen uw tv op bij u in de buurt"
        inleiding="Onze monteurs zijn dagelijks onderweg in Zuid-Holland, Noord-Holland, Utrecht en Noord-Brabant — daar helpen we u vaak al binnen 24 uur."
        beeld="/images/aan-de-deur.webp"
        beeldAlt="Monteur van Uw TV Monteur wordt begroet aan de voordeur van een Nederlandse rijtjeswoning"
      >
        {/* Deze pagina draagt zelf geen formulier, dus wijst de knop naar
            /contact en niet naar #afspraak. */}
        <HeroKnoppen href="/contact" />
      </Hero>

      {/* `kopNiveau={2}`: deze sectie heeft geen eigen kop, dus zijn de vier
          kopjes in dit blok de eerste koppen na de h1 van de hero. */}
      <Vlak toon="wit">
        <Bewijsrij kopNiveau={2} />
      </Vlak>

      <Vlak toon="oppervlak" labelledBy="provincies">
        <Kop
          id="provincies"
          bovenkop="Vier provincies"
          titel="Kies uw provincie of uw plaats"
          tekst="Elke plaats heeft zijn eigen pagina, met wat de bebouwing daar betekent voor het ophangen van uw tv."
        />

        {/* Dit is de spilpagina naar alle 32 plaatspagina's: de volledige
            lijst staat hier dus uitgeschreven en niet achter "bekijk meer".
            De ankertekst is de titel van de doelpagina ("Tv ophangen in
            <plaats>"), want een link die alleen de plaatsnaam draagt zegt
            Google niet waarvoor die plaats staat. */}
        <ul className="mt-12 grid gap-x-12 gap-y-12 lg:grid-cols-2">
          {provincies.map((provincie) => (
            <li
              key={provincie.slug}
              // Een `paneel` en niet een blok onder een dikke lijn: dezelfde
              // vier provincies staan op de homepage als witte kaarten, en
              // twee vormen voor één begrip is precies wat een site
              // onverzorgd maakt.
              className="komt-op paneel flex flex-col p-6 sm:p-7"
            >
              {/* De provincienaam is geen link, de regel onderaan wel: twee
                  links naar dezelfde pagina in één blok verdelen de waarde
                  van die link over twee ankerteksten. */}
              <h3 className="text-h3">{provincie.naam}</h3>
              <p className="mt-3 max-w-prose text-ink-600">{provincie.intro}</p>
              <ul className="mt-5 grid gap-x-10 sm:grid-cols-2">
                {stedenInProvincie(provincie.slug).map((stad) => (
                  <li key={stad.slug} className="border-b border-ink-100">
                    <Link
                      href={`/tv-ophangen/${stad.slug}`}
                      className="inline-flex min-h-11 items-center text-sm text-ink-700 underline-offset-4 hover:text-amber-800 hover:underline"
                    >
                      Tv ophangen in {stad.naam}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={`/werkgebied/${provincie.slug}`}
                className="mt-auto flex min-h-11 items-center gap-1.5 pt-6 font-semibold text-amber-800 hover:text-amber-700"
              >
                Tv ophangen in {provincie.naam}
                <Icon name="arrow-right" className="size-4" />
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-14 max-w-2xl text-ink-600">
          Staat uw woonplaats er niet tussen? Ons werkgebied groeit
          voortdurend en voor grotere klussen rijden we graag een stukje
          verder.{" "}
          <Link href="/contact" className="verwijzing">
            Neem contact op
          </Link>{" "}
          en we kijken wat er mogelijk is.
        </p>
      </Vlak>

      {/* Brengt zijn eigen sectie met achtergrond mee. */}
      <Reviews toon="wit" />

      {/* Het formulier staat op de pagina zelf en niet achter een knop naar
          /contact. Deze pagina stuurde bezoekers weg op het moment dat ze
          besloten hadden, en dat is de stap waar verkeer het makkelijkst
          verdwijnt. Twee van deze pagina's kregen betaald verkeer zonder dat
          er een manier was om een afspraak te maken. */}
      <Aanvraagsectie
        toon="oppervlak"
        titel="Een monteur uit uw eigen regio"
        tekst="Vertel kort wat er moet gebeuren en geef uw postcode op. Wij bellen u binnen enkele uren om de afspraak te bevestigen."
        beloftes={aanvraagBelofte}
      >
        <ContactForm
          variant="werkgebied"
          berichtLabel="Wat moet er gebeuren?"
          berichtPlaceholder="Bijvoorbeeld: 55 inch tv ophangen in de woonkamer."
        />
      </Aanvraagsectie>
    </>
  );
}
