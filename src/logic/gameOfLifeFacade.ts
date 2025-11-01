import { type Grid } from "./gameOfLife";

export interface IGameOfLifeService {
  getNextGeneration(grid: Grid): Promise<Grid>;
  generateEmptyGrid(rows: number, cols: number): Promise<Grid>;
}
