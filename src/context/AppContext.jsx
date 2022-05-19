import React, { useContext, createContext, useState } from "react";
import { Results } from "../result/Results";

export const TicTacContext = createContext();

export const useTicTac = () => {
  return useContext(TicTacContext);
};

export const TicTacProvider = ({ children }) => {
  const [items, setItems] = useState(Array(9).fill(null));
  const [result, setResult] = useState({ winner: false, text: "" });
  const [player, setPlayer] = useState(() => {
    const randomNum = Math.floor(Math.random() * 2);
    randomNum === 0 ? true : false;
  });

  const handleClick = (index) => {
    const chooseItem = items.slice();

    if (chooseItem[index] === null) {
      chooseItem[index] = player ? "X" : "O";
      setItems(chooseItem);
      setPlayer(!player);
    } else {
      alert("This box cannot be checked.");
    }
    checkWin(chooseItem);
  };

  const checkWin = (chooseItem) => {
    Results.forEach((_, i) => {
      const [a, b, c] = Results[i];

      if (
        chooseItem[a] &&
        chooseItem[a] === chooseItem[b] &&
        chooseItem[a] === chooseItem[c]
      ) {
        setResult({ winner: true, text: `${chooseItem[a]} is Winner` });
        return chooseItem[a];
      } else if (chooseItem.every((item) => item !== null)) {
        setResult({ winner: true, text: "No player wins" });
      } else {
        return null;
      }
    });
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
