import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import CtaSection from "@/components/CtaSection";
import InlineCta from "@/components/InlineCta";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import RelatedLinks from "@/components/RelatedLinks";
import RichText from "@/components/RichText";
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
    <Reveal>
      <section className="mt-14 first:mt-0">
        <h2 className="font-display text-h2 font-semibold">
          {sectie.kop}
        </h2>
        <div className="mt-4 space-y-4 leading-relaxed text-fg-muted">
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
                className="rounded-md bg-sunk px-5 py-4 text-sm leading-relaxed text-fg-muted border border-hairline"
              >
                <RichText>{punt}</RichText>
              </li>
            ))}
          </ul>
        )}

        {sectie.tabel && (
          // overflow-x-auto houdt een brede tabel leesbaar op een telefoon
          // zonder de hele pagina horizontaal te laten schuiven.
          <div className="mt-6 overflow-x-auto rounded-md border border-hairline">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-inverse text-fg-inverse">
                  {sectie.tabel.kop.map((cel) => (
                    <th key={cel} className="px-5 py-3 font-semibold">
                      {cel}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sectie.tabel.rijen.map((rij) => (
                  <tr
                    key={rij[0]}
                    className="border-t border-hairline bg-white even:bg-sunk"
                  >
                    {rij.map((cel, i) => (
                      <td
                        key={cel}
                        className={`px-5 py-3 align-top ${
                          i === 0 ? "font-medium" : "text-fg-muted"
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
    </Reveal>
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
    <main>
      <JsonLd
        data={artikelJsonLd({
          titel: artikel.titel,
          beschrijving: artikel.beschrijving,
          path: `/kennisbank/${artikel.slug}`,
          datum: artikel.datum,
        })}
      />
      <JsonLd data={faqJsonLd(artikel.faq)} />

      <PageHeader
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Kennisbank", href: "/kennisbank" },
          { name: artikel.titel, href: `/kennisbank/${artikel.slug}` },
        ]}
        eyebrow={artikel.eyebrow}
        title={artikel.titel}
      />

      <div className="mx-auto w-full max-w-3xl px-4 md:px-8">
        {/* Het korte antwoord bovenaan: wie alleen dit leest is al geholpen. */}
        <Reveal immediate>
          <p className="rounded-lg bg-inverse px-7 py-7 text-lg leading-relaxed text-fg-inverse md:px-9">
            {artikel.antwoord}
          </p>
        </Reveal>

        <article className="mt-14">
          {artikel.secties.map((sectie) => (
            <Sectie key={sectie.kop} sectie={sectie} />
          ))}
        </article>

        <InlineCta
          title="Liever niet zelf boren?"
          text="Onze monteur bepaalt het wandtype, rekent het draagvermogen na en hangt uw tv waterpas op. Vaste prijs vooraf, inclusief voorrijkosten en btw."
          label={artikel.dienst.label}
        />

        <Reveal>
          <h2 className="mt-block font-display text-h2 font-semibold">
            Veelgestelde vragen
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-8">
            <Faq items={artikel.faq} />
          </div>
        </Reveal>

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

        <Reveal>
          <p className="mt-10 pb-4 text-sm text-fg-muted">
            Staat uw vraag er niet bij?{" "}
            <Link
              href="/contact"
              className="font-semibold text-fg underline decoration-accent-fg/60 underline-offset-4"
            >
              Stel hem via het contactformulier
            </Link>
            , dan krijgt u binnen enkele uren antwoord van een monteur.
          </p>
        </Reveal>
      </div>

      <CtaSection title="Tv ophangen? Plan direct een afspraak" />
    </main>
  );
}
