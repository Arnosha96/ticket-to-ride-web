import type { Game, Route, RouteId } from "../types"

export function getRoute(game: Game, routeId: RouteId): Route | undefined {
  return game.routes.find(route => route.id === routeId)
}