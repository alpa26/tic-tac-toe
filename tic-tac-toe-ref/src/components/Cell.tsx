import React from "react";
import type { Cell as CellType } from "../utils/game";

interface CellProps {
  value: CellType;
  onClick: () => void;
  highlight?: boolean;
}

export default function Cell({ value, onClick, highlight }: CellProps) {
  return (
    <button
      className={`w-20 h-20 text-4xl font-bold rounded-lg ${
        highlight ? "bg-green-200" : "bg-gray-200"
      } hover:bg-gray-300`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}
