const player = (function () {
  const players = {
    player1: {
      name: "Player 1",
      token: 'X',
    },
    player2: {
      name: "Player 2",
      token: 'O',
    },
  };

  let activePlayer = players.player1;
  let playerSelection = [];

  const getPlayerSelection = () => playerSelection;
  const getPlayerToken = () => activePlayer.token;
  const getPlayerName = () => activePlayer.name;

  const select = (row, column) => {
    playerSelection = [];
    playerSelection.push(row, column);
    gameFlow.gameMaster();
  };
  const setNextPlayer = () => {
    if (activePlayer === players.player1) {
      activePlayer = players.player2;
    } else {
      activePlayer = players.player1;
    }
  };
  const announcePlayerTurn = () => {
    console.log(`${activePlayer.name}'s turn (${activePlayer.token})`);
  };
  const resetPlayer = () => activePlayer = players.player1;

  return {
    select,
    getPlayerSelection,
    getPlayerToken,
    getPlayerName,
    setNextPlayer,
    announcePlayerTurn,
    resetPlayer,
  }
})();


const gameboard = (function () {
  const board = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
  ];

  const placeToken = () => {
    const chosenPosition = player.getPlayerSelection();
    const currentValue = board[chosenPosition[0]][chosenPosition[1]];
    if (currentValue === 0) {
      board[chosenPosition[0]][chosenPosition[1]] = player.getPlayerToken();
      return true;
    } else {
      return false;
    }; 
  };
  const displayBoard = () => console.log(board);
  const checkWinner = () => {
    const playerToken = player.getPlayerToken();
    let winner = false;

    const checkFiltered = (arr) => {
      let filtered = arr.filter((value) => {
        return value === playerToken;
      });
      if (filtered.length === 3) {
        winner = true;
      };
    };

    // check each column
    for (let colIndex = 0; colIndex < 3; colIndex++) {
      let column = [];
      for ( let rowIndex = 0; rowIndex < 3; rowIndex++) {
        column.push(board[rowIndex][colIndex]);
      };
      checkFiltered(column);
    };
    // check each row
    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
      let row = [];
      for ( let colIndex = 0; colIndex < 3; colIndex++) {
        row.push(board[rowIndex][colIndex]);
      };
      checkFiltered(row);
    };
    // check backslash diagonal
    {
      let diagonal = [];
      for (let i = 0; i < 3; i++) {
        diagonal.push(board[i][i]);
      };
      checkFiltered(diagonal);
    }
    // check forwardslash diagonal
    {
      let diagonal = [];
      for (let i = 0; i < 3; i++) {
        let rowIndex = i;
        let colIndex = 2 - i;
        diagonal.push(board[rowIndex][colIndex]);
      };
      checkFiltered(diagonal);
    };

    if (winner) {
      console.log(`${player.getPlayerName()} wins!`);
      return true;
    } else {
      return false;
    }; 
  };
  const checkTie = () => {
    let tiePresent = true;

    outerLoop: 
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === 0) {
          tiePresent = false;
          break outerLoop;
        }
      };
    };

    if (!tiePresent) {
      return false;
    } else {
      return true;
    };
  };
  const resetBoard = () => {
    for (let i = 0; i < 3; i++) {
      board[i] = [0,0,0];
    };
  };

  return {
    board,
    placeToken,
    displayBoard,
    checkWinner,
    checkTie,
    resetBoard,
  };
})();


const gameFlow = (function () {
  const announceNewGame = () => {
    console.log("Player 1 starts (X). Pick a spot by entering `player.select(<row index>, <column index>)`");
    console.log(gameboard.board);
  };

  const gameMaster = () => {
    if (!gameboard.placeToken()) {
      console.log('GM: That spot is already taken. Try again.');
      return;
    };
    gameboard.displayBoard();
    if (gameboard.checkWinner()) {
      console.log('GM: Winner found! Game complete. Run `gameFLow.resetGame()` to play again.');
      return;
    };
    if (gameboard.checkTie()) {
      console.log('GM: Tie! Game complete. Run `gameFLow.resetGame()` to play again.');
      return;
    };
    player.setNextPlayer();
    player.announcePlayerTurn();
  };

  const resetGame = () => {
    gameboard.resetBoard();
    player.resetPlayer();
    gameFlow.announceNewGame();
  };

  return {
    announceNewGame,
    gameMaster,
    resetGame,
  };
})();
gameFlow.announceNewGame();