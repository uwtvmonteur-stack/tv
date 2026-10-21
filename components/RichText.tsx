import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Rendert lopende tekst waarin interne links staan als [tekst](/pad).
 *
 * De kennisbank bewaart zijn alinea's als platte strings, waardoor er zonder
 * dit component geen enkele link in de lopende tekst kan staan: elke
 * verwijzing naar een dienstpagina belandt dan in het "zie ook"-blok
 * onderaan. Google weegt een link in de tekst, met een beschrijvende
 * ankertekst, zwaarder dan een link in zo'n blok — en voor de lezer staat de
 * verwijzing nu op het moment dat de vraag opkomt in plaats van na afloop.
 *
 * Bewust alleen interne links (het pad moet met / beginnen): dit is geen
 * markdown-renderer en hoeft geen externe URL's, afbeeldingen of nesting aan
 * te kunnen. Tekst zonder haakjespatroon gaat ongewijzigd door, dus bestaande
 * alinea's blijven werken zoals ze zijn.
 */
const LINK = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;

export default function RichText({ children }: { children: string }) {
  if (!children.includes("](/")) return <>{children}</>;

  const delen: ReactNode[] = [];
  let laatste = 0;
  for (const m of children.matchAll(LINK)) {
    const start = m.index ?? 0;
    if (start > laatste) delen.push(children.slice(laatste, start));
    delen.push(
      <Link key={`${start}-${m[2]}`} href={m[2]} className="link">
        {m[1]}
      </Link>,
    );
    laatste = start + m[0].length;
  }
  if (laatste < children.length) delen.push(children.slice(laatste));
  return <>{delen}</>;
}
