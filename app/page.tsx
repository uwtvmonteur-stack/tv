import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import Reviews from "@/components/Reviews";
import { Icon, Stars } from "@/components/Icon";
import {
  CheckList,
  HeroActions,
  HowItWorks,
  PageHero,
  Prijsklassen,
  Section,
  SectionHeading,
  ServiceCards,
  TrustBar,
} from "@/components/sections";
import { PRIJZEN_KORT, bezwaren, faqAlgemeen } from "@/lib/content";
import { provincies, stedenInProvincie } from "@/lib/steden";
import { faqJsonLd, pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";

const meta = pageMeta({
  title: "Tv ophangen aan huis — vaste prijs vanaf €99",
  description:
    "Tv laten ophangen aan huis? Wij hangen uw tv op, sluiten soundbar en apparatuur aan, werken de kabels weg en stellen alles in. Vaste prijs per formaat: €99, €129 of €159, inclusief voorrijkosten en btw — ook 's avonds en in het weekend zonder toeslag.",
  path: "/",
});

export const metadata: Metadata = {
  ...meta,
  title: {
    // De homepage mag niet op dezelfde woorden staan als /tv-ophangen:
    // stonden beide titels daarop, dan koos Google de homepage (meer interne
    // links) en kreeg de dienstpagina nul vertoningen -- precies wat Search
    // Console liet zien. De oplossing was hier "tv monteur", maar dat is in
    // het Nederlands vooral een reparatieterm. Daarom nu de merknaam voorop:
    // die is uniek van ons, en de exacte zoekterm blijft van /tv-ophangen.
    absolute: "Uw TV Monteur — tv aan de muur, aangesloten en ingesteld",
  },
};

/**
 * De herkenningspunten. Geformuleerd als de situatie van de bezoeker en niet
 * als ons aanbod: wie zichzelf terugleest in de lijst, leest daarna ook de
 * rest van de pagina.
 *
 * Vier en niet zes. Hier stond ook "u kunt alleen 's avonds of in het
 * weekend", en dat punt komt op deze pagina al drie keer voor (bewijsbalk,
 * bezwaren, FAQ), plus "u gaat niet zelf boren naast een tv die een
 * maandsalaris kostte", wat hetzelfde zegt als de vraag of de wand het houdt.
 * Een lijst waarin iemand zichzelf moet herkennen werkt tegen zichzelf zodra
 * hij langer is dan één blik.
 */
const herkenning = [
  "De tv staat nog in de doos en u weet niet welke beugel u nodig heeft",
  "U weet niet of uw wand het gewicht van uw tv houdt",
  "U wilt de kabels niet langs de muur zien hangen",
  "Elke site noemt een ander bedrag, dus u weet niet wat redelijk is",
];

/**
 * Wat de offerteaanvraag wél en niet van iemand vraagt.
 *
 * De laatste regel ging over avond en weekend; dat staat op deze pagina al in
 * de bewijsbalk, bij de bezwaren en in de FAQ. Wie hier staat heeft die vraag
 * dus gehad en heeft er één over: wanneer kan het? Daarom staat daar nu de
 * beschikbaarheid, dezelfde als op de stadpagina's.
 */
const offerteBelofte = [
  "Vrijblijvend: u zit aan niets vast tot u ja zegt",
  "Het bedrag is inclusief voorrijkosten en btw",
  "Geen aanbetaling — u betaalt pas na afloop",
  "Vaak al binnen 24 uur een afspraak mogelijk",
];

/**
 * De bewijsregel onder de heroknoppen.
 *
 * Het telefoonnummer staat hier bewust niet, ook niet als knop ernaast: één
 * actie per scherm. Deze regel is er om die ene actie te rechtvaardigen, niet
 * om er een tweede naast te zetten.
 */
function HeroBewijs() {
  return (
    <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-ink-200">
      <li className="flex items-center gap-2">
        <Stars />
        <strong className="tabular font-semibold text-white">
          {SITE.reviews.score} / 5
        </strong>
        {/* Een score zonder vindplaats is een bewering. Staat de link naar het
            bedrijfsprofiel in SITE.reviews, dan kan de bezoeker hem nalezen. */}
        {SITE.reviews.url ? (
          <a
            href={SITE.reviews.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-white/40 underline-offset-4 hover:text-white"
          >
            {SITE.reviews.count} reviews
          </a>
        ) : (
          <span>{SITE.reviews.count} reviews</span>
        )}
      </li>
      <li className="flex items-center gap-2">
        <Icon name="shield" className="size-5 text-accent-300" />
        Volledig verzekerd
      </li>
      {/* Beschikbaarheid, en niet voor de tweede keer avond en weekend: die
          staat in de bewijsbalk direct hieronder. "Wanneer kan het?" is de
          vraag die een bezoeker met een tv in de doos als eerste heeft, en op
          de 32 stadpagina's staat dit antwoord al in de hero. */}
      <li className="flex items-center gap-2">
        <Icon name="clock" className="size-5 text-accent-300" />
        Vaak binnen 24 uur een afspraak
      </li>
    </ul>
  );
}

export default function Page() {
  return (
    <>
      {/* De vier bezwaren staan zichtbaar op deze pagina als vraag met
          antwoord, dus horen ze ook in het FAQPage-schema: dit is wat
          zoekmachines en AI-antwoordmachines uitlezen, en het zijn precies de
          vier vragen waarop wij een ander antwoord geven dan de markt. */}
      <JsonLd
        data={faqJsonLd([
          ...bezwaren.map((bezwaar) => ({
            q: bezwaar.vraag,
            a: bezwaar.antwoord,
          })),
          ...faqAlgemeen,
        ])}
      />

      {/* "Tv monteur" is in het Nederlands vooral een reparatieterm: wie dat
          zoekt heeft een kapot scherm, niet een lege muur. De commerciële
          zoekopdracht is "tv (laten) ophangen". De bedrijfsnaam blijft Uw TV
          Monteur; de koppen volgen de zoekterm. */}
      <PageHero
        eyebrow="Tv ophangen aan huis"
        // De kop noemt de diensten en niet het soort bedrijf dat wij zijn.
        // Hier stond "door de monteur die zelf komt": dat is een verschil met
        // de bemiddelingsplatforms, maar wie net een tv heeft gekocht weet
        // nog niet dat die platforms bestaan. "Laten ophangen" blijft erin
        // staan, want dat is de zoekterm waarmee men hier komt.
        title="Uw tv laten ophangen, aansluiten en instellen"
        // Eerst wát wij doen, dan wat het kost. Hier stond een zin over de
        // prijs en over het soort bedrijf dat wij zijn, maar niet wat er bij u
        // thuis gebeurt — terwijl dat de vraag is waarmee iemand op deze
        // pagina komt. De vier diensten staan er nu in de volgorde waarin ze
        // in één bezoek gebeuren, met het tarief erachter.
        lead={
          <>
            Wij hangen uw tv op aan elke wand, sluiten uw soundbar en
            apparatuur aan, werken de kabels weg en stellen zenders, wifi en
            apps voor u in. Vaste prijs per tv-formaat: {PRIJZEN_KORT},
            inclusief voorrijkosten en btw.
          </>
        }
        image="/images/hero-woonkamer.jpg"
        imageAlt="Wandgemonteerde tv in een sfeervolle moderne woonkamer bij schemering"
      >
        <HeroActions />
        <HeroBewijs />
      </PageHero>

      <Section tone="surface">
        <TrustBar />
      </Section>

      <Section labelledBy="herkenning">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              id="herkenning"
              eyebrow="Herkent u dit?"
              title="Een tv ophangen is één middag uitzoeken en één keer goed boren"
              lead="Het uitzoeken hoeft u niet te doen en het boren niet zelf. Wij komen langs, hangen hem waterpas op en laten het schoon achter."
            />
            <CheckList items={herkenning} className="mt-8 text-lg" />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lift">
            {/* Niet tv-beugel-detail.jpg: die foto toont een beugel die fysiek
                niet kan bestaan — de arm raakt alleen de rechterrand van het
                scherm, zonder VESA-bevestiging. Op de homepage van een
                tv-ophangbedrijf is dat precies het verkeerde beeld. */}
            <Image
              src="/images/monteur-aan-het-werk.jpg"
              alt="Monteur van Uw TV Monteur hangt een televisie waterpas aan de wand"
              fill
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      <Section tone="surface" labelledBy="diensten">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="diensten"
            eyebrow="Onze diensten"
            title="Ophangen, aansluiten, instellen — in één bezoek"
            lead="Eén monteur, één afspraak. Of het nu om de tv, de soundbar of de kabels gaat."
          />
          <Link href="/diensten" className="btn-ghost shrink-0">
            Alle diensten
            <Icon name="arrow-right" className="size-4" />
          </Link>
        </div>
        <div className="mt-12">
          <ServiceCards />
        </div>
      </Section>

      <Section labelledBy="werkwijze">
        <SectionHeading
          id="werkwijze"
          center
          eyebrow="Zo werkt het"
          title="Van aanvraag tot waterpas in drie stappen"
          lead="U vraagt aan, u krijgt het bedrag, wij hangen hem op. Daartussen hoeft u niets uit te zoeken."
        />
        <div className="mt-14">
          <HowItWorks />
        </div>
      </Section>

      <Section tone="surface" labelledBy="prijs">
        <SectionHeading
          id="prijs"
          eyebrow="Wat het kost"
          title={`Tv ophangen: ${PRIJZEN_KORT}`}
          lead="Het formaat van uw tv bepaalt het tarief, en verder niets. Elke muur, waterpas gemonteerd, aangesloten en belast getest — inclusief voorrijkosten en btw."
        />
        <div className="mt-12">
          <Prijsklassen />
        </div>
        <p className="mt-8">
          <Link href="/prijzen" className="link inline-flex min-h-11 items-center">
            Alle tarieven en wat er altijd bij zit
          </Link>
        </p>
      </Section>

      {/* Eigen sectie met eigen achtergrond; staat hier tussen het prijsblok
          (surface) en de bezwaren (donker). */}
      <Reviews />

      <Section tone="dark" labelledBy="bezwaren">
        <SectionHeading
          dark
          id="bezwaren"
          eyebrow="Uw twijfels"
          // "Een voorbehoud krijgen" is geen taal die een bezoeker gebruikt en
          // laat ook niet zien wat het hem kost. Een toeslag en een nee zijn
          // concreet, en dat is precies wat deze vier punten elders opleveren.
          title="Vier dingen die elders een toeslag of een nee opleveren"
          lead="Dit is waar bezoekers afhaken. Hieronder staat per punt wat er bij ons gebeurt."
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {bezwaren.map((bezwaar) => (
            <li
              key={bezwaar.vraag}
              className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10"
            >
              <h3 className="flex items-start gap-3 text-h3 text-white">
                <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl bg-accent-400/15 text-accent-300">
                  <Icon name="check-circle" className="size-5" />
                </span>
                {bezwaar.vraag}
              </h3>
              <p className="mt-3 text-ink-300">{bezwaar.antwoord}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="werkgebied">
        <SectionHeading
          id="werkgebied"
          center
          eyebrow="Werkgebied"
          title="Een tv monteur uit uw eigen regio"
          lead="Wij rijden dagelijks in Zuid-Holland, Noord-Holland, Utrecht en Noord-Brabant. Kies uw provincie of uw plaats."
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {provincies.map((provincie) => (
            <li key={provincie.slug} className="card flex flex-col p-6">
              {/* De provincienaam is geen link, de regel onderaan wel: twee
                  links naar dezelfde pagina in één kaart verdelen de waarde van
                  die link over twee ankerteksten. */}
              <h3 className="text-h3">{provincie.naam}</h3>
              <ul className="mt-3">
                {stedenInProvincie(provincie.slug)
                  .slice(0, 3)
                  .map((stad) => (
                    <li key={stad.slug}>
                      {/* Ankertekst volgt de titel van de doelpagina ("Tv
                          ophangen in <stad>") en niet "tv monteur <stad>": dat
                          laatste is in het Nederlands de reparatieterm. */}
                      <Link
                        href={`/tv-ophangen/${stad.slug}`}
                        className="link inline-flex min-h-11 items-center"
                      >
                        Tv ophangen in {stad.naam}
                      </Link>
                    </li>
                  ))}
              </ul>
              <Link
                href={`/werkgebied/${provincie.slug}`}
                className="mt-auto flex min-h-11 items-center gap-1.5 pt-4 font-semibold text-accent-700 hover:text-accent-800"
              >
                Alle plaatsen in {provincie.naam}
                <Icon name="arrow-right" className="size-4" />
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex justify-center">
          <Link href="/werkgebied" className="btn-ghost">
            Het volledige werkgebied
            <Icon name="arrow-right" className="size-4" />
          </Link>
        </div>
      </Section>

      <Section tone="surface" labelledBy="faq">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <SectionHeading
            id="faq"
            eyebrow="Veelgestelde vragen"
            title="Goed om te weten"
            lead={
              <>
                Staat uw vraag er niet bij? Zet hem in het{" "}
                <Link href="#offerte" className="link">
                  offerteformulier
                </Link>{" "}
                — u krijgt er antwoord op bij uw offerte.
              </>
            }
          />
          <Faq items={faqAlgemeen} />
        </div>
      </Section>

      {/* Het formulier staat op de pagina zelf en niet achter een knop naar
          /contact: dat was een paginawissel op het moment dat iemand besloten
          heeft, en dat is de stap waar verkeer het makkelijkst verdwijnt. */}
      <Section id="offerte" labelledBy="offerte-kop">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div>
            <SectionHeading
              id="offerte-kop"
              eyebrow="Offerte aanvragen"
              title="Vertel kort wat er moet gebeuren"
              lead="Vier velden en u bent klaar: uw naam, uw telefoonnummer, uw postcode en wat er moet gebeuren. Het bedrag krijgt u binnen enkele uren, vrijblijvend."
            />
            <CheckList items={offerteBelofte} className="mt-8" />
          </div>
          <ContactForm
            variant="home"
            berichtLabel="Uw tv en uw muur"
            berichtPlaceholder="Bijvoorbeeld: 55 inch Samsung, en de wand is gipsplaat."
          />
        </div>
      </Section>
    </>
  );
}
