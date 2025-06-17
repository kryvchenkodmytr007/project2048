import { render, fireEvent } from '@testing-library/react';
import FinalScoreModal from '../src/components/FinalScoreModal';
import { ScoreProvider } from '../src/contexts/score';

it('закривається по ✕ та по кліку на бекдроп', () => {
  const onClose = vi.fn();
  const { getByLabelText, getByText } = render(
    <ScoreProvider>
      <FinalScoreModal onClose={onClose} />
    </ScoreProvider>,
  );

  fireEvent.click(getByLabelText(/close/i));
  expect(onClose).toHaveBeenCalledTimes(1);

  onClose.mockClear();
  const backdrop = getByText(/final score/i).parentElement!.parentElement!;
  fireEvent.click(backdrop);
  expect(onClose).toHaveBeenCalledTimes(1);
});
