import type { Game } from './types';
import { conepocalypse } from './conepocalypse';

// The catalogue, in register order. To add a game: create its file next to this one
// (copy conepocalypse.ts), add its images, then add it to this list. See README, "Adding a game".
export const games: Game[] = [conepocalypse];

export const getGame = (id: string) => games.find((g) => g.id === id);

export type { Game, GameCopy, Locale, GameStatus } from './types';
