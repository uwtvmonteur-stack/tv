import Breadcrumbs from "@/components/Breadcrumbs";
import { PageHero, Section } from "@/components/sections";
import { SITE } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata = {
  ...pageMeta({
    title: "Privacyverklaring",
    description: `Hoe ${SITE.name} omgaat met de gegevens die u via het offerteformulier, telefoon of e-mail met ons deelt.`,
    path: "/privacy",
  }),
  robots: { index: false, follow: true },
};

const secties: { h2: string; p: string[] }[] = [
  {
    h2: "Welke gegevens wij verwerken",
    p: [
      // Dit moet kloppen met wat het formulier werkelijk vraagt. Hier stond
      // "postcode en huisnummer" en "WhatsApp": het formulier vraagt sinds de
      // omzetting naar offertes om een volledig adres, en WhatsApp staat uit.
      "Wanneer u een offerte aanvraagt via het formulier, per telefoon of per e-mail, verwerken wij de gegevens die u zelf opgeeft: uw naam, telefoonnummer, eventueel uw e-mailadres, uw straat en huisnummer, postcode en plaats, en de omschrijving van het werk.",
    ],
  },
  {
    h2: "Waarvoor wij ze gebruiken",
    p: [
      "Uitsluitend om u een offerte te sturen, contact met u op te nemen over uw aanvraag, de afspraak in te plannen en de werkzaamheden uit te voeren en te factureren. Wij gebruiken uw gegevens niet voor nieuwsbrieven of andere marketing en verkopen ze nooit aan derden.",
    ],
  },
  {
    h2: "Bewaartermijn",
    p: [
      "Aanvragen die niet tot een opdracht leiden verwijderen wij binnen zes maanden. Gegevens van uitgevoerde opdrachten bewaren wij zolang de wettelijke fiscale bewaarplicht dat vereist.",
    ],
  },
  {
    h2: "Statistieken",
    p: [
      "Om te begrijpen hoe bezoekers onze website gebruiken kunnen wij geanonimiseerde bezoekstatistieken bijhouden. Wij plaatsen geen advertentie- of trackingcookies zonder uw toestemming.",
    ],
  },
  {
    h2: "Uw rechten",
    p: [
      `U heeft het recht om uw gegevens in te zien, te laten corrigeren of te laten verwijderen. Stuur daarvoor een e-mail naar ${SITE.email} of bel ${SITE.phoneDisplay}. Wij reageren binnen vijf werkdagen.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        breadcrumbs={
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Privacyverklaring", href: "/privacy" },
            ]}
          />
        }
        eyebrow="Privacy"
        title="Privacyverklaring"
        lead="Kort en duidelijk: wij gebruiken uw gegevens alleen om uw offerte te maken en het werk uit te voeren."
      />

      <Section>
        <div className="prose-tv max-w-prose">
          {secties.map((s) => (
            <section key={s.h2}>
              <h2>{s.h2}</h2>
              {s.p.map((tekst) => (
                <p key={tekst}>{tekst}</p>
              ))}
            </section>
          ))}
          <p className="text-sm text-ink-500">
            {SITE.name}
            {SITE.kvk ? ` · KvK ${SITE.kvk}` : ""}
            {SITE.btw ? ` · BTW ${SITE.btw}` : ""} · {SITE.email} ·{" "}
            {SITE.phoneDisplay}
          </p>
        </div>
      </Section>
    </>
  );
}
