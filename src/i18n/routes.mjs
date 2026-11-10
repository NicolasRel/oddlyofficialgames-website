// The site map, in one place: every page key and its path in each language.
// Plain JavaScript so that astro.config.mjs can import it too.

/** @typedef {'en' | 'fr'} Locale */

/** @type {Locale[]} */
export const locales = ['en', 'fr'];
export const defaultLocale = 'en';

/** Static pages. To add a page, add a line here and one page file per language in src/pages. */
export const routes = {
  home: { en: '/', fr: '/fr/' },
  games: { en: '/games/', fr: '/fr/jeux/' },
  press: { en: '/press/', fr: '/fr/presse/' },
  contact: { en: '/contact/', fr: '/fr/contact/' },
  legal: { en: '/legal/', fr: '/fr/mentions-legales/' },
};

/** A game's page in each language, from its slug. */
export const gameRoute = (slug) => ({ en: `/games/${slug}/`, fr: `/fr/jeux/${slug}/` });

/** For the sitemap: the language versions of a path, or null if the path is not a known page. */
export function alternatesFor(pathname) {
  let pair = Object.values(routes).find((r) => r.en === pathname || r.fr === pathname);
  if (!pair) {
    const m = pathname.match(/^\/games\/([^/]+)\/$/) ?? pathname.match(/^\/fr\/jeux\/([^/]+)\/$/);
    if (m) pair = gameRoute(m[1]);
  }
  if (!pair) return null;
  return [
    { lang: 'en', path: pair.en },
    { lang: 'fr', path: pair.fr },
    { lang: 'x-default', path: pair.en },
  ];
}
