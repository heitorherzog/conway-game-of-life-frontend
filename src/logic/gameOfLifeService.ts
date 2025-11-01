import { type Grid, getNextGeneration, generateEmptyGrid } from "./gameOfLife";
import { type IGameOfLifeService } from "./gameOfLifeFacade";

export class LocalGameOfLifeService implements IGameOfLifeService {
  async getNextGeneration(grid: Grid): Promise<Grid> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(getNextGeneration(grid)), 50);
    });
  }

  async generateEmptyGrid(rows: number, cols: number): Promise<Grid> {
    return generateEmptyGrid(rows, cols);
  }
}

export class ApiGameOfLifeService implements IGameOfLifeService {
  async getNextGeneration(grid: Grid): Promise<Grid> {
    const response = await fetch("/api/gameOfLife/next", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ grid }),
    });
    if (!response.ok) throw new Error("API error");
    const data = await response.json();
    return data.grid as Grid;
  }

  async generateEmptyGrid(rows: number, cols: number): Promise<Grid> {
    const response = await fetch(
      `/api/gameOfLife/empty?rows=${rows}&cols=${cols}`
    );
    const data = await response.json();
    return data.grid as Grid;
  }
}
