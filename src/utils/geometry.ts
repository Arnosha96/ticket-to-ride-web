import type { City } from "../entities/game/model/cities";
import type { Route } from "../entities/game/model/types";

export function getRouteColor(route: Route) {
  if (route.ownerId) {
    return "black";
  }
  return route.color;
}

export function getRouteOffset(route: Route, cityA: City, cityB: City) {
  const OFFSET = 1.4;

  if (!route.parallelGroupId) return { offsetX: 0, offsetY: 0 };

  const dx = cityB.x - cityA.x;
  const dy = cityB.y - cityA.y;
  const length = Math.sqrt(dx * dx + dy * dy);

  if (length === 0) return { offsetX: 0, offsetY: 0 };

  const nx = -dy / length;
  const ny = dx / length;
  const index = route.id.endsWith("a") ? -1 : route.id.endsWith("b") ? 1 : 0;

  return {
    offsetX: nx * OFFSET * index,
    offsetY: ny * OFFSET * index,
  };
}

export function getRouteSegments(
  cityA: City,
  cityB: City,
  segmentsCount: number,
) {
  const segments = [];

  const dx = cityB.x - cityA.x;
  const dy = cityB.y - cityA.y;

  const length = Math.sqrt(dx * dx + dy * dy);
  if (length === 0) return segments;

  const nx = dx / length;
  const ny = dy / length;

  const cityRadius = 1;
  const extraGap = 0.3;

  const startX = cityA.x + nx * (cityRadius + extraGap);
  const startY = cityA.y + ny * (cityRadius + extraGap);

  const endX = cityB.x - nx * (cityRadius + extraGap);
  const endY = cityB.y - ny * (cityRadius + extraGap);

  const newDx = endX - startX;
  const newDy = endY - startY;

  const padding = 0.05;

  for (let i = 0; i < segmentsCount; i++) {
    const t =
      padding +
      ((i + 0.5) / segmentsCount) * (1 - 2 * padding);

    const x = startX + newDx * t;
    const y = startY + newDy * t;

    segments.push({ x, y });
  }

  return segments;
} 

export function getAngle(cityA: City, cityB: City) {
  const dx = cityB.x - cityA.x;
  const dy = cityB.y - cityA.y;

  return (Math.atan2(dy, dx) * 180) / Math.PI;
}
