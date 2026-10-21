import ServiceHero from "@/components/ServiceHero";
import Stappen from "@/components/Stappen";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import Reviews from "@/components/Reviews";
import CheckList from "@/components/CheckList";
import InlineCta from "@/components/InlineCta";
import CtaSection from "@/components/CtaSection";
import RelatedLinks from "@/components/RelatedLinks";
import PrijsGarantie from "@/components/PrijsGarantie";
import { Card } from "@/components/ui";
import type { FaqItem } from "@/lib/content";
import { faqJsonLd, pageMeta, serviceJsonLd } from "@/lib/seo";
import heroFoto from "@/public/images/dienst-kabels-wegwerken.jpg";

/**
 * Eigen pagina voor het wegwerken van kabels.
 *
 * Stond tot nu toe alleen als één regel in de tarievenlijst, terwijl het de
 * meest gezochte vervolgvraag is van iemand die net een tv heeft opgehangen
 * ("tv kabels wegwerken", "kabels in de muur wegwerken") én de dienst die in
 * dezelfde rit meekan. De foto ervoor stond al in het project en werd
 * nergens gebruikt.
 */
export const metadata = pageMeta({
  title: "Tv-kabels wegwerken — vier manieren en wat ze kosten",
  description:
    "Kabels van uw tv netjes wegwerken: in een kabelgoot in muurkleur vanaf €39, of volledig in de muur. Wij leggen uit wat in uw situatie mag en wat het kost.",
  path: "/kabels-wegwerken",
});

const voordelen = [
  "Kabelgoot gespoten in de kleur van uw muur — vanaf €39",
  "Of volledig uit het zicht, in de muur",
  "Altijd eerst gecontroleerd op leidingen achter het stucwerk",
  "In dezelfde rit als het ophangen, zonder tweede voorrijbeurt",
];

const manieren = [
  {
    kop: "1. Kabelgoot in de kleur van uw muur",
    prijs: "vanaf €39",
    wanneer: "Bijna altijd de beste keuze",
    tekst:
      "Een vlakke goot onder de tv waar alle kabels in verdwijnen, gespoten in precies uw muurkleur. Van een meter afstand ziet u er niets meer van. Het grote voordeel: er wordt niet gehakt, dus het kan op elke wand, het is in een half uur klaar en u kunt het later zonder schade weer weghalen — prettig in een huurwoning.",
  },
  {
    kop: "2. Achter de plint en onder de vloer",
    prijs: "op maat",
    wanneer: "Bij een zwevende vloer of losse plint",
    tekst:
      "Loopt de kabel van de tv naar een kast of versterker aan de andere kant van de kamer, dan gaat hij achter de plint langs in plaats van dwars door de kamer. Werkt alleen als de plint eraf kan en er ruimte achter zit; dat beoordeelt de monteur ter plekke.",
  },
  {
    kop: "3. Volledig in de muur",
    prijs: "op maat",
    wanneer: "Als u echt niets wilt zien",
    tekst:
      "De kabels gaan in een sleuf in de wand, die daarna wordt dichtgezet en afgewerkt. Het mooiste resultaat en meteen het meeste werk: hakken, stoffen, dichtzetten en laten drogen. Daarom maken we hiervoor vooraf een vaste prijsafspraak, gebaseerd op uw wand en de afstand — u weet het bedrag dus voordat er iets gebeurt.",
  },
  {
    kop: "4. Achter een voorzetwand",
    prijs: "op maat",
    wanneer: "Bij een complete tv-wand",
    tekst:
      "Wordt er toch een voorzetwand of tv-wand gebouwd, dan verdwijnt alles daarachter: stroom, HDMI, netwerk en de speakerkabels. Dit vraagt om vooraf nadenken over wat er later nog bij moet kunnen, want achteraf een kabel bijtrekken kan dan niet meer.",
  },
];

