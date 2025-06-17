import { useState } from 'react';
import { Board, TileObj, Direction } from '@project2048/core';

import Tile from './Tile';
import useKeyDown from '../hooks/useKeyDown';
import { useScore } from '../contexts/score';
import FinalScoreModal from './FinalScoreModal';

const Game: React.FC = () => {
  const [board, setBoard] = useState(() => new Board());
  const [tiles, setTiles] = useState<TileObj[]>(board.tiles);
  const [over, setOver] = useState(false);
  const [showModal, setModal] = useState(false);

  const { add, reset } = useScore();

  useKeyDown((code) => {
    const dir = keyToDir(code);
    if (!dir || over) return;
    move(dir);
  });

  const move = (dir: Direction) => {
    const prev = board.score;
    const moved = board.move(dir);

    if (!moved) return;

    setTiles([...board.tiles]);
    const gained = board.score - prev;
    if (gained) add(gained);

    const isOver = board.isGameOver();
    if (isOver) {
      setOver(true);
      setModal(true);
    }
  };

  const restart = () => {
    setModal(false);
    const fresh = new Board();
    setBoard(fresh);
    setTiles(fresh.tiles);
    setOver(false);
    reset();
  };

  const tileAt = (x: number, y: number) =>
    tiles.find((t) => t.x === x && t.y === y);

  return (
    <div className="relative flex flex-col items-center gap-4 py-6">
      <h1 className="text-3xl font-bold text-white">2048</h1>

      <div
        className="grid gap-3 rounded-2xl bg-[#bbada0]/90 p-3 shadow-lg"
        style={{
          gridTemplateColumns: 'repeat(4, 6rem)',
          gridTemplateRows: 'repeat(4, 6rem)',
        }}
      >
        {Array.from({ length: 4 }).map((_, y) =>
          Array.from({ length: 4 }).map((_, x) => {
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
        className="mt-3 rounded-lg bg-amber-500 px-4 py-2 font-bold text-white shadow hover:bg-amber-600"
      >
        Restart
      </button>

      {showModal && <FinalScoreModal onClose={() => setModal(false)} />}
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
