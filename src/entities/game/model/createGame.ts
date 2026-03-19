import { europeTickets } from "../../map/europeTickets";
import type { CardColor, Game, Player, Route, Ticket } from "./types";

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

function drawFromDeck(deck: CardColor[]): {
  card: CardColor;
  deck: CardColor[];
} {
  return {
    card: deck[0],
    deck: deck.slice(1),
  };
}

export function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function drawTickets(deck: Ticket[], count: number) {
  return {
    tickets: deck.slice(0, count),
    deck: deck.slice(count),
  };
}

export function createGame(playerNames: string[], routes: Route[]): Game {
  let ticketDeck = shuffle(europeTickets);
  let deck = createDeck();

  const players: Player[] = playerNames.map((name) => {
    const draw = drawTickets(ticketDeck, 3);
    const cards: CardColor[] = [];
    for (let i = 0; i < 4; i++) {
      const draw = drawFromDeck(deck);
      cards.push(draw.card);
      deck = draw.deck;
    }

    ticketDeck = draw.deck;

    return {
      id: crypto.randomUUID(),
      name,
      cards: cards,
      score: 0,
      trains: 45,
      tickets: draw.tickets,
    };
  });

  const faceUpCards: CardColor[] = [];

  for (let i = 0; i < 5; i++) {
    const draw = drawFromDeck(deck);
    faceUpCards.push(draw.card);
    deck = draw.deck;
  }

  return {
    id: crypto.randomUUID(),
    players,
    routes,
    deck,
    discardPile: [],
    ticketDeck,
    faceUpCards,
    currentPlayerIndex: 0,
    status: "playing",
    turn: { phase: "draw", cardsDrawn: 0 },
  };
}
