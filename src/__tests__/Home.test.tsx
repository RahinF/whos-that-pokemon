import Home from '@/pages/index';
import capitizeFirstLetter from '@/utils/capitizeFirstLetter';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Wrapper } from '../utils/Wrapper';

describe('Home', () => {
  test('heading renders', () => {
    render(
      <Wrapper>
        <Home />
      </Wrapper>
    );

    const headingText = `Who's that pokemon?`;
    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(headingText);
  });

  test('start button on click changes phase', async () => {
    const user = userEvent.setup();
    render(
      <Wrapper>
        <Home />
      </Wrapper>
    );

    const startButton = screen.getByRole('button', { name: /start game/i });
    expect(startButton).toBeInTheDocument();
    await new Promise((r) => setTimeout(r, 2000));
    await user.click(startButton);

    expect(startButton).not.toBeInTheDocument();
  });

  test('if pokemon is a silhouette when question is generated', async () => {
    const user = userEvent.setup();
    render(
      <Wrapper>
        <Home />
      </Wrapper>
    );

    const startButton = screen.getByRole('button', { name: /start game/i });
    expect(startButton).toBeInTheDocument();
    await new Promise((r) => setTimeout(r, 2000));
    await user.click(startButton);

    const pokemonImage = screen.getByRole('img');
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage).toHaveClass('brightness-0');
  });

  test('if score appears', async () => {
    const user = userEvent.setup();
    render(
      <Wrapper>
        <Home />
      </Wrapper>
    );

    const startButton = screen.getByRole('button', { name: /start game/i });
    expect(startButton).toBeInTheDocument();
    await user.click(startButton);

    const score = screen.getByText(/score: 0/i);
    expect(score).toBeInTheDocument();
  });

  test('if choices appear', async () => {
    const user = userEvent.setup();
    render(
      <Wrapper>
        <Home />
      </Wrapper>
    );

    const startButton = screen.getByRole('button', { name: /start game/i });
    expect(startButton).toBeInTheDocument();
    await new Promise((r) => setTimeout(r, 2000));
    await user.click(startButton);

    const choices = screen.getAllByRole('button');
    expect(choices).toHaveLength(4);
  });

  test('if correct answer is clicked correct answer and timer messages appears', async () => {
    const user = userEvent.setup();
    render(
      <Wrapper>
        <Home />
      </Wrapper>
    );

    const startButton = screen.getByRole('button', { name: /start game/i });
    expect(startButton).toBeInTheDocument();
    await new Promise((r) => setTimeout(r, 2000));
    await user.click(startButton);

    const correctAnswer = screen.getByRole('img').getAttribute('alt') as string;

    const choice = screen.getByRole('button', { name: correctAnswer });
    expect(choice).toBeInTheDocument();

    await user.click(choice);

    const correctAnswerMessage = screen.getByText(
      `Correct! It's ${capitizeFirstLetter(correctAnswer)}!`
    );
    expect(correctAnswerMessage).toBeInTheDocument();

    const timerMessage = screen.getByText('Next question in 3.');
    expect(timerMessage).toBeInTheDocument();
  });

  test('timer message countdowns every second', async () => {
    const user = userEvent.setup();
    render(
      <Wrapper>
        <Home />
      </Wrapper>
    );

    const startButton = screen.getByRole('button', { name: /start game/i });
    expect(startButton).toBeInTheDocument();
    await new Promise((r) => setTimeout(r, 2000));
    await user.click(startButton);

    const correctAnswer = screen.getByRole('img').getAttribute('alt') as string;

    const choice = screen.getByRole('button', { name: correctAnswer });
    expect(choice).toBeInTheDocument();

    await user.click(choice);

    const countdown3 = screen.getByText('Next question in 3.');
    expect(countdown3).toBeInTheDocument();

    await new Promise((r) => setTimeout(r, 1000));
    const countdown2 = await screen.findByText('Next question in 2.');
    expect(countdown2).toBeInTheDocument();

    await new Promise((r) => setTimeout(r, 1000));
    const countdown1 = await screen.findByText('Next question in 1.');
    expect(countdown1).toBeInTheDocument();
  }, 10000);

  test('score increases if answer is correct', async () => {
    const user = userEvent.setup();
    render(
      <Wrapper>
        <Home />
      </Wrapper>
    );

    const startButton = screen.getByRole('button', { name: /start game/i });
    expect(startButton).toBeInTheDocument();
    await new Promise((r) => setTimeout(r, 2000));
    await user.click(startButton);

    const correctAnswer = screen.getByRole('img').getAttribute('alt') as string;

    const choice = screen.getByRole('button', { name: correctAnswer });
    expect(choice).toBeInTheDocument();

    await user.click(choice);

    const score = screen.getByText(/score: 1/i);
    expect(score).toBeInTheDocument();
  });

  test('if next question appear if correct answer is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Wrapper>
        <Home />
      </Wrapper>
    );

    const startButton = screen.getByRole('button', { name: /start game/i });
    expect(startButton).toBeInTheDocument();
    await new Promise((r) => setTimeout(r, 2000));
    await user.click(startButton);

    const question1Answer = screen
      .getByRole('img')
      .getAttribute('alt') as string;

    const choice = screen.getByRole('button', { name: question1Answer });
    expect(choice).toBeInTheDocument();

    await user.click(choice);

    await new Promise((r) => setTimeout(r, 4000));

    const question2Answer = screen
      .getByRole('img')
      .getAttribute('alt') as string;

    expect(question1Answer).not.toEqual(question2Answer);
  }, 20000);

  test('wrong answer is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Wrapper>
        <Home />
      </Wrapper>
    );

    const startButton = screen.getByRole('button', { name: /start game/i });
    expect(startButton).toBeInTheDocument();
    await new Promise((r) => setTimeout(r, 2000));
    await user.click(startButton);

    const correctAnswer = screen.getByRole('img').getAttribute('alt') as string;

    const choices = screen.getAllByRole('button');
    expect(choices).toHaveLength(4);

    const wrongAnswers = choices
      .filter((choice) => choice.textContent !== correctAnswer)
      .map((choice) => choice.textContent);

    const wrongAnswer = wrongAnswers[0] as string;

    const wrongChoice = screen.getByRole('button', {
      name: wrongAnswer,
    });
    await user.click(wrongChoice);

    const wrongAnswerMessage = screen.getByText(
      `Incorrect! It's ${capitizeFirstLetter(correctAnswer)}!`
    );
    expect(wrongAnswerMessage).toBeInTheDocument();

    await new Promise((r) => setTimeout(r, 4000));

    const restartButton = screen.getByRole('button', { name: /restart game/i });
    expect(restartButton).toBeInTheDocument();
  }, 20000);
});