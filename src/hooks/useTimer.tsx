import { useEffect, useState } from 'react';

const useTimer = (initialValue: number) => {
  const [timer, setTimer] = useState<number>(initialValue);
  const [timerOn, setTimerOn] = useState<boolean>(false);

  function turnTimerOn() {
    setTimerOn(true);
  }

  function turnTimerOff() {
    setTimerOn(false);
  }

  function resetTimer(value: number) {
    setTimer(value);
  }

  useEffect(() => {
    let intervalID: string | number | NodeJS.Timer | undefined = undefined;

    if (timerOn) {
      intervalID = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalID);
    };
  }, [timer, timerOn]);

  return { timer, timerOn, turnTimerOn, turnTimerOff, resetTimer };
};

export default useTimer;
