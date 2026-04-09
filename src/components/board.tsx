import { useRef, useState } from "react";
import { CitiesLayer } from "./citiesLayer";
import RoutesLayer from "./routesLayer";

const Board = () => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });

  const clampPosition = (x: number, y: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return { x, y };

    const rect = viewport.getBoundingClientRect();

    const vw = rect.width;
    const vh = rect.height;

    const contentWidth = vw * scale;
    const contentHeight = vh * scale;

    const minX = vw - contentWidth;
    const minY = vh - contentHeight;

    const clampedX = clamp(x, minX, 0);
    const clampedY = clamp(y, minY, 0);

    return { x: clampedX, y: clampedY };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale === 1) return;

    setIsDragging(true);

    setStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const rawX = e.clientX - start.x;
    const rawY = e.clientY - start.y;

    const { x, y } = clampPosition(rawX, rawY);

    setPosition({ x, y });
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();

    const zoomFactor = 0.001;
    const MIN_SCALE = 1;
    const MAX_SCALE = 3;
    const newScale = Math.min(
      Math.max(MIN_SCALE, scale - e.deltaY * zoomFactor),
      MAX_SCALE,
    );

    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const scaleRatio = newScale / scale;

    const newX = mouseX - (mouseX - position.x) * scaleRatio;
    const newY = mouseY - (mouseY - position.y) * scaleRatio;

    setScale(newScale);

    const { x, y } = clampPosition(newX, newY);

    if (newScale === MIN_SCALE) {
      setPosition({ x: 0, y: 0 });
    } else {
      setPosition({ x, y });
    }
  };

  return (
    <div className="w-screen h-screen bg-[#e1d4b5] flex items-center justify-center">
      {/* ФОН */}
      <img
        src="/background.png"
        alt="background"
        className="absolute inset-0 w-screen max-w-[100vw] max-h-[100vh]"
      />

      {/* VIEWPORT */}
      <div
        ref={viewportRef}
        style={{
          cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "default",
        }}
        className="relative overflow-hidden w-[75vw] h-[75vh]"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
      >
        {/* КАМЕРА */}
        <div
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: "top left",
            transition: scale === 1 ? "transform 0.2s ease-out" : "none",
          }}
          className="relative w-full h-full"
        >
          {/* Карта как растровое изображение – растягивается на весь контейнер */}
          <img
            src="/map.png"
            alt="map"
            className="absolute top-0 left-0 w-full h-full object-fill"
          />
          {/* SVG с городами и маршрутами – поверх карты, с теми же размерами */}
          <svg
            className="absolute top-0 left-0 w-full h-full"
            viewBox="0 0 100 100"
          >
            <RoutesLayer />
            <CitiesLayer />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Board;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
