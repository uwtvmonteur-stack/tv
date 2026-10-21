import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import Faq from "@/components/Faq";
import InlineCta from "@/components/InlineCta";
import JsonLd from "@/components/JsonLd";
import RelatedLinks from "@/components/RelatedLinks";
import RichText from "@/components/RichText";
import { CtaBand, PageHero, Section } from "@/components/sections";
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
      <div className="prose-tv mt-4">
        {sectie.alineas.map((alinea) => (
          <p key={alinea.slice(0, 40)}>
            <RichText>{alinea}</RichText>
          </p>
        ))}
      </div>

      {sectie.lijst && (
        <ul className="mt-6 space-y-3">
          {sectie.lijst.map((punt) => (
            <li
              key={punt.slice(0, 40)}
              className="rounded-xl bg-surface px-5 py-4 text-ink-700 ring-1 ring-ink-200"
            >
              <RichText>{punt}</RichText>
            </li>
          ))}
        </ul>
      )}

      {sectie.tabel && (
        // overflow-x-auto houdt een brede tabel leesbaar op een telefoon
        // zonder de hele pagina horizontaal te laten schuiven.
        <div className="mt-6 overflow-x-auto rounded-2xl ring-1 ring-ink-200">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-ink-950 text-white">
                {sectie.tabel.kop.map((cel) => (
                  <th key={cel} scope="col" className="px-5 py-3 font-semibold">
                    {cel}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sectie.tabel.rijen.map((rij) => (
                <tr key={rij[0]} className="border-t border-ink-200 bg-white">
                  {rij.map((cel, i) => (
                    <td
                      key={cel}
                      className={`px-5 py-3 align-top ${
                        i === 0 ? "font-semibold text-ink-950" : "text-ink-600"
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
      )}
    </section>
  );
}

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

      <PageHero
        breadcrumbs={
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Kennisbank", href: "/kennisbank" },
              { name: artikel.titel, href: `/kennisbank/${artikel.slug}` },
            ]}
          />
        }
        eyebrow={artikel.eyebrow}
        title={artikel.titel}
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          {/* Het korte antwoord bovenaan: wie alleen dit leest is al geholpen,
              en wie doorleest weet waar het heen gaat. */}
          <p className="rounded-2xl bg-surface px-7 py-7 text-lead text-ink-800 ring-1 ring-ink-200 md:px-9">
            {artikel.antwoord}
          </p>

          <article className="mt-14">
            {artikel.secties.map((sectie) => (
              <Sectie key={sectie.kop} sectie={sectie} />
            ))}
          </article>

          <InlineCta
            title="Liever niet zelf boren?"
            text="Onze monteur bepaalt het wandtype, rekent het draagvermogen na en hangt uw tv waterpas op. U krijgt het bedrag vooraf in een vrijblijvende offerte, inclusief voorrijkosten en btw."
            label={artikel.dienst.label}
          />

          <h2 className="mt-16 text-h2">Veelgestelde vragen</h2>
          <div className="mt-8">
            <Faq items={artikel.faq} />
          </div>

          <RelatedLinks
            label="Verder lezen:"
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
            <Link href="/contact" className="link">
              Stel hem via het contactformulier
            </Link>
            , dan krijgt u binnen enkele uren antwoord van een monteur.
          </p>
        </div>
      </Section>

      <CtaBand title="Tv ophangen? Vraag uw offerte aan" />
    </>
  );
}
