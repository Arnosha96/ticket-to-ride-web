import type { Route, PlayerId, CityId } from "../types";

export function getLongestChainLength(routes: Route[], playerId: PlayerId): number {
  const playerRoutes = routes.filter(r => r.ownerId === playerId);
  if (playerRoutes.length === 0) return 0;

  const graph = new Map<CityId, Map<CityId, number>>();
  for (const route of playerRoutes) {
    if (!graph.has(route.cityA)) graph.set(route.cityA, new Map());
    if (!graph.has(route.cityB)) graph.set(route.cityB, new Map());
    graph.get(route.cityA)!.set(route.cityB, route.length);
    graph.get(route.cityB)!.set(route.cityA, route.length);
  }

  let maxLength = 0;

  // DFS 
  for (const start of graph.keys()) {
    const visitedEdges = new Set<string>();
    const dfs = (city: CityId, currentLength: number) => {
      maxLength = Math.max(maxLength, currentLength);
      for (const [neighbor, length] of graph.get(city)!.entries()) {
        const edgeKey = `${city}:${neighbor}`;
        const revKey = `${neighbor}:${city}`;
        if (!visitedEdges.has(edgeKey) && !visitedEdges.has(revKey)) {
          visitedEdges.add(edgeKey);
          visitedEdges.add(revKey);
          dfs(neighbor, currentLength + length);
          visitedEdges.delete(edgeKey);
          visitedEdges.delete(revKey);
        }
      }
    };
    dfs(start, 0);
  }

  return maxLength;
}