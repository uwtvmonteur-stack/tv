import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata = {
  ...pageMeta({
    title: "Privacyverklaring",
    description: `Hoe ${SITE.name} omgaat met de gegevens die u via het afspraakformulier, telefoon of e-mail met ons deelt.`,
    path: "/privacy",
  }),
  robots: { index: false, follow: true },
};

const secties: { h2: string; p: string[] }[] = [
  {
    h2: "Welke gegevens wij verwerken",
    p: [
      "Wanneer u een afspraak aanvraagt via het formulier, per telefoon, WhatsApp of e-mail, verwerken wij de gegevens die u zelf opgeeft: uw naam, telefoonnummer, e-mailadres, postcode en huisnummer en de inhoud van uw bericht.",
    ],
  },
  {
    h2: "Waarvoor wij ze gebruiken",
    p: [
      "Uitsluitend om contact met u op te nemen over uw aanvraag, de afspraak in te plannen en de werkzaamheden uit te voeren en te factureren. Wij gebruiken uw gegevens niet voor nieuwsbrieven of andere marketing en verkopen ze nooit aan derden.",
    ],
  },
  {
    h2: "Bewaartermijn",
    p: [
      "Aanvragen die niet tot een opdracht leiden verwijderen wij binnen zes maanden. Gegevens van uitgevoerde opdrachten bewaren wij zolang de wettelijke (fiscale) bewaarplicht dat vereist.",
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
    <main>
      <PageHeader
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Privacyverklaring", href: "/privacy" },
        ]}
        eyebrow="Privacy"
        title="Privacyverklaring"
        intro="Kort en duidelijk: wij gebruiken uw gegevens alleen om uw afspraak te regelen en uit te voeren."
      />
      <section className="mx-auto w-full max-w-3xl px-4 py-10 md:px-8">
        <Reveal immediate>
          <div className="flex flex-col gap-10">
            {secties.map((s) => (
              <div key={s.h2}>
                <h2 className="font-display text-2xl font-bold tracking-tight">
                  {s.h2}
                </h2>
                {s.p.map((tekst) => (
                  <p key={tekst} className="mt-3 leading-relaxed text-ink-soft">
                    {tekst}
                  </p>
                ))}
              </div>
            ))}
            <p className="text-sm text-ink-soft">
              {SITE.name}
              {SITE.kvk ? ` · KvK ${SITE.kvk}` : ""} · {SITE.email} ·{" "}
              {SITE.phoneDisplay}
            </p>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
