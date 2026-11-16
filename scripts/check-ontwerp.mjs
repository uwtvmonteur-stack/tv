#!/usr/bin/env node
/**
 * Controleert de regels van de herbouw, zodat ze niet van goed onthouden
 * afhangen.
 *
 * Een ontwerpsysteem is pas een systeem als afwijken opvalt. Dit script leest
 * de bron (en met `--html` ook de gegenereerde pagina's) en faalt met code 1
 * zodra een van de harde eisen wordt overtreden. Draai het vóór elke commit:
 *
 *   node scripts/check-ontwerp.mjs
 *   node scripts/check-ontwerp.mjs --html     (na `npm run build`)
 *
 * De eisen komen van de eigenaar en zijn geen smaakkwestie. Ze staan hier
 * met de reden erbij, zodat niemand ze later per ongeluk "opruimt".
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const WORTEL = process.cwd();
const fouten = [];
const waarschuwingen = [];

function bestanden(map, ext) {
  const uit = [];
  for (const naam of readdirSync(map)) {
    if (naam === "node_modules" || naam === ".next") continue;
    const pad = join(map, naam);
    if (statSync(pad).isDirectory()) uit.push(...bestanden(pad, ext));
    else if (ext.some((e) => naam.endsWith(e))) uit.push(pad);
  }
  return uit;
}

/**
 * `lib/` staat er sinds 14-11 bij. Daar staat de tekst van de site: de FAQ's,
 * de kennisbankartikelen, de beoordelingen, de tarieven. De controle op een
 * exacte reactietijd en die op de aanspreekvorm keken daar niet, terwijl dat
 * precies de bestanden zijn waar zulke zinnen in staan. De klassencontroles
 * slaan op een `.ts` zonder JSX nergens aan, dus meekijken kost niets.
 */
const bron = [
  ...bestanden(join(WORTEL, "app"), [".tsx", ".ts"]),
  ...bestanden(join(WORTEL, "components"), [".tsx", ".ts"]),
  ...bestanden(join(WORTEL, "lib"), [".ts"]),
];

/** Regels per bestand, zodat een melding een regelnummer heeft. */
function regels(pad) {
  return readFileSync(pad, "utf8").split(/\r?\n/);
}

function meld(lijst, pad, nr, tekst) {
  lijst.push(`${relative(WORTEL, pad).split(sep).join("/")}:${nr}  ${tekst}`);
}

/* -- 1. Het telefoonnummer alleen in de voettekst en in de heroknoppen ----
   Dit was: alleen in de voettekst. Harde eis van de eigenaar, met als reden
   één actie per scherm, en een gesprek dat niet meetbaar en niet inplanbaar
   is. Op 16-11-2026 heeft hij die regel zelf omgedraaid en om een belknop
   gevraagd, en de cijfers steunen dat: 9 van de 24 conversies over 90 dagen
   waren al telefoonkliks op een nummer dat alleen onderaan stond, bij 84%
   mobiel verkeer. Meetbaar is het bovendien wél — Analytics.tsx meet elke
   `tel:`-klik en voert hem door als Ads-conversie.

   De regel blijft dus staan, maar met één plek erbij: `HeroKnoppen` in
   components/sections.tsx. Overal elders is een belknop nog steeds een fout,
   zodat er niet alsnog overal op de pagina een nummer bijkomt. */
