import type { FaqItem } from "./content";

/**
 * Kennisbank: antwoorden op de informatieve zoekvragen rond tv-montage.
 *
 * Deze vragen zijn in Google Ads bewust uitgesloten met negatieve zoekwoorden
 * ("hoe", "zelf ophangen", "handleiding") omdat ze per klik geld kosten zonder
 * directe afspraak. Organisch zijn ze juist waardevol: wie de ophanghoogte
 * opzoekt of uitzoekt welke plug in een gipswand hoort, staat aan het begin van
 * dezelfde klus. Elk artikel geeft eerst een eerlijk, bruikbaar antwoord — ook
 * als dat antwoord "dit kunt u zelf" is — en verwijst daarna naar de dienst.
 */

export type ArtikelSectie = {
  kop: string;
  alineas: string[];
  lijst?: string[];
  tabel?: { kop: string[]; rijen: string[][] };
};

export type Artikel = {
  slug: string;
  /** H1 op de pagina. */
  titel: string;
  /** <title> — zoekwoord vooraan, kort genoeg om niet afgekapt te worden. */
  metaTitel: string;
  beschrijving: string;
  /** Kort label boven de H1. */
  eyebrow: string;
  /**
   * Het antwoord in twee zinnen, direct onder de H1. Google gebruikt zo'n blok
   * vaak als uitgelicht fragment, en de lezer die alleen dit leest is geholpen.
   */
  antwoord: string;
  secties: ArtikelSectie[];
  faq: FaqItem[];
  /** Interne link naar de dienst waar dit artikel op uitkomt. */
  dienst: { label: string; href: string };
  /** Verwante artikelen, als slugs. */
  verwant: string[];
  /** Publicatiedatum, voor het Article-schema. */
  datum: string;
};

