import type { Game } from "./types";
import { reshuffleDiscard } from "./utils/discard"; 

export function drawCardFromFaceUp(game: Game, index: number): Game {
  if (index < 0 || index >= game.faceUpCards.length) {
    return game;
  }
  const playerIndex = game.currentPlayerIndex;
  const card = game.faceUpCards[index];

  const updatedPlayers = game.players.map((p, i) =>
    i === playerIndex ? { ...p, cards: [...p.cards, card] } : p,
  );

  let updatedGame = { ...game, players: updatedPlayers };
  if (updatedGame.deck.length === 0) {
    updatedGame = reshuffleDiscard(updatedGame);
  }

  const replacement = updatedGame.deck[0] ?? null; 
  const newFaceUpCards = [...updatedGame.faceUpCards];

  if (replacement) {
    newFaceUpCards[index] = replacement;
    updatedGame = {
      ...updatedGame,
      faceUpCards: newFaceUpCards,
      deck: updatedGame.deck.slice(1),
    };
  } else {
    newFaceUpCards.splice(index, 1);
    updatedGame = {
      ...updatedGame,
      faceUpCards: newFaceUpCards,
    };
  }

  return {
    ...updatedGame,
    turn: {
      ...updatedGame.turn,
      cardsDrawn: card === "locomotive" ? 2 : updatedGame.turn.cardsDrawn + 1,
    },
  };
}

export function drawCardFromDeck(game: Game): Game {
  let currentGame = game;
  if (currentGame.deck.length === 0) {
    currentGame = reshuffleDiscard(currentGame);
  }
  if (currentGame.deck.length === 0) {
    return game; 
  }

  const playerIndex = currentGame.currentPlayerIndex;
  const drawnCard = currentGame.deck[0];

  const updatedPlayers = currentGame.players.map((p, i) =>
    i === playerIndex ? { ...p, cards: [...p.cards, drawnCard] } : p,
  );

  return {
    ...currentGame,
    players: updatedPlayers,
    deck: currentGame.deck.slice(1),
    turn: {
      ...currentGame.turn,
      cardsDrawn: currentGame.turn.cardsDrawn + 1,
    },
  };
}
