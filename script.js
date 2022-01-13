const board = (() => {
  let board = Array(9).fill('');
  const getStatus = () => board;
  const printStatus = () => console.log(board);
  const clear = () => board.fill('');
  const set = (char, position) => board[position] = char;

  return {
    getStatus,
    printStatus,
    clear,
    set
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
  const test = () => console.log('test');
  const player1 = Player('Heniu', 'X');
  const player2 = Player('Andrzy', 'O');
  const player1Wins = () => player1.incrementScore();
  const printScore = () => console.log(`${player1.getScore()} : ${player2.getScore()}`);

  const initGame = () => {
    player1.resetScore();
    player2.resetScore();
    board.clear();
  }

  return {
    test,
    initGame,
    player1Wins,
    printScore
  };
})();



