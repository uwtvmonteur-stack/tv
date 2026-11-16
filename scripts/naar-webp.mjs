/**
 * Zet bronfoto's om naar webp.
 *
 * `next/image` levert zelf avif en webp uit, dus dit gaat niet over wat de
 * bezoeker krijgt. Het gaat over de bron: een jpg van 800 kB kost bij elke
 * eerste aanvraag per variant onnodig rekentijd op de server, en staat zo ook
 * in de repo. Max 1800px breed bij kwaliteit 82 is ruim genoeg voor een
 * herobeeld van 600px op een scherm met dubbele pixeldichtheid.
 *
 * Gebruik: node scripts/naar-webp.mjs public/images
 */
import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const map = process.argv[2] ?? "public/images";

/** De dienstkaarten lezen `dienst-<slug>.webp`, dus deze bron krijgt de slug. */
const hernoem = { "dienst-soundbar": "dienst-soundbar-installatie" };

for (const naam of await readdir(map)) {
  if (!/\.jpe?g$|\.png$/i.test(naam)) continue;
  const basis = naam.replace(/\.(jpe?g|png)$/i, "");
  const doel = path.join(map, `${hernoem[basis] ?? basis}.webp`);
  const bron = path.join(map, naam);
  const meta = await sharp(bron).metadata();
  await sharp(bron)
    .resize({ width: Math.min(1800, meta.width ?? 1800), withoutEnlargement: true })
    .webp({ quality: 82, effort: 5 })
    .toFile(doel);
  const voor = (await stat(bron)).size;
  const na = (await stat(doel)).size;
  console.log(
    `${naam} ${(voor / 1024).toFixed(0)}kB -> ${path.basename(doel)} ${(na / 1024).toFixed(0)}kB  (${meta.width}x${meta.height})`,
  );
}
