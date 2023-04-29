import useGlobalContext from '@/context/GlobalContext';
import { FC } from 'react';
import Button from '../Button';

const End: FC = () => {
  const { score, startGame } = useGlobalContext();
  return (
    <>
      <div className="mt-10 flex flex-col items-center gap-8">
        <p>Score: {score}</p>
        <Button onClick={startGame}>restart game</Button>
      </div>
    </>
  );
};

export default End;
