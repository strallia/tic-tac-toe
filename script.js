const player = (function () {
  const players = {
    player1: {
      token: 1,
    },
    player2: {
      token: 2,
    },
  };

  const activePlayer = players.player1;
  
  const playerSelection = [];

  const select = (row, column) => {
    playerSelection.push(row, column);
  };

  const getPlayerSelection = () => playerSelection;

  return {
    select,
    getPlayerSelection,
  }
})();

const gameboard = (function() {
  console.log("Player 1 starts (X). Pick a spot by entering `player.select(<row index>, <column index>)");

  const board = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
  ];

  return {
    board,
  };
})();

console.log(gameboard.board);
