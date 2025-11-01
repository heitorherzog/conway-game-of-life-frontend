import { useState } from "react";
import { Board } from "./components/Board";
import { useInterval } from "./hooks/useInterval";
import "./style.css";
import {
  generateEmptyGrid,
  getNextGeneration,
  type Grid,
} from "./logic/gameOfLife";

const ROWS = 25;
const COLS = 25;

export default function App() {
  const [grid, setGrid] = useState<Grid>(() => generateEmptyGrid(ROWS, COLS));
  const [running, setRunning] = useState(false);
  const [steps, setSteps] = useState(20);

  useInterval(
    () => setGrid((prev) => getNextGeneration(prev)),
    running ? 300 : null
  );

  function toggleCell(row: number, col: number) {
    const newGrid = grid.map((r) => [...r]);
    newGrid[row][col] = grid[row][col] ? 0 : 1;
    setGrid(newGrid);
  }

  function handleAdvance() {
    let temp = grid;
    for (let i = 0; i < steps; i++) {
      temp = getNextGeneration(temp);
    }
    setGrid(temp);
  }

  function handleClear() {
    setGrid(generateEmptyGrid(ROWS, COLS));
    setRunning(false);
  }

  return (
    <div className="app">
      <h1>Conway’s Game of Life</h1>

      <Board grid={grid} onToggle={toggleCell} />

      <div className="controls">
        <button onClick={() => setRunning(!running)}>
          {running ? "Stop" : "Start"}
        </button>

        <button onClick={() => setGrid(getNextGeneration(grid))}>
          Next Step
        </button>

        <button onClick={handleAdvance}>Advance {steps} Steps</button>

        <input
          type="number"
          value={steps}
          min={1}
          max={100}
          onChange={(e) => setSteps(Number(e.target.value))}
        />

        <button onClick={handleClear}>Clear</button>
      </div>
    </div>
  );
}
