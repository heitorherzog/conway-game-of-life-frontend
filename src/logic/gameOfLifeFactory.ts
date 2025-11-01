import { type IGameOfLifeService } from "./gameOfLifeFacade";
import {
  LocalGameOfLifeService,
  ApiGameOfLifeService,
} from "./gameOfLifeService";

const USE_API = import.meta.env.VITE_USE_API === "true";

export function createGameOfLifeService(): IGameOfLifeService {
  if (USE_API) {
    console.info("[GameOfLife] Using API simulation service");
    return new ApiGameOfLifeService();
  } else {
    console.info("[GameOfLife] Using local simulation service");
    return new LocalGameOfLifeService();
  }
}
