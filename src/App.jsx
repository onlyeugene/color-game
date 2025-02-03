import ColorGame from "./ColorGame";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 drop-shadow-lg" data-testid="gameInstructions">
        🎨 Guess the Correct Color!
      </h1>
      <ColorGame />
    </div>
  );
}

export default App;