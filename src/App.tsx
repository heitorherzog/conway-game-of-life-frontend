import { useState } from "react";
import "./style.css";

export default function App() {
  const rows = 10;
  const cols = 10;
  const [grid, setGrid] = useState(() =>
    Array.from({ length: rows }, () => Array(cols).fill(0))
  );

  function toggleCell(r: number, c: number) {
    const newGrid = grid.map((row) => [...row]);
    newGrid[r][c] = grid[r][c] ? 0 : 1;
    setGrid(newGrid);
  }

  return (
    <div className="app">
      <h1>Conway’s Game of Life</h1>
      <div>
        {grid.map((row, rIdx) => (
          <div key={rIdx} style={{ display: "flex" }}>
            {row.map((cell, cIdx) => (
              <div
                key={cIdx}
                onClick={() => toggleCell(rIdx, cIdx)}
                style={{
                  width: 20,
                  height: 20,
                  border: "1px solid #222",
                  background: cell ? "#00e676" : "#111",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
