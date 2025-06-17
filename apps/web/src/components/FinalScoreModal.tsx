import { X } from 'lucide-react';
import { useScore } from '../contexts/score';

interface Props {
  onClose: () => void;
}

const FinalScoreModal: React.FC<Props> = ({ onClose }) => {
  const { score } = useScore();

  const handleBackdrop = () => onClose();
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={handleBackdrop}
    >
      <div
        onClick={stop}
        className="relative max-w-xs rounded-xl bg-zinc-900 px-8 py-6 text-center shadow-2xl"
      >
        <button
          onClick={e => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute right-3 top-3 cursor-pointer rounded p-1 text-zinc-400 transition hover:text-zinc-100 focus:outline-none"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="mt-2 text-3xl font-extrabold text-rose-400">Game Over</h2>
        <p className="mt-4 text-lg">Final Score:</p>
        <p className="mt-1 text-4xl font-bold text-amber-400">{score}</p>
      </div>
    </div>
  );
};

export default FinalScoreModal;
