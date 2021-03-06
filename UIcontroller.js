const UIController = (() => {
  const _playAgainBtn = document.getElementById('play-again-btn');
  const _resultSection = document.getElementById('winner-display-section');
  const _result = document.getElementById('result');
  const _winner = document.getElementById('winner');

  const _clearBoard = () => {
    const areaList = document.getElementsByClassName('area');
    for(let i = 0; i < areaList.length; i++) {
      areaList[i].textContent = '';
    }
  }

  const _setPlayersName = (name1, name2) => {
    const player1 = document.getElementById('player1-name');
    const player2 = document.getElementById('player2-name');

    player1.textContent = name1;
    player2.textContent = name2;
  }

  const _displayWinner = (name) => {
    _result.textContent = 'Winner';
    _winner.textContent = name;
    _resultSection.style.visibility = 'visible';
  }

  const _displayDraw = () => {
    _result.textContent = "Draw";
    _winner.textContent = '\u00A0';
    _resultSection.style.visibility = 'visible';
  }

  const _blockBoard = () => {
    const areas = document.querySelectorAll('.area');
    areas.forEach(el => { el.style.pointerEvents = 'none' });
  }

  const _blockArea = (el) => {
    el.style.pointerEvents = 'none';
  }

  const _activateBoard = () => {
    const areas = document.querySelectorAll('.area');
    areas.forEach(el => { el.style.pointerEvents = 'auto' });
  }

  const init = (name1, name2) => {
    _setPlayersName(name1, name2);
    _playAgainBtn.addEventListener('click', () => {
      board.clear();
      _clearBoard();
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

  const drawSymbol = (e, symbol) => {
    e.target.textContent = symbol;
    _blockArea(e.target);
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

  const gameOverWinner = (name) => {
    _displayWinner(name);
    _blockBoard();
  }

  const gameOverDraw = () => {
    _displayDraw();
    _blockBoard();
  }

  return {
    init,
    updateScore,
    drawSymbol,
    setAreaHoverColor,
    gameOverWinner,
    gameOverDraw
  }
})();