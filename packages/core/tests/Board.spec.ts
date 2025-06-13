import { describe, it, expect, vi } from 'vitest';
import { Board } from '../src/Board';

describe('Board core', () => {
  it('стартова дошка має рівно 2 плитки', () => {
    const b = new Board();
    const tiles = b.grid.flat().filter((x) => x !== null);
    expect(tiles.length).toBe(2);
  });

  it('рух ліворуч обʼєднує сусідні однакові', () => {
    const preset = [
      [2, 2, null, null],
      [4, 4, 4, 4],
      [null, 2, null, 2],
      [2, null, null, null],
    ];
    const b = new Board(preset);
    const moved = b.move('left', false);
    expect(moved).toBe(true);
    expect(b.grid[0]).toEqual([4, null, null, null]);
    expect(b.grid[1]).toEqual([8, 8, null, null]);
    expect(b.grid[2]).toEqual([4, null, null, null]);
    expect(b.score).toBe(24);
  });

  it('isGameOver повертає true, коли ходів немає', () => {
    const full = [
      [2, 4, 2, 4],
      [4, 2, 4, 2],
      [2, 4, 2, 4],
      [4, 2, 4, 2],
    ];
    const b = new Board(full);
    expect(b.isGameOver()).toBe(true);
  });

  it('move не робить нічого, якщо зсув неможливий', () => {
    const full = [
      [2, 4, 8, 16],
      [4, 2, 16, 8],
      [8, 16, 2, 4],
      [16, 8, 4, 2],
    ];
    const b = new Board(full);
    const changed = b.move('left');
    expect(changed).toBe(false);
    expect(b.grid).toEqual(full);
  });

  it('addRandomTile викликається після успішного ходу', () => {
    const spy = vi.spyOn(Math, 'random').mockReturnValue(0);
    const b = new Board([
      [2, 2, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]);
    b.move('left');
    const flat = b.grid.flat();
    expect(flat.filter((x) => x !== null).length).toBe(2);
    spy.mockRestore();
  });
});
