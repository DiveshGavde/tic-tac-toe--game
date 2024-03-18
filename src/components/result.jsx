export default function CheckResult({ winner, result }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner && <p> {winner} won!</p>}
      {!winner && <p>it's a draw</p>}
      <button onClick={result}>Rematch</button>
    </div>
  );
}
