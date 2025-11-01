import { useState } from "react";
import "./style.css";
import { Board } from "./components/Board";
import { getNextGeneration, generateEmptyGrid } from "./logic/gameOfLife";
import { useInterval } from "./hooks/useInterval";

const rows = 10;
const cols = 10;

export default function App() {
  const [grid, setGrid] = useState(() => generateEmptyGrid(rows, cols));
  const [running, setRunning] = useState(false);

  useInterval(
    () => setGrid((prev) => getNextGeneration(prev)),
    running ? 300 : null
  );

  function toggleCell(r: number, c: number) {
    const newGrid = grid.map((row) => [...row]);
    newGrid[r][c] = grid[r][c] ? 0 : 1;
    setGrid(newGrid);
  }

  return (
    <div className="app">
      <button onClick={() => setGrid(getNextGeneration(grid))}>
        Next Generation
      </button>
      <div style={{ marginTop: 8 }}>
        <button onClick={() => setRunning(!running)}>
          {running ? "Stop" : "Start"}
        </button>
        <button onClick={() => setGrid(getNextGeneration(grid))}>Next</button>
        <button onClick={() => setGrid(generateEmptyGrid(rows, cols))}>
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
