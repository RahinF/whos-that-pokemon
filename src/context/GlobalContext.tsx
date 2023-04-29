import { Pokemon, PokemonItem } from '@/gql/graphql';
import useBrightness from '@/hooks/useBrightness';
import { LIMIT, OFFSET, usePokemon } from '@/hooks/usePokemon';
import useTimer from '@/hooks/useTimer';
import shuffleArray from '@/utils/shuffleArray';
import {
  FC,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

interface ContextProps {
  answerStatus: AnswerStatus;
  brightness: boolean;
  checkAnswer: (selectedPokemon: PokemonItem) => void;
  choices: PokemonItem[] | [];
  currentPokemon?: PokemonItem;
  disableChoices: boolean;
  phase: Phase;
  revealAnswer: boolean;
  score: number;
  startGame: () => void;
  timer: number;
  timerOn: boolean;
}

interface ProviderProps {
  children: React.ReactNode;
}

type AnswerStatus = 'correct' | 'incorrect' | 'no answer';
type Phase = 'start' | 'playing' | 'end';

type AllPokemon = PokemonItem[];
type Choices = PokemonItem[] | [];

const NUM_OF_CHOICES: number = 4;
const TIMER_INITIAL_VALUE: number = 3;

const GlobalContext = createContext<ContextProps | undefined>(undefined);

const GlobalContextProvider: FC<ProviderProps> = ({ children }) => {
  const { isSuccess, data } = usePokemon(LIMIT, OFFSET);

  const [phase, setPhase] = useState<Phase>('start');
  const [score, setScore] = useState<number>(0);

  const [allPokemon, setAllPokemon] = useState<AllPokemon>();
  const [selectablePokemon, setSelectablePokemon] = useState<AllPokemon>();
  const [currentPokemon, setCurrentPokemon] = useState<PokemonItem>();

  const [choices, setChoices] = useState<Choices>([]);
  const [disableChoices, setDisableChoices] = useState<boolean>(false);

  const [revealAnswer, setRevealAnswer] = useState<boolean>(false);
  const [answerStatus, setAnswerStatus] = useState<AnswerStatus>('no answer');

  const { timer, timerOn, turnTimerOn, turnTimerOff, resetTimer } =
    useTimer(TIMER_INITIAL_VALUE);

  const { brightness, brightnessOn, brightnessOff } = useBrightness();

  function getRandomFromArray(array: any[]) {
    const length = array === null ? 0 : array.length;
    return length ? array[Math.floor(Math.random() * length)] : undefined;
  }

  function removeFromSelectablePokemon(randomPokemon: Pokemon) {
    setSelectablePokemon((allPokemon) =>
      allPokemon?.filter((pokemon) => pokemon !== randomPokemon)
    );
  }

  const generateChoices = useCallback(
    (randomPokemon: Pokemon) => {
      setDisableChoices(false);
      brightnessOff();
      let selectablePokemon = allPokemon?.filter(
        (pokemon) => pokemon !== randomPokemon
      );

      if (selectablePokemon === undefined) return;

      const choices = [];

      choices.push(randomPokemon);

      for (let index = 0; choices.length <= NUM_OF_CHOICES - 1; index++) {
        const random = getRandomFromArray(selectablePokemon);
        selectablePokemon = selectablePokemon?.filter(
          (pokemon) => pokemon !== random
        );
        choices.push(random);
      }
      const shuffledChoices = shuffleArray(choices);
      setChoices(shuffledChoices);
    },
    [allPokemon, brightnessOff]
  );

  const generateQuestion = useCallback(() => {
    setAnswerStatus('no answer');
    brightnessOff();
    setRevealAnswer(false);

    if (selectablePokemon?.length === 0) {
      return setPhase('end');
    }

    if (selectablePokemon === undefined) return;
    if (selectablePokemon === null) return;

    // select random pokemon
    const randomPokemon = getRandomFromArray(selectablePokemon);
    setCurrentPokemon(randomPokemon);
    removeFromSelectablePokemon(randomPokemon);

    generateChoices(randomPokemon);
  }, [generateChoices, selectablePokemon, brightnessOff]);

  function startGame() {
    setScore(0);
    setPhase('playing');
    generateQuestion();
  }

  function checkAnswer(selectedPokemon: PokemonItem) {
    const correctAnswer = selectedPokemon.id === currentPokemon?.id;

    setAnswerStatus(correctAnswer ? 'correct' : 'incorrect');
    setDisableChoices(true);
    setRevealAnswer(true);
    brightnessOn();

    if (correctAnswer) {
      setScore((score) => score + 1);
    }

    turnTimerOn();
  }

  useEffect(() => {
    if (timer === 0) {
      if (answerStatus === 'correct') {
        generateQuestion();
      } else if (answerStatus === 'incorrect') {
        setPhase('end');
      }

      turnTimerOff();
      resetTimer(TIMER_INITIAL_VALUE);
    }
  }, [timer, turnTimerOff, resetTimer, answerStatus, generateQuestion]);

  useEffect(() => {
    if (isSuccess) {
      setAllPokemon(data.pokemons?.results as PokemonItem[]);
      setSelectablePokemon(data.pokemons?.results as PokemonItem[]);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (phase === 'end') {
      setSelectablePokemon(allPokemon);
    }
  }, [phase, allPokemon]);

  const value = {
    answerStatus,
    brightness,
    checkAnswer,
    choices,
    currentPokemon,
    disableChoices,
    phase,
    revealAnswer,
    score,
    startGame,
    timer,
    timerOn,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error(
      'useGlobalHook must be used within a GlobalContextProvider.'
    );
  }

  return context;
};

export default useGlobalContext;
export { GlobalContextProvider };
