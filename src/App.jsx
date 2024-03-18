import Player from "./components/players";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Tabs from "./components/tabs";
import { WINNING_COMBINATIONS } from "./winning.js";
import CheckResult from "./components/result.jsx";
const initailGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function handleActivePlayer(active) {
  let currentPlayer = "x";
  if (active.length > 0 && active[0].player === "x") {
    currentPlayer = "o";
  }
  return currentPlayer;
}
function App() {
  const [winnerName, setWinnerName] = useState({ x: "player1", o: "player2" });
  const [gameTurns, setGameTurns] = useState([]);

  const playerActive = handleActivePlayer(gameTurns);

  let gameBoard = [...initailGameBoard.map((val) => [...val])];

  function handleSelectedSqaure(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = handleActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSqaureSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const SecoundSqaureSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];
    if (
      firstSqaureSymbol &&
      firstSqaureSymbol === SecoundSqaureSymbol &&
      firstSqaureSymbol === thirdSquareSymbol
    ) {
      winner = winnerName[firstSqaureSymbol];
    }
  }
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleRestart() {
    setGameTurns([]);
  }

  function handleNameChange(symbol, newName) {
    setWinnerName((prevName) => {
      return {
        ...prevName,
        [symbol]: newName,
      };
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name="Player1"
            symbol="x"
            isActive={playerActive === "x"}
            nameChange={handleNameChange}
          />
          <Player
            name="Player2"
            symbol="o"
            isActive={playerActive === "o"}
            nameChange={handleNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <CheckResult winner={winner} result={handleRestart} />
        )}

        <GameBoard onSelectSquare={handleSelectedSqaure} board={gameBoard} />
      </div>

      <Tabs logMessage={gameTurns} />
    </main>
  );
}

export default App;
