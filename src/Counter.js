import React, { useState, useRef } from "react";
import buttonClickSound from "./sound/button-click.mp3";
import completionSound from "./sound/completion-sound.mp3";

const Counter = () => {
  const [count, setCount] = useState(0);
  const [targetCount, setTargetCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const buttonClickAudioRef = useRef(null);
  const completionAudioRef = useRef(null);

  const handleIncrement = () => {
    if (count < targetCount || targetCount === 0) {
      setCount((prevCount) => {
        playSound(buttonClickAudioRef.current);
        vibrate();
        return prevCount + 1;
      });
    }
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount((prevCount) => {
        playSound(buttonClickAudioRef.current);
        vibrate();
        return prevCount - 1;
      });
    }
  };

  const handleReset = () => {
    setCount(0);
    // setTargetCount(0);
    setIsComplete(false);
  };

  const handleHardReset = () => {
    setCount(0);
    setTargetCount(0);
    setIsComplete(false);
  };

  const handleSetTargetCount = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setTargetCount(value);
      setIsComplete(false);
    }
  };

  const playSound = (audioElement) => {
    audioElement.currentTime = 0;
    audioElement.play();
  };

  const vibrate = () => {
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
  };

  // Check if the count matches the target count
  if (count === targetCount && targetCount !== 0 && !isComplete) {
    setIsComplete(true);
    playSound(completionAudioRef.current);
  }

  return (
    <div className="flex justify-center items-center p-4 min-h-screen">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mt-4 mb-8">Counter App</h1>
        {isComplete && (
          <div className="bg-green-200 text-green-800 p-4 my-3 rounded">
            Completed! <button onClick={handleHardReset}>Start new</button>
          </div>
        )}
        <div className="flex items-center my-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold  py-6 px-8 rounded"
            onClick={handleDecrement}
          >
            -
          </button>
          <span className="mx-6 text-xl font-bold">{count}</span>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-6 px-8 rounded"
            onClick={handleIncrement}
          >
            +
          </button>
        </div>
        <div className="flex flex-col mt-5">
          <input
            type="number"
            className="border border-gray-400 rounded py-2 px-4 mb-4"
            placeholder="Set target count"
            onChange={handleSetTargetCount}
            value={targetCount}
          />
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
      <audio ref={buttonClickAudioRef} src={buttonClickSound} />
      <audio ref={completionAudioRef} src={completionSound} />
    </div>
  );
};

export default Counter;
