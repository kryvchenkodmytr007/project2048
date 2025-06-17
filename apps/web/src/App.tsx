import Game from './components/Game';
import ScoreBadge from './components/ScoreBadge';
import { ScoreProvider } from './contexts/score';

export default function App() {
  return (
    <ScoreProvider>
      <ScoreBadge />
      <Game />
    </ScoreProvider>
  );
}
