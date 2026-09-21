import type { Metadata } from "next";
import Link from "next/link";
import PlanLanding from "@/components/PlanLanding";
import { reviewsPerDienst, type FaqItem } from "@/lib/content";
import { absUrl } from "@/lib/seo";
import { SITE } from "@/lib/site";
import heroFoto from "@/public/images/dienst-soundbar.jpg";

// Testvariant naast /diensten/soundbar-installatie: korter en boekingsgericht,
// met het formulier direct in beeld. Canonical wijst naar de originele pagina
// en de route staat niet in de sitemap.

export const metadata: Metadata = {
  title: "Soundbar Laten Installeren — Plan uw Afspraak",
  description:
    "Soundbar laten installeren aan huis: aangesloten via HDMI ARC, afgestemd op uw kamer en getest. Vaste prijs €49 incl. voorrijkosten en btw.",
  alternates: { canonical: "/diensten/soundbar-installatie" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Soundbar laten installeren — plan uw afspraak",
    description:
      "Vaste prijs €49, inclusief voorrijkosten en btw. Kies zelf uw dag en dagdeel.",
    url: absUrl("/soundbar-installatie-plannen"),
    siteName: SITE.name,
    locale: "nl_NL",
    type: "website",
  },
};

const faqItems: FaqItem[] = [
  {
    q: "Wat kost het installeren van een soundbar?",
    a: "Een losse soundbar installeren kost €49, inclusief voorrijkosten en btw. Voor een surround-set of complete home-cinema rekenen we vanaf €79, afhankelijk van het aantal speakers.",
  },
  {
    q: "Hoe snel hoor ik iets en wanneer kan de monteur komen?",
    a: "Na uw aanvraag nemen wij binnen enkele uren contact met u op om het moment te bevestigen. De monteur kan er vaak al binnen een dag zijn — ook 's avonds en in het weekend, zonder toeslag.",
  },
  {
    q: "Werkt een soundbar met elke tv?",
    a: "Vrijwel altijd, ongeacht merk of leeftijd van uw televisie. Zet het merk en type in uw aanvraag, dan kijken we het vooraf voor u na.",
  },
  {
    q: "Stellen jullie ook Dolby Atmos in?",
    a: "Zeker. Bij sets met Dolby Atmos of ander surround-geluid koppelen we de subwoofer en achterspeakers en stemmen we het geluid af op de indeling van uw kamer.",
  },
  {
    q: "Hoe lang duurt het installeren van een soundbar?",
    a: "Een losse soundbar is er meestal binnen 30 tot 45 minuten. Voor een surround-set of home-cinema, inclusief het wegwerken van de kabels, trekken we ruimer de tijd uit.",
  },
  {
    q: "Kunnen jullie de kabels wegwerken?",
    a: "Ja. Kabels wegwerken in een kabelgoot die in uw muurkleur wordt gespoten kan vanaf €39. Volledig in de muur wegwerken doen we op maat — geef het door in uw aanvraag.",
  },
];

export default function SoundbarInstallatiePlannenPage() {
  return (
    <PlanLanding
      variant="soundbar-installatie-plannen"
      eyebrow="Soundbar installeren · aan huis · heel Nederland"
      titel="Soundbar laten installeren?"
      titelAccent="Kies uw moment, wij doen de rest."
      intro="Laat uw soundbar installeren door een ervaren monteur: correct aangesloten op uw tv, kabels netjes weggewerkt en het geluid afgestemd op uw kamer. U geeft alleen door wanneer het u uitkomt; wij bevestigen binnen enkele uren."
      zekerheden={[
        "Ervaren monteurs, volledig verzekerd werk",
        "Aangesloten via HDMI ARC of eARC en getest",
        "Vaste prijs vooraf — geen verrassingen achteraf",
        "Ook 's avonds en in het weekend, zonder toeslag",
      ]}
      formulierTitel="Plan uw afspraak"
      formulierIntro="Geef door wanneer het u schikt. Wij bevestigen binnen enkele uren — en u zit nergens aan vast."
      submitLabel="Plan mijn afspraak"
      berichtLabel="Welke set heeft u?"
      berichtPlaceholder="Bijv. het merk van uw soundbar of surround-set en van uw tv…"
      stappenTitel="Soundbar laten installeren in 3 stappen"
      stappen={[
        "Kies uw dag en dagdeel",
        "Vertel kort welke set u heeft",
        "Wij bevestigen binnen enkele uren",
      ]}
      inbegrepenTitel="Wat is inbegrepen bij het installeren van uw soundbar?"
      inbegrepenIntro="Eén vaste prijs voor het complete werk. De monteur komt voorbereid en laat het geluid horen zoals het bedoeld is."
      inbegrepen={[
        "Soundbar plaatsen of aan de muur monteren",
        "Aansluiten op uw tv via HDMI ARC of eARC",
        "Subwoofer en eventuele achterspeakers koppelen",
        "Geluid afstemmen op de indeling van uw kamer",
        "Bediening via één afstandsbediening instellen",
        "Alles testen, uitleggen en de kabels netjes wegwerken",
      ]}
      prijsTitel="Wat kost een soundbar laten installeren?"
      prijsIntro="Een vaste prijs op basis van uw set, inclusief voorrijkosten en btw. Wat we vooraf afspreken, is wat u betaalt. Geen uurtarief, geen meerwerk achteraf."
      prijzen={[
        {
          label: "Losse soundbar",
          prijs: "€49",
          sub: "eenmalig, incl. voorrijkosten en btw",
          featured: true,
        },
        {
          label: "Surround- of home-cinema-set",
          prijs: "vanaf €79",
          sub: "afhankelijk van het aantal speakers",
        },
      ]}
      prijsNoot={
        <>
          Kabels wegwerken in een kabelgoot kan erbij, vanaf €39.{" "}
          <Link
            href="/prijzen"
            className="font-semibold text-ink underline decoration-amber-600/50 underline-offset-4"
          >
            Bekijk alle prijzen
          </Link>
          . Wij installeren soundbars in heel Nederland — van Rotterdam en Amsterdam tot
          Utrecht, Eindhoven en alles daartussenin.
        </>
      }
      reviewsTitel="Klanten over hun geluidsinstallatie"
      reviewsItems={reviewsPerDienst["soundbar-installatie"]}
      faqTitel="Veelgestelde vragen over soundbar installeren"
      faqItems={faqItems}
      image={heroFoto}
      imageAlt="Geïnstalleerde soundbar onder een wandgemonteerde tv in de woonkamer"
      service={{
        naam: "Soundbar installeren",
        omschrijving:
          "Soundbar, surround-set of home-cinema aan huis aansluiten, afstellen en testen.",
        pad: "/diensten/soundbar-installatie",
      }}
    />
  );
}
