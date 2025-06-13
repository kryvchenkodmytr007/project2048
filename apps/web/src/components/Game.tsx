import { useState, useCallback } from 'react';
import { Board, Direction } from '@project2048/core';
import useKeyDown from '../hooks/useKeyDown';
import { Tile } from './Tile';

export default function Game() {
  const [board, setBoard] = useState(() => new Board());
  const [over, setOver]   = useState(false);

  const move = useCallback((dir: Direction) => {
    const next = new Board(board.grid);
    if (next.move(dir)) {
      setBoard(next);
      if (next.isGameOver()) setOver(true);
    }
  }, [board]);

  useKeyDown((k) => {
    const map: Record<string, Direction> = {
      ArrowLeft: 'left', ArrowRight: 'right',
      ArrowUp: 'up',     ArrowDown: 'down',
    };
    if (map[k]) move(map[k]);
  });

  return (
    <div className="relative flex flex-col items-center gap-4 mt-10 select-none">
      {over && (
        <div className="absolute z-10 bg-white/80 backdrop-blur-md p-6 rounded-xl text-2xl">
          Game Over – Score {board.score}
        </div>
      )}

      <div className="grid grid-cols-4 gap-2">
        {board.grid.flatMap((row, i) =>
          row.map((val, j) => <Tile key={`${i}-${j}`} value={val} />)
        )}
      </div>

      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        onClick={() => { setBoard(new Board()); setOver(false); }}>
        Restart
      </button>
    </div>
  );
}
