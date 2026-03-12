export type PlayerId = string;
export type RouteId = string;
export type CityId = string;

export type CardColor =
  | "red"
  | "blue"
  | "green"
  | "yellow"
  | "black"
  | "white"
  | "orange"
  | "purple"
  | "locomotive";

export interface Player {
  id: PlayerId
  name: string
  cards: CardColor[]
  score: number
  trains: number
  tickets: Ticket[]
}

export interface Route {
  id: RouteId;
  cityA: CityId;
  cityB: CityId;
  length: number;
  color: CardColor | "gray";
  ownerId?: PlayerId;
}

export type GameStatus = "waiting" | "playing" | "finished";

export interface Game {
  id: string
  players: Player[]
  routes: Route[]
  deck: CardColor[]
  discardPile: CardColor[]
  ticketDeck: Ticket[]
  faceUpCards: CardColor[]
  currentPlayerIndex: number
  status: GameStatus
  turn: TurnState
}

export interface TurnState {
  phase: "draw" | "claim";
  cardsDrawn: number;
}

export type GameResult =
  | { ok: true; game: Game }
  | { ok: false; error: string };

export interface Ticket {
  id: string;
  from: CityId;
  to: CityId;
  points: number;
}
