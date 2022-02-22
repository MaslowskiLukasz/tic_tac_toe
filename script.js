const board = (() => {
  let board = Array(9).fill(0);
  const getStatus = () => board;
  const printStatus = () => console.log(board);
  const clear = () => board.fill(0);
  const set = (value, position) => board[position] = value;
  const getIndexValue = (index) => board[index];

  return {
    getStatus,
    printStatus,
    clear,
    set,
    getIndexValue
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

const gameplayController = (() => {
  let _counter = 0;
  const _player1 = Player('Heniu', 'X');
  const _player2 = Player('Andrzy', 'O');
  const _areas = document.querySelectorAll('.area');

  const _checkPlayer1WinningStatus = () => {
    return (
      parseInt(board.getStatus()[0]) + parseInt(board.getStatus()[1]) + parseInt(board.getStatus()[2]) == 3 ||
      parseInt(board.getStatus()[3]) + parseInt(board.getStatus()[4]) + parseInt(board.getStatus()[5]) == 3 ||
      parseInt(board.getStatus()[6]) + parseInt(board.getStatus()[7]) + parseInt(board.getStatus()[8]) == 3 ||
      parseInt(board.getStatus()[0]) + parseInt(board.getStatus()[4]) + parseInt(board.getStatus()[8]) == 3 ||
      parseInt(board.getStatus()[2]) + parseInt(board.getStatus()[4]) + parseInt(board.getStatus()[6]) == 3 
    ) ? true : false;
  }

  const _checkPlayer2WinningStatus = () => {
    return (
      parseInt(board.getStatus()[0]) + parseInt(board.getStatus()[1]) + parseInt(board.getStatus()[2]) == -3 ||
      parseInt(board.getStatus()[3]) + parseInt(board.getStatus()[4]) + parseInt(board.getStatus()[5]) == -3 ||
      parseInt(board.getStatus()[6]) + parseInt(board.getStatus()[7]) + parseInt(board.getStatus()[8]) == -3 ||
      parseInt(board.getStatus()[0]) + parseInt(board.getStatus()[4]) + parseInt(board.getStatus()[8]) == -3 ||
      parseInt(board.getStatus()[2]) + parseInt(board.getStatus()[4]) + parseInt(board.getStatus()[6]) == -3
    ) ? true : false;
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
      console.log(index);
      console.log(board.getIndexValue(index));
      if (board.getIndexValue(index) == 0) {
        if (_counter % 2 == 0) {
          event.target.textContent = _player1.getSymbol();
          board.set(1, index);
          if (_checkPlayer1WinningStatus()) {
            console.log('player 1 wins');
          }
        } else {
          event.target.textContent = _player2.getSymbol();
          board.set(-1, index);
          if (_checkPlayer2WinningStatus()) {
            console.log('player 2 wins');
          }
        }
        _counter++;
      }
    }));
  }

  return {
    play
  };
})();

gameplayController.play();