import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import JsonLd from "@/components/JsonLd";
import Reviews from "@/components/Reviews";
import { Icon } from "@/components/Icon";
import { PageHero, Section, SectionHeading } from "@/components/sections";
import { SITE } from "@/lib/site";
import { absUrl, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Offerte aanvragen of contact opnemen",
  description:
    "Vraag een vrijblijvende offerte aan voor tv ophangen aan huis. Vul het formulier in — wij nemen binnen enkele uren contact met u op.",
  path: "/contact",
});

const vervolgstappen = [
  "U krijgt binnen enkele uren een vrijblijvende offerte met het bedrag erbij.",
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
      <PageHero
        breadcrumbs={
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Contact", href: "/contact" },
            ]}
          />
        }
        eyebrow="Contact"
        title="Vraag uw offerte aan"
        lead="Drie dingen zijn genoeg: wie u bent, waar u woont en wat er moet gebeuren. De prijs krijgt u daarna, vrijblijvend."
      />

      <Section id="offerte" labelledBy="offerte-kop">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <SectionHeading
              id="offerte-kop"
              eyebrow="Na het versturen"
              title="Wat gebeurt er daarna?"
            />
            {/* Onzekerheid over wat er volgt is de tweede reden om een
                formulier niet af te maken, na de angst vast te zitten aan een
                bedrag. Daarom staat het hier naast het formulier en niet in
                een bedankscherm dat de twijfelaar nooit ziet. */}
            <ol className="mt-8 flex flex-col gap-5">
              {vervolgstappen.map((stap, i) => (
                <li key={stap} className="flex gap-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ink-950 font-display text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-ink-700">{stap}</span>
                </li>
              ))}
            </ol>

            <dl className="mt-10 flex flex-col gap-4 border-t border-ink-200 pt-8 text-sm">
              {SITE.whatsapp && (
                <div className="flex items-center gap-3">
                  <dt className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-50 text-accent-700 ring-1 ring-accent-200">
                    <Icon name="whatsapp" />
                    <span className="sr-only">WhatsApp</span>
                  </dt>
                  <dd>
                    <a href={SITE.whatsapp} className="link">
                      WhatsApp ons
                    </a>
                  </dd>
                </div>
              )}
              <div className="flex items-center gap-3">
                <dt className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-50 text-accent-700 ring-1 ring-accent-200">
                  <Icon name="mail" />
                  <span className="sr-only">E-mail</span>
                </dt>
                <dd>
                  <a href={`mailto:${SITE.email}`} className="link">
                    {SITE.email}
                  </a>
                </dd>
              </div>
              <div className="flex items-start gap-3">
                <dt className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-50 text-accent-700 ring-1 ring-accent-200">
                  <Icon name="clock" />
                  <span className="sr-only">Openingstijden</span>
                </dt>
                <dd className="pt-2 text-ink-600">
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
      </Section>

      <Reviews />
    </>
  );
}
