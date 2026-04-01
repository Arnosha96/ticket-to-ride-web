export type CityId = string;

export type City = {
  id: CityId;
  name: string;
  x: number;
  y: number;
};

export const cities: Record<CityId, City> = {
  paris: { id: "paris", name: "Paris", x: 35, y: 55 },
  berlin: { id: "berlin", name: "Berlin", x: 55, y: 40 },
  rome: { id: "rome", name: "Rome", x: 52, y: 70 },
};
