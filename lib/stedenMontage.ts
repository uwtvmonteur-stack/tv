/**
 * Per stad: wat de bebouwing daar betekent voor het ophangen van een tv.
 *
 * Reden van bestaan is zowel inhoudelijk als voor zoekmachines. Search Console
 * liet op 2026-10-16 zien dat 19 van de 32 stadpagina's "Discovered – currently
 * not indexed" waren, met `Last crawled: N/A`: Google had ze gevonden maar nooit
 * opgehaald. Een vergelijking van Rotterdam met Helmond gaf 31% letterlijk
 * identieke zinnen en voor de rest hetzelfde sjabloon met een andere plaatsnaam
 * erin. Dat is het patroon dat Google als geschaalde content behandelt, en het
 * kan via het site-brede kwaliteitsoordeel ook de sterke pagina's drukken.
 *
 * Het wandtype is het enige dat per stad werkelijk verschilt én vakinhoudelijk
 * uitmaakt: het bepaalt de plug, de beugel en of de gewenste plek haalbaar is.
 * De teksten beschrijven daarom de bouwperiodes die in die stad overheersen en
 * de montageconsequentie daarvan — geen verzonnen cijfers, geen claims over
 * aantallen klussen, alleen bouwkundige kenmerken die publiek verifieerbaar zijn
 * en het advies dat een monteur daar werkelijk bij geeft.
 *
 * De sleutels zijn de `slug`-waarden uit `lib/steden.ts`; een ontbrekende sleutel
 * laat de sectie eenvoudig weg in plaats van de pagina te breken.
 */
