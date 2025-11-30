import { useState, useEffect } from "react";
import Board from "./Board";
import Status from "./Status";
import type { Cell, Winner } from "../utils/game";
import { calculateWinner } from "../utils/game";

export default function TicTacToe() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(""));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState<Winner>(null);

  useEffect(() => {
    setWinner(calculateWinner(board));
  }, [board]);

  function handleCellClick(index: number) {
    if (board[index] !== "" || winner) return;

    const newBoard = board.slice();
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  }

  function resetGame() {
    setBoard(Array(9).fill(""));
    setXIsNext(true);
    setWinner(null);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <Status xIsNext={xIsNext} winner={winner} />
        <Board board={board} onCellClick={handleCellClick} winner={winner} />
        <button
          className="mt-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          onClick={resetGame}
        >
          Сбросить
        </button>
      </div>
    </div>
  );
}
