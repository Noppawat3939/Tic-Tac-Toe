import React from "react";
import { useTicTac } from "../context/AppContext";

function Item({ value, handleClick }) {
  const { result } = useTicTac();

  return (
    <button
      onClick={handleClick}
      className="item"
      style={{
        pointerEvents: result.winner ? "none" : "auto",
      }}
    >
      {value}
    </button>
  );
}

export default Item;
