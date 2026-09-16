export type Provincie = {
  naam: string;
  slug: string;
  iso: string;
  intro: string;
};

export type Stad = {
  naam: string;
  slug: string;
  provincie: string;
  lat: number;
  lng: number;
  blurb: string;
  wijken: string[];
  nabij: string[];
};

export const provincies: Provincie[] = [
  {
    naam: "Zuid-Holland",
    slug: "zuid-holland",
    iso: "ZH",
    intro:
      "Van de Rotterdamse hoogbouw tot de historische binnenstad van Leiden: in Zuid-Holland zijn onze tv-monteurs dagelijks onderweg. Dankzij meerdere monteurs in de regio kunnen we u vrijwel altijd binnen 24 uur helpen.",
  },
  {
    naam: "Noord-Holland",
    slug: "noord-holland",
    iso: "NH",
    intro:
      "Amsterdam, Haarlem, Alkmaar of de Zaanstreek: in Noord-Holland hangen we wekelijks tientallen tv's op. Onze monteurs kennen de regio — en de uiteenlopende muren van grachtenpand tot nieuwbouw — door en door.",
  },
  {
    naam: "Utrecht",
    slug: "utrecht-provincie",
    iso: "UT",
    intro:
      "Midden in het land, midden in ons werkgebied: de provincie Utrecht bedienen we snel en flexibel. Van de stad Utrecht tot Amersfoort en de Heuvelrug — vaak nog dezelfde week een afspraak.",
  },
  {
    naam: "Noord-Brabant",
    slug: "noord-brabant",
    iso: "NB",
    intro:
      "Van Eindhoven tot Breda en van Tilburg tot Den Bosch: in heel Noord-Brabant staan onze tv-monteurs voor u klaar. Gastvrij, vakkundig en altijd met een strak eindresultaat.",
  },
];

