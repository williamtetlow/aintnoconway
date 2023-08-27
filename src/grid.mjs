export class Grid {
  _arrayBuf;
  _grid;
  _width;
  _height;

  constructor(width, height) {
    const bytes = Math.ceil((width * height) / 8);

    this._arrayBuf = new ArrayBuffer(bytes);
    this._grid = new Uint8Array(this._arrayBuf);
    this._width = width;
    this._height = height;
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  setCell(x, y) {
    const index = y * this._width + x;
    const byteIndex = index >> 3;
    const bitIndex = index & 7;

    this._grid[byteIndex] |= 1 << bitIndex;
  }

  clearCell(x, y) {
    const index = y * this._width + x;
    const byteIndex = index >> 3;
    const bitIndex = index & 7;

    this._grid[byteIndex] &= ~(1 << bitIndex);
  }

  getCellValue(x, y) {
    const index = y * this._width + x;
    const byteIndex = index >> 3;
    const bitIndex = index & 7;

    return (this._grid[byteIndex] >> bitIndex) & 1;
  }
}
