import type { Game } from "./types"

export function drawCard(game: Game): Game {
  const playerIndex = game.currentPlayerIndex
  const drawnCard = game.deck[0]

  const updatedPlayers = game.players.map((p, i) =>
    i === playerIndex
      ? { ...p, cards: [...p.cards, drawnCard] }
      : p
  )

  return {
    ...game,
    players: updatedPlayers,
    deck: game.deck.slice(1),
    turn: {
      phase: game.turn.phase,
      cardsDrawn: game.turn.cardsDrawn + 1,
    },
  }
}