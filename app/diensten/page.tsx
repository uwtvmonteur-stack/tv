import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import Reviews from "@/components/Reviews";
import { Icon } from "@/components/Icon";
import {
  CheckList,
  CtaBand,
  HeroActions,
  PageHero,
  Section,
  SectionHeading,
  ServiceCards,
  StatRow,
} from "@/components/sections";
import { diensten, dienstHref, stats, usps } from "@/lib/content";
import { absUrl, itemListJsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Onze diensten aan huis",
  description:
    "Alle diensten van uw tv monteur aan huis: tv ophangen, complete tv installatie, soundbar en home-cinema aansluiten, kabels wegwerken en tv instellen. Tv ophangen vanaf €99, vaste prijs per formaat, vaak binnen 24 uur.",
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
          /contact en niet naar een #offerte dat op deze pagina niet bestaat. */}
      <PageHero
        breadcrumbs={
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Diensten", href: "/diensten" },
            ]}
          />
        }
        eyebrow="Onze diensten"
        title="Onze diensten aan huis"
        lead="Van tv ophangen en complete installatie tot soundbar aansluiten en tv instellen — kies hieronder de dienst die bij u past. U krijgt vooraf een vrijblijvende offerte, altijd inclusief voorrijkosten en btw."
      >
        <HeroActions href="/contact" />
      </PageHero>

      <Section tone="surface" labelledBy="diensten-kop">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="diensten-kop"
            eyebrow="Alle diensten"
            title="Kies de dienst die bij u past"
            lead="Vier diensten, één monteur en één afspraak. Drie ervan hebben een vast bedrag; het ophangen krijgt altijd een offerte, omdat uw wand en uw kabels het werk bepalen."
          />
          <Link href="/prijzen" className="btn-ghost shrink-0">
            Alle tarieven
            <Icon name="arrow-right" className="size-4" />
          </Link>
        </div>
        <div className="mt-12">
          <ServiceCards />
        </div>
      </Section>

      <Section labelledBy="waarom">
        <SectionHeading
          id="waarom"
          center
          eyebrow="Waarom Uw TV Monteur?"
          title="Dezelfde afspraken, bij welke dienst u ook kiest"
          lead="Wat de klus ook is: u weet het bedrag voordat wij langskomen, en u betaalt pas als het werkt."
        />
        <CheckList
          items={usps}
          className="mx-auto mt-12 grid max-w-4xl gap-3 text-lg sm:grid-cols-2"
        />
        <div className="mt-16">
          <StatRow items={stats} />
        </div>
      </Section>

      {/* Eigen sectie met eigen achtergrond; staat hier tussen twee witte. */}
      <Reviews />

      <CtaBand
        tone="white"
        title="Weet u niet welke dienst u nodig heeft?"
        text="Beschrijf kort wat er bij u moet gebeuren. Wij kiezen de juiste dienst erbij en zetten het bedrag binnen enkele uren op papier, vrijblijvend."
      />
    </>
  );
}
