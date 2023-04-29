import useGlobalContext from '@/context/GlobalContext';
import { FC } from 'react';
import Button from '../Button';

const Start: FC = () => {
  const { startGame } = useGlobalContext();

  return (
    <>
      <h2 className="mt-4 font-bold">Instructions</h2>

      <p>● Click the correct pokemon to get a point</p>

      <div className="mt-10 flex justify-center">
        <Button onClick={startGame}>start game</Button>
      </div>
    </>
  );
};

export default Start;
