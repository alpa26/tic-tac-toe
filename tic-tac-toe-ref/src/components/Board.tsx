import React from "react";
import Cell from "./Cell";
import type { Cell as CellType, Winner } from "../utils/game";

interface BoardProps {
  board: CellType[];
  onCellClick: (index: number) => void;
  winner: Winner;
}

export default function Board({ board, onCellClick, winner }: BoardProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {board.map((cell, idx) => {
        const highlight = winner?.line?.includes(idx) ?? false;
        return (
          <Cell
            key={idx}
            value={cell}
            onClick={() => onCellClick(idx)}
            highlight={highlight}
          />
        );
      })}
    </div>
  );
}
