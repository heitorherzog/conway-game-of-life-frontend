interface BoardProps {
  grid: number[][];
  onToggle: (r: number, c: number) => void;
}

export function Board({ grid, onToggle }: BoardProps) {
  return (
    <div
      style={{
        display: "inline-block",
        border: "2px solid #333",
      }}
    >
      {grid.map((row, rIdx) => (
        <div key={rIdx} style={{ display: "flex" }}>
          {row.map((cell, cIdx) => (
            <div
              key={cIdx}
              onClick={() => onToggle(rIdx, cIdx)}
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
  );
}