const stappen = [
  {
    title: "U vertelt wat u wilt",
    text: "Alles netjes in een goot, of echt helemaal uit het zicht. Wij zeggen eerlijk wat in uw situatie kan.",
  },
  {
    title: "Wij controleren de wand",
    text: "Met een detector zoeken we naar leidingen en bedrading voordat er ook maar iets wordt geboord of gehakt.",
  },
  {
    title: "U hoort de prijs",
    text: "Een goot heeft een vast tarief. Voor werk in de muur maken we eerst een vaste prijsafspraak; u beslist dan pas.",
  },
  {
    title: "Wij werken en ruimen op",
    text: "Stofvrij werken waar het kan, en het gruis en de verpakking gaan mee. U houdt een schone kamer over.",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "Mag de stroomkabel van mijn tv zomaar de muur in?",
    a: "Nee, en dat is belangrijk. Een gewone stekkerkabel hoort niet weggewerkt te worden in een wand: dat mag niet en het is onveilig. De juiste oplossing is een extra wandcontactdoos achter de tv, vast aangesloten met installatiedraad. Alleen de signaalkabels (HDMI, netwerk, antenne) mogen wel los door de wand. Wij vertellen u vooraf welke van de twee uw situatie nodig heeft.",
  },
  {
    q: "Wat kost kabels wegwerken?",
    a: "Een kabelgoot, gespoten in de kleur van uw muur, kost vanaf €39 als we hem in dezelfde rit meenemen. Kabels volledig in de muur wegwerken is maatwerk: dat hangt af van het wandtype, de afstand en de afwerking. Daarvoor maken we vooraf een vaste prijsafspraak, zodat u het bedrag kent voordat er gehakt wordt.",
  },
  {
    q: "Kan het ook in een huurwoning?",
    a: "Een kabelgoot wel: die zit met montagetape of een paar schroeven vast en laat nauwelijks sporen na. Hakken in de muur is iets wat u eerst met uw verhuurder moet afstemmen — vraag dat even na voordat u ons laat komen, dan is uw afspraak niet voor niets.",
  },
  {
    q: "Hoe weet u dat er geen leiding achter zit?",
    a: "We zoeken de wand af met een detector die metaal, bedrading onder spanning en houten staanders vindt, en we houden de standaard installatiezones aan waar leidingen horen te lopen. Twijfelen we, dan hakken we niet — dan stellen we een route voor die wél veilig is.",
  },
  {
    q: "Hoe lang duurt het?",
    a: "Een kabelgoot is meestal binnen een half uur klaar en kan direct bij het ophangen. Kabels volledig in de muur wegwerken kost ongeveer anderhalf tot drie uur, afhankelijk van de wand en de afstand, inclusief dichtzetten.",
  },
  {
    q: "Doen jullie dit ook als de tv al hangt?",
    a: "Ja. De tv hoeft er meestal niet eens af: we halen hem van de beugel, werken de kabels weg en hangen hem terug. U betaalt dan het tarief voor het kabelwerk, zonder dat er opnieuw een montageprijs bij komt.",
  },
];

