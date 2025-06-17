import { createContext, useContext, useState } from 'react';

type ScoreCtx = { score: number; add: (delta: number) => void; reset: () => void };

const ScoreContext = createContext<ScoreCtx | null>(null);

export const ScoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [score, setScore] = useState(0);

  const add = (d: number) => setScore(s => s + d);
  const reset = () => setScore(0);

  return <ScoreContext.Provider value={{ score, add, reset }}>{children}</ScoreContext.Provider>;
};

export const useScore = () => {
  const ctx = useContext(ScoreContext);
  if (!ctx) throw new Error('useScore must be used inside <ScoreProvider>');
  return ctx;
};
