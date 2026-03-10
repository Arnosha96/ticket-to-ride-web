import type { Game } from "./types"

export function checkGameEnd(game: Game): Game {
  const isAnyPlayerLowCards = game.players.some(p => p.cards.length <= 2)
  const isDeckEmpty = game.deck.length === 0

  if (isAnyPlayerLowCards || isDeckEmpty) {
    return { ...game, status: "finished" }
  }

  return game
}