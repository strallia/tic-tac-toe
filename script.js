function createPlayer(name, token) {
  return { name, token };
};


const player = (function () {
  const players = {
    playerX: {},
    playerO: {},
  };

  let activePlayer;
  let playerSelection = [];

  const getPlayerSelection = () => playerSelection;
  const getPlayerToken = () => activePlayer.token;
  const getPlayerName = () => activePlayer.name;

  const setPlayers = (playerObject) => {
    if (playerObject.token === 'X') {
      players.playerX = playerObject;
    } else {
      players.playerO = playerObject;
    };
  };
  const setInitialActivePlayer = () => activePlayer = players.playerX;
  const select = (row, column) => {
    playerSelection = [];
    playerSelection.push(row, column);
    gameFlow.gameMaster();
  };
  const setNextPlayer = () => {
    if (activePlayer === players.playerX) {
      activePlayer = players.playerO;
    } else {
      activePlayer = players.playerX;
    }
  };
  const announcePlayerTurn = () => {
    DOM.renderAnnouncementDiv(`${activePlayer.name}'s turn (${getPlayerToken()})`);
  };
  const resetPlayer = () => activePlayer = players.playerX;

  return {
    setPlayers,
    setInitialActivePlayer,
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
    ['','',''],
    ['','',''],
    ['','','']
  ];

  const validCell = () => {
    const chosenPosition = player.getPlayerSelection();
    const currentValue = board[chosenPosition[0]][chosenPosition[1]];
    if (currentValue === '') {
      board[chosenPosition[0]][chosenPosition[1]] = player.getPlayerToken();
      return true;
    } else {
      return false;
    }; 
  };
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
        if (board[row][col] === '') {
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
      board[i] = ['','',''];
    };
    DOM.renderAnnouncementDiv("Player X starts");
  };

  return {
    board,
    validCell,
    checkWinner,
    checkTie,
    resetBoard,
  };
})();


const gameFlow = (function () {
  const gameMaster = () => {
    if (!gameboard.validCell()) {
      return;
    };
    if (gameboard.checkWinner()) {
      DOM.renderAnnouncementDiv(`${player.getPlayerName()} wins!`);
      DOM.disableBoard();
      return;
    };
    if (gameboard.checkTie()) {
      DOM.renderAnnouncementDiv('Tie! Game complete.');
      return;
    };
    player.setNextPlayer();
    player.announcePlayerTurn();
  };

  const resetGame = () => {
    gameboard.resetBoard();
    DOM.renderBoard();
    player.resetPlayer();
  };

  return {
    gameMaster,
    resetGame,
  };
})();


const DOM = (function () {
  const resetBtn = document.querySelector('.reset');
  resetBtn.addEventListener('click', () => {
    gameFlow.resetGame();
  });

  const gridDiv = document.querySelector(".grid");
  const renderBoard = () => {
    gridDiv.textContent = '';
    gameboard.board.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        const btn = document.createElement('button');
        btn.addEventListener('click', () => {
          btn.textContent = player.getPlayerToken();
          player.select(rowIndex, colIndex);
          btn.setAttribute('disabled','');
        });
        gridDiv.appendChild(btn);
      });
    });
  };

  const announcementDiv = document.querySelector(".announcement");
  const renderAnnouncementDiv = (string) => {
    announcementDiv.textContent = '';
    announcementDiv.textContent = string;
  };

  const disableBoard = () => {
    const btns = document.querySelectorAll('.grid > button');
    btns.forEach((btn) => {
      btn.setAttribute('disabled','');
    });
  };

  const formSubmit = document.querySelector("input[type='submit']");
  const nameInputs = document.querySelectorAll("input[type='text']");
  formSubmit.addEventListener('click', (event) => {
    event.preventDefault();
    nameInputs.forEach((input) => {
      const name = input.value;
      const token = input.getAttribute('data-token');
      const playerObject = createPlayer(name, token);
      player.setPlayers(playerObject);
    });
    player.setInitialActivePlayer();
    renderAnnouncementDiv(`${player.getPlayerName()} starts (${player.getPlayerToken()})`);
  });

  return {
    renderBoard,
    renderAnnouncementDiv,
    disableBoard,
  };
})();
DOM.renderBoard();