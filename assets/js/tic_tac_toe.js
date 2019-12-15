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
  // Count Rounds
  const roundCounter = function() {
    let round = 0;
    return () => {
      
      round++;
      console.log(round);
      return round;
    }
  };

  // Event listener for clicking on board
  const controlGame = () => {
    let countRound = roundCounter();
    let round = countRound();

    
    let gridBoxes = document.querySelectorAll('.marker');

    // Add Event listener for each individual board square
    for (let i = 0; i < gridBoxes.length; i++) {
      gridBoxes[i].addEventListener("click", (e) => {
        if (gameBoard.getBoard()[i] == " ") {
          (round % 2 == 0) ? player1.addMarker(i) : player2.addMarker(i);
          round = countRound();
        }   
      });
    }
  }
  return { roundCounter, controlGame };
})();


