import React, { useContext, createContext, useState } from "react";
import { Results } from "../result/Results";

export const TicTacContext = createContext();

export const useTicTac = () => {
  return useContext(TicTacContext);
};

export const TicTacProvider = ({ children }) => {
  const [items, setItems] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState(true);
  const [result, setResult] = useState({ winner: false, text: "" });

  const handleClick = (index) => {
    const chooseItem = items.slice();

    if (chooseItem[index] === null) {
      chooseItem[index] = player ? "X" : "O";
      setItems(chooseItem);
      setPlayer(!player);
    } else {
      alert("This box cannot be checked.");
      return;
    }
    checkWin(chooseItem);
    checkTie(chooseItem);
  };

  const checkWin = (chooseItem) => {
    Results.forEach((val, i) => {
      const [a, b, c] = Results[i];
      if (
        chooseItem[a] &&
        chooseItem[b] === chooseItem[c] &&
        chooseItem[a] === chooseItem[c]
      ) {
        //* console.log("win");
        setResult({ winner: true, text: `${chooseItem[a]} is Winner` });
        return chooseItem[a];
      }
      return;
    });
  };

  const checkTie = (chooseItem) => {
    const res = chooseItem.every((value) => value !== null);
    if (res) {
      setResult({ winner: true, text: "No player wins" });
      return;
    }
  };

  const reStart = () => {
    setItems(Array(9).fill(null));
    setPlayer(true);
    setResult({ winner: false, text: "" });
  };

  return (
    <TicTacContext.Provider
      value={{
        items,
        setItems,
        player,
        setPlayer,
        handleClick,
        result,
        reStart,
      }}
    >
      {children}
    </TicTacContext.Provider>
  );
};
