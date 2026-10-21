import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { Icon } from "@/components/Icon";
import { CtaBand, PageHero, Section } from "@/components/sections";
import { artikelen } from "@/lib/kennisbank";
import { absUrl, itemListJsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Kennisbank — alles over tv ophangen",
  description:
    "Antwoorden op de vragen die voorafgaan aan het ophangen van een tv: op welke hoogte, welke beugel, welke plug in een gipswand en wanneer u het beter laat doen.",
  path: "/kennisbank",
});

export default function KennisbankPage() {
  return (
    <>
      <JsonLd
        data={itemListJsonLd(
          artikelen.map((artikel) => ({
            name: artikel.titel,
            url: absUrl(`/kennisbank/${artikel.slug}`),
          })),
        )}
      />

      <PageHero
        breadcrumbs={
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Kennisbank", href: "/kennisbank" },
            ]}
          />
        }
        eyebrow="Kennisbank"
        title="Alles wat u vóór het boren wilt weten"
        lead="Een tv ophangen begint met een paar vragen: op welke hoogte, welke beugel, en houdt deze muur het eigenlijk wel? Hier staan de antwoorden, met de maten en rekenregels die onze monteurs zelf gebruiken — ook als de uitkomst is dat u het prima zelf kunt."
      />

      <Section>
        {/* De kop van elk artikel is hier een h2: dit is een overzichtspagina,
            dus elke kaart introduceert een eigen onderwerp. */}
        <ul className="grid gap-5 md:grid-cols-2">
          {artikelen.map((artikel) => (
            <li key={artikel.slug}>
              <Link
                href={`/kennisbank/${artikel.slug}`}
                className="card card-hover group flex h-full flex-col p-7 md:p-8"
              >
                <span className="text-2xs font-semibold tracking-[0.12em] text-accent-700 uppercase">
                  {artikel.eyebrow}
                </span>
                <h2 className="mt-3 text-h3">{artikel.titel}</h2>
                <p className="mt-3 grow text-ink-600">{artikel.antwoord}</p>
                <span className="mt-6 flex items-center gap-1.5 font-semibold text-accent-700">
                  Lees het antwoord
                  <Icon
                    name="arrow-right"
                    className="size-4 transition group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand
        title="Liever gewoon laten doen?"
        text="Onze monteur bepaalt het wandtype, rekent het draagvermogen na en hangt uw tv waterpas op. U krijgt het bedrag vooraf in een vrijblijvende offerte."
      />
    </>
  );
}
