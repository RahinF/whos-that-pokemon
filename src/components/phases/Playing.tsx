import Artwork from '@/components/Artwork';
import ChoiceButton from '@/components/ChoiceButton';
import useGlobalContext from '@/context/GlobalContext';
import capitizeFirstLetter from '@/utils/capitizeFirstLetter';
import { FC } from 'react';

const Playing: FC = () => {
  const { answerStatus, choices, currentPokemon, score, timer, timerOn } =
    useGlobalContext();

  return (
    <div className="flex flex-col gap-10">
      <p>Score: {score}</p>

      {currentPokemon && (
        <div className="flex flex-col gap-6">
          <Artwork />

          <div className="grid grid-cols-2 gap-4">
            {choices.map((pokemon) => (
              <ChoiceButton
                key={pokemon.id}
                pokemon={pokemon}
              />
            ))}
          </div>

          <div className="flex h-10 flex-col items-center">
            {answerStatus === 'correct' && (
              <p>
                Correct! It&apos;s{' '}
                {capitizeFirstLetter(currentPokemon.name as string)}!
              </p>
            )}

            {answerStatus === 'incorrect' && (
              <p>
                Incorrect! It&apos;s{' '}
                {capitizeFirstLetter(currentPokemon.name as string)}!
              </p>
            )}

            {timerOn && answerStatus === 'correct' && (
              <p>Next question in {timer}.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Playing;
