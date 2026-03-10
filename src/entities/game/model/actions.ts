import type { CardColor, RouteId } from "./types"

export type GameAction =
  | { type: "DRAW_CARD" }
  | { type: "END_TURN" }
  | {
      type: "CLAIM_ROUTE"
      routeId: RouteId
      cards: CardColor[]
    }