import { useEffect, useState } from 'react';
import { Board, TileObj, Direction, isGameOver } from '@project2048/core';
import Tile from './Tile';

const createBoard = () => new Board();

const Game = () => {
  const [board, setBoard] = useState(() => createBoard());
  const [tiles, setTiles] = useState<TileObj[]>(board.tiles);
  const [gameOver, setGameOver] = useState(false);

  const handleKey = (e: KeyboardEvent) => {
    const dir = keyToDir(e.key);
    if (!dir || gameOver) return;

    const moved = board.move(dir);
    if (moved) {
      board.spawn();
      setTiles(board.tiles);
      setGameOver(isGameOver(board));
    }
  };

  const restart = () => {
    const b = createBoard();
    setBoard(b);
    setTiles(b.tiles);
    setGameOver(false);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [board, gameOver]);

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-3xl font-bold text-white">2048</h1>

      <div
        className="relative grid gap-3 bg-[#bbada0] p-3 rounded-2xl"
        style={{
          gridTemplateColumns: 'repeat(4, 6rem)',
          gridTemplateRows: 'repeat(4, 6rem)',
        }}
      >
        {tiles.map(tile => (
          <div key={tile.id} style={{ gridColumn: tile.x + 1, gridRow: tile.y + 1 }}>
            <Tile value={tile.value} isNew={tile.isNew} justMerged={tile.justMerged} />
          </div>
        ))}
      </div>

      <button
        onClick={restart}
        className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg transition-all"
      >
        Restart
      </button>

      {gameOver && (
        <span className="text-white font-semibold text-lg mt-2">Game&nbsp;Over&nbsp;💀</span>
      )}
    </div>
  );
};

const keyToDir = (k: string): Direction | null => {
  switch (k) {
    case 'ArrowUp':
    case 'w':
    case 'W':
      return 'up';
    case 'ArrowDown':
    case 's':
    case 'S':
      return 'down';
    case 'ArrowLeft':
    case 'a':
    case 'A':
      return 'left';
    case 'ArrowRight':
    case 'd':
    case 'D':
      return 'right';
    default:
      return null;
  }
};

export default Game;