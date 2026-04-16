import { useState } from "react";
import { cities } from "../entities/map/europe/cities";
import { europeRoutes } from "../entities/map/europe/routes";
import {
  getBezierTangent,
  getCurvePoints,
  getRouteColor,
  getRouteSegmentsCurved,
} from "../utils/geometry";

const RoutesLayer = () => {
  const [hoveredRouteId, setHoveredRouteId] = useState<string | null>(null);

  return (
    <>
      {europeRoutes.map((route) => {
        const cityA = cities[route.cityA];
        const cityB = cities[route.cityB];

        if (!cityA || !cityB) return null;

        const segments = getRouteSegmentsCurved(
          cityA,
          cityB,
          route,
          route.length,
        );

        const curve = getCurvePoints(cityA, cityB, route, europeRoutes);
        if (!curve) return null;

        const pathD = `M ${curve.A.x} ${curve.A.y} Q ${curve.C.x} ${curve.C.y} ${curve.B.x} ${curve.B.y}`;

        const isHovered = hoveredRouteId === route.id;

        return (
          <g
            key={route.id}
            onMouseEnter={() => setHoveredRouteId(route.id)}
            onMouseLeave={() => setHoveredRouteId(null)}
            onClick={() => console.log("clicked", route.id)}
            style={{ cursor: "pointer" }}
          >
            <path d={pathD} fill="none" stroke="transparent" strokeWidth={8} />

            {segments.map((seg, i) => {
              const angle = getBezierTangent(seg.t, curve.A, curve.C, curve.B);

              return (
                <rect
                  key={i}
                  x={seg.x - 2.5}
                  y={seg.y - 1}
                  width={4}
                  height={1.75}
                  fill={getRouteColor(route)}
                  transform={`rotate(${angle} ${seg.x} ${seg.y})`}
                  opacity={isHovered ? 0.7 : 1}
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
