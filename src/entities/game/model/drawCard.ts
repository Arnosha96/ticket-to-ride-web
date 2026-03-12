import type { Game } from "./types";

export function drawCardFromDeck(game: Game): Game {
  const playerIndex = game.currentPlayerIndex;
  const drawnCard = game.deck[0];

  const updatedPlayers = game.players.map((p, i) =>
    i === playerIndex ? { ...p, cards: [...p.cards, drawnCard] } : p,
  );

  return {
    ...game,
    players: updatedPlayers,
    deck: game.deck.slice(1),
    turn: {
      ...game.turn,
      cardsDrawn: game.turn.cardsDrawn + 1,
    },
  };
}

export function drawCardFromFaceUp(game: Game, index: number): Game {
  if (index < 0 || index >= game.faceUpCards.length) {
    return game;
  }
  const playerIndex = game.currentPlayerIndex;
  const card = game.faceUpCards[index];

  const updatedPlayers = game.players.map((p, i) =>
    i === playerIndex ? { ...p, cards: [...p.cards, card] } : p,
  );

  const newFaceUpCards = [...game.faceUpCards];

  const replacement = game.deck[0];

  newFaceUpCards[index] = replacement;

  return {
    ...game,
    players: updatedPlayers,
    faceUpCards: newFaceUpCards,
    deck: game.deck.slice(1),
    turn: {
      ...game.turn,
      cardsDrawn: card === "locomotive" ? 2 : game.turn.cardsDrawn + 1,
    },
  };
}
