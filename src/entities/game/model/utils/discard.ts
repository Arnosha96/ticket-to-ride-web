import { shuffle } from "../createGame";
import type { Game } from "../types";

export function reshuffleDiscard(game: Game): Game {
  if (game.discardPile.length === 0) {
    return game;
  }
  return {
    ...game,
    deck: shuffle(game.discardPile),
    discardPile: [],
  };
}