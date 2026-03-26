import type { Route } from "../game/model/types";

export const europeRoutes: Route[] = [
  {
    id: "paris-berlin-a", // теперь у Париж-Берлин будет два маршрута
    cityA: "paris",
    cityB: "berlin",
    length: 4,
    color: "red",
    parallelGroupId: "paris-berlin-double",
  },
  {
    id: "paris-berlin-b",
    cityA: "paris",
    cityB: "berlin",
    length: 4,
    color: "blue", // другой цвет
    parallelGroupId: "paris-berlin-double",
  },
  {
    id: "paris-madrid-a",
    cityA: "paris",
    cityB: "madrid",
    length: 3,
    color: "green",
    parallelGroupId: "paris-madrid-double",
  },
  {
    id: "paris-madrid-b",
    cityA: "paris",
    cityB: "madrid",
    length: 3,
    color: "yellow",
    parallelGroupId: "paris-madrid-double",
  },
  {
    id: "berlin-warsaw",
    cityA: "berlin",
    cityB: "warsaw",
    length: 3,
    color: "yellow",
  },
  {
    id: "madrid-rome",
    cityA: "madrid",
    cityB: "rome",
    length: 5,
    color: "green",
  },
];
