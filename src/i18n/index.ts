import { en, type Strings } from './en';
import { fr } from './fr';
import { routes, gameRoute, locales, defaultLocale } from './routes.mjs';
import type { Locale } from '../data/games/types';

export { routes, gameRoute, locales, defaultLocale };
export type { Locale, Strings };

const NBSP = ' ';
const NNBSP = ' ';

/** French typography: non-breaking spaces before high punctuation, inside guillemets and after "n°". */
export function frTypo(text: string): string {
  return text
    .replace(/ ([;?!])/g, `${NNBSP}$1`)
    .replace(/ :/g, `${NBSP}:`)
    .replace(/« /g, `«${NBSP}`)
    .replace(/ »/g, `${NBSP}»`)
    .replace(/([nN])° /g, `$1°${NBSP}`);
}

function deepMap<T>(value: T, fn: (s: string) => string): T {
  if (typeof value === 'string') return fn(value) as T;
  if (Array.isArray(value)) return value.map((v) => deepMap(v, fn)) as T;
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, deepMap(v, fn)])) as T;
  }
  return value;
}

const strings: Record<Locale, Strings> = { en, fr: deepMap(fr, frTypo) };

/** The texts of the site in one language. */
export const t = (locale: Locale): Strings => strings[locale];

/** Applies the language's typography to data that does not live in the i18n files (game copy). */
export const typo = <T>(locale: Locale, value: T): T => (locale === 'fr' ? deepMap(value, frTypo) : value);

export const otherLocale = (locale: Locale): Locale => (locale === 'en' ? 'fr' : 'en');

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Internal link or public file: adds the base path (empty in production). */
export const href = (path: string): string => base + path;

/** Absolute URL of an internal path, for canonical, hreflang and sharing tags. */
export const absolute = (path: string, site: URL | undefined): string =>
  new URL(base + path, site ?? 'https://oddlyofficialgames.com').toString();

export const fill = (template: string, values: Record<string, string>): string =>
  template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? `{${key}}`);

export const formatDate = (iso: string, locale: Locale): string =>
  new Intl.DateTimeFormat(locale === 'fr' ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(iso + 'T00:00:00Z'),
  );
