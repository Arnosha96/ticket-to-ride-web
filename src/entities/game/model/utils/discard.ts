import type { Game } from "../types";
import { shuffle } from "./shuffle";

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