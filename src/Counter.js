import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  const [targetCount, setTargetCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const handleIncrement = () => {
    if (count < targetCount) {
      setCount(count + 1);
    }
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const handleReset = () => {
    setCount(0);
    setIsComplete(false);
  };

  const handleSetTargetCount = (e) => {
    const value = parseInt(e.target.value);
    console.log("tesing : ", e.target.value);
    setTargetCount(value);
    setIsComplete(false);
  };

  // Check if the count matches the target count
  if (count === targetCount && targetCount !== 0 && !isComplete) {
    setIsComplete(true);
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Counter App</h1>
      {isComplete && (
        <div className="bg-green-200 text-green-800 p-4 my-3 rounded">
          Completed! <button onClick={handleReset}>Start new</button>
        </div>
      )}
      <div className="flex items-center mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleDecrement}
        >
          -
        </button>
        <span className="mx-4 text-xl font-bold">{count}</span>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleIncrement}
        >
          +
        </button>
      </div>
      <div className="flex items-center mb-4">
        <input
          type="number"
          className="border border-gray-400 rounded py-2 px-4 mr-4"
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
  );
};

export default Counter;
