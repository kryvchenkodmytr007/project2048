import { useState } from 'react';
import { Board, TileObj, isGameOver } from '@project2048/core';
import type { Direction } from '@project2048/core';

import Tile from './Tile';
import useKeyDown from '../hooks/useKeyDown';

const GRID = 4;

const newBoard = () => new Board();

const Game = () => {
  const [board, setBoard] = useState(() => newBoard());
  const [tiles, setTiles] = useState<TileObj[]>(board.tiles);
  const [over, setOver]   = useState(false);

  useKeyDown((k) => {
    const dir = keyToDir(k);
    if (!dir || over) return;

    const moved = board.move(dir);
    if (!moved) return;

    board.spawn();
    setTiles([...board.tiles]);
    setOver(isGameOver(board));
  });

  const restart = () => {
    const fresh = newBoard();
    setBoard(fresh);
    setTiles(fresh.tiles);
    setOver(false);
  };

  const tileAt = (x: number, y: number) =>
    tiles.find((t) => t.x === x && t.y === y);

  return (
    <div className="flex min-h-screen flex-col items-center justify-start gap-4 py-6">
      <h1 className="text-3xl font-bold text-white">2048</h1>

      <div
        className="grid gap-3 bg-[#bbada0] p-3 rounded-2xl shadow-lg"
        style={{
          gridTemplateColumns: `repeat(${GRID}, 6rem)`,
          gridTemplateRows:    `repeat(${GRID}, 6rem)`,
        }}
      >
        {Array.from({ length: GRID }).map((_, y) =>
          Array.from({ length: GRID }).map((_, x) => {
            const t = tileAt(x, y);
            return (
              <div key={`${x}-${y}`} className="relative">
                {t ? (
                  <Tile
                    value={t.value}
                    isNew={t.isNew}
                    justMerged={t.justMerged}
                  />
                ) : (
                  <div className="cell" />
                )}
              </div>
            );
          }),
        )}
      </div>

      <button
        onClick={restart}
        className="px-4 py-2 mt-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-bold"
      >
        Restart
      </button>

      {over && <span className="text-white font-semibold mt-2">Game&nbsp;Over&nbsp;💀</span>}
    </div>
  );
};

const keyToDir = (code: string): Direction | null => {
  switch (code) {
    case 'ArrowUp':
    case 'KeyW':
      return 'up';
    case 'ArrowDown':
    case 'KeyS':
      return 'down';
    case 'ArrowLeft':
    case 'KeyA':
      return 'left';
    case 'ArrowRight':
    case 'KeyD':
      return 'right';
    default:
      return null;
  }
};


export default Game;
