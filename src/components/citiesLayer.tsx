import { cities } from "../entities/map/europe/cities";

export const CitiesLayer = () => {
  return (
    <>
      {Object.values(cities).map((city) => (
        <>
          <circle
            key={city.id}
            cx={city.x}
            cy={city.y}
            r={12}
            fill="white"
            stroke="black"
            strokeWidth={2}
            className="cursor-pointer hover:fill-yellow-300"
          />
          <text x={city.x} y={city.y + 30} fontSize="25" textAnchor="middle">
            {city.name}
          </text>
        </>
      ))}
    </>
  );
};
