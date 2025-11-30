export type Cell = "X" | "O" | "";

export type Winner =
  | {
      player: Cell;
      line: number[] | null;
    }
  | null;

export function calculateWinner(squares: Cell[]): Winner {
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

  if (squares.every((s) => s !== "")) {
    return { player: "", line: null };
  }

  return null;
}
