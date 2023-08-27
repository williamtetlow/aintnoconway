import blessed from "blessed";

export class Screen {
  constructor() {
    this._screen = blessed.screen({
      smartCSR: true,
    });

    this._screen.key(["escape", "q", "C-c"], function () {
      return process.exit(0);
    });
  }

  _rowsBeforeGrid = 0;
  _gridInitiatilized = false;

  get width() {
    return this._screen.width;
  }

  get height() {
    return this._screen.height;
  }

  onKeyPress(key, callback, once = false) {
    this._screen[once ? "onceKey" : "key"]([key], callback);
  }

  *cells() {
    if (
      this._screen.children.length <= 1 /* there is no cells only info panel */
    )
      return;

    for (let i = 1, length = this._screen.children.length; i < length; i++) {
      yield this._screen.children[i];
    }
  }

  clear() {
    for (const child of screen.children) {
      this._screen.remove(child);
    }

    this._gridInitiatilized = false;
  }

  render() {
    this._screen.render();
  }

  drawGrid() {
    if (this._gridInitiatilized) {
      return;
    }

    for (
      let i = 0, totalNumOfCells = this.width * this.height;
      i < totalNumOfCells;
      i++
    ) {
      const x = i % this.width;
      const y = Math.floor(i / this.width);

      const cell = blessed.box({
        left: x,
        top: y,
        width: 1,
        height: 1,
        style: {
          bg: "white",
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          },
          margin: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          },
        },
      });

      this._screen.append(cell);
    }

    this._gridInitiatilized = true;
  }
}
