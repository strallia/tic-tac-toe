const gameFlow = (function () {
  console.log("Player 1 starts (X). Pick a spot by entering `player.select(<row index>, <column index>)`");

  const gameMaster = (prevStep) => {
    if (prevStep === 'player selection') {
      gameboard.updateBoard();
      gameboard.displayBoard();
      if (gameboard.checkWinner()) {
        console.log('MASTER: Winner found! Game complete.');
        return;
      };
      player.setNextPlayer();
      player.announcePlayerTurn();
    }
  };

  return {
    gameMaster,
  };
})();


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
    gameFlow.gameMaster('player selection');
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
  }

  return {
    select,
    getPlayerSelection,
    getPlayerToken,
    getPlayerName,
    setNextPlayer,
    announcePlayerTurn,
  }
})();


const gameboard = (function () {
  const board = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
  ];

  const updateBoard = () => {
    const chosenPosition = player.getPlayerSelection();
    board[chosenPosition[0]][chosenPosition[1]] = player.getPlayerToken();
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
    };
    console.log(`no winner this round`);
  };

  return {
    board,
    updateBoard,
    displayBoard,
    checkWinner,
  };
})();
console.log(gameboard.board);
