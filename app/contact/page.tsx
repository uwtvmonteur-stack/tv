import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/PageHeader";
import Reviews from "@/components/Reviews";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import { BezelCard, Eyebrow } from "@/components/ui";
import {
  IconChat,
  IconClock,
  IconMail,
  } from "@/components/icons";
import { SITE } from "@/lib/site";
import { absUrl, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact & Afspraak Maken",
  description:
    "Plan direct een afspraak met een tv monteur aan huis. Vul het formulier in — wij nemen binnen enkele uren contact met u op.",
  path: "/contact",
});

const vervolgstappen = [
  "U krijgt binnen enkele uren bericht van ons met de eerstvolgende mogelijkheden.",
  "Samen kiezen we een dag en tijd die u schikt — ook 's avonds of in het weekend, zonder toeslag.",
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
    <main>
      <JsonLd data={contactJsonLd} />
      <PageHeader
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
        eyebrow="Contact"
        title="Plan uw afspraak"
      />

      <section className="mx-auto w-full max-w-6xl px-4 py-section md:px-8">
        <div className="grid gap-5 lg:grid-cols-5">
          {/* `immediate`: het formulier is het conversiepunt en mag nooit
              (kort) onzichtbaar zijn door de scroll-animatie. */}
          <Reveal immediate className="lg:col-span-3">
            <BezelCard className="h-full" innerClassName="p-6 md:p-10">
              <h2 className="mb-8 font-display text-step-3 font-bold">
                Afspraak aanvragen
              </h2>
              {/* `montage`: ophangen is waar de overgrote meerderheid voor
                  komt, en de prijs vóór het telefoonnummer tonen is hier het
                  hele punt. Wie voor iets anders komt, laat de tv-vraag leeg. */}
              <ContactForm montage planner variant="contact" />
            </BezelCard>
          </Reveal>

          <Reveal delay={100} className="lg:col-span-2">
            <div className="h-full rounded-[2rem] bg-ink/[0.06] p-1.5 ring-1 ring-line-strong">
              <div className="flex h-full flex-col justify-between gap-10 rounded-[calc(2rem-0.375rem)] bg-ink p-8 text-cream md:p-10">
                <div>
                  <Eyebrow light>Na het versturen</Eyebrow>
                  <h2 className="mt-6 font-display text-step-3 font-bold">
                    Wat gebeurt er daarna?
                  </h2>
                  {/* Onzekerheid over wat er volgt is de tweede reden om een
                      formulier niet af te maken, na de angst vast te zitten. */}
                  <ol className="mt-6 flex flex-col gap-5 text-[15px] leading-relaxed text-white/70">
                    {vervolgstappen.map((stap, i) => (
                      <li key={stap} className="flex gap-3.5">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-cream">
                          {i + 1}
                        </span>
                        <span>{stap}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="flex flex-col gap-4 text-[15px]">
                  {SITE.whatsapp && (
                    <a
                      href={SITE.whatsapp}
                      className="flex items-center gap-3.5 font-semibold transition-colors duration-300 ease-fluid hover:text-amber-400"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                        <IconChat className="h-4.5 w-4.5" />
                      </span>
                      WhatsApp ons
                    </a>
                  )}
                  <a
                    href={`mailto:${SITE.email}`}
                    className="flex items-center gap-3.5 font-semibold transition-colors duration-300 ease-fluid hover:text-amber-400"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                      <IconMail className="h-4.5 w-4.5" />
                    </span>
                    {SITE.email}
                  </a>
                  <div className="mt-2 flex items-start gap-3.5 text-white/70">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                      <IconClock className="h-4.5 w-4.5" />
                    </span>
                    <span className="pt-2 leading-relaxed">
                      Ma t/m vr 08:00 – 21:00
                      <br />
                      Zaterdag en zondag 09:00 – 17:00
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Reviews />
    </main>
  );
}
