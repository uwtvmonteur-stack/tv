import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { Icon } from "@/components/Icon";
import { Hero, Slotoproep, Vlak } from "@/components/sections";
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

      <Hero
        beeld="/images/tv-beugel-detail.webp"
        beeldAlt="Detail van een tv-beugel aan de wand"
        kruimels={
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Kennisbank", href: "/kennisbank" },
            ]}
          />
        }
        bovenkop="Kennisbank"
        titel="Alles wat u vóór het boren wilt weten"
        inleiding="Een tv ophangen begint met een paar vragen: op welke hoogte, welke beugel, en houdt deze muur het eigenlijk wel? Hier staan de antwoorden, met de maten en rekenregels die onze monteurs zelf gebruiken — ook als de uitkomst is dat u het prima zelf kunt."
      />

      <Vlak toon="wit">
        {/* De kop van elk artikel is hier een h2: dit is een overzichtspagina,
            dus elk item introduceert een eigen onderwerp.

            Als lijst onder haarlijnen in plaats van een raster kaarten. Het
            antwoord staat al in de aanhef, dus is dit een inhoudsopgave die
            je leest — niet een rij blokjes waaruit je kiest. */}
        <ul className="border-t border-ink-200">
          {artikelen.map((artikel) => (
            <li key={artikel.slug} className="border-b border-ink-200">
              <Link
                href={`/kennisbank/${artikel.slug}`}
                className="komt-op group block py-7 transition-colors duration-200 hover:bg-white"
              >
                <span className="bovenkop">{artikel.eyebrow}</span>
                <h2 className="mt-3 max-w-3xl text-h3 group-hover:text-amber-800">
                  {artikel.titel}
                </h2>
                <p className="mt-3 max-w-prose text-ink-600">
                  {artikel.antwoord}
                </p>
                <span className="mt-5 flex items-center gap-1.5 font-semibold text-amber-800">
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
      </Vlak>

      <Slotoproep toon="oppervlak"
        titel="Liever gewoon laten doen?"
        tekst="Onze monteur bepaalt het wandtype, rekent het draagvermogen na en hangt uw tv waterpas op. U hoort het bedrag vooraf en zit nergens aan vast."
      />
    </>
  );
}
