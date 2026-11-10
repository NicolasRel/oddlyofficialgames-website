// Builds the brand files from the approved studio mark (the studio entry screen of Conepocalypse):
// the lockup as outlined vector paths, the favicon set, the press-kit logos and the social sharing images.
// Geometry and colours are copied from the game (StudioSting.cs, 300 x 360 stage). Do not redesign here.
// Run with `npm run og` after changing a sharing line or adding a game.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import opentype from 'opentype.js';
import sharp from 'sharp';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const at = (...p) => path.join(root, ...p);

const INK = '#1C2027';
const ENAMEL = '#F8F6EF';
const CONE = '#F47A28';
const CONE_DEEP = '#A9481A';
const GREY = '#AEB4BE';

const loadFont = async (name) => {
  const buf = await readFile(at('assets-src', 'fonts', name));
  return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
};
const display900 = await loadFont('BigShouldersDisplay-900.ttf');
const display800 = await loadFont('BigShouldersDisplay-800.ttf');
const label800 = await loadFont('SofiaSansCondensed-800.ttf');
const label700 = await loadFont('SofiaSansCondensed-700.ttf');

/** Outlines `text`; `anchor` is 'start' | 'middle' | 'end' relative to x; y is the baseline. */
function outline(font, text, x, y, size, { spacing = 0, anchor = 'start' } = {}) {
  const scale = size / font.unitsPerEm;
  // One glyph per character: the brand lines need no ligatures or contextual forms.
  const glyphs = Array.from(text, (ch) => font.charToGlyph(ch));
  const advances = glyphs.map((g, i) => {
    const kern = i < glyphs.length - 1 ? font.getKerningValue(g, glyphs[i + 1]) : 0;
    return (g.advanceWidth + (Number.isFinite(kern) ? kern : 0)) * scale + (i < glyphs.length - 1 ? spacing : 0);
  });
  const width = advances.reduce((a, b) => a + b, 0);
  let cx = anchor === 'middle' ? x - width / 2 : anchor === 'end' ? x - width : x;
  let d = '';
  glyphs.forEach((g, i) => {
    d += g.getPath(cx, y, size).toPathData(2);
    cx += advances[i];
  });
  return { d, width };
}

/** Largest size at which `text` fits `maxWidth`, capped at `maxSize`. */
function fit(font, text, maxWidth, maxSize, spacing = 0) {
  const w = outline(font, text, 0, 0, maxSize, { spacing }).width;
  return w <= maxWidth ? maxSize : (maxSize * maxWidth) / w;
}

// ---- The lockup (stage units of the game's studio entry) ----
const roundel = (x, y, size) => {
  const k = size / 200;
  const c = (r, fill) => `<circle cx="${x + 100 * k}" cy="${y + 100 * k}" r="${r * k}" fill="${fill}"/>`;
  return (
    `<rect x="${x + 11 * k}" y="${y + 11 * k}" width="${178 * k}" height="${178 * k}" rx="${22 * k}" fill="${CONE_DEEP}"/>` +
    c(74, CONE) + c(54, ENAMEL) + c(42, CONE) + c(13, INK)
  );
};

const STAMP_K = 212 / 316;
const oddly = outline(display900, 'ODDLY', 150, 217, 112, { anchor: 'middle' });
const official = outline(display800, 'OFFICIAL', 158, 55 + (48 / STAMP_K) * 0.4, 48 / STAMP_K, { spacing: 4 / STAMP_K, anchor: 'middle' });
const games = outline(label800, 'GAMES', 150, 321.4, 30, { spacing: 13, anchor: 'middle' });

const lockup = {
  viewBox: '0 0 300 332',
  roundel: roundel(95, 0, 110),
  oddly: oddly.d,
  // Stamp: drawn in its own 316 x 110 frame, then placed, scaled and tilted -8 degrees around its centre.
  stampTransform: `translate(186 228) rotate(-8) scale(${STAMP_K.toFixed(5)}) translate(-158 -55)`,
  stampFrame:
    `<rect x="4" y="4" width="308" height="102" rx="8" fill="none" stroke="${CONE}" stroke-width="8"/>` +
    `<rect x="18" y="18" width="280" height="74" rx="4" fill="none" stroke="${CONE}" stroke-width="2.5"/>`,
  official: official.d,
  games: games.d,
};

const lockupInner =
  lockup.roundel +
  `<path d="${lockup.oddly}" fill="${ENAMEL}"/>` +
  `<g transform="${lockup.stampTransform}">${lockup.stampFrame}<path d="${lockup.official}" fill="${CONE}"/></g>` +
  `<path d="${lockup.games}" fill="${GREY}"/>`;

