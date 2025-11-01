import { useEffect, useState } from "react";
import { Board } from "./components/Board";
import type { Grid } from "./logic/gameOfLife";
import { useInterval } from "./hooks/useInterval";
import "./style.css";
import { createGameOfLifeService } from "./logic/gameOfLifeFactory";

const ROWS = 25;
const COLS = 25;
const service = createGameOfLifeService();

export default function App() {
  const [grid, setGrid] = useState<Grid>([]);
  const [running, setRunning] = useState(false);
  const [steps, setSteps] = useState(20);

  useEffect(() => {
    service.generateEmptyGrid(ROWS, COLS).then(setGrid);
  }, []);

  useInterval(
    () => {
      service.getNextGeneration(grid).then(setGrid);
    },
    running ? 300 : null
  );

  async function handleNext() {
    let temp = grid;
    for (let i = 0; i < steps; i++) {
      temp = await service.getNextGeneration(temp);
    }
    setGrid(temp);
  }

  function toggleCell(row: number, col: number) {
    const copy = grid.map((r) => [...r]);
    copy[row][col] = grid[row][col] ? 0 : 1;
    setGrid(copy);
  }

  return (
    <div className="app">
      <h1>Conway’s Game of Life</h1>
      <Board grid={grid} onToggle={toggleCell} />
      <div className="controls">
        <button onClick={() => setRunning(!running)}>
          {running ? "Stop" : "Start"}
        </button>
        <button onClick={handleNext}>Next ({steps})</button>
        <button
          onClick={() => service.generateEmptyGrid(ROWS, COLS).then(setGrid)}
        >
          Clear
        </button>
        <input
          type="number"
          value={steps}
          min={1}
          max={100}
          onChange={(e) => setSteps(Number(e.target.value))}
        />
      </div>
    </div>
  );
}
