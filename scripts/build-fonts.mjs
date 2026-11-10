// Subsets the brand fonts (assets-src/fonts/*.ttf, SIL Open Font License) to WOFF2 in public/fonts.
// Run with `npm run fonts` after changing the character set or adding a weight.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import subsetFont from 'subset-font';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const src = path.join(root, 'assets-src', 'fonts');
const out = path.join(root, 'public', 'fonts');

// Basic Latin, Latin-1 Supplement, the few Latin Extended-A letters French needs, and typographic punctuation.
const ranges = [
  [0x20, 0x7e],
  [0xa0, 0xff],
  [0x152, 0x153],
  [0x178, 0x178],
  [0x2013, 0x2014],
  [0x2018, 0x201e],
  [0x2022, 0x2022],
  [0x2026, 0x2026],
  [0x202f, 0x202f],
  [0x20ac, 0x20ac],
  [0x2116, 0x2116],
];
const text = ranges.flatMap(([a, b]) => Array.from({ length: b - a + 1 }, (_, i) => String.fromCodePoint(a + i))).join('');

const fonts = [
  ['BigShouldersDisplay-800.ttf', 'big-shoulders-display-800.woff2'],
  ['BigShouldersDisplay-900.ttf', 'big-shoulders-display-900.woff2'],
  ['SofiaSans-500.ttf', 'sofia-sans-500.woff2'],
  ['SofiaSans-700.ttf', 'sofia-sans-700.woff2'],
  ['SofiaSansCondensed-700.ttf', 'sofia-sans-condensed-700.woff2'],
  ['SofiaSansCondensed-800.ttf', 'sofia-sans-condensed-800.woff2'],
];

await mkdir(out, { recursive: true });
for (const [from, to] of fonts) {
  const input = await readFile(path.join(src, from));
  const output = await subsetFont(input, text, { targetFormat: 'woff2' });
  await writeFile(path.join(out, to), output);
  console.log(`${to}: ${(input.length / 1024).toFixed(0)} KB -> ${(output.length / 1024).toFixed(1)} KB`);
}
