import React from "react";

export default function UndoButton({ onUndo, disabled }) {
  return (
    <button
      onClick={onUndo}
      disabled={disabled}
      className={`px-4 py-2 rounded shadow text-white font-semibold transition bg-gray-400 hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      Undo
    </button>
  );
} 