export const artikelen: Artikel[] = [
  {
    slug: "hoe-hoog-tv-ophangen",
    titel: "Hoe hoog moet je een tv ophangen?",
    metaTitel: "Hoe Hoog Tv Ophangen? Zo Rekent U Het Uit",
    beschrijving:
      "Hoe hoog hang je een tv op? Het midden van het scherm hoort op ooghoogte als u zit. Met deze rekenregel en tabel per formaat weet u de juiste hoogte.",
    eyebrow: "Kennisbank · Tv ophangen",
    antwoord:
      "Hang uw tv zo op dat het midden van het scherm op ooghoogte zit terwijl u op de bank zit — voor de meeste mensen is dat 100 tot 110 cm boven de vloer. Bij een 55-inch tv komt de onderkant van het scherm dan op ongeveer 70 cm.",
    secties: [
      {
        kop: "De enige maat die telt: het midden van het scherm",
        alineas: [
          "Bijna iedereen meet de verkeerde hoogte. Niet de onderkant van de televisie is bepalend, maar het midden van het scherm, want daar kijkt u naar. Dat midden hoort recht vooruit te liggen als u ontspannen op de bank zit.",
          "Meet daarom uw eigen ooghoogte in zittende positie: ga op de bank zitten waar u normaal zit en laat iemand meten van de vloer tot uw ogen. Bij de meeste zitbanken komt dat uit tussen 100 en 115 cm. Een lage loungebank zit lager, een strakke eetkamerbank hoger. Die ene meting is nauwkeuriger dan elke vuistregel.",
        ],
      },
      {
        kop: "Zo rekent u de hoogte van de beugel uit",
        alineas: [
          "Van het midden van het scherm naar de onderkant is één aftreksom. De hoogte van een 16:9-scherm is ongeveer de helft van de diagonaal: schermhoogte is ruwweg de diagonaal in centimeters maal 0,49.",
          "Onderkant van het scherm = uw ooghoogte zittend min de helft van de schermhoogte. Zit uw ooghoogte op 105 cm en heeft u een 55-inch tv van 68 cm hoog, dan komt de onderkant op 105 min 34, dus 71 cm.",
          "De beugel zelf komt meestal hoger dan de onderkant van het scherm, omdat de VESA-gaten vaak rond het midden van de achterkant zitten. Houd de tv daarom eerst droog tegen de muur, of monteer de wandplaat en meet na voordat u de televisie erin hangt.",
        ],
        tabel: {
          kop: ["Formaat", "Schermhoogte", "Onderkant bij ooghoogte 105 cm"],
          rijen: [
            ["43 inch", "ca. 53 cm", "ca. 78 cm"],
            ["50 inch", "ca. 62 cm", "ca. 74 cm"],
            ["55 inch", "ca. 68 cm", "ca. 71 cm"],
            ["65 inch", "ca. 81 cm", "ca. 65 cm"],
            ["75 inch", "ca. 93 cm", "ca. 58 cm"],
            ["85 inch", "ca. 106 cm", "ca. 52 cm"],
          ],
        },
      },
      {
        kop: "Waarom televisies zo vaak te hoog hangen",
        alineas: [
          "De meest gemaakte fout is de tv op oogniveau hangen terwijl u stáát. In de winkel en tijdens het ophangen staat u, dus die hoogte voelt logisch. Zodra u gaat zitten kijkt u omhoog, en dat houdt u een hele film lang vol in uw nek.",
          "Houd uw kijkhoek vanaf de bank onder ongeveer vijftien graden omhoog. Daarboven gaat u uw hoofd kantelen in plaats van alleen uw ogen. Bij een OLED- of QLED-scherm gaan bovendien het contrast en de kleuren merkbaar achteruit zodra u er schuin van onderaf naar kijkt.",
          "Hangt de televisie noodgedwongen hoger, bijvoorbeeld boven een haard of een hoog dressoir, gebruik dan een kantelbare beugel. Vijf tot vijftien graden kanteling richt het scherm terug naar uw ooghoogte en haalt het ergste van de hoek weg.",
        ],
      },
      {
        kop: "Hoe ver moet de bank van de tv af staan?",
        alineas: [
          "Hoogte en kijkafstand hangen samen: hoe verder u zit, hoe minder een paar centimeter te hoog uitmaakt. Voor 4K-schermen wordt meestal 1,2 tot 1,6 keer de schermbreedte als kijkafstand aangeraden. Bij een 55-inch tv van 122 cm breed is dat ongeveer anderhalve tot twee meter.",
          "Zit u veel verder, dan mag de televisie een paar centimeter hoger zonder dat u het voelt. Zit u er in een kleine kamer dicht op, dan is precies op ooghoogte juist belangrijker.",
        ],
      },
    ],
    faq: [
      {
        q: "Hoe hoog hang je een 55 inch tv op?",
        a: "Bij een gemiddelde zithoogte komt de onderkant van een 55-inch tv op ongeveer 70 cm boven de vloer, met het midden van het scherm rond 105 cm. Meet uw eigen ooghoogte op de bank en trek daar de helft van de schermhoogte af, bij 55 inch is dat 34 cm.",
      },
      {
        q: "Hoe hoog hang je een 65 inch tv op?",
        a: "Een 65-inch scherm is ongeveer 81 cm hoog. Bij een ooghoogte van 105 cm komt de onderkant dus op circa 65 cm. Grotere schermen hangen dus juist lager, niet hoger.",
      },
      {
        q: "Kan een tv te laag hangen?",
        a: "Dat kan, maar het is zeldzaam en veel minder vervelend dan te hoog. Let er wel op dat de onderkant vrij blijft van een dressoir of soundbar, en dat kinderen of huisdieren er niet tegenaan kunnen.",
      },
      {
        q: "Hangen jullie de tv op de hoogte die ik wil?",
        a: "Ja. Onze monteur meet uw zithoogte en kijkafstand ter plekke, houdt de televisie eerst droog tegen de muur en hangt pas op als u akkoord bent met de plek.",
      },
    ],
    dienst: { label: "Tv laten ophangen", href: "/tv-ophangen" },
    verwant: ["welke-tv-beugel", "tv-boven-open-haard"],
    datum: "2026-10-10",
  },
  {
    slug: "welke-tv-beugel",
    titel: "Welke tv-beugel past op mijn tv?",
    metaTitel: "Welke Tv-Beugel Heb Ik Nodig? VESA Uitgelegd",
    beschrijving:
      "Welke tv-beugel past op uw tv? Meet de VESA-maat, controleer het draagvermogen en kies tussen vast, kantelbaar of draaibaar. Zo past hij gegarandeerd.",
    eyebrow: "Kennisbank · Beugels",
    antwoord:
      "Een beugel past op uw tv als de VESA-maat klopt en de beugel het gewicht van uw televisie kan dragen. Meet daarvoor de afstand tussen de vier schroefgaten achterop uw tv in millimeters, horizontaal en verticaal.",
    secties: [
      {
        kop: "VESA-maat: de vier gaten achterop uw tv",
        alineas: [
          "Achterop vrijwel elke televisie zitten vier schroefgaten in een rechthoek. De afstand tussen die gaten is de VESA-maat, altijd genoteerd als breedte maal hoogte in millimeters. Staat er VESA 400x200, dan zitten de gaten 400 mm naast elkaar en 200 mm boven elkaar.",
          "Meten doet u van het hart van het ene gat tot het hart van het gat ernaast. Een rolmaat is genoeg, maar wees nauwkeurig: de standaardmaten liggen dicht bij elkaar. Vaak staat de maat ook in de handleiding of op de typesticker achterop.",
          "Een beugel vermeldt meestal een reeks maten die hij aankan, bijvoorbeeld 100x100 tot 400x400. Valt uw maat daarbinnen, dan past hij. Zit u erbuiten, dan bestaan er VESA-adapterplaten die een kleine maat naar een grotere omzetten.",
        ],
        tabel: {
          kop: ["Schermformaat", "Meest voorkomende VESA-maten"],
          rijen: [
            ["24 tot 32 inch", "100x100 of 200x200"],
            ["32 tot 43 inch", "200x200 of 300x200"],
            ["43 tot 55 inch", "300x300 of 400x200"],
            ["55 tot 65 inch", "400x400 of 400x200"],
            ["65 tot 85 inch", "600x400 of 400x400"],
          ],
        },
      },
      {
        kop: "Draagvermogen: kijk naar de tv én naar de muur",
        alineas: [
          "Op elke beugel staat een maximaal gewicht. Dat getal geldt bij een perfecte montage in een massieve muur en zegt niets over uw eigen wand. Een beugel die vijftig kilo kan dragen, zit nog altijd met pluggen in úw muur vast, en daar zit vaak de zwakste schakel.",
          "In massief baksteen of beton is dat zelden een probleem. In een gipswand, voorzetwand of metal-studwand verschuift de vraag naar wat die wand kan houden, en dan is het type anker of het vastschroeven in de staanders bepalend.",
          "Neem ook de uitslaande arm mee in uw keuze. Een draaibare beugel die veertig centimeter uitklapt, zet een veel groter hefboommoment op de muur dan een platte beugel. Hoe verder de televisie van de wand kan komen, hoe steviger de bevestiging moet zijn.",
        ],
      },
      {
        kop: "Vast, kantelbaar of draaibaar — wat kiest u?",
        alineas: [
          "Deze keuze bepaalt uw beeld en uw prijs meer dan welk merk u neemt.",
        ],
        lijst: [
          "Vaste, platte beugel — de televisie zit vlak tegen de muur, vaak maar twee tot vier centimeter ervandaan. Het strakste beeld, de laagste prijs en de minste belasting op de muur. Kies deze als de tv recht tegenover de bank hangt en u niet achter het scherm hoeft te komen.",
          "Kantelbare beugel — u kunt het scherm vijf tot vijftien graden naar voren kantelen. De oplossing als de televisie hoger moet hangen dan ideaal, bijvoorbeeld boven een haard of een hoge kast.",
          "Draaibare beugel, ook full motion genoemd — de tv klapt uit de muur en draait naar links en rechts. Onmisbaar in een hoek, in een L-vormige woonkamer of als u ook vanuit de keuken wilt kijken. Duurder, dikker tegen de muur en de zwaarste belasting op uw wand.",
          "Plafond- of hoekbeugel — voor situaties zonder bruikbare wand, zoals een slaapkamer met schuine wanden of een bedrijfsruimte.",
        ],
      },
      {
        kop: "Waar mensen misgrijpen",
        alineas: [
          "Drie dingen gaan het vaakst mis bij het kopen van een beugel. Ten eerste de schroeven: VESA schrijft de gatafstand voor, niet de schroefmaat, en die loopt van M4 tot M8. Bij de beugel zit meestal een setje, maar bij een dikke achterkant of een verzonken gat is een langere schroef nodig.",
          "Ten tweede een gebogen of extra dun OLED-scherm waarvan de achterkant niet vlak is. Daar past niet elke beugel vlak tegenaan.",
          "Ten derde de aansluitingen. Hangt de televisie straks twee centimeter van de muur en steekt uw HDMI-kabel recht naar achteren uit, dan past hij niet meer. Haakse HDMI-stekkers lossen dat op — even aan denken vóórdat de tv hangt.",
        ],
      },
    ],
    faq: [
      {
        q: "Wat is de VESA-maat van mijn tv?",
        a: "Meet de horizontale en verticale afstand tussen de vier schroefgaten achterop uw televisie, van hart tot hart, in millimeters. De uitkomst, bijvoorbeeld 400x200, is uw VESA-maat. Hij staat vaak ook in de handleiding of op de sticker achterop.",
      },
      {
        q: "Past elke beugel op elke tv?",
        a: "Nee. De beugel moet uw VESA-maat ondersteunen en het gewicht van uw televisie kunnen dragen. De meeste beugels dekken een reeks maten; valt uw tv erbuiten, dan is een VESA-adapterplaat de oplossing.",
      },
      {
        q: "Moet ik zelf een beugel kopen?",
        a: "Dat mag, en vaak heeft u er al een bij de televisie gekocht. Wij monteren uw eigen beugel als die geschikt is voor uw tv en uw wand. Is dat niet zo, dan zegt onze monteur dat vóór het boren in plaats van erna.",
      },
      {
        q: "Welke beugel is het beste voor een gipswand?",
        a: "Bij voorkeur een platte of licht kantelbare beugel, vastgeschroefd in de metalen of houten staanders achter de gipsplaat. Een draaibare beugel kan wel, maar vraagt een berekening van het draagvermogen en soms een montageplaat over meerdere staanders.",
      },
    ],
    dienst: { label: "Tv laten ophangen", href: "/tv-ophangen" },
    verwant: ["hoe-hoog-tv-ophangen", "tv-zelf-ophangen-of-laten-doen"],
    datum: "2026-10-10",
  },
  {
    slug: "tv-boven-open-haard",
    titel: "Tv boven de open haard: kan dat?",
    metaTitel: "Tv Boven Open Haard Ophangen — Kan Dat?",
    beschrijving:
      "Een tv boven de open haard of gashaard ophangen kan, maar let op warmte, kijkhoogte en het type schouw. Dit is waar u op moet letten voordat u gaat boren.",
    eyebrow: "Kennisbank · Tv ophangen",
    antwoord:
      "Een tv boven een haard kan, maar alleen als de temperatuur achter het scherm onder ongeveer 35 graden blijft en de schouw genoeg draagkracht heeft. De kijkhoogte is daarbij vaak het grootste bezwaar: gebruik een kantelbare beugel.",
    secties: [
      {
        kop: "Drie dingen gaan hier mis",
        alineas: [
          "Boven de haard is de mooiste plek in de kamer en tegelijk de moeilijkste. Er spelen drie problemen die los van elkaar staan, en elk ervan kan de plek alsnog afkeuren.",
        ],
        lijst: [
          "Warmte — opstijgende warmte verzamelt zich precies waar de televisie hangt. De meeste fabrikanten geven een maximale omgevingstemperatuur van rond 35 graden. Daarboven schakelt een scherm zichzelf uit, of verkort u de levensduur stil en langzaam.",
          "Kijkhoogte — een schouw dwingt de televisie vaak naar 130 cm of hoger, terwijl ooghoogte op de bank rond 105 cm ligt. Dat is precies de fout uit ons artikel over ophanghoogte, maar nu bouwkundig vastgelegd.",
          "De wand zelf — een schouw is vaak géén massieve muur. Moderne schouwen zijn regelmatig een voorzetwand van gipsplaat op een stalen frame, met lucht erachter. Een gewone plug houdt daar niets.",
        ],
      },
      {
        kop: "Zo meet u of het warm genoeg wordt om een probleem te zijn",
        alineas: [
          "Gokken hoeft niet. Stook de haard zoals u normaal doet, twee tot drie uur achter elkaar, en hang een thermometer op de plek waar de bovenkant van de televisie komt. Blijft hij onder 35 graden, dan zit u goed. Komt hij daarboven, dan is de plek zonder maatregelen niet geschikt.",
          "Een gashaard met een gesloten front en een goede afvoer geeft doorgaans veel minder stralingswarmte dan een open houthaard. Bij een open haard is de kans groot dat de temperatuur te hoog oploopt, en komt er ook roet en rook bij kijken dat zich in de koelopeningen van de tv zet.",
          "Helpt het net niet? Een uitstekende schoorsteenmantel of een smalle richel boven de haard leidt de warme lucht naar voren, weg van het scherm. Een paar centimeter extra ruimte achter de televisie voor luchtcirculatie helpt ook.",
        ],
      },
      {
        kop: "De kijkhoek oplossen",
        alineas: [
          "Hangt de televisie onvermijdelijk hoog, dan is een kantelbare beugel het minimum. Tien tot vijftien graden kanteling richt het scherm terug naar de bank en haalt het grootste deel van de nekklacht weg.",
          "Er bestaan ook neerklapbare haardbeugels die de televisie bij gebruik tot dertig centimeter naar beneden en naar voren brengen. Die werken goed, maar vragen veel van de wand: in uitgeklapte stand hangt het volle gewicht een halve meter van de muur. In een gipsschouw is dat zelden verantwoord zonder een montageplaat over meerdere staanders.",
          "Zit de bank ver van de haard, dan is een hoge televisie minder bezwaarlijk. Op vier meter afstand voelt 130 cm hoogte heel anders dan op twee meter.",
        ],
      },
      {
        kop: "En de kabels?",
        alineas: [
          "Achter een haard liggen vaak rookkanalen, een gasleiding of isolatie. Blind boren of kabels door de schouw trekken is daar geen optie. In de praktijk werkt een opbouwkabelgoot in de kleur van de schouw, of een route langs de zijkant naar het dressoir ernaast.",
          "Is de schouw een voorzetwand met ruimte erachter, dan kunnen kabels er vaak wel netjes in verdwijnen. Voor stroom hoort dan een vaste wandcontactdoos achter de televisie: een verlengsnoer door een wand is niet toegestaan.",
        ],
      },
    ],
    faq: [
      {
        q: "Mag een tv boven een gashaard hangen?",
        a: "Vaak wel. Een gesloten gashaard geeft minder stralingswarmte dan een open houthaard. Meet tijdens het stoken de temperatuur op de plek van de televisie: blijft die onder ongeveer 35 graden, dan is het verantwoord.",
      },
      {
        q: "Hoe hoog boven de haard mag de tv hangen?",
        a: "Zo laag als bouwkundig kan. Houd minimaal 15 tot 30 cm ruimte tussen de warmtebron en de onderkant van het scherm, en kantel de televisie richting uw zithoogte. Hoe hoger hij hangt, hoe meer kanteling u nodig heeft.",
      },
      {
        q: "Kan een tv kapot gaan van de warmte van een haard?",
        a: "Ja. Langdurig boven de opgegeven omgevingstemperatuur werken verkort de levensduur van de elektronica en het paneel, en kan bij een OLED de beeldkwaliteit blijvend aantasten. Vaak verliest u daarmee ook de garantie.",
      },
      {
        q: "Kunnen jullie beoordelen of het bij mij kan?",
        a: "Ja. Onze monteur bekijkt de schouw, stelt vast welk type wand het is en rekent het draagvermogen na. Kan het niet veilig, dan zeggen we dat en denken we mee over een alternatieve plek.",
      },
    ],
    dienst: { label: "Tv laten ophangen", href: "/tv-ophangen" },
    verwant: ["hoe-hoog-tv-ophangen", "tv-ophangen-gipswand-plug"],
    datum: "2026-10-10",
  },
  {
    slug: "tv-ophangen-gipswand-plug",
    titel: "Welke plug gebruik je in een gipswand?",
    metaTitel: "Tv Ophangen Gipswand: Welke Plug Gebruikt U?",
    beschrijving:
      "Een tv ophangen aan een gipswand vraagt andere bevestiging dan baksteen. Welke plug waar hoort, wat zo’n wand draagt en wanneer u in de staanders schroeft.",
    eyebrow: "Kennisbank · Wanden",
    antwoord:
      "In een gipswand hoort een tv-beugel het liefst vastgeschroefd in de metalen of houten staanders achter de platen. Kan dat niet, dan zijn metalen hollewandankers de enige serieuze optie: gewone nylonpluggen en kunststof tuimelpluggen houden een televisie niet.",
    secties: [
      {
        kop: "Eerst uitzoeken wat voor wand u heeft",
        alineas: [
          "Klop met uw knokkel op de muur. Klinkt het hol en voelt hij licht, dan heeft u een gipsplaatwand, een voorzetwand of een gipsblokwand. Klinkt het dof en massief, dan is het baksteen, beton of kalkzandsteen en kunt u gewoon met nylonpluggen werken.",
          "Bij een holle wand is de vervolgvraag wat erachter zit. Een gipsplaatwand op metal stud heeft stalen staanders, meestal elke veertig of zestig centimeter, met daartussen alleen lucht en soms isolatie. Een voorzetwand is een gipsplaat vlak vóór een massieve muur, met een paar centimeter ruimte ertussen. Een gipsblokwand is massief gips: licht, maar overal even sterk.",
          "Een goedkope magneet verraadt de staanders van een metal-studwand: de schroeven waarmee de platen vastzitten zitten in een rechte verticale lijn in de staander. Een leidingzoeker werkt ook, en vindt tegelijk de stroomkabels waar u niet in wilt boren.",
        ],
      },
      {
        kop: "Welke bevestiging in welke wand",
        alineas: [
          "De keuze hangt volledig af van wat er achter de plaat zit. Dit is de rangorde van sterk naar zwak.",
        ],
        tabel: {
          kop: ["Situatie", "Bevestiging", "Geschikt voor"],
          rijen: [
            [
              "Metal stud, beugel valt op staanders",
              "Zelfborende schroeven in de staander, of een houten montageplaat over twee tot drie staanders",
              "Vrijwel elke televisie, ook 65 inch en groter",
            ],
            [
              "Voorzetwand vóór een massieve muur",
              "Lange nylonpluggen die dóór de plaat in de muur erachter grijpen",
              "Vrijwel elke televisie",
            ],
            [
              "Alleen gipsplaat, geen staander bruikbaar",
              "Metalen hollewandanker, klapanker of molyplug, minimaal vier stuks",
              "Lichtere televisies, berekening nodig",
            ],
            [
              "Gipsblok, massief",
              "Speciale gipsblokplug of chemisch anker",
              "Middelgrote televisies",
            ],
            [
              "Elke holle wand",
              "Gewone kunststof plug of tuimelplug",
              "Niet geschikt voor een televisie",
            ],
          ],
        },
      },
      {
        kop: "Wat een gipswand echt kan dragen",
        alineas: [
          "Eén metalen hollewandanker in gipsplaat van 12,5 mm houdt onder ideale omstandigheden een trekbelasting van enkele tientallen kilo. Dat klinkt ruim voor een televisie van twintig kilo, maar zo werkt het niet: een tv aan de wand hangt niet recht naar beneden. Hij trekt aan de bovenste bevestigingspunten naar buiten en duwt onderaan tegen de plaat.",
          "Hoe verder de televisie van de wand staat, hoe groter dat hefboomeffect. Een platte beugel van drie centimeter is mild; een draaibare beugel die veertig centimeter uitklapt, vermenigvuldigt de kracht op de bovenste ankers. Juist daar bezwijkt een gipswand: niet de plug breekt, maar het gips eromheen brokkelt uit.",
          "Daarom geldt bij gipsplaat zonder bruikbare staander: meer bevestigingspunten, een platte of licht kantelbare beugel, en bij twijfel een montageplaat die de last over een groter oppervlak en meerdere staanders verdeelt. Wie dit niet wil narekenen, moet het niet op gevoel doen — een afgescheurde televisie is duurder dan de montage.",
        ],
      },
      {
        kop: "Stroom en kabels in een holle wand",
        alineas: [
          "Een holle wand heeft één voordeel: kabels kunnen er vaak onzichtbaar in. Een HDMI- of antennekabel mag u er netjes doorheen voeren.",
          "Voor stroom geldt dat niet. Een verlengsnoer of los netsnoer door een wand trekken is in Nederland niet toegestaan; vaste installatie hoort in een installatiebuis met een wandcontactdoos. In de praktijk betekent dat een stopcontact achter de televisie, aangesloten op de bestaande groep. Dat is elektrisch werk, geen montagewerk.",
        ],
      },
    ],
    faq: [
      {
        q: "Kan een tv aan een gipswand hangen?",
        a: "Ja, mits de bevestiging op de constructie is afgestemd. Het liefst schroeven we in de staanders achter de platen; kan dat niet, dan gebruiken we metalen hollewandankers en rekenen we het draagvermogen na. Gewone kunststof pluggen zijn hiervoor niet geschikt.",
      },
      {
        q: "Hoeveel kilo kan een gipswand dragen?",
        a: "Dat hangt af van de plaatdikte, het type anker, het aantal bevestigingspunten en vooral van hoe ver de televisie van de wand komt. Een platte beugel met vier metalen ankers kan een middelgrote tv houden; een uitklapbare beugel vraagt bevestiging in de staanders.",
      },
      {
        q: "Hoe vind ik de staanders achter een gipswand?",
        a: "Met een magneet: die blijft hangen op de schroeven waarmee de platen aan de staander vastzitten, in een rechte verticale lijn. Een leidingzoeker werkt ook en waarschuwt tegelijk voor stroomkabels.",
      },
      {
        q: "Hangen jullie ook televisies op aan een gipswand?",
        a: "Ja, dat is juist waar wij vaak voor gebeld worden. Onze monteur bepaalt het wandtype, zoekt de staanders op, rekent het draagvermogen na en kiest de bevestiging die daarbij hoort.",
      },
    ],
    dienst: {
      label: "Tv ophangen aan gipswand",
      href: "/tv-ophangen-gipswand",
    },
    verwant: ["welke-tv-beugel", "tv-zelf-ophangen-of-laten-doen"],
    datum: "2026-10-10",
  },
  {
    slug: "tv-zelf-ophangen-of-laten-doen",
    titel: "Tv zelf ophangen of laten doen?",
    metaTitel: "Tv Zelf Ophangen of Laten Doen? Een Checklist",
    beschrijving:
      "Kunt u uw tv zelf ophangen of is een monteur verstandiger? Een eerlijke checklist op basis van wandtype, schermformaat, kabels en gereedschap.",
    eyebrow: "Kennisbank · Keuzehulp",
    antwoord:
      "Een televisie tot ongeveer 43 inch aan een massieve bakstenen of betonnen muur hangt u met de juiste pluggen prima zelf op. Bij een holle of gipswand, een scherm vanaf 55 inch, een plek boven een haard of kabels die in de wand moeten, loopt u reëel risico.",
    secties: [
      {
        kop: "Wanneer u het zelf kunt doen",
        alineas: [
          "Laten we eerlijk zijn: heel veel televisies worden met succes door de bewoner zelf opgehangen, en dat is prima. De situatie waarin dat goed gaat is redelijk scherp af te bakenen.",
        ],
        lijst: [
          "De muur is massief baksteen, beton of kalkzandsteen: hij klinkt dof als u erop klopt.",
          "De televisie weegt niet meer dan ongeveer vijftien kilo, wat ruwweg neerkomt op 43 inch of kleiner.",
          "U gebruikt een platte of licht kantelbare beugel, geen uitklapbare arm.",
          "U heeft een klopbore of boorhamer, nylonpluggen van de juiste maat en een waterpas van minimaal zestig centimeter.",
          "De kabels mogen zichtbaar blijven of in een opbouwkabelgoot, en er is al een stopcontact in de buurt.",
          "U kunt het met twee personen doen: één houdt, één schroeft.",
        ],
      },
      {
        kop: "Wanneer u het beter niet zelf doet",
        alineas: [
          "Er zijn vijf situaties waarin de kans op schade of een mislukte montage sterk toeneemt. Niet omdat het onmogelijk is, maar omdat de fout duur en vaak onomkeerbaar is. Herkent u uw situatie hieronder, dan is [uw tv laten ophangen](/tv-ophangen) vrijwel altijd goedkoper dan een beschadigd paneel of een tweede gaatjesronde.",
        ],
        lijst: [
          "Holle wand, gipsplaat, metal stud of voorzetwand — hier is de bevestiging een berekening, geen gevoel. Dit is de meest voorkomende oorzaak van een televisie die later alsnog loskomt; wat er dan wél moet gebeuren staat in [tv ophangen aan een gipswand](/tv-ophangen-gipswand).",
          "Schermen vanaf 55 inch, en zeker vanaf 65 inch — een scherm van vijfentwintig kilo en anderhalve meter breed kantelt makkelijk uit uw handen terwijl u de haken zoekt. Eén keer verkeerd neerzetten op de rand betekent meestal een nieuw paneel.",
          "Boven een haard, in een schacht of naast de meterkast — hier zitten rookkanalen, gasleidingen of stroomgroepen. Blind boren is hier het probleem, niet het ophangen.",
          "Kabels of stroom in de wand — een stopcontact achter de televisie aanleggen is elektrisch werk, en een verlengsnoer door de wand trekken mag niet.",
          "Een draaibare beugel met een lange arm — het hefboommoment op de bovenste pluggen is veel groter dan mensen verwachten, en dat loopt mis in precies die wanden waar men het niet verwacht.",
        ],
      },
      {
        kop: "De rekensom, zonder reclame",
        alineas: [
          "Zelf doen kost u een beugel, pluggen en schroeven, en eventueel een kabelgoot. Heeft u geen boorhamer of leidingzoeker, dan komt daar huur of aanschaf bij. Reken daarnaast op een uur of twee werk, en op het natrekken van de bouten na een week.",
          "Laten doen kost bij ons een vaste prijs per schermformaat, inclusief voorrijkosten, montagemateriaal en btw. Het verschil is niet enorm bij een kleine televisie aan een makkelijke muur: daar is zelf doen gewoon verstandig.",
          "Het verschil wordt groot zodra er iets bijzonders aan de hand is. Een scheur in de gipsplaat repareren, een geraakte leiding, of een televisie van duizend euro die van de muur komt: dan is de montage ineens het goedkoopste deel van het verhaal.",
        ],
      },
      {
        kop: "Twijfelt u? Doe deze drie checks",
        alineas: [
          "Deze drie vragen nemen in vijf minuten de meeste twijfel weg.",
        ],
        lijst: [
          "Klop op de muur. Hol of licht? Dan hoort u in de categorie laten narekenen, ongeacht het formaat van uw televisie.",
          "Zoek het gewicht van uw tv op in de handleiding of op de typesticker. Boven de twintig kilo is tillen én positioneren met twee mensen echt nodig.",
          "Kijk achter de televisie: zit er een stopcontact binnen een meter? Zo niet, dan heeft u een kabelgoot nodig of elektrisch werk, en dat laatste is geen doe-het-zelfklus.",
        ],
      },
    ],
    faq: [
      {
        q: "Is een tv ophangen moeilijk?",
        a: "Aan een massieve muur met een platte beugel en een televisie tot 43 inch is het een overzichtelijke klus voor twee personen. De moeilijkheid zit zelden in het ophangen zelf, maar in het bepalen van de juiste bevestiging bij een holle of gipswand.",
      },
      {
        q: "Welke plug heb ik nodig om een tv op te hangen?",
        a: "In massief baksteen of beton nylonpluggen van 8 of 10 mm met bijbehorende schroeven. In een gipswand of holle wand hoort u in de staanders te schroeven of metalen hollewandankers te gebruiken; gewone kunststof pluggen zijn daar niet geschikt.",
      },
      {
        q: "Hoeveel kost het om een tv te laten ophangen?",
        a: "Bij ons geldt een vaste prijs per schermformaat, altijd inclusief voorrijkosten, montagemateriaal en btw. Op de prijzenpagina staan alle tarieven en opties.",
      },
      {
        q: "Wat als ik al begonnen ben en het lukt niet?",
        a: "Dat gebeurt vaker dan u denkt, meestal bij een wand die hol blijkt te zijn. Onze monteur kan de bestaande gaten beoordelen, waar nodig herstellen en de beugel opnieuw en goed bevestigen.",
      },
    ],
    dienst: { label: "Tv laten ophangen", href: "/tv-ophangen" },
    verwant: ["tv-ophangen-gipswand-plug", "welke-tv-beugel"],
    datum: "2026-10-16",
  },
];

export const artikelBySlug = (slug: string) =>
  artikelen.find((artikel) => artikel.slug === slug);
