/**
 * Unieke lokale alinea per stad — extra body-content op elke stadpagina.
 * Leidt met een concreet lokaal detail (woonsituatie, buurtdekking of scenario)
 * en herhaalt bewust NIET de generieke claims (prijs, garantie, avond/zaterdag)
 * die al elders op de pagina staan. Andere invalshoek dan `blurb` in steden.ts.
 */
export const lokaalTekst: Record<string, string> = {
  rotterdam:
    "Woont u in een bovenwoning in Delfshaven, een portiekflat in Charlois of een ruime eengezinswoning in Prins Alexander? Onze monteurs rijden dagelijks door heel Rotterdam, van Kralingen tot de overkant van de Maas. Ook in de buurgemeenten Delft en Dordrecht kunt u ons inschakelen voor een nette montage aan huis.",
  "den-haag":
    "Van de appartementen vlak achter de boulevard in Scheveningen tot de jaren-30-straten van Bezuidenhout: onze monteurs kennen de Haagse wijken op hun duimpje. Ook in Loosduinen, Leidschenveen en de buurgemeenten Delft en Leiden komen we bij u thuis om de tv strak op te hangen.",
  leiden:
    "Leiden is een echte studentenstad, en wij hangen net zo makkelijk een tv op in een kleine kamer op een studentenetage als in een gezinswoning in de Merenwijk of Stevenshof. Ook in Roomburg, De Mors en het nabije Alphen aan den Rijn monteren we uw toestel netjes aan de muur.",
  delft:
    "Buiten het historische centrum liggen ruime gezinswijken als Tanthof, Voorhof en Buitenhof, waar wij regelmatig tv's ophangen in woonkamers en slaapkamers. Vanuit Delft zijn we bovendien snel in Den Haag, Rotterdam en Zoetermeer, zodat u vaak al binnen 24 uur een monteur over de vloer heeft.",
  dordrecht:
    "Op het eiland van Dordrecht bedienen we naast de oude binnenstad ook de naoorlogse wijken Dubbeldam, Sterrenburg en Stadspolders, met hun ruime eengezinswoningen. Of u nu in Krispijn of Wielwijk woont, onze monteur komt bij u langs en kan daarna ook door naar Rotterdam, Gouda of Breda.",
  zoetermeer:
    "De oudere groeikernwijken Meerzicht, Buytenwegh en Seghwaert bestaan grotendeels uit rijtjeswoningen en flats uit de jaren zeventig. Juist daar helpen onze monteurs u graag om de tv op de ideale plek te krijgen, en ook in de buurgemeenten Den Haag en Gouda kunt u bij ons terecht.",
  gouda:
    "Veel Gouwenaars wonen buiten de historische binnenstad, in woonwijken als Bloemendaal, Goverwelle en Korte Akkeren met hun rijtjeshuizen en portiekflats. Woont u net buiten de stad, richting Woerden of Zoetermeer? Ook daar komt onze monteur graag langs om uw tv aan huis op te hangen.",
  "alphen-aan-den-rijn":
    "Kerk en Zanen is een van de grootste nieuwbouwwijken van Alphen aan den Rijn, met veel moderne gezinswoningen waar een tv aan de wand goed tot zijn recht komt. Ook in Ridderveld, het Centrum en de Ridderbuurt hangen we uw toestel netjes en waterpas op.",
  amsterdam:
    "In het centrum en de Jordaan betekent een tv ophangen vaak eerst manoeuvreren door een smalle trap of een krap portiek — geen probleem voor onze monteurs. Net zo goed staan we in Amsterdam-Noord, Oost en Nieuw-West voor u klaar, en desgewenst in Amstelveen, Haarlem of Zaandam.",
  haarlem:
    "Schalkwijk kent juist veel galerijflats en appartementen, een heel ander type woning dan de vooroorlogse huizen elders in Haarlem. Waar u ook woont — van Haarlem-Noord tot Zuidwest en Oost — onze monteur komt aan huis, en ook in Hoofddorp en Zaandam bent u bij ons aan het juiste adres.",
  alkmaar:
    "Ten noorden van het kaasstadcentrum liggen ruime woonwijken als Huiswaard, Daalmeer en Oudorp, vol rijtjeshuizen en hoekwoningen. Daar helpen we u graag met een strak opgehangen tv, net als in Overdie. Ook de inwoners van buurplaatsen Purmerend en Zaandam kunnen een beroep op ons doen.",
  amstelveen:
    "Amstelveen loopt uiteen van de ruime eengezinswoningen in Westwijk en Middenhoven tot de appartementen rond Groenelaan en Bankras. In al die woningen hangen onze monteurs uw tv op de juiste hoogte op, en vanuit Amstelveen zijn we ook zo in Amsterdam, Hoofddorp of Haarlem voor een montage aan huis.",
  hilversum:
    "Hilversum staat bekend om zijn groene lanen en ruime villa's, bijvoorbeeld in het Trompenberg. In zulke royale woningen is er vaak veel keuze voor de plek van de tv, en onze monteur denkt graag met u mee. Ook in Kerkelanden, de Hilversumse Meent en buurgemeente Amersfoort staan we voor u klaar.",
  zaandam:
    "Rondom station Zaandam verrees met Inverdan een opvallend nieuw stadshart vol appartementen, terwijl wijken als Westerkoog en Kogerveld juist veel eengezinswoningen tellen. Waar u ook woont, onze monteur hangt uw tv aan huis op — in heel Zaandam, en desgewenst ook in Amsterdam, Purmerend of Alkmaar.",
  hoofddorp:
    "Als grootste kern van de Haarlemmermeer heeft Hoofddorp naast de nieuwste wijken ook gevestigde buurten als Toolenburg, Overbos en Pax. Daar hangen onze monteurs net zo goed uw tv aan de muur, en vanuit Hoofddorp rijden we vlot door naar Haarlem, Amstelveen of Leiden voor een afspraak bij u thuis.",
  purmerend:
    "Weidevenne is met zijn waterrijke straten de grootste en jongste wijk van Purmerend, met overwegend moderne gezinswoningen. Of u daar woont of juist in Overwhere, Wheermolen of de Gors: onze monteur komt graag bij u thuis langs om de tv vakkundig en waterpas op te hangen.",
  utrecht:
    "In wijken als Overvecht en Kanaleneiland wonen veel Utrechters in galerij- en portiekflats, terwijl Wittevrouwen en Oog in Al juist bekendstaan om hun karakteristieke stadswoningen. Voor al die woonsituaties hangen wij uw tv aan huis op, en ook in Nieuwegein, Houten en Zeist kunt u ons inschakelen.",
  amersfoort:
    "De jaren-negentigwijken Kattenbroek en Nieuwland vallen op door hun speelse architectuur, terwijl Schothorst er net wat ruimer en groener bij ligt. In al deze buurten komt onze monteur uw tv aan huis ophangen, en ook inwoners van Soest, Utrecht en Veenendaal kunnen bij ons terecht.",
  nieuwegein:
    "Nieuwegein combineert historische kernen als Vreeswijk en Jutphaas met ruime naoorlogse wijken als Batau, Doorslag en Galecop. In beide typen woningen zorgen onze monteurs voor een strak opgehangen tv, en desgewenst rijden we door naar de buurgemeenten Utrecht, Houten of Zeist voor een montage bij u thuis.",
  zeist:
    "Zeist strekt zich uit tot bosrijke dorpen als Den Dolder en Austerlitz, die we vanuit de stad net zo makkelijk bereiken. Of u nu in de vernieuwde wijk Kerckebosch of in Vollenhove woont, onze monteur komt bij u thuis langs — en desgewenst ook in Utrecht of Amersfoort.",
  veenendaal:
    "Veenendaal groeide flink met woonwijken als Dragonder en Petenbos, terwijl het Franse Gat bekendstaat als een vernieuwde volksbuurt. In al deze straten hangt onze monteur uw tv netjes aan de muur, en ook in de nabije plaatsen Amersfoort, Zeist en Utrecht bent u bij ons welkom.",
  houten:
    "Houten is rond twee rondwegen gebouwd, met het levendige Castellum bij het station als kloppend hart. In de woonbuurten van Houten-Noord, Houten-Zuid en De Molenzoom hangen onze monteurs dagelijks tv's op, en ook in de buurgemeenten Utrecht, Nieuwegein en Zeist staan we graag voor u klaar.",
  woerden:
    "In nieuwere Woerdense wijken als Snel en Polanen en Molenvliet staan rijen moderne gezinswoningen, terwijl het Schilderskwartier juist wat ouder en compacter is. Waar u ook woont, onze monteur komt bij u thuis de tv ophangen — netjes afgewerkt en op de hoogte die u prettig vindt.",
  soest:
    "Soest ligt ingeklemd tussen bos en heide, met rustige woonbuurten als Overhees, Smitsveen en 't Hart. Daar en in Soest-Zuid hangen onze monteurs uw tv op de plek die u voor ogen heeft, en ook in Amersfoort, Zeist en Hilversum kunt u een afspraak maken.",
  eindhoven:
    "Woensel geldt als een van de grootste stadsdelen van Nederland, met talloze flats en eengezinswoningen ten noorden van het centrum. Ook in Tongelre, Gestel en Stratum hangen onze monteurs uw tv aan huis op, en desgewenst rijden we door naar Helmond, Tilburg of Den Bosch.",
  tilburg:
    "Bij Tilburg horen ook de dorpen Berkel-Enschot en Udenhout, die we vanuit de stad gemakkelijk bereiken. Net als in de stadswijken Oud-Noord en het Goirke hangt onze monteur daar uw tv aan huis op, en desgewenst rijdt hij door naar Breda, Den Bosch of Eindhoven.",
  breda:
    "Het Ginneken is een van de meest geliefde en sfeervolle delen van Breda, met statige lanen en gezellige straatjes. Even verderop liggen de ruime Haagse Beemden en het dorpse Teteringen, waar onze monteur net zo graag langskomt om uw tv vakkundig op te hangen, net als in het nabije Tilburg of Roosendaal.",
  "den-bosch":
    "Den Bosch is meer dan de historische vesting: in Rosmalen, Maaspoort en de nieuwe wijk De Groote Wielen wonen veel gezinnen in moderne huizen. Daar en in Empel hangen onze monteurs uw tv aan huis op, en ook in Oss, Tilburg en Eindhoven kunt u ons inschakelen.",
  helmond:
    "Naast de bekende wijk Brandevoort telt Helmond groene woonbuurten als Dierdonk en het dorpse Stiphout. In deze buurten, en in Brouwhuis en Rijpelberg, komt onze monteur bij u thuis de tv ophangen, en ook inwoners van Eindhoven, Den Bosch en Oss kunnen op ons rekenen.",
  oss:
    "Ussen is de grote uitbreidingswijk aan de westkant van Oss, terwijl het aangrenzende dorp Berghem zijn eigen karakter heeft behouden. In beide, en in Ruwaard, Schadewijk en Krinkelhoek, hangen onze monteurs uw tv aan huis op — en desgewenst ook in Den Bosch, Eindhoven of Helmond.",
  roosendaal:
    "De zuidelijke woonwijken van Roosendaal, zoals Tolberg, Kortendijk, Langdonk en Kroeven, bestaan voor een groot deel uit rijtjeswoningen en appartementen uit de jaren zeventig en tachtig. Daar en in Kalsdonk hangt onze monteur uw tv netjes op, en ook in Bergen op Zoom en Breda bent u welkom.",
  "bergen-op-zoom":
    "Buiten de oude vestingstad liggen naoorlogse wijken als Gageldonk, Fort-Zeekant en Warande, met veel eengezinswoningen, hoekwoningen en flats. Ook in het noordelijke Halsteren komt onze monteur graag langs om uw tv op te hangen, net als bij inwoners van de buurgemeenten Roosendaal, Breda en Tilburg.",
};
