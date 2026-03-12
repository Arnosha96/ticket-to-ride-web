import type { Route, CityId, PlayerId } from "../types"

export function isConnected(
  routes: Route[],
  playerId: PlayerId,
  from: CityId,
  to: CityId
): boolean {

  const playerRoutes = routes.filter(
    (r) => r.ownerId === playerId
  )

  const graph = new Map<CityId, CityId[]>()

  for (const route of playerRoutes) {
    if (!graph.has(route.cityA)) graph.set(route.cityA, [])
    if (!graph.has(route.cityB)) graph.set(route.cityB, [])

    graph.get(route.cityA)!.push(route.cityB)
    graph.get(route.cityB)!.push(route.cityA)
  }

  const visited = new Set<CityId>()
  const stack = [from]

  while (stack.length) {
    const city = stack.pop()!

    if (city === to) return true

    if (visited.has(city)) continue

    visited.add(city)

    const neighbors = graph.get(city) || []

    stack.push(...neighbors)
  }

  return false
}