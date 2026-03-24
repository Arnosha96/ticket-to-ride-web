import type { CardColor, Game } from "./types";
import { reshuffleDiscard } from "./utils/discard"; 
import { shuffle } from "./utils/shuffle";

export function refreshFaceUpIfNeeded(game: Game): Game {
  const locomotiveCount = game.faceUpCards.filter(c => c === "locomotive").length;
  if (locomotiveCount < 3) return game;

  let newDiscard = [...game.discardPile, ...game.faceUpCards];
  let newDeck = [...game.deck];
  const newFaceUp: CardColor[] = [];

  for (let i = 0; i < 5; i++) {
    if (newDeck.length === 0) {
      if (newDiscard.length === 0) break; 
      newDeck = shuffle(newDiscard);
      newDiscard = [];
    }
    newFaceUp.push(newDeck[0]);
    newDeck = newDeck.slice(1);
  }

  const updated = {
    ...game,
    deck: newDeck,
    discardPile: newDiscard,
    faceUpCards: newFaceUp,
  };
  return refreshFaceUpIfNeeded(updated);
}

export function drawCardFromFaceUp(game: Game, index: number): Game {
  if (index < 0 || index >= game.faceUpCards.length) {
    return game;
  }
  const playerIndex = game.currentPlayerIndex;
  const card = game.faceUpCards[index];
  const isLocomotive = card === "locomotive";
const newCardsDrawn = isLocomotive ? 2 : game.turn.cardsDrawn + 1;

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
    cardsDrawn: newCardsDrawn,
    phase: newCardsDrawn >= 2 ? "claim" : updatedGame.turn.phase,
  },
}
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
