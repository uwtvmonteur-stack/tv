import type { Metadata } from "next";
import Link from "next/link";
import PlanLanding from "@/components/PlanLanding";
import { type FaqItem } from "@/lib/content";
import { absUrl } from "@/lib/seo";
import { SITE } from "@/lib/site";
import heroFoto from "@/public/images/dienst-tv-instellen.jpg";

// Testvariant naast /diensten/tv-instellen: korter en boekingsgericht, met het
// formulier direct in beeld. Canonical wijst naar de originele pagina en de
// route staat niet in de sitemap.

export const metadata: Metadata = {
  title: "Tv Hulp aan Huis — Plan uw Afspraak",
  description:
    "Tv hulp aan huis bij geen zenders, geen wifi of een app die niet werkt. De monteur lost het op en legt het rustig uit. Vaste prijs €60 incl. voorrijkosten en btw.",
  alternates: { canonical: "/diensten/tv-instellen" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Tv hulp aan huis — plan uw afspraak",
    description:
      "Vaste prijs €60, inclusief voorrijkosten en btw. Kies zelf uw dag en dagdeel.",
    url: absUrl("/tv-hulp-plannen"),
    siteName: SITE.name,
    locale: "nl_NL",
    type: "website",
  },
};

const faqItems: FaqItem[] = [
  {
    q: "Wat kost tv hulp aan huis?",
    a: "De meeste hulpvragen lost onze monteur op voor een vaste prijs van €60, inclusief voorrijkosten en btw. Vooraf afgesproken, geen verrassingen achteraf.",
  },
  {
    q: "Hoe snel hoor ik iets en wanneer kan de monteur komen?",
    a: "Na uw aanvraag nemen wij binnen enkele uren contact met u op om het moment te bevestigen. De monteur kan er vaak al binnen een dag zijn — ook 's avonds en in het weekend, zonder toeslag.",
  },
  {
    q: "Repareren jullie ook kapotte tv's?",
    a: "Nee, wij doen geen hardwarereparaties. We helpen met alles rondom instellingen, zenders, wifi, apps en verbindingen. Is het toestel zelf defect, bijvoorbeeld een kapot scherm, dan verwijzen we u naar de fabrikant of een reparateur.",
  },
  {
    q: "Wat is het verschil met een tv installatie?",
    a: "Tv hulp is voor een tv die u al heeft en waarbij iets niet meer werkt. Heeft u een nieuwe tv die volledig aangesloten en gebruiksklaar gemaakt moet worden? Kies dan de complete tv installatie.",
  },
  {
    q: "Moet ik zelf mijn accounts of wachtwoorden klaar hebben?",
    a: "Handig is het als u de inloggegevens van uw streamingdiensten bij de hand houdt. Verder hoeft u niets voor te bereiden — we lopen alles ter plekke rustig met u door.",
  },
  {
    q: "Werken jullie met alle merken en smart-tv's?",
    a: "Ja. Samsung, LG, Sony, Philips en meer, en alle systemen zoals Tizen, webOS, Google TV en Roku. We vinden in elk menu snel de juiste instelling.",
  },
];

export default function TvHulpPlannenPage() {
  return (
    <PlanLanding
      variant="tv-hulp-plannen"
      eyebrow="Tv hulp aan huis · heel Nederland"
      titel="Tv doet het niet meer?"
      titelAccent="Kies uw moment, wij lossen het op."
      intro="Geen zenders, geen wifi, een app die niet opstart of een afstandsbediening die niet reageert? Onze monteur komt bij u thuis, verhelpt het en legt in gewone taal uit hoe u het zelf houdt. U geeft alleen door wanneer het u uitkomt; wij bevestigen binnen enkele uren."
      zekerheden={[
        "Ervaren monteurs, volledig verzekerd werk",
        "Uitleg in gewone taal — ook prettig voor senioren",
        "Vaste prijs vooraf — geen verrassingen achteraf",
        "Ook 's avonds en in het weekend, zonder toeslag",
      ]}
      formulierTitel="Plan uw afspraak"
      formulierIntro="Geef door wanneer het u schikt en wat er niet lukt. Wij bevestigen binnen enkele uren — en u zit nergens aan vast."
      submitLabel="Plan mijn afspraak"
      stappenTitel="Tv hulp aan huis in 3 stappen"
      stappen={[
        "Kies uw dag en dagdeel",
        "Vertel kort wat er niet lukt",
        "Wij bevestigen binnen enkele uren",
      ]}
      inbegrepenTitel="Waar helpt de monteur bij?"
      inbegrepenIntro="Eén vaste prijs voor het complete bezoek. De monteur komt voorbereid en gaat pas weg als alles weer werkt."
      inbegrepen={[
        "Geen of verkeerde zenders: opnieuw afstemmen en sorteren",
        "Geen wifi of internet: de verbinding herstellen",
        "Netflix, Viaplay of NPO die niet werkt: opnieuw instellen",
        "Afstandsbediening die niet reageert, of een universele instellen",
        "Slecht beeld of geluid: de juiste instellingen terugzetten",
        "Rustige uitleg, net zo lang tot u het zelf kunt",
      ]}
      prijsTitel="Wat kost tv hulp aan huis?"
      prijsIntro="Eén vaste prijs voor het bezoek, inclusief voorrijkosten en btw. Wat we vooraf afspreken, is wat u betaalt. Geen uurtarief, geen meerwerk achteraf."
      prijzen={[
        {
          label: "Tv hulp aan huis",
          prijs: "€60",
          sub: "eenmalig, incl. voorrijkosten en btw",
          featured: true,
        },
      ]}
      prijsNoot={
        <>
          Let op: wij verhelpen instellingen, zenders, wifi en apps — hardwarereparaties
          doen we niet.{" "}
          <Link
            href="/prijzen"
            className="font-semibold text-ink underline decoration-amber-600/50 underline-offset-4"
          >
            Bekijk alle prijzen
          </Link>
          . Wij komen in heel Nederland — van Rotterdam en Amsterdam tot Utrecht,
          Eindhoven en alles daartussenin.
        </>
      }
      reviewsTitel="Klanten over onze hulp aan huis"
      faqTitel="Veelgestelde vragen over tv hulp aan huis"
      faqItems={faqItems}
      image={heroFoto}
      imageAlt="Ingestelde smart-tv met helder beeld na tv hulp aan huis"
      service={{
        naam: "Tv hulp aan huis",
        omschrijving:
          "Tv hulp aan huis bij zenders, wifi, verbinding, apps en instellingen — opgelost en uitgelegd. Geen hardwarereparatie.",
        pad: "/diensten/tv-instellen",
      }}
    />
  );
}
