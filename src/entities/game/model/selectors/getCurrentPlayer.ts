import type { Game, Player } from "../types"

export function getCurrentPlayer(game: Game): Player {
  return game.players[game.currentPlayerIndex]
}