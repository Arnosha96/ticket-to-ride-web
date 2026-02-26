import type { Game } from "./types"


export function drawCard(game: Game): Game {
  if (game.status !== "playing") return game
  if (game.deck.length === 0) return game

  // нельзя взять больше 2 карт
  if (game.turn.cardsDrawn >= 2) return game

  const drawnCard = game.deck[0]
  const currentIndex = game.currentPlayerIndex


  const updatedPlayers = game.players.map((player, index) => {
    if (index !== currentIndex) return player

    return {
      ...player,
      cards: [...player.cards, drawnCard],
    }
  })

  const newCardsDrawn = game.turn.cardsDrawn + 1

  const shouldEndTurn = newCardsDrawn >= 2

  const nextPlayerIndex = shouldEndTurn
    ? (currentIndex + 1) % game.players.length
    : currentIndex

  return {
    ...game,
    players: updatedPlayers,
    deck: game.deck.slice(1),
    currentPlayerIndex: nextPlayerIndex,
    turn: {
      cardsDrawn: shouldEndTurn ? 0 : newCardsDrawn,
    },
  }
}