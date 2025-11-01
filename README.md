# Conway’s Game of Life 🧬

React + TypeScript implementation of **Conway’s Game of Life**, built to simulate cellular automata directly on the client side.  
The project follows clean architecture principles and includes a simple abstraction layer that allows the simulation to be executed **locally** or via a **service API facade** (for future backend integration).

---

## 🎯 What is this project?

Conway’s Game of Life is a zero-player game devised by mathematician John Conway.  
It consists of a grid of cells that evolve across generations based on a few simple rules:

- Any live cell with **two or three live neighbours** survives.
- Any dead cell with **exactly three live neighbours** becomes alive.
- All other live cells die in the next generation, and all other dead cells remain dead.

This implementation focuses on:

- A responsive board where you can toggle cells on/off.
- Manual and automatic progression of generations.
- The ability to advance a specific number of generations.
- Clean separation between UI and simulation logic.
- A service-based facade pattern (`LocalGameOfLifeService` / `ApiGameOfLifeService`) for testing both approaches.

---

## ⚙️ Tech Stack

- **React 19 + TypeScript**
- **Node-v22.21.1**
- **Vite** as build tool
- **Custom Game Logic** (no external automata libraries)
- Optional abstraction to simulate calling an API

---

## 🚀 How to Run

### 1. Clone the repository

```bash
git clone https://github.com/your-username/conways-game-of-life.git
cd conways-game-of-life
npm install
npm run dev
```
