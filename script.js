const gameFlow = (function () {
  console.log("Player 1 starts (X). Pick a spot by entering `player.select(<row index>, <column index>)`");

  const gameMaster = (prevStep) => {
    if (prevStep === 'player selection') {
      gameboard.updateBoard()
      gameboard.displayBoard();
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

  const select = (row, column) => {
    playerSelection = [];
    playerSelection.push(row, column);
    gameFlow.gameMaster('player selection');
  };

  const getPlayerSelection = () => playerSelection;
  const getPlayerToken = () => activePlayer.token;
  const getActivePlayer = () => activePlayer;

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

  return {
    board,
    updateBoard,
    displayBoard,
  };
})();
console.log(gameboard.board);
