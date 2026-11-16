import { NextRequest } from "next/server";

/**
 * Postcode + huisnummer → straatnaam en woonplaats.
 *
 * Waarom dit bestaat: het formulier vroeg straat, huisnummer, postcode én
 * woonplaats allemaal met de hand. Vier velden voor iets dat in Nederland door
 * twee velden eenduidig wordt bepaald. De bezoeker typt er nu twee, en krijgt
 * een adres terug dat is nagekeken in plaats van ingetypt — geen typefouten in
 * de straatnaam, en de monteur rijdt naar een adres dat bestaat.
 *
 * Waarom via onze eigen server en niet rechtstreeks uit de browser: dan gaat de
 * postcode van de bezoeker niet vanuit zijn eigen browser naar een derde partij,
 * en staat er geen extra domein in zijn netwerkverkeer. Wij bepalen wat er wordt
 * verstuurd (alleen postcode en huisnummer, nooit een naam of telefoonnummer) en
 * wij loggen het niet.
 *
 * De bron is de Locatieserver van PDOK, de open adressendienst van het Kadaster.
 * Geen sleutel, geen account, geen limiet die wij halen.
 *
 * LET OP — dit is de hele reden dat deze route bestaat in plaats van één fetch
 * in het formulier. De vrije zoekvorm van die dienst (`q=3511AB 12`) RAADT, en
 * dat gaat stil mis. Gemeten op 16-11-2026:
 *
 *   q=3511AB 12    → Oudegracht 3A         (verkeerd huisnummer)
 *   q=2595AA 9999  → Stitswerderweg, Stitswerd, 9999XJ  (volkomen verkeerd:
 *                     "9999" werd als postcode gelezen)
 *   q=9999ZZ 1     → 1juli-weg, Maastricht (zonder postcode in het antwoord)
 *
 * Een bezoeker die één cijfer verkeerd typt zou dus een bestaande straat aan de
 * andere kant van het land in zijn aanvraag krijgen, zonder dat iemand het ziet.
 * Daarom gebruiken we de filtervorm (`fq=postcode:…&fq=huisnummer:…`), die
 * exact is: een bestaand adres geeft één treffer, alle onzin geeft nul.
 */

const PDOK = "https://api.pdok.nl/bzk/locatieserver/search/v3_1/free";

/** 1234AB — vier cijfers, twee letters, zonder spatie, hoofdletters. */
const POSTCODE_RE = /^[1-9][0-9]{3}[A-Z]{2}$/;

type Treffer = {
  straatnaam?: string;
  woonplaatsnaam?: string;
};

async function zoek(params: Record<string, string | string[]>) {
  const url = new URL(PDOK);
  url.searchParams.set("q", "*:*");
  url.searchParams.set("fl", "straatnaam,woonplaatsnaam");
  for (const [sleutel, waarde] of Object.entries(params)) {
    for (const v of Array.isArray(waarde) ? waarde : [waarde]) {
      url.searchParams.append(sleutel, v);
    }
  }
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    // Een trage adressendienst mag het formulier niet ophouden: de bezoeker
    // kan de straat altijd zelf typen, dus na vier seconden laten we het los.
    signal: AbortSignal.timeout(4000),
    // Dezelfde postcode levert altijd dezelfde straat; een dag cache scheelt
    // de dienst van het Kadaster het werk en onze bezoeker de wachttijd.
    next: { revalidate: 86400 },
  });
  if (!res.ok) return null;
  const data = (await res.json()) as {
    response?: { numFound?: number; docs?: Treffer[] };
  };
  const doc = data.response?.docs?.[0];
  if (!doc?.straatnaam || !doc?.woonplaatsnaam) return null;
  return { straat: doc.straatnaam, plaats: doc.woonplaatsnaam };
}

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams;
  const postcode = (q.get("postcode") ?? "")
    .replace(/\s+/g, "")
    .toUpperCase()
    .slice(0, 6);
  // Alleen het cijferdeel: "12 B" en "7-bis" zoeken op 12 respectievelijk 7.
  // Een toevoeging verandert de straat niet.
  const huisnummer = ((q.get("huisnummer") ?? "").match(/\d{1,5}/) ?? [""])[0];

  if (!POSTCODE_RE.test(postcode)) {
    return Response.json({ status: "ongeldig" }, { status: 400 });
  }

  try {
    if (huisnummer) {
      const exact = await zoek({
        fq: ["type:adres", `postcode:${postcode}`, `huisnummer:${huisnummer}`],
        rows: "1",
      });
      if (exact) return Response.json({ status: "gevonden", ...exact });
    }

    // Terugval op de postcode alleen. Een Nederlandse postcode van zes tekens
    // hoort bij één straat in één plaats — gemeten op 3511AB (Oudegracht,
    // Utrecht), 1012AB (Stationsplein, Amsterdam) en 2595AA (Koningin
    // Julianaplein, 's-Gravenhage). Straat en plaats zijn dus goed, ook als het
    // huisnummer niet op die postcode voorkomt. Dat zeggen we de bezoeker dan
    // ook: de straat staat er, en hij kan zijn huisnummer nog nakijken.
    const opPostcode = await zoek({
      fq: ["type:adres", `postcode:${postcode}`],
      rows: "1",
    });
    if (opPostcode) {
      return Response.json({
        status: huisnummer ? "huisnummerOnbekend" : "gevonden",
        ...opPostcode,
      });
    }
    return Response.json({ status: "nietGevonden" });
  } catch {
    // Tijdslimiet of een dienst die eruit ligt. Geen fout voor de bezoeker:
    // hij typt de straat gewoon zelf, zoals vóór deze route.
    return Response.json({ status: "onbereikbaar" });
  }
}
