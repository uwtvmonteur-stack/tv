import type { Metadata } from "next";
import Link from "next/link";
import PlanLanding from "@/components/PlanLanding";
import { reviewsPerDienst, type FaqItem } from "@/lib/content";
import { absUrl } from "@/lib/seo";
import { SITE } from "@/lib/site";
import heroFoto from "@/public/images/dienst-tv-installatie.jpg";

// Testvariant naast /diensten/tv-installatie: korter en boekingsgericht, met
// het formulier direct in beeld. Canonical wijst naar de originele pagina en de
// route staat niet in de sitemap.

export const metadata: Metadata = {
  title: "Tv Laten Installeren aan Huis — Plan uw Afspraak",
  description:
    "Tv laten installeren aan huis: aansluiten, zenders, wifi en apps instellen, met uitleg. Vaste prijs €70 incl. voorrijkosten en btw. Kies zelf uw dag en dagdeel.",
  alternates: { canonical: "/diensten/tv-installatie" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Tv laten installeren aan huis — plan uw afspraak",
    description:
      "Vaste prijs €70, inclusief voorrijkosten en btw. Kies zelf uw dag en dagdeel.",
    url: absUrl("/tv-installatie-plannen"),
    siteName: SITE.name,
    locale: "nl_NL",
    type: "website",
  },
};

const faqItems: FaqItem[] = [
  {
    q: "Wat kost een tv installatie aan huis?",
    a: "Eén vaste prijs van €70 voor de complete installatie, inclusief voorrijkosten en btw. Geen uurtarief en geen meerwerk achteraf.",
  },
  {
    q: "Hoe snel hoor ik iets en wanneer kan de monteur komen?",
    a: "Na uw aanvraag nemen wij binnen enkele uren contact met u op om het moment te bevestigen. De monteur kan er vaak al binnen een dag zijn — ook 's avonds en in het weekend, zonder toeslag.",
  },
  {
    q: "Kunnen jullie mijn tv ook ophangen?",
    a: "Ja. Het ophangen aan de muur kan tijdens dezelfde afspraak, vanaf €99 afhankelijk van het schermformaat. Geef het door in uw aanvraag, dan komt de monteur met het juiste materiaal.",
  },
  {
    q: "Installeren jullie ook Netflix en andere streaming-apps?",
    a: "Ja. We installeren de apps en helpen met inloggen. Voor betaalde diensten gebruikt u uw eigen accountgegevens; houd die dus bij de hand.",
  },
  {
    q: "Hoe lang duurt een tv installatie?",
    a: "Een standaardinstallatie duurt gemiddeld ongeveer 90 minuten. Zijn er veel apparaten aan te sluiten, dan trekken we er ruimer de tijd voor uit.",
  },
  {
    q: "Werken jullie met alle tv-merken?",
    a: "Ja — onder meer Samsung, LG, Sony, Philips, TCL, Hisense en Panasonic, en alle systemen zoals Tizen, webOS, Google TV en Roku.",
  },
];

export default function TvInstallatiePlannenPage() {
  return (
    <PlanLanding
      variant="tv-installatie-plannen"
      eyebrow="Tv installatie aan huis · heel Nederland"
      titel="Tv laten installeren?"
      titelAccent="Kies uw moment, wij doen de rest."
      intro="Laat uw nieuwe tv installeren door een ervaren monteur: aangesloten, zenders gezocht, wifi verbonden en uw apps klaargezet — en daarna leggen we rustig uit hoe alles werkt. U geeft alleen door wanneer het u uitkomt; wij bevestigen binnen enkele uren."
      zekerheden={[
        "Ervaren monteurs, volledig verzekerd werk",
        "Zenders, wifi en streaming-apps ingesteld",
        "Vaste prijs vooraf — geen verrassingen achteraf",
        "Ook 's avonds en in het weekend, zonder toeslag",
      ]}
      formulierTitel="Plan uw afspraak"
      formulierIntro="Geef door wanneer het u schikt. Wij bevestigen binnen enkele uren — en u zit nergens aan vast."
      submitLabel="Plan mijn afspraak"
      berichtLabel="Wat moet er geïnstalleerd worden?"
      berichtPlaceholder="Bijv. merk en type van uw tv en welke apparaten aangesloten moeten worden…"
      stappenTitel="Tv laten installeren in 3 stappen"
      stappen={[
        "Kies uw dag en dagdeel",
        "Vertel kort wat er moet gebeuren",
        "Wij bevestigen binnen enkele uren",
      ]}
      inbegrepenTitel="Wat is inbegrepen bij de tv installatie?"
      inbegrepenIntro="Eén vaste prijs voor het complete werk. Na onze afspraak is uw tv volledig gebruiksklaar en weet u hoe alles werkt."
      inbegrepen={[
        "Tv uitpakken en op de juiste plek zetten",
        "Soundbar, decoder, mediaspeler of spelcomputer aansluiten",
        "Zenders zoeken en overzichtelijk sorteren",
        "Tv verbinden met uw wifi",
        "Streaming-apps installeren en inloggen",
        "Beeld en geluid instellen, uitleg en het verpakkingsafval mee",
      ]}
      prijsTitel="Wat kost tv laten installeren?"
      prijsIntro="Eén vaste prijs voor de complete installatie, inclusief voorrijkosten en btw. Wat we vooraf afspreken, is wat u betaalt. Geen uurtarief, geen meerwerk achteraf."
      prijzen={[
        {
          label: "Complete tv installatie",
          prijs: "€70",
          sub: "eenmalig, incl. voorrijkosten en btw",
          featured: true,
        },
      ]}
      prijsNoot={
        <>
          Uw tv ook laten ophangen? Dat kan tijdens dezelfde afspraak, vanaf €99.{" "}
          <Link
            href="/prijzen"
            className="font-semibold text-ink underline decoration-amber-600/50 underline-offset-4"
          >
            Bekijk alle prijzen
          </Link>
          . Wij installeren tv&apos;s in heel Nederland — van Rotterdam en Amsterdam tot
          Utrecht, Eindhoven en alles daartussenin.
        </>
      }
      reviewsTitel="Klanten over hun tv installatie"
      reviewsItems={reviewsPerDienst["tv-installatie"]}
      faqTitel="Veelgestelde vragen over tv installatie"
      faqItems={faqItems}
      image={heroFoto}
      imageAlt="Monteur voert een tv installatie uit: de televisie is aangesloten en wordt ingesteld"
      service={{
        naam: "Tv installatie service",
        omschrijving:
          "Tv laten installeren aan huis: aansluiten, zenders, wifi en apps instellen, met uitleg.",
        pad: "/diensten/tv-installatie",
      }}
    />
  );
}
