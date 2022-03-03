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
  
  const _winner = (player) => {
    player.incrementScore();
    UIController.gameOverWinner(player.getName());
  }

  const _changePlayersTurn = () => {
    _counter++;
    UIController.setAreaHoverColor(_counter);
  }

  const _initGame = () => {
    _player1.resetScore();
    _player2.resetScore();
    UIController.init(_player1.getName(), _player2.getName());
    board.clear();
  }

  const play = () => {
    _initGame();
    _areas.forEach(el => el.addEventListener('click', event => {
      const index = parseInt(event.target.dataset.index);
      if (board.getIndexValue(index) == 0) {
        if (_counter % 2 == 0) {
          UIController.drawSymbol(event, _player1.getSymbol());
          board.set(1, index);
          if (_checkWinningConditions(_player1.getSymbol())) {
            _winner(_player1);
          }
        } else {
          UIController.drawSymbol(event, _player2.getSymbol());
          board.set(-1, index);
          if (_checkWinningConditions(_player2.getSymbol())) {
            _winner(_player2);
          }
        }
        _changePlayersTurn(_counter);
      }

      if (_checkDraw()) {
        UIController.gameOverDraw();
      }
      UIController.updateScore(_player1.getScore(), _player2.getScore());
    }));
  }

  return {
    play
  };
})();