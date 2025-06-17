import { renderHook, act } from '@testing-library/react';
import { ScoreProvider, useScore } from '../src/contexts/score';

describe('ScoreContext', () => {
  it('add() збільшує, а reset() скидає рахунок', () => {
    const { result } = renderHook(() => useScore(), {
      wrapper: ScoreProvider,
    });

    act(() => result.current.add(64));
    expect(result.current.score).toBe(64);

    act(() => result.current.reset());
    expect(result.current.score).toBe(0);
  });
});