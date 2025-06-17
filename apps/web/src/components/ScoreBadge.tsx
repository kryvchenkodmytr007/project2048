import { useScore } from '../contexts/score';

const ScoreBadge = () => {
  const { score } = useScore();
  return (
    <div
      className="fixed top-4 right-4 select-none rounded bg-amber-500/90 px-4 py-1
                    font-bold text-zinc-50 shadow-lg"
    >
      Score: {score}
    </div>
  );
};

export default ScoreBadge;
