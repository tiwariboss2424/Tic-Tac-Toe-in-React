import React, { useState } from "react";
import Box from "./box";
import "./Box.css";
const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("X");
  const [gameOver, setGameOver] = useState(false);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const handleOnClick = (index) => {
    // console.log(index);
    if (board[index] || gameOver) return;
    let newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);

    let Winner = CalculateWinner(newBoard);
    if (Winner) {
      setGameOver(true);
      alert(`Player ${Winner} Won the Round `);
    } else if (!newBoard.includes(null)) {
      setGameOver(true);
      alert("The Game is Draw ");
    } else {
      setPlayer(player === "X" ? "O" : "X");
    }
    setHistory([...history, newBoard]);
  };
  const CalculateWinner = (square) => {
    const cases = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < cases.length; i++) {
      const [a, b, c] = cases[i];
      if (square[a] && square[a] === square[b] && square[a] === square[c]) {
        return square[a];
      }
    }
    return null;
  };
  const ResetBtn = () => {
    setBoard(Array(9).fill(null));
    setPlayer("X");
    setGameOver(false);
  };

  const moves = history.map((step, move) => {
    const desc = move ? `Go to move #${move} ` : `Go to game Start `;
    return (
      <li key={move}>
        <button
          className="undobtn"
          onClick={() => {
            jumpToStep(move);
          }}
        >
          {desc}
        </button>
      </li>
    );
  });
  const jumpToStep = (step) => {
    // console.log(move);
    setBoard(history[step]);
    setGameOver(false);
    setHistory(history.slice(0, step + 1));
  };

  return (
    <>
      <div style={{ background: "black", color: "white", padding: "0.3px" }}>
        <h1>Tic Tac Toe Game</h1>
      </div>
      <br />
      <div className="board">
        {board.map((val, index) => {
          return (
            <Box
              value={val}
              key={index}
              index={index}
              clickBtn={handleOnClick}
            />
          );
        })}
      </div>
      <button className="reset" onClick={ResetBtn}>
        {" "}
        Reset{" "}
      </button>
      <ol>{moves}</ol>
    </>
  );
};
export default TicTacToe;
