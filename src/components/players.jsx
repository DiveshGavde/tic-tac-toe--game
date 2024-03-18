import { useState } from "react";

export default function Player({ name, symbol, isActive, nameChange }) {
  const [playerName, changePlayerName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);
  function onSelect() {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      nameChange(symbol, playerName);
    }
  }

  function handleChange(e) {
    changePlayerName(e.target.value);
  }

  let setPlayers = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    setPlayers = (
      <input type="text" required value={playerName} onChange={handleChange} />
    );
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {setPlayers}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={onSelect}>{isEditing ? "save" : "edit"}</button>
    </li>
  );
}
