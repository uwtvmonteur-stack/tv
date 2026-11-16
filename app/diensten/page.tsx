import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import Reviews from "@/components/Reviews";
import { Icon } from "@/components/Icon";
import {
  Cijferrij,
  Dienstenlijst,
  Hero,
  HeroKnoppen,
  Kop,
  Slotoproep,
  Vinkjes,
  Vlak,
} from "@/components/sections";
import { diensten, dienstHref, stats, usps } from "@/lib/content";
import { absUrl, itemListJsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Onze diensten aan huis",
  description:
    "Ophangen, tv installatie, soundbar aansluiten, kabels wegwerken en tv hulp aan huis. Vaste prijs per klus, vaak al binnen 24 uur een afspraak.",
  path: "/diensten",
});

export default function DienstenPage() {
  const itemList = itemListJsonLd(
    diensten.map((dienst) => ({
      name: dienst.naam,
      url: absUrl(dienstHref(dienst)),
    })),
  );

  return (
    <>
      <JsonLd data={itemList} />

      {/* Een overzichtspagina draagt geen formulier: wie hier is heeft nog niet
          gekozen wát hij wil aanvragen. De primaire knop gaat daarom naar
          /contact en niet naar een #afspraak dat op deze pagina niet bestaat. */}
      <Hero
        beeld="/images/hero-woonkamer.webp"
        beeldAlt="Woonkamer met een wandgemonteerde televisie, soundbar en weggewerkte kabels"
        kruimels={
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Diensten", href: "/diensten" },
            ]}
          />
        }
        bovenkop="Onze diensten"
        titel="Onze diensten aan huis"
        inleiding="Van tv ophangen en complete installatie tot soundbar aansluiten en tv instellen — kies hieronder de dienst die bij u past. U kent het tarief vooraf, altijd inclusief voorrijkosten en btw."
      >
        <HeroKnoppen href="/contact" />
      </Hero>

      <Vlak toon="wit" labelledBy="diensten-kop">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Kop
            id="diensten-kop"
            bovenkop="Alle diensten"
            titel="Kies de dienst die bij u past"
            tekst="Vier diensten, één monteur en één afspraak. Elke dienst heeft een vast bedrag; bij het ophangen hangt het alleen van het formaat van uw tv af."
          />
          <Link href="/prijzen" className="knop-lijn shrink-0">
            Alle tarieven
            <Icon name="arrow-right" className="size-4" />
          </Link>
        </div>
        <div className="mt-12">
          {/* `kopNiveau` 2: op deze pagina zijn de diensten de onderwerpen
              van de pagina en niet een opsomming binnen een ander verhaal. */}
          <Dienstenlijst kopNiveau={2} />
        </div>
      </Vlak>

      <Vlak toon="oppervlak" labelledBy="waarom">
        <Kop
          id="waarom"
          bovenkop="Waarom Uw TV Monteur?"
          titel="Dezelfde afspraken, bij welke dienst u ook kiest"
          tekst="Wat de klus ook is: u weet het bedrag voordat wij langskomen, en u betaalt pas als het werkt."
        />
        <Vinkjes
          items={usps}
          className="mt-10 grid max-w-4xl gap-3.5 text-lg sm:grid-cols-2"
        />
        <div className="mt-16">
          <Cijferrij items={stats} />
        </div>
      </Vlak>

      {/* Eigen sectie met eigen achtergrond. */}
      <Reviews toon="wit" />

      <Slotoproep toon="oppervlak"
        titel="Weet u niet welke dienst u nodig heeft?"
        tekst="Beschrijf kort wat er bij u moet gebeuren. Wij kiezen de juiste dienst erbij en zetten het bedrag binnen enkele uren op papier, vrijblijvend."
      />
    </>
  );
}
