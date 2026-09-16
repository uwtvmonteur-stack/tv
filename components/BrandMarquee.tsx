const brands = [
  "Samsung",
  "LG",
  "Sony",
  "Philips",
  "Panasonic",
  "TCL",
  "Hisense",
  "Grundig",
  "Loewe",
  "Sonos",
];

function Row({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <ul
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center gap-x-12 pr-12 md:gap-x-16 md:pr-16"
    >
      {brands.map((brand) => (
        <li
          key={brand}
          className="font-display text-2xl font-bold whitespace-nowrap text-ink/65 md:text-3xl"
        >
          {brand}
        </li>
      ))}
    </ul>
  );
}

export default function BrandMarquee() {
  return (
    <section
      aria-label="Merken waarmee wij werken"
      className="border-y border-ink/5 bg-cream-deep/40 py-10 md:py-12"
    >
      <p className="mb-7 text-center text-[11px] font-semibold tracking-[0.2em] text-ink-soft uppercase">
        Wij installeren tv&apos;s van alle grote merken
      </p>
      <div className="marquee">
        <div className="marquee__track">
          <Row />
          <Row ariaHidden />
        </div>
      </div>
    </section>
  );
}
