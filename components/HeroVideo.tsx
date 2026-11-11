"use client";

import { useEffect, useRef, useState } from "react";

/**
 * De videolaag van de hero. Alléén de video — de posterafbeelding staat
 * bewust in `PageHero`, dus in een servercomponent.
 *
 * Dat onderscheid is geen stijlkwestie maar een meting: toen de `<Image>` hier
 * nog binnen stond, kreeg de homepage géén `<link rel="preload" as="image">`
 * in de head en de img geen `fetchpriority`. Next kan die hint alleen tijdens
 * het serveren plaatsen; vanuit een clientcomponent komt hij pas na hydratie,
 * en dan is het LCP-moment allang voorbij. De binnenpagina's, waar de
 * afbeelding wél in de servercomponent zat, kregen hem wel. Gemeten verschil:
 * 1 preload tegen 0.
 *
 * Het `<video>` staat in de server-HTML maar zonder `src`, zonder `autoplay`
 * en met `preload="none"`: het haalt dus geen byte op uit zichzelf. Pas in het
 * effect kijken we of spelen verantwoord is, kiezen we de uitsnede die bij dit
 * scherm hoort, en starten we hem. Dat is een extern systeem aansturen, niet
 * React-state bijwerken in een effect — dat laatste verbiedt de lintregel
 * `react-hooks/set-state-in-effect`, en terecht: het rendert de hele hero een
 * tweede keer.
 *
 * De video is ingekort tot 4,8 seconden en herhaalt niet. Dat is bewust:
 * WCAG 2.2.2 vraagt een pauzeknop bij bewegende inhoud die vanzelf start en
 * langer dan vijf seconden duurt. Door eronder te blijven en niet te
 * herhalen is die knop niet nodig, en blijft de hero rustig in plaats van
 * dat er eindeloos iets beweegt naast de tekst die iemand probeert te lezen.
 *
 * Drie redenen om niet te spelen:
 * - `prefers-reduced-motion: reduce`. Er is geen manier om een autoplay-video
 *   met CSS tegen te houden; het `media`-attribuut op `<source>` werkt alleen
 *   binnen `<picture>`. Vandaar dat dit in JavaScript moet.
 * - Databesparing of 2G.
 * - De browser weigert autoplay. Dan vangen we de afgewezen belofte op.
 *
 * In alle drie de gevallen blijft de poster eronder gewoon staan.
 */
export default function HeroVideo({
  src,
  srcStaand,
}: {
  /** De liggende versie, voor tablet en breder. */
  src: string;
  /**
   * De staande versie voor telefoons.
   *
   * Zonder deze bron wordt een 16:9-film in een vlak van 390 bij 1200 pixels
   * zo hard bijgesneden dat er alleen een strook muur overblijft — op het
   * scherm waar 85% van het betaalde verkeer binnenkomt.
   */
  srcStaand?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [speelt, setSpeelt] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // `connection` zit niet in de TypeScript-DOM-typen en bestaat niet in
    // Safari. Daarom voorzichtig uitlezen in plaats van erop rekenen.
    const verbinding = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    if (
      verbinding?.saveData === true ||
      /^(slow-)?2g$/.test(verbinding?.effectiveType ?? "")
    ) {
      return;
    }

    const staand = srcStaand && !window.matchMedia("(min-width: 48rem)").matches;
    video.src = staand ? srcStaand : src;

    // React zet `muted` niet altijd door naar het DOM-attribuut, en zonder
    // gedempt geluid weigert elke browser autoplay.
    video.muted = true;
    video.preload = "auto";
    void video.play().catch(() => {
      // Autoplay geweigerd. De poster blijft staan; dat is de bedoeling.
    });

    return () => {
      // Alleen pauzeren laat `src` en de gebufferde video in het geheugen
      // staan nadat de bezoeker wegnavigeert.
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [src, srcStaand]);

  return (
    <video
      ref={videoRef}
      muted
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      onPlaying={() => setSpeelt(true)}
      className={`absolute inset-0 size-full object-cover transition-opacity duration-1000 ease-out ${
        speelt ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
