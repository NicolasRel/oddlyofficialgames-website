import type { ImageMetadata } from 'astro';

export type Locale = 'en' | 'fr';
export type Localized<T = string> = Record<Locale, T>;

/** Publication status. The label shown for each value is in src/i18n (status.*). */
export type GameStatus = 'in-development' | 'coming-soon' | 'released';

export interface Screenshot {
  image: ImageMetadata;
  alt: Localized;
  /** File offered in the press kit (path under public/). */
  download: string;
}

export interface GameCopy {
  /** <title> and meta description of the game page. */
  metaTitle: string;
  metaDescription: string;
  /** One line under the title in lists and cards. */
  genreLine: string;
  /** Small reference line above the title. */
  kicker: string;
  /** The hero slogan, one string per line. */
  promise: string[];
  /** Hero paragraph. */
  pitch: string;
  /** Two sentences for the home page and the catalogue. */
  cardPitch: string;
  /** Sentence next to the status stamp. */
  statusNote: string;
  /** Optional pull quote (a motto, a line from the game). */
  quote?: { source: string; text: string };
  portrait: { title: string; label: string; alt: string };
  stepsTitle: string;
  steps: { title: string; text: string }[];
  featuresTitle: string;
  features: { title: string; text: string }[];
  galleryNote: string;
  facts: { label: string; value: string }[];
  /** Press kit: one paragraph, then the long version. */
  pressShort: string;
  pressLong: string[];
  supportText: string;
  privacyText: string;
}

export interface Game {
  /** Stable identifier, also the URL slug: /games/<id>/ and /fr/jeux/<id>/. */
  id: string;
  /** Register number shown on the site, e.g. "001". */
  number: string;
  title: string;
  status: GameStatus;
  /** Confirmed platforms only. */
  platforms: string[];
  /** Public store pages. Leave null until the page is live: the site then shows "not listed yet". */
  stores: { appStore: string | null; googlePlay: string | null };
  /** Trailer approved for release, or null. Use a YouTube id, or a file under public/. */
  trailer: null | { youtubeId?: string; file?: string; poster?: string };
  /** The game's official privacy policy (external page). */
  privacyUrl: string;
  supportEmail: string;
  keyArt: ImageMetadata;
  /** Key art offered in the press kit (path under public/). */
  keyArtDownload: string;
  /** Sharing image per language (path under public/og). */
  ogImage: Localized;
  screenshots: Screenshot[];
  copy: Localized<GameCopy>;
}
