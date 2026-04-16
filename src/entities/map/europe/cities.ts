export type CityId = string;

export type City = {
  id: CityId;
  name: string;
  x: number;
  y: number;
};

export const cities: Record<CityId, City> = {
  amsterdam: { id: "amsterdam", name: "Amsterdam", x: 21, y: 26.5 },
  angora: { id: "angora", name: "Angora", x: 110, y: 69 },
  athina: { id: "athina", name: "Athina", x: 79, y: 70 },
  barcelona: { id: "barcelona", name: "Barcelona", x: 0, y: 67 },
  berlin: { id: "berlin", name: "Berlin", x: 50, y: 32 },
  brest: { id: "brest", name: "Brest", x: -13, y: 38 },
  brindisi: { id: "brindisi", name: "Brindisi", x: 60.5, y: 63 },
  bruxelles: { id: "bruxelles", name: "Bruxelles", x: 17, y: 33 },
  budapest: { id: "budapest", name: "Budapest", x: 64, y: 44 },
  bucuresti: { id: "bucuresti", name: "Bucuresti", x: 87, y: 50.5 },
  cadiz: { id: "cadiz", name: "Cadiz", x: -19, y: 74 },
  constantinople: {
    id: "constantinople",
    name: "Constantinople",
    x: 98,
    y: 63,
  },
  danzig: { id: "danzig", name: "Danzig", x: 63, y: 23 },
  dieppe: { id: "dieppe", name: "Dieppe", x: 1, y: 36.5 },
  edinburgh: { id: "edinburgh", name: "Edinburgh", x: -2, y: 14 },
  erzurum: { id: "erzurum", name: "Erzurum", x: 122, y: 65 },
  essen: { id: "essen", name: "Essen", x: 32, y: 28 },
  frankfurt: { id: "frankfurt", name: "Frankfurt", x: 29, y: 35 },
  kharkiv: { id: "kharkiv", name: "Kharkiv", x: 117, y: 37 },
  kobenhavn: { id: "kobenhavn", name: "Kobenhavn", x: 44, y: 18 },
  kyiv: { id: "kyiv", name: "Kyiv", x: 94, y: 35 },
  lisboa: { id: "lisboa", name: "Lisboa", x: -30, y: 67 },
  london: { id: "london", name: "London", x: 6, y: 28 },
  madrid: { id: "madrid", name: "Madrid", x: -13, y: 63 },
  marseille: { id: "marseille", name: "Marseille", x: 21, y: 55 },
  moskva: { id: "moskva", name: "Moskva", x: 115, y: 25 },
  munchen: { id: "munchen", name: "Munchen", x: 41, y: 40 },
  palermo: { id: "palermo", name: "Palermo", x: 52, y: 73 },
  pamplona: { id: "pamplona", name: "Pamplona", x: -3, y: 57 },
  paris: { id: "paris", name: "Paris", x: 8, y: 42 },
  petrograd: { id: "petrograd", name: "Petrograd", x: 100, y: 16 },
  riga: { id: "riga", name: "Riga", x: 79, y: 17 },
  roma: { id: "roma", name: "Roma", x: 45, y: 60 },
  rostov: { id: "rostov", name: "Rostov", x: 123, y: 44 },
  sarajevo: { id: "sarajevo", name: "Sarajevo", x: 69, y: 56 },
  sevastopol: { id: "sevastopol", name: "Sevastopol", x: 110, y: 52 },
  smolensk: { id: "smolensk", name: "Smolensk", x: 102, y: 27 },
  smyrna: { id: "smyrna", name: "Smyrna", x: 93, y: 71 },
  sochi: { id: "sochi", name: "Sochi", x: 125, y: 53 },
  sofia: { id: "sofia", name: "Sofia", x: 81, y: 58 },
  stockholm: { id: "stockholm", name: "Stockholm", x: 58, y: 12 },
  venezia: { id: "venezia", name: "Venezia", x: 43, y: 50 },
  warszawa: { id: "warszawa", name: "Warszawa", x: 77, y: 32 },
  wien: { id: "wien", name: "Wien", x: 56, y: 42 },
  wilno: { id: "wilno", name: "Wilno", x: 90, y: 27 },
  zagrab: { id: "zagrab", name: "Zagrab", x: 55, y: 50 },
  zurich: { id: "zurich", name: "Zurich", x: 27, y: 48 },
};
