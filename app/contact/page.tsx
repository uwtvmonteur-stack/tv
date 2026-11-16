import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import JsonLd from "@/components/JsonLd";
import Reviews from "@/components/Reviews";
import { Icon } from "@/components/Icon";
import { Hero, Kop, Vlak } from "@/components/sections";
import { SITE } from "@/lib/site";
import { absUrl, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Afspraak aanvragen of contact opnemen",
  description:
    "Vraag vrijblijvend een afspraak aan voor tv ophangen aan huis. Vul het formulier in — wij nemen binnen enkele uren contact met u op.",
  path: "/contact",
});

const vervolgstappen = [
  "Wij bellen u binnen enkele uren om het tarief te bevestigen.",
  "Gaat u akkoord? Dan kiezen we samen een dag en tijd die u schikt — ook 's avonds of in het weekend, zonder toeslag.",
  "De monteur belt een half uur voor aankomst, en u weet de prijs al voordat hij de deur binnenkomt.",
];

export default function ContactPage() {
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: absUrl("/contact"),
    name: "Contact — Uw TV Monteur",
    mainEntity: { "@id": `${SITE.url}/#bedrijf` },
  };

  return (
    <>
      <JsonLd data={contactJsonLd} />
      <Hero
        beeld="/images/familie-kijkt-tv.webp"
        beeldAlt="Gezin kijkt televisie in de woonkamer"
        kruimels={
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Contact", href: "/contact" },
            ]}
          />
        }
        bovenkop="Contact"
        titel="Vraag een afspraak aan"
        inleiding="Vier velden zijn genoeg: uw naam, uw telefoonnummer, uw postcode en wat er moet gebeuren. De prijs krijgt u daarna, vrijblijvend."
      />

      <Vlak toon="wit" id="offerte" labelledBy="offerte-kop">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div>
            <Kop
              id="offerte-kop"
              bovenkop="Na het versturen"
              titel="Wat gebeurt er daarna?"
            />
            {/* Onzekerheid over wat er volgt is de tweede reden om een
                formulier niet af te maken, na de angst vast te zitten aan een
                bedrag. Daarom staat het hier naast het formulier en niet in
                een bedankscherm dat de twijfelaar nooit ziet. */}
            <ol className="mt-8 flex flex-col gap-6">
              {vervolgstappen.map((stap, i) => (
                <li key={stap} className="flex gap-4 border-t border-ink-200 pt-4">
                  <span
                    aria-hidden="true"
                    className="cijfers shrink-0 font-display text-h3 font-semibold leading-none text-ink-500"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-ink-700">{stap}</span>
                </li>
              ))}
            </ol>

            {/* Het telefoonnummer staat hier niet. Dat is een besluit van de
                eigenaar en geldt voor de hele site: het nummer staat alleen
                in de voettekst, zodat de aanvraag de enige handeling op dit
                scherm blijft. */}
            <dl className="mt-10 flex flex-col gap-4 border-t border-ink-200 pt-8 text-sm">
              {SITE.whatsapp && (
                <div className="flex items-center gap-3">
                  <dt className="shrink-0 text-amber-700">
                    <Icon name="whatsapp" />
                    <span className="sr-only">WhatsApp</span>
                  </dt>
                  <dd>
                    <a href={SITE.whatsapp} className="verwijzing">
                      WhatsApp ons
                    </a>
                  </dd>
                </div>
              )}
              <div className="flex items-center gap-3">
                <dt className="shrink-0 text-amber-700">
                  <Icon name="mail" />
                  <span className="sr-only">E-mail</span>
                </dt>
                <dd>
                  <a href={`mailto:${SITE.email}`} className="verwijzing">
                    {SITE.email}
                  </a>
                </dd>
              </div>
              <div className="flex items-start gap-3">
                <dt className="shrink-0 text-amber-700">
                  <Icon name="clock" />
                  <span className="sr-only">Openingstijden</span>
                </dt>
                <dd className="text-ink-600">
                  {SITE.openingstijden.lang.map((regel) => (
                    <span key={regel} className="block">
                      {regel}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </div>

          <ContactForm variant="contact" />
        </div>
      </Vlak>

      <Reviews toon="oppervlak" />
    </>
  );
}
