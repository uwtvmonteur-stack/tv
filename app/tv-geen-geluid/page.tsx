import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import RelatedLinks from "@/components/RelatedLinks";
import Reviews from "@/components/Reviews";
import { Icon } from "@/components/Icon";
import {
  CheckList,
  HeroActions,
  PageHero,
  Section,
  SectionHeading,
} from "@/components/sections";
import { TV_HULP_PRIJS, type FaqItem } from "@/lib/content";
import { faqJsonLd, pageMeta, serviceJsonLd } from "@/lib/seo";

/**
 * Geen geluid op de tv.
 *
 * Deze pagina komt rechtstreeks uit het eigen zoektermenrapport. Over 90
 * dagen kwamen er ongeveer 76 vertoningen binnen op varianten van "geen
 * geluid op tv" — "tv geeft geen geluid", "tv geen geluid wel beeld",
 * "waarom heb ik geen geluid op mijn tv" — en daar werd vrijwel niet op
 * geklikt. Logisch: de advertentie wees naar een pagina over tv instellen,
 * en dat is niet het woord dat iemand met een stille televisie intikt.
 *
 * Het is bewust géén reparatiepagina. Geluid dat wegvalt is in verreweg de
 * meeste gevallen een instelling, een kabel of een verkeerde ingang — en dat
 * is precies wat wij wél doen. Staat er een defecte luidspreker of versterker
 * achter, dan zeggen we dat eerlijk en verwijzen we door.
 */
export const metadata = pageMeta({
  title: "Geen geluid op uw tv? Monteur aan huis",
  description:
    "Geen geluid op uw tv, maar wel beeld? Meestal een instelling, een kabel of de verkeerde HDMI-poort. Onze monteur lost het thuis op. Vaste prijs €60.",
  path: "/tv-geen-geluid",
});

const belofte = [
  "Wij zoeken de oorzaak op en lossen hem ter plekke op",
  `Vaste prijs van ${TV_HULP_PRIJS}, inclusief voorrijkosten en btw`,
  "Uitleg in gewone taal, zodat u het zelf terug kunt zetten",
  "Ook 's avonds en in het weekend, zonder toeslag",
];

/**
 * De oorzaken op volgorde van hoe vaak de monteur ze aantreft. Dit staat er
 * niet om slim te lijken: wie hierop zoekt wil éérst weten of het iets
 * simpels is. Dat eerlijk opschrijven levert vertrouwen op, en de mensen bij
 * wie het níet lukt bellen ons daarna juist wél.
 */
const oorzaken: { kop: string; tekst: string }[] = [
  {
    kop: "Het geluid staat op een uitgang die niet gebruikt wordt",
    tekst:
      "De tv stuurt het geluid naar een soundbar of ontvanger die uitstaat, of juist naar de eigen luidsprekers terwijl de soundbar aan hangt. In het geluidsmenu staat dan de verkeerde uitgang geselecteerd.",
  },
  {
    kop: "De soundbar hangt op de verkeerde HDMI-poort",
    tekst:
      "Alleen de poort met het label ARC of eARC stuurt geluid terug van de tv naar de soundbar. Zit de kabel in een gewone HDMI-ingang, dan heeft u beeld maar geen geluid.",
  },
  {
    kop: "De audio-instelling staat op het verkeerde formaat",
    tekst:
      "Staat de uitgang op Dolby Digital of Bitstream terwijl uw apparatuur alleen PCM aankan, dan blijft het stil. Andersom kan het geluid gaan haperen of wegvallen bij bepaalde zenders.",
  },
  {
    kop: "HDMI-CEC of de koptelefoonuitgang blokkeert de luidsprekers",
    tekst:
      "Een aangesloten koptelefoon of hoofdtelefoonuitgang schakelt de interne luidsprekers uit, ook als er niets in zit. Ook een CEC-instelling kan het geluid naar een apparaat sturen dat er niet meer staat.",
  },
  {
    kop: "De kabel of de poort is stuk",
    tekst:
      "Een optische kabel die geknikt is of een HDMI-poort die het niet meer doet, geeft precies hetzelfde beeld: wel beeld, geen geluid. Dat sluiten wij uit met een andere kabel en een andere poort.",
  },
];

