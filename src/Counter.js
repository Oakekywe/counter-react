import React, { useState, useRef, useEffect } from "react";
import buttonClickSound from "./sound/button-click.mp3";
import completionSound from "./sound/completion-sound.mp3";
import { FaPlay, FaStop } from "react-icons/fa";

const Counter = () => {
  const [count, setCount] = useState(0);
  const [targetCount, setTargetCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const buttonClickAudioRef = useRef(null);
  const completionAudioRef = useRef(null);

  const [isPlay, setIsPlay] = useState(false);
  const [intervalDuration, setIntervalDuration] = useState(400);

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
  useEffect(() => {
    if (count === targetCount && targetCount !== 0 && !isComplete) {
      setIsComplete(true);
      setIsPlay(false);
      playSound(completionAudioRef.current);
    }
  }, [count, targetCount, isComplete]);

  // Play
  const onPressPlay = () => {
    setIsPlay((prev) => !prev);
  };

  useEffect(() => {
    let intervalId;
    if (isPlay) {
      intervalId = setInterval(handleIncrement, intervalDuration); // Run handleIncrement every 0.5 seconds
    } else if (!isPlay && intervalId) {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId); // Cleanup interval on component unmount or when isPlay changes
  }, [isPlay]);

  return (
    <div className="flex justify-center bg-gray-800 items-center p-4 min-h-screen">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl text-white font-bold mt-4 mb-8">COUNTER</h1>
        {isComplete && (
          <div className="bg-green-200 text-green-800 p-4 my-3 rounded">
            Completed! <button onClick={handleHardReset}>Start new</button>
          </div>
        )}
        <div className="flex items-center my-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold  py-6 px-8 rounded"
            disabled={isPlay}
            onClick={handleDecrement}
          >
            -
          </button>
          <span className="mx-8 text-xl text-white font-bold">{count}</span>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-6 px-8 rounded"
            disabled={isPlay}
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
            disabled={isPlay}
          />
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            disabled={isPlay}
            onClick={handleReset}
          >
            Reset
          </button>

          <div className="my-6">
            <div className="my-6">
              <button
                className={`${
                  intervalDuration === 400
                    ? "bg-gray-700"
                    : "bg-gray-500 hover:bg-gray-700"
                } text-white py-2 px-4 rounded mr-1`}
                disabled={isPlay}
                onClick={() => setIntervalDuration(400)}
              >
                0.4 sec
              </button>
              <button
                className={`${
                  intervalDuration === 600
                    ? "bg-gray-700"
                    : "bg-gray-500 hover:bg-gray-700"
                } text-white py-2 px-4 rounded mx-1`}
                disabled={isPlay}
                onClick={() => setIntervalDuration(600)}
              >
                0.6 sec
              </button>
              <button
                className={`${
                  intervalDuration === 1000
                    ? "bg-gray-700"
                    : "bg-gray-500 hover:bg-gray-700"
                } text-white py-2 px-4 rounded ml-1`}
                disabled={isPlay}
                onClick={() => setIntervalDuration(1000)}
              >
                1 sec
              </button>
            </div>
            <div className="my-6 flex justify-between items-center">
              <button
                className={`${
                  intervalDuration === 1500
                    ? "bg-gray-700"
                    : "bg-gray-500 hover:bg-gray-700"
                } text-white py-2 px-4 rounded mr-1`}
                disabled={isPlay}
                onClick={() => setIntervalDuration(1500)}
              >
                1.5 sec
              </button>
              <button
                className={`${
                  !isPlay
                    ? "bg-blue-500 hover:bg-blue-700"
                    : "bg-red-500 hover:bg-red-700"
                } text-white py-4 px-5 rounded`}
                onClick={onPressPlay}
              >
                {!isPlay ? <FaPlay /> : <FaStop />}
              </button>
            </div>
          </div>
        </div>
      </div>
      <audio ref={buttonClickAudioRef} src={buttonClickSound} />
      <audio ref={completionAudioRef} src={completionSound} />
    </div>
  );
};

export default Counter;