export const stedenMontage: Record<string, string> = {
  rotterdam:
    "Rotterdam is voor een groot deel na de oorlog herbouwd, en dat merken onze monteurs aan de muren: in de flats uit de jaren vijftig tot zeventig zijn de woningscheidende wanden vrijwel altijd dragend beton. Daar hoort een boorhamer en een betonplug bij, geen snelbouwplug, maar het voordeel is dat zo'n wand elk schermformaat draagt, ook een draaibare arm. In de nieuwere torens op de Kop van Zuid en in Prins Alexander komen daarnaast lichte voorzetwanden voor die eerst afgetast moeten worden.",
  "den-haag":
    "Den Haag loopt in bouwjaar sterk uiteen en dat bepaalt de bevestiging. In het Statenkwartier en Bezuidenhout staan vooroorlogse herenhuizen met massief metselwerk: stevig, maar de oude baksteen is soms zacht, waardoor een plug dieper moet dan gebruikelijk. In Ypenburg en Leidschenveen is het beeld omgekeerd: daar zijn de binnenwanden meestal gipsplaat op metal stud en bepaalt de positie van de stijlen waar de beugel kan hangen.",
  leiden:
    "In de Leidse binnenstad werken we veel in panden van een paar eeuwen oud. Het metselwerk is daar vaak zacht en niet overal even dik, en achter het stucwerk zit soms een houten raamwerk in plaats van steen — reden om altijd eerst af te tasten en niet blind te boren. In de Merenwijk en Stevenshof, gebouwd in de jaren zeventig en tachtig, hebben we juist te maken met lichte scheidingswanden waar de bevestiging een berekening is.",
  delft:
    "De Delftse binnenstad bestaat grotendeels uit oude panden waar het metselwerk per muur verschilt; daar bepaalt een proefboring wat er kan. In Tanthof, Voorhof en Buitenhof staan gezinswoningen uit de jaren zeventig met dragende betonnen bouwmuren en lichtere tussenwanden van gasbeton. Die eerste draagt alles, de tweede vraagt om langere pluggen en soms om verankering in de achterliggende constructie.",
  dordrecht:
    "Dordrecht combineert een van de oudste binnensteden van Holland met naoorlogse wijken. In de historische panden zit achter het stucwerk niet altijd steen — houten raamwerk komt er regelmatig voor — en dat is precies het wandtype waar een tv later alsnog loskomt als er verkeerd bevestigd wordt. In Sterrenburg en Crabbehof zijn de bouwmuren juist beton en is de montage rechttoe rechtaan.",
  zoetermeer:
    "Zoetermeer is als groeikern in korte tijd uit de grond gekomen, grotendeels in de jaren zeventig en tachtig. Dat betekent in de praktijk: dragende wanden van beton of kalkzandsteen, en daartussen lichte scheidingswanden die een groot scherm niet zelfstandig dragen. Wij bepalen eerst welke van de twee u voor zich heeft, want juist hier zien we vaak dat de mooiste plek voor de tv de zwakste wand is.",
  gouda:
    "In de Goudse binnenstad staan panden waar eeuwenoud metselwerk en latere verbouwingen door elkaar lopen; een voorzetwand van gipsplaat voor een oude muur is er eerder regel dan uitzondering. Dan telt niet de voorzetwand maar wat erachter zit. In Bloemendaal en Goverwelle, gebouwd vanaf de jaren zeventig, zijn de bouwmuren beton en is er over het draagvermogen geen twijfel.",
  "alphen-aan-den-rijn":
    "Alphen aan den Rijn is voor het grootste deel na de oorlog gebouwd en in de laatste decennia flink uitgebreid. In de oudere delen zijn de woningscheidende wanden kalkzandsteen of beton, in de nieuwbouwwijken is de binnenwand meestal gipsplaat op een stalen frame. Dat laatste is de meest voorkomende reden dat een beugel niet zomaar op de gewenste hoogte past: de stijlen liggen vast, de tv moet zich daarnaar voegen.",
  amsterdam:
    "In de Amsterdamse etagewoningen van voor de oorlog zijn de bouwmuren massief en dragen ze moeiteloos, maar de tussenwanden zijn dat vaak niet — achter het stucwerk zit geregeld een houten raamwerk met riet of gipsplaat. Dat is het wandtype waar het in deze stad het vaakst misgaat. In de grachtenpanden komt daar scheefstand bij: wat waterpas lijkt ten opzichte van het plafond, staat het vaak niet. Op IJburg en de Zuidas is het beeld moderner, met beton en metal stud door elkaar.",
  haarlem:
    "Haarlem heeft een grote vooroorlogse voorraad, van de historische binnenstad tot de wijken daaromheen. Het metselwerk is doorgaans massief en betrouwbaar, maar oud en soms zacht, waardoor een standaardplug minder houdt dan de verpakking belooft. In de naoorlogse delen als Schalkwijk zijn de bouwmuren beton en kan er in principe elk formaat scherm aan.",
  alkmaar:
    "In de Alkmaarse binnenstad werken we in oude panden waar achter het stucwerk niet altijd steen zit; aftasten voor we boren hoort daar standaard bij. In De Mare, Overdie en de wijken daaromheen staan naoorlogse woningen met dragende wanden van beton of kalkzandsteen, waar een beugel voor een groot scherm zonder omhaal op kan.",
  amstelveen:
    "Amstelveen bestaat voor een groot deel uit flats en eengezinswoningen uit de jaren zestig en zeventig. De woningscheidende wanden zijn daar vrijwel altijd beton — uitstekend draagvermogen, maar u heeft er een boorhamer voor nodig. De binnenwanden in diezelfde woningen zijn juist vaak gasbeton of gipsblokken, en dat is een wezenlijk ander verhaal zodra er een zwaardere tv aan moet.",
  hilversum:
    "Hilversum heeft veel woningen uit de jaren twintig en dertig, inclusief de karakteristieke bouw uit de Dudok-periode. Die panden hebben massief metselwerk, maar ook relatief veel houten constructiedelen en stucwerk op latwerk. Dat vraagt om aftasten in plaats van aannemen. In de naoorlogse wijken en de nieuwere appartementen is beton de norm en is de montage eenvoudiger.",
  zaandam:
    "Zaandam heeft een lange houtbouwtraditie en in de oudere delen komen houten constructies en lichte wanden dan ook vaker voor dan elders. Juist daar is het van belang te weten wat er achter de afwerking zit voordat er een beugel op gaat. In Poelenburg, Westerwatering en de naoorlogse wijken zijn de bouwmuren beton of kalkzandsteen en is er ruimte voor elk schermformaat.",
  hoofddorp:
    "Hoofddorp is grotendeels naoorlogs en in de laatste decennia sterk gegroeid. In de nieuwere wijken, waaronder Floriande, zijn de binnenwanden overwegend gipsplaat op metal stud: de beugel moet dan op de stijlen of op een verdeelplaat, anders trekt het gewicht de platen uit. In de oudere delen zijn de woningscheidende wanden kalkzandsteen of beton en is die beperking er niet.",
  purmerend:
    "Purmerend groeide vanaf de jaren zeventig hard als overloopgemeente, met wijken als Weidevenne van veel recentere datum. In de oudere delen zijn de dragende wanden beton of kalkzandsteen; in de nieuwbouw zijn de binnenwanden licht en bepalen de stijlen achter de gipsplaat waar de tv kan hangen. Wij meten dat in, zodat de beugel niet half op een stijl en half op de plaat eindigt.",
  utrecht:
    "Utrecht loopt van middeleeuwse binnenstad tot Leidsche Rijn en de montage verschilt navenant. In Wittevrouwen en Lombok staan vooroorlogse woningen met massieve bouwmuren maar lichte tussenwanden en houten vloeren; in de binnenstad komt daar oud, soms zacht metselwerk bij. Leidsche Rijn is het andere uiterste: daar is vrijwel alles gipsplaat op een stalen frame, waar de bevestiging een kwestie van stijlen zoeken is.",
  amersfoort:
    "In de Amersfoortse binnenstad werken we in panden waar eeuwenoud metselwerk en latere voorzetwanden elkaar afwisselen; wat u ziet is daar zelden wat draagt. Vathorst en Kattenbroek, gebouwd vanaf de jaren negentig, zijn juist typische nieuwbouw met lichte binnenwanden op een stalen frame. Een draaibare beugel kan daar wel degelijk, maar alleen als hij op de constructie wordt vastgezet.",
  nieuwegein:
    "Nieuwegein is grotendeels in de jaren zeventig en tachtig gebouwd, en dat geeft een herkenbaar patroon: dragende wanden van beton, daartussen lichte scheidingswanden. De tv moet in de praktijk bijna altijd aan de eerste. Wij bepalen vooraf welke wand in uw woonkamer wat is, want dat scheelt het verschil tussen een beugel die dertig jaar meegaat en een die scheurtjes trekt.",
  zeist:
    "Zeist is gevarieerd gebouwd, met veel ruime jaren-dertig woningen en villa's naast naoorlogse wijken. In de oudere panden is het metselwerk massief maar soms zacht, en zit er geregeld stucwerk op latwerk dat van voren niet van steen te onderscheiden is. In de nieuwere delen en de appartementen is beton de norm, waar elk schermformaat op kan.",
  veenendaal:
    "Veenendaal is voor het overgrote deel na de oorlog gebouwd en in de laatste decennia uitgebreid. In de oudere wijken zijn de woningscheidende wanden kalkzandsteen of beton; in de nieuwbouw is de binnenwand meestal gipsplaat op een stalen frame. Dat laatste bepaalt niet óf de tv kan hangen, maar wel precies waar: de stijlen liggen vast en de beugel volgt die.",
  houten:
    "Houten is als groeikern vanaf de jaren tachtig gebouwd en daarna nog flink uitgebreid, dus bijna alles is nieuwbouw. In dit type woning zijn de binnenwanden vrijwel standaard gipsplaat op metal stud. Dat is precies het wandtype waar een zelf opgehangen tv het vaakst alsnog loskomt — niet omdat het niet kan, maar omdat de plug op de plaat zit in plaats van op de stijl of een verdeelplaat.",
  woerden:
    "Woerden heeft een compacte historische kern met oude panden waar achter het stucwerk lang niet altijd steen zit, en daaromheen naoorlogse en recente wijken met een heel ander wandbeeld. In Molenvliet en Snel en Polanen zijn de dragende wanden kalkzandsteen of beton en de binnenwanden licht. Wij stellen eerst vast welke van de twee de gewenste tv-plek is.",
  soest:
    "Soest heeft veel woningen uit het interbellum en de jaren dertig, vaak met massief metselwerk maar ook met stucwerk op latwerk en houten vloerconstructies. Die combinatie vraagt om aftasten voor er geboord wordt. In de naoorlogse delen en in Soesterberg zijn de bouwmuren beton of kalkzandsteen en is de montage rechttoe rechtaan.",
  eindhoven:
    "Eindhoven groeide met Philips en heeft daardoor veel woningen uit de jaren twintig tot zestig, van de oude Philipsbuurten tot de wederopbouwwijken. Het metselwerk is er doorgaans massief, al is de oudere baksteen soms zacht. In de recente nieuwbouw rond Strijp en Meerhoven is het beeld modern, met lichte binnenwanden op een stalen frame waar een grote tv alleen op de stijlen hoort.",
  tilburg:
    "Tilburg heeft een grote voorraad voormalige arbeiderswoningen uit het textielverleden, vaak met massieve maar dunne binnenmuren. Dat is belangrijk: dun metselwerk draagt wel, maar er is minder ruimte voor een lange plug, en doorboren naar de buren is een reëel risico. In de naoorlogse wijken en de nieuwbouw zijn beton en metal stud de twee uitersten die we tegenkomen.",
  breda:
    "Breda combineert een historische kern met een ruime naoorlogse schil. In de oude panden rond het centrum zit achter het stucwerk niet altijd steen en is een proefboring de snelste manier om zekerheid te krijgen. In Prinsenbeek, Haagse Beemden en de nieuwere wijken zijn de bouwmuren beton of kalkzandsteen en de binnenwanden licht, wat vooral de plaatsing van de beugel bepaalt.",
  "den-bosch":
    "In de Bossche binnenstad werken we in panden van eeuwen oud, waar metselwerk, houten constructiedelen en latere voorzetwanden door elkaar lopen; daar geldt eerst aftasten, dan boren. Het Paleiskwartier en de nieuwere wijken zijn juist strak modern, met beton in de dragende wanden en gipsplaat op stalen stijlen daartussen. Beide kunnen prima een grote tv dragen, maar op een andere manier.",
  helmond:
    "Helmond heeft naast de naoorlogse wijken de opvallende nieuwbouw van Brandevoort, die er historiserend uitziet maar van recente datum is. Dat verschil telt: de gevel suggereert oud metselwerk, terwijl de binnenwanden gewoon gipsplaat op metal stud zijn. Wie daar op het oog een plug kiest, zit mis. In de oudere wijken zijn de dragende wanden kalkzandsteen of beton.",
  oss:
    "Oss is grotendeels na de oorlog gegroeid rond de industrie, met veel woningen uit de jaren vijftig tot zeventig. De woningscheidende wanden zijn daar kalkzandsteen of beton en dragen zonder meer elk schermformaat. De binnenwanden in diezelfde woningen zijn vaak gasbeton — die houdt een kleine tv prima, maar bij een zwaarder scherm hoort de beugel aan de dragende wand.",
  roosendaal:
    "Roosendaal is voor het grootste deel naoorlogs, met een compacte oudere kern. In de wijken uit de jaren zestig en zeventig zijn de bouwmuren beton of kalkzandsteen en is er over draagvermogen geen discussie; de lichtere tussenwanden van gasbeton vragen wel om de juiste plug en soms om een andere plek. In de recentere nieuwbouw is gipsplaat op stalen stijlen de standaard.",
  "bergen-op-zoom":
    "Bergen op Zoom heeft een historische binnenstad met panden waar oud metselwerk en latere verbouwingen elkaar afwisselen, inclusief voorzetwanden die van voren niet van steen te onderscheiden zijn. Daaromheen liggen naoorlogse wijken met betonnen of kalkzandstenen bouwmuren. Welke van de twee u heeft, bepaalt of de beugel direct op de muur kan of dat er eerst verankerd moet worden.",
};
