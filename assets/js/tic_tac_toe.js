// Tic Tac Toe Gameboard
const gameBoard = (function() {
  const board = [];
  for (let i = 0; i < 9; i++) {
    board[i] = " ";
  }

  const getBoard = () => board;
  const displayBoard = function() {
    if (document.querySelector(".board") != null) {
      return;
    } else {
      let container = document.querySelector(".container");
      let board = document.createElement("div");
      board.classList.add("board");
  
      let tBoard = gameBoard.getBoard();
      for (let i = 0; i < 9; i++) {
        let boardGrid = document.createElement("div");
        boardGrid.classList.add("board-grid", `grid-${i}`);
    
        let gridContent = document.createElement("div");
        gridContent.classList.add("grid-content");
    
        let marker = document.createElement("div");
        marker.classList.add("marker");
        marker.textContent = tBoard[i];
    
        gridContent.appendChild(marker);
        boardGrid.appendChild(gridContent);
        board.appendChild(boardGrid);
        container.appendChild(board);
      }
    }
  }

  return { getBoard, displayBoard };
})();

// Player Factory Function
const Player = function(name, marker) {
  const getName = () => name;
  const getMarker = () => marker;
  const addMarker = (position) => {
    gameBoard.getBoard()[position] = marker;
    let gridPosition = document.querySelector(`.grid-${position} .marker`);
    gridPosition.textContent = gameBoard.getBoard()[position];
  }


  return { getName, getMarker, addMarker };
}

// Module to control the flow of the game itself
const displayController = (function() {
  let player1 = Player("Kevin", "O");
  let player2 = Player("Tim", "X");
  let countRound = roundCounter();
  let round = countRound();

  // Count Rounds
  function roundCounter() {
    let round = 0;
    return () => {
      
      round++;
      console.log(round);
      return round;
    }
  };

  // Event listener for clicking on board
  const controlGame = () => {

    // All grid squares
    let gridBoxes = document.querySelectorAll('.marker');

    // Add Event listener for each individual board square
    for (let i = 0; i < gridBoxes.length; i++) {
      gridBoxes[i].addEventListener("click", (e) => {
        if (gameBoard.getBoard()[i] == " ") {
          (round % 2 == 0) ? player1.addMarker(i) : player2.addMarker(i);
          round = countRound();
          let checkGameOverResult = checkGameOver();
          if (checkGameOverResult.hasOwnProperty('victoryCondition')) {
            console.log(checkGameOverResult);
          } else if (checkGameOverResult.hasOwnProperty('draw')) {
            console.log(checkGameOverResult);
          }
        }   
      });
    }
  }

  // Logic to check if game is over
  const checkGameOver = () => {
    let board = gameBoard.getBoard();
    // check horizontal victory conditions
    let checkVictory = horizontalVictory() || verticalVictory() || diagonalVictory();

    if (checkVictory) {
      return checkVictory;
    } else if (draw()) {
      return draw();
    } else {
      return {};
    }

    // function checkVictory() {
// 
    // }

    function horizontalVictory() {
      if (board[0] != " " && board[0] == board[1] && board[0] == board[2]) {
        return { marker: board[0], victoryCondition: "horizontal", start: 0 };
      } else if (board[3] != " " && board[3] == board[4] && board[3] == board[5]) {
        return { marker: board[3], victoryCondition: "horizontal", start: 3 };
      } else if (board[6] != " " && board[6] == board[7] && board[6] == board[8]) {
        return { marker: board[6], victoryCondition: "horizontal", start: 6 };
      }
      return false;
    }

    function verticalVictory() {
      if (board[0] != " " && board[0] == board[3] && board[0] == board[6]) {
        return { marker: board[0], victoryCondition: "vertical", start: 0 };
      } else if (board[1] != " " && board[1] == board[4] && board[1] == board[7]) {
        return { marker: board[1], victoryCondition: "vertical", start: 1 };
      } else if (board[2] != " " && board[2] == board[5] && board[2] == board[8]) {
        return { marker: board[2], victoryCondition: "vertical", start: 2 };
      }
      return false;
    }

    function diagonalVictory() {
      if (board[0] != " " && board[0] == board[4] && board[0] == board[8]) {
        return { marker: board[0], victoryCondition: "diagonal", start: 0 };
      } else if (board[2] != " " && board[2] == board[4] && board[2] == board[6]) {
        return { marker: board[2], victoryCondition: "diagonal", start: 2 };
      }
      return false;
    }

    function draw() {
      if (round == 10) {
        return { draw: "draw" };
      }
    }
  }

  return { roundCounter, controlGame };
})();


