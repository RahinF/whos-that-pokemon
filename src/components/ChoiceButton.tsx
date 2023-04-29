import useGlobalContext from '@/context/GlobalContext';
import { PokemonItem } from '@/gql/graphql';
import clsx from 'clsx';
import { FC, useEffect, useState } from 'react';

interface Props {
  pokemon: PokemonItem;
}

const genders = {
  male: '♂',
  female: '♀',
  none: '',
};

const ChoiceButton: FC<Props> = ({ pokemon }) => {
  const { currentPokemon, checkAnswer, disableChoices, revealAnswer } =
    useGlobalContext();

  const showCorrectPokemon = currentPokemon?.id === pokemon.id && revealAnswer;

  const [name, setName] = useState<string>('');
  const [gender, setGender] = useState<string>(genders.none);

  useEffect(() => {
    if (pokemon !== null || pokemon !== undefined) {
      const name = pokemon.name as string;

      if (name.includes('-')) {
        const nameWithoutGender = name.split('-')[0];
        const gender = name.split('-')[1];

        switch (gender) {
          case 'm':
            setGender(genders.male);
            break;

          case 'f':
            setGender(genders.female);
            break;

          default:
            return setName(name);
        }

        setName(nameWithoutGender);
      } else {
        setName(name);
      }
    }
  }, [pokemon]);

  return (
    <button
      className={clsx(
        'grid place-items-center rounded-2xl border px-8 py-2 transition',
        {
          'bg-green-400': showCorrectPokemon,
          'hover:bg-rose-400 hover:text-white': !disableChoices,
        }
      )}
      onClick={() => checkAnswer(pokemon)}
      disabled={disableChoices}
    >
      <span className="capitalize">
        {name}
        {gender !== genders.none && <span>{gender}</span>}
      </span>
    </button>
  );
};

export default ChoiceButton;
