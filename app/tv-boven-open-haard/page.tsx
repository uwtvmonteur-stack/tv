import ServiceHero from "@/components/ServiceHero";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import Reviews from "@/components/Reviews";
import CheckList from "@/components/CheckList";
import InlineCta from "@/components/InlineCta";
import CtaSection from "@/components/CtaSection";
import RelatedLinks from "@/components/RelatedLinks";
import Stappen from "@/components/Stappen";
import { Card } from "@/components/ui";
import type { FaqItem } from "@/lib/content";
import { faqJsonLd, pageMeta, serviceJsonLd } from "@/lib/seo";
import heroFoto from "@/public/images/tv-beugel-detail.jpg";

/**
 * Tv boven een haard.
 *
 * Dit is de klus waar niemand in deze markt een pagina over heeft: wie erop
 * zoekt krijgt haardenwinkels en forumdraadjes. Het is tegelijk de duurste
 * montage die er is, en de enige waarbij een verkeerd antwoord de televisie
 * van de klant kost. Daarom staat hier wat wij meten en wanneer wij nee
 * zeggen — dat is precies het verschil met een platform dat de klus
 * doorgeeft.
 */
export const metadata = pageMeta({
  title: "Tv ophangen boven een open haard — kan dat veilig?",
  description:
    "Tv boven de haard ophangen: wij meten de temperatuur en de kijkhoogte vóór we boren, en zeggen het eerlijk als het niet veilig kan. Vaste prijsafspraak vooraf.",
  path: "/tv-boven-open-haard",
});

const voordelen = [
  "Temperatuur gemeten op de hoogte waar uw tv komt te hangen",
  "Kijkhoogte opgelost met een kantel- of neerklapbeugel",
  "Kan het niet veilig? Dan zeggen we dat vóórdat we boren",
  "Vaste prijsafspraak vooraf, u beslist daarna pas",
];

const risicos = [
  {
    kop: "De warmte",
    tekst:
      "De meeste televisies zijn gemaakt voor een omgeving tot ongeveer 35 graden. Boven een brandende houtkachel loopt de temperatuur tegen het plafond makkelijk hoger op. Het scherm gaat er niet meteen van stuk; het gaat jaren eerder stuk, en dat valt buiten elke garantie. Daarom meten wij het eerst, op de hoogte waar uw tv echt komt te hangen, met de haard aan.",
  },
  {
    kop: "De kijkhoogte",
    tekst:
      "Boven een schouw hangt een tv al snel op anderhalve meter of hoger. U kijkt dan met uw hoofd omhoog, een hele film lang. Dat is de reden dat mensen achteraf zeggen dat hij toch niet lekker hangt. Oplosbaar — maar alleen met een beugel die kantelt of naar beneden klapt, en daar moet de wand tegen kunnen.",
  },
  {
    kop: "De wand",
    tekst:
      "Een schouw is vaak niet van massief metselwerk, maar een opgebouwde constructie van gips of kalkzandsteen om een kachel heen, soms met een luchtspouw erachter. Een neerklapbeugel trekt daar veel harder aan dan een vlakke beugel. Het draagvermogen moet dus écht nagerekend worden, niet geschat.",
  },
  {
    kop: "De kabels",
    tekst:
      "Kabels mogen niet langs het hete deel van het rookkanaal lopen, en een stekkerkabel hoort sowieso niet weggewerkt te worden in een wand. Meestal wordt het een extra wandcontactdoos naast de schouw, met de signaalkabels apart. Wat uw situatie nodig heeft, hoort u vooraf.",
  },
];

const stappen = [
  {
    title: "U stuurt een foto",
    text: "Van uw haard en de wand erboven. Daarmee zien we vooraf al of het kansrijk is en wat we moeten meenemen.",
  },
  {
    title: "Wij meten ter plekke",
    text: "De temperatuur op de beoogde hoogte, het wandtype, het draagvermogen en de kijkafstand vanaf uw bank.",
  },
  {
    title: "U hoort het eerlijke antwoord",
    text: "Kan het veilig, dan krijgt u een vaste prijs. Kan het niet, dan zeggen we dat — en denken we mee over een andere plek.",
  },
  {
    title: "Wij hangen hem op",
    text: "Met de beugel die bij uw hoogte en uw wand past, waterpas, aangesloten en belast getest.",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "Kan een tv veilig boven een open haard hangen?",
    a: "Soms wel, soms niet — en dat hangt af van uw haard, niet van uw tv. Boven een elektrische sfeerhaard kan het vrijwel altijd. Boven een gashaard meestal wel, mits er een schouw of overstek boven zit die de warmte naar voren leidt. Boven een houtkachel of een echte open haard is het risico het grootst, omdat de warmte daar het hoogst oploopt en het minst te sturen is. Wij meten het bij u thuis voordat we iets beloven.",
  },
  {
    q: "Hoe weet u of het te warm wordt?",
    a: "We meten de temperatuur op precies de hoogte waar de onderkant van uw tv komt te hangen, terwijl de haard brandt. De vuistregel die wij aanhouden is dat het daar niet boven de 35 graden mag komen; dat is de grens die de meeste fabrikanten in hun handleiding noemen. Zit u daar met een flinke marge onder, dan is het goed. Zit u eroverheen, dan zeggen we nee.",
  },
  {
    q: "Hangt hij dan niet veel te hoog?",
    a: "Boven een schouw wel, als u een vlakke beugel gebruikt. Daarom doen we dit vrijwel altijd met een kantelbeugel of een neerklapbeugel: die laatste brengt het scherm bij gebruik omlaag tot ooghoogte en klapt daarna weer netjes terug omhoog. Dat is duurder dan een vlakke beugel, maar het is het verschil tussen een tv die u gebruikt en een tv waar u naar opkijkt.",
  },
  {
    q: "Wat kost een tv boven de haard ophangen?",
    a: "Dit is de enige montage waarvoor we geen standaardtarief noemen, omdat de situatie per woning echt verschilt: het wandtype, het soort haard, de hoogte en het type beugel bepalen samen het werk. We maken vooraf een vaste prijsafspraak op basis van wat we bij u zien. Daarna verandert dat bedrag niet meer, ook niet als het werk tegenvalt.",
  },
  {
    q: "Wat als het bij mij niet kan?",
    a: "Dan hoort u dat, en dan boren we niet. We denken wel mee over een alternatief: een plek naast de haard, een lagere ophanging met een neerklapbeugel, of een afscherming boven de haard die de warmte naar voren stuurt. Wij hebben er niets aan om een tv op te hangen die over twee jaar kapot is.",
  },
  {
    q: "Geldt mijn fabrieksgarantie nog?",
    a: "Als het scherm structureel warmer wordt dan de fabrikant toestaat, kan een fabrikant een beroep op garantie afwijzen. Precies daarom meten we het vooraf en leggen we vast wat we gemeten hebben. Zo weet u zeker dat uw tv binnen zijn eigen specificaties hangt.",
  },
];

