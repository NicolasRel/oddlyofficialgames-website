import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { alternatesFor } from './src/i18n/routes.mjs';

// Production: https://oddlyofficialgames.com at the root.
// Pre-production (GitHub Pages project URL): set SITE_URL and BASE_PATH, see README, "Publishing".
const site = process.env.SITE_URL || 'https://oddlyofficialgames.com';
const base = process.env.BASE_PATH || '/';
const baseNoSlash = base.replace(/\/$/, '');

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      serialize(item) {
        const url = new URL(item.url);
        const path = url.pathname.slice(baseNoSlash.length) || '/';
        const alternates = alternatesFor(path);
        if (alternates) {
          item.links = alternates.map(({ lang, path: p }) => ({ lang, url: url.origin + baseNoSlash + p }));
        }
        return item;
      },
    }),
  ],
});
