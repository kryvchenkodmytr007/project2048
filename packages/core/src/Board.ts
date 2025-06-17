export type Tile = number | null;
export type Direction = 'left' | 'right' | 'up' | 'down';
export interface TileObj {
  id: number;
  x: number;
  y: number;
  value: number;
  isNew?: boolean;
  justMerged?: boolean;
}

export class Board {
  readonly size = 4;
  grid: Tile[][];
  score = 0;

  constructor(grid?: Tile[][]) {
    this.grid = grid ? this.copy(grid) : this.createEmpty();
    if (!grid) {
      this.addRandomTile();
      this.addRandomTile();
    }
  }

  private createEmpty(): Tile[][] {
    return Array.from({ length: this.size }, () =>
      Array<Tile>(this.size).fill(null),
    );
  }

  private copy(g: Tile[][]): Tile[][] {
    return g.map((row) => [...row]);
  }

  private transpose(g = this.grid): Tile[][] {
    return g[0].map((_, i) => g.map((row) => row[i]));
  }

  private reverseRows(g = this.grid): Tile[][] {
    return g.map((row) => [...row].reverse());
  }

  private addRandomTile(): void {
    const empty: [number, number][] = [];
    this.grid.forEach((row, y) =>
      row.forEach((cell, x) => cell === null && empty.push([y, x])),
    );
    if (empty.length === 0) return;
    const [y, x] = empty[Math.floor(Math.random() * empty.length)];
    this.grid[y][x] = Math.random() < 0.9 ? 2 : 4;
  }

  move(dir: Direction, spawn = true): boolean {
  let working = this.copy(this.grid);

  if (dir === 'up') working = this.transpose(working);
  if (dir === 'right') working = this.reverseRows(working);
  if (dir === 'down') {
    working = this.transpose(working);
    working = this.reverseRows(working);
  }

  const { moved, grid: merged } = this.mergeRows(working);

  let result = merged;
  if (dir === 'up') result = this.transpose(result);
  if (dir === 'right') result = this.reverseRows(result);
  if (dir === 'down') {
    result = this.reverseRows(result);
    result = this.transpose(result);
  }

  if (moved) {
    this.grid = result;
    if (spawn) this.addRandomTile();
  }
  return moved;
}

  private mergeRows(grid: Tile[][]): { moved: boolean; grid: Tile[][] } {
    let moved = false;
    const newGrid = grid.map((row) => {
      const filtered = row.filter((n): n is number => n !== null);
      const merged: Tile[] = [];
      let i = 0;
      while (i < filtered.length) {
        if (filtered[i] === filtered[i + 1]) {
          const val = (filtered[i]! * 2) as number;
          this.score += val;
          merged.push(val);
          i += 2;
          moved = true;
        } else {
          merged.push(filtered[i]!);
          i += 1;
        }
      }
      while (merged.length < this.size) merged.push(null);
      if (!moved) moved = merged.some((v, idx) => v !== row[idx]);
      return merged;
    });
    return { moved, grid: newGrid };
  }

  canMove(): boolean {
    const clone = new Board(this.grid);
    return (
      clone.move('left') ||
      clone.move('right') ||
      clone.move('up') ||
      clone.move('down')
    );
  }

  isGameOver(): boolean {
    return !this.canMove();
  }

  spawn(): void {
    this.addRandomTile();
  }

  private _id = 0;
  get tiles(): TileObj[] {
    const arr: TileObj[] = [];
    this.grid.forEach((row, y) =>
      row.forEach((v, x) => {
        if (v !== null)
          arr.push({ id: ++this._id, x, y, value: v });
      }),
    );
    return arr;
  }
}
