import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import CtaSection from "@/components/CtaSection";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import { IconArrowUpRight } from "@/components/icons";
import { artikelen } from "@/lib/kennisbank";
import { absUrl, itemListJsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Kennisbank — Alles over Tv Ophangen",
  description:
    "Antwoorden op de vragen die voorafgaan aan het ophangen van een tv: op welke hoogte, welke beugel, welke plug in een gipswand en wanneer u het beter laat doen.",
  path: "/kennisbank",
});

export default function KennisbankPage() {
  return (
    <main>
      <JsonLd
        data={itemListJsonLd(
          artikelen.map((artikel) => ({
            name: artikel.titel,
            url: absUrl(`/kennisbank/${artikel.slug}`),
          })),
        )}
      />

      <PageHeader
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Kennisbank", href: "/kennisbank" },
        ]}
        eyebrow="Kennisbank"
        title="Alles wat u vóór het boren wilt weten"
        intro="Een tv ophangen begint met een paar vragen: op welke hoogte, welke beugel, en houdt deze muur het eigenlijk wel? Hier staan de antwoorden, met de maten en rekenregels die onze monteurs zelf gebruiken — ook als de uitkomst is dat u het prima zelf kunt."
      />

      <section className="mx-auto w-full max-w-6xl px-4 py-section md:px-8">
        <ul className="grid gap-5 md:grid-cols-2">
          {artikelen.map((artikel, i) => (
            <li key={artikel.slug}>
              <Reveal delay={i * 60}>
                <Link
                  href={`/kennisbank/${artikel.slug}`}
                  className="group flex h-full flex-col rounded-[2rem] bg-cream-deep/50 p-7 ring-1 ring-line transition-colors duration-300 ease-fluid hover:bg-cream-deep md:p-8"
                >
                  <span className="text-xs font-semibold tracking-wide text-ink-soft uppercase">
                    {artikel.eyebrow}
                  </span>
                  <h2 className="mt-3 font-display text-step-2 font-bold">
                    {artikel.titel}
                  </h2>
                  <p className="mt-3 grow text-sm leading-relaxed text-ink-soft">
                    {artikel.antwoord}
                  </p>
                  <span className="mt-6 flex items-center gap-2 text-sm font-semibold">
                    Lees het antwoord
                    <IconArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 ease-spring group-hover:-translate-y-px group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <CtaSection
        title="Liever gewoon laten doen?"
        text="Onze monteur bepaalt het wandtype, rekent het draagvermogen na en hangt uw tv waterpas op. Vaste prijs vooraf."
      />
    </main>
  );
}
