// Tic Tac Toe Gameboard
const gameBoard = (function() {
  const board = [];
  for (let i = 0; i < 9; i++) {
    board[i] = " ";
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
  const RoundCounter = function() {
    let round = 1;
    return () => {
      console.log(round);
      round++;
    }
  };

  return { RoundCounter };
})();