export default function TvBovenOpenHaardPage() {
  return (
    <main>
      <JsonLd
        data={serviceJsonLd({
          name: "Tv ophangen boven een open haard",
          description:
            "Een televisie boven een haard ophangen, met temperatuurmeting, controle van het draagvermogen en een beugel die de kijkhoogte oplost.",
          path: "/tv-boven-open-haard",
        })}
      />
      <JsonLd data={faqJsonLd(faqItems)} />

      <ServiceHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Tv ophangen", href: "/tv-ophangen" },
          { name: "Boven een open haard", href: "/tv-boven-open-haard" },
        ]}
        eyebrow="Tv boven de haard"
        title="Een tv boven de haard — kan dat bij u veilig?"
        intro="Het mooiste plekje in de kamer is ook het lastigste. Wij meten eerst hoe warm het daar werkelijk wordt en hoe hoog u straks moet kijken, en zeggen het eerlijk als het niet kan."
        benefits={voordelen}
        image={heroFoto}
        imageAlt="Detail van een stevige tv-beugel die aan de muur wordt gemonteerd"
        formulier={{
          titel: "Laat ons eerst even kijken",
          intro:
            "Zet in het bericht wat voor haard u heeft — hout, gas of elektrisch — en hoe hoog de schouw zit. Dan weet de monteur vooraf wat hij moet meenemen.",
          submitLabel: "Offerte aanvragen",
          variant: "open-haard-hero",
          berichtLabel: "Uw haard en uw tv",
          berichtPlaceholder:
            "Bijvoorbeeld: gashaard met schouw, 55 inch Samsung, schouw op 1,30 m.",
        }}
      />

      <section className="mx-auto w-full max-w-content px-gutter py-section">
        <Reveal>
          <h2 className="font-display text-h2 font-semibold">
            Vier dingen die hier anders zijn dan bij een gewone muur
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-4 max-w-prose text-lead text-pretty text-fg-muted">
            Een tv boven een haard is geen zwaardere versie van een normale
            montage. Het is een andere klus, met vier dingen die eerst
            uitgezocht moeten worden.
          </p>
        </Reveal>

        <ul className="mt-stack grid gap-4 md:grid-cols-2">
          {risicos.map((risico, i) => (
            <li key={risico.kop} className="h-full">
              <Reveal delay={(i % 2) * 60} className="h-full">
                <Card className="flex h-full flex-col p-7">
                  <h3 className="font-display text-h3 font-semibold">
                    {risico.kop}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                    {risico.tekst}
                  </p>
                </Card>
              </Reveal>
            </li>
          ))}
        </ul>

        <InlineCta
          href="#offerte"
          title="Liever eerst zekerheid dan een gok"
          text="Wij meten het bij u thuis en zeggen eerlijk wat er kan. Kan het niet veilig, dan boren we niet."
        />

        <Stappen title="Zo pakken wij het aan" steps={stappen} />

        <Reveal>
          <h2 className="mt-block font-display text-h2 font-semibold">
            Wat wij meten voordat we iets beloven
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <CheckList
            items={[
              "De temperatuur op de hoogte van de onderkant van uw tv, met de haard aan",
              "Het soort haard: elektrisch, gas of hout — dat bepaalt het risico",
              "Of er een schouw of overstek is die de warmte naar voren leidt",
              "Het wandtype en het draagvermogen, zwaarder belast bij een neerklapbeugel",
              "De kijkhoogte vanaf de plek waar u werkelijk zit",
              "Een veilige route voor de kabels, uit de buurt van het rookkanaal",
            ]}
            className="mt-8 grid max-w-4xl gap-3 sm:grid-cols-2"
          />
        </Reveal>

        <Reveal>
          <h2 className="mt-block font-display text-h2 font-semibold">
            Veelgestelde vragen over tv boven de haard
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
            ["/kabels-wegwerken", "Kabels wegwerken"],
            [
              "/kennisbank/hoe-hoog-tv-ophangen",
              "Op welke hoogte hangt een tv?",
            ],
          ]}
        />
      </section>

      <Reviews />

      <CtaSection href="#offerte" title="Zal ik komen kijken of het kan?" />
    </main>
  );
}
