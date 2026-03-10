import type { CardColor, Game, Player } from "./types";

function createDeck(): CardColor[] {
  const colors: CardColor[] = [
    "red",
    "blue",
    "green",
    "yellow",
    "black",
    "white",
    "orange",
    "purple",
  ];

  const deck: CardColor[] = [];

  for (const color of colors) {
    for (let i = 0; i < 12; i++) {
      deck.push(color);
    }
  }

  for (let i = 0; i < 14; i++) {
    deck.push("locomotive");
  }

  return shuffle(deck);
}

function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

export function createGame(playerNames: string[]): Game {
  const players: Player[] = playerNames.map((name) => ({
    id: crypto.randomUUID(),
    name,
    cards: [],
    score: 0,
  }));

  return {
    id: crypto.randomUUID(),
    players,
    routes: [
      {
        id: "route1",
        cityA: "paris",
        cityB: "berlin",
        length: 3,
        color: "red",
      },
    ],
    deck: createDeck(),
    discardPile: [],
    currentPlayerIndex: 0,
    status: "playing",
    turn: { phase: "draw", cardsDrawn: 0 },
  };
}
