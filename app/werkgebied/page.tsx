import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import CtaSection from "@/components/CtaSection";
import Reviews from "@/components/Reviews";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import { BezelCard } from "@/components/ui";
import { IconArrowUpRight } from "@/components/icons";
import { provincies, stedenInProvincie } from "@/lib/steden";
import { absUrl, itemListJsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Ons werkgebied — waar wij tv's ophangen",
  description:
    "Onze tv monteurs zijn actief in Zuid-Holland, Noord-Holland, Utrecht en Noord-Brabant. Bekijk alle steden waar we aan huis komen.",
  path: "/werkgebied",
});

export default function WerkgebiedPage() {
  const itemList = itemListJsonLd(
    provincies.map((provincie) => ({
      name: `Tv monteur ${provincie.naam}`,
      url: absUrl(`/werkgebied/${provincie.slug}`),
    })),
  );

  return (
    <main>
      <JsonLd data={itemList} />
      <PageHeader
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Werkgebied", href: "/werkgebied" },
        ]}
        eyebrow="Werkgebied"
        title="Wij hangen uw tv op bij u in de buurt"
        intro="Onze monteurs zijn dagelijks onderweg in Zuid-Holland, Noord-Holland, Utrecht en Noord-Brabant — daar helpen we u vaak al binnen 24 uur."
      />

      <section className="mx-auto w-full max-w-content px-4 py-section md:px-8">
        <ul className="grid gap-4 md:grid-cols-2">
          {provincies.map((provincie, i) => {
            const provincieSteden = stedenInProvincie(provincie.slug);
            return (
              <li key={provincie.slug} className="h-full">
                <Reveal delay={i * 80} className="h-full">
                <BezelCard className="h-full" innerClassName="flex h-full flex-col gap-6 p-8">
                  <div>
                    <h2 className="font-display text-h3 font-semibold">
                      <Link
                        href={`/werkgebied/${provincie.slug}`}
                        className="transition-colors duration-300 ease-out hover:text-accent-fg"
                      >
                        Tv monteur {provincie.naam}
                      </Link>
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                      {provincie.intro}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-sm">
                    {provincieSteden.map((stad) => (
                      <Link
                        key={stad.slug}
                        href={`/tv-ophangen/${stad.slug}`}
                        className="rounded-full bg-sunk px-3.5 py-1.5 font-medium border border-hairline transition-colors duration-300 ease-out hover:bg-sunk"
                      >
                        {stad.naam}
                      </Link>
                    ))}
                  </div>
                  <Link
                    href={`/werkgebied/${provincie.slug}`}
                    className="group mt-auto flex w-max items-center gap-2.5 text-sm font-semibold"
                  >
                    Bekijk {provincie.naam}
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sunk transition-transform duration-500 ease-out group-hover:-translate-y-px group-hover:translate-x-0.5">
                      <IconArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </BezelCard>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <Reveal>
          <p className="mx-auto mt-12 max-w-2xl text-center text-sm leading-relaxed text-fg-muted">
            Staat uw woonplaats er niet tussen? Ons werkgebied groeit
            voortdurend en voor grotere klussen rijden we graag een stukje
            verder. <Link href="/contact" className="font-semibold text-fg underline decoration-accent-fg/60 underline-offset-4">Neem contact op</Link>{" "}
            en we kijken direct wat er mogelijk is.
          </p>
        </Reveal>
      </section>

      <Reviews />

      <CtaSection />
    </main>
  );
}
