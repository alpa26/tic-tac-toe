import React, { useState, useEffect } from "react";

type Cell = "" | "X" | "O";

type Winner = {
  player: Cell;
  line: number[] | null;
} | null;

export default function TicTacToe(): JSX.Element {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(""));
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [winner, setWinner] = useState<Winner>(null);

  useEffect(() => {
    setWinner(calculateWinner(board));
  }, [board]);

  function handleClick(index: number) {
    if (board[index] !== "" || winner) return; // can't play on occupied or after game end

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

  const status = winner
    ? winner.player === ""
      ? "Ничья"
      : `Победитель: ${winner.player}`
    : `Ход: ${xIsNext ? "X" : "O"}`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h1 className="text-2xl font-semibold mb-4 text-center">Крестики-нолики</h1>

          <div className="mb-4 text-center">
            <div className="text-lg font-medium">{status}</div>
            <button
              onClick={resetGame}
              className="mt-2 px-3 py-1 border rounded-md text-sm hover:bg-slate-50"
            >
              Сбросить
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {board.map((cell, idx) => {
              const isWinningCell = !!(winner && winner.line && winner.line.includes(idx));

              return (
                <button
                  key={idx}
                  onClick={() => handleClick(idx)}
                  className={`aspect-square flex items-center justify-center text-3xl font-bold rounded-xl transition-transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    isWinningCell
                      ? "ring-4 ring-green-300 bg-green-50"
                      : "bg-slate-100 hover:bg-slate-200"
                  }`}
                  aria-label={`Клетка ${idx + 1}`}
                >
                  {cell}
                </button>
              );
            })}
          </div>

          <div className="mt-5 text-sm text-center text-slate-600">
            Игра для двоих на одном устройстве. Нажмите "Сбросить", чтобы начать заново.
          </div>
        </div>

        <footer className="mt-4 text-xs text-center text-slate-500">
          Написано на React + TypeScript • TailwindCSS классы
        </footer>
      </div>
    </div>
  );
}

// ------------------------ Helpers ------------------------

function calculateWinner(squares: Cell[]): Winner {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { player: squares[a], line };
    }
  }

  // Check for draw (board full)
  if (squares.every((s) => s !== "")) {
    return { player: "", line: null }; // empty player means draw
  }

  return null;
}
