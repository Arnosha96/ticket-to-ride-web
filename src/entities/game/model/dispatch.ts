import type { Game, GameResult } from "./types"
import type { GameAction } from "./actions"
import { drawCard } from "./drawCard"

export function dispatch(game: Game, action: GameAction) {
  switch (action.type) {
    case "DRAW_CARD":
      return handleDrawCard(game)

    case "END_TURN":
      return handleEndTurn(game)

    default:
      return { ok: false, error: "Unknown action" }
  }
}

function handleDrawCard(game: Game): GameResult {
  if (game.status !== "playing") {
    return { ok: false, error: "Game is not active" }
  }

  if (game.deck.length === 0) {
    return { ok: false, error: "Deck is empty" }
  }

  if (game.turn.cardsDrawn >= 2) {
    return { ok: false, error: "Already drew 2 cards this turn" }
  }

  const updatedGame = drawCard(game)

  return { ok: true, game: updatedGame }
}

function handleEndTurn(game: Game): GameResult {
  const nextPlayerIndex =
    (game.currentPlayerIndex + 1) % game.players.length

  const updatedGame: Game = {
    ...game,
    currentPlayerIndex: nextPlayerIndex,
    turn: { cardsDrawn: 0 },
  }

  return { ok: true, game: updatedGame }
}