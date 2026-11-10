// Checks the built site (dist/): internal links and files, anchors, language versions, SEO tags, alt texts,
// and that the official privacy policy is linked where it must be. Add --external to also request external links.
// Usage: npm run build && npm run check
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const dist = path.resolve('dist');
const base = (process.env.BASE_PATH ?? '/').replace(/\/$/, '');
const PRIVACY = 'https://privacy.oddlyofficialgames.com';
const external = process.argv.includes('--external');

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}
const exists = (p) => stat(p).then(() => true, () => false);
const attr = (tag, name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#38;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'");

const files = (await walk(dist)).filter((f) => f.endsWith('.html'));
const errors = [];
const externals = new Map();
const pages = new Map();

for (const file of files) {
  const html = await readFile(file, 'utf8');
  const rel = '/' + path.relative(dist, file).split(path.sep).join('/');
  const url = rel.replace(/index\.html$/, '');
  const err = (msg) => errors.push(`${rel}: ${msg}`);
  const is404 = rel === '/404.html';

  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  pages.set(url, { html, ids });

  if (!/<html lang="(en|fr)"/.test(html)) err('missing or unexpected <html lang>');
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
  if (title.length < 10 || title.length > 70) err(`title length ${title.length}`);
  const description = attr(html.match(/<meta name="description"[^>]*>/)?.[0] ?? '', 'content') ?? '';
  if (description.length < 50 || description.length > 170) err(`description length ${description.length}`);
  const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1 !== 1) err(`${h1} <h1>`);
  if (!is404) {
    if (!/<link rel="canonical"/.test(html)) err('no canonical');
    for (const lang of ['en', 'fr', 'x-default']) if (!html.includes(`hreflang="${lang}"`)) err(`no hreflang ${lang}`);
    for (const p of ['og:title', 'og:description', 'og:image', 'og:url']) if (!html.includes(`property="${p}"`)) err(`no ${p}`);
    if (!html.includes(`href="${PRIVACY}"`)) err('the official privacy policy is not linked');
  }
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    if (attr(m[0], 'alt') === undefined) err(`image without alt: ${attr(m[0], 'src')}`);
    if (!attr(m[0], 'width') || !attr(m[0], 'height')) err(`image without dimensions: ${attr(m[0], 'src')}`);
  }
  if (/<script(?![^>]*application\/ld\+json)/.test(html)) err('unexpected script');
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch { err('invalid JSON-LD'); }
  }

  const refs = [
    ...[...html.matchAll(/\s(?:href|src|poster)="([^"]+)"/g)].map((m) => m[1]),
    ...[...html.matchAll(/\ssrcset="([^"]+)"/g)].flatMap((m) => m[1].split(',').map((s) => s.trim().split(/\s+/)[0])),
    ...[...html.matchAll(/property="og:image" content="([^"]+)"/g)].map((m) => m[1]),
  ].map(decode);

  for (const ref of new Set(refs)) {
    if (ref.startsWith('mailto:')) {
      if (!ref.startsWith('mailto:contact@oddlyofficialgames.com')) err(`unexpected address: ${ref}`);
      continue;
    }
    if (ref.startsWith('#')) {
      if (!ids.has(ref.slice(1))) err(`anchor not found: ${ref}`);
      continue;
    }
    let target = ref;
    if (/^https?:/.test(ref)) {
      const u = new URL(ref);
      if (u.host !== 'oddlyofficialgames.com' && !u.host.endsWith('.github.io')) {
        externals.set(ref, rel);
        continue;
      }
      target = u.pathname + u.hash;
    }
    if (!target.startsWith(base + '/')) { err(`link outside the base path: ${ref}`); continue; }
    const [p, hash] = target.slice(base.length).split('#');
    const onDisk = path.join(dist, p.endsWith('/') ? p + 'index.html' : p);
    if (!(await exists(onDisk))) { err(`broken link: ${ref}`); continue; }
    if (hash && p.endsWith('/')) {
      const other = await readFile(onDisk, 'utf8');
      if (!other.includes(`id="${hash}"`)) err(`anchor not found: ${ref}`);
    }
  }
}

// Each page must point to its other language, and that page must point back.
for (const [url, { html }] of pages) {
  if (url === '/404.html') continue;
  const lang = html.match(/<html lang="(en|fr)"/)?.[1];
  const other = lang === 'en' ? 'fr' : 'en';
  const alt = html.match(new RegExp(`<link rel="alternate" hreflang="${other}" href="([^"]+)"`))?.[1];
  if (!alt) continue;
  const altPath = new URL(alt).pathname.slice(base.length);
  const back = pages.get(altPath)?.html.match(new RegExp(`<link rel="alternate" hreflang="${lang}" href="([^"]+)"`))?.[1];
  if (!back || new URL(back).pathname.slice(base.length) !== url) errors.push(`${url}: its ${other} version does not link back`);
}

for (const f of ['sitemap-index.xml', 'sitemap-0.xml', 'robots.txt', 'favicon.svg', '404.html']) {
  if (!(await exists(path.join(dist, f)))) errors.push(`missing ${f}`);
}

console.log(`${files.length} pages checked.`);
console.log(`External links (${externals.size}):`);
for (const [ref, from] of externals) {
  if (!external) { console.log(`  ${ref}  (first seen in ${from})`); continue; }
  try {
    const res = await fetch(ref, { method: 'GET', redirect: 'follow' });
    console.log(`  ${res.status} ${ref}`);
    if (!res.ok) errors.push(`external link answers ${res.status}: ${ref}`);
  } catch (e) {
    errors.push(`external link unreachable: ${ref} (${e.message})`);
  }
}
if (errors.length) {
  console.error(`\n${errors.length} problem(s):\n` + errors.join('\n'));
  process.exit(1);
}
console.log('\nNo problem found.');
