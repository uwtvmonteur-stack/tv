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
  IconPhone,
} from "@/components/icons";
import { SITE } from "@/lib/site";
import { absUrl, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact & Afspraak Maken",
  description: `Plan direct een afspraak met een tv monteur aan huis. Bel ${SITE.phoneDisplay}, mail ons of vul het formulier in — wij reageren binnen één werkdag.`,
  path: "/contact",
});

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
        intro={
          <>
            Vul in één minuut het formulier in, dan bellen wij u terug om een
            moment te kiezen. Liever direct?{" "}
            <a
              href={`tel:${SITE.phone}`}
              className="font-semibold text-ink underline decoration-amber-600/50 underline-offset-4"
            >
              Bel {SITE.phoneDisplay}
            </a>
            . Vaak kan de monteur al binnen 24 uur bij u langskomen.
          </>
        }
      />

      <section className="mx-auto w-full max-w-6xl px-4 py-10 md:px-8">
        <div className="grid gap-5 lg:grid-cols-5">
          {/* `immediate`: het formulier is het conversiepunt en mag nooit
              (kort) onzichtbaar zijn door de scroll-animatie. */}
          <Reveal immediate className="lg:col-span-3">
            <BezelCard className="h-full" innerClassName="p-6 md:p-10">
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                Afspraak aanvragen
              </h2>
              <p className="mt-3 mb-8 leading-relaxed text-ink-soft">
                {SITE.reactie}
              </p>
              <ContactForm />
            </BezelCard>
          </Reveal>

          <Reveal delay={100} className="lg:col-span-2">
            <div className="h-full rounded-[2rem] bg-ink/[0.06] p-1.5 ring-1 ring-ink/10">
              <div className="flex h-full flex-col justify-between gap-10 rounded-[calc(2rem-0.375rem)] bg-ink p-8 text-cream md:p-10">
                <div>
                  <Eyebrow light>Direct contact</Eyebrow>
                  <h2 className="mt-6 font-display text-3xl font-bold tracking-tight md:text-4xl">
                    Liever even bellen?
                  </h2>
                  <p className="mt-4 leading-relaxed text-white/70">
                    Bel{SITE.whatsapp ? ", app" : ""} of mail ons — we reageren
                    snel en denken graag met u mee over de beste oplossing.
                  </p>
                </div>
                <div className="flex flex-col gap-4 text-[15px]">
                  <a
                    href={`tel:${SITE.phone}`}
                    className="flex items-center gap-3.5 font-semibold transition-colors duration-300 ease-fluid hover:text-amber-400"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                      <IconPhone className="h-4.5 w-4.5" />
                    </span>
                    {SITE.phoneDisplay}
                  </a>
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
