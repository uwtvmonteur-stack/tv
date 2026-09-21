import type { Metadata } from "next";
import Link from "next/link";
import PlanLanding from "@/components/PlanLanding";
import { priceCards, type FaqItem } from "@/lib/content";
import { absUrl } from "@/lib/seo";
import { SITE } from "@/lib/site";
import heroFoto from "@/public/images/dienst-tv-ophangen.jpg";

// Testvariant naast /tv-ophangen: korter en boekingsgericht, met het formulier
// direct in beeld. Canonical wijst naar de originele pagina en de route staat
// niet in de sitemap, zodat Google dit niet als dubbele content behandelt.

export const metadata: Metadata = {
  title: "Tv Laten Ophangen aan Huis — Plan uw Afspraak",
  description: `Tv laten ophangen door een ervaren monteur aan huis. Vaste prijs vanaf ${priceCards[0].price} incl. voorrijkosten en btw. Kies zelf uw dag en dagdeel, wij bevestigen binnen enkele uren.`,
  alternates: { canonical: "/tv-ophangen" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Tv laten ophangen aan huis — plan uw afspraak",
    description: `Vaste prijs vanaf ${priceCards[0].price}, inclusief voorrijkosten en btw. Kies zelf uw dag en dagdeel.`,
    url: absUrl("/tv-ophangen-plannen"),
    siteName: SITE.name,
    locale: "nl_NL",
    type: "website",
  },
};

const faqItems: FaqItem[] = [
  {
    q: "Wat kost het ophangen van een tv?",
    a: `Een vaste prijs op basis van het schermformaat: ${priceCards[0].price} tot 43 inch, ${priceCards[1].price} van 44 t/m 65 inch en ${priceCards[2].price} vanaf 65 inch. Altijd inclusief voorrijkosten en btw, zonder verrassingen achteraf.`,
  },
  {
    q: "Hoe snel hoor ik iets en wanneer kan de monteur komen?",
    a: "Na uw aanvraag nemen wij binnen enkele uren contact met u op om het moment te bevestigen. De monteur kan er vaak al binnen een dag zijn — ook 's avonds en in het weekend, zonder toeslag.",
  },
  {
    q: "Heb ik zelf een beugel nodig?",
    a: "Wij verkopen zelf geen beugels, maar regelen er op aanvraag een voor u. Geef door welke tv u heeft, dan ligt de juiste beugel klaar. Heeft u er al een? Dan monteren we die gewoon.",
  },
  {
    q: "Wanneer betaal ik?",
    a: "Pas na afloop, als uw tv hangt en alles werkt. Geen aanbetaling. Betalen kan per pin of betaalverzoek; zakelijke klanten kunnen op factuur betalen.",
  },
  {
    q: "Kan mijn tv op elke muur?",
    a: "Vrijwel altijd. Steen, beton en hout zijn nooit een probleem. Bij gipsplaat of holle wanden gebruiken we speciale bevestigingen en controleren we vooraf het draagvermogen.",
  },
];

export default function TvOphangenPlannenPage() {
  return (
    <PlanLanding
      variant="tv-ophangen-plannen"
      eyebrow="Tv ophangen aan huis · heel Nederland"
      titel="Tv laten ophangen?"
      titelAccent="Kies uw moment, wij doen de rest."
      intro="Laat uw tv ophangen door een ervaren monteur: waterpas aan de muur, kabels netjes weggewerkt en alles aangesloten — u hoeft zelf niets te doen. U geeft alleen door wanneer het u uitkomt; wij bevestigen binnen enkele uren."
      zekerheden={[
        "Ervaren monteurs, volledig verzekerd werk",
        "Waterpas opgehangen, kabels netjes weggewerkt",
        "Vaste prijs vooraf — geen verrassingen achteraf",
        "Ook 's avonds en in het weekend, zonder toeslag",
      ]}
      formulierTitel="Plan uw afspraak"
      formulierIntro="Geef door wanneer het u schikt. Wij bevestigen binnen enkele uren — en u zit nergens aan vast."
      submitLabel="Plan mijn afspraak"
      stappenTitel="Tv laten ophangen in 3 stappen"
      stappen={[
        "Kies uw dag en dagdeel",
        "Vertel kort wat er moet gebeuren",
        "Wij bevestigen binnen enkele uren",
      ]}
      inbegrepenTitel="Wat is inbegrepen bij het ophangen van uw tv?"
      inbegrepenIntro="Eén vaste prijs voor het complete werk. De monteur komt met al het montagemateriaal en is gemiddeld binnen een uur klaar."
      inbegrepen={[
        "Advies over de beste plek, hoogte en het juiste beugeltype",
        "Controle van het draagvermogen van uw muur",
        "De beugel waterpas en stevig monteren",
        "De tv ophangen en exact waterpas afstellen",
        "Tv en randapparatuur aansluiten en testen",
        "Kabels netjes wegwerken en het boorafval meenemen",
      ]}
      prijsTitel="Wat kost tv laten ophangen?"
      prijsIntro="De prijs voor tv ophangen hangt alleen af van het schermformaat — voorrijkosten en btw zitten er altijd in. Wat we vooraf afspreken, is wat u betaalt. Geen uurtarief, geen meerwerk achteraf."
      prijzen={priceCards.map((kaart) => ({
        label: kaart.size,
        prijs: kaart.price,
        sub: "eenmalig, incl. voorrijkosten en btw",
        featured: kaart.featured,
      }))}
      prijsNoot={
        <>
          Kabels wegwerken in een kabelgoot kan erbij.{" "}
          <Link
            href="/prijzen"
            className="font-semibold text-ink underline decoration-amber-600/50 underline-offset-4"
          >
            Bekijk alle prijzen
          </Link>
          . Wij hangen tv&apos;s op in heel Nederland — van Rotterdam en Amsterdam tot
          Utrecht, Eindhoven en alles daartussenin. Elke muur en elke beugel: vast,
          kantelbaar of draaibaar.
        </>
      }
      reviewsTitel="Klanten over het ophangen van hun tv"
      faqTitel="Veelgestelde vragen over tv ophangen"
      faqItems={faqItems}
      image={heroFoto}
      imageAlt="Monteur is bezig met een tv ophangen: de televisie hangt waterpas aan de woonkamermuur"
      service={{
        naam: "Tv ophangen",
        omschrijving:
          "Tv laten ophangen aan huis met een vaste prijs — zelf uw dag en dagdeel kiezen.",
        pad: "/tv-ophangen",
      }}
    />
  );
}
