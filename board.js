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