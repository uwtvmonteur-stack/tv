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

const bron = [
  ...bestanden(join(WORTEL, "app"), [".tsx", ".ts"]),
  ...bestanden(join(WORTEL, "components"), [".tsx", ".ts"]),
];

/** Regels per bestand, zodat een melding een regelnummer heeft. */
function regels(pad) {
  return readFileSync(pad, "utf8").split(/\r?\n/);
}

function meld(lijst, pad, nr, tekst) {
  lijst.push(`${relative(WORTEL, pad).split(sep).join("/")}:${nr}  ${tekst}`);
}

/* -- 1. Het telefoonnummer mag alleen in de voettekst staan ---------------
   Harde eis van de eigenaar: één actie per scherm, de offerteaanvraag. Een
   belknop ernaast haalt de aanvraag weg en levert een gesprek op dat niet
   meetbaar is en niet inplanbaar. */
for (const pad of bron) {
  const naam = relative(WORTEL, pad).split(sep).join("/");
  if (naam === "components/Footer.tsx" || naam === "app/api/afspraak/route.ts")
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
   ervaring met het bedrijf een gebroken afspraak. */
const TIJDBELOFTE =
  /binnen (?:een|1|twee|2|drie|3|vier|4) uur|binnen (?:15|30|45) minuten|direct (?:contact|bericht|antwoord)|meteen contact/i;
for (const pad of bron) {
  regels(pad).forEach((r, i) => {
    if (TIJDBELOFTE.test(r))
      meld(fouten, pad, i + 1, "belooft een exacte reactietijd");
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
    /\b(?:bg|text|border|ring|divide|decoration)-(?:paper|raised|sunk|inverse|inverse-raised|fg|fg-muted|fg-subtle|fg-inverse|fg-inverse-muted|hairline|hairline-inverse|control|accent-fg|accent-tint|accent-ink)\b/,
    "oud kleurtoken",
  ],
  [/\bshadow-e[123]\b/, "oude schaduw (shadow-e1/e2/e3)"],
  [/\b(?:px|py|mb|mt|gap)-(?:gutter|section|stack|block)\b/, "oud ruimtetoken"],
  [/\bmax-w-(?:content|wide)\b/, "oude containerbreedte"],
  [/\bon-inverse\b/, "oude klasse on-inverse"],
  [/from ["'](?:\.\/|@\/components\/)ui["']/, "import uit de oude ui-bibliotheek"],
  [
    /from ["'](?:\.\/|@\/components\/)icons["']/,
    "import uit de oude icons-bibliotheek",
  ],
];
for (const pad of bron) {
  const naam = relative(WORTEL, pad).split(sep).join("/");
  // De oude bibliotheken zelf mogen nog oude tokens bevatten; ze verdwijnen
  // als laatste stap van de migratie.
  if (naam === "components/ui.tsx" || naam === "components/icons.tsx") continue;
  regels(pad).forEach((r, i) => {
    for (const [re, wat] of OUD)
      if (re.test(r)) meld(fouten, pad, i + 1, `${wat}: nog niet omgezet`);
  });
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

    if (!vrijgesteld && !html.includes('id="offerte"'))
      fouten.push(`${naam}: commerciële pagina zonder offerteformulier`);

    // Een belknop zou hier opduiken als een <a href="tel: met een btn-klasse.
    const belKnop = /<a[^>]+href="tel:[^"]*"[^>]*class="[^"]*btn/.test(html);
    if (belKnop)
      fouten.push(`${naam}: telefoonnummer staat als knop op de pagina`);

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
