var TicTacToe = {
  // initialize the game
  init: function () {
    // define the symbols for each player
    this.symbols = ["X", "O"];
    // get all the squares on the board
    this.squares = Array.from(document.querySelectorAll(".square"));
    // get the turn indicator element
    this.turnIndicator = document.querySelector(".turnIndicator");
    // get the new game button element
    this.button = document.querySelector(".newGame");
    // get the board element
    this.board = document.querySelector(".board");

    // define the possible winning sets
    this.winningSets = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],

      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],

      [0, 4, 8],
      [2, 4, 6],
    ];

    // add event listeners to squares and button
    this.addEventListeners();

    let board = document.querySelector(".board");

    function rotateBoard() {
      board.style.transform = "rotate(360deg)";
    }

    let squares = document.querySelectorAll(".square");

    squares.forEach((square) => {
      square.addEventListener("click", rotateBoard);
    });

    // start a new game
    this.newGame();
  },

  // add event listeners to squares and button
  addEventListeners: function () {
    // add click event listener to each square
    this.squares.forEach((square) => {
      square.addEventListener(
        "click",
        () => {
          this.play(square);
        },
        false
      );
    });

    // add click event listener to new game button
    this.button.addEventListener(
      "click",
      () => {
        this.newGame();
      },
      false
    );
  },

  // reset the game
  newGame: function () {
    // set the active player to player 1
    this.activePlayer = 0;
    // set the game over flag to false
    this.gameOver = false;
    // remove any symbol classes from the squares
    this.removeSymbolClasses();
    // remove the "gameOver" class from the board
    this.board.classList.remove("gameOver");
    // set the turn indicator to show the current player's turn
    this.setTurnIndicator();
  },

  // remove symbol classes from all squares
  removeSymbolClasses: function () {
    this.squares.forEach((square) => {
      square.classList.remove(this.symbols[0]);
      square.classList.remove(this.symbols[1]);
    });
  },

  // set the text of the turn indicator to show the current player's turn
  setTurnIndicator: function () {
    this.turnIndicator.innerText = this.symbols[this.activePlayer] + "'s turn.";
  },

  // This function is called when a player makes a move on the board
  play: function (square) {
    // If the game is not over and the clicked square is empty
    if (!this.gameOver && square.classList.length == 1) {
      // Add the active player's symbol to the clicked square
      square.classList.add(this.symbols[this.activePlayer]);
      // Rotate the board by 90 degrees
      this.board.style.transform = "rotate(90deg)";
      // Check if the active player has won
      if (this.checkWin()) {
        // If so, update the turn indicator and end the game
        this.turnIndicator.innerText =
          this.symbols[this.activePlayer] + " wins!";
        this.endGame();
      }
      // If no player has won and the game is a draw
      else if (this.checkDraw()) {
        // Update the turn indicator and end the game
        this.turnIndicator.innerText = "It's a draw!";
        this.endGame();
      }
      // If the game is still in progress
      else {
        // Switch to the other player and update the turn indicator
        this.activePlayer = 1 - this.activePlayer;
        this.setTurnIndicator();
      }
    }
  },

  // This function checks if the active player has won
  checkWin: function () {
    // Check each of the possible winning sets
    return this.winningSets.some((set) => {
      // Check if every square in the set contains the active player's symbol
      return set.every((index) => {
        return this.squares[index].classList.contains(
          this.symbols[this.activePlayer]
        );
      });
    });
  },

  // This function checks if the game is a draw
  checkDraw: function () {
    // Check if every square on the board is occupied
    return this.squares.every(function (x) {
      return x.classList.length > 1;
    });
  },

  // This function ends the game and updates the UI
  endGame: function () {
    this.gameOver = true;
    this.board.classList.add("gameOver");
  },
};
// Initialize the game by setting up the board and event listeners
TicTacToe.init();
