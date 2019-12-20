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
        marker.setAttribute("data-position", `${i}`);
        marker.textContent = tBoard[i];
    
        gridContent.appendChild(marker);
        boardGrid.appendChild(gridContent);
        board.appendChild(boardGrid);
        container.appendChild(board);
      }
    }
  }
  const resetBoard = () => {
    for (let i = 0; i < 9; i++) {
      board[i] = " ";
      let gridPosition = document.querySelector(`.grid-${i} .marker`);
      gridPosition.textContent = board[i];
    }

  }

  return { getBoard, displayBoard, resetBoard };
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
  let player1 = Player("Kevin", "X");
  let player2 = Player("Tim", "O");
  let countRound = roundCounter();
  let round = 0;

  // Count Rounds
  function roundCounter() {
    let round = 0;
    return () => {
      round++;
      console.log(round);
      return round;
    }
  };

  function resetRound() {
    countRound = roundCounter();
    round = 0;
    displayTurn(round);
  }

  // Event listener for clicking on board
  const controlGame = () => {

    // All grid squares
    let gridBoxes = document.querySelectorAll('.marker');
    for (let gridBox of gridBoxes) {
      gridBox.addEventListener("click", addMarkerOnBoardListener);
    }
  }

  const displayTurn = (round) => {
    let displayTurnOrGameResult = document.querySelector(".display-turn-or-game-result");
    if (round % 2 == 0) {
      displayTurnOrGameResult.textContent = `${player1.getName()}'s Turn`;
    } else {
      displayTurnOrGameResult.textContent = `${player2.getName()}'s Turn`;
    }
  }

  // Add click event listener on board grid
  function addMarkerOnBoardListener(e) {
    let gridBoxPosition = parseInt(e.path[0].getAttribute("data-position"));
    if (gameBoard.getBoard()[gridBoxPosition] == " ") {
      (round % 2 == 0) ? player1.addMarker(gridBoxPosition) : player2.addMarker(gridBoxPosition);
      round = countRound();

      displayTurn(round);
      let displayTurnOrGameResult = document.querySelector(".display-turn-or-game-result");
      let checkGameOverResult = checkGameOver();

      if (/WINS!$/.test(checkGameOverResult)) {
        console.log(checkGameOverResult);
        displayTurnOrGameResult.textContent = checkGameOverResult;
        removeMarkerOnBoardListener(e);
      } else if (checkGameOverResult == "draw") {
        console.log(checkGameOverResult);
        displayTurnOrGameResult.textContent = checkGameOverResult;
        removeMarkerOnBoardListener(e);
      }
    }
  }

  // Remove click event listeners
  function removeMarkerOnBoardListener(e) {
    let gridBoxes = document.querySelectorAll('.marker');
    for (let gridBox of gridBoxes) {
      gridBox.removeEventListener("click", addMarkerOnBoardListener);
    }
  }

  // Logic to check if game is over
  const checkGameOver = () => {
    let board = gameBoard.getBoard();
    // check horizontal victory conditions
    let checkVictory = horizontalVictory() || verticalVictory() || diagonalVictory();

    if (checkVictory) {
      return checkVictory;
    } else if (draw() == "draw") {
      return "draw";
    } else {
      return {};
    }

    function horizontalVictory() {
      if (board[0] != " " && board[0] == board[1] && board[0] == board[2]) {
        return (player1.getMarker() == board[0]) ? victoryMessage(player1.getName()): victoryMessage(player2.getName());
      } else if (board[3] != " " && board[3] == board[4] && board[3] == board[5]) {
        return (player1.getMarker() == board[3]) ? victoryMessage(player1.getName()): victoryMessage(player2.getName());
      } else if (board[6] != " " && board[6] == board[7] && board[6] == board[8]) {
        return (player1.getMarker() == board[6]) ? victoryMessage(player1.getName()): victoryMessage(player2.getName());
      }
      return false;
    }

    function verticalVictory() {
      if (board[0] != " " && board[0] == board[3] && board[0] == board[6]) {
        return (player1.getMarker() == board[0]) ? victoryMessage(player1.getName()): victoryMessage(player2.getName());
      } else if (board[1] != " " && board[1] == board[4] && board[1] == board[7]) {
        return (player1.getMarker() == board[1]) ? victoryMessage(player1.getName()): victoryMessage(player2.getName());
      } else if (board[2] != " " && board[2] == board[5] && board[2] == board[8]) {
        return (player1.getMarker() == board[2]) ? victoryMessage(player1.getName()): victoryMessage(player2.getName());
      }
      return false;
    }

    function diagonalVictory() {
      if (board[0] != " " && board[0] == board[4] && board[0] == board[8]) {
        return (player1.getMarker() == board[0]) ? victoryMessage(player1.getName()): victoryMessage(player2.getName());
      } else if (board[2] != " " && board[2] == board[4] && board[2] == board[6]) {
        return (player1.getMarker() == board[2]) ? victoryMessage(player1.getName()): victoryMessage(player2.getName());
      }
      return false;
    }

    function draw() {
      if (round == 9) {
        return "draw";
      }
    }

    function victoryMessage(name) {
      return `${name} WINS!`;
    }
  }

  // Game interface
  const gameInterfaceOptions = () => {
    let container = document.querySelector(".container");
    let gameInterface = document.createElement("div");
    gameInterface.classList.add("game-interface");
    let form = document.createElement("form");
    let player1Label = document.createElement("label");
    player1Label.setAttribute("for", "player-1-name");
    let player1Input = document.createElement("input");
    player1Input.setAttribute("type", "text");
    player1Input.setAttribute("name", "player-1-name");
    player1Input.setAttribute("id", "player-1-name");
    player1Input.setAttribute("placeholder", "Player 1");

    let player2Label = document.createElement("label");
    player2Label.setAttribute("for", "player-2-name");
    let player2Input = document.createElement("input");
    player2Input.setAttribute("type", "text");
    player2Input.setAttribute("name", "player-2-name");
    player2Input.setAttribute("id", "player-2-name");
    player2Input.setAttribute("placeholder", "Player 2");

    let startGameBtn = document.createElement("button");
    startGameBtn.setAttribute("type", "submit");
    startGameBtn.textContent = "Start Game";
    
    // click listener on start game button
    startGameBtn.addEventListener("click", function(event) {
      event.preventDefault();
      if (checkValidNames()) {
        gameBoard.displayBoard();

        // Add Player Turn Display and Victory Message
        let container = document.querySelector(".container");
        let displayTurnOrGameResult = document.createElement("div");
        displayTurnOrGameResult.className += "display-turn-or-game-result";
        displayTurnOrGameResult.textContent = "Test";
        container.appendChild(displayTurnOrGameResult);
        if (round % 2 == 0) {
          displayTurnOrGameResult.textContent = `${player1.getName()}'s Turn`;
        } else {
          displayTurnOrGameResult.textContent = `${player2.getName()}'s Turn`;
        }

        controlGame();
        removeGameInterface();
        addRestartGameButton();
      }
    });

    form.appendChild(player1Label);
    form.appendChild(player1Input);
    form.appendChild(player2Label);
    form.appendChild(player2Input);
    form.appendChild(startGameBtn);
    gameInterface.appendChild(form);
    container.appendChild(gameInterface);
  }

  // Remove Game Interace
  const removeGameInterface = () => {
    let gameInterface = document.querySelector(".game-interface");
    gameInterface.remove();
  }

  // Add restart game button
  const addRestartGameButton = () => {
    let container = document.querySelector(".container");
    let restartGameButton = document.createElement("button");
    restartGameButton.textContent = "Restart Game";
    container.append(restartGameButton);
    restartGameButton.addEventListener("click", function(event) {
      gameBoard.resetBoard();
      resetRound();

      let gridBoxes = document.querySelectorAll('.marker');
      for (let gridBox of gridBoxes) {
        gridBox.addEventListener("click", addMarkerOnBoardListener);
      }
    });
  }

  const checkValidNames = () => {
    let player1Name = document.querySelector("#player-1-name");
    let player2Name = document.querySelector("#player-2-name");
    if (player1Name.value.trim() != "" && player2Name.value.trim() != "") {
      return true;
    }
    return false;
  }

  return { roundCounter, controlGame, gameInterfaceOptions };
})();


displayController.gameInterfaceOptions();