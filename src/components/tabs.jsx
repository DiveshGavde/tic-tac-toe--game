export default function Tabs({ logMessage }) {
  return (
    <ol id="log">
      {logMessage.map((turn, index) => (
        <li key={index}>
          {turn.player} selected {turn.square.row}
        </li>
      ))}
    </ol>
  );
}
