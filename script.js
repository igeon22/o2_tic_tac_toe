let gameBoard = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
let gameBoardDom = document.querySelectorAll(".case");
let resetBtn = document.querySelector(".reset");

const Player = function (name, marker, actualTurn) {
  let score = 0;
  function setScore() {
    score += 1;
  }

  function getScore() {
    return score;
  }
  return { setScore, getScore };
};

const getMarker = function (t) {
  if (t % 2 === 0) {
    return "X";
  } else {
    return "O";
  }
};

const newGame = function () {
  for (let i = 0; i < gameBoardDom.length; i++) {
    gameBoard[i] = gameBoardDom[i].innerHTML;
  }

  let player1 = Player("Player 1", "X");
  let player2 = Player("Player 2", "O");
  let finished = false;

  const resetGame = function () {
    gameBoardDom.forEach((board) => {
      board.textContent = "";
    });

    for (let i = 0; i < gameBoardDom.length; i++) {
      gameBoard[i] = gameBoardDom[i].innerHTML;
    }

    finished = false;
  };

  gameBoardDom.forEach((p) => {
    p.addEventListener("click", () => {
      if (p.textContent === "" && finished === false) {
        let t = checkTurn();
        p.textContent += getMarker(t);
        for (let i = 0; i < gameBoardDom.length; i++) {
          gameBoard[i] = gameBoardDom[i].innerHTML;
        }
        let winner = gameStateCheck();
        a = checkTurn();
        if (winner != "none" || a >= 9) {
          wins(winner, player1, player2, a);
          finished = true;
          document.querySelector(
            ".win"
          ).textContent = `X: ${player1.getScore()} || O: ${player2.getScore()}`;
        }
      }
    });
  });

  resetBtn.addEventListener("click", () => {
    resetGame();
  });

  const gameStateCheck = function () {
    const winningComb = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    let winner = "none";

    winningComb.forEach((comb) => {
      if (
        gameBoard[comb[0]] === gameBoard[comb[1]] &&
        gameBoard[comb[1]] === gameBoard[comb[2]]
      ) {
        if (gameBoard[comb[0]] != "") {
          winner = gameBoard[comb[0]];
        }
      }
    });

    return winner;
  };

  const wins = function (winner, player1, player2, turn) {
    if (winner === "X") {
      player1.setScore();
    } else if (winner === "O") {
      player2.setScore();
    } else if (turn >= 9) {
      alert("It's a tie!");
    }
  };

  const checkTurn = function () {
    let turn = 0;
    gameBoard.forEach((place) => {
      if (place != "") {
        turn += 1;
      }
    });
    return turn;
  };
};

newGame();
