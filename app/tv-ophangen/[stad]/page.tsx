import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import JsonLd from "@/components/JsonLd";
import ProvincieChips from "@/components/ProvincieChips";
import RelatedLinks from "@/components/RelatedLinks";
import Reviews from "@/components/Reviews";
import { DienstIcon, Icon, type IconName } from "@/components/Icon";
import {
  Aanvraagsectie,
  Bewijsrij,
  Faqsectie,
  Hero,
  HeroKnoppen,
  Kop,
  Prijsklassen,
  Vlak,
  Werkwijze,
} from "@/components/sections";
import {
  BELOFTE,
  HERO_PRIJZEN,
  PRIJZEN_KORT,
  VANAF_PRIJS,
  diensten,
  dienstHref,
  prijsklassen,
  type FaqItem,
} from "@/lib/content";
import { provincieBySlug, stadBySlug, steden } from "@/lib/steden";
import { lokaalTekst } from "@/lib/stedenLokaal";
import { stedenMontage } from "@/lib/stedenMontage";
import { faqJsonLd, pageMeta, serviceJsonLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return steden.map((stad) => ({ stad: stad.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ stad: string }>;
}): Promise<Metadata> {
  const { stad: slug } = await params;
  const stad = stadBySlug(slug);
  if (!stad) return {};
  const provincie = provincieBySlug(stad.provincie);
  return {
    ...pageMeta({
      // "Tv Monteur {stad}" stond hier, en dat is in het Nederlands vooral
      // een reparatiezoekopdracht: wie dat intypt heeft een kapot scherm. De
      // commerciële zoekopdracht van iemand met een lege muur is "tv ophangen
      // {stad}" of "tv laten ophangen {stad}". Ook de hoofdletters zijn eruit:
      // Engelse Title Case leest in een Nederlandse zoekresultatenlijst als
      // machinaal gemaakt en kost doorklikken.
      title: `Tv ophangen in ${stad.naam} — vanaf €99`,
      description: `Tv ophangen in ${stad.naam}? Vaste prijs €99, €129 of €159 incl. voorrijkosten en btw. Ook 's avonds en in het weekend, zonder toeslag.`,
      path: `/tv-ophangen/${stad.slug}`,
    }),
    other: {
      "geo.region": `NL-${provincie?.iso ?? ""}`,
      "geo.placename": stad.naam,
      "geo.position": `${stad.lat};${stad.lng}`,
      ICBM: `${stad.lat}, ${stad.lng}`,
    },
  };
}

/** Wat de aanvraag zelf wel en niet van iemand vraagt. */
const aanvraagBelofte = [
  BELOFTE.vrijblijvend,
  BELOFTE.inclusief,
  BELOFTE.geenAanbetaling,
  BELOFTE.verzekerd,
  BELOFTE.avondWeekend,
];

/**
 * De herofoto's van de stadpagina's, op volgnummer verdeeld.
 *
 * Hier stond één foto op alle 32 pagina's, met op alle 32 dezelfde alt-tekst
 * — inclusief /over-ons was dat 33 keer hetzelfde beeld. Een bezoeker die
 * twee plaatsen naast elkaar bekijkt ziet dan precies wat het is: één
 * sjabloon. Nu vier bestaande foto's, elk op acht pagina's.
 *
 * Geen plaatsnaam in de alt-tekst, om dezelfde reden als eerst: het is niet
 * dezelfde foto per stad, dus "aan het werk in Helmond" zou zeven keer
 * onwaar zijn. De alt beschrijft wat er te zien is.
 */
const HEROBEELDEN = [
  {
    src: "/images/monteur-aan-het-werk.webp",
    alt: "Monteur van Uw TV Monteur hangt een televisie waterpas aan de wand",
  },
  {
    src: "/images/tv-beugel-detail.webp",
    alt: "Wandbeugel van een televisie, waterpas op de muur bevestigd",
  },
  {
    src: "/images/kabels-weggewerkt.webp",
    alt: "Televisie aan de wand met de kabels onzichtbaar weggewerkt",
  },
  {
    src: "/images/familie-kijkt-tv.webp",
    alt: "Gezin kijkt televisie op een pas opgehangen scherm in de woonkamer",
  },
] as const;

/** "Delft, Dordrecht en Den Haag" — leest als een zin, niet als een lijst. */
function opsomming(namen: string[]) {
  if (namen.length <= 1) return namen[0] ?? "";
  return `${namen.slice(0, -1).join(", ")} en ${namen[namen.length - 1]}`;
}

/**
 * De bewijsregel onder de heroknop, met de plaatsnaam erin.
 *
 * Bewust alleen afspraken die wij in het hele werkgebied nakomen — geen
 * reistijd, geen "monteur om de hoek" en geen wijkclaim. Zulke regels zijn
 * niet te onderbouwen, en ze lezen op 32 pagina's als hetzelfde sjabloon met
 * een andere plaatsnaam erin. Het telefoonnummer staat hier niet: de
 * afspraakaanvraag is de enige handeling op dit scherm.
 */
function HeroFeiten({ plaats }: { plaats: string }) {
  const feiten: { icon: IconName; tekst: string }[] = [
    { icon: "clock", tekst: `Vaak binnen 24 uur een monteur in ${plaats}` },
    {
      icon: "euro",
      tekst: `Voorrijkosten in ${plaats} zitten in de prijs`,
    },
    {
      icon: "calendar",
      tekst: "Ook 's avonds en in het weekend, zonder toeslag",
    },
  ];
  return (
    <ul className="mt-8 flex flex-col gap-2.5 border-t border-white/15 pt-6 text-ink-200">
      {feiten.map((feit) => (
        <li key={feit.tekst} className="flex items-center gap-2.5">
          <Icon name={feit.icon} className="size-5 shrink-0 text-amber-300" />
          {feit.tekst}
        </li>
      ))}
    </ul>
  );
}

export default async function StadPage({
  params,
}: {
  params: Promise<{ stad: string }>;
}) {
  const { stad: slug } = await params;
  const stad = stadBySlug(slug);
  if (!stad) notFound();

  const provincie = provincieBySlug(stad.provincie);
  if (!provincie) notFound();

  const stadIndex = steden.findIndex((s) => s.slug === stad.slug);
  const nabijeSteden = stad.nabij
    .map((nabijSlug) => stadBySlug(nabijSlug))
    .filter((s) => s !== undefined);

  // De twee teksten die alleen op déze stadpagina staan. Beide dekken alle 32
  // steden; de `&&` hieronder is er voor een stad die later wordt toegevoegd
  // voordat zijn tekst geschreven is.
  const buurtTekst = lokaalTekst[stad.slug];
  const wandTekst = stedenMontage[stad.slug];

  // Varieer de vraagformulering per stad (op volgnummer), zodat de FAQ's niet
  // op alle 32 stadpagina's woordelijk identiek zijn (dunne-content-preventie).
  const qv = stadIndex % 3;
  // Een tweede volgnummer, op 2 in plaats van 3: samen met `qv` levert dat
  // zes verschillende vraagcombinaties over de 32 steden in plaats van drie,
  // en krijgen twee buursteden met hetzelfde restgetal toch een andere FAQ.
  const qv2 = stadIndex % 2;
  // Drie wijken verspreid over de lijst in plaats van de eerste drie: zo noemt
  // het antwoord per stad andere namen dan de wijkenlijst hierboven opent.
  const wijkSelectie = [0, 2, 4]
    .map((i) => stad.wijken[i % stad.wijken.length])
    .filter((wijk, i, lijst) => lijst.indexOf(wijk) === i);
  const faqItems: FaqItem[] = [
    {
      q: [
        `Hoe snel kan een tv monteur in ${stad.naam} langskomen?`,
        `Wanneer kan er een tv monteur in ${stad.naam} langskomen?`,
        `Hoe snel bent u in ${stad.naam} aan de beurt?`,
      ][qv],
      a: `In ${stad.naam} kunnen we u vaak al binnen 24 uur helpen — ook 's avonds en in het weekend, zonder toeslag. Onze monteurs rijden dagelijks tussen ${stad.naam} en ${opsomming(nabijeSteden.map((s) => s.naam))}, dus er is bijna altijd iemand in de buurt. Vraag online een afspraak aan, dan laten we u binnen enkele uren de eerstvolgende mogelijkheid weten.`,
    },
    {
      q: [
        `Wat kost een tv ophangen in ${stad.naam}?`,
        `Wat betaal ik voor tv ophangen in ${stad.naam}?`,
        `Hoeveel kost tv-montage in ${stad.naam}?`,
      ][qv],
      // De drie bedragen voluit en niet "zie hierboven": dit antwoord gaat
      // ook naar het FAQPage-schema, en daar staat geen pagina omheen.
      a: `${PRIJZEN_KORT}, afhankelijk van het formaat van uw tv — €99 tot 43 inch, €129 van 44 t/m 64 inch en €159 vanaf 65 inch, altijd inclusief voorrijkosten en btw. Voor ${stad.naam} rekenen we geen voorrijtoeslag, in welke wijk u ook woont, en het soort muur verandert het tarief niet. Kabels wegwerken kan vanaf €39 extra.`,
    },
    {
      // De eerste variant was woordelijk gelijk aan de kop van de wijksectie
      // hierboven ("In welke wijken van X komen wij?"), en `qv` is 0 op elf
      // van de 32 steden. Daar stond dus twee keer dezelfde vraag op één
      // pagina, één keer als sectiekop en één keer in de FAQ. Alle drie de
      // varianten wijken nu af van die kop; het antwoord past bij alle drie.
      q: [
        `Komen jullie ook buiten het centrum van ${stad.naam}?`,
        `Komen jullie in alle wijken van ${stad.naam}?`,
        `Werken jullie door heel ${stad.naam}?`,
      ][qv],
      a: `Ja. We komen onder meer in ${opsomming(wijkSelectie)}, en net zo goed in de rest van ${stad.naam}. Staat uw wijk er niet bij? Dan helpen we u vrijwel altijd alsnog, net als in de omliggende plaatsen en de rest van ${provincie.naam}.`,
    },
    {
      q: [
        `Hangen jullie ook een tv op aan een gipswand in ${stad.naam}?`,
        `Kan een tv in ${stad.naam} ook aan een gipswand of voorzetwand?`,
      ][qv2],
      a: `Ja, daar worden we juist vaak voor gebeld. Veel woningen hebben tegenwoordig een voorzetwand of gipsplaat in plaats van massief metselwerk, en daar houdt een gewone plug een tv niet. Onze monteur stelt in ${stad.naam} ter plekke het wandtype vast, zoekt de staanders op en rekent het draagvermogen na voordat er geboord wordt.`,
    },
  ];

  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: `Tv monteur ${stad.naam}`,
          description: `Tv ophangen, kabels wegwerken en complete tv installatie aan huis in ${stad.naam} en omgeving.`,
          path: `/tv-ophangen/${stad.slug}`,
          areaServed: {
            "@type": "City",
            name: stad.naam,
            containedInPlace: { "@type": "State", name: provincie.naam },
            geo: {
              "@type": "GeoCoordinates",
              latitude: stad.lat,
              longitude: stad.lng,
            },
          },
          // De drie tarieven per schermformaat, uit dezelfde bron als de
          // prijslijst op de pagina. Harde `price`-bedragen mogen hier omdat
          // ze vaststaan: wat een bezoeker in een rich result ziet is wat er
          // op de pagina staat en wat hij betaalt.
          offers: prijsklassen.map((klasse) => ({
            name: `Tv ophangen, ${klasse.maat.replace(/^Voor tv's /, "")}`,
            price: klasse.prijs,
          })),
        })}
      />
      <JsonLd data={faqJsonLd(faqItems)} />

      <Hero
        prijzen={HERO_PRIJZEN}
        kruimels={
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Werkgebied", href: "/werkgebied" },
              { name: provincie.naam, href: `/werkgebied/${provincie.slug}` },
              { name: stad.naam, href: `/tv-ophangen/${stad.slug}` },
            ]}
          />
        }
        bovenkop={`Tv ophangen in ${provincie.naam} · vanaf ${VANAF_PRIJS}`}
        titel={`Tv laten ophangen in ${stad.naam}`}
        // Bewust `stad.blurb` als intro: die tekst gaat over de bouwstijlen en
        // woningtypes van déze stad en verschilt dus per pagina. De generieke
        // intro die hier stond was op alle 32 stadpagina's woordelijk gelijk,
        // waardoor Google ze als bijna-duplicaten uit de resultaten filterde.
        inleiding={stad.blurb}
        // Op volgnummer verdeeld over vier foto's; zie HEROBEELDEN.
        beeld={HEROBEELDEN[stadIndex % HEROBEELDEN.length].src}
        beeldAlt={HEROBEELDEN[stadIndex % HEROBEELDEN.length].alt}
      >
        <HeroKnoppen />
        <HeroFeiten plaats={stad.naam} />
      </Hero>

      {/* `kopNiveau={2}`: deze sectie heeft geen eigen kop, dus zijn de vier
          kopjes in dit blok de eerste koppen na de h1 van de hero. */}
      <Vlak toon="wit">
        <Bewijsrij kopNiveau={2} />
      </Vlak>

      <Vlak toon="oppervlak" labelledBy="buurt">
        <Kop
          id="buurt"
          bovenkop={`Werkgebied ${stad.naam}`}
        titel={`In welke wijken van ${stad.naam} komen wij?`}
        tekst={buurtTekst}
        />
        {/* De wijknamen komen uit `lib/steden.ts` en worden hier niet
            aangevuld: een verzonnen buurt is op een lokale pagina precies het
            detail waaraan een bezoeker ziet dat het een sjabloon is. */}
        <ul className="mt-8 flex flex-wrap gap-2.5">
          {stad.wijken.map((wijk) => (
            <li key={wijk} className="pil">
              {wijk}
            </li>
          ))}
        </ul>
      </Vlak>

      {/* De bouwperiodes die in deze stad overheersen, en wat die betekenen
          voor plug, beugel en haalbare plek. Dit is het enige onderwerp dat
          per stad werkelijk verschilt: de rest van de pagina is noodzakelijk
          sjabloon. Search Console liet zien dat 19 van de 32 stadpagina's wel
          waren gevonden maar nooit opgehaald, en het verschil tussen twee
          willekeurige stadpagina's was 31% letterlijk gelijke zinnen. Deze
          sectie verdubbelt het deel van de pagina dat alleen hier staat, en is
          tegelijk het antwoord dat een bezoeker echt zoekt. */}
      <Vlak toon="wit" labelledBy="wand">
        <Kop
          id="wand"
          bovenkop="Uw wand"
        titel={`Welke muur heeft u in ${stad.naam}?`}
        />
        <div className="artikel mt-7 max-w-3xl">
          {wandTekst && <p>{wandTekst}</p>}
          <p>
            Weet u niet zeker wat voor wand u heeft? Dat hoeft ook niet — onze
            monteur bepaalt het ter plekke en neemt de pluggen voor elk
            wandtype mee. De prijs verandert er niet door.
          </p>
        </div>
      </Vlak>

      <Vlak toon="oppervlak" labelledBy="werkwijze">
        <Kop
          id="werkwijze"
          bovenkop="Zo werkt het"
        titel={`Van aanvraag tot waterpas in ${stad.naam}`}
        tekst="U vraagt aan, u krijgt het bedrag, wij hangen hem op. Daartussen hoeft u niets uit te zoeken."
        />
        <div className="mt-14">
          <Werkwijze />
        </div>
      </Vlak>

      <Vlak toon="wit" labelledBy="prijs-kop" id="prijs">
        <Kop
          id="prijs-kop"
          bovenkop="Wat het kost"
        titel={`Wat kost tv ophangen in ${stad.naam}?`}
        tekst={`${PRIJZEN_KORT}, afhankelijk van het formaat van uw tv — inclusief voorrijkosten in ${stad.naam} en btw. Het soort muur verandert dat bedrag niet, in welke wijk u ook woont.`}
        />
        <div className="mt-12">
          <Prijsklassen />
        </div>
        <p className="mt-10">
          <Link
            href="/prijzen"
            className="verwijzing inline-flex min-h-11 items-center"
          >
            Alle tarieven en wat er altijd bij zit
          </Link>
        </p>
      </Vlak>

      {/* Alleen de links naar de dienstpagina's, zonder hun beschrijvingen:
          die teksten zijn op alle 32 stadpagina's woordelijk gelijk, en juist
          díe tekst gebruikte Google als samenvatting in plaats van de lokale
          alinea's hierboven. De ankertekst is de naam van de doelpagina en
          niet "<dienst> in <stad>": die pagina's gaan over de dienst en niet
          over deze plaats. */}
      <Vlak toon="oppervlak" labelledBy="diensten">
        <Kop
          id="diensten"
          bovenkop={`Diensten in ${stad.naam}`}
        titel="Ophangen, aansluiten, instellen — in één bezoek"
        tekst="Eén monteur, één afspraak. Of het nu om de tv, de soundbar of de kabels gaat."
        />
        <ul className="mt-8 flex flex-wrap gap-3">
          {diensten.map((dienst) => (
            <li key={dienst.slug}>
              <Link
                href={dienstHref(dienst)}
                className="pil-klik"
              >
                <DienstIcon slug={dienst.slug} className="size-4" />
                {dienst.naam}
              </Link>
            </li>
          ))}
        </ul>
      </Vlak>

      {/* Brengt zijn eigen sectie met achtergrond mee. */}
      <Reviews toon="wit" />

      <Faqsectie
        titel={`Vragen over tv ophangen in ${stad.naam}`}
        items={faqItems}
        toon="oppervlak"
      >
        {/* Elke stadpagina draagt een FAQ over gipswanden en noemt het
            wegwerken van kabels, zonder ooit naar die pagina's te linken. Dat
            zijn 32 contextuele links die bleven liggen, precies op de
            onderwerpen waar wij het antwoord op hebben. */}
        <RelatedLinks
          items={[
            ["/tv-ophangen", "Tv laten ophangen"],
            ["/tv-ophangen-gipswand", "Tv ophangen aan een gipswand"],
            ["/kabels-wegwerken", "Tv-kabels wegwerken"],
            ["/tv-boven-open-haard", "Tv ophangen boven een open haard"],
            ["/prijzen", "Alle tarieven"],
          ]}
        />
      </Faqsectie>

      <Vlak toon="wit" labelledBy="nabij">
        <Kop
          id="nabij"
          bovenkop="In de buurt"
        titel={`Ook actief rond ${stad.naam}`}
        tekst={`Onze monteurs rijden dagelijks tussen ${stad.naam} en ${opsomming(
            nabijeSteden.map((s) => s.naam),
          )}. Woont u net over de gemeentegrens, dan komen wij er net zo goed.`}
        />
        {/* Ankertekst volgt de titel van de doelpagina ("Tv ophangen in
            <stad>") en niet "tv monteur <stad>": dat laatste is in het
            Nederlands de reparatieterm. De href verandert nooit. */}
        <ul className="mt-8 flex flex-wrap gap-3">
          {nabijeSteden.map((nabijStad) => (
            <li key={nabijStad.slug}>
              <Link
                href={`/tv-ophangen/${nabijStad.slug}`}
                className="pil-klik"
              >
                Tv ophangen in {nabijStad.naam}
              </Link>
            </li>
          ))}
        </ul>
        {/* De provincie van deze stad zit hier zelf ook in. Eén rij met één
            ankertekst per provinciepagina is beter dan een losse "Heel
            <provincie>"-link ernaast: twee links naar dezelfde pagina in één
            sectie verdelen de waarde over twee ankerteksten. */}
        <ProvincieChips prefix="Tv ophangen" withOverview />
      </Vlak>

      {/* Het formulier staat op de pagina zelf en niet achter een knop naar
          /contact: dat was een paginawissel op het moment dat iemand besloten
          heeft, en dat is de stap waar verkeer het makkelijkst verdwijnt. */}
      <Aanvraagsectie
        titel={`Vraag een afspraak aan in ${stad.naam}`}
        tekst={`Vertel kort wat er moet gebeuren en waar u woont. Wij bellen u binnen enkele uren om het tarief te bevestigen — ook in ${stad.naam}.`}
        beloftes={aanvraagBelofte}
      >
        {/* `variant` is het meetlabel in GA4, per stad: zo blijft zichtbaar
            welke stadpagina's aanvragen opleveren. Het formulier brengt zijn
            eigen paneel mee, dus staat er geen tweede omlijsting om. */}
        <ContactForm
          variant={`stad-${stad.slug}`}
          berichtLabel="Uw tv en uw muur"
          berichtPlaceholder="Bijvoorbeeld: 55 inch Samsung, en de wand is gipsplaat."
        />
      </Aanvraagsectie>
    </>
  );
}
