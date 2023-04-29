import { useState } from 'react';

const useBrightness = () => {
  const [brightness, setBrightness] = useState<boolean>(false);

  function brightnessOn() {
    setBrightness(true);
  }

  function brightnessOff() {
    setBrightness(false);
  }

  return { brightness, brightnessOn, brightnessOff };
};

export default useBrightness;