export const steden: Stad[] = [
  // Zuid-Holland
  {
    naam: "Rotterdam",
    slug: "rotterdam",
    provincie: "zuid-holland",
    lat: 51.92,
    lng: 4.48,
    blurb:
      "Van appartementen op Katendrecht tot gezinswoningen in Hillegersberg: onze monteurs kennen de Rotterdamse bouwstijlen — inclusief de betonwanden van naoorlogse flats — als geen ander.",
    wijken: ["Kralingen", "Hillegersberg", "Katendrecht", "Delfshaven", "Prins Alexander", "Charlois"],
    nabij: ["den-haag", "delft", "dordrecht"],
  },
  {
    naam: "Den Haag",
    slug: "den-haag",
    provincie: "zuid-holland",
    lat: 52.08,
    lng: 4.31,
    blurb:
      "Of u nu in een Haags herenhuis in het Statenkwartier woont of in een nieuwbouwappartement in Ypenburg: wij hangen uw tv veilig en strak aan elke muur.",
    wijken: ["Scheveningen", "Statenkwartier", "Bezuidenhout", "Ypenburg", "Loosduinen", "Leidschenveen"],
    nabij: ["delft", "zoetermeer", "leiden"],
  },
  {
    naam: "Leiden",
    slug: "leiden",
    provincie: "zuid-holland",
    lat: 52.16,
    lng: 4.49,
    blurb:
      "De historische panden in de Leidse binnenstad vragen om extra aandacht bij het boren — onze monteurs weten precies welke bevestiging bij welke muur past.",
    wijken: ["Binnenstad", "Merenwijk", "Stevenshof", "Roomburg", "De Mors"],
    nabij: ["den-haag", "alphen-aan-den-rijn", "zoetermeer"],
  },
  {
    naam: "Delft",
    slug: "delft",
    provincie: "zuid-holland",
    lat: 52.01,
    lng: 4.36,
    blurb:
      "Van studentenstudio's bij de TU tot monumentale grachtenpanden in het centrum: in Delft monteren we tv's op de meest uiteenlopende muren.",
    wijken: ["Binnenstad", "Tanthof", "Voorhof", "Buitenhof", "Hof van Delft"],
    nabij: ["den-haag", "rotterdam", "zoetermeer"],
  },
  {
    naam: "Dordrecht",
    slug: "dordrecht",
    provincie: "zuid-holland",
    lat: 51.81,
    lng: 4.67,
    blurb:
      "De oudste stad van Holland telt veel karakteristieke panden; wij combineren zorgvuldig boorwerk met een strak, onzichtbaar afgewerkt eindresultaat.",
    wijken: ["Dubbeldam", "Sterrenburg", "Stadspolders", "Krispijn", "Wielwijk"],
    nabij: ["rotterdam", "gouda", "breda"],
  },
  {
    naam: "Zoetermeer",
    slug: "zoetermeer",
    provincie: "zuid-holland",
    lat: 52.06,
    lng: 4.49,
    blurb:
      "In de ruime gezinswoningen van Rokkeveen en Oosterheem is een draaibare beugel vaak de beste keuze — onze monteur adviseert gewoon bij u thuis.",
    wijken: ["Rokkeveen", "Oosterheem", "Meerzicht", "Buytenwegh", "Seghwaert"],
    nabij: ["den-haag", "delft", "gouda"],
  },
  {
    naam: "Gouda",
    slug: "gouda",
    provincie: "zuid-holland",
    lat: 52.01,
    lng: 4.71,
    blurb:
      "Tussen de historische binnenstad en nieuwbouwwijk Westergouwe hangen onze monteurs wekelijks tv's op — altijd waterpas en zonder zichtbare kabels.",
    wijken: ["Bloemendaal", "Goverwelle", "Korte Akkeren", "Westergouwe", "Plaswijck"],
    nabij: ["rotterdam", "zoetermeer", "woerden"],
  },
  {
    naam: "Alphen aan den Rijn",
    slug: "alphen-aan-den-rijn",
    provincie: "zuid-holland",
    lat: 52.13,
    lng: 4.66,
    blurb:
      "Centraal in het Groene Hart: in Alphen aan den Rijn en de omliggende dorpen staan we vaak nog dezelfde week bij u op de stoep.",
    wijken: ["Kerk en Zanen", "Ridderveld", "Zuid", "Centrum", "Ridderbuurt"],
    nabij: ["leiden", "gouda", "woerden"],
  },
  // Noord-Holland
  {
    naam: "Amsterdam",
    slug: "amsterdam",
    provincie: "noord-holland",
    lat: 52.37,
    lng: 4.9,
    blurb:
      "Grachtenpand in De Pijp of nieuwbouw op IJburg: Amsterdamse muren verschillen enorm, en onze monteurs hebben ze allemaal al eens geboord.",
    wijken: ["De Pijp", "Jordaan", "IJburg", "Amsterdam-Noord", "Oost", "Nieuw-West"],
    nabij: ["amstelveen", "haarlem", "zaandam"],
  },
  {
    naam: "Haarlem",
    slug: "haarlem",
    provincie: "noord-holland",
    lat: 52.39,
    lng: 4.64,
    blurb:
      "In de Haarlemse jaren-30-woningen werken we kabels graag volledig in de muur weg — een strak resultaat dat past bij de stijl van uw huis.",
    wijken: ["Schalkwijk", "Haarlem-Noord", "Centrum", "Zuidwest", "Oost"],
    nabij: ["amsterdam", "hoofddorp", "zaandam"],
  },
  {
    naam: "Alkmaar",
    slug: "alkmaar",
    provincie: "noord-holland",
    lat: 52.63,
    lng: 4.75,
    blurb:
      "Van het historische centrum tot De Mare: in Alkmaar en omgeving hangt uw tv vaak al binnen 24 uur na uw aanvraag aan de muur.",
    wijken: ["De Mare", "Overdie", "Huiswaard", "Daalmeer", "Oudorp"],
    nabij: ["zaandam", "purmerend", "haarlem"],
  },
  {
    naam: "Amstelveen",
    slug: "amstelveen",
    provincie: "noord-holland",
    lat: 52.31,
    lng: 4.86,
    blurb:
      "In Amstelveen combineren veel klanten het ophangen van de tv met een soundbar-installatie — één afspraak en alles is geregeld.",
    wijken: ["Westwijk", "Groenelaan", "Bankras", "Middenhoven", "Randwijck"],
    nabij: ["amsterdam", "hoofddorp", "haarlem"],
  },
  {
    naam: "Hilversum",
    slug: "hilversum",
    provincie: "noord-holland",
    lat: 52.22,
    lng: 5.17,
    blurb:
      "In de mediastad weten ze wat goed beeld is: wij zorgen dat uw tv op exact de juiste kijkhoogte hangt, met perfect weggewerkte kabels.",
    wijken: ["Kerkelanden", "Hilversumse Meent", "Over 't Spoor", "Centrum", "Trompenberg"],
    nabij: ["amsterdam", "amersfoort", "utrecht"],
  },
  {
    naam: "Zaandam",
    slug: "zaandam",
    provincie: "noord-holland",
    lat: 52.44,
    lng: 4.83,
    blurb:
      "Van Zaanse nieuwbouw tot karakteristieke houten woningen: onze monteurs kiezen per muurtype de juiste bevestiging en pluggen.",
    wijken: ["Poelenburg", "Rosmolenwijk", "Westerkoog", "Kogerveld", "Inverdan"],
    nabij: ["amsterdam", "purmerend", "alkmaar"],
  },
  {
    naam: "Hoofddorp",
    slug: "hoofddorp",
    provincie: "noord-holland",
    lat: 52.3,
    lng: 4.69,
    blurb:
      "In de ruime nieuwbouwwijken van Hoofddorp, zoals Floriande en Tudorpark, werken we kabels vrijwel altijd volledig onzichtbaar weg.",
    wijken: ["Floriande", "Toolenburg", "Overbos", "Pax", "Tudorpark"],
    nabij: ["haarlem", "amstelveen", "leiden"],
  },
  {
    naam: "Purmerend",
    slug: "purmerend",
    provincie: "noord-holland",
    lat: 52.51,
    lng: 4.96,
    blurb:
      "In Purmerend en de omliggende Beemster komen we regelmatig — vaak kunnen we nog dezelfde week een afspraak inplannen.",
    wijken: ["Weidevenne", "Overwhere", "Purmer-Noord", "Wheermolen", "Gors"],
    nabij: ["zaandam", "amsterdam", "alkmaar"],
  },
  // Utrecht
  {
    naam: "Utrecht",
    slug: "utrecht",
    provincie: "utrecht-provincie",
    lat: 52.09,
    lng: 5.12,
    blurb:
      "Van studentenkamers in Lombok tot gezinswoningen in Leidsche Rijn: in Utrecht hangen we dagelijks tv's — altijd waterpas, altijd zonder zichtbare kabels.",
    wijken: ["Lombok", "Leidsche Rijn", "Wittevrouwen", "Overvecht", "Kanaleneiland", "Oog in Al"],
    nabij: ["nieuwegein", "houten", "zeist"],
  },
  {
    naam: "Amersfoort",
    slug: "amersfoort",
    provincie: "utrecht-provincie",
    lat: 52.16,
    lng: 5.39,
    blurb:
      "In Vathorst en het Soesterkwartier zijn draaibare beugels populair; onze monteur adviseert u ter plekke over het juiste type.",
    wijken: ["Vathorst", "Kattenbroek", "Schothorst", "Soesterkwartier", "Nieuwland"],
    nabij: ["soest", "utrecht", "veenendaal"],
  },
  {
    naam: "Nieuwegein",
    slug: "nieuwegein",
    provincie: "utrecht-provincie",
    lat: 52.03,
    lng: 5.08,
    blurb:
      "In Nieuwegein zijn we vaak binnen 24 uur beschikbaar — handig als uw nieuwe tv net is bezorgd en u niet wilt wachten.",
    wijken: ["Jutphaas", "Vreeswijk", "Batau", "Doorslag", "Galecop"],
    nabij: ["utrecht", "houten", "zeist"],
  },
  {
    naam: "Zeist",
    slug: "zeist",
    provincie: "utrecht-provincie",
    lat: 52.09,
    lng: 5.23,
    blurb:
      "Van villa's aan de bosrand tot appartementen in het centrum: in Zeist monteren we elke tv op elke muur, netjes en zonder rommel.",
    wijken: ["Kerckebosch", "Vollenhove", "Den Dolder", "Austerlitz", "Centrum"],
    nabij: ["utrecht", "amersfoort", "veenendaal"],
  },
  {
    naam: "Veenendaal",
    slug: "veenendaal",
    provincie: "utrecht-provincie",
    lat: 52.03,
    lng: 5.56,
    blurb:
      "Veenendaal en omgeving bedienen we met vaste prijzen inclusief voorrijkosten — u weet altijd vooraf precies waar u aan toe bent.",
    wijken: ["Petenbos", "Dragonder", "Franse Gat", "Centrum", "West"],
    nabij: ["amersfoort", "zeist", "utrecht"],
  },
  {
    naam: "Houten",
    slug: "houten",
    provincie: "utrecht-provincie",
    lat: 52.03,
    lng: 5.17,
    blurb:
      "In de fietsstad Houten werken we tv-kabels het liefst volledig weg — voor een strak resultaat in elke woonkamer.",
    wijken: ["Houten-Noord", "Houten-Zuid", "Castellum", "De Molenzoom", "Schonauwen"],
    nabij: ["utrecht", "nieuwegein", "zeist"],
  },
  {
    naam: "Woerden",
    slug: "woerden",
    provincie: "utrecht-provincie",
    lat: 52.09,
    lng: 4.88,
    blurb:
      "Vanuit het hart van het Groene Hart bedienen we Woerden, Harmelen en Kamerik — vaak nog dezelfde week na uw aanvraag.",
    wijken: ["Molenvliet", "Snel en Polanen", "Schilderskwartier", "Harmelen", "Kamerik"],
    nabij: ["utrecht", "gouda", "alphen-aan-den-rijn"],
  },
  {
    naam: "Soest",
    slug: "soest",
    provincie: "utrecht-provincie",
    lat: 52.17,
    lng: 5.29,
    blurb:
      "In Soest en Soesterberg hangen we tv's in alle soorten woningen — van jaren-30-huizen tot gloednieuwe appartementen.",
    wijken: ["Soest-Zuid", "Soesterberg", "Smitsveen", "Overhees", "'t Hart"],
    nabij: ["amersfoort", "zeist", "hilversum"],
  },
  // Noord-Brabant
  {
    naam: "Eindhoven",
    slug: "eindhoven",
    provincie: "noord-brabant",
    lat: 51.44,
    lng: 5.47,
    blurb:
      "In de lichtstad hangen we tv's van Strijp-S-lofts tot gezinswoningen in Meerhoven — uiteraard met strak weggewerkte kabels.",
    wijken: ["Strijp", "Woensel", "Tongelre", "Gestel", "Stratum", "Meerhoven"],
    nabij: ["helmond", "tilburg", "den-bosch"],
  },
  {
    naam: "Tilburg",
    slug: "tilburg",
    provincie: "noord-brabant",
    lat: 51.56,
    lng: 5.09,
    blurb:
      "Van de Reeshof tot de Spoorzone: onze Tilburgse klanten kiezen opvallend vaak voor een complete installatie met soundbar erbij.",
    wijken: ["Reeshof", "Oud-Noord", "Berkel-Enschot", "Udenhout", "Goirke"],
    nabij: ["breda", "den-bosch", "eindhoven"],
  },
  {
    naam: "Breda",
    slug: "breda",
    provincie: "noord-brabant",
    lat: 51.59,
    lng: 4.78,
    blurb:
      "In Breda en omliggende dorpen zoals Prinsenbeek en Ulvenhout monteren we wekelijks — op afspraak, ook 's avonds en op zaterdag.",
    wijken: ["Ginneken", "Prinsenbeek", "Ulvenhout", "Haagse Beemden", "Teteringen"],
    nabij: ["tilburg", "roosendaal", "dordrecht"],
  },
  {
    naam: "'s-Hertogenbosch",
    slug: "den-bosch",
    provincie: "noord-brabant",
    lat: 51.7,
    lng: 5.3,
    blurb:
      "De muren van de Bossche binnenstad vragen om vakmanschap: onze monteurs boren zorgvuldig en laten alles brandschoon achter.",
    wijken: ["Rosmalen", "Maaspoort", "De Groote Wielen", "Empel", "Muntel"],
    nabij: ["oss", "tilburg", "eindhoven"],
  },
  {
    naam: "Helmond",
    slug: "helmond",
    provincie: "noord-brabant",
    lat: 51.48,
    lng: 5.66,
    blurb:
      "In Helmond en Brandevoort staan we vaak al binnen een dag op de stoep — met al het montagemateriaal bij de hand.",
    wijken: ["Brandevoort", "Dierdonk", "Brouwhuis", "Rijpelberg", "Stiphout"],
    nabij: ["eindhoven", "den-bosch", "oss"],
  },
  {
    naam: "Oss",
    slug: "oss",
    provincie: "noord-brabant",
    lat: 51.77,
    lng: 5.52,
    blurb:
      "In Oss en omgeving combineren klanten het ophangen vaak met hulp bij het instellen van alle apps, zenders en streamingdiensten.",
    wijken: ["Ruwaard", "Ussen", "Berghem", "Schadewijk", "Krinkelhoek"],
    nabij: ["den-bosch", "eindhoven", "helmond"],
  },
  {
    naam: "Roosendaal",
    slug: "roosendaal",
    provincie: "noord-brabant",
    lat: 51.53,
    lng: 4.47,
    blurb:
      "Vanuit West-Brabant zijn we snel in Roosendaal — en onze monteur belt altijd een halfuur voor aankomst, zodat u nooit hoeft te wachten.",
    wijken: ["Kalsdonk", "Tolberg", "Kortendijk", "Langdonk", "Kroeven"],
    nabij: ["bergen-op-zoom", "breda", "tilburg"],
  },
  {
    naam: "Bergen op Zoom",
    slug: "bergen-op-zoom",
    provincie: "noord-brabant",
    lat: 51.5,
    lng: 4.29,
    blurb:
      "In Bergen op Zoom en Halsteren hangen we uw tv veilig op — ook op oudere muren die om speciale pluggen en extra zorg vragen.",
    wijken: ["Gageldonk", "Fort-Zeekant", "Halsteren", "Centrum", "Warande"],
    nabij: ["roosendaal", "breda", "tilburg"],
  },
];

export function provincieBySlug(slug: string) {
  return provincies.find((p) => p.slug === slug);
}

export function stadBySlug(slug: string) {
  return steden.find((s) => s.slug === slug);
}

export function stedenInProvincie(provincieSlug: string) {
  return steden.filter((s) => s.provincie === provincieSlug);
}
