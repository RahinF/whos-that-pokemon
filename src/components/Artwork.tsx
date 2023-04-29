import useGlobalContext from '@/context/GlobalContext';
import clsx from 'clsx';
import Image from 'next/image';
import { FC } from 'react';

const Artwork: FC = () => {
  const { brightness, currentPokemon } = useGlobalContext();

  if (currentPokemon === undefined) return null;

  let artwork = currentPokemon.artwork as string;
  let name = currentPokemon.name as string;

  return (
    <Image
      src={artwork}
      alt={name}
      width={150}
      height={150}
      className={clsx('self-center', {
        'brightness-100': brightness,
        'brightness-0': !brightness,
      })}
    />
  );
};

export default Artwork;
