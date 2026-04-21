import type { Route } from "../entities/game/model/types";
import { type City } from "../entities/map/europe/cities";

export function getRouteColor(route: Route) {
  return route.ownerId ? "black" : route.color;
}

export function getParallelOffset(
  cityA: City,
  cityB: City,
  parallelIndex: number,
): { offsetX: number; offsetY: number } {
  const dx = cityB.x - cityA.x;
  const dy = cityB.y - cityA.y;
  const len = Math.hypot(dx, dy);
  if (len === 0) return { offsetX: 0, offsetY: 0 };
  const perpX = -dy / len;
  const perpY = dx / len;
  const offsetMagnitude = 1.0;
  const sign = parallelIndex === 0 ? -1 : 1;
  return {
    offsetX: perpX * offsetMagnitude * sign,
    offsetY: perpY * offsetMagnitude * sign,
  };
}

export function getStraightRouteSegments(
  cityA: City,
  cityB: City,
  numSegments: number,
  inset: number = 1.2,
): Array<{ x: number; y: number; angle: number }> {
  const dx = cityB.x - cityA.x;
  const dy = cityB.y - cityA.y;
  const totalLen = Math.hypot(dx, dy);
  if (totalLen === 0) return [];

  const ux = dx / totalLen;
  const uy = dy / totalLen;

  const startX = cityA.x + ux * inset;
  const startY = cityA.y + uy * inset;

  const segmentLen = totalLen - 2 * inset;
  if (segmentLen <= 0) return [];

  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  const points = [];
  for (let i = 1; i <= numSegments; i++) {
    const t = i / (numSegments + 1); 
    const x = startX + ux * (t * segmentLen);
    const y = startY + uy * (t * segmentLen);
    points.push({ x, y, angle });
  }
  return points;
}
