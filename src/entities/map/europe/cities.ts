export type CityId = string;

export type City = {
  id: CityId;
  name: string;
  x: number;
  y: number;
};

export const cities: Record<CityId, City> = {
  amsterdam: { id: "amsterdam", name: "Amsterdam", x: 13, y: 31 },
  angora: { id: "angora", name: "Angora", x: 1740, y: 1100 },
  athina: { id: "athina", name: "Athina", x: 1385, y: 1125 },
  barcelona: { id: "barcelona", name: "Barcelona", x: -14, y: 88 },
  berlin: { id: "berlin", name: "Berlin", x: 970, y: 468 },
  brest: { id: "brest", name: "Brest", x: -26, y: 49 },
  brindisi: { id: "brindisi", name: "Brindisi", x: 1110, y: 1000 },
  bruxelles: { id: "bruxelles", name: "Bruxelles", x: 3, y: 40 },
  budapest: { id: "budapest", name: "Budapest", x: 1205, y: 675 },
  bucuresti: { id: "bucuresti", name: "Bucuresti", x: 1500, y: 795 },
  cadiz: { id: "cadiz", name: "Cadiz", x: -38, y: 97 },
  constantinople: {
    id: "constantinople",
    name: "Constantinople",
    x: 1620,
    y: 1020,
  },
  danzig: { id: "danzig", name: "Danzig", x: 1210, y: 335 },
  dieppe: { id: "dieppe", name: "Dieppe", x: -15, y: 45 },
  edinburgh: { id: "edinburgh", name: "Edinburgh", x: -20, y: 14 },
  erzurum: { id: "erzurum", name: "Erzurum", x: 1920, y: 1075 },
  essen: { id: "essen", name: "Essen", x: 27, y: 32 },
  frankfurt: { id: "frankfurt", name: "Frankfurt", x: 21, y: 45 },
  kharkiv: { id: "kharkiv", name: "Kharkiv", x: 1833, y: 615 },
  kobenhavn: { id: "kobenhavn", name: "Kobenhavn", x: 942, y: 262 },
  kyiv: { id: "kyiv", name: "Kyiv", x: 1620, y: 540 },
  lisboa: { id: "lisboa", name: "Lisboa", x: -50, y: 88 },
  london: { id: "london", name: "London", x: -5, y: 37 },
  madrid: { id: "madrid", name: "Madrid", x: -36, y: 85 },
  marseille: { id: "marseille", name: "Marseille", x: 15, y: 72 },
  moskva: { id: "moskva", name: "Moskva", x: 1833, y: 380 },
  munchen: { id: "munchen", name: "Munchen", x: 898, y: 618 },
  palermo: { id: "palermo", name: "Palermo", x: 1045, y: 1190 },
  pamplona: { id: "pamplona", name: "Pamplona", x: -15, y: 73 },
  paris: { id: "paris", name: "Paris", x: -6, y: 51 },
  petrograd: { id: "petrograd", name: "Petrograd", x: 1657, y: 216 },
  riga: { id: "riga", name: "Riga", x: 1357, y: 239 },
  roma: { id: "roma", name: "Roma", x: 940, y: 980 },
  rostov: { id: "rostov", name: "Rostov", x: 1920, y: 690 },
  sarajevo: { id: "sarajevo", name: "Sarajevo", x: 1245, y: 928 },
  sevastopol: { id: "sevastopol", name: "Sevastopol", x: 1735, y: 830 },
  smolensk: { id: "smolensk", name: "Smolensk", x: 1695, y: 424 },
  smyrna: { id: "smyrna", name: "Smyrna", x: 1535, y: 1180 },
  sochi: { id: "sochi", name: "Sochi", x: 1950, y: 880 },
  sofia: { id: "sofia", name: "Sofia", x: 1395, y: 943 },
  stockholm: { id: "stockholm", name: "Stockholm", x: 1100, y: 142 },
  venezia: { id: "venezia", name: "Venezia", x: 931, y: 790 },
  warszawa: { id: "warszawa", name: "Warszawa", x: 1300, y: 468 },
  wien: { id: "wien", name: "Wien", x: 1087, y: 630 },
  wilno: { id: "wilno", name: "Wilno", x: 1532, y: 413 },
  zagrab: { id: "zagrab", name: "Zagrab", x: 1076, y: 800 },
  zurich: { id: "zurich", name: "Zurich", x: 23, y: 57 },
};
