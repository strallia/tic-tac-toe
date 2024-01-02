const gameboard = (function() {
  console.log("Player 1 starts (X). Pick a spot by entering `select(<row index>, <column index>)");

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
