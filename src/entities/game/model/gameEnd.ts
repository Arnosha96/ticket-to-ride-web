import type { Game } from "./types"

export function checkGameEnd(game: Game): Game {
  const isAnyPlayerLowTrains = game.players.some(
    (p) => p.trains <= 2
  )

  if (isAnyPlayerLowTrains) {
    return { ...game, status: "finished" }
  }

  return game
}