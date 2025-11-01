import { useState } from "react";
import "./style.css";
import { Board } from "./components/Board";
import { getNextGeneration, generateEmptyGrid } from "./logic/gameOfLife";
import { useInterval } from "./hooks/useInterval";

const ROWS = 10;
const COLS = 10;

export default function App() {
  const [grid, setGrid] = useState(() => generateEmptyGrid(ROWS, COLS));
  const [running, setRunning] = useState(false);
  const [steps, setSteps] = useState(1);

  useInterval(
    () => setGrid((prev) => getNextGeneration(prev)),
    running ? 300 : null
  );

  function toggleCell(r: number, c: number) {
    const newGrid = grid.map((row) => [...row]);
    newGrid[r][c] = grid[r][c] ? 0 : 1;
    setGrid(newGrid);
  }

  function handleAdvance() {
    let temp = grid;
    for (let i = 0; i < steps; i++) temp = getNextGeneration(temp);
    setGrid(temp);
  }

  return (
    <div className="app">
      <button onClick={() => setGrid(getNextGeneration(grid))}>
        Next Generation
      </button>
      <button onClick={handleAdvance}>Advance {steps} Steps</button>
      <input
        type="number"
        value={steps}
        min={1}
        max={100}
        onChange={(e) => setSteps(Number(e.target.value))}
        style={{
          width: 60,
          textAlign: "center",
          marginLeft: 8,
        }}
      />
      <div style={{ marginTop: 8 }}>
        <button onClick={() => setRunning(!running)}>
          {running ? "Stop" : "Start"}
        </button>
        <button onClick={() => setGrid(getNextGeneration(grid))}>Next</button>
        <button onClick={() => setGrid(generateEmptyGrid(ROWS, COLS))}>
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
