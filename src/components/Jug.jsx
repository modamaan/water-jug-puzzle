import React from "react";

export default function Jug({
  capacity,
  current,
  onFill,
  onEmpty,
  onPour,
  index,
  selected,
  onSelect
}) {
  const waterHeight = (current / capacity) * 100;
  return (
    <div
      className={`flex flex-col items-center ${selected ? "ring-4 ring-blue-400" : ""} cursor-pointer`}
      onClick={() => onPour(index)}
    >
      <svg
        width="64"
        height="128"
        viewBox="0 0 64 128"
        className="mb-2"
      >
        {/* Jug outline */}
        <rect x="8" y="8" width="48" height="112" rx="16" fill="#e0e7ef" stroke="#60a5fa" strokeWidth="4" />
        {/* Water level */}
        <rect
          x="8"
          y={120 - (waterHeight * 1.12)}
          width="48"
          height={waterHeight * 1.12}
          rx="16"
          fill="#38bdf8"
          style={{ transition: "all 0.4s cubic-bezier(.4,2,.6,1)" }}
        />
      </svg>
      <div className="text-blue-800 font-bold text-lg">{current} / {capacity}L</div>
      <div className="flex gap-1 mt-1">
        <button onClick={e => { e.stopPropagation(); onFill(index); }} className="px-2 py-1 bg-blue-500 text-white rounded text-xs">Fill</button>
        <button onClick={e => { e.stopPropagation(); onEmpty(index); }} className="px-2 py-1 bg-blue-400 text-white rounded text-xs">Empty</button>
        <button onClick={e => { e.stopPropagation(); onPour(index); }} className="px-2 py-1 bg-blue-300 text-white rounded text-xs">Pour</button>
      </div>
    </div>
  );
} 