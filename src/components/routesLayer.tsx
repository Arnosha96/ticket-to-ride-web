import { useState } from "react";
import type { Route } from "../entities/game/model/types";
import { cities } from "../entities/map/europe/cities";
import { europeRoutes } from "../entities/map/europe/routes";
import {
  getParallelOffset,
  getRouteColor,
  getStraightRouteSegments,
} from "../utils/geometry";

const RoutesLayer = () => {
  const [hoveredRouteId, setHoveredRouteId] = useState<string | null>(null);

  const doubleRoutes = new Map<string, Route[]>();
  europeRoutes.forEach((route) => {
    if (route.parallelGroupId) {
      if (!doubleRoutes.has(route.parallelGroupId))
        doubleRoutes.set(route.parallelGroupId, []);
      doubleRoutes.get(route.parallelGroupId)!.push(route);
    }
  });
  doubleRoutes.forEach((group) => {
    group.sort((a, b) => a.id.localeCompare(b.id));
  });

  const handleRouteClick = (event: React.MouseEvent, routeId: string) => {
    const svg = event.currentTarget.closest("svg");
    if (!svg) return;
    const point = svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    const ctm = svg.getScreenCTM();
    if (ctm) {
      const svgPoint = point.matrixTransform(ctm.inverse());
      console.log(
        `Clicked route: ${routeId} at (${svgPoint.x.toFixed(2)}, ${svgPoint.y.toFixed(2)})`,
      );
    }
  };

  return (
    <>
      {europeRoutes.map((route) => {
        const cityA = cities[route.cityA];
        const cityB = cities[route.cityB];

        if (!cityA || !cityB) return null;

        let segments: Array<{ x: number; y: number; angle: number }> = [];
        if (route.segments && route.segments.length === route.length) {
          segments = route.segments;
        } else {
          let offset = { offsetX: 0, offsetY: 0 };
          if (route.parallelGroupId) {
            const group = doubleRoutes.get(route.parallelGroupId);
            if (group) {
              const idx = group.findIndex((r) => r.id === route.id);
              if (idx !== -1) {
                offset = getParallelOffset(cityA, cityB, idx);
              }
            }
          }
          const cityAOffset = {
            id: cityA.id,
            name: cityA.name,
            x: cityA.x + offset.offsetX,
            y: cityA.y + offset.offsetY,
          };
          const cityBOffset = {
            id: cityB.id,
            name: cityB.name,
            x: cityB.x + offset.offsetX,
            y: cityB.y + offset.offsetY,
          };
          segments = getStraightRouteSegments(
            cityAOffset,
            cityBOffset,
            route.length,
            1.2,
          );
        }

        if (segments.length === 0) return null;

        const isHovered = hoveredRouteId === route.id;

        let clickLine = null;
        if (!(route.segments && route.segments.length === route.length)) {
          const first = segments[0];
          const last = segments[segments.length - 1];
          clickLine = (
            <line
              x1={first.x}
              y1={first.y}
              x2={last.x}
              y2={last.y}
              stroke="transparent"
              strokeWidth={8}
            />
          );
        } else {
          const first = segments[0];
          const last = segments[segments.length - 1];
          clickLine = (
            <line
              x1={first.x}
              y1={first.y}
              x2={last.x}
              y2={last.y}
              stroke="transparent"
              strokeWidth={8}
            />
          );
        }

        return (
          <g
            key={route.id}
            onMouseEnter={() => setHoveredRouteId(route.id)}
            onMouseLeave={() => setHoveredRouteId(null)}
            onClick={(e) => handleRouteClick(e, route.id)}
            style={{ cursor: "pointer" }}
          >
            {clickLine}

            {segments.map((seg, i) => (
              <rect
                key={i}
                x={seg.x - 2.5}
                y={seg.y - 1}
                width={4}
                height={1.75}
                fill={getRouteColor(route)}
                transform={`rotate(${seg.angle} ${seg.x} ${seg.y})`}
                opacity={isHovered ? 0.7 : 1}
              />
            ))}
          </g>
        );
      })}
    </>
  );
};

export default RoutesLayer;
