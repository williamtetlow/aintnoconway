import { Screen } from "./screen.mjs";
import { Grid } from "./grid.mjs";
import { runGameOfLife } from "./conway.mjs";

const screen = new Screen();
const grid = new Grid(screen.width, screen.height);

screen.drawGrid();

beginSelectStartingGridPhase();

// when they've finished selecting starting grid they hit <enter> and begin life...
screen.onKeyPress(
  "enter",
  () => {
    for (const cell of screen.cells()) {
      cell.removeAllListeners("click");
    }

    startGame();
  },
  true
);

function beginSelectStartingGridPhase() {
  for (const cell of screen.cells()) {
    cell.on("click", () => {
      const x = cell.options.left;
      const y = cell.options.top;

      if (grid.getCellValue(x, y)) {
        grid.clearCell(x, y);
      } else {
        grid.setCell(x, y);
      }

      updateScreen();
    });
  }

  screen.render();
}

function startGame() {
  tick();

  setInterval(() => {
    tick();
  }, 500);
}

function tick() {
  runGameOfLife(grid);
  updateScreen();
}

function updateScreen() {
  for (const cell of screen.cells()) {
    const value = grid.getCellValue(cell.options.left, cell.options.top);
    cell.options.style.bg = value === 1 ? "magenta" : "white";
  }
  screen.render();
}
