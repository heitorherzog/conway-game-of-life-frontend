export type Grid = number[][];
export type Cell = 0 | 1; // 0 = dead, 1 = alive

export function generateEmptyGrid(rows: number, cols: number): Grid {
  return Array.from({ length: rows }, () => Array<Cell>(cols).fill(0));
}

export function getNextGeneration(current: Grid): Grid {
  const rows = current.length;
  const cols = current[0].length;
  const next = current.map((r) => [...r]);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const neighbors = countNeighbors(current, r, c);
      const cell = current[r][c];
      const alive = cell === 1;
      const dead = cell === 0;

      if (alive && (neighbors < 2 || neighbors > 3)) next[r][c] = 0;
      else if (dead && neighbors === 3) next[r][c] = 1;
    }
  }

  return next;
}

export function getAdvanceGenerations(grid: Grid, steps: number): Grid {
  let g = grid;
  for (let i = 0; i < steps; i++) {
    g = getNextGeneration(g);
  }
  return g;
}

function countNeighbors(grid: Grid, row: number, col: number): number {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      const r = row + i;
      const c = col + j;
      if (r >= 0 && r < grid.length && c >= 0 && c < grid[0].length) {
        count += grid[r][c];
      }
    }
  }
  return count;
}
