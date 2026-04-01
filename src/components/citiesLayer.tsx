import { cities } from "../entities/game/model/cities";

export const CitiesLayer = () => {
  return (
    <>
      {Object.values(cities).map((city) => (
        <>
          <circle
            key={city.id}
            cx={city.x}
            cy={city.y}
            r={1}
            fill='white'
            stroke="black"
            strokeWidth={0.3}
            className="cursor-pointer hover:fill-yellow-300"
          />
          <text
            x={city.x}
            y={city.y + 3}
            fontSize="2"
            textAnchor="middle"
          >
            {city.name}
          </text>
        </>
      ))}
    </>
  );
};
