import { cities } from "../entities/game/model/cities";
import { europeRoutes } from "../entities/map/europe";
import {
  getAngle,
  getRouteColor,
  getRouteOffset,
  getRouteSegments,
} from "../utils/geometry";

const RoutesLayer = () => {
  return (
    <>
      {europeRoutes.map((route) => {
        const cityA = cities[route.cityA];
        const cityB = cities[route.cityB];

        if (!cityA || !cityB) return null;

        const { offsetX, offsetY } = getRouteOffset(route, cityA, cityB);

        const segments = getRouteSegments(cityA, cityB, route.length);

        return (
          <g key={route.id}>
            {segments.map((seg, i) => {
              const w = 5
              const h = 2
              return (
              <rect
                key={i}
                x={`${seg.x + offsetX - w / 2}`}
                y={`${seg.y + offsetY - h / 2}`}
                width={w}
                height={h}
                stroke="black"
                strokeWidth={0.2}
                fill={getRouteColor(route)}
                transform={`rotate(${getAngle(cityA, cityB)} ${seg.x + offsetX} ${seg.y + offsetY})`}
                className="cursor-pointer hover:opacity-70"
              />
            )})}
          </g>
        );
      })}
    </>
  );
};

export default RoutesLayer;
