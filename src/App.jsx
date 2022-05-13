import React, { useState } from "react";
import "./App.css";
import Item from "./components/Item";
import { useTicTac } from "./context/AppContext";

function App() {
  const { items, player, handleClick, result, reStart } = useTicTac();

  return (
    <>
      <h1>Tic Tac Game</h1>
      {result.winner ? (
        <h2>{result.text}</h2>
      ) : (
        <h2>Next player: {player ? "X" : "O"}</h2>
      )}
      <div
        className="container"
        style={{ background: result.winner ? "#F56D91" : null }}
      >
        {items.map((item, i) => (
          <Item
            key={i}
            value={item}
            player={player}
            handleClick={() => handleClick(i)}
          />
        ))}
      </div>
      {result.winner && (
        <button className="restart-btn" onClick={reStart}>
          Restart
        </button>
      )}
    </>
  );
}

export default App;
