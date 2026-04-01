import { CitiesLayer } from "./citiesLayer";
import RoutesLayer from "./routesLayer";


const Board = () => {
  return (
    <div className="w-screen h-screen bg-[#e6dcc6] flex items-center justify-center">
      <div className="relative">
        {/* КАРТА */}
        <img
          src="/map.png"
          alt="map"
          className="w-screen max-w-[100vw] max-h-[100vh] "
        />

        {/* SVG СЛОЙ */}
        <svg className="absolute inset-0 w-full h-full" viewBox='0 0 100 100'>
          <RoutesLayer />
          <CitiesLayer />
        </svg>
      </div>
    </div>
  );
};

export default Board;
