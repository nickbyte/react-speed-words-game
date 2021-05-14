import React, { useEffect, useState } from "react";
import Footer from "./components/Footer";
function App() {
  const [difficulty, setDifficulty] = useState(3);
  const [words, setWords] = useState([]);
  const [seconds, setSeconds] = useState(60);
  // 0: not started, 1: started, 2: ended;
  const [gameState, setGameState] = useState(0);
  const [error, setError] = useState(0);
  useEffect(() => {
    if (gameState == 1) {
      if (seconds > 0) {
        var clearTime = setTimeout(() => setSeconds(seconds - 1), 1000);
      } else {
        setGameState(2);
      }
    }
    return () => clearTimeout(clearTime);
  });
  const restartGame = (event) => {
    event.preventDefault();
    setGameState(1);
    setSeconds(60);
    setWords([]);
    setError(0);
  };
  const setGame = (event, level) => {
    event.preventDefault();
    setGameState(0);
    setDifficulty(level);
    setSeconds(60);
    setWords([]);
    setError(0);
  };
  const submitWord = (event) => {
    event.preventDefault();
    let word = event.target[0].value;
    if (word.length < difficulty) {
      setError(1);
      return false;
    }

    let url = "https://api.dictionaryapi.dev/api/v2/entries/en_US/" + word;
    fetch(url)
      .then((res) => res.json())
      .then((body) => {
        if (body.title == "No Definitions Found") {
          event.target[0].value = "";
          setError(1);
        } else {
          if (!words.includes(word)) {
            setWords([...words, word]);
            event.target[0].value = "";
            setError(0);
          } else {
            setError(1);
            event.target[0].value = "";
          }
        }
      });
  };
  return (
    <>
      <header className="max-w-lg mx-auto">
        <a href="#">
          <h1 className="text-4xl font-bold text-white text-center">
            Zuddl Words
          </h1>
        </a>
      </header>

      <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
        <section>
          <h3 className="font-bold text-2xl">How many words do you know?</h3>
          <p className="text-gray-600 pt-2">
            This game is simple, you need to type as much words as you know
            within a minute.
          </p>
        </section>

        <section className="mt-3">
          <div className="mb-3 pt-3 mx-auto w-auto items-center justify-center flex">
            <button
              onClick={(e) => setGame(e, 3)}
              className={` ${
                difficulty == 3
                  ? "bg-blue-500"
                  : "bg-blue-400 hover:bg-blue-500"
              } text-white font-semibold py-2 px-4`}
            >
              Easy
            </button>
            <button
              onClick={(e) => setGame(e, 4)}
              className={` ${
                difficulty == 4
                  ? "bg-blue-500"
                  : "bg-blue-400 hover:bg-blue-500"
              } text-white font-semibold py-2 px-4`}
            >
              Medium
            </button>
            <button
              onClick={(e) => setGame(e, 6)}
              className={` ${
                difficulty == 6
                  ? "bg-blue-500"
                  : "bg-blue-400 hover:bg-blue-500"
              } text-white font-semibold py-2 px-4`}
            >
              Hard
            </button>
            <button
              onClick={(e) => setGame(e, 8)}
              className={` ${
                difficulty == 8
                  ? "bg-blue-500"
                  : "bg-blue-400 hover:bg-blue-500"
              } text-white font-semibold py-2 px-4`}
            >
              Tharoor
            </button>
          </div>
          <div>
            <div className="flex items-center justify-center my-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mx-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {seconds > 0 && seconds + " Seconds"}
              {seconds == 0 && gameState == 2 && "Game Over"}
            </div>
            {(gameState == 1 || gameState == 2) && (
              <h2 className="text-2xl bg-green-400 text-white px-6 py-6 m-auto w-20 text-center">
                {words.length}
              </h2>
            )}
            <div className="flex items-center justify-center my-4">
              <p className="block mr-3">
                Minimum Letters:
                <span className="font-bold ml-1">{difficulty}</span>
              </p>
              <p className="block ml-3">
                Difficulty Level:
                <span className="font-bold ml-1">
                  {difficulty == 3 && "Easy"}
                  {difficulty == 4 && "Medium"}
                  {difficulty == 6 && "Hard"}
                  {difficulty == 8 && "Tharoor"}
                </span>
              </p>
            </div>
          </div>
          <div className="mb-3 pt-3 mx-auto w-auto items-center justify-center flex">
            {gameState == 0 && (
              <button
                onClick={() => setGameState(1)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-6 rounded mx-auto w-1/2"
              >
                START GAME
              </button>
            )}
            {gameState == 2 && (
              <button
                onClick={restartGame}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-6 rounded mx-auto w-1/2"
              >
                RESTART GAME
              </button>
            )}
          </div>
          {gameState == 1 && (
            <form autocomplete="off" onSubmit={submitWord}>
              <div className="mb-3 pt-3 rounded bg-gray-200 relative">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 ml-3"
                  htmlFor="word"
                >
                  Enter a word
                </label>
                <input
                  type="text"
                  id="word"
                  className={`bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 ${
                    error ? "border-red-600" : "border-purple-600"
                  }  px-3 pb-3`}
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 -bottom-4 right-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 transform rotate-90"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
            </form>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
