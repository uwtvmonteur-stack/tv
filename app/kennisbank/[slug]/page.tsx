import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import Faq from "@/components/Faq";
import InlineCta from "@/components/InlineCta";
import ContactForm from "@/components/ContactForm";
import JsonLd from "@/components/JsonLd";
import RelatedLinks from "@/components/RelatedLinks";
import RichText from "@/components/RichText";
import { Aanvraagsectie, Hero, Vlak } from "@/components/sections";
import { BELOFTE } from "@/lib/content";
import { artikelBySlug, artikelen, type ArtikelSectie } from "@/lib/kennisbank";
import { artikelJsonLd, faqJsonLd, pageMeta } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return artikelen.map((artikel) => ({ slug: artikel.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const artikel = artikelBySlug(slug);
  if (!artikel) return {};
  return pageMeta({
    title: artikel.metaTitel,
    description: artikel.beschrijving,
    path: `/kennisbank/${artikel.slug}`,
  });
}

/** Eén sectie: kop, alinea's en optioneel een opsomming of tabel. */
function Sectie({ sectie }: { sectie: ArtikelSectie }) {
  return (
    <section className="mt-14 first:mt-0">
      <h2 className="text-h2">{sectie.kop}</h2>
      <div className="artikel mt-4">
        {sectie.alineas.map((alinea) => (
          <p key={alinea.slice(0, 40)}>
            <RichText>{alinea}</RichText>
          </p>
        ))}
      </div>

      {/* De opsomming als regels tussen haarlijnen in plaats van losse
          blokjes met een ring eromheen. Een ring is een box-shadow en
          verdwijnt in de hoog-contrastmodus van Windows; dan stonden hier
          alinea's zonder enig onderscheid. */}
      {sectie.lijst && (
        <ul className="mt-7 border-t border-ink-200">
          {sectie.lijst.map((punt) => (
            <li
              key={punt.slice(0, 40)}
              className="flex gap-4 border-b border-ink-200 py-4 text-ink-700"
            >
              <span
                aria-hidden="true"
                // amber-400, net als de accentstreep van het korte antwoord
                // verderop op deze pagina en die in `InlineCta`. Stond hier
                // op amber-500 — een tweede tint voor hetzelfde streepje,
                // op dezelfde pagina.
                className="mt-2.5 h-px w-5 shrink-0 bg-amber-400"
              />
              <span>
                <RichText>{punt}</RichText>
              </span>
            </li>
          ))}
        </ul>
      )}

      {sectie.tabel && (
        // Dezelfde vorm als `Prijstabel`: een witte kaart met een
        // bijna-zwarte kopregel. Hier stond een eigen tweede tabelontwerp met
        // een dikke grijze lijn als kopregel, waardoor de site twee soorten
        // tabellen had. `overflow-x-auto` houdt een brede tabel leesbaar op
        // een telefoon zonder de hele pagina horizontaal te laten schuiven.
        <div className="paneel mt-7 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-ink-950">
                  {sectie.tabel.kop.map((cel) => (
                    <th
                      key={cel}
                      scope="col"
                      className="py-3.5 pl-5 pr-4 text-xs font-bold uppercase tracking-[0.14em] text-amber-300 last:pr-5"
                    >
                      {cel}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {sectie.tabel.rijen.map((rij) => (
                  <tr key={rij[0]}>
                    {rij.map((cel, i) => (
                      <td
                        key={cel}
                        className={`py-4 pl-5 pr-4 align-top last:pr-5 ${
                          i === 0
                            ? "font-display font-semibold text-ink-950"
                            : "text-ink-600"
                        }`}
                      >
                        {cel}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}

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

export default async function ArtikelPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artikel = artikelBySlug(slug);
  if (!artikel) notFound();

  const verwanteArtikelen = artikel.verwant
    .map((verwantSlug) => artikelBySlug(verwantSlug))
    .filter((a) => a !== undefined);

  return (
    <>
      <JsonLd
        data={artikelJsonLd({
          titel: artikel.titel,
          beschrijving: artikel.beschrijving,
          path: `/kennisbank/${artikel.slug}`,
          datum: artikel.datum,
        })}
      />
      <JsonLd data={faqJsonLd(artikel.faq)} />

      <Hero
        kruimels={
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Kennisbank", href: "/kennisbank" },
              { name: artikel.titel, href: `/kennisbank/${artikel.slug}` },
            ]}
          />
        }
        bovenkop={artikel.eyebrow}
        titel={artikel.titel}
      />

      <Vlak toon="wit">
        <div className="max-w-3xl">
          {/* Het korte antwoord bovenaan: wie alleen dit leest is al geholpen,
              en wie doorleest weet waar het heen gaat. Een amberen streep
              ernaast in plaats van een vakje eromheen — zo leest het als een
              aanhef en niet als een losse mededeling. */}
          {/* amber-400 en niet amber-500: dezelfde accentstreep staat in
              `InlineCta`, en twee tinten voor één streep zie je zodra beide
              blokken op één pagina staan — wat hier het geval is. */}
          <p className="border-l-4 border-amber-400 pl-6 text-lead text-ink-800">
            {artikel.antwoord}
          </p>

          <article className="mt-14">
            {artikel.secties.map((sectie) => (
              <Sectie key={sectie.kop} sectie={sectie} />
            ))}
          </article>

          <InlineCta
            // Zonder `href` valt `InlineCta` terug op /contact. Dat was juist
            // zolang deze pagina geen formulier had; sinds 16-11-2026 staat
            // het er wel, een halve pagina lager. De enige amberen knop van
            // het artikel stuurde de bezoeker dus van de pagina af.
            href="#afspraak"
            title="Liever niet zelf boren?"
            text="Onze monteur bepaalt het wandtype, rekent het draagvermogen na en hangt uw tv waterpas op. U hoort het bedrag vooraf, inclusief voorrijkosten en btw, en zit nergens aan vast."
            label={artikel.dienst.label}
          />

          <h2 className="mt-16 text-h2">Veelgestelde vragen</h2>
          <div className="mt-8">
            <Faq items={artikel.faq} />
          </div>

          <RelatedLinks
            label="Verder lezen"
            items={[
              ...verwanteArtikelen.map(
                (verwant) =>
                  [`/kennisbank/${verwant.slug}`, verwant.titel] as [
                    string,
                    string,
                  ],
              ),
              [artikel.dienst.href, artikel.dienst.label],
              ["/prijzen", "Prijzen"],
            ]}
          />

          <p className="mt-10 text-sm text-ink-600">
            Staat uw vraag er niet bij?{" "}
            <Link href="#afspraak" className="verwijzing">
              Zet hem in het afspraakformulier
            </Link>
            , dan belt de monteur u erover.
          </p>
        </div>
      </Vlak>

      {/* Het formulier staat op de pagina zelf en niet achter een knop naar
          /contact. Deze pagina stuurde bezoekers weg op het moment dat ze
          besloten hadden, en dat is de stap waar verkeer het makkelijkst
          verdwijnt. Twee van deze pagina's kregen betaald verkeer zonder dat
          er een manier was om een afspraak te maken. */}
      <Aanvraagsectie
        toon="oppervlak"
        titel="Tv ophangen? Maak een afspraak"
        tekst="U heeft het gelezen; wij doen het. Vertel kort wat er moet gebeuren en waar u woont, dan bellen wij u binnen enkele uren."
        beloftes={aanvraagBelofte}
      >
        <ContactForm
          variant="kennisbank-artikel"
          berichtLabel="Wat moet er gebeuren?"
          berichtPlaceholder="Bijvoorbeeld: 55 inch tv ophangen op een gipswand."
        />
      </Aanvraagsectie>
    </>
  );
}
