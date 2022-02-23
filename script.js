const board = (() => {
  let board = Array(9).fill(0);
  const getStatus = () => board;
  const printStatus = () => console.log(board);
  const clear = () => board.fill(0);
  const set = (value, position) => board[position] = value;
  const getIndexValue = (index) => board[index];
  const getRow = (index) => {
    const start = index * 3;
    return board.slice(start, start + 3);
  }
  const getColumn = (index) => [board[index], board[index + 3], board[index +6]];
  const getDiagonalUp = () => [board[0], board[4], board[8]];
  const getDiagonalDown = () => [board[2], board[4], board[6]]
  

  return {
    getStatus,
    printStatus,
    clear,
    set,
    getIndexValue,
    getRow,
    getColumn,
    getDiagonalUp,
    getDiagonalDown
  };
})();

const Player = (name, symbol) => {
  let _score = 0;
  const getName = () => name;
  const getScore = () => _score;
  const getSymbol = () => symbol;
  const resetScore = () => _score = 0;
  const incrementScore = () => _score++;

  return {
    getName,
    getScore,
    getSymbol,
    resetScore,
    incrementScore
  };
};

const UIController = (() => {
  const updateScore = (player1_score, player2_score) => {
    const player1 = document.getElementById('player1-score');
    const player2 = document.getElementById('player2-score');
    player1.textContent = player1_score;
    player2.textContent = player2_score;
  }

  const clearBoard = () => {
    const areaList = document.getElementsByClassName('area');
    for(let i = 0; i < areaList.length; i++) {
      areaList[i].textContent = '';
    }
  }

  return {
    updateScore,
    clearBoard
  }
})();

const gameplayController = (() => {
  let _counter = 0;
  const _player1 = Player('Heniu', 'X');
  const _player2 = Player('Andrzy', 'O');
  const _areas = document.querySelectorAll('.area');

  const _checkWinningConditions = (symbol) => {
    winning_value = symbol == 'X' ? 3 : -3;
      
    for (let i = 0; i < 3; i++) {
      if (board.getRow(i).reduce((x,y) => x + y) === winning_value) {
        return true;
      }
    }

    for (let i = 0; i < 3; i++) {
      if (board.getColumn(i).reduce((x,y) => x + y) === winning_value) {
        return true;
      }
    }

    if (board.getDiagonalDown().reduce((x,y) => x + y) === winning_value) {
      return true;
    }

    if (board.getDiagonalUp().reduce((x,y) => x + y) === winning_value) {
      return true;
    }
  }

  const _initGame = () => {
    _player1.resetScore();
    _player2.resetScore();
    board.clear();
  }

  const play = () => {
    _initGame();
    _areas.forEach(el => el.addEventListener('click', event => {
      const index = parseInt(event.target.dataset.index);
      if (board.getIndexValue(index) == 0) {
        if (_counter % 2 == 0) {
          event.target.textContent = _player1.getSymbol();
          board.set(1, index);
          if (_checkWinningConditions(_player1.getSymbol())) {
            console.log('player 1 wins');
            _player1.incrementScore();
            board.clear();
            UIController.clearBoard();
          }
        } else {
          event.target.textContent = _player2.getSymbol();
          board.set(-1, index);
          if (_checkWinningConditions(_player2.getSymbol())) {
            console.log('player 2 wins');
            _player2.incrementScore();
            board.clear();
            UIController.clearBoard();
          }
        }
        _counter++;
      }
      UIController.updateScore(_player1.getScore(), _player2.getScore());
    }));
  }

  return {
    play
  };
})();

gameplayController.play();