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
  const _playAgainBtn = document.getElementById('play-again-btn');
  const _resultSection = document.getElementById('winner-display-section');
  const _result = document.getElementById('result');
  const _winner = document.getElementById('winner');

  const init = () => {
    _playAgainBtn.addEventListener('click', () => {
      board.clear();
      clearBoard();
      _activateBoard();
      _resultSection.style.visibility = 'hidden';
      setAreaHoverColor(0);
    })
  }
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

  const setPlayersName = (name1, name2) => {
    const player1 = document.getElementById('player1-name');
    const player2 = document.getElementById('player2-name');

    player1.textContent = name1;
    player2.textContent = name2;
  }

  const displayWinner = (name) => {
    _result.textContent = 'Winner';
    _winner.textContent = name;
    _resultSection.style.visibility = 'visible';
  }

  const displayDraw = () => {
    _result.textContent = "Draw";
    _winner.textContent = '\u00A0';
    _resultSection.style.visibility = 'visible';
  }

  const drawSymbol = (e, symbol) => {
    e.target.textContent = symbol;
  }

  const blockBoard = () => {
    const areas = document.querySelectorAll('.area');
    areas.forEach(el => { el.style.pointerEvents = 'none' });
  }

  const blockArea = (el) => {
    el.style.pointerEvents = 'none';
  }

  const _activateBoard = () => {
    const areas = document.querySelectorAll('.area');
    areas.forEach(el => { el.style.pointerEvents = 'auto' });
  }

  const setAreaHoverColor = (counter) => {
    const areas = document.querySelectorAll('.area');
    if (counter % 2 == 0) {
      areas.forEach(x => {
        x.classList.remove('player2-hover');
        x.classList.add('player1-hover');
      });
    } else {
      areas.forEach(x => {
        x.classList.remove('player1-hover');
        x.classList.add('player2-hover');
      });
    }
  }

  return {
    init,
    updateScore,
    clearBoard,
    setPlayersName,
    displayWinner,
    displayDraw,
    drawSymbol,
    blockBoard,
    blockArea,
    setAreaHoverColor
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

  const _checkDraw = () => {
    return !board.getStatus().includes(0);
  }

  const _initGame = () => {
    _player1.resetScore();
    _player2.resetScore();
    UIController.setPlayersName(_player1.getName(), _player2.getName());
    board.clear();
  }

  const play = () => {
    _initGame();
    UIController.init();
    _areas.forEach(el => el.addEventListener('click', event => {
      const index = parseInt(event.target.dataset.index);
      if (board.getIndexValue(index) == 0) {
        if (_counter % 2 == 0) {
          UIController.drawSymbol(event, _player1.getSymbol());
          board.set(1, index);
          if (_checkWinningConditions(_player1.getSymbol())) {
            _player1.incrementScore();
            UIController.displayWinner(_player1.getName());
            UIController.blockBoard();
          }
        } else {
          UIController.drawSymbol(event, _player2.getSymbol());
          board.set(-1, index);
          if (_checkWinningConditions(_player2.getSymbol())) {
            _player2.incrementScore();
            UIController.displayWinner(_player2.getName())
            UIController.blockBoard();
          }
        }
        _counter++;
        UIController.blockArea(el);
        UIController.setAreaHoverColor(_counter);
      }
      if (_checkDraw()) {
        UIController.displayDraw();
        UIController.blockBoard();
      }
      UIController.updateScore(_player1.getScore(), _player2.getScore());
    }));
  }

  return {
    play
  };
})();

gameplayController.play();