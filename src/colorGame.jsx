import { useState, useEffect } from "react";

const colors = ["red", "blue", "green", "yellow", "purple", "orange"];

const ColorGame = () => {
  const [targetColor, setTargetColor] = useState("");
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [shuffledColors, setShuffledColors] = useState([]);
  const [gameFinished, setGameFinished] = useState(false); // State to track if the game is finished
  const [fadeOut, setFadeOut] = useState(false); // State for fade-out effect

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    setMessage("");
    setGameFinished(false); // Reset gameFinished when starting a new game
    setFadeOut(false); // Reset fadeOut state
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setTargetColor(randomColor);
    setShuffledColors([...colors].sort(() => Math.random() - 0.5));
  };

  const handleGuess = (color) => {
    if (gameFinished) return; // Prevent further actions if the game is finished

    setGameFinished(true); // End the game after a guess is made

    if (color === targetColor) {
      setMessage("🎉 Correct! Well done!");
      setScore(score + 1);
    } else {
      setMessage("❌ Wrong! Try again.");
    }

    // Start a new game after a guess (right or wrong)
    setFadeOut(true); // Trigger fade-out effect
    setTimeout(() => {
      startNewGame();
    }, 1000); // 1-second delay before resetting the game
  };

  const handleReset =() => {
    startNewGame();
    setScore(0)
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-xl text-center w-80 sm:w-96">
      {/* Color Box with Fade-out Effect */}
      <div 
        id="colorBox"
        data-testid="colorBox"
        className={`w-32 h-32 mx-auto mb-6 border-4 border-black rounded-lg transition-all duration-300 ${fadeOut ? "animate-fade-out" : ""}`}
        style={{ backgroundColor: targetColor }}
      ></div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {shuffledColors.map((color, index) => (
          <button
            key={index}
            className="w-16 h-16 md:w-20 md:h-20 rounded-full shadow-lg transition transform hover:scale-110 hover:ring-4 hover:ring-white"
            data-testid="colorOption"
            style={{ backgroundColor: color }}
            onClick={() => handleGuess(color)}
            disabled={gameFinished} // Disable button if the game is finished
          ></button>
        ))}
      </div>

      <p 
        id="gameStatus"
        data-testid="gameStatus"
        className={`text-lg font-semibold mb-3 transition-opacity duration-500 ${
          message.includes("Correct") ? "text-green-500 animate-bounce" : "text-red-500"
        }`}
      >
        {message}
      </p>

      <p id="score" data-testid="score" className="text-lg font-bold text-gray-700">
        Score: <span className="text-indigo-600">{score}</span>
      </p>

     <div className=" space-x-2 flex md:flex-row flex-col items-center justify-center">
     <button
        id="newGameButton"
        data-testid="newGameButton"
        onClick={startNewGame}
        className="mt-5 bg-indigo-600 hover:bg-indigo-800 text-white py-2 px-6 rounded-lg text-lg shadow-lg transition-transform hover:scale-105"
      >
        🔄 New Game
      </button>
      <button
        id="resetGameButton"
        data-testid="resetGameButton"
        onClick={handleReset}
        className="mt-5 bg-indigo-600 hover:bg-indigo-800 text-white py-2 px-6 rounded-lg text-lg shadow-lg transition-transform hover:scale-105"
      >
        🔄 Reset Game
      </button>
     </div>
    </div>
  );
};

export default ColorGame;