export default function KabelsWegwerkenPage() {
  return (
    <main>
      <JsonLd
        data={serviceJsonLd({
          name: "Tv-kabels wegwerken",
          description:
            "Kabels van een wandgemonteerde tv wegwerken in een kabelgoot in muurkleur of volledig in de muur, inclusief controle op leidingen.",
          path: "/kabels-wegwerken",
          offers: [{ name: "Kabels wegwerken in kabelgoot", price: "39" }],
        })}
      />
      <JsonLd data={faqJsonLd(faqItems)} />

      <ServiceHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Tv ophangen", href: "/tv-ophangen" },
          { name: "Kabels wegwerken", href: "/kabels-wegwerken" },
        ]}
        eyebrow="Kabels wegwerken"
        title="Een tv aan de muur, en geen kabel te zien"
        intro="Een strak opgehangen tv met drie kabels eronder is geen strak opgehangen tv. Wij werken ze weg: in een goot in uw eigen muurkleur, of volledig uit het zicht in de wand."
        benefits={voordelen}
        image={heroFoto}
        imageAlt="Kabels van een wandgemonteerde tv weggewerkt in een goot in muurkleur"
        formulier={{
          titel: "Vraag uw offerte aan voor het kabelwerk",
          intro:
            "Vinkt u het aan bij uw afspraak, dan doen we het in dezelfde rit — u hoeft ons dus geen tweede keer thuis te laten komen.",
          submitLabel: "Offerte aanvragen",
          variant: "kabels-wegwerken-hero",
          berichtLabel: "Uw tv en uw wand",
          berichtPlaceholder:
            "Bijvoorbeeld: 55 inch, stopcontact zit 2 meter links van de tv.",
        }}
      />

      <section className="mx-auto w-full max-w-content px-gutter py-section">
        <Reveal>
          <h2 className="font-display text-h2 font-semibold">
            Vier manieren, en wanneer welke past
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-4 max-w-prose text-lead text-pretty text-fg-muted">
            Er is niet één juiste oplossing. Wat het beste werkt hangt af van
            uw wand, uw woning en van hoeveel u ervoor overheeft.
          </p>
        </Reveal>

        <ul className="mt-stack grid gap-4 md:grid-cols-2">
          {manieren.map((manier, i) => (
            <li key={manier.kop} className="h-full">
              <Reveal delay={(i % 2) * 60} className="h-full">
                <Card className="flex h-full flex-col p-7">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-h3 font-semibold">
                      {manier.kop}
                    </h3>
                    <span className="shrink-0 font-display font-semibold whitespace-nowrap tabular">
                      {manier.prijs}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-accent-fg">
                    {manier.wanneer}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                    {manier.tekst}
                  </p>
                </Card>
              </Reveal>
            </li>
          ))}
        </ul>

        <PrijsGarantie className="mt-10" />

        <InlineCta
          href="#offerte"
          title="Zal ik het meteen meenemen?"
          text="Kabels wegwerken tijdens het ophangen scheelt u een tweede afspraak en een tweede keer thuisblijven."
        />

        <Stappen title="Zo gaat het wegwerken van uw kabels" steps={stappen} />

        <Reveal>
          <h2 className="mt-block font-display text-h2 font-semibold">
            Wat wij controleren vóór we hakken
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-4 max-w-prose leading-relaxed text-fg-muted">
            In een muur zitten dingen die u niet ziet. Een sleuf op de
            verkeerde plek raakt een waterleiding of de bedrading van het
            stopcontact erboven. Daarom gaat er altijd eerst een controle
            overheen — en zeggen we het eerlijk als een route niet veilig kan.
          </p>
        </Reveal>
        <Reveal delay={150}>
          <CheckList
            items={[
              "Metaal, leidingen en bedrading onder spanning opgespoord met een detector",
              "De standaard installatiezones aangehouden waar leidingen horen te lopen",
              "Bij een holle wand: de staanders opgezocht, zodat de sleuf ertussen valt",
              "Signaalkabels gescheiden van stroom, zodat u geen ruis of beeldstoring krijgt",
              "Kan het niet veilig? Dan hakken we niet en stellen we een andere route voor",
            ]}
            className="mt-8 grid max-w-4xl gap-3 sm:grid-cols-2"
          />
        </Reveal>

        <Reveal>
          <h2 className="mt-block font-display text-h2 font-semibold">
            Veelgestelde vragen over kabels wegwerken
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-8 max-w-3xl">
            <Faq items={faqItems} />
          </div>
        </Reveal>

        <RelatedLinks
          items={[
            ["/tv-ophangen", "Tv laten ophangen"],
            ["/tv-ophangen-gipswand", "Ophangen aan een gipswand"],
            ["/diensten/soundbar-installatie", "Soundbar installeren"],
            ["/prijzen", "Alle tarieven"],
          ]}
        />
      </section>

      <Reviews />

      <CtaSection href="#offerte" title="Geen kabel meer in het zicht?" />
    </main>
  );
}
