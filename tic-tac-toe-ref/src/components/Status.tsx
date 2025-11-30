import React from "react";
import type { Winner } from "../utils/game";

interface StatusProps {
  xIsNext: boolean;
  winner: Winner;
}

export default function Status({ xIsNext, winner }: StatusProps) {
  const status = winner
    ? winner.player === ""
      ? "Ничья!"
      : `Победитель: ${winner.player}`
    : `Ход: ${xIsNext ? "X" : "O"}`;

  return <div className="text-lg font-bold mb-4">{status}</div>;
}
