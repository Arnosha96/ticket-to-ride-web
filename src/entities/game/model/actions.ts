import type { CardColor, RouteId } from "./types"

export type GameAction =
  | { type: "DRAW_CARD"; source: "deck" }
  | { type: "DRAW_CARD"; source: "faceUp"; index: number }
  | { type: "CLAIM_ROUTE"; routeId: RouteId; cards: CardColor[] }
  | { type: "END_TURN" }