/** Wat u zelf kunt proberen voordat u ons belt. */
const zelfProberen = [
  "Zet het volume op de tv én op de afstandsbediening van de soundbar hoger",
  "Controleer of er geen koptelefoon of bluetooth-apparaat verbonden is",
  "Kijk of de tv op dempen (mute) staat — dat gebeurt vaker dan u denkt",
  "Verwissel de HDMI-kabel naar de poort met het label ARC of eARC",
  "Haal de stekker van tv en soundbar dertig seconden uit het stopcontact",
];

const faqItems: FaqItem[] = [
  {
    q: "Waarom heb ik wel beeld maar geen geluid op mijn tv?",
    a: "Bijna altijd omdat het geluid naar een uitgang gaat die niet speelt. Dat is meestal een soundbar die op een gewone HDMI-poort zit in plaats van op de poort met ARC of eARC, een audio-instelling die op Dolby staat terwijl uw apparatuur alleen PCM aankan, of een koptelefooninstelling die de interne luidsprekers uitschakelt. In al die gevallen is het scherm in orde en gaat het om een instelling of een kabel.",
  },
  {
    q: "Kunnen jullie het geluid aan huis verhelpen?",
    a: `Ja. Onze monteur komt bij u thuis, zoekt uit waar het geluid blijft steken en lost het ter plekke op: de juiste uitgang instellen, de kabel verleggen naar de ARC-poort, het audioformaat goed zetten of de soundbar opnieuw koppelen. Dat kost ${TV_HULP_PRIJS}, inclusief voorrijkosten en btw.`,
  },
  {
    q: "En als mijn tv echt kapot is?",
    a: "Dan zeggen we dat. Is de luidspreker of de versterker in het toestel defect, dan is dat een reparatie en die doen wij niet — daarvoor moet u bij de fabrikant of een reparateur zijn. U hoort dat van de monteur ter plekke, met de reden erbij, zodat u weet waar u aan toe bent.",
  },
  {
    q: "Hoe lang duurt het?",
    a: "De meeste geluidsproblemen zijn binnen een half uur verholpen. Moet er een kabel anders lopen of een soundbar opnieuw worden ingeregeld, reken dan op drie kwartier tot een uur. De monteur legt daarna uit wat er mis was, zodat u het zelf kunt terugzetten.",
  },
  {
    q: "Mijn geluid hapert of valt af en toe weg — is dat hetzelfde?",
    a: "Vaak wel. Haperend geluid komt meestal door een audioformaat dat niet past bij de zender of de app, door een HDMI-kabel die te lang of te oud is voor het signaal, of door een soundbar die via bluetooth verbonden is in plaats van via de kabel. Ook dat verhelpen wij in dezelfde afspraak.",
  },
];

const offerteBelofte = [
  "Vrijblijvend: u zit aan niets vast tot u ja zegt",
  `Vaste prijs van ${TV_HULP_PRIJS}, inclusief voorrijkosten en btw`,
  "Geen aanbetaling — u betaalt pas na afloop",
  "Vaak al binnen 24 uur een afspraak mogelijk",
];

