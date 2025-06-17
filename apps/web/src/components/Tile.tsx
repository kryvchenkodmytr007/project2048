import clsx from 'clsx';

interface TileProps {
  value: number;
  isNew?: boolean;
  justMerged?: boolean;
}

const Tile = ({ value, isNew, justMerged }: TileProps) => {
  const bg   = `bg-tile-${value}`;
  const text = value <= 4 ? 'text-zinc-800' : 'text-white';

  return (
    <div
      className={clsx(
        'w-24 h-24 flex items-center justify-center rounded-lg',
        'transition-all duration-100 tile-text',
        bg, text,
        isNew && 'animate-spawn',
        justMerged && 'animate-bump'
      )}
    >
      {value}
    </div>
  );
};

export default Tile;
