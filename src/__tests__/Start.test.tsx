import Start from '@/components/phases/Start';
import { render, screen } from '@testing-library/react';
import { Wrapper } from '../utils/Wrapper';

describe('Start', () => {
  test('component renders', () => {
    render(
      <Wrapper>
        <Start />
      </Wrapper>
    );

    const startButton = screen.getByRole('button', { name: /start game/i });
    const heading = screen.getByRole('heading', { level: 2 });

    expect(startButton).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
  });
});
