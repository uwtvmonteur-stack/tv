import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import InlineCta from "@/components/InlineCta";
import JsonLd from "@/components/JsonLd";
import PrijsGarantie from "@/components/PrijsGarantie";
import RelatedLinks from "@/components/RelatedLinks";
import Reviews from "@/components/Reviews";
import {
  Aanvraagsectie,
  Faqsectie,
  Hero,
  HeroKnoppen,
  Kop,
  Stappen,
  Vinkjes,
  Vlak,
} from "@/components/sections";
import { BELOFTE } from "@/lib/content";
import type { FaqItem } from "@/lib/content";
import { faqJsonLd, pageMeta, serviceJsonLd } from "@/lib/seo";

/**
 * Eigen pagina voor het wegwerken van kabels.
 *
 * Stond tot nu toe alleen als één regel in de tarievenlijst, terwijl het de
 * meest gezochte vervolgvraag is van iemand die net een tv heeft opgehangen
 * ("tv kabels wegwerken", "kabels in de muur wegwerken") én de dienst die in
 * dezelfde rit meekan.
 */
export const metadata = pageMeta({
  title: "Tv-kabels wegwerken — wat het kost",
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

/**
 * De vier manieren, met de duurste onderaan. "Na meting" is geen ontwijking
 * maar de enige eerlijke vermelding: hakwerk hangt af van de wand en de
 * afstand, en een bedrag noemen dat later anders uitvalt kost precies het
 * vertrouwen dat de offerte moet opbouwen.
 */
const manieren = [
  {
    kop: "Kabelgoot in de kleur van uw muur",
    prijs: "vanaf €39",
    wanneer: "Bijna altijd de beste keuze",
    tekst:
      "Een vlakke goot onder de tv waar alle kabels in verdwijnen, gespoten in precies uw muurkleur. Van een meter afstand ziet u er niets meer van. Het grote voordeel: er wordt niet gehakt, dus het kan op elke wand, het is in een half uur klaar en u kunt het later zonder schade weer weghalen — prettig in een huurwoning.",
  },
  {
    kop: "Achter de plint en onder de vloer",
    prijs: "na meting",
    wanneer: "Bij een zwevende vloer of losse plint",
    tekst:
      "Loopt de kabel van de tv naar een kast of versterker aan de andere kant van de kamer, dan gaat hij achter de plint langs in plaats van dwars door de kamer. Werkt alleen als de plint eraf kan en er ruimte achter zit; dat beoordeelt de monteur ter plekke.",
  },
  {
    kop: "Volledig in de muur",
    prijs: "na meting",
    wanneer: "Als u echt niets wilt zien",
    tekst:
      "De kabels gaan in een sleuf in de wand, die daarna wordt dichtgezet en afgewerkt. Het mooiste resultaat en meteen het meeste werk: hakken, stoffen, dichtzetten en laten drogen. Daarom maken we hiervoor vooraf een vaste prijsafspraak, gebaseerd op uw wand en de afstand — u weet het bedrag dus voordat er iets gebeurt.",
  },
  {
    kop: "Achter een voorzetwand",
    prijs: "na meting",
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

const controle = [
  "Metaal, leidingen en bedrading onder spanning opgespoord met een detector",
  "De standaard installatiezones aangehouden waar leidingen horen te lopen",
  "Bij een holle wand: de staanders opgezocht, zodat de sleuf ertussen valt",
  "Signaalkabels gescheiden van stroom, zodat u geen ruis of beeldstoring krijgt",
  "Kan het niet veilig? Dan hakken we niet en stellen we een andere route voor",
];

const aanvraagBelofte = [
  "In dezelfde rit als het ophangen, zonder tweede voorrijbeurt",
  BELOFTE.vrijblijvend,
  BELOFTE.inclusief,
  BELOFTE.avondWeekend,
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
    q: "Hoe lang duurt het wegwerken van de kabels?",
    a: "Een kabelgoot is meestal binnen een half uur klaar en kan direct bij het ophangen. Kabels volledig in de muur wegwerken kost ongeveer anderhalf tot drie uur, afhankelijk van de wand en de afstand, inclusief dichtzetten.",
  },
  {
    q: "Doen jullie dit ook als de tv al hangt?",
    a: "Ja. De tv hoeft er meestal niet eens af: we halen hem van de beugel, werken de kabels weg en hangen hem terug. U betaalt dan het tarief voor het kabelwerk, zonder dat er opnieuw een montageprijs bij komt.",
  },
];

export default function KabelsWegwerkenPage() {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: "Tv-kabels wegwerken",
          description:
            "Kabels van een wandgemonteerde tv wegwerken in een kabelgoot in muurkleur of volledig in de muur, inclusief controle op leidingen.",
          path: "/kabels-wegwerken",
          // "vanaf €39" en niet "39": de goot begint bij dat bedrag, dus hoort
          // er een minPrice in het schema en geen vaste prijs die we niet
          // garanderen. Zie `prijsSpec` in lib/seo.ts.
          offers: [{ name: "Kabels wegwerken in kabelgoot", price: "vanaf €39" }],
        })}
      />
      <JsonLd data={faqJsonLd(faqItems)} />

      <Hero
        kruimels={
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Tv ophangen", href: "/tv-ophangen" },
              { name: "Kabels wegwerken", href: "/kabels-wegwerken" },
            ]}
          />
        }
        bovenkop="Kabels wegwerken"
        // De kop noemt de dienst. "Een tv aan de muur, en geen kabel te zien"
        // beschreef het resultaat maar niet wat u bij ons bestelt, en deze
        // pagina moet vindbaar zijn op precies die woorden.
        titel="Tv-kabels wegwerken, tot u er niets meer van ziet"
        inleiding="Een strak opgehangen tv met drie kabels eronder is geen strak opgehangen tv. Wij werken ze weg: in een goot in uw eigen muurkleur, of volledig uit het zicht in de wand."
        beeld="/images/kabels-weggewerkt.webp"
        beeldAlt="Kabelgoot in de kleur van de muur loopt van een wandgemonteerde televisie naar het dressoir"
      >
        <HeroKnoppen />
        <Vinkjes donker
          items={voordelen}
          className="mt-8 grid gap-3 border-t border-white/15 pt-6 sm:grid-cols-2"
        />
      </Hero>

      <Vlak id="manieren" toon="wit" labelledBy="manieren-kop">
        <Kop
          id="manieren-kop"
          bovenkop="Vier manieren"
        titel="Vier manieren, en wanneer welke past"
        tekst="Er is niet één juiste oplossing. Wat het beste werkt hangt af van uw wand, uw woning en van hoeveel u ervoor overheeft."
        />
        {/* Een genummerde lijst met het bedrag rechts, als een menukaart.
            Hiervoor stonden hier vier kaarten met het nummer in de kop
            gebakken ("1. Kabelgoot…"); nu doet de `ol` het nummeren, en dat
            is ook wat een schermlezer voorleest. */}
        <ol className="mt-10 border-t border-ink-200">
          {manieren.map((manier, i) => (
            <li
              key={manier.kop}
              className="komt-op grid gap-x-6 gap-y-2 border-b border-ink-200 py-6 sm:grid-cols-[auto_1fr_auto] sm:py-7"
            >
              <span
                aria-hidden="true"
                className="cijfers font-display text-h3 font-semibold leading-none text-ink-500"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-h4">{manier.kop}</h3>
                <p className="mt-1 text-sm font-semibold text-amber-800">
                  {manier.wanneer}
                </p>
                <p className="mt-3 max-w-prose text-ink-600">{manier.tekst}</p>
              </div>
              <span className="cijfers font-display text-h4 font-semibold whitespace-nowrap text-ink-950 sm:text-right">
                {manier.prijs}
              </span>
            </li>
          ))}
        </ol>
      </Vlak>

      <Vlak toon="oppervlak" labelledBy="prijs">
        <Kop
          id="prijs"
          bovenkop="Wat het kost"
        titel="Wat kost het wegwerken van uw kabels?"
        tekst="Een kabelgoot in uw eigen muurkleur begint bij €39 als we hem in dezelfde rit meenemen. Kabels volledig in de muur wegwerken is maatwerk: dat bedrag staat vooraf vast, zodat u het kent voordat er gehakt wordt."
        />
        {/* Pal onder de bedragen: "vaste prijs" is pas een argument als erbij
            staat waar hij tegen vast is. */}
        <PrijsGarantie className="mt-10" />
        <p className="mt-9 max-w-3xl text-ink-600">
          Alle tarieven staan bij elkaar op de{" "}
          <Link href="/prijzen" className="verwijzing">
            prijzenpagina
          </Link>
          , inclusief wat er bij een montage altijd bij zit.
        </p>

        <InlineCta
          href="#afspraak"
          title="Zal ik het meteen meenemen?"
          text="Kabels wegwerken tijdens het ophangen scheelt u een tweede afspraak en een tweede keer thuisblijven."
        />
      </Vlak>

      <Vlak toon="wit" labelledBy="werkwijze">
        <Kop
          id="werkwijze"
          bovenkop="Zo werkt het"
        titel="Zo gaat het wegwerken van uw kabels"
        tekst="Vier stappen, en u hoeft er zelf maar één van te doen: zeggen wat u wilt."
        />
        <div className="mt-12">
          <Stappen items={stappen} kolommen={4} />
        </div>
      </Vlak>

      <Vlak toon="oppervlak" labelledBy="controle">
        <Kop
          id="controle"
          bovenkop="Veiligheid"
        titel="Wat wij controleren vóór we hakken"
        tekst="In een muur zitten dingen die u niet ziet. Een sleuf op de verkeerde plek raakt een waterleiding of de bedrading van het stopcontact erboven. Daarom gaat er altijd eerst een controle overheen — en zeggen we het eerlijk als een route niet veilig kan."
        />
        <Vinkjes
          items={controle}
          className="mt-10 grid max-w-4xl gap-3.5 sm:grid-cols-2"
        />
      </Vlak>

      <Reviews toon="wit" />

      <Faqsectie
        titel="Veelgestelde vragen over kabels wegwerken"
        items={faqItems}
        toon="oppervlak"
      >
        <RelatedLinks
          items={[
            ["/tv-ophangen", "Tv laten ophangen"],
            ["/tv-ophangen-gipswand", "Ophangen aan een gipswand"],
            ["/diensten/soundbar-installatie", "Soundbar installeren"],
            ["/prijzen", "Alle tarieven"],
          ]}
        />
      </Faqsectie>

      <Aanvraagsectie
        toon="wit"
        titel="Geen kabel meer in het zicht?"
        tekst="Vertel kort wat er moet gebeuren en waar u woont. Vraagt u het aan bij uw montage, dan doen we het in dezelfde rit — u hoeft ons dus geen tweede keer thuis te laten komen."
        beloftes={aanvraagBelofte}
      >
        <ContactForm
          variant="kabels-wegwerken"
          berichtLabel="Uw tv en uw wand"
          berichtPlaceholder="Bijvoorbeeld: 55 inch, stopcontact zit 2 meter links van de tv."
        />
      </Aanvraagsectie>
    </>
  );
}
