import { render, fireEvent, screen } from '@testing-library/react';
import Game from '../src/components/Game';
import { ScoreProvider } from '../src/contexts/score';
import * as Core from '@project2048/core';

class FakeBoard extends Core.Board {
  constructor() {
    super([
      [2, 4, 2, 4],
      [4, 2, 4, 2],
      [2, 4, 2, 4],
      [4, 2, 4, 2],
    ] as unknown as number[][]);
  }
  override move(): boolean {
    return true;
  }
  override isGameOver(): boolean {
    return true;
  }
}

vi.spyOn(Core, 'Board').mockImplementation(() => new FakeBoard() as any);

it('показує Game Over після першого ходу, якщо дошка без рухів', () => {
  render(
    <ScoreProvider>
      <Game />
    </ScoreProvider>,
  );

  fireEvent.keyDown(window, { code: 'ArrowLeft' });

  expect(screen.getByText(/game over/i)).toBeInTheDocument();
});