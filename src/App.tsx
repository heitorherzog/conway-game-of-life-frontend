import { useState, useEffect } from "react";
import "./style.css";
import { Board } from "./components/Board";

export default function App() {
  const rows = 10;
  const cols = 10;
  const [running, setRunning] = useState(false);
  const [grid, setGrid] = useState(() =>
    Array.from({ length: rows }, () => Array(cols).fill(0))
  );

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setGrid((g) => nextGeneration(g));
    }, 300);
    return () => clearInterval(id);
  }, [running]);

  function toggleCell(r: number, c: number) {
    const newGrid = grid.map((row) => [...row]);
    newGrid[r][c] = grid[r][c] ? 0 : 1;
    setGrid(newGrid);
  }

  function nextGeneration(current: number[][]) {
    const rows = current.length;
    const cols = current[0].length;
    const next = current.map((r) => [...r]);

    function countNeighbors(r: number, c: number): number {
      let count = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue;
          const nr = r + i;
          const nc = c + j;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
            count += current[nr][nc];
          }
        }
      }
      return count;
    }

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const neighbors = countNeighbors(r, c);
        const cell = current[r][c];
        if (cell === 1 && (neighbors < 2 || neighbors > 3)) next[r][c] = 0;
        else if (cell === 0 && neighbors === 3) next[r][c] = 1;
      }
    }

    return next;
  }

  return (
    <div className="app">
      <button onClick={() => setGrid(nextGeneration(grid))}>
        Next Generation
      </button>
      <div style={{ marginTop: 8 }}>
        <button onClick={() => setRunning(!running)}>
          {running ? "Stop" : "Start"}
        </button>
        <button onClick={() => setGrid(nextGeneration(grid))}>Next</button>
        <button
          onClick={() =>
            setGrid(Array.from({ length: rows }, () => Array(cols).fill(0)))
          }
        >
          Clear
        </button>
      </div>
      <h1>Conway’s Game of Life</h1>
      <div>
        <Board grid={grid} onToggle={toggleCell}></Board>
      </div>
    </div>
  );
}
