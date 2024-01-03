const gameFlow = (function () {
  console.log("Player 1 starts (X). Pick a spot by entering `player.select(<row index>, <column index>)`");

  const gameMaster = (prevStep) => {
    if (prevStep === 'player selection') {
      gameboard.updateBoard()
      gameboard.displayBoard();
      console.log("Player 2's turn (O)");
    }
  };

  return {
    gameMaster,
  };
})();

const player = (function () {
  const players = {
    player1: {
      token: 'X',
    },
    player2: {
      token: 'O',
    },
  };

  const activePlayer = players.player1;
  
  let playerSelection = [];

  const select = (row, column) => {
    playerSelection = [];
    playerSelection.push(row, column);
    gameFlow.gameMaster('player selection');
  };

  const getPlayerSelection = () => playerSelection;

  const getPlayerToken = () => activePlayer.token;

  return {
    select,
    getPlayerSelection,
    getPlayerToken,
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
