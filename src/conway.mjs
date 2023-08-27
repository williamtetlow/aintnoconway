const NEIGHBOUR_DELTAS = [-1, 0, 1];
/**
 * @param {import('./grid.mjs').Grid} grid
 */
export function runGameOfLife(grid) {
  for (let i = 0, length = grid.width * grid.height; i < length; i++) {
    const x = i % grid.width;
    const y = Math.floor(i / grid.width);

    const bit = grid.getCellValue(x, y);
    const neighbours = getNeighbours(x, y, grid);

    if (bit === 0) {
      if (neighbours === 3) {
        grid.setCell(x, y);
      }
    } else {
      if (neighbours < 2 || neighbours > 3) {
        grid.clearCell(x, y);
      }
    }
  }
}

function getNeighbours(x, y, grid) {
  let liveNeighbours = 0;

  for (const dx of NEIGHBOUR_DELTAS) {
    for (const dy of NEIGHBOUR_DELTAS) {
      if (dx === 0 && dy === 0) {
        // we shouldn't count the current cell as this one we are looking at neighbours of
        continue;
      }

      const neighborX = (x + dx + grid.width) % grid.width;
      const neighborY = (y + dy + grid.height) % grid.height;

      liveNeighbours += grid.getCellValue(neighborX, neighborY);
    }
  }

  return liveNeighbours;
}