for (const pad of bron) {
  const naam = relative(WORTEL, pad).split(sep).join("/");
  if (
    naam === "components/Footer.tsx" ||
    naam === "components/sections.tsx" ||
    naam === "app/api/afspraak/route.ts"
  )
    continue;
  regels(pad).forEach((r, i) => {
    // Alleen een echte href, niet elke string met "tel:" erin: Analytics.tsx
    // leest `href.startsWith("tel:")` om een klik te meten, en dat is geen
    // belknop maar juist de meting ervan.
    if (/href=["'`]tel:/.test(r) || /href=\{`tel:/.test(r))
      meld(fouten, pad, i + 1, "telefoonlink buiten de voettekst");
  });
}

/* -- 2. Nooit een exacte reactietijd beloven ------------------------------
   De formulering is overal "binnen enkele uren". Een belofte van twee uur of
   "direct" wordt op een drukke dag niet waargemaakt, en dan is de eerste
   ervaring met het bedrijf een gebroken afspraak.

   Het gaat om een belofte over ónze reactie, en de regel moet dus naar het
   woord ernaast kijken. Toen `lib/` erbij kwam sloeg deze controle aan op
   twee beoordelingen in content.ts (die er op 16-11 uit zijn) ("Binnen een uur hing onze 65-inch strak
   boven het dressoir"). Dat is geen toezegging over wanneer wij bellen maar
   een uitspraak over hoe lang de montage duurde — en die staat elders op de
   site ook, als "±60 min gemiddelde montagetijd". Een exacte tijd zónder
   contactwoord blijft wel een waarschuwing: hij hóeft niet fout te zijn,
   maar iemand moet er één keer naar gekeken hebben. */
/* `\bbel` en niet `bel`: zonder die woordgrens vooraan sloeg dit aan binnen
   "kabel", en dan was juist de beoordeling die hierboven beschreven staat
   alsnog een fout. */
const CONTACTWOORD =
  /\bbel(?:len|t|\b)|\bterugbellen\b|\bbericht|\bcontact|\bantwoord|\breactie|\breageren|\bhoren\b|\blaten weten\b/i;
const EXACTE_TIJD =
  /binnen (?:een|het|1|twee|2|drie|3|vier|4) uur|binnen (?:15|30|45) minuten/i;
const DIRECT = /direct (?:contact|bericht|antwoord)|meteen contact/i;
for (const pad of bron) {
  regels(pad).forEach((r, i) => {
    if (DIRECT.test(r)) {
      meld(fouten, pad, i + 1, "belooft een exacte reactietijd");
      return;
    }
    if (!EXACTE_TIJD.test(r)) return;
    if (CONTACTWOORD.test(r))
      meld(fouten, pad, i + 1, "belooft een exacte reactietijd");
    else
      meld(
        waarschuwingen,
        pad,
        i + 1,
        "exacte tijd in de tekst — controleer dat het niet over onze reactietijd gaat",
      );
  });
}

/* -- 3. Geen losse pixelmaten en geen losse kleuren -----------------------
   Alles staat in app/globals.css. Eén uitzondering: willekeurige breedtes
   zoals w-[270px] voor de reviewcarrousel, waar een vaste kaartbreedte het
   punt is. */
for (const pad of bron) {
  regels(pad).forEach((r, i) => {
    if (/text-\[\d+(?:\.\d+)?(?:px|rem)\]/.test(r))
      meld(fouten, pad, i + 1, "losse lettergrootte in plaats van een token");
    if (/(?:bg|text|border|ring|fill|stroke)-\[#[0-9a-fA-F]{3,8}\]/.test(r))
      meld(fouten, pad, i + 1, "losse kleurwaarde in plaats van een token");
    if (/shadow-\[/.test(r))
      meld(fouten, pad, i + 1, "eigen schaduw in plaats van shadow-card/lift");
  });
}

/* -- 4. De oude tokens en de oude componentbibliotheek moeten weg --------
   Zolang hier nog iets uit staat, is die pagina half omgezet: de klassen
   bestaan niet meer in globals.css, dus het blok heeft geen achtergrond,
   geen rand of geen kleur meer. Dat is onzichtbaar in een build en zichtbaar
   voor de bezoeker. */
const OUD = [
  [
    // `paper` staat hier wél weer bij: de huisstijl van de eigen sites kent
    // geen papierkleur meer, de grondkleur is wit. Een overgebleven
    // `bg-paper` levert een blok zonder achtergrond op.
    /\b(?:bg|text|border|ring|divide|decoration|from|to|via|fill|stroke)-(?:paper|raised|sunk|inverse|inverse-raised|fg|fg-muted|fg-subtle|fg-inverse|fg-inverse-muted|hairline|hairline-inverse|control|accent-fg|accent-tint|accent-ink|accent-\d{2,3})\b/,
    "oud kleurtoken",
  ],
  // `shadow-card` en `shadow-lift` zijn sinds de herbouw juist de échte
  // tokens; `shadow-op` en `shadow-los` zijn hun voorgangers.
  [/\bshadow-(?:e[123]|op|los)\b/, "oude schaduw (nu shadow-card/lift)"],
  [/\b(?:px|py|mb|mt|gap)-(?:gutter|section|stack|block)\b/, "oud ruimtetoken"],
  [/\bmax-w-(?:content|wide)\b/, "oude containerbreedte"],
  [/\bon-inverse\b/, "oude klasse on-inverse"],
  [/\bcontainer-x\b/, "oude container (nu `kader`)"],
  [/\bcard-hover\b/, "oude kaartbeweging (nu `paneel-hover`)"],
  [/\bbtn-(?:primary|ghost|on-dark|lg|call|dark|light)\b/, "oude knop (nu `knop-*`)"],
  [/\bprose-tv\b/, "oude leestekst (nu `artikel`)"],
  [/\b(?:bg-grid|mesh-dark|hero-scrim)\b/, "oude achtergrondlaag (nu `raster`)"],
  [/\bicon-tile\b/, "oud pictogramvlak (nu `icoonvlak`)"],
  [/\brise-in\b/, "oude animatie (nu `komt-op`)"],
  [/\bh-section\b/, "oude sectiekop (nu `text-h2`)"],
  [/\btext-(?:hero|stat)\b/, "oude tekstmaat (nu `text-h1`/`text-prijs`)"],
  [/\bfield-error\b/, "oude foutmelding (nu `veld-fout`)"],
  // Op 14-11 verwijderd omdat geen enkele pagina ze aanriep. Een klasse die
  // niet meer bestaat levert een blok zonder vorm op, en dat is onzichtbaar
  // in een build.
  [/\bvlak-kort\b/, "verwijderde sectiehoogte (gebruik `vlak`)"],
  [/\bknop-(?:donker|licht)\b/, "verwijderde knopvariant (nu `knop-vol/lijn/op-donker`)"],
  [/\bveld-hulp\b/, "verwijderde veldtoelichting"],
  [/\b(?:bg|text|border|ring)-succes\b/, "verwijderd kleurtoken succes"],
  [/toon="papier"/, "verwijderde sectietoon (nu `wit`)"],
  [/\bband-spoor\b/, "de lopende band is verwijderd (WCAG 2.2.2)"],
  // Op 15-11 gevonden. Alle vijf zijn fouten die je in een build niet ziet:
  // de pagina werkt, hij is alleen slechter te gebruiken of gekopieerd.
  [
    /focus:outline-none/,
    "zet de sitebrede focusring uit (3px ink-950, 19,45:1) — laat hem staan",
  ],
  // Niet alleen `border-`: amber-500 zat ook op de sterren (`text-`) en op
  // het streepje in de kennisbank (`bg-`). Na 15-11 komt de tint nergens meer
  // als klasse voor. Bewust met voorvoegsel, zodat een toelichting die het
  // getal nóemt niet aanslaat.
  [
    /(?:border|bg|text|ring|divide|from|to|via|fill|stroke|decoration|marker:text)-amber-500/,
    "amber-500 haalt op wit 2,41:1 en is te licht voor iets dat je moet zien (1.4.11 eist 3:1; amber-600 haalt 3,40:1, amber-700 5,08:1)",
  ],
  [
    /placeholder:text-ink-[1-4]00/,
    "placeholder onder 4,5:1 — hij draagt het formaat en de uitleg, dus hij is tekst (ink-500 haalt 4,83:1)",
  ],
  // Deze twee gelden niet voor de sectiebibliotheek zelf: dáár hoort de
  // FAQ-sectie één keer te staan. Het derde veld is die uitzondering.
  [
    /labelledBy="faq/,
    "de FAQ-sectie stond dertien keer gekopieerd; gebruik `Faqsectie` uit components/sections",
    "components/sections.tsx",
  ],
  [
    /Staat uw vraag er niet bij\? Zet hem in het/,
    "die regel hoort in `Faqsectie` — in een pagina betekent het dat het blok weer gekopieerd is",
    "components/sections.tsx",
  ],
  [/from ["'](?:\.\/|@\/components\/)ui["']/, "import uit de oude ui-bibliotheek"],
  [
    /from ["'](?:\.\/|@\/components\/)icons["']/,
    "import uit de oude icons-bibliotheek",
  ],
];

/* De dubbelzinnige namen: `card`, `lead`, `link`, `label`, `input`, `section`
   en `tabular` waren klassen, maar zijn ook gewone woorden en bestaande
   JSX-attributen (`<section>`, `labelledBy`, `aria-label`). Die mogen dus
   alleen in een `className` gezocht worden, anders slaat de controle aan op
   elke sectie-tag en op elk label.

   `(?<![\w-])` en `(?![\w-])` in plaats van `\b`: een streepje is voor `\b`
   een woordgrens, waardoor `lead` ook in `text-lead` zou aanslaan en `label`
   in `veld-label` — allebei klassen die wél bestaan. */
const DUBBELZINNIG = [
  ["card", "oude kaart (nu `paneel` of een haarlijn)"],
  // `eyebrow` hoort hier en niet bij de losse regels hierboven: het is óók de
  // naam van een veld in lib/kennisbank.ts (`artikel.eyebrow`), en dat is
  // data en geen klasse.
  ["eyebrow", "oude bovenkop (nu `bovenkop`)"],
  ["eyebrow-dark", "oude bovenkop op donker (nu `bovenkop-donker`)"],
  ["section", "oude sectie (nu `vlak`)"],
  ["lead", "oude inleiding (nu `text-lead`)"],
  ["link", "oude tekstlink (nu `verwijzing`)"],
  ["label", "oud formulierlabel (nu `veld-label`)"],
  ["input", "oud invoerveld (nu `veld`)"],
  ["tabular", "oude cijferklasse (nu `cijfers`)"],
  ["glas", "oude glaslaag (verwijderd)"],
  ["grain", "oude korrellaag (nu `raster`)"],
  // `korrel` was tot 14-11 een alias van `raster` en stond nog op twee
  // pagina's — bovenop een `Vlak toon="donker"`, dat het raster zelf al als
  // laag binnen het vlak zet. Het raster werd daar dus twee keer over elkaar
  // getekend. De alias is weg; de naam mag niet terugkomen.
  ["korrel", "alias van `raster`, verwijderd (dubbel raster op donker)"],
  ["rise", "oude animatie (nu `komt-op`)"],
  ["num", "oude cijferkop (nu `bovenkop`)"],
];
const DOOD_IN_CLASS = DUBBELZINNIG.map(([naam, wat]) => [
  new RegExp(`(?<![\\w-])${naam}(?![\\w-])`),
  wat,
]);

/** De stringliteralen binnen een JavaScript-expressie, achter elkaar. */
function literalen(expr) {
  return [...expr.matchAll(/["'`]([^"'`]*)["'`]/g)].map((m) => m[1]).join(" ");
}

/**
 * Alle `className`-waarden uit een bestand, met het regelnummer erbij — en
 * alléén de letterlijke klassen, niet de code eromheen.
 *
 * Dat onderscheid is nodig gebleken: `className={link.pasVanafXl ? "hidden
 * xl:block" : undefined}` leverde anders een melding op "oude tekstlink",
 * omdat de variabele `link` heet. Een naam in de code is geen klasse.
 */
function klassenamen(tekst) {
  const uit = [];
  const re = /className=(?:"([^"]*)"|\{`([^`]*)`\}|\{([^}]*)\})/gs;
  for (const m of tekst.matchAll(re)) {
    let waarde;
    if (m[1] !== undefined) {
      // Een gewone string: alles erin is klasse.
      waarde = m[1];
    } else if (m[2] !== undefined) {
      // Een template: de tekst buiten ${…} is klasse, en binnen ${…} alleen
      // de stringliteralen.
      waarde = m[2].replace(/\$\{([\s\S]*?)\}/g, (_, expr) => ` ${literalen(expr)} `);
    } else {
      // Een andere expressie: uitsluitend de stringliteralen.
      waarde = literalen(m[3] ?? "");
    }
    const nr = tekst.slice(0, m.index).split("\n").length;
    uit.push([nr, waarde]);
  }
  return uit;
}

for (const pad of bron) {
  regels(pad).forEach((r, i) => {
    for (const [re, wat, behalve] of OUD) {
      // `behalve` is het ene bestand waar het patroon wél hoort te staan —
      // de sectiebibliotheek, voor de regels die kopieerwerk opsporen.
      if (behalve && pad.replace(/\\/g, "/").endsWith(behalve)) continue;
      if (re.test(r)) meld(fouten, pad, i + 1, `${wat}: nog niet omgezet`);
    }
  });
  for (const [nr, waarde] of klassenamen(readFileSync(pad, "utf8"))) {
    for (const [re, wat] of DOOD_IN_CLASS)
      if (re.test(waarde)) meld(fouten, pad, nr, `${wat}: nog niet omgezet`);
  }
}

/* -- 5. Informeel taalgebruik --------------------------------------------
   De eigenaar spreekt zijn klant met "u" aan. Dit is een waarschuwing en
   geen fout, omdat "je" ook in commentaar en in variabelenamen voorkomt.

   Eén uitzondering: een FAQ-vráag is de bezoeker die óns aanspreekt
   ("Kunnen jullie mijn tv ook ophangen?"). Dat is geen informele
   aanspreekvorm maar zijn eigen woorden, en het is precies hoe iemand het in
   Google typt. Vragen worden dus overgeslagen; antwoorden niet. */
const IS_VRAAG = /(?:^\s*q:|\?["'`],?\s*$)/;
for (const pad of bron) {
  regels(pad).forEach((r, i) => {
    if (/^\s*(?:\/\/|\*|\/\*)/.test(r)) return;
    if (IS_VRAAG.test(r)) return;
    if (/\bjouw\b|\bjij\b|\bjullie\b/i.test(r))
      meld(waarschuwingen, pad, i + 1, "informele aanspreekvorm in code");
  });
}

/* -- 6. Controles op de gegenereerde pagina's ----------------------------- */
if (process.argv.includes("--html")) {
  const htmls = bestanden(join(WORTEL, ".next", "server", "app"), [".html"]);
  if (htmls.length === 0) {
    fouten.push("geen gegenereerde pagina's gevonden — draai eerst npm run build");
  }
  // Pagina's die bewust geen formulier dragen en naar /contact wijzen.
  const ZONDER_FORMULIER = new Set([
    "contact",
    "diensten",
    "over-ons",
    "werkgebied",
    "kennisbank",
    "privacy",
    "_not-found",
    "_global-error",
  ]);
  for (const pad of htmls) {
    const naam = relative(join(WORTEL, ".next", "server", "app"), pad)
      .split(sep)
      .join("/")
      .replace(/\.html$/, "");
    const html = readFileSync(pad, "utf8");
    const basis = naam.split("/")[0];
    const vrijgesteld =
      ZONDER_FORMULIER.has(basis) || naam.startsWith("kennisbank/");

    if (!vrijgesteld && !html.includes('id="afspraak"'))
      fouten.push(`${naam}: commerciële pagina zonder afspraakformulier`);

    // Een belknop zou hier opduiken als een <a> met zowel een tel:-href als
    // een knopklasse. Bewust twee losse tests op dezelfde tag en niet één
    // regex die `href` vóór `class` eist: React rendert attributen in de
    // volgorde van de props, dus `<a className="knop-vol" href="tel:…">`
    // glipte door de oude controle heen.
    //
    // `knop` staat hier sinds de herbouw naast `btn`. Zonder die toevoeging
    // bewaakte deze regel — de hardste eis van de eigenaar — niets meer,
    // omdat er geen enkele `btn`-klasse meer op de site staat.
    // Tot 16-11-2026 was elke belknop hier een fout. De eigenaar heeft die
    // eis die dag zelf omgedraaid en om een belknop gevraagd, en de cijfers
    // steunen dat: 9 van de 24 conversies over 90 dagen waren al
    // telefoonkliks op een nummer dat alleen in de voettekst stond, bij 84%
    // mobiel verkeer. Meetbaar is het ook: Analytics.tsx meet elke tel:-klik.
    //
    // De controle blijft bestaan, maar hij telt nu in plaats van te verbieden.
    // Precies een belknop per pagina, die uit HeroKnoppen. Twee of meer
    // betekent dat er elders alsnog een nummer als knop is bijgekomen, en dan
    // is de hero niet meer de enige plek - dat is het sluipgedrag waar de oude
    // eis tegen was. Pagina's zonder hero (privacy, 404) hebben er nul.
    const belKnoppen = (html.match(/<a\b[^>]*>/g) ?? []).filter(
      (tag) => /href="tel:/.test(tag) && /class="[^"]*\b(?:btn|knop)/.test(tag),
    ).length;
    if (belKnoppen > 1)
      fouten.push(
        `${naam}: ${belKnoppen} belknoppen op een pagina (alleen die in de hero mag)`,
      );

    /* -- Een knop naar #afspraak moet dat anker ook hebben -----------------
       Dit is een echte fout geweest: `afspraakHref()` gaf standaard
       "#afspraak" terug, waardoor op de 404-pagina — die geen formulier
       draagt — zowel de knop in de koptekst als de zwevende balk naar een
       anker wees dat daar niet bestond. De bezoeker klikte op de enige
       gekleurde knop van het scherm en er gebeurde niets. */
    if (html.includes('href="#afspraak"') && !html.includes('id="afspraak"'))
      fouten.push(`${naam}: verwijst naar #afspraak maar heeft dat anker niet`);

    // Op 22-10-2026 zijn de vaste tarieven per tv-formaat (99/129/159) op
    // verzoek van de eigenaar teruggezet. Deze regel keurde juist díe bedragen
    // af; nu is €89 het bedrag dat niet meer mag blijven staan. De controle
    // blijft nodig: een pagina die een vervallen tarief noemt, belooft een
    // prijs die niet geleverd wordt.
    if (/€\s?89\b/.test(html))
      fouten.push(`${naam}: vervallen vanafprijs (€89) staat nog in de pagina`);

    const h1 = (html.match(/<h1\b/g) ?? []).length;
    if (!vrijgesteld && h1 !== 1)
      fouten.push(`${naam}: ${h1} keer een h1 (moet er precies één zijn)`);

    /* -- De koppenstructuur -----------------------------------------------
       Twee eisen, en allebei zijn ze een echte fout geweest.

       Geen overgeslagen niveau: `Bewijsrij` stond op 39 pagina's in een
       sectie zonder sectiekop, waardoor de eerste kop na de h1 van de hero
       een h3 was. Voor een schermlezer en voor een zoekmachine ontbreekt er
       dan een niveau, en de pagina lijkt een onderdeel te missen.

       En geen kop die twee keer op één pagina staat: "Wat kost een tv
       ophangen?" stond op /tv-ophangen zowel als sectiekop als als
       FAQ-vraag, en "In welke wijken van <stad> komen wij?" op elf van de 32
       stadpagina's. Dezelfde vraag twee keer, met twee keer een eigen
       antwoord, leest als slordigheid — ook als beide antwoorden klopen. */
    const koppen = [...html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/g)].map(
      (m) => ({
        n: Number(m[1]),
        tekst: m[2].replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim(),
      }),
    );
    let vorige = 0;
    for (const kop of koppen) {
      if (vorige && kop.n > vorige + 1)
        fouten.push(
          `${naam}: kopniveau h${vorige} -> h${kop.n} slaat een niveau over (${kop.tekst.slice(0, 50)})`,
        );
      vorige = kop.n;
    }
    const perKop = new Map();
    for (const kop of koppen)
      if (kop.tekst) perKop.set(kop.tekst, (perKop.get(kop.tekst) ?? 0) + 1);
    for (const [tekst, keer] of perKop)
      if (keer > 1)
        fouten.push(
          `${naam}: dezelfde kop ${keer} keer op één pagina (${tekst.slice(0, 50)})`,
        );

    /* -- Het ritme van de secties ----------------------------------------
       De pagina's wisselen wit en `surface` af; dát verschil is het enige
       wat secties van elkaar scheidt, want er zijn geen randen tussen.
       Twee secties met dezelfde achtergrond naast elkaar lopen dus in
       elkaar over, en dat is precies wat er gebeurde toen `toon="papier"`
       (de standaard) en `toon="wit"` allebei wit werden: op de homepage
       stonden er twee van zulke paren. Zichtbaar voor de bezoeker,
       onzichtbaar in een build — vandaar deze controle. */
    const tonen = (html.match(/<section[^>]*class="vlak[^"]*"/g) ?? []).map(
      (tag) =>
        /bg-ink-950/.test(tag) ? "donker" : /bg-surface/.test(tag) ? "grijs" : "wit",
    );
    for (let i = 1; i < tonen.length; i++) {
      if (tonen[i] === tonen[i - 1] && tonen[i] !== "donker")
        waarschuwingen.push(
          `${naam}: twee secties achter elkaar met dezelfde achtergrond (${tonen[i]}, positie ${i})`,
        );
    }
  }
}

/* -- Uitkomst ------------------------------------------------------------- */
const uniek = (a) => [...new Set(a)].sort();
for (const w of uniek(waarschuwingen)) console.log(`  let op   ${w}`);
for (const f of uniek(fouten)) console.log(`  FOUT     ${f}`);

const n = uniek(fouten).length;
console.log(
  n === 0
    ? `\nOntwerpcontrole: in orde (${bron.length} bestanden, ${uniek(waarschuwingen).length} waarschuwingen)`
    : `\nOntwerpcontrole: ${n} fout${n === 1 ? "" : "en"}`,
);
process.exit(n === 0 ? 0 : 1);
