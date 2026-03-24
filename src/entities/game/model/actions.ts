import type { CardColor, RouteId } from "./types"

export type GameAction =
  | { type: "DRAW_CARD"; source: "deck" }
  | { type: "DRAW_CARD"; source: "faceUp"; index: number }
  | { type: "CLAIM_ROUTE"; routeId: RouteId; cards: CardColor[] }
  | { type: "DRAW_TICKETS" } 
  | { type: "CONFIRM_TICKETS"; selectedIds: string[] } 
  | { type: "END_TURN" }