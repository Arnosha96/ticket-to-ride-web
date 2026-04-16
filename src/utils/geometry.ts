import type { Route } from "../entities/game/model/types";
import { cities, type City } from "../entities/map/europe/cities";
import { europeRoutes } from "../entities/map/europe/routes";

export function getRouteColor(route: Route) {
  return route.ownerId ? "black" : route.color;
}

export function getBezierPoint(t: number, A, C, B) {
  const x = (1 - t) * (1 - t) * A.x + 2 * (1 - t) * t * C.x + t * t * B.x;

  const y = (1 - t) * (1 - t) * A.y + 2 * (1 - t) * t * C.y + t * t * B.y;

  return { x, y };
}

export function getBezierTangent(t: number, A, C, B) {
  const dx = 2 * (1 - t) * (C.x - A.x) + 2 * t * (B.x - C.x);

  const dy = 2 * (1 - t) * (C.y - A.y) + 2 * t * (B.y - C.y);

  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

  return angle;
}

export function getCurvePoints(
  cityA: City,
  cityB: City,
  route: Route,
  allRoutes: Route[]
) {
  const dx = cityB.x - cityA.x;
  const dy = cityB.y - cityA.y;

  const length = Math.sqrt(dx * dx + dy * dy);
  if (length === 0) return null;

  const nx = -dy / length;
  const ny = dx / length;

  const { index: pIndex, total: pTotal } = getParallelData(route, allRoutes);

  if (pTotal > 1) {
    const centered = pIndex - (pTotal - 1) / 2;

    const PARALLEL_OFFSET = 2.5;

    const cx =
      (cityA.x + cityB.x) / 2 + nx * centered * PARALLEL_OFFSET;
    const cy =
      (cityA.y + cityB.y) / 2 + ny * centered * PARALLEL_OFFSET;

    return {
      A: { x: cityA.x, y: cityA.y },
      B: { x: cityB.x, y: cityB.y },
      C: { x: cx, y: cy },
    };
  }

  const getRoutesFromCity = (cityId: string) =>
    allRoutes.filter(
      (r) => r.cityA === cityId || r.cityB === cityId
    );

  const routesFromA = getRoutesFromCity(route.cityA);

  const withAngles = routesFromA.map((r) => {
    const otherCity =
      r.cityA === route.cityA ? r.cityB : r.cityA;

    return {
      route: r,
      angle: Math.atan2(
        (cities[otherCity].y - cityA.y),
        (cities[otherCity].x - cityA.x)
      ),
    };
  });

  withAngles.sort((a, b) => a.angle - b.angle);

  const index = withAngles.findIndex(
    (r) => r.route.id === route.id
  );

  const total = withAngles.length;

  if (total <= 2) {
    return {
      A: { x: cityA.x, y: cityA.y },
      B: { x: cityB.x, y: cityB.y },
      C: {
        x: (cityA.x + cityB.x) / 2,
        y: (cityA.y + cityB.y) / 2,
      },
    };
  }

  const centered = index - (total - 1) / 2;

  const CURVE_STEP = 1.2;

  const curveAmount = centered * CURVE_STEP;

  const cx =
    (cityA.x + cityB.x) / 2 + nx * curveAmount;
  const cy =
    (cityA.y + cityB.y) / 2 + ny * curveAmount;

  return {
    A: { x: cityA.x, y: cityA.y },
    B: { x: cityB.x, y: cityB.y },
    C: { x: cx, y: cy },
  };
}

export function getRouteSegmentsCurved(
  cityA: City,
  cityB: City,
  route: Route,
  segmentsCount: number,
) {
  const curve = getCurvePoints(cityA, cityB, route, europeRoutes);
  if (!curve) return [];

  const segments = [];

  for (let i = 0; i < segmentsCount; i++) {
    const t = (i + 0.5) / segmentsCount;

    const point = getBezierPoint(t, curve.A, curve.C, curve.B);

    segments.push({ ...point, t });
  }

  return segments;
}

function getParallelData(route: Route, allRoutes: Route[]) {
  const parallels = allRoutes.filter(
    (r) =>
      (r.cityA === route.cityA && r.cityB === route.cityB) ||
      (r.cityA === route.cityB && r.cityB === route.cityA)
  );

  const index = parallels.findIndex((r) => r.id === route.id);

  return {
    index,
    total: parallels.length,
  };
}
