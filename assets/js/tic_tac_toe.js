// Tic Tac Toe Gameboard
const gameBoard = (function() {
  const board = [];
  for (let i = 0; i < 9; i++) {
    board[i] = "X";
  }

  const getBoard = () => board;

  return { getBoard };
})();

// Player Factory Function
const Player = function(name, marker) {
  const getName = () => name;
  const getMarker = () => marker;
  return { getName, getMarker };
}

// Module to control the flow of the game itself
const displayController = (function() {
  
  // Count Rounds
  const roundCounter = function() {
    let round = 1;
    return () => {
      console.log(round);
      round++;
    }
  };

  // Display Board
  const displayBoard = function() {
    if (document.querySelector(".board") != null) {
      return;
    } else {
      let container = document.querySelector(".container");
      let board = document.createElement("div");
      board.classList.add("board");
  
      let tBoard = gameBoard.getBoard();
      tBoard.forEach(boardSquare => {
        let boardGrid = document.createElement("div");
        boardGrid.classList.add("board-grid");
    
        let gridContent = document.createElement("div");
        gridContent.classList.add("grid-content");
    
        let marker = document.createElement("div");
        marker.classList.add("marker");
        marker.textContent = boardSquare;
    
        gridContent.appendChild(marker);
        boardGrid.appendChild(gridContent);
        board.appendChild(boardGrid);
        container.appendChild(board);
      });
    }
  }

  return { roundCounter, displayBoard };
})();