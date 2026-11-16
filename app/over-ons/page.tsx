import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import Reviews from "@/components/Reviews";
import {
  Aanvraagsectie,
  Cijferrij,
  Hero,
  Kop,
  Vinkjes,
  Vlak,
} from "@/components/sections";
import { BELOFTE, stats } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Over ons — eigen, verzekerde monteurs",
  description:
    "Eigen, verzekerde monteurs in loondienst die in Zuid-Holland, Noord-Holland, Utrecht en Noord-Brabant tv's ophangen, aansluiten en instellen.",
  path: "/over-ons",
});

const waarden = [
  "Eigen monteurs in loondienst — geen wisselende onderaannemers",
  "Volledig verzekerd — ook uw kostbaarste OLED-tv",
  "Afspraak is afspraak: we bellen 30 minuten voor aankomst",
  "Netjes werken: beschermmateriaal neer, afval mee terug",
];

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

export default function OverOnsPage() {
  return (
    <>
      <Hero
        kruimels={
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Over ons", href: "/over-ons" },
            ]}
          />
        }
        bovenkop="Over ons"
        // Niet "Nederland": wij rijden in vier provincies, en dat staat zo in
        // het schema, in de voettekst en op het werkgebied. Eén kop die het
        // land belooft maakt de rest van de site ongeloofwaardig in plaats van
        // groter.
        titel="De monteurs die uw tv ophangen en aansluiten"
        inleiding="Uw TV Monteur begon met één busje en één overtuiging: een tv hoort gewoon perfect opgehangen te worden — half werk bestaat niet. Inmiddels rijdt er een heel team op uit, met bij elke klus diezelfde standaard."
        beeld="/images/monteur-aan-het-werk.webp"
        beeldAlt="Monteur van Uw TV Monteur hangt een televisie waterpas aan de wand"
        merk="Eigen monteurs in loondienst"
      />

      <Vlak toon="wit" labelledBy="verhaal-kop">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div>
            <Kop
              id="verhaal-kop"
              bovenkop="Hoe wij werken"
              titel="Eén standaard, bij elke klus"
            />
            <div className="artikel mt-7">
              <p>
                Wat begon als een eenmanszaak groeide uit tot een hecht team van
                ervaren tv-monteurs, actief in Zuid-Holland, Noord-Holland,
                Utrecht en Noord-Brabant. Ze volgen onze interne opleiding en
                werken allemaal volgens dezelfde standaard: waterpas, veilig en
                zonder zichtbare kabels.
              </p>
              <p>
                We geloven in duidelijke afspraken: u weet het bedrag voordat
                wij beginnen, zonder kleine lettertjes. Niet omdat het moet,
                maar omdat we vinden dat het zo hoort.
              </p>
            </div>
          </div>
          <Vinkjes items={waarden} className="text-lg lg:mt-20" />
        </div>
      </Vlak>

      {/* Geen `korrel relative` meer op dit vlak: `toon="donker"` zet het
          raster zelf al als laag erbinnen, dus werd het hier twee keer over
          elkaar getekend — merkbaar sterker dan op de homepage. */}
      <Vlak toon="donker" labelledBy="cijfers-kop">
        <Kop
          id="cijfers-kop"
          donker
          bovenkop="In cijfers"
          titel="Waar dat inmiddels op uitkomt"
        />
        <div className="mt-12">
          <Cijferrij items={stats} donker />
        </div>
      </Vlak>

      <Reviews toon="wit" />

      {/* Het formulier staat op de pagina zelf en niet achter een knop naar
          /contact. Deze pagina stuurde bezoekers weg op het moment dat ze
          besloten hadden, en dat is de stap waar verkeer het makkelijkst
          verdwijnt. Twee van deze pagina's kregen betaald verkeer zonder dat
          er een manier was om een afspraak te maken. */}
      <Aanvraagsectie
        toon="oppervlak"
        titel="Ervaar het zelf"
        tekst="Vertel kort wat er moet gebeuren en waar u woont. Wij bellen u binnen enkele uren om het tarief te bevestigen."
        beloftes={aanvraagBelofte}
      >
        <ContactForm
          variant="over-ons"
          berichtLabel="Wat moet er gebeuren?"
          berichtPlaceholder="Bijvoorbeeld: tv ophangen en alles aansluiten."
        />
      </Aanvraagsectie>
    </>
  );
}