export default function Page() {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: "Geen geluid op de tv verhelpen",
          description:
            "Geen geluid op de televisie verhelpen aan huis: de juiste audio-uitgang instellen, de soundbar op de ARC-poort aansluiten, het audioformaat goed zetten en de kabels controleren. Vaste prijs, inclusief voorrijkosten en btw.",
          path: "/tv-geen-geluid",
          offers: [
            { name: "Tv hulp aan huis — geen geluid", price: TV_HULP_PRIJS },
          ],
        })}
      />
      <JsonLd data={faqJsonLd(faqItems)} />

      <PageHero
        breadcrumbs={
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Diensten", href: "/diensten" },
              { name: "Geen geluid op de tv", href: "/tv-geen-geluid" },
            ]}
          />
        }
        eyebrow="Tv hulp aan huis"
        title="Geen geluid op uw tv? Wij lossen het bij u thuis op"
        lead="Wel beeld en geen geluid is zelden een kapotte tv. Meestal gaat het geluid naar een uitgang die niet speelt — een soundbar op de verkeerde HDMI-poort, een audioformaat dat niet past, of een instelling die de luidsprekers uitzet. Onze monteur zoekt het uit en lost het op."
        image="/images/familie-kijkt-tv.jpg"
        imageAlt="Gezin kijkt televisie in de woonkamer"
      >
        <HeroActions tweedeHref="#oorzaken" tweedeLabel="Bekijk de oorzaken" />
        <CheckList items={belofte} className="mt-8" dark />
      </PageHero>

      <Section id="oorzaken" labelledBy="oorzaken-kop">
        <SectionHeading
          id="oorzaken-kop"
          eyebrow="De oorzaak"
          title="Vijf redenen waarom uw tv stil blijft"
          lead="Op volgorde van hoe vaak onze monteurs ze tegenkomen. Meestal is er niets kapot: het gaat om een instelling, een kabel of een poort."
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {oorzaken.map((oorzaak) => (
            <li key={oorzaak.kop} className="card h-full p-6">
              <h3 className="flex items-start gap-3 text-h3">
                <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl bg-accent-50 text-accent-700 ring-1 ring-accent-200">
                  <Icon name="info" className="size-5" />
                </span>
                {oorzaak.kop}
              </h3>
              <p className="mt-3 text-ink-600">{oorzaak.tekst}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface" labelledBy="zelf-kop">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading
              id="zelf-kop"
              eyebrow="Eerst zelf proberen"
              title="Vijf dingen die u zonder gereedschap kunt controleren"
              lead="Lukt het hiermee, dan hoeft u ons niet te bellen. Dat zeggen we liever eerlijk dan dat u voor niets een monteur over de vloer krijgt."
            />
            <CheckList items={zelfProberen} className="mt-8" />
          </div>
          <div className="card p-7 md:p-8">
            <h3 className="text-h3">Werkt het nog steeds niet?</h3>
            <p className="mt-3 text-ink-600">
              Dan komt onze monteur langs. Hij neemt een andere HDMI-kabel en
              een optische kabel mee, loopt de audio-instellingen van uw merk
              langs en test het resultaat met u mee. U betaalt{" "}
              {TV_HULP_PRIJS} inclusief voorrijkosten en btw, en pas na afloop.
            </p>
            <p className="mt-4 text-ink-600">
              Staat uw tv nog niet aan de muur, of wilt u er meteen een
              soundbar bij?{" "}
              <Link href="/diensten/soundbar-installatie" className="link">
                Dat kan in dezelfde afspraak
              </Link>
              .
            </p>
            <Link href="#offerte" className="btn-primary mt-7 w-full">
              Afspraak aanvragen
              <Icon name="arrow-right" className="size-5" />
            </Link>
          </div>
        </div>
      </Section>

      <Reviews />

      <Section labelledBy="faq-kop">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <SectionHeading
            id="faq-kop"
            eyebrow="Veelgestelde vragen"
            title="Vragen over geluid dat wegvalt"
            lead={
              <>
                Staat uw vraag er niet bij? Zet hem in het{" "}
                <Link href="#offerte" className="link">
                  aanvraagformulier
                </Link>{" "}
                — u krijgt er antwoord op als wij u bellen.
              </>
            }
          />
          <Faq items={faqItems} />
        </div>
        <RelatedLinks
          items={[
            ["/diensten/tv-instellen", "Tv hulp aan huis"],
            ["/tv-geen-wifi", "Tv maakt geen verbinding met wifi"],
            ["/diensten/soundbar-installatie", "Soundbar aansluiten"],
            ["/diensten/tv-installatie", "Complete tv installatie"],
          ]}
        />
      </Section>

      <Section id="offerte" tone="surface" labelledBy="offerte-kop">
        <div className="flex flex-col-reverse gap-10 lg:grid lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div>
            <SectionHeading
              id="offerte-kop"
              eyebrow="Afspraak aanvragen"
              title="Vertel wat er niet klinkt"
              lead="Zet erbij welk merk tv u heeft en of er een soundbar of ontvanger aan hangt. Dan komt de monteur voorbereid en weet u het bedrag vooraf."
            />
            <CheckList items={offerteBelofte} className="mt-8" />
          </div>
          <ContactForm
            variant="geen-geluid"
            berichtLabel="Wat hoort u niet?"
            berichtPlaceholder="Bijvoorbeeld: Samsung tv met Sonos soundbar, sinds gisteren wel beeld maar geen geluid."
          />
        </div>
      </Section>
    </>
  );
}
