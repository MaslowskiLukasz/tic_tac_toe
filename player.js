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