const svg = (w, h, viewBox, inner) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="${viewBox}">${inner}</svg>`;

const lockupOnDark = svg(1200, 1328, lockup.viewBox, lockupInner);
const lockupDark = svg(1600, 1600, '-90 -74 480 480', `<rect x="-90" y="-74" width="480" height="480" fill="${INK}"/>` + lockupInner);
const roundelSvg = svg(512, 512, '0 0 200 200', roundel(0, 0, 200));

await mkdir(at('src', 'data', 'generated'), { recursive: true });
await mkdir(at('public', 'press', 'oddly-official-games'), { recursive: true });
await mkdir(at('public', 'og'), { recursive: true });

await writeFile(at('src', 'data', 'generated', 'lockup.json'), JSON.stringify(lockup, null, 2) + '\n');

const press = at('public', 'press', 'oddly-official-games');
await writeFile(path.join(press, 'oddly-official-games-logo-for-dark-backgrounds.svg'), lockupOnDark);
await writeFile(path.join(press, 'oddly-official-games-logo-on-ink.svg'), lockupDark);
await writeFile(path.join(press, 'oddly-official-games-roundel.svg'), roundelSvg);
await sharp(Buffer.from(lockupOnDark), { density: 200 }).resize({ width: 2400 }).png().toFile(path.join(press, 'oddly-official-games-logo-for-dark-backgrounds.png'));
await sharp(Buffer.from(lockupDark), { density: 200 }).resize({ width: 2400 }).png().toFile(path.join(press, 'oddly-official-games-logo-on-ink.png'));
await sharp(Buffer.from(roundelSvg), { density: 300 }).resize({ width: 1024 }).png().toFile(path.join(press, 'oddly-official-games-roundel.png'));

// ---- Favicons ----
await writeFile(at('public', 'favicon.svg'), svg(64, 64, '0 0 200 200', roundel(0, 0, 200)));
const touch = svg(180, 180, '0 0 200 200', `<rect width="200" height="200" fill="${INK}"/>` + roundel(14, 14, 172));
await sharp(Buffer.from(touch), { density: 300 }).resize(180, 180).png().toFile(at('public', 'apple-touch-icon.png'));
await sharp(Buffer.from(roundelSvg), { density: 300 }).resize(48, 48).png().toFile(at('public', 'favicon-48.png'));

// ---- Social sharing images, 1200 x 630 ----
const linesOf = (font, lines, x, y0, size, lead, fill, opts = {}) =>
  lines.map((t, i) => `<path d="${outline(font, t, x, y0 + i * lead, size, opts).d}" fill="${fill}"/>`).join('');

async function studioCard(file, { label, lines }) {
  const size = Math.min(...lines.map((t) => fit(display800, t, 560, 74)));
  const inner =
    `<rect width="1200" height="630" fill="${INK}"/>` +
    `<g transform="translate(70 80) scale(1.42)">${lockupInner}</g>` +
    `<rect x="560" y="80" width="2" height="470" fill="#2E343D"/>` +
    `<path d="${outline(label700, label, 600, 190, 22, { spacing: 4 }).d}" fill="${GREY}"/>` +
    linesOf(display800, lines, 600, 190 + 40 + size * 0.8, size, size * 1.02, ENAMEL) +
    `<path d="${outline(label700, 'ODDLYOFFICIALGAMES.COM', 600, 500, 24, { spacing: 4 }).d}" fill="${CONE}"/>`;
  await sharp(Buffer.from(svg(1200, 630, '0 0 1200 630', inner))).png({ compressionLevel: 9 }).toFile(at('public', 'og', file));
}

async function gameCard(file, { art, label, title, lines }) {
  const portrait = await sharp(at(...art)).resize(470, 470).png().toBuffer();
  const mask = Buffer.from(svg(470, 470, '0 0 470 470', `<rect width="470" height="470" rx="103" fill="#fff"/>`));
  const rounded = await sharp(portrait).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer();
  const titleSize = fit(display900, title, 560, 120);
  const lineSize = Math.min(...lines.map((t) => fit(display800, t, 560, 46)));
  const inner =
    `<rect width="1200" height="630" fill="${INK}"/>` +
    `<path d="${outline(label700, label, 590, 190, 22, { spacing: 4 }).d}" fill="${GREY}"/>` +
    `<path d="${outline(display900, title, 590, 200 + 24 + titleSize * 0.8, titleSize).d}" fill="${ENAMEL}"/>` +
    linesOf(display800, lines, 590, 200 + 24 + titleSize * 0.8 + 34 + lineSize * 0.8, lineSize, lineSize * 1.08, CONE) +
    `<path d="${outline(display900, 'ODDLY OFFICIAL GAMES', 590, 520, 30, { spacing: 1 }).d}" fill="${GREY}"/>`;
  const base = await sharp(Buffer.from(svg(1200, 630, '0 0 1200 630', inner))).png().toBuffer();
  await sharp(base).composite([{ input: rounded, left: 70, top: 80 }]).png({ compressionLevel: 9 }).toFile(at('public', 'og', file));
}

await studioCard('studio-en.png', { label: 'INDEPENDENT GAME STUDIO · FRANCE', lines: ['WE TAKE SILLY THINGS', 'VERY SERIOUSLY.'] });
await studioCard('studio-fr.png', { label: 'STUDIO DE JEUX INDÉPENDANT · FRANCE', lines: ['NOUS PRENONS TRÈS AU', 'SÉRIEUX CE QUI NE L’EST PAS.'] });

const president = ['src', 'assets', 'games', 'conepocalypse', 'president.jpg'];
await gameCard('conepocalypse-en.png', { art: president, label: 'FILE No. 001 · MOBILE INCREMENTAL GAME', title: 'CONEPOCALYPSE', lines: ['“A CLOSED ROAD IS', 'A COMPLIANT ROAD.”'] });
await gameCard('conepocalypse-fr.png', { art: president, label: 'DOSSIER N° 001 · JEU MOBILE INCRÉMENTAL', title: 'CONEPOCALYPSE', lines: ['« UNE ROUTE FERMÉE EST', 'UNE ROUTE CONFORME. »'] });

console.log('Brand files written: lockup.json, press logos, favicons, sharing images.');
