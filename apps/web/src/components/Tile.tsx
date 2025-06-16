import clsx from "clsx";

interface TileProps {
  value: number;
  isNew?: boolean;
  justMerged?: boolean;
}

const Tile = ({ value, isNew, justMerged }: TileProps) => (
  <div
    className={clsx(
      "absolute inset-0 flex items-center justify-center rounded-lg transition-[transform,background-color] duration-75",
      `bg-tile-${value} tile-text`,
      isNew && "animate-spawn",
      justMerged && "animate-bump"
    )}
  >
    {value}
  </div>
);

export default Tile;