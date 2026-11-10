// Visual inspection: photographs every page at five screen sizes with the locally installed Chrome.
// Usage: npm run build && npm run preview (in another terminal), then: node scripts/screenshots.mjs [outDir] [baseUrl]
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import puppeteer from 'puppeteer-core';

const out = process.argv[2] ?? 'qa/screens';
const base = (process.argv[3] ?? 'http://localhost:4321').replace(/\/$/, '');
const chrome = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const pages = [
  ['home-en', '/'],
  ['home-fr', '/fr/'],
  ['games-en', '/games/'],
  ['game-en', '/games/conepocalypse/'],
  ['game-fr', '/fr/jeux/conepocalypse/'],
  ['press-en', '/press/'],
  ['press-fr', '/fr/presse/'],
  ['contact-en', '/contact/'],
  ['legal-fr', '/fr/mentions-legales/'],
  ['404', '/404.html'],
];
const sizes = [
  ['compact', 360, 740, 2],
  ['phone', 390, 844, 2],
  ['tablet', 768, 1024, 1],
  ['laptop', 1366, 768, 1],
  ['wide', 1920, 1080, 1],
];
const only = process.env.ONLY ? process.env.ONLY.split(',') : null;
const onlySizes = process.env.SIZES ? process.env.SIZES.split(',') : null;

await mkdir(out, { recursive: true });
const browser = await puppeteer.launch({ executablePath: chrome, headless: true });
const problems = [];
for (const [name, url] of pages) {
  if (only && !only.includes(name)) continue;
  for (const [size, width, height, dpr] of sizes) {
    if (onlySizes && !onlySizes.includes(size)) continue;
    const page = await browser.newPage();
    await page.setViewport({ width, height, deviceScaleFactor: dpr, isMobile: width < 700, hasTouch: width < 700 });
    page.on('console', (m) => m.type() === 'error' && problems.push(`${name} ${size}: console ${m.text()}`));
    page.on('requestfailed', (r) => problems.push(`${name} ${size}: failed ${r.url()}`));
    await page.goto(base + url, { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);
    await new Promise((r) => setTimeout(r, 1400));
    // Lazy images below the fold: scroll through the page once.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
      // Images further along a sideways gallery stay lazy until scrolled to: bring them in, then wait, but never forever.
      document.querySelectorAll('.gallery').forEach((g) => g.scrollTo(g.scrollWidth, 0));
      await new Promise((r) => setTimeout(r, 200));
      document.querySelectorAll('.gallery').forEach((g) => g.scrollTo(0, 0));
      const loaded = Promise.all([...document.images].map((img) => (img.complete ? null : new Promise((r) => { img.onload = img.onerror = r; }))));
      await Promise.race([loaded, new Promise((r) => setTimeout(r, 2500))]);
      window.scrollTo(0, 0);
    });
    await new Promise((r) => setTimeout(r, 300));
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (overflow > 0) problems.push(`${name} ${size}: horizontal overflow of ${overflow}px`);
    await page.screenshot({ path: path.join(out, `${name}_${size}.jpg`), fullPage: true, type: 'jpeg', quality: 72 });
    await page.close();
  }
}
await browser.close();
console.log(problems.length ? problems.join('\n') : 'No console error, no failed request, no horizontal overflow.');
