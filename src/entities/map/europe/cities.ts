export type CityId = string;

export type City = {
  id: CityId;
  name: string;
  x: number;
  y: number;
};

export const cities: Record<CityId, City> = {
  amsterdam: { id: "amsterdam", name: "Amsterdam", x: 13, y: 31 },
  angora: { id: "angora", name: "Angora", x: 125, y: 89 },
  athina: { id: "athina", name: "Athina", x: 87, y: 90 },
  barcelona: { id: "barcelona", name: "Barcelona", x: -14, y: 88 },
  berlin: { id: "berlin", name: "Berlin", x: 47, y: 37 },
  brest: { id: "brest", name: "Brest", x: -26, y: 49 },
  brindisi: { id: "brindisi", name: "Brindisi", x: 59, y: 81 },
  bruxelles: { id: "bruxelles", name: "Bruxelles", x: 3, y: 40 },
  budapest: { id: "budapest", name: "Budapest", x: 70, y: 54 },
  bucuresti: { id: "bucuresti", name: "Bucuresti", x: 101, y: 63 },
  cadiz: { id: "cadiz", name: "Cadiz", x: -38, y: 97 },
  constantinople: {
    id: "constantinople",
    name: "Constantinople",
    x: 112,
    y: 83,
  },
  danzig: { id: "danzig", name: "Danzig", x: 70, y: 28 },
  dieppe: { id: "dieppe", name: "Dieppe", x: -15, y: 45 },
  edinburgh: { id: "edinburgh", name: "Edinburgh", x: -20, y: 14 },
  erzurum: { id: "erzurum", name: "Erzurum", x: 142, y: 85 },
  essen: { id: "essen", name: "Essen", x: 27, y: 32 },
  frankfurt: { id: "frankfurt", name: "Frankfurt", x: 21, y: 45 },
  kharkiv: { id: "kharkiv", name: "Kharkiv", x: 133, y: 49 },
  kobenhavn: { id: "kobenhavn", name: "Kobenhavn", x: 42, y: 22 },
  kyiv: { id: "kyiv", name: "Kyiv", x: 114, y: 43 },
  lisboa: { id: "lisboa", name: "Lisboa", x: -50, y: 88 },
  london: { id: "london", name: "London", x: -5, y: 37 },
  madrid: { id: "madrid", name: "Madrid", x: -36, y: 85 },
  marseille: { id: "marseille", name: "Marseille", x: 15, y: 72 },
  moskva: { id: "moskva", name: "Moskva", x: 133, y: 30 },
  munchen: { id: "munchen", name: "Munchen", x: 38, y: 48 },
  palermo: { id: "palermo", name: "Palermo", x: 53, y: 95 },
  pamplona: { id: "pamplona", name: "Pamplona", x: -15, y: 73 },
  paris: { id: "paris", name: "Paris", x: -6, y: 51 },
  petrograd: { id: "petrograd", name: "Petrograd", x: 117, y: 16 },
  riga: { id: "riga", name: "Riga", x: 87, y: 19 },
  roma: { id: "roma", name: "Roma", x: 41, y: 76 },
  rostov: { id: "rostov", name: "Rostov", x: 146, y: 55 },
  sarajevo: { id: "sarajevo", name: "Sarajevo", x: 75, y: 72 },
  sevastopol: { id: "sevastopol", name: "Sevastopol", x: 125, y: 66 },
  smolensk: { id: "smolensk", name: "Smolensk", x: 122, y: 34 },
  smyrna: { id: "smyrna", name: "Smyrna", x: 105, y: 95 },
  sochi: { id: "sochi", name: "Sochi", x: 144, y: 68 },
  sofia: { id: "sofia", name: "Sofia", x: 87, y: 73 },
  stockholm: { id: "stockholm", name: "Stockholm", x: 59, y: 12 },
  venezia: { id: "venezia", name: "Venezia", x: 41, y: 63 },
  warszawa: { id: "warszawa", name: "Warszawa", x: 80, y: 38 },
  wien: { id: "wien", name: "Wien", x: 57, y: 50 },
  wilno: { id: "wilno", name: "Wilno", x: 102, y: 33 },
  zagrab: { id: "zagrab", name: "Zagrab", x: 56, y: 62 },
  zurich: { id: "zurich", name: "Zurich", x: 23, y: 57 },
};
