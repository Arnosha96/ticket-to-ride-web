import { useState } from "react";
import { cities } from "../entities/game/model/cities";
import { europeRoutes } from "../entities/map/europe";
import {
  getAngle,
  getRouteColor,
  getRouteOffset,
  getRouteSegments,
} from "../utils/geometry";

const RoutesLayer = () => {
  const [hoveredRouteId, setHoveredRouteId] = useState<string | null>(null);
  return (
    <>
      {europeRoutes.map((route) => {
        const cityA = cities[route.cityA];
        const cityB = cities[route.cityB];

        if (!cityA || !cityB) return null;

        const { offsetX, offsetY } = getRouteOffset(route, cityA, cityB);

        const segments = getRouteSegments(cityA, cityB, route.length);

        return (
          <g
            key={route.id}
            onMouseEnter={() => setHoveredRouteId(route.id)}
            onMouseLeave={() => setHoveredRouteId(null)}
            onClick={() => console.log("clicked", route.id)}
            style={{ cursor: "pointer" }}
          >
            <line
              x1={cityA.x + offsetX}
              y1={cityA.y + offsetY}
              x2={cityB.x + offsetX}
              y2={cityB.y + offsetY}
              stroke="transparent"
              strokeWidth={4}
            />
            {segments.map((seg, i) => {
              const w = 5;
              const h = 2;
              const isHovered = hoveredRouteId === route.id;
              return (
                <rect
                  key={i}
                  x={`${seg.x + offsetX - w / 2}`}
                  y={`${seg.y + offsetY - h / 2}`}
                  width={w}
                  height={h}
                  stroke={isHovered ? "white" : "black"}
                  strokeWidth={isHovered ? 0.4 : 0.2}
                  fill={getRouteColor(route)}
                  opacity={isHovered ? 0.6 : 1}
                  transform={`rotate(${getAngle(cityA, cityB)} ${seg.x + offsetX} ${seg.y + offsetY})`}
                  className="cursor-pointer"
                />
              );
            })}
          </g>
        );
      })}
    </>
  );
};

export default RoutesLayer;
