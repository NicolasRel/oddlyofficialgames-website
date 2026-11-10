// Runs Lighthouse (mobile and desktop) on the main pages of a running site and prints the scores.
// Usage: npm run preview (in another terminal), then: node scripts/lighthouse.mjs [baseUrl] [outDir]
// Lighthouse is fetched by npx on first use; it is not a dependency of the site.
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

const base = (process.argv[2] ?? 'http://localhost:4321').replace(/\/$/, '');
const out = process.argv[3] ?? 'qa/lighthouse';
const chrome = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const pages = [
  ['home-en', '/'],
  ['home-fr', '/fr/'],
  ['games-en', '/games/'],
  ['game-en', '/games/conepocalypse/'],
  ['game-fr', '/fr/jeux/conepocalypse/'],
  ['press-en', '/press/'],
  ['contact-en', '/contact/'],
  ['legal-en', '/legal/'],
];
mkdirSync(out, { recursive: true });
const rows = [];
for (const [name, url] of pages) {
  for (const preset of ['mobile', 'desktop']) {
    const file = path.join(out, `${name}_${preset}.json`);
    const args = ['--yes', 'lighthouse', base + url, '--quiet', '--output=json', `--output-path=${file}`, '--chrome-flags=--headless=new', '--only-categories=performance,accessibility,best-practices,seo'];
    if (preset === 'desktop') args.push('--preset=desktop');
    execFileSync('npx', args, { stdio: ['ignore', 'ignore', 'inherit'], shell: true, env: { ...process.env, CHROME_PATH: chrome } });
    const r = JSON.parse(readFileSync(file, 'utf8'));
    const score = (k) => Math.round(r.categories[k].score * 100);
    const failed = Object.values(r.audits)
      .filter((a) => a.score !== null && a.score < 0.9 && a.scoreDisplayMode !== 'informative' && a.scoreDisplayMode !== 'manual' && a.scoreDisplayMode !== 'notApplicable')
      .map((a) => a.id);
    rows.push({ page: name, preset, perf: score('performance'), a11y: score('accessibility'), bp: score('best-practices'), seo: score('seo'), LCP: r.audits['largest-contentful-paint'].displayValue, CLS: r.audits['cumulative-layout-shift'].displayValue, TBT: r.audits['total-blocking-time'].displayValue, failed: failed.join(' ') });
  }
}
console.table(rows);
